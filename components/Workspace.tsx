"use client";

import { useEffect, useRef, useState } from "react";
import { Preview } from "./Preview";
import { MODELS } from "@/lib/config";
import { AuthButton, type SessionUser } from "./AuthButton";
import type { OAuthProvider } from "@/lib/supabase/config";
import { UsageMeter, type Usage } from "./UsageMeter";

type Turn = { role: "user" | "assistant"; content: string };

const EXAMPLES = [
  "A pricing page with three tiers, a monthly/annual toggle and a highlighted middle plan",
  "A dark SaaS dashboard with a sidebar, four stat cards and a recent activity table",
  "A sign-in screen for a fintech app with social buttons and a subtle gradient",
  "A landing hero for a running shoe brand with a big product photo and an email capture",
];

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
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  async function send(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed || loading || outOfQuota) return;

    setInput("");
    setError(null);
    setLoading(true);
    const sentHistory = history;
    setHistory((h) => [...h, { role: "user", content: trimmed }]);
    requestAnimationFrame(() =>
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }),
    );

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid h-dvh grid-rows-[1fr_auto] bg-neutral-950 text-neutral-100 md:grid-cols-[380px_1fr] md:grid-rows-1">
      <section className="flex min-h-0 flex-col border-neutral-800 md:border-r">
        <header className="flex items-center gap-2 border-b border-neutral-800 px-5 py-4">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-indigo-500 text-sm font-semibold">
            &#9670;
          </span>
          <h1 className="text-sm font-semibold tracking-tight">UI Generator</h1>
          <label htmlFor="model" className="sr-only">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            title={MODELS.find((m) => m.id === model)?.note}
            className="ml-auto max-w-[8.5rem] truncate rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs text-neutral-300 outline-none hover:border-neutral-700 focus:border-neutral-600"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
          <AuthButton user={user} enabled={authEnabled} providers={providers} />
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {history.length === 0 && !loading ? (
            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-neutral-400">
                Describe a UI. You get a live React component, not a screenshot. Then keep talking
                to it.
              </p>
              <div className="space-y-2">
                {EXAMPLES.map((e) => (
                  <button
                    key={e}
                    onClick={() => send(e)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2.5 text-left text-[13px] leading-snug text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-900 hover:text-neutral-100"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ol className="space-y-3">
              {history.map((turn, i) =>
                turn.role === "user" ? (
                  <li
                    key={i}
                    className="ml-auto max-w-[90%] rounded-lg rounded-br-sm bg-indigo-600 px-3 py-2 text-[13px] leading-snug"
                  >
                    {turn.content}
                  </li>
                ) : (
                  <li
                    key={i}
                    className="mr-auto flex max-w-[90%] items-center gap-2 rounded-lg rounded-bl-sm border border-neutral-800 bg-neutral-900 px-3 py-2 text-[13px] text-neutral-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Updated App.tsx
                  </li>
                ),
              )}
              {loading && (
                <li className="mr-auto flex max-w-[90%] items-center gap-2 rounded-lg rounded-bl-sm border border-neutral-800 bg-neutral-900 px-3 py-2 text-[13px] text-neutral-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
                  {isEdit ? "Editing the component" : "Designing the component"}
                </li>
              )}
            </ol>
          )}

          {error && (
            <p className="mt-4 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-[13px] text-red-300">
              {error}
            </p>
          )}
        </div>

        <div className="border-t border-neutral-800 pb-3 pt-2">
          <UsageMeter usage={usage} />
          <div className="mx-3 rounded-xl border border-neutral-800 bg-neutral-900 focus-within:border-neutral-600">
            <label htmlFor="prompt" className="sr-only">
              Describe the UI you want
            </label>
            <textarea
              id="prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={3}
              autoFocus
              placeholder={
                isEdit
                  ? "make it dark and add a testimonials section"
                  : "a pricing page with three tiers"
              }
              className="block w-full resize-none bg-transparent px-3 py-2.5 text-[13px] leading-snug outline-none placeholder:text-neutral-600"
            />
            <div className="flex items-center justify-between px-3 pb-2.5">
              <span className="text-[11px] text-neutral-600">Enter to send</span>
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim() || outOfQuota}
                className="rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition enabled:hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
              >
                {outOfQuota ? "Limit reached" : loading ? "Generating" : isEdit ? "Edit" : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-col">
        <div className="flex items-center gap-1 border-b border-neutral-800 px-3 py-2">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              disabled={!code}
              className={
                tab === t && code
                  ? "rounded-md bg-neutral-800 px-3 py-1.5 text-xs font-medium capitalize text-neutral-100"
                  : "rounded-md px-3 py-1.5 text-xs font-medium capitalize text-neutral-400 transition hover:text-neutral-200 disabled:opacity-40"
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative min-h-0 flex-1 bg-neutral-900">
          {code ? (
            <Preview code={code} generation={generation} tab={tab} />
          ) : (
            <div className="grid h-full place-items-center p-8">
              {loading ? (
                <div className="w-full max-w-2xl animate-pulse space-y-4">
                  <div className="h-9 w-1/3 rounded-md bg-neutral-800" />
                  <div className="h-3 w-2/3 rounded bg-neutral-800/70" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-44 rounded-xl bg-neutral-800/70" />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-600">Your UI will render here.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
