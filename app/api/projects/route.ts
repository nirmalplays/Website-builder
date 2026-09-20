import { NextResponse } from "next/server";
import { count, desc, eq, inArray, max, or } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getIdentity } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The signed-in user's projects, newest first.
 *
 * Anonymous visitors still get their own list through the session cookie -
 * signing in is what makes it durable across browsers rather than what makes
 * it exist.
 */
export async function GET() {
  if (!db) return NextResponse.json({ projects: [], enabled: false });

  const identity = await getIdentity();

  try {
    const owner = identity.userId
      ? or(eq(schema.projects.userId, identity.userId), eq(schema.projects.sessionId, identity.sessionId))
      : eq(schema.projects.sessionId, identity.sessionId);

    const rows = await db
      .select({
        id: schema.projects.id,
        title: schema.projects.title,
        isPublic: schema.projects.isPublic,
        createdAt: schema.projects.createdAt,
        updatedAt: schema.projects.updatedAt,
      })
      .from(schema.projects)
      .where(owner)
      .orderBy(desc(schema.projects.updatedAt))
      .limit(60);

    if (rows.length === 0) {
      return NextResponse.json({ enabled: true, signedIn: identity.signedIn, projects: [] });
    }

    // A correlated subquery per row rendered wrong through the query builder, so
    // count versions in one pass and stitch the results together here.
    const counts = await db
      .select({
        projectId: schema.versions.projectId,
        versions: count(),
        model: max(schema.versions.model),
        lastVersionAt: max(schema.versions.createdAt),
      })
      .from(schema.versions)
      .where(inArray(schema.versions.projectId, rows.map((r) => r.id)))
      .groupBy(schema.versions.projectId);

    const byProject = new Map(counts.map((c) => [c.projectId, c]));

    const projects = rows
      .map((r) => {
        const info = byProject.get(r.id);
        return {
          ...r,
          versions: Number(info?.versions ?? 0),
          model: info?.model ?? null,
        };
      })
      .filter((p) => p.versions > 0);

    return NextResponse.json({ enabled: true, signedIn: identity.signedIn, projects });
  } catch (err) {
    console.error("[projects] list failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ projects: [], enabled: false });
  }
}
