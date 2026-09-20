"use client";

import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { SANDPACK_BUNDLER_URL, SANDPACK_DEPENDENCIES } from "@/lib/config";
import { PreviewErrorOverlay } from "./PreviewErrorOverlay";

// Sandpack's bundler serves its own HTML and ignores /public/index.html, so
// Tailwind has to come in through externalResources.
const EXTERNAL_RESOURCES = ["https://cdn.tailwindcss.com"];

export function Preview({
  code,
  files,
  dependencies,
  generation,
  tab,
  deviceWidth,
  onFix,
  fixing,
  onErrorChange,
}: {
  code: string;
  /** Whole project. Falls back to a single /App.tsx when absent. */
  files?: Record<string, string>;
  dependencies?: Record<string, string>;
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
      files={files && Object.keys(files).length > 0 ? files : { "/App.tsx": code }}
      // Only what the project imports, so a plain page does not pay for WebGL.
      customSetup={{ dependencies: { ...SANDPACK_DEPENDENCIES, ...(dependencies ?? {}) } }}
      options={{
        recompileMode: "delayed",
        recompileDelay: 500,
        externalResources: EXTERNAL_RESOURCES,
        // Self-hosting: point at your own sandpack-bundler to stop previews
        // reaching out to CodeSandbox.
        ...(SANDPACK_BUNDLER_URL ? { bundlerURL: SANDPACK_BUNDLER_URL } : {}),
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
            showTabs
            showInlineErrors
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
