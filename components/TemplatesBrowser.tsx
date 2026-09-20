"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, TEMPLATES, type Category } from "@/lib/templates";
import { TemplateThumb } from "./TemplateThumb";
import { TemplateCardImage } from "./TemplateCardImage";

const FEATURED = ["saas-site", "restaurant-site", "crypto-site", "wedding-site", "hotel-site", "game-studio-site"];

export function TemplatesBrowser({ bakedTemplates }: { bakedTemplates: string[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Category | "All">("All");
  const ready = useMemo(() => new Set(bakedTemplates), [bakedTemplates]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      if (filter !== "All" && t.category !== filter) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.blurb.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const featured = FEATURED.map((id) => TEMPLATES.find((t) => t.id === id)).filter(
    (t): t is (typeof TEMPLATES)[number] => Boolean(t),
  );

  function open(id: string) {
    router.push(`/?template=${id}`);
  }

  const byCategory = (c: Category) => TEMPLATES.filter((t) => t.category === c);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-12">
      <div className="text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-[1.1]">
          Duplicate a template
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          {TEMPLATES.length} ready-made sites, apps and components. Open one, then edit it by
          chatting.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <label htmlFor="browse-search" className="sr-only">
            Search templates
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 transition-colors duration-200 focus-within:border-line-strong">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-faint" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              id="browse-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates"
              className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
            />
          </div>
        </div>
      </div>

      {/* Category overview, hidden while searching. */}
      {!query && filter === "All" && (
        <section className="mt-14">
          <h2 className="text-sm font-medium text-muted">Categories</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => {
              const items = byCategory(c);
              return (
                <li key={c}>
                  <button
                    onClick={() => setFilter(c)}
                    className="group w-full cursor-pointer rounded-xl border border-line bg-surface p-3 text-left transition-colors duration-200 hover:border-line-strong hover:bg-raised"
                  >
                    {/* Always four slots, so cards in a row are the same height. */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {Array.from({ length: 4 }, (_, i) => {
                        const t = items[i];
                        return t ? (
                          <TemplateThumb key={t.id} kind={t.preview} />
                        ) : (
                          <div
                            key={`empty-${i}`}
                            aria-hidden="true"
                            className="aspect-[16/10] w-full rounded-lg border border-line/60 bg-canvas"
                          />
                        );
                      })}
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-[13px] font-medium">{c}</span>
                      <span className="font-mono text-[11px] text-faint">{items.length}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {!query && filter === "All" && (
        <section className="mt-14">
          <h2 className="text-sm font-medium text-muted">Featured</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <li key={t.id}>
                <Card template={t} ready={ready.has(t.id)} onOpen={open} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-muted">
            {filter === "All" ? "All templates" : filter}{" "}
            <span className="font-mono text-[11px] text-faint">{matches.length}</span>
          </h2>
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

        {matches.length === 0 ? (
          <p className="mt-10 text-center text-[13px] text-muted">
            Nothing matches &ldquo;{query}&rdquo;.{" "}
            <Link href="/" className="text-ink underline underline-offset-4">
              Describe it instead
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((t) => (
              <li key={t.id}>
                <Card template={t} ready={ready.has(t.id)} onOpen={open} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Card({
  template,
  ready,
  onOpen,
}: {
  template: (typeof TEMPLATES)[number];
  ready: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onOpen(template.id)}
      className="group w-full cursor-pointer text-left"
    >
      <div className="relative">
        <TemplateCardImage id={template.id} kind={template.preview} title={template.title} />
        {ready && (
          <span className="absolute right-2 top-2 rounded-full bg-canvas/85 px-2 py-0.5 text-[10px] font-medium text-ink shadow-sm ring-1 ring-ink/15 backdrop-blur">
            Ready
          </span>
        )}
        <span className="absolute inset-0 grid place-items-center rounded-lg bg-canvas/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-canvas">
            Open template
          </span>
        </span>
      </div>
      <div className="mt-2.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-medium text-ink">{template.title}</h3>
          <p className="truncate text-[12px] text-faint">{template.blurb}</p>
        </div>
        <span className="mt-0.5 shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] text-faint">
          {template.category}
        </span>
      </div>
    </button>
  );
}
