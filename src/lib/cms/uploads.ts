import path from "path";
import { promises as fs } from "fs";
import { CMS_DIR } from "./paths";

export const CMS_UPLOADS_DIR = path.join(CMS_DIR, "uploads");

const ALLOWED_FOLDERS = new Set([
  "portfolio/covers",
  "logos/clients",
  "logos/partners",
  "logos/brand",
  "blog",
  "general",
]);

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "video/webm": ".webm",
  "video/mp4": ".mp4",
};

const MAX_BYTES = 20 * 1024 * 1024;

export function cmsMediaUrl(relativePath: string) {
  return `/cms-media/${relativePath.replace(/^\/+/, "")}`;
}

export function sanitizeFolder(folder: string) {
  const normalized = folder.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  if (!ALLOWED_FOLDERS.has(normalized)) {
    throw new Error("Invalid upload folder");
  }
  if (normalized.includes("..")) {
    throw new Error("Invalid upload folder");
  }
  return normalized;
}

export function sanitizeFilename(name: string) {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return base.slice(0, 120) || "file";
}

export async function saveUploadedFile(file: File, folder: string) {
  if (file.size > MAX_BYTES) {
    throw new Error("File too large (max 20 MB)");
  }

  const mime = file.type || "application/octet-stream";
  const ext = ALLOWED_MIME[mime];
  if (!ext) {
    throw new Error("Unsupported file type");
  }

  const safeFolder = sanitizeFolder(folder);
  const stem = sanitizeFilename(file.name.replace(/\.[^.]+$/, ""));
  const filename = `${stem}-${Date.now()}${ext}`;
  const relativePath = `${safeFolder}/${filename}`;
  const absolutePath = path.join(CMS_UPLOADS_DIR, safeFolder, filename);

  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(absolutePath, buffer);

  return { url: cmsMediaUrl(relativePath), relativePath };
}

export async function readUploadedFile(relativePath: string) {
  const normalized = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!normalized || normalized.includes("..")) {
    throw new Error("Invalid path");
  }

  const absolutePath = path.join(CMS_UPLOADS_DIR, normalized);
  const resolved = path.resolve(absolutePath);
  if (!resolved.startsWith(path.resolve(CMS_UPLOADS_DIR))) {
    throw new Error("Invalid path");
  }

  return fs.readFile(resolved);
}

export function mimeFromPath(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".webm": "video/webm",
    ".mp4": "video/mp4",
  };
  return map[ext] ?? "application/octet-stream";
}
