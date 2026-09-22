import type { Browser } from "playwright";
import { bundleProject, importMap, BundleError } from "./bundle";
import type { GeneratedFiles } from "@/lib/parseFiles";
import { googleFontsUrl } from "@/lib/skills/typography";

/**
 * Runs a generated project in a headless browser and reports what is wrong.
 *
 * This is the agent's eyes. Static checks cannot see a white screen, a runtime
 * crash on mount, a page that scrolls sideways on a phone, or a button that
 * does nothing when clicked. Rendering it and poking at it can.
 */

export type Finding = {
  severity: "fatal" | "error" | "warning";
  kind: string;
  detail: string;
};

export type VerifyReport = {
  ok: boolean;
  findings: Finding[];
  /** Base64 PNG of the desktop render, when one was produced. */
  screenshot?: string;
  stats: {
    renderedNodes: number;
    textLength: number;
    buttons: number;
    liveButtons: number;
    durationMs: number;
  };
};

const VIEWPORT = { width: 1280, height: 900 };
const MOBILE = { width: 390, height: 844 };

function page(bundle: string, map: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Same fonts the live preview loads, so verification sees what the user sees. -->
    <link rel="stylesheet" href="${googleFontsUrl()}" />
    <script type="importmap">${map}</script>
    <style>body{margin:0}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      window.__errors = [];
      window.addEventListener("error", (e) => window.__errors.push(String(e.message)));
      window.addEventListener("unhandledrejection", (e) => window.__errors.push("unhandled: " + String(e.reason)));
      try {
        const mod = await import("data:text/javascript;base64,${Buffer.from(bundle).toString("base64")}");
        const React = (await import("react")).default;
        const { createRoot } = await import("react-dom/client");
        const App = mod.default;
        if (!App) throw new Error("No default export from /App.tsx");
        createRoot(document.getElementById("root")).render(React.createElement(App));
        window.__mounted = true;
      } catch (err) {
        window.__errors.push("mount: " + (err && err.message ? err.message : String(err)));
        window.__mounted = false;
      }
    </script>
  </body>
</html>`;
}

let browserPromise: Promise<Browser> | null = null;

/** One browser per process; launching costs ~300ms. */
async function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    const { chromium } = await import("playwright");
    browserPromise = chromium.launch({ args: ["--no-sandbox"] });
  }
  return browserPromise;
}

export async function verifyProject(
  files: GeneratedFiles,
  dependencies: Record<string, string>,
  options: { screenshot?: boolean; timeoutMs?: number } = {},
): Promise<VerifyReport> {
  const started = Date.now();
  const findings: Finding[] = [];
  const stats = { renderedNodes: 0, textLength: 0, buttons: 0, liveButtons: 0, durationMs: 0 };

  // 1. Does it even compile?
  let bundled;
  try {
    bundled = await bundleProject(files);
    for (const w of bundled.warnings.slice(0, 3)) {
      findings.push({ severity: "warning", kind: "bundle-warning", detail: w });
    }
  } catch (err) {
    if (err instanceof BundleError) {
      for (const e of err.errors.slice(0, 5)) {
        findings.push({
          severity: "fatal",
          kind: "compile-error",
          detail: `${e.file}${e.line ? `:${e.line}` : ""} - ${e.text}`,
        });
      }
    } else {
      findings.push({
        severity: "fatal",
        kind: "compile-error",
        detail: err instanceof Error ? err.message : String(err),
      });
    }
    stats.durationMs = Date.now() - started;
    return { ok: false, findings, stats };
  }

  // 2. Does it run?
  let browser: Browser;
  try {
    browser = await getBrowser();
  } catch (err) {
    // No browser available (e.g. a host without Playwright): skip, do not fail.
    findings.push({
      severity: "warning",
      kind: "verification-unavailable",
      detail: `Headless check skipped: ${err instanceof Error ? err.message : err}`,
    });
    stats.durationMs = Date.now() - started;
    return { ok: true, findings, stats };
  }

  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const p = await ctx.newPage();
  const html = page(bundled.code, importMap(bundled.externalSpecifiers, dependencies));

  try {
    await p.route("http://generated.local/**", (route) =>
      route.fulfill({ status: 200, contentType: "text/html; charset=utf-8", body: html }),
    );
    await p.goto("http://generated.local/index.html", {
      waitUntil: "networkidle",
      timeout: options.timeoutMs ?? 30_000,
    });
    await p.waitForTimeout(1200);

    const state = await p.evaluate(() => {
      const root = document.getElementById("root");
      const doc = document.documentElement;
      return {
        mounted: (window as unknown as { __mounted?: boolean }).__mounted ?? false,
        errors: ((window as unknown as { __errors?: string[] }).__errors ?? []).slice(0, 5),
        nodes: root?.querySelectorAll("*").length ?? 0,
        text: (root as HTMLElement | null)?.innerText?.trim().length ?? 0,
        overflow: doc.scrollWidth - doc.clientWidth,
        buttons: document.querySelectorAll("button:not([disabled])").length,
        images: [...document.querySelectorAll("img")].filter((i) => !i.alt).length,
      };
    });

    stats.renderedNodes = state.nodes;
    stats.textLength = state.text;
    stats.buttons = state.buttons;

    for (const message of state.errors) {
      findings.push({ severity: "fatal", kind: "runtime-error", detail: message });
    }

    if (!state.mounted) {
      findings.push({
        severity: "fatal",
        kind: "did-not-mount",
        detail: "The app threw before rendering anything.",
      });
    } else if (state.nodes < 3 || state.text < 15) {
      findings.push({
        severity: "fatal",
        kind: "blank-render",
        detail: `Rendered almost nothing (${state.nodes} elements, ${state.text} characters of text).`,
      });
    }

    if (state.overflow > 4) {
      findings.push({
        severity: "error",
        kind: "horizontal-overflow",
        detail: `The page scrolls sideways at ${VIEWPORT.width}px by ${state.overflow}px.`,
      });
    }

    if (state.images > 0) {
      findings.push({
        severity: "warning",
        kind: "missing-alt",
        detail: `${state.images} image(s) have no alt text.`,
      });
    }

    // 3. Do the controls do anything?
    if (state.mounted && state.buttons > 0) {
      const snapshot = () =>
        p.evaluate(() => {
          const html = document.getElementById("root")?.innerHTML ?? "";
          let hash = 0;
          for (let i = 0; i < html.length; i++) hash = (hash * 31 + html.charCodeAt(i)) | 0;
          return hash;
        });

      // Fill inputs first so "Add" buttons are not unfairly judged.
      const inputs = p.locator('input[type="text"]:visible, input[type="email"]:visible, textarea:visible');
      const inputCount = Math.min(await inputs.count(), 6);
      for (let i = 0; i < inputCount; i++) {
        await inputs.nth(i).fill("Test value", { timeout: 1000 }).catch(() => {});
      }

      const buttons = p.locator("button:visible:not([disabled])");
      const count = Math.min(await buttons.count(), 10);
      let clicked = 0;
      for (let i = 0; i < count; i++) {
        const before = await snapshot();
        try {
          await buttons.nth(i).click({ timeout: 1200, noWaitAfter: true });
          clicked++;
          await p.waitForTimeout(280);
          if ((await snapshot()) !== before) stats.liveButtons++;
          await p.keyboard.press("Escape").catch(() => {});
        } catch {
          // Covered by an overlay from a previous click; not counted.
        }
      }

      if (clicked >= 3 && stats.liveButtons === 0) {
        findings.push({
          severity: "error",
          kind: "dead-controls",
          detail: `Clicked ${clicked} buttons and nothing changed. The UI is not wired to state.`,
        });
      }
    }

    // 4. Narrow viewport.
    await p.setViewportSize(MOBILE);
    await p.waitForTimeout(500);
    const mobileOverflow = await p.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (mobileOverflow > 4) {
      findings.push({
        severity: "error",
        kind: "mobile-overflow",
        detail: `The page scrolls sideways at ${MOBILE.width}px by ${mobileOverflow}px.`,
      });
    }

    if (options.screenshot && state.mounted) {
      await p.setViewportSize(VIEWPORT);
      await p.waitForTimeout(400);
      const shot = await p.screenshot({ type: "png" });
      stats.durationMs = Date.now() - started;
      return {
        ok: !findings.some((f) => f.severity === "fatal"),
        findings,
        screenshot: shot.toString("base64"),
        stats,
      };
    }
  } catch (err) {
    findings.push({
      severity: "warning",
      kind: "verification-failed",
      detail: err instanceof Error ? err.message.slice(0, 160) : String(err),
    });
  } finally {
    await ctx.close().catch(() => {});
  }

  stats.durationMs = Date.now() - started;
  return { ok: !findings.some((f) => f.severity === "fatal"), findings, stats };
}

/** Findings turned into an instruction the model can act on. */
export function repairPrompt(report: VerifyReport): string {
  const actionable = report.findings.filter((f) => f.severity !== "warning");
  return [
    "Your last version was run in a real browser and these problems were found:",
    "",
    ...actionable.map((f) => `- [${f.kind}] ${f.detail}`),
    "",
    "Fix every one of them. Return the COMPLETE updated files, in the same",
    "file-per-block format. Keep everything that already works: the design, the",
    "copy and the structure should survive the fix.",
  ].join("\n");
}
