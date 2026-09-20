// Hour-1 checkpoint: proves the key, the SDK and the quota work.
// Run: npm run check
import { readFileSync } from "node:fs";
import { GoogleGenAI } from "@google/genai";

for (const file of [".env.local", ".env"]) {
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

if (!apiKey) {
  console.error("FAIL: GEMINI_API_KEY is not set. Put it in .env.local.");
  process.exit(1);
}

console.log(`Calling ${model}...`);
const started = Date.now();
try {
  const ai = new GoogleGenAI({ apiKey });
  const res = await ai.models.generateContent({
    model,
    contents: "Reply with exactly: pong",
  });
  console.log(`OK (${Date.now() - started}ms): ${res.text?.trim()}`);
} catch (err) {
  console.error(`FAIL (${Date.now() - started}ms): ${err.message}`);
  process.exit(1);
}
