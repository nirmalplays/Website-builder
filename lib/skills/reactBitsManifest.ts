import registry from "@/lib/react-bits/registry.json";
import type { Catalogue, CatalogueComponent } from "@/lib/react-bits/types";

/**
 * The React Bits catalogue, rendered as a manifest the model can read.
 *
 * Derived from registry.json at module load rather than checked in as prose,
 * so it cannot drift from the catalogue the installer actually fetches from.
 * Naming a component that is not really there is worse than naming none: the
 * build imports it, the import dangles, and the preview is blank.
 *
 * Deliberately compact. The planner already hands the build step full prop
 * detail for the handful of components it selected (see planToPrompt); this
 * exists so the model knows what the shelf holds and what each thing is FOR,
 * which is the judgement the selection depends on. Dumping 205 full prop
 * tables would cost thousands of tokens to say something the model only needs
 * in summary.
 */

const catalogue = registry as unknown as Catalogue;

/** Roles map to where a thing goes on a page, which is how a designer picks. */
const ROLES: { title: string; blurb: string; match: (c: CatalogueComponent) => boolean }[] = [
  {
    title: "AMBIENT BACKDROPS",
    blurb: "Full-bleed canvases. Put one behind a hero or a section, never two on one page.",
    match: (c) => c.layer === "background",
  },
  {
    title: "KINETIC TEXT",
    blurb: "Headline treatments. One per page, on the single line that matters most.",
    match: (c) => c.category === "Text Animations",
  },
  {
    title: "INTERACTIVE SURFACES",
    blurb: "Cards and panels that respond to a pointer. Use for feature clusters and pricing.",
    match: (c) =>
      c.layer === "foreground" &&
      c.interaction === "pointer" &&
      c.category !== "Text Animations",
  },
  {
    title: "MOTION AND REVEAL",
    blurb: "Scroll and timed entrances. Use sparingly; a page that animates everywhere reads as a demo.",
    match: (c) =>
      c.layer === "foreground" &&
      (c.interaction === "scroll" || c.interaction === "timed") &&
      c.category !== "Text Animations",
  },
  {
    title: "STATIC COMPONENTS AND MICRO-DETAIL",
    blurb: "Structural pieces and small flourishes. The cheapest way to stop a layout reading as default.",
    match: (c) => c.layer === "foreground" && c.interaction === "none",
  },
];

/** The props worth naming inline: required ones first, then the most telling. */
function keyProps(c: CatalogueComponent, limit: number): string {
  const entries = Object.entries(c.props);
  if (entries.length === 0) return "";
  const required = entries.filter(([, s]) => s.required);
  const optional = entries.filter(([, s]) => !s.required);
  return [...required, ...optional]
    .slice(0, limit)
    .map(([k, s]) => `${k}${s.required ? "" : "?"}`)
    .join(", ");
}

function line(c: CatalogueComponent): string {
  const props = keyProps(c, 5);
  // "heavy" means npm dependencies the preview has to fetch from a CDN, which
  // is a real cost on a page that already has a 3D backdrop - say so.
  const cost = c.weight === "heavy" ? " [heavy]" : c.weight === "none" ? " [no deps]" : "";
  return `  ${c.name}${cost} - ${c.description}${props ? ` (${props})` : ""}`;
}

function buildManifest(): string {
  const seen = new Set<string>();
  const blocks: string[] = [];

  for (const role of ROLES) {
    const members = catalogue.components
      .filter((c) => !seen.has(c.name) && role.match(c))
      .sort((a, b) => a.name.localeCompare(b.name));
    if (members.length === 0) continue;
    for (const m of members) seen.add(m.name);
    blocks.push([`${role.title} (${members.length})`, `  ${role.blurb}`, ...members.map(line)].join("\n"));
  }

  return blocks.join("\n\n");
}

/** Built once per process; the catalogue is a static import and never changes. */
export const REACT_BITS_MANIFEST = buildManifest();

export const REACT_BITS_COMPONENT_COUNT = catalogue.components.length;
