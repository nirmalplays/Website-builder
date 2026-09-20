"use client";

import { MODELS } from "@/lib/config";

export function Composer({
  value,
  onChange,
  onSubmit,
  model,
  onModelChange,
  loading,
  outOfQuota,
  isEdit,
  size = "panel",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  model: string;
  onModelChange: (id: string) => void;
  loading: boolean;
  outOfQuota: boolean;
  isEdit: boolean;
  size?: "hero" | "panel";
}) {
  const hero = size === "hero";
  const active = MODELS.find((m) => m.id === model);

  return (
    <div
      className={`rounded-2xl border border-line bg-surface transition-colors duration-200 focus-within:border-line-strong ${
        hero ? "shadow-2xl shadow-black/40" : ""
      }`}
    >
      <label htmlFor="prompt" className="sr-only">
        Describe the UI you want
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(value);
          }
        }}
        rows={hero ? 3 : 3}
        autoFocus={hero}
        disabled={outOfQuota}
        placeholder={
          outOfQuota
            ? "Daily limit reached."
            : isEdit
              ? "make it dark and add a testimonials section"
              : "Ask for a UI…"
        }
        className={`block w-full resize-none bg-transparent text-ink outline-none placeholder:text-faint disabled:cursor-not-allowed ${
          hero ? "px-4 pt-4 text-[15px] leading-relaxed" : "px-3 pt-3 text-[13px] leading-snug"
        }`}
      />

      <div className={`flex items-center justify-between gap-2 ${hero ? "p-3" : "p-2"}`}>
        <div className="flex min-w-0 items-center gap-1.5">
          <label htmlFor="model" className="sr-only">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            title={active?.note}
            className="h-8 max-w-[10rem] cursor-pointer truncate rounded-lg border border-line bg-raised px-2 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
          {hero && (
            <span className="hidden truncate font-mono text-[11px] text-faint sm:inline">
              {active?.note}
            </span>
          )}
        </div>

        <button
          onClick={() => onSubmit(value)}
          disabled={loading || !value.trim() || outOfQuota}
          aria-label={isEdit ? "Send edit" : "Generate component"}
          className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-medium text-accent-ink transition-opacity duration-200 enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
        >
          {loading ? (
            <>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              Working
            </>
          ) : outOfQuota ? (
            "Limit reached"
          ) : (
            <>
              {isEdit ? "Send" : "Generate"}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
