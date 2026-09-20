/**
 * React Bits catalogue types.
 *
 * The catalogue holds metadata only. Component source lives with React Bits and
 * is fetched at generation time - see lib/react-bits/install.ts and the licence
 * note in scripts/build-react-bits-catalogue.mjs.
 */

export type Variant = "TS-TW" | "TS-CSS" | "JS-TW" | "JS-CSS";

export type Weight = "none" | "light" | "medium" | "heavy";

export type PropSpec = {
  type: string;
  required: boolean;
  note?: string;
};

export type CatalogueComponent = {
  name: string;
  title: string;
  category: string;
  description: string;
  /** Runtime cost, derived from dependencies. "none" means no npm packages at all. */
  weight: Weight;
  dimension: "2d" | "3d";
  layer: "background" | "foreground";
  interaction: "pointer" | "scroll" | "timed" | "none";
  animation: string;
  /** Page regions this component plausibly belongs to. */
  sections: string[];
  tags: string[];
  /** Exact npm specs, e.g. "motion@^12.23.12". */
  dependencies: string[];
  registryDependencies: string[];
  requiresCss: boolean;
  variants: Record<string, { registryName: string; files: string[] }>;
  props: Record<string, PropSpec>;
};

export type Catalogue = {
  source: {
    project: string;
    author: string;
    homepage: string;
    repository: string;
    license: string;
    registry: string;
    itemUrlPattern: string;
  };
  generatedAt: string;
  componentCount: number;
  categories: string[];
  variants: Variant[];
  components: CatalogueComponent[];
};

export type SearchQuery = {
  /** Free text matched against name, description, tags and sections. */
  q?: string;
  category?: string;
  section?: string;
  layer?: "background" | "foreground";
  dimension?: "2d" | "3d";
  /** Exclude anything heavier than this. */
  maxWeight?: Weight;
  /** Only components whose dependencies are a subset of this list. */
  allowedDependencies?: string[];
  /** Exclude components needing any of these packages. */
  excludeDependencies?: string[];
  requiresDependency?: string;
  interaction?: CatalogueComponent["interaction"];
  variant?: Variant;
  limit?: number;
};

export type SearchHit = {
  component: CatalogueComponent;
  score: number;
  matched: string[];
};
