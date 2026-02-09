// Custom TinaCMS MediaStore that uses GitHub Contents API via our API routes.
// Sends files as base64 JSON (not FormData) to avoid multipart parsing complexity.

import type { Media, MediaList, MediaListOptions, MediaStore, MediaUploadOptions } from "tinacms";

export class GitHubMediaStore implements MediaStore {
  accept = "*";

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const uploaded: Media[] = [];

    for (const { file, directory } of files) {
      const base64 = await fileToBase64(file);
      const dir = cleanDirectory(directory);
      const filename = file.name;

      const res = await fetch("/api/media/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, directory: dir, content: base64 }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(`Upload failed: ${err.error || res.statusText}`);
      }

      const data = await res.json();
      uploaded.push({
        type: "file",
        id: data.path,
        directory: dir,
        filename,
        src: data.src,
        thumbnails: { "75x75": data.src, "400x400": data.src, "1000x1000": data.src },
      });
    }

    return uploaded;
  }

  async list(options?: MediaListOptions): Promise<MediaList> {
    const directory = cleanDirectory(options?.directory);
    const limit = options?.limit ?? 50;
    const offset = options?.offset ?? 0;

    const params = new URLSearchParams({
      directory,
      limit: String(limit),
      offset: String(offset),
    });

    const res = await fetch(`/api/media/list?${params}`);
    if (!res.ok) {
      if (res.status === 404) {
        return { items: [] };
      }
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(`List failed: ${err.error || res.statusText}`);
    }

    const data = await res.json();

    const items: Media[] = [
      ...data.directories.map((name: string) => ({
        type: "dir" as const,
        id: directory ? `${directory}/${name}` : name,
        directory,
        filename: name,
      })),
      ...data.files.map((f: { filename: string; src: string }) => ({
        type: "file" as const,
        id: directory ? `${directory}/${f.filename}` : f.filename,
        directory,
        filename: f.filename,
        src: f.src,
        thumbnails: { "75x75": f.src, "400x400": f.src, "1000x1000": f.src },
      })),
    ];

    return { items };
  }

  async delete(media: Media): Promise<void> {
    const path = media.id;
    const res = await fetch(`/api/media/delete?path=${encodeURIComponent(path)}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(`Delete failed: ${err.error || res.statusText}`);
    }
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data:...;base64, prefix
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function cleanDirectory(dir?: string): string {
  if (!dir || dir === "/" || dir === ".") return "";
  return dir.replace(/^\/+|\/+$/g, "");
}
