"use client";

import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { SANDPACK_DEPENDENCIES } from "@/lib/config";

// Tailwind comes from the play CDN inside the sandbox, so generated classes just work.
const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { margin: 0; }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

export function Preview({
  code,
  generation,
  tab,
  deviceWidth,
}: {
  code: string;
  generation: number;
  tab: "preview" | "code";
  deviceWidth: number | null;
}) {
  return (
    <SandpackProvider
      // Remount cleanly per generation instead of patching a live bundle.
      key={generation}
      template="react-ts"
      theme="dark"
      files={{
        "/App.tsx": code,
        "/public/index.html": INDEX_HTML,
      }}
      customSetup={{ dependencies: SANDPACK_DEPENDENCIES }}
      options={{ recompileMode: "delayed", recompileDelay: 500 }}
    >
      <div className="h-full w-full">
        <div className={tab === "preview" ? "h-full" : "hidden"}>
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
