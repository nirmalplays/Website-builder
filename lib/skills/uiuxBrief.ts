import { PRODUCT_RULES, PALETTES, PAIRINGS, type Pairing, type ProductRule } from "./uiuxData.generated";

/**
 * Turns a prompt into an industry-specific design brief.
 *
 * The ui-ux-pro-max catalogues are 192 product types, 192 palettes and a set of
 * font pairings - together about 140KB, far too much to put in front of the
 * model on every build. They are also not meant to be read whole: the value is
 * in the ONE row that matches what is being built, which is why this matches
 * first and injects second.
 *
 * What that buys is a palette and a typeface pairing chosen for a law firm or a
 * fintech dashboard specifically, rather than invented fresh each time and
 * landing on the same tasteful defaults. Generic output is largely a model
 * reaching for the average in the absence of anything more specific; this is
 * the something more specific.
 */

/** Words that match almost anything and so distinguish nothing. */
const STOPWORDS = new Set([
  "app", "application", "website", "site", "page", "landing", "web", "build",
  "make", "create", "with", "that", "this", "from", "have", "your", "using",
  "simple", "modern", "clean", "nice", "good", "beautiful", "the", "and", "for",
]);

function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

export type UiuxMatch = {
  rule: ProductRule;
  palette: (typeof PALETTES)[string] | undefined;
  pairing: Pairing | undefined;
  score: number;
};

/**
 * Best-matching product type, or null when nothing fits well enough.
 *
 * A weak match is worse than none: handing a florist the fintech palette is a
 * confident wrong answer, and the model does better inventing a direction than
 * following a misapplied one. Hence the floor rather than always returning the
 * top row.
 */
export function matchProduct(prompt: string): UiuxMatch | null {
  const words = new Set(tokenise(prompt));
  if (words.size === 0) return null;

  let best: { rule: ProductRule; score: number } | null = null;

  for (const rule of PRODUCT_RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      const k = keyword.toLowerCase();
      // An exact keyword hit is worth more than a word appearing inside the
      // product-type label, which catches things like "app" in "Web App".
      if (words.has(k)) score += 3;
      else if (k.includes(" ") && prompt.toLowerCase().includes(k)) score += 4;
    }
    for (const w of tokenise(rule.type)) if (words.has(w)) score += 2;

    if (!best || score > best.score) best = { rule, score };
  }

  if (!best || best.score < 3) return null;

  return {
    rule: best.rule,
    palette: PALETTES[best.rule.type],
    pairing: pickPairing(best.rule, words),
    score: best.score,
  };
}

/** The pairing whose mood and intended use best fit this product. */
function pickPairing(rule: ProductRule, promptWords: Set<string>): Pairing | undefined {
  const target = new Set([
    ...tokenise(`${rule.type} ${rule.style} ${rule.considerations}`),
    ...promptWords,
  ]);

  let best: { pairing: Pairing; score: number } | undefined;
  for (const pairing of PAIRINGS) {
    let score = 0;
    for (const mood of pairing.mood) if (target.has(mood.toLowerCase())) score += 2;
    for (const w of tokenise(pairing.bestFor)) if (target.has(w)) score += 1;
    if (!best || score > best.score) best = { pairing, score };
  }
  return best && best.score > 0 ? best.pairing : undefined;
}

/**
 * The brief, as the planner reads it.
 *
 * Offered as a starting point rather than an order. These palettes are sound
 * and safe, and following one to the letter on every build would trade one kind
 * of sameness for another - so the planner is told it may depart, provided it
 * decides to rather than drifts.
 */
export function uiuxBrief(prompt: string, options: { visuals?: boolean } = {}): string {
  const match = matchProduct(prompt);
  if (!match) return "";

  // With an art direction already chosen, the catalogue's palette and fonts
  // would only contradict it. Its notes on the category are still useful.
  if (options.visuals === false) {
    return [
      `INDUSTRY NOTES - closest match: ${match.rule.type}`,
      `- Usual page content: ${match.rule.pattern}`,
      `- Watch out for: ${match.rule.considerations}`,
    ].join("\n");
  }

  const lines = [
    `INDUSTRY REFERENCE - closest match: ${match.rule.type}`,
    `Drawn from a catalogue of 192 product types. A researched starting point,`,
    `not an instruction: depart from it deliberately if the brief wants something`,
    `else, but do not drift back to defaults by accident.`,
    ``,
    `- Style that suits this category: ${match.rule.style}`,
    `- Usual page shape: ${match.rule.pattern}`,
    `- Watch out for: ${match.rule.considerations}`,
  ];

  if (match.palette) {
    lines.push(
      ``,
      `Reference palette (${match.palette.notes || "tuned for this category"}):`,
      `  background ${match.palette.background}   surface ${match.palette.card}`,
      `  text ${match.palette.foreground}   muted text ${match.palette.mutedForeground}`,
      `  border ${match.palette.border}   primary ${match.palette.primary}   accent ${match.palette.accent}`,
      `Use real hex values in the plan, whether these or better ones.`,
    );
  }

  if (match.pairing) {
    lines.push(
      ``,
      `Reference type pairing - "${match.pairing.name}", suits ${match.pairing.bestFor}:`,
      `  display: ${match.pairing.heading}`,
      `  body: ${match.pairing.body}`,
      `Both are loaded in the preview. Any pairing from the font list works.`,
    );
  }

  return lines.join("\n");
}
