/**
 * Bakes templates into real code, once, offline.
 *
 * Templates ship as finished .tsx files in templates/, so clicking one in the
 * app renders instantly and costs the user nothing. Re-run only when you add a
 * template or want to regenerate one:
 *
 *   node scripts/bake-templates.mjs            # every template missing code
 *   node scripts/bake-templates.mjs saas-site  # just these ids
 *   FORCE=1 node scripts/bake-templates.mjs    # overwrite existing
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import * as Lucide from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../tmp/lib/systemPrompt.mjs";
import { extractCode } from "../tmp/lib/extractCode.mjs";
import { repairImports } from "../tmp/lib/repairImports.mjs";
import { findDeadControls, deadControlRepairPrompt } from "../tmp/lib/validateInteractivity.mjs";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const OUT = "templates";
const MODEL = process.env.BAKE_MODEL ?? process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite";

// Baked templates ship as-is, so they get held to a higher bar than a live prompt.
const BAKE_SUFFIX = `This file ships as a ready-made template that users see before they type anything, so it must look finished:
- Fill every section with specific, realistic copy - real-sounding business names, prices, dates, testimonials with names and roles. Never placeholder words.
- Include all the sections named in the request, in order, plus a footer.
- Make it genuinely attractive: considered spacing, a clear type scale, one accent colour used consistently, hover states on interactive elements.
- It must render standalone with no props and no network calls.`;

const source = readFileSync("lib/templates.ts", "utf8");
const templates = [...source.matchAll(/id: "([^"]+)",\s*\n\s*title: "([^"]+)"[\s\S]*?prompt:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g)].map(
  (m) => ({ id: m[1], title: m[2], prompt: m[3].replace(/\\"/g, '"') }),
);

const only = process.argv.slice(2);
const force = process.env.FORCE === "1";
mkdirSync(OUT, { recursive: true });

const targets = templates.filter((t) => {
  if (only.length) return only.includes(t.id);
  if (!force && existsSync(`${OUT}/${t.id}.tsx`)) return false;
  return true;
});

console.log(`${templates.length} templates defined, ${targets.length} to bake with ${MODEL}\n`);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
let ok = 0;
const failures = [];

for (const [i, t] of targets.entries()) {
  if (i > 0) await new Promise((r) => setTimeout(r, 4000));
  const started = Date.now();
  try {
    const res = await ai.models.generateContent({
      model: MODEL,
      contents: t.prompt,
      config: {
        systemInstruction: `${SYSTEM_PROMPT}\n\n${BAKE_SUFFIX}`,
        temperature: 0.8,
        maxOutputTokens: 32768,
      },
    });
    let code = repairImports(extractCode(res.text ?? ""));

    // Hold shipped templates to the same "it must actually work" bar.
    const dead = findDeadControls(code);
    if (dead.length) {
      const retry = await ai.models.generateContent({
        model: MODEL,
        contents: t.prompt,
        config: {
          systemInstruction: `${SYSTEM_PROMPT}

${BAKE_SUFFIX}

${deadControlRepairPrompt(dead)}`,
          temperature: 0.7,
          maxOutputTokens: 32768,
        },
      });
      const wired = repairImports(extractCode(retry.text ?? ""));
      if (findDeadControls(wired).length < dead.length) code = wired;
    }

    // Every named lucide import must exist, or the preview is a red pane.
    const lucide = code.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/);
    const badIcons = lucide
      ? lucide[1]
          .split(",")
          .map((n) => n.trim().split(/\s+as\s+/)[0].trim())
          .filter((n) => n && !(n in Lucide))
      : [];
    if (badIcons.length) throw new Error(`unknown icons: ${badIcons.join(", ")}`);

    writeFileSync(`${OUT}/${t.id}.tsx`, code);
    ok++;
    console.log(`  baked ${t.id.padEnd(20)} ${String(Date.now() - started).padStart(6)}ms  ${String(code.length).padStart(6)} chars`);
  } catch (err) {
    failures.push({ id: t.id, error: err.message.slice(0, 120) });
    console.log(`  FAIL  ${t.id.padEnd(20)} ${err.message.slice(0, 90)}`);
  }
}

// Type-check everything that exists, not just this run's output.
const files = readdirSync(OUT).filter((f) => f.endsWith(".tsx")).map((f) => `${OUT}/${f}`);
if (files.length) {
  try {
    execSync(
      `npx tsc --noEmit --jsx react-jsx --esModuleInterop --skipLibCheck --target es2020 --moduleResolution bundler --module esnext ${files.join(" ")}`,
      { stdio: "pipe" },
    );
    console.log(`\nall ${files.length} baked templates compile`);
  } catch (err) {
    console.log(`\nCOMPILE ERRORS:\n${err.stdout.toString().trim()}`);
  }
}

console.log(`\n${ok}/${targets.length} baked${failures.length ? `, ${failures.length} failed` : ""}`);
