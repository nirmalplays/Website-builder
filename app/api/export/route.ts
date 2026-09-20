import { NextResponse } from "next/server";
import JSZip from "jszip";
import { SANDPACK_DEPENDENCIES } from "@/lib/config";

export const runtime = "nodejs";

/**
 * Download the generated component as a runnable Vite + React + Tailwind
 * project (FR-12). npm install && npm run dev and it works.
 */

function slug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "ui-generator-export"
  );
}

export async function POST(req: Request) {
  let body: { code?: string; title?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const code = body.code;
  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "No code to export." }, { status: 400 });
  }

  const name = slug(body.title ?? "ui-generator-export");
  const deps = Object.entries(SANDPACK_DEPENDENCIES)
    .map(([pkg, version]) => `    "${pkg}": "^${version}"`)
    .join(",\n");

  const zip = new JSZip();

  zip.file(
    "package.json",
    `{
  "name": "${name}",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
${deps}
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2",
    "vite": "^6.0.5"
  }
}
`,
  );

  zip.file(
    "vite.config.ts",
    `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({ plugins: [react()] });
`,
  );

  zip.file(
    "index.html",
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  );

  zip.file(
    "tailwind.config.js",
    `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
`,
  );

  zip.file(
    "postcss.config.js",
    `export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
`,
  );

  zip.file(
    "tsconfig.json",
    `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"]
}
`,
  );

  zip.file(
    "src/index.css",
    `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
  );

  zip.file(
    "src/main.tsx",
    `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,
  );

  zip.file("src/App.tsx", code);

  zip.file(
    "README.md",
    `# ${name}

Generated with UI Generator.

\`\`\`bash
npm install
npm run dev
\`\`\`

The component lives in \`src/App.tsx\`. Tailwind is configured and ready.
`,
  );

  zip.file(".gitignore", "node_modules\ndist\n.DS_Store\n");

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${name}.zip"`,
      "Content-Length": String(buffer.length),
    },
  });
}
