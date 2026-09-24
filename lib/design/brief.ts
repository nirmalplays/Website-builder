import type { Direction } from "./directions";
import { HEROES, SECTIONS } from "./compositions";

/**
 * Turns a Direction into the text the planner and the build read, and into
 * the small stylesheet every generated project imports.
 */

/** Phrases that mark copy as machine-written. Shared with the linter. */
export const CLICHES = [
  "elevate", "unlock", "unleash", "seamless", "seamlessly", "revolutionize", "revolutionise",
  "supercharge", "empower", "game-changer", "game changer", "cutting-edge", "next-level",
  "transform your", "welcome to", "look no further", "fast-paced", "your journey",
  "take your", "to the next level", "like never before", "one-stop", "state-of-the-art",
  "world-class", "effortlessly", "harness the power", "in today's", "dive into", "discover the",
  "crafted with", "reimagined", "redefine", "tailored solutions", "innovative solutions",
];

/** For the planner: enough to plan with, and the layouts it may choose from. */
export function directionForPlanner(d: Direction): string {
  const heroes = d.heroes
    .map((id) => HEROES[id])
    .filter(Boolean)
    .map((c) => `  - ${c.id}: ${c.name}. ${c.build}`);
  const sections = d.sections
    .map((id) => SECTIONS[id])
    .filter(Boolean)
    .map((c) => `  - ${c.id}: ${c.name}. ${c.build}`);

  return [
    `ART DIRECTION FOR THIS BUILD: ${d.name.toUpperCase()}`,
    `The visual identity is already chosen. Do not invent a different palette or`,
    `different fonts: plan the content and layout for THIS direction.`,
    ``,
    d.essence,
    ``,
    `Voice: ${d.voice}`,
    `Imagery: ${d.imagery}`,
    ``,
    `HERO LAYOUTS - pick exactly one id for "hero":`,
    ...heroes,
    ``,
    `SECTION LAYOUTS - give each section a "layout" id from this list where one fits.`,
    `Do not give two adjacent sections the same layout. Sections with no good fit`,
    `may use "custom" and describe their layout in "purpose".`,
    ...sections,
    ``,
    `Signature moves of this direction (plan where each goes):`,
    ...d.signature.map((s) => `  - ${s}`),
  ].join("\n");
}

/**
 * For the build: the design as a contract with exact values to copy.
 *
 * Class strings are given whole because models reproduce a literal string far
 * more faithfully than they turn a description into one.
 */
export function directionContract(
  d: Direction,
  chosen: { hero?: string; sections?: string[] } = {},
): string {
  const p = d.palette;
  const heroComp = chosen.hero ? HEROES[chosen.hero] : undefined;
  const sectionComps = [...new Set(chosen.sections ?? [])]
    .map((id) => SECTIONS[id])
    .filter(Boolean);

  const lines = [
    `DESIGN CONTRACT - ${d.name.toUpperCase()}`,
    `This is the design system for this build. Use these exact values. The`,
    `only things that override it: colours, fonts or a style the USER REQUEST`,
    `explicitly names, or an attached reference image.`,
    ``,
    d.essence,
    ``,
    `PALETTE - use these hex values as Tailwind arbitrary classes (bg-[#..], text-[#..],`,
    `border-[#..]). No Tailwind named colours (slate, gray, blue, indigo...), no other`,
    `hex values, except green/red for success and error messages.`,
    `  ground   ${p.ground}   page background`,
    `  surface  ${p.surface}   panels, alternate sections`,
    `  ink      ${p.ink}   main text`,
    `  muted    ${p.muted}   secondary text`,
    `  line     ${p.line}   borders, rules`,
    `  accent   ${p.accent}   primary action and at most 3 other small moments on the page`,
    `  onAccent ${p.onAccent}   text on the accent`,
    ...(p.band ? [`  band     ${p.band}   ONE contrasting full-width section, text ${p.onBand}`] : []),
    ``,
    `TYPE - copy these class strings exactly:`,
    `  h1 / display : ${d.type.display}`,
    `  h2           : ${d.type.h2}`,
    `  h3           : ${d.type.h3}`,
    `  lead         : ${d.type.lead}`,
    `  body         : ${d.type.body}`,
    `  eyebrow      : ${d.type.eyebrow}`,
    `  meta/caption : ${d.type.meta}`,
    `Fonts: display ${d.fonts.display}, body ${d.fonts.body}, mono ${d.fonts.mono}. No other families.`,
    `The page wrapper gets bg-[${p.ground}] text-[${p.ink}] and the body font class.`,
    `Paragraphs get max-w-prose or a column span; never full-width text.`,
    ``,
    `COMPONENTS - copy these class strings:`,
    `  primary button   : ${d.ui.primaryButton}`,
    `  secondary action : ${d.ui.secondaryButton}`,
    ...(d.ui.surface ? [`  panel / card     : ${d.ui.surface}`] : []),
    `  inline link      : ${d.ui.link}`,
    `  text input       : ${d.ui.input}`,
    `Shape: ${d.shape}`,
    ``,
    `SIGNATURE MOVES - include at least three of these:`,
    ...d.signature.map((s) => `  - ${s}`),
    ``,
    `COPY VOICE: ${d.voice}`,
    `IMAGERY: ${d.imagery}`,
  ];

  if (heroComp) {
    lines.push(``, `HERO LAYOUT - ${heroComp.name}:`, `  ${heroComp.build}`);
  }
  if (sectionComps.length) {
    lines.push(``, `SECTION LAYOUTS USED IN THE PLAN:`);
    for (const c of sectionComps) lines.push(`  - ${c.id} (${c.name}): ${c.build}`);
  }

  lines.push(
    ``,
    `MOTION: ${
      d.motion === "none"
        ? "Almost none. Hover and focus transitions only (transition-colors, 150-300ms). No scroll animations, no animated backgrounds."
        : d.motion === "subtle"
          ? "Restrained. Hover transitions, one gentle reveal on the hero, a marquee if the plan has one. No animated backgrounds."
          : "One ambient element behind the hero is allowed if installed; everything else restrained."
    }`,
    `Do NOT write /designBase.ts and do not import it: it is managed for you and`,
    `already loads the fonts, colours and focus styles above.`,
  );

  return lines.join("\n");
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const DESIGN_BASE_PATH = "/designBase.ts";
export const DESIGN_BASE_IMPORT = `import "./designBase";`;

/**
 * A module that injects base typography and colour for the direction.
 *
 * It is a floor, not the design: if the model forgets a font class, headings
 * still get the display face and text still sits on the right ground, rather
 * than falling back to the system font on white, which looks generic whatever
 * the layout. Written as a TS module that adds a <style> tag rather than as a
 * CSS file so it works everywhere the project runs: Sandpack, the esbuild
 * verification bundle, and published sites all start from /App.tsx.
 */
export function designBaseFile(d: Direction): string {
  const p = d.palette;
  const dark = luminance(p.ground) < 0.2;
  const css = [
    `:root{--ground:${p.ground};--surface:${p.surface};--ink:${p.ink};--muted:${p.muted};--line:${p.line};--accent:${p.accent};--on-accent:${p.onAccent};color-scheme:${dark ? "dark" : "light"}}`,
    `html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;scroll-behavior:smooth;background:${p.ground}}`,
    `body{margin:0;background:${p.ground};color:${p.ink};font-family:'${d.fonts.body}',system-ui,sans-serif;font-feature-settings:"kern","liga","calt"}`,
    `h1,h2{font-family:'${d.fonts.display}',${/Serif|Garamond|Bodoni|Baskerville|Fraunces|Playfair/.test(d.fonts.display) ? "Georgia,serif" : "system-ui,sans-serif"};text-wrap:balance}`,
    `h3,h4{text-wrap:balance}`,
    `p,li,blockquote{text-wrap:pretty}`,
    `code,kbd,pre,samp{font-family:'${d.fonts.mono}',ui-monospace,monospace}`,
    `::selection{background:${p.accent};color:${p.onAccent}}`,
    `:focus-visible{outline:2px solid ${p.accent};outline-offset:3px}`,
    `.tabular-nums,table{font-variant-numeric:tabular-nums}`,
    `@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}`,
  ].join("\n");

  return `// Managed by the generator (${d.id}). Base type and colour for this design.
// Changes here are overwritten on the next build.
const css = ${JSON.stringify(css)};

if (typeof document !== "undefined" && !document.getElementById("design-base")) {
  const style = document.createElement("style");
  style.id = "design-base";
  style.textContent = css;
  document.head.appendChild(style);
}

export {};
`;
}

/** The direction id recorded in an existing project's base file, if any. */
export function directionIdFromFiles(files: Record<string, string>): string | undefined {
  return files[DESIGN_BASE_PATH]?.match(/Managed by the generator \(([\w-]+)\)/)?.[1];
}

/** Makes sure /App.tsx loads the base file. Safe to call repeatedly. */
export function ensureDesignBaseImport(files: Record<string, string>): Record<string, string> {
  const app = files["/App.tsx"];
  if (!app || !files[DESIGN_BASE_PATH]) return files;
  if (/import\s+["']\.\/designBase(?:\.ts)?["']/.test(app)) return files;
  return { ...files, "/App.tsx": `${DESIGN_BASE_IMPORT}\n${app}` };
}
