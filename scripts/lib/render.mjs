/**
 * Shared harness: turns a generated single-file component into a standalone page
 * a headless browser can run, with no bundler.
 *
 * Used by scripts/thumbnails.mjs (screenshots) and scripts/test-interactivity.mjs
 * (does the thing actually respond to clicks).
 */
import ts from "typescript";

/** Strip imports, rebind them to globals, then transpile TSX in Node. */
export function toBrowserSource(code) {
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

  const body = code
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

  // Transpile here rather than in the browser: babel-standalone mis-parses TSX
  // type arguments like useState<Card[]>() and reports only "Script error".
  // The .tsx filename is what makes TypeScript parse JSX and strip types.
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

export function pageHtml(source, { freezeAnimation = true } = {}) {
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
      ${freezeAnimation ? "*, *::before, *::after { animation: none !important; transition: none !important; }" : ""}
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
