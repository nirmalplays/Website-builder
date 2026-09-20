import { catalogue, packageName, searchComponents } from "./search";
import type { CatalogueComponent, SearchQuery, Weight } from "./types";

/**
 * Turns a UI requirement into a short, justified component selection.
 *
 * The rule that matters is restraint: React Bits is a toolbox, not a mandate.
 * A settings form gets nothing; a marketing hero may get a background and an
 * animated heading. Selection is capped and weight-budgeted so a page cannot
 * quietly acquire four WebGL canvases.
 */

export type PageKind = "marketing" | "app" | "dashboard" | "form" | "content" | "unknown";

export type ResolveRequest = {
  /** What the user asked for, verbatim. */
  prompt: string;
  /** Page regions the planner intends to build. */
  sections?: string[];
  kind?: PageKind;
  /** Hard ceiling; the sandbox preview cannot carry many heavy runtimes. */
  maxWeight?: Weight;
  maxComponents?: number;
  /** Packages already present in the target project. */
  existingDependencies?: string[];
  excludeDependencies?: string[];
};

export type Selection = {
  component: string;
  reason: string;
  section: string;
  weight: Weight;
  dependencies: string[];
};

export type ResolveResult = {
  kind: PageKind;
  selections: Selection[];
  /** Union of packages the selection needs that are not already installed. */
  newDependencies: string[];
  notes: string[];
};

const MARKETING = /landing|hero|marketing|saas|startup|product page|portfolio|agency|launch|waitlist/i;
const DASHBOARD = /dashboard|admin|analytics|metrics|console|panel|crm/i;
const FORM = /form|settings|login|sign[ -]?up|checkout|profile|preferences|contact/i;
const CONTENT = /blog|docs|article|news|magazine|wiki|changelog/i;
const APPISH = /app|todo|tracker|game|chat|editor|kanban|calendar|player/i;

export function classifyPage(prompt: string): PageKind {
  if (FORM.test(prompt)) return "form";
  if (DASHBOARD.test(prompt)) return "dashboard";
  if (MARKETING.test(prompt)) return "marketing";
  if (CONTENT.test(prompt)) return "content";
  if (APPISH.test(prompt)) return "app";
  return "unknown";
}

/**
 * How much decoration each kind of page has earned. Forms and dashboards are
 * working surfaces: animation there costs attention and frame budget.
 */
const BUDGET: Record<
  PageKind,
  { maxComponents: number; maxWeight: Weight; defaultSections: string[] }
> = {
  marketing: {
    maxComponents: 4,
    maxWeight: "medium",
    defaultSections: ["background", "hero-heading", "features", "stats"],
  },
  content: { maxComponents: 2, maxWeight: "light", defaultSections: ["content", "hero-heading"] },
  app: { maxComponents: 2, maxWeight: "light", defaultSections: ["content", "cta"] },
  // A working surface: at most a number that counts up, never a glitch effect.
  dashboard: { maxComponents: 1, maxWeight: "light", defaultSections: ["stats"] },
  form: { maxComponents: 0, maxWeight: "none", defaultSections: [] },
  unknown: { maxComponents: 2, maxWeight: "light", defaultSections: ["hero-heading"] },
};

/** Section -> what to look for, in priority order. */
const SECTION_INTENT: { section: string; query: SearchQuery; reason: string }[] = [
  {
    section: "background",
    query: { layer: "background", q: "gradient aurora waves subtle" },
    reason: "Animated backdrop for the hero",
  },
  {
    section: "hero-heading",
    query: { category: "Text Animations", section: "hero-heading", q: "heading reveal" },
    reason: "Animated hero heading",
  },
  {
    section: "features",
    query: { section: "features", q: "card hover spotlight" },
    reason: "Interactive feature cards",
  },
  {
    section: "stats",
    query: { section: "stats", q: "count number" },
    reason: "Animated statistics",
  },
  {
    section: "showcase",
    query: { section: "showcase", q: "carousel gallery marquee logos" },
    reason: "Logo or image showcase",
  },
  {
    section: "navigation",
    query: { section: "navigation", q: "nav menu" },
    reason: "Animated navigation",
  },
  {
    section: "cta",
    query: { section: "cta", q: "button" },
    reason: "Call-to-action interaction",
  },
  {
    section: "content",
    query: { section: "content", q: "list reveal scroll" },
    reason: "Content reveal on scroll",
  },
];

export function resolveComponents(req: ResolveRequest): ResolveResult {
  const kind = req.kind ?? classifyPage(req.prompt);
  const budget = BUDGET[kind];
  const notes: string[] = [];

  const maxComponents = req.maxComponents ?? budget.maxComponents;
  const maxWeight = req.maxWeight ?? budget.maxWeight;

  if (maxComponents === 0) {
    notes.push(
      `${kind} pages get no React Bits components: animation would cost usability here.`,
    );
    return { kind, selections: [], newDependencies: [], notes };
  }

  // The user explicitly asking for 3D unlocks the heavy tier.
  const wants3d = /\b(3d|webgl|three|particles?|shader|immersive)\b/i.test(req.prompt);
  const effectiveWeight: Weight = wants3d ? "heavy" : maxWeight;
  if (wants3d && maxWeight !== "heavy") {
    notes.push("3D was requested explicitly, so heavy WebGL components are allowed.");
  }

  const wantedSections = new Set(
    req.sections?.length ? req.sections : budget.defaultSections,
  );

  const chosen: Selection[] = [];
  const usedNames = new Set<string>();
  const deps = new Set<string>(req.existingDependencies ?? []);
  const newDeps = new Set<string>();

  for (const intent of SECTION_INTENT) {
    if (chosen.length >= maxComponents) break;
    if (!wantedSections.has(intent.section)) continue;

    const hits = searchComponents({
      ...intent.query,
      q: `${intent.query.q ?? ""} ${req.prompt}`.trim(),
      maxWeight: effectiveWeight,
      excludeDependencies: req.excludeDependencies,
      limit: 6,
    });

    const pick = hits.find((h) => !usedNames.has(h.component.name));
    if (!pick) continue;

    const c = pick.component;
    usedNames.add(c.name);
    chosen.push({
      component: c.name,
      reason: intent.reason,
      section: intent.section,
      weight: c.weight,
      dependencies: c.dependencies.map(packageName),
    });
    for (const d of c.dependencies) {
      const pkg = packageName(d);
      if (!deps.has(pkg)) newDeps.add(d);
      deps.add(pkg);
    }
  }

  // One heavy runtime is a choice; three is an accident.
  const heavy = chosen.filter((s) => s.weight === "heavy");
  if (heavy.length > 1) {
    const [keep, ...drop] = heavy;
    notes.push(
      `Dropped ${drop.map((d) => d.component).join(", ")}: only one heavy WebGL component per page, kept ${keep.component}.`,
    );
    for (const d of drop) {
      const i = chosen.findIndex((s) => s.component === d.component);
      if (i !== -1) chosen.splice(i, 1);
    }
  }

  if (chosen.length === 0) {
    notes.push("No React Bits component was a good fit; building this with plain Tailwind.");
  }

  // Recompute dependencies against the final selection.
  const finalDeps = new Set<string>();
  for (const s of chosen) {
    const c = catalogue.components.find((x) => x.name === s.component);
    for (const d of c?.dependencies ?? []) {
      if (!(req.existingDependencies ?? []).includes(packageName(d))) finalDeps.add(d);
    }
  }

  return { kind, selections: chosen, newDependencies: [...finalDeps], notes };
}

/** Components usable when the sandbox can only carry light runtimes. */
export function lightweightAlternatives(component: CatalogueComponent, limit = 3) {
  return searchComponents({
    q: `${component.title} ${component.animation}`,
    layer: component.layer,
    section: component.sections[0],
    maxWeight: "light",
    limit,
  })
    .filter((h) => h.component.name !== component.name)
    .map((h) => h.component.name);
}
