import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getIdentity } from "@/lib/identity";

export const runtime = "nodejs";

/** Publish a project as a read-only link (FR-13). Only its owner may do this. */
export async function POST(req: Request) {
  if (!db) {
    return NextResponse.json(
      { error: "Sharing needs a database. Set DATABASE_URL to enable it." },
      { status: 503 },
    );
  }

  let body: { projectId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const projectId = body.projectId;
  if (!projectId) return NextResponse.json({ error: "No project to share." }, { status: 400 });

  const identity = await getIdentity();

  try {
    const [project] = await db
      .select({ id: schema.projects.id, sessionId: schema.projects.sessionId, userId: schema.projects.userId })
      .from(schema.projects)
      .where(eq(schema.projects.id, projectId))
      .limit(1);

    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    const owns =
      project.sessionId === identity.sessionId ||
      (identity.userId !== null && project.userId === identity.userId);
    if (!owns) return NextResponse.json({ error: "Not your project." }, { status: 403 });

    await db
      .update(schema.projects)
      .set({ isPublic: true })
      .where(and(eq(schema.projects.id, projectId)));

    const origin = new URL(req.url).origin;
    return NextResponse.json({ url: `${origin}/s/${projectId}` });
  } catch (err) {
    console.error("[share] failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not create share link." }, { status: 500 });
  }
}
