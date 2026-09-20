import { NextResponse } from "next/server";
import { catalogue, listCategories, listDependencies, searchComponents, summarise, getComponent } from "@/lib/react-bits/search";
import type { SearchQuery, Variant, Weight } from "@/lib/react-bits/types";

export const runtime = "nodejs";

/**
 * search_react_bits_components / get_react_bits_component
 *
 * GET /api/react-bits/search?q=futuristic+hero&maxWeight=light
 * GET /api/react-bits/search?name=BlurText        -> full detail incl. props
 * GET /api/react-bits/search?facets=1             -> categories and dependencies
 */
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;

  if (p.get("facets")) {
    return NextResponse.json({
      source: catalogue.source,
      componentCount: catalogue.componentCount,
      categories: listCategories(),
      dependencies: listDependencies(),
      variants: catalogue.variants,
    });
  }

  const name = p.get("name");
  if (name) {
    const component = getComponent(name);
    if (!component) return NextResponse.json({ error: `Unknown component: ${name}` }, { status: 404 });
    return NextResponse.json({ component, license: catalogue.source.license });
  }

  const query: SearchQuery = {
    q: p.get("q") ?? undefined,
    category: p.get("category") ?? undefined,
    section: p.get("section") ?? undefined,
    layer: (p.get("layer") as SearchQuery["layer"]) ?? undefined,
    dimension: (p.get("dimension") as SearchQuery["dimension"]) ?? undefined,
    maxWeight: (p.get("maxWeight") as Weight) ?? undefined,
    requiresDependency: p.get("requiresDependency") ?? undefined,
    excludeDependencies: p.get("excludeDependencies")?.split(",").filter(Boolean),
    interaction: (p.get("interaction") as SearchQuery["interaction"]) ?? undefined,
    variant: (p.get("variant") as Variant) ?? undefined,
    limit: p.get("limit") ? Number(p.get("limit")) : undefined,
  };

  const hits = searchComponents(query);
  return NextResponse.json({
    query,
    count: hits.length,
    results: hits.map((h) => ({ ...summarise(h), score: Number(h.score.toFixed(1)) })),
  });
}
