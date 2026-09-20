import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { SharedView } from "@/components/SharedView";

export const dynamic = "force-dynamic";

/** Public read-only preview of a shared project (FR-13). */
export default async function SharedProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!db) notFound();

  const [project] = await db
    .select({ id: schema.projects.id, title: schema.projects.title, isPublic: schema.projects.isPublic })
    .from(schema.projects)
    .where(eq(schema.projects.id, id))
    .limit(1);

  // An unshared project is indistinguishable from a missing one.
  if (!project || !project.isPublic) notFound();

  const [version] = await db
    .select({ files: schema.versions.files, createdAt: schema.versions.createdAt })
    .from(schema.versions)
    .where(eq(schema.versions.projectId, id))
    .orderBy(desc(schema.versions.createdAt))
    .limit(1);

  const code = version?.files?.["/App.tsx"];
  if (!code) notFound();

  return <SharedView title={project.title} code={code} />;
}
