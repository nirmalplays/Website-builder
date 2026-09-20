"use client";

import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { SANDPACK_DEPENDENCIES } from "@/lib/config";
import { PreviewErrorOverlay } from "./PreviewErrorOverlay";

// Sandpack's bundler serves its own HTML and ignores /public/index.html, so
// Tailwind has to come in through externalResources.
const EXTERNAL_RESOURCES = ["https://cdn.tailwindcss.com"];

export function Preview({
  code,
  generation,
  tab,
  deviceWidth,
  onFix,
  fixing,
  onErrorChange,
}: {
  code: string;
  generation: number;
  tab: "preview" | "code";
  deviceWidth: number | null;
  onFix: (message: string) => void;
  fixing: boolean;
  onErrorChange: (message: string | null) => void;
}) {
  return (
    <SandpackProvider
      // Remount cleanly per generation instead of patching a live bundle.
      key={generation}
      template="react-ts"
      theme="dark"
      files={{ "/App.tsx": code }}
      customSetup={{ dependencies: SANDPACK_DEPENDENCIES }}
      options={{
        recompileMode: "delayed",
        recompileDelay: 500,
        externalResources: EXTERNAL_RESOURCES,
      }}
    >
      <div className="h-full w-full">
        <div className={tab === "preview" ? "relative h-full" : "hidden"}>
          <PreviewErrorOverlay onFix={onFix} fixing={fixing} onErrorChange={onErrorChange} />
          {/* Device widths letterbox the frame rather than scaling it, so the
              generated component hits its real Tailwind breakpoints. */}
          <div className="flex h-full w-full justify-center overflow-hidden bg-canvas">
            <div
              className="h-full w-full transition-[max-width] duration-300 ease-out"
              style={
                deviceWidth
                  ? { maxWidth: `${deviceWidth}px`, borderInline: "1px solid var(--color-line)" }
                  : undefined
              }
            >
              <SandpackPreview
                showNavigator={false}
                showRefreshButton
                showOpenInCodeSandbox
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className={tab === "code" ? "h-full" : "hidden"}>
          <SandpackCodeEditor
            showTabs={false}
            showLineNumbers
            readOnly
            showReadOnly={false}
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </SandpackProvider>
  );
}
