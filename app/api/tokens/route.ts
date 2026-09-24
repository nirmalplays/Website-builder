import { NextResponse } from "next/server";
import { getTokenSummary, getSpend } from "@/lib/spend";

/** Feeds the token dashboard. Reads rows that were written by real builds. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const hours = Math.min(720, Math.max(1, Number(new URL(req.url).searchParams.get("hours") ?? 24)));

  const [summary, spend] = await Promise.all([getTokenSummary(hours), getSpend()]);

  if (!summary) {
    return NextResponse.json(
      { error: "No database configured, so nothing is being recorded." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { summary, spend },
    // The dashboard polls; a cached answer would make it look frozen.
    { headers: { "Cache-Control": "no-store" } },
  );
}
