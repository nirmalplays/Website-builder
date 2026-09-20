/**
 * Renders every baked template in a headless browser and saves a real screenshot
 * as its card thumbnail, the way a template gallery is supposed to look.
 *
 *   node scripts/thumbnails.mjs             # only templates missing a thumbnail
 *   node scripts/thumbnails.mjs saas-site   # just these ids
 *   FORCE=1 node scripts/thumbnails.mjs     # redo everything
 *
 * No bundler: imports are stripped and rebound to globals, then Babel transforms
 * the JSX/TS in the page. Tailwind comes from the play CDN, icons from lucide's
 * UMD build with a neutral fallback when a name is missing.
 */
import { chromium } from "playwright";
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import ts from "typescript";

const SRC = "templates";
const OUT = "public/thumbs";
const WIDTH = 1280;
const HEIGHT = 800;

mkdirSync(OUT, { recursive: true });

const only = process.argv.slice(2);
const force = process.env.FORCE === "1";

const ids = readdirSync(SRC)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .filter((id) => (only.length ? only.includes(id) : force || !existsSync(`${OUT}/${id}.png`)));

if (ids.length === 0) {
  console.log("nothing to render");
  process.exit(0);
}

/** Turn a module into a script the browser can run with Babel alone. */
function toBrowserSource(code) {
  const lucideNames = new Set();
  const reactNames = new Set();

  for (const m of code.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["'];?/g)) {
    for (const spec of m[1].split(",")) {
      const name = spec.trim().split(/\s+as\s+/).pop()?.trim();
      if (name) lucideNames.add(name);
    }
  }
  for (const m of code.matchAll(/import\s+(?:React,?\s*)?\{([^}]+)\}\s*from\s*["']react["'];?/g)) {
    for (const spec of m[1].split(",")) {
      const name = spec.trim().split(/\s+as\s+/).pop()?.trim();
      if (name) reactNames.add(name);
    }
  }

  let body = code
    .replace(/^\s*import[^;]+;?\s*$/gm, "")
    .replace(/export\s+default\s+function\s+App/, "function App")
    .replace(/export\s+default\s+App\s*;?/, "")
    .replace(/^\s*export\s+/gm, "");

  const hooks = [
    "useState",
    "useEffect",
    "useRef",
    "useMemo",
    "useCallback",
    "useReducer",
    "Fragment",
    ...reactNames,
  ];

  const preamble = [
    `const { ${[...new Set(hooks)].join(", ")} } = React;`,
    ...[...lucideNames].map((n) => `const ${n} = makeIcon(${JSON.stringify(n)});`),
  ].join("\n");

  const source = `${preamble}\n${body}\nReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));`;

  // Transpile in Node rather than in the browser. babel-standalone mis-parsed
  // TSX type arguments like useState<Card[]>() and reported it only as an
  // opaque "Script error"; tsc gives a real message. The .tsx filename is what
  // makes TypeScript parse JSX and strip type annotations.
  const out = ts.transpileModule(source, {
    fileName: "template.tsx",
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.None,
      removeComments: true,
    },
    reportDiagnostics: true,
  });

  const fatal = (out.diagnostics ?? []).filter((d) => d.category === ts.DiagnosticCategory.Error);
  if (fatal.length) {
    throw new Error(
      `transpile: ${ts.flattenDiagnosticMessageText(fatal[0].messageText, " ").slice(0, 120)}`,
    );
  }
  // A literal </script> inside a string would close the tag early.
  return out.outputText.replace(/<\/script>/gi, "<\\/script>");
}

function pageHtml(source) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { margin: 0; }
      /* Never let a template animate mid-capture. */
      *, *::before, *::after { animation: none !important; transition: none !important; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener("error", function (e) {
        window.__lastError = (e.error && e.error.message) || e.message;
      });
      // Real lucide glyph when available, neutral square when not.
      function makeIcon(name) {
        return function Icon(props) {
          var cls = (props && props.className) || "";
          var size = (props && props.size) || 24;
          var data = window.lucide && window.lucide.icons && window.lucide.icons[name];
          var children = [];
          if (data) {
            var nodes = Array.isArray(data) ? data : data.length ? data : [];
            nodes.forEach(function (node, i) {
              if (!Array.isArray(node)) return;
              children.push(React.createElement(node[0], Object.assign({ key: i }, node[1])));
            });
          }
          if (!children.length) {
            children = [React.createElement("rect", { key: "r", x: 4, y: 4, width: 16, height: 16, rx: 3 })];
          }
          return React.createElement(
            "svg",
            {
              className: cls,
              width: size, height: size, viewBox: "0 0 24 24",
              fill: "none", stroke: "currentColor", strokeWidth: 2,
              strokeLinecap: "round", strokeLinejoin: "round",
            },
            children
          );
        };
      }
    </script>
    <script>
${source}
    </script>
  </body>
</html>`;
}

const browser = await chromium.launch();

let ok = 0;
const failed = [];

for (const id of ids) {
  const code = readFileSync(`${SRC}/${id}.tsx`, "utf8");
  if (process.env.DUMP) writeFileSync(`tmp/src-${id}.js`, toBrowserSource(code));
  // A fresh page per template: a failed render must not leak globals into the next.
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    // Desktop layout, captured at half scale: cards render ~370px wide, so
    // 640x400 is still retina-sharp at a quarter of the bytes.
    deviceScaleFactor: 0.5,
  });
  try {
    const errors = [];
    const onError = (e) => errors.push(e.message.slice(0, 120));
    page.on("pageerror", onError);

    await page.setContent(pageHtml(toBrowserSource(code)), { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.getElementById("root")?.children.length > 0, {
      timeout: 15000,
    });
    // Let images and web fonts settle before capturing.
    await page.waitForTimeout(1800);

    const rendered = await page.evaluate(
      () => document.getElementById("root")?.innerText?.trim().length ?? 0,
    );
    if (rendered < 40) throw new Error(`rendered almost nothing (${rendered} chars)`);

    await page.screenshot({ path: `${OUT}/${id}.png`, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    ok++;
    console.log(`  ${id.padEnd(22)} captured${errors.length ? `  (warnings: ${errors[0]})` : ""}`);
  } catch (err) {
    failed.push({ id, error: err.message.slice(0, 100) });
    const detail = await page
      .evaluate(() => window.__lastError ?? null)
      .catch(() => null);
    console.log(
      `  ${id.padEnd(22)} FAILED  ${err.message.slice(0, 70)}${detail ? `
      page error: ${detail.slice(0, 160)}` : ""}`,
    );
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\n${ok}/${ids.length} thumbnails -> ${OUT}`);
if (failed.length) console.log(`failed: ${failed.map((f) => f.id).join(", ")}`);
