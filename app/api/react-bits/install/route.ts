import { NextResponse } from "next/server";
import { installComponents } from "@/lib/react-bits/install";
import { catalogue } from "@/lib/react-bits/search";
import type { Variant } from "@/lib/react-bits/types";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * install_react_bits_component
 *
 * Fetches real source from the official React Bits registry and returns the
 * files plus the exact dependencies to add. Source is delivered into the
 * generated application, which the React Bits licence permits; it is never
 * stored in this repository.
 *
 * POST { names: string[], variant?: "TS-TW" | "TS-CSS" | "JS-TW" | "JS-CSS" }
 */
export async function POST(req: Request) {
  let body: { names?: string[]; variant?: Variant };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const names = (body.names ?? []).filter((n) => typeof n === "string").slice(0, 8);
  if (names.length === 0) {
    return NextResponse.json({ error: "names is required." }, { status: 400 });
  }

  try {
    const result = await installComponents(names, { variant: body.variant });
    return NextResponse.json({
      ...result,
      attribution: {
        project: catalogue.source.project,
        license: catalogue.source.license,
        homepage: catalogue.source.homepage,
        note: "Keep the attribution header that ships with each file.",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Install failed." },
      { status: 502 },
    );
  }
}
