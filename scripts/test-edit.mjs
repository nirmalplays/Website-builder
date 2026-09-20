// Hour 4 checkpoint: does a follow-up prompt EDIT the same component instead of starting over?
// Run the dev server first, then: npm run test:edit
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "tmp/edit-test";

const FIRST = "A pricing page with three tiers, a monthly/annual toggle and a highlighted middle plan";
const SECOND = "make it dark and add a testimonials section";

async function generate(prompt, history) {
  const started = Date.now();
  const res = await fetch(`${BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, history }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return { code: data.code, ms: Date.now() - started };
}

mkdirSync(OUT, { recursive: true });

const first = await generate(FIRST, []);
writeFileSync(`${OUT}/1-before.tsx`, first.code);
console.log(`1. generated  ${first.ms}ms  ${first.code.length} chars`);

const second = await generate(SECOND, [
  { role: "user", content: FIRST },
  { role: "assistant", content: first.code },
]);
writeFileSync(`${OUT}/2-after.tsx`, second.code);
console.log(`2. edited     ${second.ms}ms  ${second.code.length} chars`);

// An edit should change the file, keep the subject, and honour the instruction.
const before = first.code;
const after = second.code;
const checks = [
  ["file actually changed", after !== before],
  ["still a valid component", /export default function App\s*\(/.test(after)],
  ["kept the pricing subject", /(month|annual|tier|plan|\$)/i.test(after)],
  ["went dark", /(bg-(?:gray|slate|zinc|neutral)-(?:8|9)\d{2}|bg-black)/.test(after)],
  ["added testimonials", /testimonial|["'][^"']*(said|loves|recommend)/i.test(after)],
  ["not a trivial truncation", after.length > before.length * 0.7],
];

let failed = 0;
for (const [label, ok] of checks) {
  if (!ok) failed++;
  console.log(`   ${ok ? "PASS" : "FAIL"}  ${label}`);
}

// Rough sense of how much was preserved vs rewritten.
const beforeLines = new Set(before.split("\n").map((l) => l.trim()).filter((l) => l.length > 12));
const kept = [...beforeLines].filter((l) => after.includes(l)).length;
console.log(
  `\n${beforeLines.size - kept}/${beforeLines.size} substantive lines rewritten, ${kept} preserved verbatim`,
);
console.log(failed === 0 ? "EDIT LOOP OK" : `${failed} check(s) failed`);
