import { NextResponse } from "next/server";
import { resolveComponents } from "@/lib/react-bits/resolver";
import type { PageKind } from "@/lib/react-bits/resolver";
import type { Weight } from "@/lib/react-bits/types";

export const runtime = "nodejs";

/**
 * Given a UI requirement, shortlist components with reasons.
 *
 * POST { prompt, sections?, kind?, maxWeight?, maxComponents?, existingDependencies? }
 */
export async function POST(req: Request) {
  let body: {
    prompt?: string;
    sections?: string[];
    kind?: PageKind;
    maxWeight?: Weight;
    maxComponents?: number;
    existingDependencies?: string[];
    excludeDependencies?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.prompt?.trim()) {
    return NextResponse.json({ error: "prompt is required." }, { status: 400 });
  }

  return NextResponse.json(resolveComponents({ ...body, prompt: body.prompt }));
}
