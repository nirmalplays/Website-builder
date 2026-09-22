import { PLANNER_THINKING_BUDGET } from "@/lib/config";
import { generateWithFallback } from "@/lib/providers";
import { resolveComponents, type PageKind } from "@/lib/react-bits/resolver";
import { getComponent, packageName } from "@/lib/react-bits/search";

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
  sections: { name: string; purpose: string; content: string }[];
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
 * The art direction the planner works to.
 *
 * The plan is where a page stops being generic or fails to: it fixes the mood,
 * the palette and which animated components get installed, and the build step
 * can only execute what the plan asked for. Putting the direction only in the
 * build prompt was too late - by then the component list was already decided.
 */
const ART_DIRECTION_BRIEF = `ART DIRECTION - the plan is where a page stops being generic.

Choose ONE identity and let it decide every value you write below. Dark luxury,
editorial, technical density, brutalist, soft physical - or something the brief
itself implies, which beats all of them.

The design block is not decoration, it is the contract the build step follows:
- palette: 4-6 real hex values, each with a job. One accent, used sparingly.
- typography: a real scale with obvious contrast between display and body, and
  a decision about tracking. Timid steps read as a template.
- signatureDetails: concrete and specific to THIS subject. "Modern and clean"
  is not a detail. "Prices set in tabular figures against a hairline rule" is.

Do not plan: purple-to-blue gradient headings, three equal cards in a row,
identical padding on every section, rounded-xl everywhere, or a centred hero
with two side-by-side buttons. These are the average, and the average is what
we are trying to avoid.

Ask for animated components where they carry weight: one ambient backdrop
behind the hero, one kinetic treatment on the primary headline, pointer-
reactive surfaces for a feature or pricing cluster. Not everywhere - a page
that animates in every section reads as a showcase rather than a product.`;

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
    "palette": "specific colours with hex values and where each is used",
    "typography": "type treatment - scale, weight contrast, any display choice",
    "signatureDetails": ["3-5 concrete details that make this look designed, not templated"]
  },
  "sections": [
    { "name": "hero", "purpose": "what it does for the user", "content": "the actual copy and data it shows" }
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
- Design must be specific. "Modern and clean" is a non-answer. Name the colours,
  the type scale, the one unusual detail that makes it memorable.
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
}): Promise<BuildPlan> {
  const res = await generateWithFallback({
    system: PLANNER_SYSTEM,
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
    sections: Array.isArray(parsed.sections) ? parsed.sections.slice(0, 14) : [],
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

/**
 * Match the plan's animation opportunities against the React Bits catalogue.
 * Nothing is forced: a plan with no opportunities gets no components.
 */
export function selectComponents(plan: BuildPlan, prompt: string, allowHeavy = false) {
  // A form with no animation opportunities genuinely wants none. But an app or
  // dashboard that named some should get them: previously anything that wasn't
  // "marketing" was refused outright, which switched React Bits off for every
  // full-stack app the planner produced, however much motion it asked for.
  if (plan.animationOpportunities.length === 0 && plan.kind !== "marketing") {
    return { selections: [], dependencies: {}, notes: ["The plan asked for no motion."] };
  }

  const resolved = resolveComponents({
    prompt: `${prompt} ${plan.design.mood} ${plan.animationOpportunities.join(" ")}`,
    kind: plan.kind,
    sections: plan.animationOpportunities.length
      ? plan.animationOpportunities.map(mapSection)
      : undefined,
    // "light" excluded every medium component - MagicBento, ScrollReveal,
    // DotGrid and most of the catalogue's best work - unless the prompt
    // happened to say "3d" or "webgl". Medium is the sensible ceiling; heavy
    // (WebGL, three.js) still has to be asked for.
    maxWeight: allowHeavy ? "heavy" : "medium",
  });

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
    `SECTIONS:`,
    ...plan.sections.map((s) => `- ${s.name}: ${s.purpose}\n    content: ${s.content}`),
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
