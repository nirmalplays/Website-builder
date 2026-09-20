import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { DEFAULT_MODEL, HISTORY_TURNS, MAX_OUTPUT_TOKENS, isAllowedModel } from "@/lib/config";
import { getProvider } from "@/lib/providers";
import {
  BUILD_SYSTEM_PROMPT,
  dependencyNote,
  ICON_NOTE,
  FILES_REPAIR_SUFFIX,
} from "@/lib/buildPrompt";
import { IMAGE_SUFFIX, DOCUMENT_SUFFIX } from "@/lib/systemPrompt";
import {
  parseFiles,
  missingLocalImports,
  externalImports,
  NoFilesError,
  type GeneratedFiles,
} from "@/lib/parseFiles";
import { repairImports } from "@/lib/repairImports";
import { findDeadControls, deadControlRepairPrompt } from "@/lib/validateInteractivity";
import { buildPlan, selectComponents, planToPrompt } from "@/lib/planner";
import { installComponents } from "@/lib/react-bits/install";
import { db, tryPersist, schema } from "@/lib/db";
import { getIdentity } from "@/lib/identity";
import { GLOBAL_DAILY_CAP, getGlobalUsage, getUsage } from "@/lib/limits";

export const runtime = "nodejs";
// Plan, build, repair. This is deliberately allowed to take its time.
export const maxDuration = 300;

type Turn = { role: "user" | "assistant"; content: string };

const BASE_DEPENDENCIES: Record<string, string> = { "lucide-react": "1.47.0" };

/** Packages an existing project already imports, so edits keep building. */
function inferDependencies(files: GeneratedFiles): Record<string, string> {
  const known: Record<string, string> = {
    motion: "^12.23.12",
    gsap: "^3.13.0",
    "@gsap/react": "^2.1.2",
    ogl: "^1.0.11",
    three: "^0.180.0",
    "@react-three/fiber": "^9.3.0",
    "@react-three/drei": "^10.7.4",
    "lucide-react": "1.47.0",
  };
  const out: Record<string, string> = {};
  for (const pkg of externalImports(files)) if (known[pkg]) out[pkg] = known[pkg];
  return out;
}

export async function POST(req: Request) {
  const provider = getProvider();
  if (!provider.isConfigured()) {
    return NextResponse.json(
      {
        error:
          "No model provider configured. Set GEMINI_API_KEY for Google, or AI_PROVIDER=openai-compatible with AI_BASE_URL for a self-hosted model.",
      },
      { status: 500 },
    );
  }

  let body: {
    prompt?: string;
    history?: Turn[];
    projectId?: string;
    model?: string;
    image?: { data: string; mimeType: string };
    document?: { name: string; text: string };
    files?: GeneratedFiles;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const prompt = body.prompt?.trim();
  if (!prompt) return NextResponse.json({ error: "Prompt is empty." }, { status: 400 });

  const model = body.model && isAllowedModel(body.model) ? body.model : DEFAULT_MODEL;

  const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
  const MAX_DOCUMENT_CHARS = 200_000;
  const image = body.image;
  if (image) {
    if (!ALLOWED_IMAGE_TYPES.includes(image.mimeType)) {
      return NextResponse.json({ error: "Attach a PNG, JPG, WebP or PDF." }, { status: 400 });
    }
    if (image.data.length > 7_000_000) {
      return NextResponse.json({ error: "Image is too large (5 MB max)." }, { status: 413 });
    }
  }

  const document = body.document?.text
    ? {
        name: (body.document.name || "attachment").slice(0, 120),
        text:
          body.document.text.length > MAX_DOCUMENT_CHARS
            ? `${body.document.text.slice(0, MAX_DOCUMENT_CHARS)}\n\n[file truncated at ${MAX_DOCUMENT_CHARS} characters]`
            : body.document.text,
      }
    : undefined;

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
  const existingFiles = body.files && Object.keys(body.files).length > 0 ? body.files : null;
  const isEdit = Boolean(existingFiles);
  const started = Date.now();

  let inputTokens = 0;
  let outputTokens = 0;

  const call = async (system: string, userPrompt: string) => {
    const res = await provider.generate({
      system,
      history,
      prompt: userPrompt,
      image,
      document,
      model,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.8,
      thinkingBudget: 0,
    });
    inputTokens += res.inputTokens;
    outputTokens += res.outputTokens;
    return res.text;
  };

  try {
    let planBlock = "";
    let componentSelections: { component: string; reason: string; section: string }[] = [];
    let dependencies: Record<string, string> = { ...BASE_DEPENDENCIES };
    let reactBitsFiles: GeneratedFiles = {};
    const notes: string[] = [];
    let planSummary: string | null = null;

    if (isEdit) {
      // The plan already exists as the current code.
      dependencies = { ...dependencies, ...inferDependencies(existingFiles!) };
      planBlock = [
        "CURRENT PROJECT FILES - this is the app as it stands:",
        "",
        ...Object.entries(existingFiles!).map(
          ([path, content]) => "```tsx file=" + path + "\n" + content + "\n```",
        ),
        "",
        "Apply the requested change. Return every file you modify, in full.",
      ].join("\n");
    } else {
      // ---- 1. THINK ---------------------------------------------------
      const plan = await buildPlan({ prompt, model, document, image });
      planSummary = plan.summary;

      const wantsHeavy = /\b(3d|webgl|three|particles?|shader|immersive)\b/i.test(prompt);
      const picked = selectComponents(plan, prompt, wantsHeavy);
      notes.push(...picked.notes);

      // ---- 2. INSTALL COMPONENTS --------------------------------------
      if (picked.selections.length > 0) {
        const install = await installComponents(
          picked.selections.map((s) => s.component),
          { variant: "TS-TW" },
        );
        for (const failure of install.failed) {
          notes.push(`Skipped ${failure.name}: ${failure.error}`);
        }
        componentSelections = picked.selections.filter((s) =>
          install.components.some((c) => c.name === s.component),
        );
        dependencies = { ...dependencies, ...install.dependencies };
        reactBitsFiles = Object.fromEntries(
          install.components.flatMap((c) => c.files.map((f) => [f.path, f.content])),
        );
      }

      planBlock = planToPrompt(plan, componentSelections);
    }

    // ---- 3. BUILD -------------------------------------------------------
    const system = [
      BUILD_SYSTEM_PROMPT,
      dependencyNote(dependencies),
      ICON_NOTE,
      image ? IMAGE_SUFFIX : "",
      document ? DOCUMENT_SUFFIX : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const userPrompt = `${planBlock}\n\n---\n\nUSER REQUEST: ${prompt}`;

    let files: GeneratedFiles;
    let repaired: string | null = null;
    try {
      files = parseFiles(await call(system, userPrompt));
    } catch (err) {
      if (!(err instanceof NoFilesError)) throw err;
      files = parseFiles(await call(`${system}\n\n${FILES_REPAIR_SUFFIX}`, userPrompt));
      repaired = "format";
    }

    // Component source is merged after generation so the model cannot mangle it.
    files = { ...reactBitsFiles, ...files };
    if (isEdit) files = { ...existingFiles!, ...files };

    // ---- 4. VERIFY ------------------------------------------------------
    // Per-file repair must never fail the whole build: a component defined in a
    // sibling file looks "undefined" to a single-file check.
    files = Object.fromEntries(
      Object.entries(files).map(([path, content]) => {
        if (!/\.(t|j)sx$/.test(path)) return [path, content];
        try {
          return [path, repairImports(content)];
        } catch (err) {
          notes.push(
            `${path}: ${err instanceof Error ? err.message : "import check skipped"}`,
          );
          return [path, content];
        }
      }),
    );

    const missing = missingLocalImports(files);
    if (missing.length > 0) notes.push(`Imports with no matching file: ${missing.join(", ")}`);

    const dead = findDeadControls(Object.values(files).join("\n"));
    if (dead.length > 0 && !isEdit) {
      try {
        const wired = parseFiles(
          await call(`${system}\n\n${deadControlRepairPrompt(dead)}`, userPrompt),
        );
        const merged = { ...files, ...wired };
        if (findDeadControls(Object.values(merged).join("\n")).length < dead.length) {
          files = merged;
          repaired = repaired ? `${repaired}+interactivity` : "interactivity";
        }
      } catch {
        notes.push("Interactivity repair failed; shipping the first version.");
      }
    }

    // Ship only dependencies something actually imports.
    const imported = new Set(externalImports(files));
    const finalDependencies = Object.fromEntries(
      Object.entries(dependencies).filter(([pkg]) => imported.has(pkg)),
    );

    const latencyMs = Date.now() - started;
    console.log(
      `[generate] ${provider.id}/${model} ${latencyMs}ms ${Object.keys(files).length} files ` +
        `in/out ${inputTokens}/${outputTokens}` +
        `${componentSelections.length ? ` rb:${componentSelections.map((s) => s.component).join("+")}` : ""}` +
        `${repaired ? ` repaired:${repaired}` : ""}`,
    );

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
        await db!
          .update(schema.projects)
          .set({ updatedAt: new Date(), ...(user ? { userId: user.id } : {}) })
          .where(eq(schema.projects.id, id));
      }

      await db!.insert(schema.messages).values({ projectId: id, role: "user", content: prompt });
      const [assistant] = await db!
        .insert(schema.messages)
        .values({ projectId: id, role: "assistant", content: files["/App.tsx"] ?? "" })
        .returning({ id: schema.messages.id });

      await db!.insert(schema.versions).values({
        projectId: id,
        messageId: assistant.id,
        files,
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

    const usageAfter = await getUsage(identity);
    return NextResponse.json({
      files,
      // Kept so older clients and the share page keep working.
      code: files["/App.tsx"] ?? "",
      dependencies: finalDependencies,
      components: componentSelections,
      plan: planSummary,
      notes,
      projectId,
      model,
      usage: usageAfter,
    });
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
