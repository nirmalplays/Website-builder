/**
 * Fonts the preview can actually render.
 *
 * Nothing but Tailwind's CDN was ever loaded into the sandbox, so every
 * generated page fell back to the system UI stack. That is the whole reason
 * the type looked generic - no instruction about typography could have worked,
 * because there was no typeface to instruct it towards.
 *
 * Curated deliberately against the defaults. Inter, Roboto, Open Sans, Lato
 * and Poppins are all excellent and all read as "a website" rather than as
 * this website, so none of them are here. Families are drawn from the Google
 * Fonts catalogue in the ui-ux-pro-max skill data, checked against it by name.
 *
 * Kept to sixteen families. The font URL is fetched on every preview, so this
 * is a bandwidth budget as much as an editorial one.
 */

export type FontRole = "display" | "body" | "mono";

type Family = {
  name: string;
  role: FontRole;
  /** Weights requested from Google Fonts. Fewer weights, faster preview. */
  weights: number[];
  /** Also serve the italic cut. Without it the browser slants the roman, which looks cheap. */
  italic?: boolean;
  note: string;
};

export const FONTS: Family[] = [
  // Display - the characterful half of a pairing, used big and sparingly.
  { name: "Playfair Display", role: "display", weights: [400, 700, 900], italic: true, note: "high-contrast serif; editorial, luxury" },
  { name: "Fraunces", role: "display", weights: [400, 500, 600, 700, 900], italic: true, note: "soft wonky serif; warm, crafted, artisanal" },
  { name: "Instrument Serif", role: "display", weights: [400], italic: true, note: "tight elegant serif; modern editorial" },
  { name: "DM Serif Display", role: "display", weights: [400], note: "clean didone; confident, expensive" },
  { name: "Bodoni Moda", role: "display", weights: [400, 700, 900], italic: true, note: "extreme contrast didone; fashion, gallery" },
  { name: "Libre Baskerville", role: "display", weights: [400, 700], italic: true, note: "bookish serif; trustworthy, literary" },
  { name: "Syne", role: "display", weights: [400, 700, 800], note: "eccentric wide grotesque; art, culture, odd" },
  { name: "Unbounded", role: "display", weights: [400, 700, 800, 900], note: "geometric display; bold, technical, loud" },
  { name: "Bricolage Grotesque", role: "display", weights: [400, 700, 800], note: "quirky editorial grotesque; indie, opinionated" },

  // Body - quiet, readable, and not one of the five everyone uses.
  { name: "Space Grotesk", role: "body", weights: [400, 500, 700], note: "technical grotesque; product, dev tools" },
  { name: "Manrope", role: "body", weights: [400, 500, 700], note: "geometric, slightly warm; clean product UI" },
  { name: "Outfit", role: "body", weights: [300, 400, 500, 700], note: "even geometric sans; modern, neutral-plus" },
  { name: "Sora", role: "body", weights: [400, 600], note: "squarish sans; fintech, serious" },
  { name: "Archivo", role: "body", weights: [400, 500, 700, 800, 900], note: "grotesque with real weight range; dense UI" },
  { name: "Inter Tight", role: "body", weights: [400, 500, 700], note: "tighter Inter; use when neutral is genuinely right" },
  // Added to cover the ui-ux-pro-max pairing catalogue: only 7 of its 74
  // pairings were usable against the original list, which made most of its
  // typography advice unfollowable. These five are the distinctive families it
  // reaches for most; Inter, Roboto, Poppins and Open Sans are still excluded,
  // and pairings naming Inter are served by Inter Tight above.
  { name: "Plus Jakarta Sans", role: "body", weights: [400, 500, 700], note: "modern geometric; product, fintech" },
  { name: "DM Sans", role: "body", weights: [400, 500, 700], note: "low-contrast geometric; calm, friendly" },
  { name: "IBM Plex Sans", role: "body", weights: [400, 500, 600], note: "engineered humanist; technical, editorial" },
  { name: "Atkinson Hyperlegible", role: "body", weights: [400, 700], note: "designed for legibility; accessibility-first" },
  { name: "Cormorant Garamond", role: "display", weights: [400, 600, 700], italic: true, note: "delicate garalde; literary, refined" },

  // Mono - metadata, figures, code. Tabular numerals matter for data.
  { name: "JetBrains Mono", role: "mono", weights: [400, 700], note: "code and technical metadata" },
  { name: "IBM Plex Mono", role: "mono", weights: [400, 500, 700], note: "warmer mono; labels, captions" },
  { name: "Space Mono", role: "mono", weights: [400, 700], note: "characterful mono; eyebrows, counters" },
];

/**
 * One stylesheet URL for the whole set.
 *
 * `display=swap` so text paints immediately in a fallback rather than sitting
 * invisible - a preview that flashes blank reads as a broken build.
 */
export function googleFontsUrl(families: Family[] = FONTS): string {
  const params = families
    .map((f) => {
      const family = f.name.replace(/ /g, "+");
      if (!f.italic) return `family=${family}:wght@${f.weights.join(";")}`;
      // Google Fonts wants tuples sorted: every roman weight, then every italic.
      const tuples = [...f.weights.map((w) => `0,${w}`), ...f.weights.map((w) => `1,${w}`)];
      return `family=${family}:ital,wght@${tuples.join(";")}`;
    })
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

/** The catalogue as the model sees it, grouped by the job each family does. */
export function fontManifest(): string {
  const byRole = (role: FontRole) =>
    FONTS.filter((f) => f.role === role)
      .map((f) => `  ${f.name} - ${f.note}`)
      .join("\n");

  return [
    "DISPLAY (headlines, one per page, set large)",
    byRole("display"),
    "",
    "BODY (paragraphs, UI text)",
    byRole("body"),
    "",
    "MONO (metadata, labels, figures, code)",
    byRole("mono"),
  ].join("\n");
}
