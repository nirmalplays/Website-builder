import { NextResponse } from "next/server";
import { getIdentity } from "@/lib/identity";
import { getUsage } from "@/lib/limits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Feeds the usage meter (PRD FR-14). */
export async function GET() {
  const identity = await getIdentity();
  return NextResponse.json(await getUsage(identity));
}
