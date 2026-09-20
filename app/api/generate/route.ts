import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL, HISTORY_TURNS, MAX_OUTPUT_TOKENS, THINKING_BUDGET } from "@/lib/config";
import { SYSTEM_PROMPT, REPAIR_SUFFIX } from "@/lib/systemPrompt";
import { extractCode, NoComponentError } from "@/lib/extractCode";
import { repairImports, UnknownComponentError } from "@/lib/repairImports";

export const runtime = "nodejs";
export const maxDuration = 60;

type Turn = { role: "user" | "assistant"; content: string };

type GenaiContent = { role: "user" | "model"; parts: { text: string }[] };

function toContents(turns: Turn[]): GenaiContent[] {
  return turns.map((t) => ({
    role: t.role === "assistant" ? "model" : "user",
    // Assistant turns are code; hand them back in the same shape we asked for.
    parts: [{ text: t.role === "assistant" ? "```tsx\n" + t.content + "\n```" : t.content }],
  }));
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server." },
      { status: 500 },
    );
  }

  let body: { prompt?: string; history?: Turn[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const prompt = body.prompt?.trim();
  if (!prompt) return NextResponse.json({ error: "Prompt is empty." }, { status: 400 });

  // Only the latest code plus the last few turns. No context problem worth solving today.
  const history = (body.history ?? []).slice(-HISTORY_TURNS * 2);
  const contents = [...toContents(history), ...toContents([{ role: "user", content: prompt }])];

  const ai = new GoogleGenAI({ apiKey });

  const call = async (systemInstruction: string) => {
    const res = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        thinkingConfig: { thinkingBudget: THINKING_BUDGET },
      },
    });
    return res.text ?? "";
  };

  const started = Date.now();

  // Test/backup path: serve a known-good generation instead of calling Gemini.
  // Off unless GEMINI_FIXTURES=1. Lets the preview half be exercised without quota.
  if (process.env.GEMINI_FIXTURES === "1") {
    console.warn("[generate] FIXTURE MODE - not calling Gemini");
    const { readFileSync } = await import("node:fs");
    const name = /pricing|plan|tier/i.test(prompt) ? "pricing" : "dashboard";
    const code = readFileSync(`fixtures/${name}.tsx`, "utf8");
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ code, fixture: true });
  }

  try {
    let code: string;
    try {
      // repairImports fixes icons used but never imported, deterministically.
      // It throws when the undefined name is not a lucide icon, which the retry handles.
      code = repairImports(extractCode(await call(SYSTEM_PROMPT)));
    } catch (err) {
      const recoverable =
        err instanceof NoComponentError || err instanceof UnknownComponentError;
      if (!recoverable) throw err;
      console.warn(`[generate] repair retry: ${(err as Error).message}`);
      const suffix =
        err instanceof UnknownComponentError
          ? `${REPAIR_SUFFIX}\n\nAlso: ${err.message}. Every component you render must be defined in the file or imported from an allowed package.`
          : REPAIR_SUFFIX;
      // One automatic repair retry, then surface it.
      code = repairImports(extractCode(await call(SYSTEM_PROMPT + "\n\n" + suffix)));
    }
    console.log(`[generate] ${GEMINI_MODEL} ${Date.now() - started}ms ${code.length} chars`);
    return NextResponse.json({ code });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed.";
    console.error("[generate] failed:", message);
    const status = /quota|rate|429/i.test(message) ? 429 : 502;
    return NextResponse.json(
      {
        error:
          status === 429
            ? "Gemini rate limit hit. Wait a moment and try again."
            : `Generation failed: ${message}`,
      },
      { status },
    );
  }
}
