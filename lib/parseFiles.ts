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

export function parseFiles(raw: string, requireMain = true): GeneratedFiles {
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

  if (requireMain) {
    const entry = files["/App.tsx"] ?? files["/app.tsx"];
    if (!entry) {
      throw new NoFilesError("No /App.tsx in the returned files");
    }
    if (!entry.includes("export default")) {
      throw new NoFilesError("/App.tsx has no default export");
    }
  }

  return files;
}

/** Imports of project files, so we can tell when the model references a file it never wrote. */
/** Collapse "." and ".." the way a bundler would. */
function resolveRelative(from: string, spec: string): string {
  if (spec.startsWith("/")) return spec;
  const dir = from.slice(0, from.lastIndexOf("/")) || "";
  const parts: string[] = [];
  for (const segment of `${dir}/${spec}`.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") parts.pop();
    else parts.push(segment);
  }
  return `/${parts.join("/")}`;
}

/** An import of a project file that was never written, and who imported it. */
export type MissingImport = { from: string; spec: string; resolved: string };

/**
 * Richer than missingLocalImports: keeps the importing file and the path the
 * bundler would look for, so a repair can say "write /data.ts, /App.tsx wants
 * it" rather than just naming a dangling specifier.
 */
export function missingLocalImportDetails(files: GeneratedFiles): MissingImport[] {
  const missing: MissingImport[] = [];
  const seen = new Set<string>();
  const have = new Set(Object.keys(files));

  for (const [from, content] of Object.entries(files)) {
    for (const m of content.matchAll(/from\s+["'](\.[^"']+|\/[^"']+)["']/g)) {
      const spec = m[1];
      const resolved = resolveRelative(from, spec);

      const candidates = [
        resolved,
        `${resolved}.tsx`,
        `${resolved}.ts`,
        `${resolved}.jsx`,
        `${resolved}.js`,
        `${resolved}/index.tsx`,
        `${resolved}/index.ts`,
      ];
      if (candidates.some((c) => have.has(c))) continue;

      const key = `${from}>${spec}`;
      if (seen.has(key)) continue;
      seen.add(key);
      missing.push({ from, spec, resolved });
    }
  }

  return missing;
}

export function missingLocalImports(files: GeneratedFiles): string[] {
  return [...new Set(missingLocalImportDetails(files).map((m) => m.spec))];
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

/**
 * Writes a stub for any module still imported but never produced, as the last
 * step before the build ships.
 *
 * A dangling import is a compile error, and a compile error is a blank preview
 * - the whole app is lost over one file the model forgot. A stub that exports
 * the right names costs those sections their content and saves everything
 * else, which is the better trade when the alternative is a white screen. The
 * prompt and the repair round both try to make this unnecessary; this only
 * runs when they have already failed, and it tells the caller what it faked so
 * the user is not told the build is fine.
 */
export function stubMissingModules(files: GeneratedFiles): {
  files: GeneratedFiles;
  stubbed: string[];
} {
  const missing = missingLocalImportDetails(files);
  if (missing.length === 0) return { files, stubbed: [] };

  const out = { ...files };
  const stubbed: string[] = [];

  // One module can be imported from several files, each wanting different names.
  const byTarget = new Map<string, { types: Set<string>; values: Set<string> }>();

  for (const [from, content] of Object.entries(files)) {
    for (const m of content.matchAll(/import\s+(type\s+)?\{([^}]*)\}\s*from\s*["'](\.[^"']+|\/[^"']+)["']/g)) {
      const target = resolveRelative(from, m[3]);
      if (!missing.some((x) => x.resolved === target)) continue;

      const entry = byTarget.get(target) ?? { types: new Set(), values: new Set() };
      const allType = Boolean(m[1]);
      for (const raw of m[2].split(",")) {
        const name = raw.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop()?.trim();
        if (!name) continue;
        (allType || /^type\s/.test(raw.trim()) ? entry.types : entry.values).add(name);
      }
      byTarget.set(target, entry);
    }
  }

  for (const [target, { types, values }] of byTarget) {
    const lines = [
      "// Written automatically: the build imported this module but never wrote it.",
      "// The names are real so the app compiles; the contents are not.",
      "",
      ...[...types].map((t) => `export type ${t} = Record<string, unknown>;`),
      // `unknown[]` would fail every use site, so these are deliberately loose.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...[...values].map((v) => `export const ${v}: any = [];`),
    ];
    out[`${target}.ts`] = lines.join("\n");
    stubbed.push(`${target}.ts`);
  }

  return { files: out, stubbed };
}
