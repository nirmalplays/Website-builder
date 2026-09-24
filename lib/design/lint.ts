import type { Direction } from "./directions";
import { CLICHES, DESIGN_BASE_PATH } from "./brief";

/**
 * A static check for the patterns that make a page read as AI-generated.
 *
 * The prompt asks the model to avoid these, but a prompt is a request and
 * models drift back towards the average, especially on long outputs and cheap
 * tiers. This checks what actually came back, so the route can spend one pass
 * fixing the specific problems it finds. Each finding says what to do instead,
 * because "this is generic" gives the model nothing to act on.
 */

export type DesignFinding = { id: string; weight: number; detail: string };

const SHARP_DIRECTIONS = new Set(["editorial", "quiet-luxury", "swiss", "poster", "gallery", "night-signal", "industrial"]);

function count(text: string, re: RegExp): number {
  return text.match(new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`))?.length ?? 0;
}

function uniqueMatches(text: string, re: RegExp, limit = 6): string[] {
  const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
  return [...new Set(text.match(g) ?? [])].slice(0, limit);
}

/** Only the files the model wrote: installed components and managed files are not its to fix. */
export function authoredSource(files: Record<string, string>, installed: string[] = []): string {
  const skip = new Set([DESIGN_BASE_PATH, ...installed]);
  return Object.entries(files)
    .filter(([path]) => !skip.has(path) && /\.(t|j)sx?$/.test(path))
    .map(([, content]) => content)
    .join("\n");
}

export function lintDesign(source: string, d: Direction | null): DesignFinding[] {
  const findings: DesignFinding[] = [];
  const add = (id: string, weight: number, detail: string) => findings.push({ id, weight, detail });

  if (/bg-clip-text/.test(source) && /text-transparent/.test(source)) {
    add("gradient-text", 3, "Gradient-filled heading text (bg-clip-text text-transparent). Remove it: headings are solid ink colour, and emphasis comes from size, weight, italic, or one word in the accent colour.");
  }

  const aiHues = uniqueMatches(source, /\b(?:from|via|to|bg|text|border|ring|shadow)-(?:indigo|violet|purple|fuchsia)-\d{2,3}\b/);
  if (aiHues.length) {
    add("ai-palette", 3, `Indigo/violet/purple utility colours (${aiHues.join(", ")}). Replace each with a value from the contract palette.`);
  }

  if (/\bbg-gradient-to-[trbl]{1,2}\b[^"'`]*\bfrom-/.test(source) && count(source, /\bbg-gradient-to-/) >= 3) {
    add("gradient-soup", 2, "Gradients on several surfaces. Use flat colour from the palette; keep at most one gradient, and only as a photo scrim.");
  }

  const named = uniqueMatches(
    source,
    /\b(?:bg|text|border|from|to|via|ring|divide|fill|stroke)-(?:slate|gray|zinc|neutral|stone|blue|sky|cyan|teal|emerald|orange|amber|yellow|pink|rose|lime)-\d{2,3}\b/,
    8,
  );
  const namedCount = count(
    source,
    /\b(?:bg|text|border|from|to|via|ring|divide|fill|stroke)-(?:slate|gray|zinc|neutral|stone|blue|sky|cyan|teal|emerald|orange|amber|yellow|pink|rose|lime)-\d{2,3}\b/,
  );
  if (d && namedCount > 10) {
    add("off-palette", 2, `${namedCount} Tailwind named-colour classes (${named.join(", ")}...). Replace them with the contract hex values: ground ${d.palette.ground}, surface ${d.palette.surface}, ink ${d.palette.ink}, muted ${d.palette.muted}, line ${d.palette.line}, accent ${d.palette.accent}.`);
  }

  if (d && !source.toLowerCase().includes(d.palette.accent.toLowerCase())) {
    add("palette-ignored", 2, `The contract accent ${d.palette.accent} is never used, so the page is not in the chosen palette. Apply the palette.`);
  }

  if (d) {
    const displayToken = d.fonts.display.replace(/ /g, "_");
    if (!source.includes(displayToken) && !source.includes(d.fonts.display)) {
      add("no-display-face", 1, `The display face ${d.fonts.display} is never set. Apply the h1/h2 class strings from the contract.`);
  }

  // The body face going unset is the more damaging of the two and was not
  // checked. Unstyled body copy falls back to the system UI stack, which is
  // most of what "looks AI-generated" actually is - and it is the bulk of the
  // page, so it reads as generic even when the headline is right.
  if (!source.includes(`'${d.fonts.body}'`) && !source.includes(d.fonts.body)) {
    add("no-body-face", 2, `The body face ${d.fonts.body} is never set, so body copy falls back to the system font. Apply the body/lead class strings from the contract.`);
    }
  }

  const blobs = count(source, /\bblur-(?:2xl|3xl)\b|\bblur-\[\d{2,3}px\]/);
  if (blobs > 0) {
    add("glow-blobs", 2, "Blurred glow blobs as decoration. Remove them; use the direction's own signature moves (rules, bands, photography, type) for atmosphere.");
  }

  const emoji = uniqueMatches(source.replace(/[©®™]/g, ""), /\p{Extended_Pictographic}/u);
  if (emoji.length) {
    add("emoji", 2, `Emoji used as decoration or icons (${emoji.join(" ")}). Remove them or use a lucide-react icon.`);
  }

  const lower = source.toLowerCase();
  const cliches = CLICHES.filter((c) => new RegExp(`\\b${c.replace(/[-\s]/g, "[-\\s]")}\\b`).test(lower));
  if (cliches.length) {
    add("cliche-copy", cliches.length >= 2 ? 2 : 1, `Marketing clichés in the copy (${cliches.slice(0, 6).map((c) => `"${c}"`).join(", ")}). Rewrite those lines in the contract's voice: concrete facts, numbers, names, what actually happens.`);
  }

  if (/>\s*Get Started\s*</i.test(source) && />\s*Learn More\s*</i.test(source)) {
    add("stock-ctas", 1, `"Get Started" + "Learn More" buttons. Label actions with what they do for this subject (e.g. "Book a table", "See the menu", "Request a quote").`);
  }

  const threeUp = count(source, /(?:^|[\s"'`])(?:sm:|md:|lg:)?grid-cols-3\b/m);
  if (threeUp >= 3) {
    add("three-up", 2, `${threeUp} three-column card grids. Keep at most one; turn the others into the plan's layouts (numbered rows, asymmetric bento, sticky split, stat ledger).`);
  }

  const soft = count(source, /\bshadow-(?:md|lg|xl|2xl)\b/);
  if (soft > 5) {
    add("shadow-soup", 1, `${soft} soft drop shadows. Use borders and surface colour for depth; keep shadows for one floating element at most.`);
  }

  if (d && SHARP_DIRECTIONS.has(d.id)) {
    const round = count(source, /\brounded-(?:xl|2xl|3xl)\b/);
    if (round > 3) {
      add("radius-drift", 2, `${round} large-radius elements (rounded-xl/2xl/3xl) in a direction that is square-cornered. ${d.shape}`);
    }
  }

  if (/\bSparkles\b/.test(source)) {
    add("sparkles", 1, "The Sparkles icon is the most recognisable AI-generated motif. Replace it with an icon that means something for this subject, or none.");
  }

  if (/rounded-full[^"'`]*\b(?:px-3|px-4)[^"'`]*\b(?:py-1|py-1\.5)\b[^"'`]*\b(?:text-xs|text-sm)\b/.test(source) && /\bNew\b|\bIntroducing\b|\bAnnouncing\b/.test(source)) {
    add("announce-pill", 1, `A pill badge announcing something "New" above the headline. Remove it unless the brief is literally a launch; use the direction's eyebrow style instead.`);
  }

  return findings;
}

export function designScore(findings: DesignFinding[]): number {
  return findings.reduce((sum, f) => sum + f.weight, 0);
}

/** Worth one extra model call? */
export const POLISH_THRESHOLD = Number(process.env.DESIGN_POLISH_THRESHOLD ?? 3);

export function polishPrompt(findings: DesignFinding[], d: Direction | null): string {
  return [
    "DESIGN REVIEW - the build works, but a design review found these problems. Fix them.",
    "",
    ...findings
      .sort((a, b) => b.weight - a.weight)
      .map((f, i) => `${i + 1}. [${f.id}] ${f.detail}`),
    "",
    d ? `Keep to the ${d.name} design contract above.` : "Keep to the design direction already in the code.",
    "Rules:",
    "- Return ONLY the files you change, each in full, same fenced format.",
    "- Change styling and copy only. Keep every piece of state, every handler, every",
    "  prop, every export name and every file path exactly as it is.",
    "- Do not touch /designBase.ts or any pre-installed React Bits component.",
  ].join("\n");
}
