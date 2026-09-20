import { getComponent, packageName, resolveVariant } from "./search";
import type { CatalogueComponent, Variant } from "./types";

/**
 * Fetches real React Bits source from the official registry.
 *
 * Never approximates a component: if the source cannot be fetched, the caller is
 * told so and should build the UI without it rather than shipping a lookalike.
 *
 * LICENCE (MIT + Commons Clause): source is fetched at generation time and
 * written into the user's generated application, which the licence permits
 * ("as part of an application, website, or product"). We do not vendor these
 * files into this repository or serve them as a component library of our own.
 * The attribution notice below travels with the code, as the licence requires.
 */

const ITEM_URL = (registryName: string) => `https://reactbits.dev/r/${registryName}.json`;

export const ATTRIBUTION = [
  "/*",
  " * Component from React Bits - https://reactbits.dev",
  " * Copyright (c) 2026 David Haz. MIT + Commons Clause.",
  " * Included as part of this application, per the React Bits licence.",
  " */",
].join("\n");

export type InstalledFile = {
  path: string;
  content: string;
  type: string;
};

export type InstalledComponent = {
  name: string;
  variant: Variant;
  registryName: string;
  files: InstalledFile[];
  /** Exact npm specs, e.g. "motion@^12.23.12". */
  dependencies: string[];
  requiresCss: boolean;
};

export type InstallResult = {
  components: InstalledComponent[];
  /** Deduplicated union across every installed component. */
  dependencies: Record<string, string>;
  failed: { name: string; error: string }[];
};

type RegistryItem = {
  name: string;
  files?: { path: string; content?: string; type?: string }[];
  dependencies?: string[];
};

/** Process-level cache: the same component is requested constantly. */
const cache = new Map<string, RegistryItem>();

async function fetchItem(registryName: string): Promise<RegistryItem> {
  const cached = cache.get(registryName);
  if (cached) return cached;

  const res = await fetch(ITEM_URL(registryName), {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15_000),
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) throw new Error(`registry returned ${res.status} for ${registryName}`);

  const item = (await res.json()) as RegistryItem;
  if (!item.files?.length) throw new Error(`no files in registry item ${registryName}`);
  cache.set(registryName, item);
  return item;
}

/** "motion@^12.23.12" -> ["motion", "^12.23.12"] */
function splitSpec(spec: string): [string, string] {
  const name = packageName(spec);
  const version = spec.slice(name.length + 1);
  return [name, version || "latest"];
}

/** Where the component lands inside the generated project. */
function targetPath(file: { path: string }, component: string): string {
  const base = file.path.split("/").pop() ?? `${component}.tsx`;
  return `/components/${base}`;
}

export async function installComponents(
  names: string[],
  options: { variant?: Variant } = {},
): Promise<InstallResult> {
  const preferred = options.variant ?? "TS-TW";
  const components: InstalledComponent[] = [];
  const failed: { name: string; error: string }[] = [];
  const dependencies: Record<string, string> = {};

  await Promise.all(
    [...new Set(names)].map(async (name) => {
      const meta: CatalogueComponent | undefined = getComponent(name);
      if (!meta) {
        failed.push({ name, error: "not in the React Bits catalogue" });
        return;
      }

      try {
        const { variant, registryName } = resolveVariant(meta, preferred);
        const item = await fetchItem(registryName);

        const files: InstalledFile[] = (item.files ?? [])
          .filter((f) => typeof f.content === "string")
          .map((f) => ({
            path: targetPath(f, meta.name),
            // Attribution rides with the source, as the licence requires.
            content: /\.(t|j)sx?$/.test(f.path) ? `${ATTRIBUTION}\n${f.content}` : f.content!,
            type: f.type ?? "registry:component",
          }));

        if (files.length === 0) throw new Error("registry item contained no source");

        for (const spec of item.dependencies ?? meta.dependencies) {
          const [pkg, version] = splitSpec(spec);
          dependencies[pkg] = version;
        }

        components.push({
          name: meta.name,
          variant,
          registryName,
          files,
          dependencies: item.dependencies ?? meta.dependencies,
          requiresCss: files.some((f) => f.path.endsWith(".css")),
        });
      } catch (err) {
        failed.push({ name, error: err instanceof Error ? err.message : String(err) });
      }
    }),
  );

  // Stable order so the same selection produces the same project.
  components.sort((a, b) => a.name.localeCompare(b.name));
  return { components, dependencies, failed };
}

/** Dependency union for a selection, without fetching any source. */
export function dependenciesFor(names: string[]): Record<string, string> {
  const deps: Record<string, string> = {};
  for (const name of names) {
    const meta = getComponent(name);
    for (const spec of meta?.dependencies ?? []) {
      const [pkg, version] = splitSpec(spec);
      deps[pkg] = version;
    }
  }
  return deps;
}
