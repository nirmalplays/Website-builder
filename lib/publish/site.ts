import { bundleProject, importMap } from "@/lib/verify/bundle";
import { googleFontsUrl } from "@/lib/skills/typography";
import type { GeneratedFiles } from "@/lib/parseFiles";

/**
 * Turns a generated project into static files ready to deploy.
 *
 * Deploying the raw sources and letting Vercel build them would mean shipping
 * a package.json, choosing a framework preset, and waiting on an install that
 * can fail for reasons the user never sees. The project is already bundled for
 * verification on every build, so reusing that produces a page and a script:
 * nothing to install, nothing to configure, and the same code path whose
 * output was checked before publishing.
 *
 * npm packages stay external and resolve from the CDN through an import map,
 * exactly as in the preview - so what gets published behaves like what was on
 * screen rather than like a second, differently-built copy.
 */
export type StaticSite = { "index.html": string; "app.js": string };

export async function buildStaticSite(
  files: GeneratedFiles,
  dependencies: Record<string, string>,
  title: string,
): Promise<StaticSite> {
  const bundled = await bundleProject(files);
  const map = importMap(bundled.externalSpecifiers, dependencies);

  // Escaped so a title containing a quote or a bracket cannot break out of the
  // tag and into the markup.
  const safeTitle =
    title.trim().replace(/[<>&"]/g, (c) => `&#${c.charCodeAt(0)};`).slice(0, 120) || "Built with ui/gen";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="${googleFontsUrl()}" />
    <script type="importmap">${map}</script>
    <style>body{margin:0}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import React from "react";
      import { createRoot } from "react-dom/client";
      import App from "./app.js";
      createRoot(document.getElementById("root")).render(React.createElement(App));
    </script>
  </body>
</html>`;

  return { "index.html": html, "app.js": bundled.code };
}
