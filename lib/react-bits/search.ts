import catalogueJson from "./registry.json";
import type {
  Catalogue,
  CatalogueComponent,
  SearchHit,
  SearchQuery,
  Variant,
  Weight,
} from "./types";

export const catalogue = catalogueJson as unknown as Catalogue;

const WEIGHT_ORDER: Record<Weight, number> = { none: 0, light: 1, medium: 2, heavy: 3 };

/** "motion@^12.23.12" -> "motion", "@react-three/fiber@^9" -> "@react-three/fiber" */
export function packageName(spec: string): string {
  const at = spec.lastIndexOf("@");
  return at > 0 ? spec.slice(0, at) : spec;
}

export function getComponent(name: string): CatalogueComponent | undefined {
  const lower = name.toLowerCase().replace(/[\s-]/g, "");
  return catalogue.components.find((c) => c.name.toLowerCase() === lower);
}

export function listCategories(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const c of catalogue.components) counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
  return [...counts].map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count);
}

/** Every distinct npm package across the catalogue, with how many components want it. */
export function listDependencies(): { pkg: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const c of catalogue.components) {
    for (const d of c.dependencies) {
      const pkg = packageName(d);
      counts.set(pkg, (counts.get(pkg) ?? 0) + 1);
    }
  }
  return [...counts].map(([pkg, count]) => ({ pkg, count })).sort((a, b) => b.count - a.count);
}

/**
 * Ranked search. Scores rather than filters on free text so a near-miss still
 * surfaces, but hard constraints (weight, dependencies, layer) filter strictly -
 * the agent must be able to say "nothing heavier than this" and be obeyed.
 */
export function searchComponents(query: SearchQuery): SearchHit[] {
  const {
    q,
    category,
    section,
    layer,
    dimension,
    maxWeight,
    allowedDependencies,
    excludeDependencies,
    requiresDependency,
    variant,
    interaction,
    limit = 12,
  } = query;

  const terms = (q ?? "")
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((t) => t.length > 1);

  const hits: SearchHit[] = [];

  for (const component of catalogue.components) {
    if (category && component.category.toLowerCase() !== category.toLowerCase()) continue;
    if (layer && component.layer !== layer) continue;
    if (dimension && component.dimension !== dimension) continue;
    if (interaction && component.interaction !== interaction) continue;
    if (section && !component.sections.includes(section)) continue;
    if (variant && !component.variants[variant]) continue;
    if (maxWeight && WEIGHT_ORDER[component.weight] > WEIGHT_ORDER[maxWeight]) continue;

    const pkgs = component.dependencies.map(packageName);
    if (excludeDependencies?.some((d) => pkgs.includes(d))) continue;
    if (allowedDependencies && !pkgs.every((p) => allowedDependencies.includes(p))) continue;
    if (requiresDependency && !pkgs.includes(requiresDependency)) continue;

    let score = 0;
    const matched: string[] = [];

    if (terms.length === 0) {
      score = 1;
    } else {
      const name = component.name.toLowerCase();
      const title = component.title.toLowerCase();
      const description = component.description.toLowerCase();
      const tagText = component.tags.join(" ").toLowerCase();
      const sectionText = component.sections.join(" ").toLowerCase();

      for (const term of terms) {
        if (name === term) {
          score += 12;
          matched.push(`name=${term}`);
        } else if (name.includes(term) || title.includes(term)) {
          score += 6;
          matched.push(`name~${term}`);
        }
        if (description.includes(term)) {
          score += 3;
          matched.push(`description~${term}`);
        }
        if (tagText.includes(term)) {
          score += 2;
          matched.push(`tag~${term}`);
        }
        if (sectionText.includes(term)) {
          score += 2;
          matched.push(`section~${term}`);
        }
      }
      if (score === 0) continue;
    }

    // All else equal, prefer the cheaper component.
    score += (3 - WEIGHT_ORDER[component.weight]) * 0.5;

    hits.push({ component, score, matched: [...new Set(matched)] });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Compact shape for putting search results in a model prompt. */
export function summarise(hit: SearchHit) {
  const c = hit.component;
  return {
    name: c.name,
    category: c.category,
    description: c.description,
    weight: c.weight,
    dimension: c.dimension,
    layer: c.layer,
    dependencies: c.dependencies.map(packageName),
    sections: c.sections,
    props: Object.entries(c.props)
      .slice(0, 10)
      .map(([k, v]) => `${k}${v.required ? "" : "?"}: ${v.type}`),
  };
}

export function resolveVariant(
  component: CatalogueComponent,
  preferred: Variant,
): { variant: Variant; registryName: string } {
  // Fall back along the axis that matters least first: styling, then language.
  const order: Record<Variant, Variant[]> = {
    "TS-TW": ["TS-TW", "TS-CSS", "JS-TW", "JS-CSS"],
    "TS-CSS": ["TS-CSS", "TS-TW", "JS-CSS", "JS-TW"],
    "JS-TW": ["JS-TW", "JS-CSS", "TS-TW", "TS-CSS"],
    "JS-CSS": ["JS-CSS", "JS-TW", "TS-CSS", "TS-TW"],
  };
  for (const candidate of order[preferred]) {
    const found = component.variants[candidate];
    if (found) return { variant: candidate, registryName: found.registryName };
  }
  throw new Error(`${component.name} has no variants in the catalogue`);
}
