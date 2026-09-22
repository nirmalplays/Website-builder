"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Preview } from "./Preview";

const REMIX_KEY = "uigen_remix";

export function SharedView({ title, code, files }: { title: string; code: string; files?: Record<string, string> }) {
  const router = useRouter();
  const [tab, setTab] = useState<"preview" | "code">("preview");

  /** Hand the code to the workspace through session storage, then open it. */
  function remix() {
    try {
      sessionStorage.setItem(REMIX_KEY, code);
    } catch {
      // Private mode can refuse storage; the editor just opens empty.
    }
    router.push("/?remix=1");
  }

  return (
    <div className="flex h-dvh flex-col bg-canvas">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" aria-hidden="true" width={26} height={26} className="h-[26px] w-[26px] rounded-[7px]" />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium">{title}</p>
          <p className="font-mono text-[10px] text-faint">shared preview &middot; read only</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg bg-raised p-0.5">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                aria-selected={tab === t}
                className={`h-7 cursor-pointer rounded-md px-2.5 font-mono text-[11px] capitalize transition-colors duration-200 ${
                  tab === t ? "bg-surface text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={remix}
            className="h-8 cursor-pointer rounded-lg bg-accent px-3 text-xs font-medium text-accent-ink transition-opacity duration-200 hover:opacity-90"
          >
            Remix
          </button>
        </div>
      </header>

      <main className="min-h-0 flex-1">
        <Preview
          code={code}
          files={files}
          generation={0}
          tab={tab}
          deviceWidth={null}
          onFix={() => {}}
          fixing={false}
          onErrorChange={() => {}}
        />
      </main>
    </div>
  );
}
