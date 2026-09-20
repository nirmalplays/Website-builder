import { getProvider } from "@/lib/providers";
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
};

const PLANNER_SYSTEM = `You are the architect for a UI generation system. You do not write code in this step.

Given a request, produce a build plan as JSON. Think about what would make this
specific and excellent rather than a generic template.

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
- animationOpportunities should be empty for forms and mostly empty for
  dashboards. Motion is for marketing surfaces and moments that reward it.
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
}): Promise<BuildPlan> {
  const provider = getProvider();

  const res = await provider.generate({
    system: PLANNER_SYSTEM,
    history: [],
    prompt: options.prompt,
    document: options.document,
    image: options.image,
    model: options.model,
    maxOutputTokens: 4096,
    temperature: 0.8,
    // Planning is exactly where reasoning earns its cost.
    thinkingBudget: 2048,
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
  if (plan.animationOpportunities.length === 0 && plan.kind !== "marketing") {
    return { selections: [], dependencies: {}, notes: ["The plan asked for no motion."] };
  }

  const resolved = resolveComponents({
    prompt: `${prompt} ${plan.design.mood} ${plan.animationOpportunities.join(" ")}`,
    kind: plan.kind,
    sections: plan.animationOpportunities.length
      ? plan.animationOpportunities.map(mapSection)
      : undefined,
    maxWeight: allowHeavy ? "heavy" : "light",
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
      `REACT BITS COMPONENTS AVAILABLE IN THIS PROJECT:`,
      `These files already exist. Import and use them where the plan calls for motion.`,
      `Do not reimplement them and do not invent props they do not have.`,
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
