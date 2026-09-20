import * as Lucide from "lucide-react";

/**
 * The model sometimes uses an icon in JSX that it forgot to import, which renders
 * as a blank red preview. Every such name is a known lucide export, so we can fix
 * it deterministically instead of spending a round trip on the model.
 *
 * Throws if a missing name is not a lucide icon, so the caller can fall back to
 * the model repair retry.
 */
export class UnknownComponentError extends Error {
  constructor(public names: string[]) {
    super(`Undefined components: ${names.join(", ")}`);
    this.name = "UnknownComponentError";
  }
}

const REACT_BUILTINS = new Set(["Fragment", "Suspense", "StrictMode", "Profiler"]);

function declaredNames(code: string): Set<string> {
  const names = new Set<string>();
  for (const m of code.matchAll(/\b(?:function|class)\s+([A-Z]\w*)/g)) names.add(m[1]);
  for (const m of code.matchAll(/\b(?:const|let|var)\s+([A-Z]\w*)/g)) names.add(m[1]);
  return names;
}

function importedNames(code: string): Set<string> {
  const names = new Set<string>();
  for (const m of code.matchAll(/import\s*(?:type\s*)?\{([^}]+)\}\s*from/g)) {
    for (const raw of m[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/).pop()?.trim();
      if (name) names.add(name);
    }
  }
  for (const m of code.matchAll(/import\s+([A-Z]\w*)\s*(?:,|from)/g)) names.add(m[1]);
  for (const m of code.matchAll(/import\s*\*\s*as\s+(\w+)/g)) names.add(m[1]);
  return names;
}

function usedComponents(code: string): Set<string> {
  const names = new Set<string>();
  // <Icon ...> and <Icon/>, but not <div> or <Foo.Bar>
  for (const m of code.matchAll(/<([A-Z]\w*)[\s/>]/g)) names.add(m[1]);
  return names;
}

/**
 * lucide-react dropped its brand icons (Github, Twitter, Linkedin...), and models
 * still reach for them. Aliasing a real icon to the expected name keeps the JSX
 * untouched and the preview alive, rather than failing the whole generation.
 */
const ICON_FALLBACKS: Record<string, string> = {
  Github: "Code",
  Gitlab: "Code",
  Twitter: "MessageCircle",
  X: "X",
  Linkedin: "Briefcase",
  Facebook: "Users",
  Instagram: "Camera",
  Youtube: "Play",
  Dribbble: "Palette",
  Figma: "Palette",
  Slack: "MessageSquare",
  Discord: "MessageSquare",
  Tiktok: "Music",
  Whatsapp: "MessageCircle",
};

const GENERIC_FALLBACK = "Circle";

export function replaceUnknownIcons(code: string): string {
  const importLine = code.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["'];?/);
  if (!importLine) return code;

  let changed = false;
  const rewritten = importLine[1]
    .split(",")
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((spec) => {
      // Already aliased (`Star as Logo`): only the source name must exist.
      const [source, alias] = spec.split(/\s+as\s+/).map((x) => x.trim());
      if (source in Lucide) return spec;
      changed = true;
      const wanted = alias ?? source;
      const candidate = ICON_FALLBACKS[source] ?? GENERIC_FALLBACK;
      const replacement = candidate in Lucide ? candidate : GENERIC_FALLBACK;
      return `${replacement} as ${wanted}`;
    });

  if (!changed) return code;
  return code.replace(
    importLine[0],
    `import { ${rewritten.join(", ")} } from "lucide-react";`,
  );
}

export function repairImports(code: string): string {
  code = replaceUnknownIcons(code);
  const declared = declaredNames(code);
  const imported = importedNames(code);
  const missing = [...usedComponents(code)].filter(
    (n) => !declared.has(n) && !imported.has(n) && !REACT_BUILTINS.has(n),
  );
  if (missing.length === 0) return code;

  const icons = missing.filter((n) => n in Lucide);
  const unknown = missing.filter((n) => !(n in Lucide));
  if (unknown.length > 0) throw new UnknownComponentError(unknown);

  const existing = code.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["'];?/);
  if (existing) {
    const merged = [
      ...new Set([...existing[1].split(",").map((s) => s.trim()).filter(Boolean), ...icons]),
    ].sort();
    return code.replace(existing[0], `import { ${merged.join(", ")} } from "lucide-react";`);
  }

  const line = `import { ${[...icons].sort().join(", ")} } from "lucide-react";`;
  const lastImport = [...code.matchAll(/^import .*$/gm)].pop();
  if (!lastImport) return `${line}\n${code}`;
  const at = lastImport.index! + lastImport[0].length;
  return `${code.slice(0, at)}\n${line}${code.slice(at)}`;
}
