/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
// Media API route for TinaCMS custom media store.
// Handles list, upload, and delete via GitHub Contents API.
// Auth: requires next-auth session (same as TinaCMS admin).

import type { NextApiRequest, NextApiResponse } from "next";
import { buildAuthOptions } from "../../../lib/tina-auth";

const { getServerSession } = require("next-auth/next");

const GITHUB_API = "https://api.github.com";
const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH || "main";
const TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN!;
const MEDIA_ROOT = "public/images";

// Lazy-load databaseClient for auth (same pattern as tina routes)
let _dbClient: any = null;

async function getDbClient() {
  if (!_dbClient) {
    const mod = await import("../../../tina/__generated__/databaseClient");
    _dbClient = mod.default || mod.databaseClient || mod;
  }
  return _dbClient;
}

async function requireAuth(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const databaseClient = await getDbClient();
  const authOptions = buildAuthOptions(process.env.NEXTAUTH_SECRET!, databaseClient);
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user || session.user.role !== "user") {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

function repoPath(directory: string, filename?: string): string {
  const parts = [MEDIA_ROOT];
  if (directory) parts.push(directory);
  if (filename) parts.push(filename);
  return parts.join("/");
}

// GET /api/media/list?directory=...&limit=...&offset=...
async function handleList(req: NextApiRequest, res: NextApiResponse) {
  const directory = (req.query.directory as string) || "";
  const path = repoPath(directory);

  const ghRes = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: githubHeaders() }
  );

  if (ghRes.status === 404) {
    return res.json({ files: [], directories: [] });
  }
  if (!ghRes.ok) {
    const err = await ghRes.text();
    return res.status(ghRes.status).json({ error: `GitHub API error: ${err}` });
  }

  const contents = await ghRes.json();

  if (!Array.isArray(contents)) {
    // Single file, not a directory
    return res.json({ files: [], directories: [] });
  }

  const files: { filename: string; src: string }[] = [];
  const directories: string[] = [];

  for (const item of contents) {
    if (item.name === ".gitkeep") continue;

    if (item.type === "dir") {
      directories.push(item.name);
    } else if (item.type === "file") {
      // Build relative src path for Next.js public folder
      const relativePath = item.path.replace(/^public\//, "/");
      files.push({ filename: item.name, src: relativePath });
    }
  }

  return res.json({ files, directories });
}

// POST /api/media/upload — body: { filename, directory, content (base64) }
async function handleUpload(req: NextApiRequest, res: NextApiResponse) {
  if (!(await requireAuth(req, res))) return;

  const { filename, directory, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ error: "filename and content are required" });
  }

  const dir = directory || "";
  const path = repoPath(dir, filename);

  // Check if file already exists (need SHA for update)
  let sha: string | undefined;
  const checkRes = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: githubHeaders() }
  );
  if (checkRes.ok) {
    const existing = await checkRes.json();
    sha = existing.sha;
  }

  const body: any = {
    message: `media: upload ${filename}`,
    content,
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const ghRes = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: githubHeaders(),
      body: JSON.stringify(body),
    }
  );

  if (!ghRes.ok) {
    const err = await ghRes.text();
    return res.status(ghRes.status).json({ error: `GitHub upload failed: ${err}` });
  }

  const relativeSrc = path.replace(/^public\//, "/");
  return res.json({ path: dir ? `${dir}/${filename}` : filename, src: relativeSrc });
}

// DELETE /api/media/delete?path=...
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  if (!(await requireAuth(req, res))) return;

  const filePath = req.query.path as string;
  if (!filePath) {
    return res.status(400).json({ error: "path is required" });
  }

  const fullPath = repoPath("", filePath);

  // Get SHA first
  const getRes = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${fullPath}?ref=${BRANCH}`,
    { headers: githubHeaders() }
  );

  if (!getRes.ok) {
    return res.status(404).json({ error: "File not found" });
  }

  const { sha } = await getRes.json();

  const ghRes = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${fullPath}`,
    {
      method: "DELETE",
      headers: githubHeaders(),
      body: JSON.stringify({
        message: `media: delete ${filePath}`,
        sha,
        branch: BRANCH,
      }),
    }
  );

  if (!ghRes.ok) {
    const err = await ghRes.text();
    return res.status(ghRes.status).json({ error: `GitHub delete failed: ${err}` });
  }

  return res.json({ deleted: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slugs = req.query.media as string[];
    const action = slugs?.[0];

    switch (action) {
      case "list":
        if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
        return handleList(req, res);
      case "upload":
        if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
        return handleUpload(req, res);
      case "delete":
        if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });
        return handleDelete(req, res);
      default:
        return res.status(404).json({ error: "Unknown media route" });
    }
  } catch (e) {
    console.error("Media API error:", e);
    res.status(500).json({
      error: e instanceof Error ? e.message : "Internal Server Error",
    });
  }
}

// Increase body size limit for image uploads (10MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
