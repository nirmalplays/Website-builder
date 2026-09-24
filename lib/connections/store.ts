import { and, eq, isNull, or } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import type { Identity } from "@/lib/identity";
import { decrypt, encrypt, hintFor, isEncryptionConfigured } from "./crypto";
import { fieldOf, getProvider } from "./providers";

/**
 * Reading and writing the credentials a user has given the app.
 *
 * Ownership follows the same rule as projects: a session cookie before sign-in,
 * a user id after. A connection with no projectId belongs to the owner and is
 * available to all of their projects, which is what you want for a Supabase
 * project used by several apps.
 */

export type StoredConnection = {
  id: string;
  provider: string;
  name: string;
  visibility: "publishable" | "secret";
  hint: string;
  projectId: string | null;
  createdAt: string;
};

function owns(identity: Identity) {
  return identity.userId
    ? or(eq(schema.connections.userId, identity.userId), eq(schema.connections.sessionId, identity.sessionId))
    : eq(schema.connections.sessionId, identity.sessionId);
}

/** Metadata only. The value never leaves the server through this path. */
export async function listConnections(
  identity: Identity,
  projectId?: string | null,
): Promise<StoredConnection[]> {
  if (!db) return [];

  const rows = await db
    .select()
    .from(schema.connections)
    .where(
      projectId
        ? and(owns(identity), or(isNull(schema.connections.projectId), eq(schema.connections.projectId, projectId)))
        : owns(identity),
    );

  return rows.map((r) => ({
    id: r.id,
    provider: r.provider,
    name: r.name,
    visibility: r.visibility,
    hint: r.hint,
    projectId: r.projectId,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function saveConnection(
  identity: Identity,
  input: { provider: string; name: string; value: string; projectId?: string | null },
): Promise<StoredConnection> {
  if (!db) throw new Error("No database configured, so credentials cannot be stored.");
  if (!isEncryptionConfigured()) {
    throw new Error(
      "CONNECTION_SECRET is not set. Credentials are stored encrypted, so the app will not accept one without it.",
    );
  }

  const provider = getProvider(input.provider);
  if (!provider) throw new Error(`"${input.provider}" is not a supported integration.`);

  const field = fieldOf(input.provider, input.name);
  if (!field) throw new Error(`"${input.name}" is not a field of ${provider.label}.`);

  const value = input.value.trim();
  if (!value) throw new Error(`${field.label} cannot be empty.`);

  // Replace rather than accumulate: re-pasting a rotated key should update it,
  // not leave the old one behind to be picked up later.
  await db
    .delete(schema.connections)
    .where(
      and(
        owns(identity),
        eq(schema.connections.provider, input.provider),
        eq(schema.connections.name, input.name),
        input.projectId
          ? eq(schema.connections.projectId, input.projectId)
          : isNull(schema.connections.projectId),
      ),
    );

  const [row] = await db
    .insert(schema.connections)
    .values({
      sessionId: identity.sessionId,
      userId: identity.userId,
      projectId: input.projectId ?? null,
      provider: input.provider,
      name: input.name,
      // The field decides, not the caller: a client that could choose would be
      // a way to have a secret written into browser code.
      visibility: field.visibility,
      valueEncrypted: encrypt(value),
      hint: hintFor(value),
    })
    .returning();

  return {
    id: row.id,
    provider: row.provider,
    name: row.name,
    visibility: row.visibility,
    hint: row.hint,
    projectId: row.projectId,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function deleteConnection(identity: Identity, id: string): Promise<boolean> {
  if (!db) return false;
  const deleted = await db
    .delete(schema.connections)
    .where(and(owns(identity), eq(schema.connections.id, id)))
    .returning({ id: schema.connections.id });
  return deleted.length > 0;
}

export type ResolvedConnections = {
  /** provider slug -> field name -> value. Publishable only. */
  publishable: Record<string, Record<string, string>>;
  /** Providers that have a secret stored, for proxy wiring. Values excluded. */
  secretProviders: string[];
};

/**
 * What the generator is allowed to see.
 *
 * Publishable values are returned in full because the generated app has to
 * contain them to work. Secrets are reported only as "this provider has one",
 * so nothing downstream can accidentally interpolate a secret into source that
 * ends up in a preview or a share link.
 */
export async function resolveForGeneration(
  identity: Identity,
  projectId?: string | null,
): Promise<ResolvedConnections> {
  const empty: ResolvedConnections = { publishable: {}, secretProviders: [] };
  if (!db || !isEncryptionConfigured()) return empty;

  const rows = await db
    .select()
    .from(schema.connections)
    .where(
      projectId
        ? and(owns(identity), or(isNull(schema.connections.projectId), eq(schema.connections.projectId, projectId)))
        : and(owns(identity), isNull(schema.connections.projectId)),
    );

  const out: ResolvedConnections = { publishable: {}, secretProviders: [] };

  for (const r of rows) {
    if (r.visibility === "secret") {
      if (!out.secretProviders.includes(r.provider)) out.secretProviders.push(r.provider);
      continue;
    }
    try {
      (out.publishable[r.provider] ??= {})[r.name] = decrypt(r.valueEncrypted);
    } catch {
      // A value that will not decrypt - usually CONNECTION_SECRET was rotated -
      // is skipped rather than allowed to abort the build. The user sees the
      // integration behave as absent and can re-enter the key.
      console.error(`[connections] could not decrypt ${r.provider}.${r.name}`);
    }
  }

  return out;
}

/** The part of the build prompt that says what is wired up. */
export function connectionPrompt(resolved: ResolvedConnections): string {
  const blocks: string[] = [];

  for (const [slug, values] of Object.entries(resolved.publishable)) {
    const provider = getProvider(slug);
    if (!provider) continue;
    const required = provider.fields.filter((f) => f.required && f.visibility === "publishable");
    // A half-entered integration is worse than none: the code would look right
    // and fail at runtime. Say nothing until every required field is present.
    if (!required.every((f) => values[f.name])) continue;
    blocks.push(provider.usage(values));
  }

  return blocks.join("\n\n");
}

/** npm packages the wired integrations need in the preview. */
export function connectionDependencies(resolved: ResolvedConnections): Record<string, string> {
  const deps: Record<string, string> = {};
  for (const slug of Object.keys(resolved.publishable)) {
    Object.assign(deps, getProvider(slug)?.dependencies ?? {});
  }
  return deps;
}
