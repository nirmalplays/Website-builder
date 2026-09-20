// Hour 2 checkpoint: does the system prompt return one clean, sandbox-safe file every time?
// Run the dev server first, then: npm run test:prompts
import { mkdirSync, writeFileSync } from "node:fs";
import * as Lucide from "lucide-react";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "tmp/prompt-tests";

const PROMPTS = [
  "A pricing page with three tiers, a monthly/annual toggle and a highlighted middle plan",
  "A dark SaaS dashboard with a sidebar, four stat cards and a recent activity table",
  "A sign-in screen for a fintech app with social buttons and a subtle gradient",
  "A landing hero for a running shoe brand with a big product photo and an email capture",
  "A to-do app with an input, filter tabs and a list of tasks I can check off",
];

const ALLOWED = new Set(["react", "lucide-react"]);

function lint(code) {
  const problems = [];
  if (!/export default function App\s*\(/.test(code)) {
    if (!code.includes("export default")) problems.push("no export default");
    else problems.push("default export is not `function App()`");
  }
  for (const m of code.matchAll(/from\s+["']([^"']+)["']/g)) {
    if (!ALLOWED.has(m[1])) problems.push(`banned import: ${m[1]}`);
  }
  // Every named lucide import must actually exist in the pinned version.
  const lucide = code.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/);
  if (lucide) {
    for (const raw of lucide[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/)[0].trim();
      if (name && !(name in Lucide)) problems.push(`icon does not exist: ${name}`);
    }
  }
  if (/\bfetch\s*\(/.test(code)) problems.push("uses fetch");
  if (/localStorage|sessionStorage/.test(code)) problems.push("uses storage");
  if (/Lorem ipsum/i.test(code)) problems.push("lorem ipsum");
  if (/styled-components|\.css["']/.test(code)) problems.push("non-Tailwind styling");
  return problems;
}

mkdirSync(OUT, { recursive: true });
let pass = 0;
const times = [];

for (const [i, prompt] of PROMPTS.entries()) {
  const started = Date.now();
  let code = null;
  let error = null;
  try {
    const res = await fetch(`${BASE}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) error = data.error;
    else code = data.code;
  } catch (err) {
    error = err.message;
  }
  const ms = Date.now() - started;
  times.push(ms);

  if (!code) {
    console.log(`${i + 1}. FAIL (${ms}ms) ${prompt.slice(0, 44)}...\n   ${error}`);
    continue;
  }
  writeFileSync(`${OUT}/${i + 1}.tsx`, code);
  const problems = lint(code);
  if (problems.length === 0) {
    pass++;
    console.log(`${i + 1}. PASS (${ms}ms, ${code.length} chars) ${prompt.slice(0, 44)}...`);
  } else {
    console.log(
      `${i + 1}. LINT (${ms}ms, ${code.length} chars) ${prompt.slice(0, 44)}...\n   ${problems.join("; ")}`,
    );
  }
}

times.sort((a, b) => a - b);
console.log(
  `\n${pass}/${PROMPTS.length} clean. median ${times[Math.floor(times.length / 2)]}ms, slowest ${times.at(-1)}ms. Files in ${OUT}/`,
);
