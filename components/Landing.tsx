"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, QUICK_STARTS, TEMPLATES, type Category } from "@/lib/templates";
import { TemplateCardImage } from "./TemplateCardImage";
import { Composer, type Attachment } from "./Composer";

export function Landing({
  input,
  onInput,
  onSubmit,
  loading,
  outOfQuota,
  error,
  attachment,
  onAttach,
  bakedTemplates,
  onOpenTemplate,
}: {
  input: string;
  onInput: (v: string) => void;
  onSubmit: (v: string) => void;
  loading: boolean;
  outOfQuota: boolean;
  error: string | null;
  attachment: Attachment | null;
  onAttach: (a: Attachment | null) => void;
  bakedTemplates: string[];
  onOpenTemplate: (id: string, title: string) => void;
}) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [chipSeed, setChipSeed] = useState(0);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const INITIAL = 12;

  // Four chips at a time, rotated by the shuffle button.
  const chips = useMemo(() => {
    const start = (chipSeed * 4) % QUICK_STARTS.length;
    return Array.from({ length: 4 }, (_, i) => QUICK_STARTS[(start + i) % QUICK_STARTS.length]);
  }, [chipSeed]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      if (filter !== "All" && t.category !== filter) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.blurb.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const visible = showAll || query ? matches : matches.slice(0, INITIAL);

  const ready = new Set(bakedTemplates);

  /** Prompt-only starters load into the composer so they can be edited first. */
  function useTemplate(prompt: string) {
    onInput(prompt);
    document.getElementById("prompt")?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-[42px] sm:leading-[1.1]">
            What do you want to build?
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted">
            Describe a UI and get live React and Tailwind you can keep editing by chatting.
          </p>

          <div className="mt-7 text-left">
            <Composer
              value={input}
              onChange={onInput}
              onSubmit={onSubmit}
              loading={loading}
              outOfQuota={outOfQuota}
              isEdit={false}
              attachment={attachment}
              onAttach={onAttach}
              size="hero"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-left text-[13px] text-danger"
            >
              {error}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            {chips.map((c) => (
              <button
                key={c.label}
                onClick={() => useTemplate(c.prompt)}
                className="h-8 cursor-pointer rounded-full border border-line bg-surface px-3 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
              >
                {c.label}
              </button>
            ))}
            <button
              onClick={() => setChipSeed((s) => s + 1)}
              aria-label="Show different suggestions"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 21v-5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <section className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-semibold tracking-tight">Start with a template</h2>
              <span className="font-mono text-[11px] text-faint">{matches.length}</span>
            </div>
            <label htmlFor="template-search" className="sr-only">
              Search templates
            </label>
            <input
              id="template-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates"
              className="h-8 w-full max-w-[220px] rounded-full border border-line bg-surface px-3 text-xs text-ink outline-none transition-colors duration-200 placeholder:text-faint hover:border-line-strong focus:border-line-strong"
            />
            <div className="flex flex-wrap gap-1">
              {(["All", ...CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                  className={`h-8 cursor-pointer rounded-full border px-3 text-xs transition-colors duration-200 ${
                    filter === c
                      ? "border-line-strong bg-raised text-ink"
                      : "border-line bg-surface text-muted hover:border-line-strong hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() =>
                    ready.has(t.id) ? onOpenTemplate(t.id, t.title) : useTemplate(t.prompt)
                  }
                  disabled={!ready.has(t.id) && outOfQuota}
                  className="group w-full cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="relative">
                    <TemplateCardImage id={t.id} kind={t.preview} title={t.title} />
                    {ready.has(t.id) && (
                      <span className="absolute right-2 top-2 rounded-full bg-canvas/85 px-2 py-0.5 text-[10px] font-medium text-ink shadow-sm ring-1 ring-ink/15 backdrop-blur">
                        Ready
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-[13px] font-medium text-ink">{t.title}</h3>
                      <p className="truncate text-[12px] text-faint">
                        {ready.has(t.id) ? "Opens instantly · no credits used" : t.blurb}
                      </p>
                    </div>
                    <span className="mt-0.5 shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] text-faint">
                      {t.category}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {matches.length === 0 && (
            <p className="mt-8 text-center text-[13px] text-muted">
              No template matches &ldquo;{query}&rdquo;. Describe it in the box above instead.
            </p>
          )}

          {!showAll && !query && matches.length > INITIAL && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="h-9 cursor-pointer rounded-full border border-line bg-surface px-4 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
              >
                Browse all {matches.length} templates
              </button>
            </div>
          )}

          <p className="mt-8 text-center font-mono text-[11px] text-faint">
            Templates marked Ready open instantly from shipped code. The rest load into the
            prompt box to generate.
          </p>
        </section>
      </div>
    </div>
  );
}
