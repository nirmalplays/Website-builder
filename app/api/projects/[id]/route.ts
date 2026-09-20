import { NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getIdentity } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function ownedProject(id: string) {
  if (!db) return null;
  const identity = await getIdentity();
  const [project] = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.id, id))
    .limit(1);
  if (!project) return null;

  const owns =
    project.sessionId === identity.sessionId ||
    (identity.userId !== null && project.userId === identity.userId);
  return owns ? project : null;
}

/** Full project: conversation plus every saved version, newest first. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await ownedProject(id);
  if (!project) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const [messages, versions] = await Promise.all([
    db!
      .select({ role: schema.messages.role, content: schema.messages.content, createdAt: schema.messages.createdAt })
      .from(schema.messages)
      .where(eq(schema.messages.projectId, id))
      .orderBy(asc(schema.messages.createdAt)),
    db!
      .select({ id: schema.versions.id, files: schema.versions.files, model: schema.versions.model, createdAt: schema.versions.createdAt })
      .from(schema.versions)
      .where(eq(schema.versions.projectId, id))
      .orderBy(desc(schema.versions.createdAt))
      .limit(30),
  ]);

  return NextResponse.json({
    project: { id: project.id, title: project.title, isPublic: project.isPublic, updatedAt: project.updatedAt },
    // Prompts in full; assistant turns are whole files, so send only their size.
    messages: messages.map((m) => ({
      role: m.role,
      content: m.role === "user" ? m.content : "",
      lines: m.role === "assistant" ? m.content.split("\n").length : undefined,
      createdAt: m.createdAt,
    })),
    versions,
  });
}

/** Deleting a project removes its messages, versions and usage rows by cascade. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await ownedProject(id);
  if (!project) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await db!.delete(schema.projects).where(eq(schema.projects.id, id));
  return NextResponse.json({ deleted: true });
}
