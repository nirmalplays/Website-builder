"use client";

import { useState } from "react";
import type { PreviewKind } from "@/lib/templates";
import { TemplateThumb } from "./TemplateThumb";

/**
 * Real screenshot of the baked template, captured by scripts/thumbnails.mjs.
 * Falls back to the abstract wireframe when a template has no capture yet.
 */
export function TemplateCardImage({
  id,
  kind,
  title,
  priority = false,
}: {
  id: string;
  kind: PreviewKind;
  title: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <TemplateThumb kind={kind} />;

  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-raised transition-colors duration-200 group-hover:border-line-strong">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/thumbs/${id}.png`}
        alt={`${title} template preview`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={1280}
        height={800}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
