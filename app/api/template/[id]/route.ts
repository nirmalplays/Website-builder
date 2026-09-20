import { NextResponse } from "next/server";
import { TEMPLATE_CODE } from "@/lib/templateCode.generated";

export const runtime = "nodejs";

/**
 * Ready-made template code. No model call, no quota, no wait - the code was
 * baked ahead of time and ships with the app.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const code = TEMPLATE_CODE[id];
  if (!code) return NextResponse.json({ error: "Unknown template." }, { status: 404 });
  return NextResponse.json({ code }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
