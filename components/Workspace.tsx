"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ChatPanel, type Turn } from "./ChatPanel";
import { PreviewPanel } from "./PreviewPanel";
import { TopBar } from "./TopBar";
import type { SessionUser } from "./AuthButton";
import type { Usage } from "./UsageMeter";
import type { OAuthProvider } from "@/lib/supabase/config";

const MIN_CHAT = 320;
const MAX_CHAT = 560;

export function Workspace({
  defaultModel,
  authEnabled,
  providers,
  user,
}: {
  defaultModel: string;
  authEnabled: boolean;
  providers: OAuthProvider[];
  user: SessionUser;
}) {
  const [history, setHistory] = useState<Turn[]>([]);
  const [code, setCode] = useState("");
  const [model, setModel] = useState(defaultModel);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [generation, setGeneration] = useState(0);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [deviceWidth, setDeviceWidth] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [chatWidth, setChatWidth] = useState(380);
  const [mobileView, setMobileView] = useState<"chat" | "result">("chat");
  const shellRef = useRef<HTMLDivElement>(null);

  const isEdit = code !== "";
  const outOfQuota = usage?.enforced === true && usage.remaining <= 0;

  // Seed the meter on load; every generation refreshes it from its own response.
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

  // Cmd/Ctrl+K focuses the prompt from anywhere.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMobileView("chat");
        document.getElementById("prompt")?.focus();
      }
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

  async function send(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed || loading || outOfQuota) return;

    setInput("");
    setError(null);
    setLoading(true);
    setMobileView("result");
    const sentHistory = history;
    setHistory((h) => [...h, { role: "user", content: trimmed }]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, history: sentHistory, projectId, model }),
      });
      const data = await res.json();
      if (data.usage) setUsage(data.usage);
      if (!res.ok) throw new Error(data.error ?? "Generation failed.");

      // Only swap the sandbox files once a generation is complete.
      if (data.projectId) setProjectId(data.projectId);
      setCode(data.code);
      setGeneration((g) => g + 1);
      setTab("preview");
      setHistory((h) => [...h, { role: "assistant", content: data.code }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
      setHistory((h) => h.slice(0, -1));
      setMobileView("chat");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-canvas">
      <TopBar
        model={model}
        onModelChange={setModel}
        usage={usage}
        user={user}
        authEnabled={authEnabled}
        providers={providers}
        busy={loading}
      />

      {/* Single-pane switch below the md breakpoint. */}
      <div className="flex shrink-0 gap-1 border-b border-line bg-surface/60 p-1.5 md:hidden">
        {(["chat", "result"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setMobileView(v)}
            aria-pressed={mobileView === v}
            className={`h-9 flex-1 cursor-pointer rounded-md font-mono text-[11px] capitalize transition-colors duration-200 ${
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
            outOfQuota={outOfQuota}
            isEdit={isEdit}
          />
        </aside>

        {/* Drag or arrow-key the divider. */}
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
          className="hidden w-1 shrink-0 cursor-col-resize bg-transparent transition-colors duration-200 hover:bg-accent/40 focus-visible:bg-accent/60 md:block"
        />

        <div
          className={`min-h-0 min-w-0 flex-1 md:flex ${
            mobileView === "result" ? "flex" : "hidden"
          }`}
        >
          <PreviewPanel
            code={code}
            generation={generation}
            tab={tab}
            onTabChange={setTab}
            deviceWidth={deviceWidth}
            onDeviceChange={setDeviceWidth}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
