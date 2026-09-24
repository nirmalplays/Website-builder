/**
 * Checks the art-direction system without calling a model.
 *
 *   node scripts/test-design.mjs
 *
 * - every direction's fonts are actually loaded by the preview
 * - every hero/section layout a direction names exists
 * - prompts land on sensible directions
 * - the design linter flags the baked templates (which predate this system and
 *   are the generic look we are moving away from) and passes a clean sample
 * - the managed /designBase.ts compiles and is imported exactly once
 */
import { build } from "esbuild";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const entry = `
export * from "./lib/design/directions";
export * from "./lib/design/compositions";
export * from "./lib/design/brief";
export * from "./lib/design/lint";
export { FONTS } from "./lib/skills/typography";
`;
const out = await build({
  stdin: { contents: entry, resolveDir: root, loader: "ts" },
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const mod = await import(`data:text/javascript;base64,${Buffer.from(out.outputFiles[0].text).toString("base64")}`);
const {
  DIRECTIONS, HEROES, SECTIONS, FONTS, pickDirection, lintDesign, designScore,
  designBaseFile, ensureDesignBaseImport, directionContract, POLISH_THRESHOLD,
} = mod;

let failures = 0;
const check = (ok, label) => {
  if (!ok) failures++;
  console.log(`${ok ? "  ok  " : "  FAIL"} ${label}`);
};

console.log("\nDirections");
const loaded = new Set(FONTS.map((f) => f.name));
for (const d of DIRECTIONS) {
  for (const font of Object.values(d.fonts)) check(loaded.has(font), `${d.id}: font "${font}" is loaded`);
  for (const h of d.heroes) check(Boolean(HEROES[h]), `${d.id}: hero layout "${h}" exists`);
  for (const s of d.sections) check(Boolean(SECTIONS[s]), `${d.id}: section layout "${s}" exists`);
  const contract = directionContract(d, { hero: d.heroes[0], sections: d.sections.slice(0, 3) });
  check(contract.includes(d.palette.accent) && contract.includes(d.type.display), `${d.id}: contract carries palette and type`);
}
check(new Set(DIRECTIONS.map((d) => d.id)).size === DIRECTIONS.length, "direction ids are unique");

console.log("\nMatching");
const expect = [
  ["A website for a sourdough bakery in Bristol", ["artisan", "soft-playful"]],
  ["Law firm website with attorney profiles and consultation form", ["editorial", "ledger"]],
  ["Landing page for a Postgres hosting API for developers", ["technical"]],
  ["Dentist clinic site with online booking", ["clinical-calm"]],
  ["Boxing gym with class timetable", ["poster"]],
  ["Luxury boutique hotel on the Amalfi coast", ["quiet-luxury"]],
  ["Plumbing and heating company, quote form", ["industrial"]],
  ["Photography portfolio for a fashion photographer", ["gallery"]],
  ["Esports tournament launch page", ["night-signal", "poster"]],
  ["University open day microsite", ["civic"]],
  ["Hiking tours in the Dolomites", ["field-guide"]],
  ["Accounting firm for small businesses", ["ledger", "editorial"]],
  ["A dark, playful website for a kids coding course", ["soft-playful", "technical", "night-signal", "poster", "quiet-luxury"]],
];
for (const [prompt, allowed] of expect) {
  const seen = new Set();
  for (let seed = 0; seed < 20; seed++) seen.add(pickDirection(prompt, seed).direction.id);
  const bad = [...seen].filter((id) => !allowed.includes(id));
  check(bad.length === 0, `"${prompt}" -> ${[...seen].join(" / ")}`);
}
const vague = new Set();
for (let seed = 0; seed < 40; seed++) vague.add(pickDirection("make me a website", seed).direction.id);
check(vague.size >= 3, `a vague prompt varies across directions (${[...vague].join(", ")})`);

console.log("\nLinter on the old baked templates (expected: most flagged)");
const templates = readdirSync(path.join(root, "templates")).filter((f) => f.endsWith(".tsx"));
let flagged = 0;
const tally = {};
for (const file of templates) {
  const src = readFileSync(path.join(root, "templates", file), "utf8");
  const d = pickDirection(file.replace(/-/g, " "), 1).direction;
  const findings = lintDesign(src, d);
  if (designScore(findings) >= POLISH_THRESHOLD) flagged++;
  for (const f of findings) tally[f.id] = (tally[f.id] ?? 0) + 1;
}
console.log(`       ${flagged}/${templates.length} would get a design review pass`);
console.log(`       ${Object.entries(tally).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join("  ")}`);
check(flagged / templates.length > 0.5, "linter catches the generic look");

const bakery = DIRECTIONS.find((d) => d.id === "artisan");
const clean = `
export default function App() {
  return (
    <main className="bg-[#F6EFE3] text-[#2B1D14] font-['DM_Sans',sans-serif]">
      <h1 className="${bakery.type.display}">The sourdough goes in at 4am.</h1>
      <p className="${bakery.type.body} max-w-[62ch]">It is usually gone by eleven. Rye, spelt and a white loaf, £4.20 each.</p>
      <button className="${bakery.ui.primaryButton}" onClick={() => {}}>Reserve a loaf</button>
    </main>
  );
}`;
const cleanFindings = lintDesign(clean, bakery);
check(designScore(cleanFindings) < POLISH_THRESHOLD, `a page that follows the contract passes (${cleanFindings.map((f) => f.id).join(", ") || "no findings"})`);

const generic = `
import { Sparkles } from "lucide-react";
export default function App() {
  return (
    <div className="bg-slate-50">
      <span className="rounded-full px-3 py-1 text-xs bg-indigo-100">New: AI features</span>
      <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Elevate your workflow</h1>
      <p>Unlock seamless collaboration. 🚀</p>
      <div className="absolute rounded-full blur-3xl bg-purple-400" />
      <button>Get Started</button><button>Learn More</button>
    </div>
  );
}`;
const genericFindings = lintDesign(generic, bakery);
check(
  ["gradient-text", "ai-palette", "glow-blobs", "emoji", "cliche-copy", "stock-ctas", "sparkles"].every((id) =>
    genericFindings.some((f) => f.id === id),
  ),
  `the generic sample is caught (${genericFindings.map((f) => f.id).join(", ")})`,
);

console.log("\nManaged base file");
for (const d of DIRECTIONS) {
  const files = ensureDesignBaseImport({
    "/App.tsx": `export default function App() { return <h1>Hi</h1>; }`,
    "/designBase.ts": designBaseFile(d),
  });
  const twice = ensureDesignBaseImport(files);
  check(twice["/App.tsx"].match(/designBase/g).length === 1, `${d.id}: import added exactly once`);
  try {
    await build({
      stdin: { contents: files["/designBase.ts"], loader: "ts" },
      write: false,
      format: "esm",
    });
    check(true, `${d.id}: base file compiles`);
  } catch (err) {
    check(false, `${d.id}: base file compiles (${err.message})`);
  }
}

console.log(failures ? `\n${failures} check(s) failed\n` : "\nAll checks passed\n");
process.exit(failures ? 1 : 0);
