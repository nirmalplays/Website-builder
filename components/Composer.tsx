"use client";

import { useRef } from "react";
import type { PickerModel } from "@/lib/config";

export type Attachment = {
  kind: "image" | "pdf" | "text";
  name: string;
  /** Base64 for image/pdf. */
  data?: string;
  mimeType?: string;
  /** Extracted text for code, markdown, JSON and other plain files. */
  text?: string;
  /** Data URL, only for images. */
  preview?: string;
  size: number;
};

const TEXT_EXTENSIONS =
  /\.(md|markdown|txt|tsx|ts|jsx|js|mjs|cjs|json|csv|css|scss|html|yml|yaml|env|sql)$/i;

export function Composer({
  value,
  onChange,
  onSubmit,
  loading,
  outOfQuota,
  isEdit,
  attachment,
  onAttach,
  model,
  models,
  onModelChange,
  size = "panel",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  /**
   * Passed down from the server. Deriving it here would read provider env
   * vars that only exist server-side, so the server would render one list
   * and the client another - a hydration mismatch.
   */
  loading: boolean;
  outOfQuota: boolean;
  isEdit: boolean;
  attachment: Attachment | null;
  onAttach: (a: Attachment | null) => void;
  model: string;
  models: PickerModel[];
  onModelChange: (id: string) => void;
  size?: "hero" | "panel";
}) {
  const hero = size === "hero";
  const fileRef = useRef<HTMLInputElement>(null);

  /** Images and PDFs go up as base64; anything text-shaped goes up as text. */
  async function pickFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      onAttach(null);
      return;
    }

    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";

    if (isImage || isPdf) {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      onAttach({
        kind: isPdf ? "pdf" : "image",
        name: file.name,
        data: dataUrl.split(",")[1],
        mimeType: isPdf ? "application/pdf" : file.type,
        preview: isImage ? dataUrl : undefined,
        size: file.size,
      });
      return;
    }

    if (file.type.startsWith("text/") || TEXT_EXTENSIONS.test(file.name) || file.type === "application/json") {
      const text = await file.text();
      onAttach({ kind: "text", name: file.name, text, size: file.size });
    }
  }

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
          {attachment.preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={attachment.preview} alt="" className="h-9 w-9 rounded object-cover" />
          ) : (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-canvas text-faint">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M14 3v5h5" strokeLinejoin="round" />
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">
            {attachment.name}
            <span className="ml-1.5 text-faint">
              {attachment.kind === "text"
                ? `${Math.max(1, Math.round((attachment.text?.length ?? 0) / 1000))}k chars`
                : `${Math.round(attachment.size / 1024)} KB`}
            </span>
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

          {/* Grouped by provider: with two vendors configured the meaningful
              choice is within one - Opus against Haiku differs more in cost and
              speed than Opus against Gemini Pro. */}
          <label htmlFor="model" className="sr-only">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            title={models.find((m) => m.id === model)?.note}
            className="h-8 max-w-[11rem] cursor-pointer truncate rounded-lg border border-line bg-raised px-2 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            {[...new Set(models.map((m) => m.group))].map((group) => (
              <optgroup key={group} label={group}>
                {models
                  .filter((m) => m.group === group)
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
      )}

      <div className={`flex items-center justify-between gap-2 ${hero ? "p-3" : "p-2"}`}>
        <div className="flex min-w-0 items-center gap-1.5">
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,application/pdf,.md,.txt,.tsx,.ts,.jsx,.js,.json,.csv,.css,.html"
            className="hidden"
            onChange={(e) => {
              void pickFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            title="Attach a screenshot, PRD, spec or code file"
            aria-label="Attach a file"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-line bg-raised text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21 15-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
            </svg>
          </button>
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
