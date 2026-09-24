import { NextResponse } from "next/server";
import { getIdentity } from "@/lib/identity";
import { deleteConnection, listConnections, saveConnection } from "@/lib/connections/store";
import { isEncryptionConfigured } from "@/lib/connections/crypto";
import { PROVIDERS } from "@/lib/connections/providers";

/**
 * Credentials the user gives the app.
 *
 * GET returns metadata only - provider, field name, and the last four
 * characters. A stored value is never readable back through the API: the
 * generator decrypts it server-side, and nothing else needs it.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const identity = await getIdentity();
  const projectId = new URL(req.url).searchParams.get("projectId");

  return NextResponse.json({
    connections: await listConnections(identity, projectId),
    providers: PROVIDERS.map((p) => ({
      slug: p.slug,
      label: p.label,
      blurb: p.blurb,
      fields: p.fields,
    })),
    encryptionReady: isEncryptionConfigured(),
  });
}

export async function POST(req: Request) {
  const identity = await getIdentity();

  let body: { provider?: string; name?: string; value?: string; projectId?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.provider || !body.name || !body.value) {
    return NextResponse.json({ error: "provider, name and value are required." }, { status: 400 });
  }

  try {
    const saved = await saveConnection(identity, {
      provider: body.provider,
      name: body.name,
      value: body.value,
      projectId: body.projectId ?? null,
    });
    return NextResponse.json({ connection: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not save that credential." },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request) {
  const identity = await getIdentity();
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required." }, { status: 400 });

  const removed = await deleteConnection(identity, id);
  return NextResponse.json({ removed }, { status: removed ? 200 : 404 });
}
