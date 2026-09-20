/**
 * Parses a multi-file generation.
 *
 * The model emits one fenced block per file, tagged with its path:
 *
 *   ```tsx file=/App.tsx
 *   ...
 *   ```
 *
 * Anything outside the blocks (commentary, plan recaps) is discarded.
 */

export class NoFilesError extends Error {
  constructor(message = "No files returned") {
    super(message);
    this.name = "NoFilesError";
  }
}

export type GeneratedFiles = Record<string, string>;

const FENCE =
  /```(?:tsx|jsx|ts|js|css|json|html)?\s+file=["']?([^\s"'`\n]+)["']?\s*\n([\s\S]*?)```/g;

function normalisePath(raw: string): string {
  let path = raw.trim().replace(/^\.\//, "/");
  if (!path.startsWith("/")) path = `/${path}`;
  // Keep everything inside the sandbox root.
  return path.replace(/\/{2,}/g, "/").replace(/\/\.\./g, "");
}

export function parseFiles(raw: string): GeneratedFiles {
  const files: GeneratedFiles = {};

  for (const match of raw.matchAll(FENCE)) {
    const path = normalisePath(match[1]);
    const content = match[2].replace(/\s+$/, "");
    if (content.trim().length === 0) continue;
    files[path] = content;
  }

  if (Object.keys(files).length === 0) {
    // Fall back to the old single-block shape so one-file replies still work.
    const single = raw.match(/```(?:tsx|jsx|ts|js)?\s*\n([\s\S]*?)```/);
    const code = (single ? single[1] : raw).trim();
    if (code.includes("export default")) {
      files["/App.tsx"] = code.replace(/^(?:tsx|jsx|ts|js)\s*\n/i, "");
    }
  }

  if (Object.keys(files).length === 0) throw new NoFilesError();

  const entry = files["/App.tsx"] ?? files["/app.tsx"];
  if (!entry) {
    throw new NoFilesError("No /App.tsx in the returned files");
  }
  if (!entry.includes("export default")) {
    throw new NoFilesError("/App.tsx has no default export");
  }

  return files;
}

/** Imports of project files, so we can tell when the model references a file it never wrote. */
export function missingLocalImports(files: GeneratedFiles): string[] {
  const missing = new Set<string>();
  const have = new Set(Object.keys(files));

  for (const [from, content] of Object.entries(files)) {
    const dir = from.slice(0, from.lastIndexOf("/")) || "/";
    for (const m of content.matchAll(/from\s+["'](\.[^"']+|\/[^"']+)["']/g)) {
      const spec = m[1];
      const resolved = spec.startsWith("/")
        ? spec
        : `${dir}/${spec.replace(/^\.\//, "")}`.replace(/\/{2,}/g, "/");

      const candidates = [
        resolved,
        `${resolved}.tsx`,
        `${resolved}.ts`,
        `${resolved}.jsx`,
        `${resolved}.js`,
        `${resolved}/index.tsx`,
        `${resolved}/index.ts`,
      ];
      if (!candidates.some((c) => have.has(c))) missing.add(spec);
    }
  }

  return [...missing];
}

/** Bare npm specifiers imported anywhere in the project. */
export function externalImports(files: GeneratedFiles): string[] {
  const packages = new Set<string>();
  for (const content of Object.values(files)) {
    for (const m of content.matchAll(/from\s+["']([^."'/][^"']*)["']/g)) {
      const spec = m[1];
      const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
      packages.add(pkg);
    }
  }
  return [...packages];
}

export function totalSize(files: GeneratedFiles): number {
  return Object.values(files).reduce((n, c) => n + c.length, 0);
}
