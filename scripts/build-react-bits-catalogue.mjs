/**
 * Builds our internal React Bits catalogue from the OFFICIAL registry.
 *
 *   node scripts/build-react-bits-catalogue.mjs
 *
 * LICENSING (React Bits is MIT + Commons Clause):
 *   "distribute the Software as part of an application, website, or product"  -> allowed
 *   "do not sell, sublicense, or redistribute the components themselves,
 *    whether alone, in a bundle, or as a ported version"                      -> forbidden
 *
 * So this script writes METADATA ONLY - names, categories, dependencies, prop
 * signatures, tags. Component source is never committed to this repo; it is
 * fetched from https://reactbits.dev/r/<name>.json at generation time and lands
 * in the user's generated application, which is the permitted use.
 *
 * Source is cached under tmp/ (gitignored) purely to extract prop signatures.
 * Pro components are excluded for free: they are not in the open registry.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const REGISTRY_URL = "https://reactbits.dev/r/registry.json";
const ITEM_URL = (name) => `https://reactbits.dev/r/${name}.json`;
const CATEGORIES_URL =
  "https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/constants/Categories.js";

const CACHE = "tmp/rb/cache";
const OUT = "lib/react-bits/registry.json";
mkdirSync(CACHE, { recursive: true });
mkdirSync("lib/react-bits", { recursive: true });

async function getJson(url, cacheKey) {
  const file = `${CACHE}/${cacheKey}`;
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const json = await res.json();
  writeFileSync(file, JSON.stringify(json));
  return json;
}

async function getText(url, cacheKey) {
  const file = `${CACHE}/${cacheKey}`;
  if (existsSync(file)) return readFileSync(file, "utf8");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const text = await res.text();
  writeFileSync(file, text);
  return text;
}

/** Official sidebar taxonomy: component name -> category. */
function parseCategories(src) {
  const map = {};
  const blocks = [...src.matchAll(/name:\s*'([^']+)',\s*\n\s*subcategories:\s*\[([\s\S]*?)\]/g)];
  for (const [, category, body] of blocks) {
    if (category === "Get Started") continue;
    for (const [, item] of body.matchAll(/'([^']+)'/g)) {
      map[item.replace(/\s+/g, "")] = category;
    }
  }
  return map;
}

/** Pull the props type out of the TypeScript source. Facts about the API, not the implementation. */
function extractProps(source, componentName) {
  const patterns = [
    new RegExp(`(?:type|interface)\\s+${componentName}Props[^{]*\\{([\\s\\S]*?)\\n\\}`),
    /(?:type|interface)\s+\w*Props[^{]*\{([\s\S]*?)\n\}/,
  ];
  let body = null;
  for (const re of patterns) {
    const m = source.match(re);
    if (m) {
      body = m[1];
      break;
    }
  }
  if (!body) return {};

  const props = {};
  // One prop per line: `name?: type;` with an optional trailing comment.
  for (const line of body.split("\n")) {
    const m = line.match(/^\s*(\w+)(\?)?\s*:\s*([^;]+);?\s*(?:\/\/\s*(.*))?$/);
    if (!m) continue;
    const [, name, optional, type, comment] = m;
    props[name] = {
      type: type.trim().replace(/\s+/g, " ").slice(0, 140),
      required: !optional,
      ...(comment ? { note: comment.trim().slice(0, 120) } : {}),
    };
  }
  return props;
}

/** Heavier runtimes cost bundle size and frame budget; the agent needs to know. */
const DEP_WEIGHT = {
  three: "heavy",
  ogl: "heavy",
  "@react-three/fiber": "heavy",
  "@react-three/drei": "heavy",
  "@react-three/postprocessing": "heavy",
  postprocessing: "heavy",
  "face-api.js": "heavy",
  "matter-js": "heavy",
  vgpu: "heavy",
  gsap: "medium",
  "@gsap/react": "medium",
  lenis: "medium",
  motion: "light",
  "@use-gesture/react": "light",
  "gl-matrix": "light",
  maath: "light",
};

const THREE_D = new Set([
  "three",
  "ogl",
  "@react-three/fiber",
  "@react-three/drei",
  "@react-three/postprocessing",
  "postprocessing",
  "maath",
  "gl-matrix",
  "vgpu",
]);

function classify({ title, category, description, deps }) {
  const bare = deps.map((d) => d.split("@")[0] || d).filter(Boolean);
  const baseNames = bare.map((d) => (d.startsWith("@") ? d.split("/").slice(0, 2).join("/") : d));

  const weight = baseNames.some((d) => DEP_WEIGHT[d] === "heavy")
    ? "heavy"
    : baseNames.some((d) => DEP_WEIGHT[d] === "medium")
      ? "medium"
      : baseNames.length === 0
        ? "none"
        : "light";

  const is3d = baseNames.some((d) => THREE_D.has(d));
  const text = `${title} ${description}`.toLowerCase();

  const layer =
    category === "Backgrounds" || /background|backdrop|canvas behind/.test(text)
      ? "background"
      : "foreground";

  const interaction = /cursor|hover|drag|click|tilt|magnet|follow|pointer|swipe/.test(text)
    ? "pointer"
    : /scroll|reveal|viewport|parallax/.test(text)
      ? "scroll"
      : /type|typing|decrypt|shuffle|count/.test(text)
        ? "timed"
        : "none";

  const animation = /blur/.test(text)
    ? "blur"
    : /fade/.test(text)
      ? "fade"
      : /slide|translate/.test(text)
        ? "slide"
        : /scale|zoom/.test(text)
          ? "scale"
          : /rotate|spin|orbit|carousel/.test(text)
            ? "rotate"
            : /particle|shader|noise|wave|fluid|distort/.test(text)
              ? "generative"
              : "other";

  // Where this component plausibly belongs on a page.
  const sections = [];
  if (layer === "background") sections.push("hero", "section-backdrop");
  if (category === "Text Animations") sections.push("hero-heading", "section-heading");
  if (/card|bento|tilt|spotlight|stack/.test(text)) sections.push("features", "testimonials");
  if (/nav|menu|dock|sidebar|pill/.test(text)) sections.push("navigation");
  if (/count|number|stat/.test(text)) sections.push("stats");
  if (/carousel|gallery|masonry|marquee|loop/.test(text)) sections.push("showcase", "logos");
  if (/button|toggle|switch|input|form|select|slider/.test(text)) sections.push("cta", "forms");
  if (/list|accordion|chroma/.test(text)) sections.push("content");
  if (sections.length === 0) sections.push("general");

  const tags = new Set([
    category.toLowerCase().replace(/\s+/g, "-"),
    layer,
    is3d ? "3d" : "2d",
    weight === "none" ? "zero-deps" : weight,
    ...baseNames.map((d) => `dep:${d}`),
    ...sections,
  ]);
  if (animation !== "other") tags.add(`anim:${animation}`);
  if (interaction !== "none") tags.add(`interaction:${interaction}`);

  return {
    weight,
    dimension: is3d ? "3d" : "2d",
    layer,
    interaction,
    animation,
    sections: [...new Set(sections)],
    tags: [...tags],
  };
}

const [registry, categoriesSrc] = await Promise.all([
  getJson(REGISTRY_URL, "registry.json"),
  getText(CATEGORIES_URL, "Categories.js"),
]);

const categoryOf = parseCategories(categoriesSrc);

// Group the 720 registry entries into components x variants.
const grouped = new Map();
for (const item of registry.items) {
  const m = item.name.match(/^(.*)-(JS|TS)-(CSS|TW)$/);
  if (!m) continue;
  const [, base, lang, style] = m;
  if (!grouped.has(base)) {
    grouped.set(base, {
      name: base,
      title: item.title,
      description: item.description,
      variants: {},
      dependencies: new Set(),
      registryDependencies: new Set(),
    });
  }
  const entry = grouped.get(base);
  entry.variants[`${lang}-${style}`] = {
    registryName: item.name,
    url: ITEM_URL(item.name),
    files: (item.files ?? []).map((f) => f.path),
  };
  for (const d of item.dependencies ?? []) entry.dependencies.add(d);
  for (const d of item.registryDependencies ?? []) entry.registryDependencies.add(d);
}

console.log(`${grouped.size} components in the open registry`);

// Fetch TS-TW source once per component, only to read prop signatures.
const components = [];
let withProps = 0;
const all = [...grouped.values()];

for (let i = 0; i < all.length; i += 8) {
  const batch = all.slice(i, i + 8);
  await Promise.all(
    batch.map(async (c) => {
      const preferred = c.variants["TS-TW"] ?? c.variants["TS-CSS"];
      let props = {};
      let cssFiles = [];
      try {
        const item = await getJson(preferred.url, `${preferred.registryName}.json`);
        const tsFile = (item.files ?? []).find((f) => /\.tsx?$/.test(f.path));
        cssFiles = (item.files ?? []).filter((f) => /\.css$/.test(f.path)).map((f) => f.path);
        if (tsFile?.content) {
          props = extractProps(tsFile.content, c.name);
          if (Object.keys(props).length) withProps++;
        }
      } catch (err) {
        console.log(`  ${c.name}: ${err.message.slice(0, 60)}`);
      }

      const deps = [...c.dependencies];
      components.push({
        name: c.name,
        title: c.title,
        category: categoryOf[c.name] ?? "Uncategorised",
        description: c.description,
        ...classify({ title: c.title, category: categoryOf[c.name] ?? "", description: c.description, deps }),
        dependencies: deps,
        registryDependencies: [...c.registryDependencies],
        requiresCss: cssFiles.length > 0,
        variants: Object.fromEntries(
          Object.entries(c.variants).map(([k, v]) => [k, { registryName: v.registryName, files: v.files }]),
        ),
        props,
      });
    }),
  );
  process.stdout.write(`\r  metadata: ${Math.min(i + 8, all.length)}/${all.length}`);
}

components.sort((a, b) => a.name.localeCompare(b.name));

const catalogue = {
  $comment:
    "Generated metadata about React Bits components. Contains NO component source: " +
    "React Bits is MIT + Commons Clause, which forbids redistributing the components " +
    "themselves. Source is fetched from the official registry at generation time and " +
    "delivered inside the user's generated application, which the licence permits.",
  source: {
    project: "React Bits",
    author: "David Haz",
    homepage: "https://reactbits.dev",
    repository: "https://github.com/DavidHDev/react-bits",
    license: "MIT + Commons Clause",
    registry: REGISTRY_URL,
    itemUrlPattern: "https://reactbits.dev/r/{name}.json",
  },
  generatedAt: new Date().toISOString().slice(0, 10),
  componentCount: components.length,
  categories: [...new Set(components.map((c) => c.category))].sort(),
  variants: ["TS-TW", "TS-CSS", "JS-TW", "JS-CSS"],
  components,
};

writeFileSync(OUT, JSON.stringify(catalogue, null, 2));
console.log(`\n\nwrote ${OUT}`);
console.log(`  ${components.length} components, ${withProps} with extracted props`);
const byCat = {};
for (const c of components) byCat[c.category] = (byCat[c.category] ?? 0) + 1;
for (const [cat, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)} ${cat}`);
}
const byWeight = {};
for (const c of components) byWeight[c.weight] = (byWeight[c.weight] ?? 0) + 1;
console.log(`  weight: ${Object.entries(byWeight).map(([k, v]) => `${k}=${v}`).join(" ")}`);
