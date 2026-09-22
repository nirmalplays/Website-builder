"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ChatPanel, type BuildStage, type Turn } from "./ChatPanel";
import { Landing } from "./Landing";
import { PreviewPanel } from "./PreviewPanel";
import { TopBar } from "./TopBar";
import type { SessionUser } from "./AuthButton";
import type { Usage } from "./UsageMeter";
import type { ModelOption } from "@/lib/config";
import type { Attachment } from "./Composer";
import type { OAuthProvider } from "@/lib/supabase/config";
import { TEMPLATES } from "@/lib/templates";

/** The payload /api/generate finishes with (the stream's "done" event). */
type GenerateResponse = {
  files?: Record<string, string>;
  code?: string;
  dependencies?: Record<string, string>;
  components?: { component: string }[];
  plan?: string | null;
  notes?: string[];
  projectId?: string | null;
  model?: string;
  usage?: Usage;
  error?: string;
};

const MIN_CHAT = 320;
const MAX_CHAT = 560;

export function Workspace({
  defaultModel,
  models,
  authEnabled,
  providers,
  user,
  bakedTemplates,
}: {
  defaultModel: string;
  models: ModelOption[];
  authEnabled: boolean;
  providers: OAuthProvider[];
  user: SessionUser;
  bakedTemplates: string[];
}) {
  const [history, setHistory] = useState<Turn[]>([]);
  const [code, setCode] = useState("");
  const [files, setFiles] = useState<Record<string, string>>({});
  const [dependencies, setDependencies] = useState<Record<string, string>>({});
  const [buildNotes, setBuildNotes] = useState<string[]>([]);
  const [model, setModel] = useState(defaultModel);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [generation, setGeneration] = useState(0);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [deviceWidth, setDeviceWidth] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  /** Live build progress streamed from /api/generate. */
  const [stage, setStage] = useState<BuildStage | null>(null);
  const [buildStartedAt, setBuildStartedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [chatWidth, setChatWidth] = useState(400);
  const [mobileView, setMobileView] = useState<"chat" | "result">("chat");
  const [fullscreen, setFullscreen] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [fixing, setFixing] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const isEdit = code !== "";
  // Every assistant turn is a version; restoring is just picking an earlier one.
  const versions = history.filter((t) => t.role === "assistant").map((t) => t.content);
  const outOfQuota = usage?.enforced === true && usage.remaining <= 0;

  // The split workspace only exists once there is something to show.
  const started = history.length > 0 || loading;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/usage")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        if (!cancelled && u) setUsage(u);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Reopening a saved project restores its files and prompt history.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("project");
    if (!id) return;
    window.history.replaceState({}, "", "/");
    setLoading(true);
    fetch(`/api/projects/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Project not found."))))
      .then((data) => {
        const latest = data.versions?.[0];
        if (!latest?.files) throw new Error("That project has no saved files.");
        setFiles(latest.files);
        setCode(latest.files["/App.tsx"] ?? "");
        setProjectId(id);
        setHistory(
          (data.messages ?? []).map(
            (m: { role: "user" | "assistant"; content: string; lines?: number }) => ({
              role: m.role,
              content: m.content,
              lines: m.lines,
            }),
          ),
        );
        setGeneration((g) => g + 1);
        setMobileView("result");
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Arriving from the templates browser with ?template=<id> opens it straight away.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("template");
    if (!id) return;
    window.history.replaceState({}, "", "/");
    const meta = TEMPLATES.find((t) => t.id === id);
    void openTemplate(id, meta?.title ?? "template");
    // openTemplate is stable for this purpose; run once on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A shared project opened with Remix hands its code over through session storage.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("remix")) return;
    try {
      const remixed = sessionStorage.getItem("uigen_remix");
      if (remixed) {
        setCode(remixed);
        setHistory([{ role: "assistant", content: remixed }]);
        setGeneration((g) => g + 1);
        setMobileView("result");
      }
      sessionStorage.removeItem("uigen_remix");
    } catch {
      // Storage unavailable; nothing to restore.
    }
    window.history.replaceState({}, "", "/");
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMobileView("chat");
        document.getElementById("prompt")?.focus();
      }
      if (e.key === "Escape") setFullscreen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const startResize = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const shell = shellRef.current;
    if (!shell) return;
    const left = shell.getBoundingClientRect().left;

    const onMove = (e: PointerEvent) => {
      setChatWidth(Math.min(MAX_CHAT, Math.max(MIN_CHAT, e.clientX - left)));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  function reset() {
    setHistory([]);
    setCode("");
    setFiles({});
    setDependencies({});
    setProjectId(null);
    setInput("");
    setError(null);
    setTab("preview");
    setMobileView("chat");
  }

  /**
   * Ready-made templates open instantly from shipped code: no model call,
   * no quota spent, no waiting. Editing it afterwards is a normal follow-up.
   */
  async function openTemplate(id: string, title: string) {
    if (loading) return;
    setLoading(true);
    setError(null);
    setMobileView("result");
    try {
      const res = await fetch(`/api/template/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not open template.");

      // The preview renders from `code`/`files`, so a template that only went
      // into `history` opened to an empty pane: the code was fetched and then
      // dropped on the floor. Templates are single-file, and Preview merges
      // the base dependencies itself, so /App.tsx is the whole project.
      setCode(data.code);
      setFiles({ "/App.tsx": data.code });
      setDependencies({});
      setBuildNotes([]);

      setGeneration((g) => g + 1);
      setTab("preview");
      setProjectId(null);
      setHistory([
        { role: "user", content: `Opened the ${title} template` },
        { role: "assistant", content: data.code },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open template.");
      setMobileView("chat");
    } finally {
      setLoading(false);
    }
  }

  function restore(index: number) {
    const target = versions[index];
    if (!target || target === code) return;
    setCode(target);
    setGeneration((g) => g + 1);
    setTab("preview");
  }

  /** Send the compile error and current code back to the model (FR-6). */
  async function fixWithAi(message: string) {
    if (fixing || loading) return;
    setFixing(true);
    try {
      await send(
        `The preview failed with this error:

${message}

Fix it and return the complete corrected file.`,
      );
    } finally {
      setFixing(false);
    }
  }

  async function share(): Promise<string | null> {
    if (!projectId) {
      setError("Nothing to share yet - generate something first.");
      return null;
    }
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not share.");
      return data.url as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not share.");
      return null;
    }
  }

  async function download() {
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          files: Object.keys(files).length > 0 ? files : undefined,
          title: history[0]?.content ?? "ui-generator-export",
        }),
      });
      if (!res.ok) throw new Error("Export failed.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ui-generator-project.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed.");
    }
  }

  async function send(prompt: string) {
    const trimmed = prompt.trim();
    const sentImage = attachment;
    if ((!trimmed && !sentImage) || loading || outOfQuota) return;

    setInput("");
    setAttachment(null);
    setError(null);
    setLoading(true);
    setStage(null);
    setBuildStartedAt(Date.now());
    setMobileView("result");
    const sentHistory = history;
    const label =
      trimmed ||
      (sentImage?.kind === "text"
        ? `Build what ${sentImage.name} describes`
        : sentImage?.kind === "pdf"
          ? `Build what ${sentImage.name} describes`
          : "Build this screenshot");
    setHistory((h) => [
      ...h,
      { role: "user", content: sentImage ? `${label}  [${sentImage.name}]` : label },
    ]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            trimmed ||
            (sentImage?.kind === "image"
              ? "Recreate the attached screenshot as a React component."
              : "Build the app described in the attached file."),
          history: sentHistory,
          projectId,
          model,
          // Send the current files so the server knows this is an edit and can
          // provide the model with the existing project as context.
          ...(isEdit ? { files } : {}),
          ...(sentImage?.kind === "text"
            ? { document: { name: sentImage.name, text: sentImage.text } }
            : sentImage
              ? { image: { data: sentImage.data, mimeType: sentImage.mimeType } }
              : {}),
        }),
      });
      // The route streams newline-delimited progress events and finishes with
      // a "done" (or "error") event carrying the payload. Anything that failed
      // before streaming started is still a plain JSON error response.
      let data: GenerateResponse | null = null;
      if (res.headers.get("content-type")?.includes("ndjson") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const event = JSON.parse(line);
            if (event.type === "stage") setStage(event);
            else if (event.type === "error") throw new Error(event.error);
            else if (event.type === "done") data = event;
          }
        }
        if (!data) throw new Error("The build ended without returning a result.");
      } else {
        data = await res.json();
      }
      if (!data) throw new Error("The build returned no result.");
      if (data.usage) setUsage(data.usage);
      if (!res.ok) throw new Error(data.error ?? "Generation failed.");

      // Only swap the sandbox files once a generation is complete.
      if (data.projectId) setProjectId(data.projectId);
      if (data.files) setFiles(data.files);
      setBuildNotes([
        ...(data.plan ? [`Planned: ${data.plan}`] : []),
        ...(data.components?.length
          ? [`Used ${data.components.map((c: { component: string }) => c.component).join(", ")}`]
          : []),
        ...(data.notes ?? []),
      ]);
      if (data.dependencies) setDependencies(data.dependencies);
      setCode(data.code ?? data.files?.["/App.tsx"] ?? "");
      setGeneration((g) => g + 1);
      setTab("preview");
      setHistory((h) => [
        ...h,
        { role: "assistant", content: data.code ?? data.files?.["/App.tsx"] ?? "" },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
      setHistory((h) => h.slice(0, -1));
      setMobileView("chat");
    } finally {
      setLoading(false);
      setStage(null);
      setBuildStartedAt(null);
    }
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-canvas">
      <TopBar
        usage={usage}
        user={user}
        authEnabled={authEnabled}
        providers={providers}
        busy={loading}
        canReset={started}
        onReset={reset}
      />

      {!started ? (
        <main className="min-h-0 flex-1">
          <Landing
            input={input}
            onInput={setInput}
            onSubmit={send}
            model={model}
            models={models}
            onModelChange={setModel}
            loading={loading}
            outOfQuota={outOfQuota}
            error={error}
            attachment={attachment}
            onAttach={setAttachment}
            bakedTemplates={bakedTemplates}
            onOpenTemplate={openTemplate}
          />
        </main>
      ) : (
        <>
          <div className="flex shrink-0 gap-1 border-b border-line p-1.5 md:hidden">
            {(["chat", "result"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setMobileView(v)}
                aria-pressed={mobileView === v}
                className={`h-9 flex-1 cursor-pointer rounded-md text-xs capitalize transition-colors duration-200 ${
                  mobileView === v ? "bg-raised text-ink" : "text-muted"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div ref={shellRef} className="flex min-h-0 flex-1">
            <aside
              style={{ "--chat-w": `${chatWidth}px` } as CSSProperties}
              className={`min-h-0 w-full shrink-0 flex-col border-line md:flex md:w-[var(--chat-w)] md:border-r ${
                mobileView === "chat" ? "flex" : "hidden"
              }`}
            >
              <ChatPanel
                history={history}
                loading={loading}
                error={error}
                input={input}
                onInput={setInput}
                onSend={send}
                model={model}
                models={models}
                onModelChange={setModel}
                outOfQuota={outOfQuota}
                isEdit={isEdit}
                buildNotes={buildNotes}
                stage={stage}
                buildStartedAt={buildStartedAt}
                attachment={attachment}
                onAttach={setAttachment}
              />
            </aside>

            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize panels"
              tabIndex={0}
              onPointerDown={startResize}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setChatWidth((w) => Math.max(MIN_CHAT, w - 16));
                if (e.key === "ArrowRight") setChatWidth((w) => Math.min(MAX_CHAT, w + 16));
              }}
              className="hidden w-1 shrink-0 cursor-col-resize transition-colors duration-200 hover:bg-line-strong focus-visible:bg-ink md:block"
            />

            <div
              className={
                fullscreen
                  ? "fixed inset-0 z-40 flex bg-canvas"
                  : `min-h-0 min-w-0 flex-1 md:flex ${mobileView === "result" ? "flex" : "hidden"}`
              }
            >
              <PreviewPanel
                code={code}
                files={files}
                dependencies={dependencies}
                generation={generation}
                tab={tab}
                onTabChange={setTab}
                deviceWidth={deviceWidth}
                onDeviceChange={setDeviceWidth}
                loading={loading}
                onFix={fixWithAi}
                fixing={fixing}
                onErrorChange={setPreviewError}
                versions={versions}
                onRestore={restore}
                fullscreen={fullscreen}
                onFullscreenChange={setFullscreen}
                onShare={share}
                onDownload={download}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
