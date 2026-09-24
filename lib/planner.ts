import { PLANNER_THINKING_BUDGET } from "@/lib/config";
import { generateWithFallback } from "@/lib/providers";
import { resolveComponents, type PageKind } from "@/lib/react-bits/resolver";
import { getComponent, packageName, searchComponents } from "@/lib/react-bits/search";
import { uiuxBrief } from "@/lib/skills/uiuxBrief";
import { directionForPlanner } from "@/lib/design/brief";
import { HEROES, SECTIONS } from "@/lib/design/compositions";
import type { Direction, Motion } from "@/lib/design/directions";

/**
 * The thinking step.
 *
 * Before any code is written the model plans the build: what this thing is, how
 * it is structured, which files exist, what the design direction is. The plan
 * then drives component resolution and the build prompt, so the result is a
 * considered application rather than a one-shot generic page.
 */

export type BuildPlan = {
  summary: string;
  kind: PageKind;
  /** Design direction in the planner's own words - palette, type, mood. */
  design: {
    mood: string;
    palette: string;
    typography: string;
    /** Concrete things that make this look specific rather than templated. */
    signatureDetails: string[];
  };
  sections: { name: string; purpose: string; content: string; layout?: string }[];
  /** Hero composition id from lib/design/compositions.ts. */
  hero?: string;
  /** The art direction this plan was written for. */
  direction?: string;
  files: { path: string; purpose: string }[];
  state: string[];
  /** Page regions where an animated component would genuinely help. */
  animationOpportunities: string[];
  /** Filled in after the plan, not by the model. */
  components?: { component: string; reason: string; section: string; weight: string }[];
  dependencies?: Record<string, string>;
  /** The model that actually produced this plan. */
  modelUsed?: string;
  /** Set when the requested model was busy and a fallback model answered instead. */
  switchedFrom?: string;
};

/**
 * What the planner is told about design.
 *
 * The identity itself (palette, type, layouts) now comes from a Direction
 * chosen in code; see lib/design/directions.ts. Asking the planner to invent
 * one produced the same few safe choices on every build. What the planner
 * still decides is which layouts to use, what the copy says, and where the
 * signature moves go.
 */
const ART_DIRECTION_BRIEF = `DESIGN - the plan is where a page stops being generic.

The art direction is given below. Your job is to apply it to THIS subject:
- Pick the hero layout and a layout per section from the lists given.
  Different adjacent layouts; a varied rhythm of tall, tight and full-bleed.
- signatureDetails: say where each signature move goes, in concrete terms
  specific to this subject ("the menu's prices in mono with dotted leaders").
- Write the real copy now, in the direction's voice. Specific facts, numbers,
  names, places and prices. No marketing clichés ("elevate", "unlock",
  "seamless", "transform your", "welcome to"), no "Lorem", no "Acme".
- Label actions by what they do for this subject ("Book a table", "Get a
  fixed quote"), never "Get Started" / "Learn More".

Do not plan: gradient headings, three equal cards in a row, a row of three
testimonial cards with stars, a "New" pill above the headline, identical
padding on every section, or a centred hero with two side-by-side buttons.

Motion: only where the direction allows it. A still page that is well set
beats an animated one that is not.`;

const PLANNER_SYSTEM = `You are the architect for a UI generation system. You do not write code in this step.

Given a request, produce a build plan as JSON. Think about what would make this
specific and excellent rather than a generic template.

${ART_DIRECTION_BRIEF}

Return ONLY a JSON object, no fences, no commentary, with exactly these keys:

{
  "summary": "one sentence describing what you are building",
  "kind": "marketing" | "app" | "dashboard" | "form" | "content",
  "design": {
    "mood": "the feeling this should give, in a few words",
    "palette": "how the given palette is deployed: what gets the accent, which section gets the band colour",
    "typography": "where the display face is used and how big",
    "signatureDetails": ["3-5 concrete details that make this look designed, not templated"]
  },
  "hero": "one hero layout id from the list",
  "sections": [
    { "name": "hero", "layout": "a section layout id, or custom", "purpose": "what it does for the user", "content": "the actual copy and data it shows" }
  ],
  "files": [
    { "path": "/App.tsx", "purpose": "composes the page" },
    { "path": "/components/Something.tsx", "purpose": "..." }
  ],
  "state": ["what the app holds in state and what mutates it"],
  "animationOpportunities": ["section names where motion would genuinely help, or [] if none"]
}

RULES:
- Split the UI into real files. One giant file is a failure: aim for /App.tsx
  plus a component file per meaningful section or reusable piece.
- Be concrete in "content": invent the real copy, names, prices and numbers now,
  so the build step is not improvising.
- Design must be specific. "Modern and clean" is a non-answer. Say where the
  accent goes, which section gets the band colour, and the one detail people
  will remember.
- animationOpportunities is where motion genuinely helps. Marketing surfaces
  reward it most, but an app or dashboard has them too: an empty state, a
  metric that counts up, a list that staggers in, a hero header, a loading
  surface. Name those. Keep it honest - a dense data table or a plain form
  wants none, and [] is the right answer there. Do not decorate a working
  tool into uselessness.
- For an app, plan the data model and the operations on it, not just the layout.`;

function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*\n([\s\S]*?)```/);
  const text = (fenced ? fenced[1] : raw).trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("planner returned no JSON object");
  return JSON.parse(text.slice(start, end + 1));
}

export async function buildPlan(options: {
  prompt: string;
  model: string;
  history?: { role: "user" | "assistant"; content: string }[];
  document?: { name: string; text: string };
  image?: { data: string; mimeType: string };
  allowHeavyComponents?: boolean;
  /** Time left in the request. Planning must not eat the build's whole budget. */
  timeoutMs?: number;
  /** The art direction chosen for this build. */
  direction?: Direction;
}): Promise<BuildPlan> {
  // Industry reference for this specific brief, matched from a catalogue of 192
  // product types. Empty when nothing matches confidently. With a direction
  // chosen, only its industry notes are kept: its palette and font pairing
  // would contradict the direction's.
  const direction = options.direction;
  const brief = uiuxBrief(options.prompt, { visuals: !direction });
  const system = [
    PLANNER_SYSTEM,
    direction ? directionForPlanner(direction) : "",
    options.image && direction
      ? "An image is attached. Where it shows a clear visual style, follow the image over the art direction."
      : "",
    brief,
  ]
    .filter(Boolean)
    .join("\n\n");

  const res = await generateWithFallback({
    system,
    history: [],
    prompt: options.prompt,
    document: options.document,
    image: options.image,
    model: options.model,
    maxOutputTokens: 4096,
    temperature: 0.8,
    // Planning is exactly where reasoning earns its cost.
    thinkingBudget: PLANNER_THINKING_BUDGET,
    timeoutMs: options.timeoutMs,
  });

  const parsed = extractJson(res.text) as BuildPlan;

  // Shape guards: a malformed plan must not take the build down.
  const plan: BuildPlan = {
    summary: String(parsed.summary ?? options.prompt).slice(0, 300),
    kind: (parsed.kind ?? "unknown") as PageKind,
    design: {
      mood: String(parsed.design?.mood ?? ""),
      palette: String(parsed.design?.palette ?? ""),
      typography: String(parsed.design?.typography ?? ""),
      signatureDetails: Array.isArray(parsed.design?.signatureDetails)
        ? parsed.design.signatureDetails.map(String).slice(0, 6)
        : [],
    },
    sections: Array.isArray(parsed.sections)
      ? parsed.sections.slice(0, 14).map((sec) => ({
          name: String(sec?.name ?? ""),
          purpose: String(sec?.purpose ?? ""),
          content: String(sec?.content ?? ""),
          // An unknown id is dropped rather than passed on: the build expands
          // each id into a layout description, and a made-up id expands to nothing.
          layout: sec?.layout && SECTIONS[String(sec.layout)] ? String(sec.layout) : undefined,
        }))
      : [],
    hero: pickHero(parsed.hero, direction),
    direction: direction?.id,
    files: Array.isArray(parsed.files) ? parsed.files.slice(0, 16) : [{ path: "/App.tsx", purpose: "the app" }],
    state: Array.isArray(parsed.state) ? parsed.state.map(String).slice(0, 12) : [],
    animationOpportunities: Array.isArray(parsed.animationOpportunities)
      ? parsed.animationOpportunities.map(String).slice(0, 6)
      : [],
    modelUsed: res.model,
    switchedFrom: res.switchedFrom,
  };

  if (!plan.files.some((f) => f.path === "/App.tsx")) {
    plan.files.unshift({ path: "/App.tsx", purpose: "composes the application" });
  }

  return plan;
}

/** The planner's hero choice if the direction allows it, else the direction's first. */
function pickHero(raw: unknown, direction: Direction | undefined): string | undefined {
  const id = typeof raw === "string" ? raw : "";
  if (!direction) return HEROES[id] ? id : undefined;
  return direction.heroes.includes(id) ? id : direction.heroes[0];
}

/**
 * Match the plan's animation opportunities against the React Bits catalogue.
 * Nothing is forced: a plan with no opportunities gets no components.
 *
 * `motion` is how much movement the art direction wants. An animated backdrop
 * plus a kinetic headline on every page had become a sign that a page was
 * generated, so only "ambient" directions get them unless the prompt asks.
 */
export function selectComponents(
  plan: BuildPlan,
  prompt: string,
  allowHeavy = false,
  motion: Motion = "ambient",
) {
  // A form with no animation opportunities genuinely wants none. But an app or
  // dashboard that named some should get them: previously anything that wasn't
  // "marketing" was refused outright, which switched React Bits off for every
  // full-stack app the planner produced, however much motion it asked for.
  if (plan.animationOpportunities.length === 0 && plan.kind !== "marketing") {
    return { selections: [], dependencies: {}, notes: ["The plan asked for no motion."] };
  }

  const searchPrompt = `${prompt} ${plan.design.mood} ${plan.animationOpportunities.join(" ")}`;
  const sections = plan.animationOpportunities.length
    ? plan.animationOpportunities.map(mapSection)
    : undefined;

  const resolved = resolveComponents({
    prompt: searchPrompt,
    kind: plan.kind,
    sections,
    // "light" excluded every medium component - MagicBento, ScrollReveal,
    // DotGrid and most of the catalogue's best work - unless the prompt
    // happened to say "3d" or "webgl". Medium is the sensible ceiling; heavy
    // (WebGL, three.js) still has to be asked for.
    maxWeight: allowHeavy ? "heavy" : "medium",
  });

  const askedForMotion =
    /\b(animat\w*|motion|particles?|3d|webgl|shader|parallax|interactive background)\b/i.test(prompt);
  const allowed = (name: string) => {
    if (askedForMotion || motion === "ambient") return true;
    const meta = getComponent(name);
    if (!meta || meta.layer === "background") return false;
    if (motion === "none") return meta.category === "Micro" || meta.category === "Components";
    return meta.category !== "Backgrounds";
  };

  const selections = resolved.selections.filter((sel) => allowed(sel.component));
  const dropped = resolved.selections.filter((sel) => !allowed(sel.component));
  // Rebuilt from what survived, so a dropped component leaves no package behind.
  const newDependencies = [
    ...new Set(selections.flatMap((sel) => getComponent(sel.component)?.dependencies ?? [])),
  ];
  const notes = [...resolved.notes];
  if (dropped.length) {
    notes.push(
      `Left out ${dropped.map((d) => d.component).join(", ")}: this art direction keeps motion ${motion === "none" ? "to a minimum" : "restrained"}.`,
    );
  }

  /*
   * An ambient backdrop behind the hero is the single biggest difference
   * between a generated page and a designed one, and the medium ceiling made
   * it unreachable: 51 of the 58 background components are heavy, so unless
   * the prompt happened to say "webgl" the search could only ever return the
   * seven light ones, and usually returned none. The design skill asks for a
   * hero backdrop; this is what lets it actually have one.
   *
   * Exactly one, and only when nothing else already covers the hero. The
   * weight ceiling still applies to everything else, so the page pays for one
   * canvas rather than five.
   */
  const hasBackdrop = selections.some((sel) => getComponent(sel.component)?.layer === "background");

  if (!hasBackdrop && !allowHeavy && plan.kind !== "form" && (motion === "ambient" || askedForMotion)) {
    // Searched rather than resolved: the resolver has no layer filter, and a
    // backdrop is exactly the one axis that has to be pinned here.
    const [hit] = searchComponents({
      q: searchPrompt,
      layer: "background",
      section: "hero",
      maxWeight: "heavy",
      limit: 1,
    });

    if (hit) {
      const meta = hit.component;
      selections.push({
        component: meta.name,
        reason: "ambient backdrop behind the hero",
        section: "hero",
        weight: meta.weight,
        dependencies: meta.dependencies,
      });
      for (const spec of meta.dependencies) {
        if (!newDependencies.includes(spec)) newDependencies.push(spec);
      }
      notes.push(`Added ${meta.name} as the hero backdrop.`);
    }
  }

  resolved.selections = selections;
  resolved.newDependencies = newDependencies;
  resolved.notes = notes;

  const dependencies: Record<string, string> = {};
  for (const spec of resolved.newDependencies) {
    const pkg = packageName(spec);
    dependencies[pkg] = spec.slice(pkg.length + 1) || "latest";
  }

  return { selections: resolved.selections, dependencies, notes: resolved.notes };
}

/** Plans name sections freely; the catalogue uses a fixed vocabulary. */
function mapSection(name: string): string {
  const n = name.toLowerCase();
  if (/hero|banner|masthead/.test(n)) return "hero-heading";
  if (/background|backdrop|ambient/.test(n)) return "background";
  if (/feature|benefit|card/.test(n)) return "features";
  if (/stat|metric|number|count/.test(n)) return "stats";
  if (/logo|client|brand|showcase|gallery|carousel/.test(n)) return "showcase";
  if (/nav|header|menu/.test(n)) return "navigation";
  if (/cta|call to action|button|signup/.test(n)) return "cta";
  return "content";
}

/** The plan, rendered for the build prompt. */
export function planToPrompt(
  plan: BuildPlan,
  components: { component: string; reason: string; section: string }[],
): string {
  const lines: string[] = [
    `BUILD PLAN - follow it. You wrote this yourself in the planning step.`,
    ``,
    `What: ${plan.summary}`,
    ``,
    `DESIGN DIRECTION (this is what stops the result looking generic):`,
    `- Mood: ${plan.design.mood}`,
    `- Palette: ${plan.design.palette}`,
    `- Typography: ${plan.design.typography}`,
    ...plan.design.signatureDetails.map((d) => `- Signature detail: ${d}`),
    ``,
    ...(plan.hero ? [``, `HERO LAYOUT: ${plan.hero} (described in the design contract)`] : []),
    ``,
    `SECTIONS, in order:`,
    ...plan.sections.map(
      (s) => `- ${s.name}${s.layout ? ` [layout: ${s.layout}]` : ""}: ${s.purpose}\n    content: ${s.content}`,
    ),
    ``,
    `FILES TO WRITE:`,
    ...plan.files.map((f) => `- ${f.path}: ${f.purpose}`),
  ];

  if (plan.state.length) {
    lines.push(``, `STATE AND BEHAVIOUR:`, ...plan.state.map((s) => `- ${s}`));
  }

  if (components.length) {
    lines.push(
      ``,
      `REACT BITS COMPONENTS ALREADY INSTALLED IN THIS PROJECT - USE THEM:`,
      `These files are already written and sitting in /components/. They are the`,
      `reason this app will look better than a hand-rolled one. Import each one`,
      `and render it in the section named below.`,
      `Do not rewrite them, do not emit a file with the same name, and do not`,
      `invent props they do not have.`,
      ``,
    );
    for (const sel of components) {
      const meta = getComponent(sel.component);
      if (!meta) continue;
      const props = Object.entries(meta.props)
        .slice(0, 12)
        .map(([k, v]) => `${k}${v.required ? "" : "?"}: ${v.type}`)
        .join("; ");
      lines.push(
        `- ${meta.name} -> import ${meta.name} from "./components/${meta.name}"`,
        `    ${meta.description}`,
        `    use for: ${sel.reason}`,
        props ? `    props: ${props}` : `    props: none documented`,
      );
    }
  }

  return lines.join("\n");
}
