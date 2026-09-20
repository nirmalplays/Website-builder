"use client";

import { useRef } from "react";
import { MODELS } from "@/lib/config";

export type Attachment = { data: string; mimeType: string; name: string; preview: string };

export function Composer({
  value,
  onChange,
  onSubmit,
  model,
  onModelChange,
  loading,
  outOfQuota,
  isEdit,
  attachment,
  onAttach,
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
  attachment: Attachment | null;
  onAttach: (a: Attachment | null) => void;
  size?: "hero" | "panel";
}) {
  const hero = size === "hero";
  const fileRef = useRef<HTMLInputElement>(null);

  async function pickImage(file: File | undefined) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      onAttach(null);
      return;
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    onAttach({
      data: dataUrl.split(",")[1],
      mimeType: file.type,
      name: file.name,
      preview: dataUrl,
    });
  }
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

      {attachment && (
        <div className="mx-3 mb-1 flex items-center gap-2 rounded-lg border border-line bg-raised p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={attachment.preview} alt="" className="h-9 w-9 rounded object-cover" />
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">
            {attachment.name}
          </span>
          <button
            onClick={() => onAttach(null)}
            aria-label="Remove attachment"
            className="grid h-6 w-6 cursor-pointer place-items-center rounded text-faint transition-colors duration-200 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <div className={`flex items-center justify-between gap-2 ${hero ? "p-3" : "p-2"}`}>
        <div className="flex min-w-0 items-center gap-1.5">
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              void pickImage(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            title="Attach a screenshot or wireframe"
            aria-label="Attach an image"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-line bg-raised text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21 15-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
            </svg>
          </button>
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
          disabled={loading || (!value.trim() && !attachment) || outOfQuota}
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
