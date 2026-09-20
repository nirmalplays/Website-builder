// Which Flash-tier model should the demo run on? One real generation each.
// Each model has its own free-tier daily bucket, so this does not spend the demo model's quota.
// Run: node scripts/bench-models.mjs [model ...]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import * as Lucide from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../tmp/lib/systemPrompt.mjs";
import { extractCode } from "../tmp/lib/extractCode.mjs";
import { repairImports } from "../tmp/lib/repairImports.mjs";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const MODELS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-3.5-flash-lite"];

const PROMPT = "A dark SaaS dashboard with a sidebar, four stat cards and a recent activity table";
const ALLOWED = new Set(["react", "lucide-react"]);

function lint(code) {
  const problems = [];
  if (!/export default function App\s*\(/.test(code)) problems.push("no `export default function App()`");
  for (const m of code.matchAll(/from\s+["']([^"']+)["']/g)) {
    if (!ALLOWED.has(m[1])) problems.push(`banned import: ${m[1]}`);
  }
  const lucide = code.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/);
  if (lucide) {
    for (const raw of lucide[1].split(",")) {
      const n = raw.trim().split(/\s+as\s+/)[0].trim();
      if (n && !(n in Lucide)) problems.push(`icon does not exist: ${n}`);
    }
  }
  if (/\bfetch\s*\(/.test(code)) problems.push("uses fetch");
  if (/Lorem ipsum/i.test(code)) problems.push("lorem ipsum");
  return problems;
}

mkdirSync("tmp/bench", { recursive: true });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

for (const model of MODELS) {
  const started = Date.now();
  try {
    const res = await ai.models.generateContent({
      model,
      contents: PROMPT,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 8192,
        ...(process.env.NO_THINKING_CONFIG ? {} : { thinkingConfig: { thinkingBudget: 0 } }),
      },
    });
    const ms = Date.now() - started;
    let code = extractCode(res.text ?? "");
    const beforeRepair = code;
    code = repairImports(code);
    const u = res.usageMetadata ?? {};
    writeFileSync(`tmp/bench/${model}.tsx`, code);
    const problems = lint(code);
    console.log(
      `${model.padEnd(24)} ${String(ms).padStart(6)}ms  ${String(code.length).padStart(6)} chars  ` +
        `in/out ${u.promptTokenCount ?? "?"}/${u.candidatesTokenCount ?? "?"}  ` +
        `${code !== beforeRepair ? "[imports repaired] " : ""}${problems.length ? "LINT: " + problems.join("; ") : "clean"}`,
    );
  } catch (err) {
    const quota = /quota|429/i.test(err.message);
    console.log(`${model.padEnd(24)} ${String(Date.now() - started).padStart(6)}ms  ${quota ? "QUOTA/RATE LIMIT" : "FAIL: " + err.message.slice(0, 120)}`);
  }
  await new Promise((r) => setTimeout(r, 3000));
}
