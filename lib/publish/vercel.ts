import { createHash } from "node:crypto";
import type { StaticSite } from "./site";

/**
 * Deploys a static site to Vercel with the user's own token.
 *
 * Their token, their account, their project - this app never deploys on its
 * own credentials, so a published page is something the user owns and can
 * delete, and nothing they publish is billed to or attributable to anyone else.
 *
 * Uses the two-step upload the API expects: each file is POSTed to /v2/files
 * keyed by its SHA-1, then the deployment references those digests. Inlining
 * file bodies in the deployment call works for tiny sites and stops working
 * exactly when a project gets interesting.
 */

const API = "https://api.vercel.com";

export type PublishResult = {
  url: string;
  inspectorUrl: string;
  projectName: string;
};

class VercelError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "VercelError";
  }
}

async function call(
  token: string,
  path: string,
  init: RequestInit & { teamId?: string } = {},
): Promise<unknown> {
  const url = new URL(`${API}${path}`);
  if (init.teamId) url.searchParams.set("teamId", init.teamId);

  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(30_000),
  });

  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text.slice(0, 300) };
  }

  if (!res.ok) {
    const message =
      (body as { error?: { message?: string } })?.error?.message ??
      `Vercel returned ${res.status}.`;
    throw new VercelError(message, res.status);
  }
  return body;
}

/** Project names must be lowercase, and a directory name rarely is. */
export function toProjectName(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-{3,}/g, "--")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80);
  return slug || "ui-gen-app";
}

export async function whoami(token: string): Promise<{ username: string }> {
  const body = (await call(token, "/v2/user")) as { user?: { username?: string; email?: string } };
  return { username: body.user?.username ?? body.user?.email ?? "unknown" };
}

export async function publishSite(
  token: string,
  site: StaticSite,
  title: string,
  teamId?: string,
): Promise<PublishResult> {
  const name = toProjectName(title);

  // Upload each file first, keyed by digest. Vercel deduplicates on these, so
  // republishing an unchanged file costs nothing.
  const entries = Object.entries(site);
  const uploaded: { file: string; sha: string; size: number }[] = [];

  for (const [path, contents] of entries) {
    const data = Buffer.from(contents, "utf8");
    const sha = createHash("sha1").update(data).digest("hex");

    await call(token, "/v2/files", {
      method: "POST",
      teamId,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-vercel-digest": sha,
        "Content-Length": String(data.byteLength),
      },
      body: new Uint8Array(data),
    });

    uploaded.push({ file: path, sha, size: data.byteLength });
  }

  const deployment = (await call(token, "/v13/deployments", {
    method: "POST",
    teamId,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      files: uploaded.map((f) => ({ file: f.file, sha: f.sha, size: f.size })),
      target: "production",
      // No framework and no build: the page and its bundle are already final,
      // so there is nothing to install and nothing that can fail at build time.
      projectSettings: {
        framework: null,
        buildCommand: null,
        installCommand: null,
        outputDirectory: null,
      },
    }),
  })) as { url?: string; id?: string; inspectorUrl?: string };

  if (!deployment.url) throw new VercelError("Vercel accepted the deploy but returned no URL.", 502);

  return {
    url: `https://${deployment.url}`,
    inspectorUrl: deployment.inspectorUrl ?? "",
    projectName: name,
  };
}
