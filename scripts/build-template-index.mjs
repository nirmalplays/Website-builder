/**
 * Bundles templates/*.tsx into a module the app can import.
 *
 * Reading .tsx off disk at request time is unreliable on serverless, so the
 * baked code is compiled into lib/templateCode.generated.ts instead.
 * Run after baking: node scripts/build-template-index.mjs
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";

const OUT = "lib/templateCode.generated.ts";
const DIR = "templates";

const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".tsx")).sort() : [];

const entries = files
  .map((file) => {
    const id = file.replace(/\.tsx$/, "");
    const code = readFileSync(`${DIR}/${file}`, "utf8");
    // Backtick-quoted, so escape backticks, backslashes and ${ interpolation.
    const escaped = code.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    return `  "${id}": \`${escaped}\`,`;
  })
  .join("\n\n");

writeFileSync(
  OUT,
  `// GENERATED FILE - do not edit.
// Run: node scripts/bake-templates.mjs && node scripts/build-template-index.mjs
// Source of truth is templates/*.tsx

export const TEMPLATE_CODE: Record<string, string> = {
${entries}
};

/** Templates that ship with finished code and render without a model call. */
export function hasBakedCode(id: string): boolean {
  return id in TEMPLATE_CODE;
}
`,
  "utf8",
);

const bytes = files.reduce((n, f) => n + readFileSync(`${DIR}/${f}`, "utf8").length, 0);
console.log(`${files.length} templates indexed (${(bytes / 1024).toFixed(0)} KB) -> ${OUT}`);
for (const f of files) console.log(`  ${f}`);
