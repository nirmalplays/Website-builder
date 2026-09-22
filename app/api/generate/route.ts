import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {
  BUILD_BUDGET_MS,
  FUNCTION_LIMIT_MS,
  BUILD_DEADLINE_MS,
  DEFAULT_MODEL,
  HISTORY_TURNS,
  MAX_OUTPUT_TOKENS,
  THINKING_BUDGET,
  isAllowedModel,
} from "@/lib/config";
import { generateWithFallback, listConfiguredProviders } from "@/lib/providers";
import {
  BUILD_SYSTEM_PROMPT,
  dependencyNote,
  ICON_NOTE,
  FILES_REPAIR_SUFFIX,
  entryPointPrompt,
  missingFilesPrompt,
} from "@/lib/buildPrompt";
import { IMAGE_SUFFIX, DOCUMENT_SUFFIX } from "@/lib/systemPrompt";
import {
  parseFiles,
  missingLocalImportDetails,
  stubMissingModules,
  externalImports,
  NoFilesError,
  type GeneratedFiles,
} from "@/lib/parseFiles";
import { repairImports } from "@/lib/repairImports";
import { findDeadControls, deadControlRepairPrompt } from "@/lib/validateInteractivity";
import { buildPlan, selectComponents, planToPrompt } from "@/lib/planner";
import { installComponents } from "@/lib/react-bits/install";
import { verifyProject, repairPrompt, type VerifyReport } from "@/lib/verify/inspect";
import { db, tryPersist, schema } from "@/lib/db";
import { getIdentity } from "@/lib/identity";
import { GLOBAL_DAILY_CAP, getGlobalUsage, getUsage } from "@/lib/limits";

export const runtime = "nodejs";
/*
 * Plan, build, repair. This is deliberately allowed to take its time.
 *
 * 300 was not enough once the non-reasoning models were dropped: a measured
 * kanban build took 413s (plan, install, write, then three browser-verified
 * repair passes, each on a model that thinks first).
 *
 * 300 is nonetheless the ceiling the Hobby plan allows with fluid compute, so
 * that is what deploys there get; Pro allows 800. Next reads this by static
 * analysis, so it has to stay a literal - env vars cannot reach it. Running
 * locally ignores it entirely and builds take as long as they take. On a plan
 * that permits it, put 800 back and raise BUILD_DEADLINE_MS to match.
 */
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
  if (listConfiguredProviders().length === 0) {
    return NextResponse.json(
      {
        error:
          "No model provider configured. Set GEMINI_API_KEY for Google, AI_PROVIDER=openai-compatible with AI_BASE_URL for a self-hosted model, or any of the free-tier keys in .env.example.",
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

  /**
   * Can another model call still fit? `reserve` is time to keep back for work
   * that matters more than the caller: the interactivity pass yields to the
   * compile-fix rounds this way, because a button wired to nothing is a
   * blemish and a build that does not compile is a blank screen.
   *
   * Reserving a whole extra call turned out too cautious - a fix round only
   * runs when the compile check actually finds something, and a clean build
   * was skipping the interactivity pass with half its budget unspent. Half a
   * call keeps the yield without paying for a round that usually never comes.
   */
  const canAfford = (reserve = 0) =>
    Date.now() - started + lastCallMs * 1.15 + reserve < BUILD_BUDGET_MS;

  let inputTokens = 0;
  let outputTokens = 0;
  // The model that actually answers. Starts as the requested model, but a
  // busy/rate-limited response mid-request switches this for every call
  // after it too - no point re-hitting a model that just said 503.
  let activeModel = model;
  const notes: string[] = [];

  // Each optional pass is one more model call, and on a capped runtime there is
  // not room for all of them. Rather than guess, time the calls we have already
  // made and only start a pass we can expect to finish. lastCallMs starts at a
  // pessimistic 60s so the first decision is not made on no evidence at all.
  let lastCallMs = 60_000;

  const call = async (system: string, userPrompt: string) => {
    const callStarted = Date.now();
    const res = await generateWithFallback({
      system,
      history,
      prompt: userPrompt,
      image,
      document,
      model: activeModel,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.8,
      thinkingBudget: THINKING_BUDGET,
      // Never let one call run past the host's own limit: 8s is kept back to
      // finish the response, and 15s is the floor below which asking at all is
      // pointless. A build killed by the platform returns nothing at all.
      timeoutMs: Math.max(15_000, FUNCTION_LIMIT_MS - (Date.now() - started) - 8_000),
    });
    lastCallMs = Date.now() - callStarted;
    inputTokens += res.inputTokens;
    outputTokens += res.outputTokens;
    if (res.switchedFrom) {
      notes.push(`${res.switchedFrom} was busy - switched to ${res.model}.`);
      activeModel = res.model;
    }
    return res.text;
  };

  // Progress is streamed as newline-delimited JSON. A build that plans, thinks,
  // installs components, writes files and then runs the result in a browser can
  // take minutes - the client needs to show what stage it is at, not a spinner.
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const emit = (event: Record<string, unknown>) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      /*
       * A single model call can think for minutes without producing a byte,
       * and an idle connection gets cut long before that: Node's own fetch
       * (undici) drops the body after 300s of silence, and proxies are
       * usually stricter. A measured build finished server-side in 7 minutes
       * while the client had already given up with "terminated". The ping
       * keeps the stream alive; clients ignore any event type they do not
       * know, so this is safe for older ones too.
       */
      const heartbeat = setInterval(() => emit({ type: "ping" }), 15_000);

      try {
    let planBlock = "";
    let componentSelections: { component: string; reason: string; section: string }[] = [];
    let dependencies: Record<string, string> = { ...BASE_DEPENDENCIES };
    let reactBitsFiles: GeneratedFiles = {};
    let planSummary: string | null = null;

    emit({ type: "stage", stage: isEdit ? "editing" : "planning" });

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
      const plan = await buildPlan({
        prompt,
        model: activeModel,
        document,
        image,
        // Planning is one call of several; cap it so a slow plan cannot leave
        // the build with no time to actually write anything.
        timeoutMs: Math.min(60_000, FUNCTION_LIMIT_MS - (Date.now() - started) - 8_000),
      });
      planSummary = plan.summary;
      if (plan.switchedFrom) {
        notes.push(`${plan.switchedFrom} was busy - switched to ${plan.modelUsed}.`);
        activeModel = plan.modelUsed!;
      }

      emit({ type: "stage", stage: "planned", detail: plan.summary });

      const wantsHeavy = /\b(3d|webgl|three|particles?|shader|immersive)\b/i.test(prompt);
      const picked = selectComponents(plan, prompt, wantsHeavy);
      notes.push(...picked.notes);

      // ---- 2. INSTALL COMPONENTS --------------------------------------
      if (picked.selections.length > 0) {
        emit({
          type: "stage",
          stage: "components",
          detail: picked.selections.map((s) => s.component).join(", "),
        });
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

    emit({ type: "stage", stage: "building" });

    let files: GeneratedFiles;
    let repaired: string | null = null;
    const firstReply = await call(system, userPrompt);
    try {
      files = parseFiles(firstReply);
    } catch (err) {
      if (!(err instanceof NoFilesError)) throw err;

      // Did the sections arrive and only the entry point get lost? That is what
      // an output limit does, because /App.tsx is written last. Asking again for
      // the whole build would truncate in the same place; asking for the one
      // small file that wires up what already exists will not.
      let salvaged: GeneratedFiles = {};
      try {
        salvaged = parseFiles(firstReply, false);
      } catch {
        // Nothing usable came back at all; fall through to the format retry.
      }

      if (Object.keys(salvaged).length > 0) {
        const entry = parseFiles(
          await call(`${system}

${entryPointPrompt(salvaged)}`, userPrompt),
          false,
        );
        files = { ...salvaged, ...entry };
        if (!files["/App.tsx"]) throw err;
        notes.push(
          `The build ran past its output limit, so ${Object.keys(salvaged).length} section(s) were kept and the entry point was rewritten around them.`,
        );
        repaired = "entry-point";
      } else {
        files = parseFiles(await call(`${system}

${FILES_REPAIR_SUFFIX}`, userPrompt));
        repaired = "format";
      }
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

    // Files the model imported but never wrote are the most common way a
    // multi-file build fails, and the generic browser-findings repair does not
    // reliably fix them. Ask for exactly the missing files, before spending a
    // browser round on an app that cannot possibly compile.
    let missing = missingLocalImportDetails(files);
    if (missing.length > 0 && !canAfford()) {
      notes.push(
        `Ran out of build time before writing ${missing.length} missing file(s); the preview may be incomplete.`,
      );
    } else if (missing.length > 0) {
      emit({
        type: "stage",
        stage: "missing-files",
        detail: missing.map((m) => m.spec).join(", "),
      });
      try {
        const written = parseFiles(
          await call(`${system}\n\n${missingFilesPrompt(missing)}`, userPrompt),
          false,
        );
        files = { ...written, ...files };
        missing = missingLocalImportDetails(files);
        if (missing.length === 0) {
          repaired = repaired ? `${repaired}+missing-files` : "missing-files";
          notes.push(`Wrote ${Object.keys(written).length} file(s) the app imported but had not written.`);
        }
      } catch {
        // Deliberately silent. A compile-error round later on usually writes
        // these files anyway, so anything said here is stale by the time the
        // response is assembled - the honest count is taken after the rounds.
      }
    }

    const dead = findDeadControls(Object.values(files).join("\n"));
    if (dead.length > 0 && !isEdit && !canAfford(lastCallMs * 0.5)) {
      notes.push(
        `Skipped the interactivity pass to leave time for the compile check; ${dead.length} control(s) may do nothing yet. Ask for a fix and it will wire them up.`,
      );
    } else if (dead.length > 0 && !isEdit) {
      emit({ type: "stage", stage: "wiring", detail: `${dead.length} dead control(s)` });
      try {
        const wired = parseFiles(
          await call(`${system}\n\n${deadControlRepairPrompt(dead)}`, userPrompt),
          false,
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

    // ---- 5. RUN IT AND LOOK AT IT --------------------------------------
    // Static checks cannot see a white screen or a crash on mount. Render the
    // project in a real browser, then hand any findings back to the model.
    const MAX_FIX_ROUNDS = Number(process.env.MAX_FIX_ROUNDS ?? 3);
    let report: VerifyReport | null = null;
    let fixRounds = 0;

    if (process.env.DISABLE_VERIFY !== "1") {
      for (let round = 0; round <= MAX_FIX_ROUNDS; round++) {
        const deps = Object.fromEntries(
          Object.entries(dependencies).filter(([pkg]) =>
            new Set(externalImports(files)).has(pkg),
          ),
        );
        // Never get killed mid-round. A working app already exists by now;
        // being cut off by the platform would throw it away and return an
        // error instead. Stop early and ship the best version we have.
        const spent = Date.now() - started;
        if (round > 0 && (spent > BUILD_DEADLINE_MS || !canAfford())) {
          notes.push(
            `Stopped after ${Math.round(spent / 1000)}s to return a working build rather than run out of time.`,
          );
          break;
        }

        emit({ type: "stage", stage: "verifying", round: round + 1, of: MAX_FIX_ROUNDS + 1 });
        try {
          report = await verifyProject(files, deps);
        } catch (err) {
          // Running the project needs a real Chromium, which is not there on
          // every host - a serverless runtime has no browser binary. Not being
          // able to look at the app is not a reason to throw away an app that
          // may be perfectly fine: ship it and say it went unchecked.
          notes.push(
            `Could not run it in a browser here, so this build is unverified: ${
              err instanceof Error ? err.message.slice(0, 120) : String(err)
            }`,
          );
          report = null;
          break;
        }

        const actionable = report.findings.filter((f) => f.severity !== "warning");
        if (actionable.length === 0) break;
        if (round === MAX_FIX_ROUNDS) {
          notes.push(
            `Still unresolved after ${MAX_FIX_ROUNDS} fix attempts: ${actionable
              .map((f) => f.kind)
              .join(", ")}`,
          );
          break;
        }

        try {
          emit({
            type: "stage",
            stage: "fixing",
            round: round + 1,
            detail: actionable.map((f) => f.kind).join(", "),
          });
          const fixed = parseFiles(await call(`${system}

${repairPrompt(report)}`, userPrompt), false);
          files = { ...files, ...fixed };
          fixRounds++;
          repaired = repaired ? `${repaired}+browser` : "browser";
        } catch {
          notes.push("A fix attempt did not return usable files; keeping the previous version.");
          break;
        }
      }

      if (report) {
        const remaining = report.findings.filter((f) => f.severity !== "warning");
        const fatal = remaining.filter((f) => f.severity === "fatal");
        const fixed =
          fixRounds > 0
            ? `fixed ${fixRounds === 1 ? "1 round of issues" : `${fixRounds} rounds of issues`}, `
            : "";

        // A fatal finding means the app does not run at all - the preview will
        // be blank. Saying "1 issue left" about that reads as a minor blemish,
        // so name it for what it is.
        // Hosts without a Chromium binary (Vercel's serverless runtime, for
        // one) skip the headless pass and return ok with a warning. That
        // warning is filtered out of `remaining`, so without this branch the
        // build reports "ran it in a browser: no problems found" having never
        // opened one. The compile check still ran, so say exactly that much.
        const ranInBrowser = !report.findings.some((f) => f.kind === "verification-unavailable");
        const how = ranInBrowser ? "Ran it in a browser" : "Compiled it (no browser on this host)";

        notes.push(
          fatal.length > 0
            ? `${how}: ${fixed}but this build still does not compile (${fatal
                .map((f) => f.kind)
                .join(", ")}), so the preview will be empty. Ask for a fix and it will try again with the error in hand.`
            : remaining.length > 0
              ? `${how}: ${fixed}${remaining.length} issue(s) left.`
              : fixRounds > 0
                ? `${how}: ${fixed}all clear.`
                : `${how}: no problems found.`,
        );
      }
    }

    // Last resort, once the repair rounds have had their chance: a dangling
    // import is a blank preview, so fake the module rather than lose the app.
    const stub = stubMissingModules(files);
    if (stub.stubbed.length > 0) {
      files = stub.files;
      notes.push(
        `Could not get ${stub.stubbed.join(", ")} written, so ${stub.stubbed.length === 1 ? "it was" : "they were"} stubbed out to keep the rest of the app running - those sections will be empty. Ask for a fix and it will fill them in.`,
      );
    }

    // Ship only dependencies something actually imports.
    const imported = new Set(externalImports(files));
    const finalDependencies = Object.fromEntries(
      Object.entries(dependencies).filter(([pkg]) => imported.has(pkg)),
    );

    const latencyMs = Date.now() - started;
    console.log(
      `[generate] ${activeModel} ${latencyMs}ms ${Object.keys(files).length} files ` +
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
        model: activeModel,
      });

      await db!.insert(schema.usage).values({
        projectId: id,
        sessionId: identity.sessionId,
        userId: identity.userId,
        model: activeModel,
        inputTokens,
        outputTokens,
        latencyMs,
        repaired,
      });

      return id;
    });

    const usageAfter = await getUsage(identity);
    emit({
      type: "done",
      files,
      // Kept so older clients and the share page keep working.
      code: files["/App.tsx"] ?? "",
      dependencies: finalDependencies,
      components: componentSelections,
      plan: planSummary,
      verification: report
        ? {
            ok: report.ok,
            fixRounds,
            findings: report.findings.map((f) => ({ kind: f.kind, detail: f.detail, severity: f.severity })),
            stats: report.stats,
          }
        : null,
      notes,
      projectId,
      model: activeModel,
      usage: usageAfter,
    });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Generation failed.";
        console.error("[generate] failed:", message);
        const quota = /quota|rate|429/i.test(message);
        emit({
          type: "error",
          error: quota
            ? "Daily quota or rate limit reached for this model. Try another model or wait."
            : `Generation failed: ${message}`,
        });
      } finally {
        clearInterval(heartbeat);
        closed = true;
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      // Progress is useless if a proxy buffers the whole response.
      "X-Accel-Buffering": "no",
    },
  });
}
