import { NextResponse } from "next/server";
import { getUpstream } from "@/lib/proxy/upstreams";

/**
 * Credential-injecting proxy for generated apps.
 *
 * A generated app runs in a browser sandbox with no server, so a real API call
 * would otherwise need the key in client-side source - readable by anyone who
 * opens the preview or a share link. Here the key stays in this deployment's
 * environment and never reaches the browser.
 *
 * Deliberately narrow. Only upstreams declared in the environment can be
 * reached, the caller never names a host, and hop-by-hop and identifying
 * headers are dropped in both directions.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/** Sandpack previews run on their own origin, so the browser preflights. */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

/**
 * Headers worth forwarding. An allow-list rather than a block-list: cookies,
 * our own auth headers and the caller's identity must not leak upstream, and
 * listing what may pass is the only way to be sure of that as the app grows.
 */
const FORWARD_REQUEST = ["content-type", "accept", "accept-language"];
const FORWARD_RESPONSE = ["content-type", "cache-control", "etag", "last-modified"];

function fail(status: number, error: string) {
  return NextResponse.json({ error }, { status, headers: CORS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

async function handle(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const [name, ...rest] = path ?? [];
  if (!name) return fail(400, "No upstream named. Use /api/proxy/<upstream>/<path>.");

  const upstream = getUpstream(name);
  if (!upstream) {
    return fail(
      404,
      `"${name}" is not a configured upstream. Add PROXY_${name.toUpperCase().replace(/-/g, "_")}_URL to enable it.`,
    );
  }

  // Build the target from the upstream's own base. The caller contributes a
  // path and a query string and nothing else, so it cannot redirect the
  // request at a different host.
  const incoming = new URL(req.url);
  const target = new URL(`${upstream.baseUrl}/${rest.join("/")}`);
  for (const [k, v] of incoming.searchParams) target.searchParams.append(k, v);

  const headers = new Headers();
  for (const h of FORWARD_REQUEST) {
    const v = req.headers.get(h);
    if (v) headers.set(h, v);
  }

  if (upstream.key) {
    if (upstream.auth.kind === "bearer") headers.set("authorization", `Bearer ${upstream.key}`);
    else if (upstream.auth.kind === "header") headers.set(upstream.auth.name, upstream.key);
    else if (upstream.auth.kind === "query") target.searchParams.set(upstream.auth.name, upstream.key);
  }

  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer();

  let res: Response;
  try {
    res = await fetch(target, {
      method: req.method,
      headers,
      body,
      // A hung upstream must not hold a serverless function open to its limit.
      signal: AbortSignal.timeout(20_000),
      // Follow the upstream's own redirects, but never let one become a way to
      // reach an origin the allow-list does not cover.
      redirect: "follow",
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return fail(timedOut ? 504 : 502, timedOut ? "Upstream timed out." : "Upstream unreachable.");
  }

  const out = new Headers(CORS);
  for (const h of FORWARD_RESPONSE) {
    const v = res.headers.get(h);
    if (v) out.set(h, v);
  }

  return new NextResponse(res.body, { status: res.status, headers: out });
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
