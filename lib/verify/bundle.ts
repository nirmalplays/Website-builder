import * as esbuild from "esbuild";
import type { GeneratedFiles } from "@/lib/parseFiles";

/**
 * Bundles a generated project in memory so it can be run headlessly.
 *
 * The files only exist as strings, so esbuild resolves them through a virtual
 * filesystem plugin. npm packages are left external and resolved in the browser
 * by an import map pointing at a CDN - bundling three.js here would cost seconds
 * per check for no benefit.
 */

const CDN = "https://esm.sh";

export type BundleResult = {
  code: string;
  /** Package roots, for matching against the project's dependency list. */
  externals: string[];
  /** Every bare specifier as written, subpaths included - what the import map needs. */
  externalSpecifiers: string[];
  warnings: string[];
};

export class BundleError extends Error {
  constructor(
    message: string,
    public readonly errors: { file: string; line: number; text: string }[],
  ) {
    super(message);
    this.name = "BundleError";
  }
}

function resolveVirtual(spec: string, importer: string, files: GeneratedFiles): string | null {
  const dir = importer.slice(0, importer.lastIndexOf("/")) || "/";

  /*
   * Collapse "." and ".." the way a real bundler does. This used only to strip
   * a leading "./", so "../data" from /components/Foo.tsx became the literal
   * "/components/../data" and matched nothing - reporting a fatal compile
   * error for a file that was right there. A component importing a
   * parent-level module is completely ordinary, so this failed a lot of
   * perfectly good builds, and the repair rounds then burned themselves out
   * "fixing" code that was never broken. lib/parseFiles.ts already resolved
   * this correctly; the two disagreeing is what hid the bug.
   */
  const base = (() => {
    const parts: string[] = [];
    for (const segment of (spec.startsWith("/") ? spec : `${dir}/${spec}`).split("/")) {
      if (segment === "" || segment === ".") continue;
      if (segment === "..") parts.pop();
      else parts.push(segment);
    }
    return `/${parts.join("/")}`;
  })();

  const candidates = [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    `${base}.jsx`,
    `${base}.js`,
    `${base}/index.tsx`,
    `${base}/index.ts`,
  ];
  return candidates.find((c) => c in files) ?? null;
}

export async function bundleProject(files: GeneratedFiles): Promise<BundleResult> {
  const externals = new Set<string>();
  const externalSpecifiers = new Set<string>();

  const virtualFs: esbuild.Plugin = {
    name: "virtual-fs",
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (args.kind === "entry-point") return { path: args.path, namespace: "vfs" };

        // Relative or absolute: must be a file the model wrote.
        if (args.path.startsWith(".") || args.path.startsWith("/")) {
          const resolved = resolveVirtual(args.path, args.importer, files);
          if (!resolved) {
            return {
              errors: [{ text: `Cannot find file "${args.path}" imported from ${args.importer}` }],
            };
          }
          return { path: resolved, namespace: "vfs" };
        }

        // Bare specifier: an npm package, resolved in the browser.
        const pkg = args.path.startsWith("@")
          ? args.path.split("/").slice(0, 2).join("/")
          : args.path.split("/")[0];
        externals.add(pkg);
        externalSpecifiers.add(args.path);
        return { path: args.path, external: true };
      });

      build.onLoad({ filter: /.*/, namespace: "vfs" }, (args) => {
        const contents = files[args.path];
        if (contents === undefined) return { errors: [{ text: `Missing ${args.path}` }] };
        const ext = args.path.split(".").pop() ?? "tsx";
        const loader: esbuild.Loader =
          ext === "css" ? "css" : ext === "json" ? "json" : ext === "js" ? "jsx" : (ext as esbuild.Loader);
        return { contents, loader };
      });
    },
  };

  try {
    const result = await esbuild.build({
      entryPoints: ["/App.tsx"],
      bundle: true,
      write: false,
      format: "esm",
      target: "es2020",
      jsx: "automatic",
      // React comes from the import map too, so the bundle stays tiny.
      jsxImportSource: "react",
      plugins: [virtualFs],
      logLevel: "silent",
    });

    return {
      code: result.outputFiles?.[0]?.text ?? "",
      externals: [...externals],
      externalSpecifiers: [...externalSpecifiers],
      warnings: result.warnings.map((w) => w.text),
    };
  } catch (err) {
    const build = err as esbuild.BuildFailure;
    const errors = (build.errors ?? []).map((e) => ({
      file: e.location?.file ?? "unknown",
      line: e.location?.line ?? 0,
      text: e.text,
    }));
    throw new BundleError(
      errors[0]?.text ?? (err instanceof Error ? err.message : "bundle failed"),
      errors,
    );
  }
}

/** Import map so the browser can fetch the packages we left external. */
export function importMap(specifiers: string[], dependencies: Record<string, string>): string {
  const imports: Record<string, string> = {
    react: `${CDN}/react@18.3.1`,
    "react/jsx-runtime": `${CDN}/react@18.3.1/jsx-runtime`,
    "react-dom": `${CDN}/react-dom@18.3.1`,
    "react-dom/client": `${CDN}/react-dom@18.3.1/client`,
  };

  /*
   * Map every specifier exactly as it was written, subpaths included.
   *
   * Mapping only the package root was not enough: a React Bits component
   * imports "motion/react", the map held only "motion", and the browser
   * refuses an unmapped bare specifier - so the app threw on mount and the
   * preview went blank while esbuild reported a clean compile, because to the
   * bundler it was simply an external.
   *
   * A trailing-slash prefix mapping would cover subpaths in one entry but
   * cannot carry a query string, which forces esm.sh's "*" form and
   * externalises every transitive dependency - swapping the missing subpath
   * for a missing "framer-motion". Listing the specifiers esbuild actually saw
   * keeps ?external=react,react-dom on each, so React stays a single copy and
   * nothing else has to be resolvable.
   */
  for (const spec of specifiers) {
    if (imports[spec]) continue;
    const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
    const subpath = spec.slice(pkg.length);
    const version = dependencies[pkg];
    // Pin when we know the version; let the CDN pick otherwise.
    const pinned = version ? `${pkg}@${version.replace(/^[\^~]/, "")}` : pkg;
    imports[spec] = `${CDN}/${pinned}${subpath}?external=react,react-dom`;
  }

  return JSON.stringify({ imports }, null, 2);
}
