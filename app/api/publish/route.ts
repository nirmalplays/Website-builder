import { NextResponse } from "next/server";
import { getIdentity } from "@/lib/identity";
import { readSecret } from "@/lib/connections/store";
import { buildStaticSite } from "@/lib/publish/site";
import { publishSite, whoami } from "@/lib/publish/vercel";
import { BundleError } from "@/lib/verify/bundle";

/**
 * Publishes a finished project to the user's own Vercel account.
 *
 * Bundling happens here rather than on Vercel: the project is already built
 * for verification on every generation, so publishing reuses that and deploys
 * two static files. Nothing to install, no framework preset, no build step
 * that can fail after the user has been told it worked.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  // Lets the UI show the button in a useful state before it is pressed.
  const identity = await getIdentity();
  const token = await readSecret(identity, "vercel", "VERCEL_TOKEN");
  if (!token) return NextResponse.json({ ready: false });

  try {
    return NextResponse.json({ ready: true, account: (await whoami(token)).username });
  } catch (err) {
    return NextResponse.json({
      ready: false,
      error: err instanceof Error ? err.message : "That Vercel token was rejected.",
    });
  }
}

export async function POST(req: Request) {
  const identity = await getIdentity();

  let body: { files?: Record<string, string>; dependencies?: Record<string, string>; title?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const files = body.files;
  if (!files || !files["/App.tsx"]) {
    return NextResponse.json({ error: "Nothing to publish yet." }, { status: 400 });
  }

  const token = await readSecret(identity, "vercel", "VERCEL_TOKEN");
  if (!token) {
    return NextResponse.json(
      {
        error:
          "No Vercel token saved. Add one in Settings → Integrations → Vercel, and the project publishes to your own account.",
        needsToken: true,
      },
      { status: 400 },
    );
  }
  const teamId = (await readSecret(identity, "vercel", "VERCEL_TEAM_ID")) ?? undefined;

  let site;
  try {
    site = await buildStaticSite(files, body.dependencies ?? {}, body.title ?? "ui-gen app");
  } catch (err) {
    // A project that does not compile must not be published as a blank page.
    const detail =
      err instanceof BundleError
        ? err.errors.slice(0, 3).map((e) => e.text).join("; ")
        : err instanceof Error
          ? err.message
          : "unknown error";
    return NextResponse.json(
      { error: `This build does not compile, so there is nothing to publish: ${detail}` },
      { status: 400 },
    );
  }

  try {
    const result = await publishSite(token, site, body.title ?? "ui-gen app", teamId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Vercel refused the deployment." },
      { status: 502 },
    );
  }
}
