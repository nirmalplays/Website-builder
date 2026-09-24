"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Where the user hands the app their API keys.
 *
 * A stored value is never shown again - the list holds a provider, a field
 * name and the last four characters. Re-pasting a key replaces it, so rotating
 * one is the same action as adding it.
 */

type Field = {
  name: string;
  label: string;
  visibility: "publishable" | "secret";
  required: boolean;
  placeholder: string;
  help: string;
};

type Provider = { slug: string; label: string; blurb: string; fields: Field[] };

type Connection = {
  id: string;
  provider: string;
  name: string;
  visibility: "publishable" | "secret";
  hint: string;
};

export function ConnectionsPanel() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [encryptionReady, setEncryptionReady] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/connections", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setProviders(data.providers);
    setConnections(data.connections);
    setEncryptionReady(data.encryptionReady);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const stored = (provider: string, name: string) =>
    connections.find((c) => c.provider === provider && c.name === name);

  async function save(provider: string, field: Field) {
    const key = `${provider}.${field.name}`;
    const value = (drafts[key] ?? "").trim();
    if (!value) return;

    setBusy(key);
    setError(null);
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, name: field.name, value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not save that credential.");
      setDrafts((d) => ({ ...d, [key]: "" }));
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save that credential.");
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    setBusy(id);
    try {
      await fetch(`/api/connections?id=${id}`, { method: "DELETE" });
      await load();
    } finally {
      setBusy(null);
    }
  }

  return (
    <section>
      <h2 className="font-['Manrope',sans-serif] text-2xl tracking-tight text-ink">Integrations</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Give the builder a key and it wires the service into what it generates. Publishable keys go
        into the app itself; secrets stay on the server and are reached through a proxy, because
        anyone with a preview link can read the app&apos;s source.
      </p>

      {!encryptionReady && (
        <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 text-sm text-amber-200">
          <strong className="font-medium">CONNECTION_SECRET is not set.</strong> Credentials are
          stored encrypted, so nothing will be accepted until it is. Generate one with{" "}
          <code className="font-mono text-xs">
            node -e &quot;console.log(require(&apos;crypto&apos;).randomBytes(32).toString(&apos;base64&apos;))&quot;
          </code>
          .
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {providers.map((p) => {
          const connected = p.fields.filter((f) => stored(p.slug, f.name)).length;
          const ready = p.fields.filter((f) => f.required).every((f) => stored(p.slug, f.name));
          const isOpen = open === p.slug;

          return (
            <div key={p.slug} className="rounded-lg border border-line bg-surface">
              <button
                onClick={() => setOpen(isOpen ? null : p.slug)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left"
              >
                <span>
                  <span className="flex items-center gap-2">
                    <span className="text-ink">{p.label}</span>
                    {ready ? (
                      <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                        connected
                      </span>
                    ) : connected > 0 ? (
                      <span className="rounded border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                        incomplete
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{p.blurb}</span>
                </span>
                <span className="font-mono text-xs text-faint">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-line p-4">
                  {p.fields.map((f) => {
                    const key = `${p.slug}.${f.name}`;
                    const existing = stored(p.slug, f.name);
                    return (
                      <div key={f.name}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <label htmlFor={key} className="text-sm text-ink">
                            {f.label}
                            {!f.required && <span className="text-faint"> · optional</span>}
                          </label>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider ${
                              f.visibility === "secret" ? "text-amber-300" : "text-muted"
                            }`}
                          >
                            {f.visibility === "secret" ? "server only" : "ships in the app"}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted">{f.help}</p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <input
                            id={key}
                            type="password"
                            autoComplete="off"
                            spellCheck={false}
                            value={drafts[key] ?? ""}
                            onChange={(e) => setDrafts((d) => ({ ...d, [key]: e.target.value }))}
                            placeholder={existing ? `stored ${existing.hint} — paste to replace` : f.placeholder}
                            className="h-9 min-w-0 flex-1 rounded-lg border border-line bg-raised px-3 font-mono text-xs text-ink placeholder:text-faint focus:border-line-strong focus:outline-none"
                          />
                          <button
                            onClick={() => void save(p.slug, f)}
                            disabled={busy === key || !(drafts[key] ?? "").trim()}
                            className="h-9 cursor-pointer rounded-lg bg-accent px-3 text-xs font-medium text-accent-ink transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
                          >
                            {busy === key ? "Saving…" : saved === key ? "Saved" : existing ? "Replace" : "Save"}
                          </button>
                          {existing && (
                            <button
                              onClick={() => void remove(existing.id)}
                              disabled={busy === existing.id}
                              className="h-9 cursor-pointer rounded-lg border border-line px-3 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
