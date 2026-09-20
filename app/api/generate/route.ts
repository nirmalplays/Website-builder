import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm";
import {
  DEFAULT_MODEL,
  HISTORY_TURNS,
  MAX_OUTPUT_TOKENS,
  THINKING_BUDGET,
  isAllowedModel,
  supportsThinkingConfig,
} from "@/lib/config";
import { SYSTEM_PROMPT, REPAIR_SUFFIX, IMAGE_SUFFIX } from "@/lib/systemPrompt";
import { extractCode, NoComponentError } from "@/lib/extractCode";
import { repairImports, UnknownComponentError } from "@/lib/repairImports";
import { db, tryPersist, schema } from "@/lib/db";
import { getIdentity } from "@/lib/identity";
import { GLOBAL_DAILY_CAP, getGlobalUsage, getUsage } from "@/lib/limits";

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

  let body: {
    prompt?: string;
    history?: Turn[];
    projectId?: string;
    model?: string;
    image?: { data: string; mimeType: string };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const prompt = body.prompt?.trim();
  if (!prompt) return NextResponse.json({ error: "Prompt is empty." }, { status: 400 });

  // Never pass an arbitrary client string to the provider.
  const model = body.model && isAllowedModel(body.model) ? body.model : DEFAULT_MODEL;

  // Identity and quota first: never spend a model call the user is not allowed to make.
  const identity = await getIdentity();
  const usageBefore = await getUsage(identity);
  if (usageBefore.enforced && usageBefore.remaining <= 0) {
    return NextResponse.json(
      {
        error: identity.signedIn
          ? `Daily limit reached (${usageBefore.limit} generations). Resets at midnight UTC.`
          : `Free trial used up (${usageBefore.limit} generations). Sign in to keep going.`,
        usage: usageBefore,
        limitReached: true,
      },
      { status: 429 },
    );
  }

  // Image input (FR-11): PNG/JPG/WebP, 5 MB ceiling before base64 overhead.
  const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
  const image = body.image;
  if (image) {
    if (!ALLOWED_IMAGE_TYPES.includes(image.mimeType)) {
      return NextResponse.json(
        { error: "Attach a PNG, JPG or WebP image." },
        { status: 400 },
      );
    }
    if (image.data.length > 7_000_000) {
      return NextResponse.json({ error: "Image is too large (5 MB max)." }, { status: 413 });
    }
  }

  // Shared-key safety valve before anything is spent.
  const globalUsed = await getGlobalUsage();
  if (globalUsed !== null && globalUsed >= GLOBAL_DAILY_CAP) {
    return NextResponse.json(
      {
        error:
          "This app has hit its daily generation budget. It resets at midnight UTC - ready-made templates still open for free.",
        usage: usageBefore,
        limitReached: true,
      },
      { status: 429 },
    );
  }

  const history = (body.history ?? []).slice(-HISTORY_TURNS * 2);
  const userParts: { text?: string; inlineData?: { data: string; mimeType: string } }[] = [
    { text: prompt },
  ];
  if (image) userParts.push({ inlineData: { data: image.data, mimeType: image.mimeType } });

  const contents = [
    ...toContents(history),
    { role: "user" as const, parts: userParts as { text: string }[] },
  ];
  const started = Date.now();

  // Test/backup path: serve a known-good generation instead of calling Gemini.
  // Development only - it reads from disk, which serverless will not reliably have.
  if (process.env.GEMINI_FIXTURES === "1" && process.env.NODE_ENV !== "production") {
    console.warn("[generate] FIXTURE MODE - not calling Gemini");
    const { readFileSync } = await import("node:fs");
    const name = /pricing|plan|tier/i.test(prompt) ? "pricing" : "dashboard";
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({
      code: readFileSync(`fixtures/${name}.tsx`, "utf8"),
      fixture: true,
      model,
      usage: usageBefore,
    });
  }

  const ai = new GoogleGenAI({ apiKey });
  let inputTokens = 0;
  let outputTokens = 0;

  const systemFor = (base: string) => (image ? `${base}

${IMAGE_SUFFIX}` : base);

  const call = async (systemInstruction: string) => {
    const res = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: systemFor(systemInstruction),
        temperature: 0.7,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        // Some models reject thinkingConfig outright.
        ...(supportsThinkingConfig(model)
          ? { thinkingConfig: { thinkingBudget: THINKING_BUDGET } }
          : {}),
      },
    });
    inputTokens += res.usageMetadata?.promptTokenCount ?? 0;
    outputTokens += res.usageMetadata?.candidatesTokenCount ?? 0;
    return res.text ?? "";
  };

  try {
    let code: string;
    let repaired: string | null = null;
    try {
      // repairImports fixes icons used but never imported, deterministically.
      // It throws when the undefined name is not a lucide icon, which the retry handles.
      const raw = extractCode(await call(SYSTEM_PROMPT));
      code = repairImports(raw);
      if (code !== raw) repaired = "imports";
    } catch (err) {
      const recoverable = err instanceof NoComponentError || err instanceof UnknownComponentError;
      if (!recoverable) throw err;
      console.warn(`[generate] repair retry: ${(err as Error).message}`);
      const suffix =
        err instanceof UnknownComponentError
          ? `${REPAIR_SUFFIX}\n\nAlso: ${err.message}. Every component you render must be defined in the file or imported from an allowed package.`
          : REPAIR_SUFFIX;
      // One automatic repair retry, then surface it.
      code = repairImports(extractCode(await call(SYSTEM_PROMPT + "\n\n" + suffix)));
      repaired = "model-retry";
    }

    const latencyMs = Date.now() - started;
    console.log(
      `[generate] ${model} ${latencyMs}ms ${code.length} chars in/out ${inputTokens}/${outputTokens}${repaired ? ` repaired:${repaired}` : ""}`,
    );

    // Persistence is best-effort: a DB problem must never fail a generation.
    const projectId = await tryPersist("save version", async () => {
      const owner = identity.sessionId;
      const user = identity.userId ? { id: identity.userId } : null;
      let id = body.projectId ?? null;

      if (id) {
        const [existing] = await db!
          .select({ id: schema.projects.id })
          .from(schema.projects)
          .where(eq(schema.projects.id, id))
          .limit(1);
        if (!existing) id = null;
      }

      if (!id) {
        const [created] = await db!
          .insert(schema.projects)
          .values({ sessionId: owner, userId: user?.id ?? null, title: prompt.slice(0, 80) })
          .returning({ id: schema.projects.id });
        id = created.id;
      } else {
        // Signing in mid-session claims the anonymous project.
        await db!
          .update(schema.projects)
          .set({ updatedAt: new Date(), ...(user ? { userId: user.id } : {}) })
          .where(eq(schema.projects.id, id));
      }

      await db!.insert(schema.messages).values({ projectId: id, role: "user", content: prompt });
      const [assistant] = await db!
        .insert(schema.messages)
        .values({ projectId: id, role: "assistant", content: code })
        .returning({ id: schema.messages.id });

      await db!.insert(schema.versions).values({
        projectId: id,
        messageId: assistant.id,
        files: { "/App.tsx": code },
        model,
      });

      await db!.insert(schema.usage).values({
        projectId: id,
        sessionId: identity.sessionId,
        userId: identity.userId,
        model,
        inputTokens,
        outputTokens,
        latencyMs,
        repaired,
      });

      return id;
    });

    // Report the count after this generation so the meter cannot drift.
    const usageAfter = await getUsage(identity);
    return NextResponse.json({ code, projectId, model, usage: usageAfter });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed.";
    console.error("[generate] failed:", message);
    const status = /quota|rate|429/i.test(message) ? 429 : 502;
    return NextResponse.json(
      {
        error:
          status === 429
            ? "Daily quota or rate limit reached for this model. Try another model or wait."
            : `Generation failed: ${message}`,
      },
      { status },
    );
  }
}
