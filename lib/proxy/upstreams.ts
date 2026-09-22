/**
 * Upstream APIs a generated app is allowed to call.
 *
 * Generated apps run in a browser sandbox with no server of their own, so
 * "wire up this API key" can only mean one of two things: put the key in
 * client-side source where anyone viewing the preview can read it, or route
 * the call through here. This is the second one.
 *
 * Each upstream is declared by two environment variables:
 *
 *   PROXY_<NAME>_URL      https://api.example.com          (required)
 *   PROXY_<NAME>_KEY      the secret                       (optional)
 *   PROXY_<NAME>_AUTH     how to send it                   (default: bearer)
 *
 * PROXY_<NAME>_AUTH is one of:
 *   bearer              Authorization: Bearer <key>
 *   header:X-Api-Key    that header, set to <key>
 *   query:apikey        that query parameter, set to <key>
 *   none                no credential at all
 *
 * Declaring an upstream is a deliberate act. There is no wildcard and no
 * caller-supplied destination: an open proxy carrying someone's API key is a
 * way to have that key's quota spent by strangers, and the deployment is
 * public.
 */

export type Auth =
  | { kind: "bearer" }
  | { kind: "header"; name: string }
  | { kind: "query"; name: string }
  | { kind: "none" };

export type Upstream = {
  /** Lower-case slug used in the request path. */
  name: string;
  baseUrl: string;
  key?: string;
  auth: Auth;
};

function parseAuth(raw: string | undefined): Auth {
  if (!raw || raw === "bearer") return { kind: "bearer" };
  if (raw === "none") return { kind: "none" };
  const [kind, name] = raw.split(":");
  if (kind === "header" && name) return { kind: "header", name };
  if (kind === "query" && name) return { kind: "query", name };
  // An unreadable value must not silently become "send the key in the clear".
  return { kind: "none" };
}

/**
 * Read at call time, not at module load: Vercel env changes take effect on the
 * next request rather than needing a redeploy.
 */
export function listUpstreams(): Upstream[] {
  const out: Upstream[] = [];

  for (const [envName, value] of Object.entries(process.env)) {
    const match = /^PROXY_([A-Z0-9_]+)_URL$/.exec(envName);
    if (!match || !value) continue;

    const slug = match[1];
    let baseUrl: string;
    try {
      // Reject anything that is not a real absolute http(s) URL, so a typo
      // cannot turn into a request at a file or internal address.
      const parsed = new URL(value);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") continue;
      baseUrl = parsed.toString().replace(/\/$/, "");
    } catch {
      continue;
    }

    out.push({
      name: slug.toLowerCase().replace(/_/g, "-"),
      baseUrl,
      key: process.env[`PROXY_${slug}_KEY`],
      auth: parseAuth(process.env[`PROXY_${slug}_AUTH`]),
    });
  }

  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export function getUpstream(name: string): Upstream | undefined {
  return listUpstreams().find((u) => u.name === name.toLowerCase());
}

/**
 * Where the generated app should send proxy calls.
 *
 * It runs in a sandbox on a different origin, so a relative "/api/proxy/..."
 * would resolve against the sandbox and never reach this app. The URL has to
 * be absolute, and it has to be this deployment's.
 */
export function proxyBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** What the model is told it can call. Never includes a key. */
export function upstreamManifest(): string {
  const ups = listUpstreams();
  if (ups.length === 0) return "";
  const base = proxyBaseUrl();

  return [
    "LIVE APIS - these are wired and really callable from the app you write:",
    ...ups.map(
      (u) =>
        `- ${u.name} -> ${u.baseUrl}\n` +
        `    fetch("${base}/api/proxy/${u.name}/<path>")` +
        (u.auth.kind === "none" ? "" : " - credential attached server-side"),
    ),
    "",
    "Use these instead of faking a server when the request asks for real data.",
    "Rules:",
    "- The URL must be absolute and exactly as shown. The app runs on a different",
    "  origin from this proxy, so a relative /api/... path will not reach it.",
    "- Never write an API key into the code. There is none to write; the proxy",
    "  attaches it. A key in client-side source is readable by anyone.",
    "- Any host not listed above is blocked. Do not try to reach one.",
    "- Handle it like the real network call it is: loading state, an error state",
    "  that says what failed, and an empty state. Do not assume it succeeds.",
  ].join("\n");
}
