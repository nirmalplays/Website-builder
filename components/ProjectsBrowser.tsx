"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProjectRow = {
  id: string;
  title: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  versions: number;
  model: string | null;
};

function when(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(ms / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function ProjectsBrowser() {
  const router = useRouter();
  const [state, setState] = useState<{
    loading: boolean;
    enabled: boolean;
    signedIn: boolean;
    projects: ProjectRow[];
  }>({ loading: true, enabled: true, signedIn: false, projects: [] });
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) {
          setState({
            loading: false,
            enabled: d.enabled ?? false,
            signedIn: d.signedIn ?? false,
            projects: d.projects ?? [],
          });
        }
      })
      .catch(() => setState((s) => ({ ...s, loading: false, enabled: false })));
    return () => {
      cancelled = true;
    };
  }, []);

  async function remove(id: string) {
    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setState((s) => ({ ...s, projects: s.projects.filter((p) => p.id !== id) }));
      }
    } finally {
      setDeleting(null);
      setConfirming(null);
    }
  }

  if (state.loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-line bg-surface" />
          ))}
        </div>
      </div>
    );
  }

  if (!state.enabled) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-xl font-semibold tracking-tight">History is off</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Projects are saved to Postgres. Set <code className="text-ink">DATABASE_URL</code> to turn
          history on &mdash; generating works either way.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your projects</h1>
          <p className="mt-1.5 text-sm text-muted">
            {state.projects.length === 0
              ? "Nothing saved yet."
              : `${state.projects.length} saved. Every generation is a version you can reopen.`}
          </p>
        </div>
        <Link
          href="/"
          className="flex h-9 items-center rounded-lg bg-accent px-3 text-xs font-medium text-accent-ink transition-opacity duration-200 hover:opacity-90"
        >
          New project
        </Link>
      </div>

      {!state.signedIn && state.projects.length > 0 && (
        <p className="mt-5 rounded-lg border border-line bg-surface px-3 py-2.5 text-[13px] leading-snug text-muted">
          These are saved to this browser. Sign in and they follow your account instead.
        </p>
      )}

      {state.projects.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-sm text-muted">Build something and it will appear here.</p>
          <Link
            href="/"
            className="mt-4 inline-flex h-9 items-center rounded-lg border border-line px-3 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            Start building
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {state.projects.map((p) => (
            <li
              key={p.id}
              className="group relative rounded-xl border border-line bg-surface p-4 transition-colors duration-200 hover:border-line-strong"
            >
              <button
                onClick={() => router.push(`/?project=${p.id}`)}
                className="w-full cursor-pointer text-left"
              >
                <h2 className="line-clamp-2 text-[13px] font-medium leading-snug text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 font-mono text-[11px] text-faint">
                  {p.versions} version{p.versions === 1 ? "" : "s"} &middot; {when(p.updatedAt)}
                  {p.isPublic ? " · shared" : ""}
                </p>
                {p.model && (
                  <p className="mt-0.5 truncate font-mono text-[10px] text-faint">{p.model}</p>
                )}
              </button>

              {confirming === p.id ? (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => remove(p.id)}
                    disabled={deleting === p.id}
                    className="h-7 cursor-pointer rounded-md bg-danger/15 px-2 text-[11px] text-danger transition-colors hover:bg-danger/25"
                  >
                    {deleting === p.id ? "Deleting" : "Delete for good"}
                  </button>
                  <button
                    onClick={() => setConfirming(null)}
                    className="h-7 cursor-pointer rounded-md px-2 text-[11px] text-muted hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirming(p.id)}
                  aria-label={`Delete ${p.title}`}
                  className="absolute right-3 top-3 hidden h-7 w-7 cursor-pointer place-items-center rounded-md text-faint transition-colors hover:bg-raised hover:text-danger group-hover:grid"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
