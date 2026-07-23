import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOADS_ROOT = path.join(PUBLIC_DIR, "uploads");

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export type UploadKind = "image" | "video";

/** Um `<input type="file">` vazio ainda chega como File com size 0 no FormData. */
export function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return typeof value === "object" && value !== null && "size" in value && (value as File).size > 0;
}

function sanitizedExtension(fileName: string, kind: UploadKind): string {
  const ext = path.extname(fileName).toLowerCase().replace(/[^a-z0-9.]/g, "");
  if (ext) return ext;
  return kind === "video" ? ".mp4" : ".jpg";
}

export async function saveUploadedFile(file: File, folder: string, kind: UploadKind): Promise<string> {
  const maxBytes = kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    throw new Error(`Arquivo muito grande. Limite de ${Math.round(maxBytes / (1024 * 1024))}MB.`);
  }

  const allowedTypes = kind === "video" ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Tipo de arquivo não suportado.");
  }

  const safeFolder = folder
    .split("/")
    .map((segment) => segment.replace(/[^a-z0-9-]/gi, ""))
    .filter(Boolean)
    .join("/");
  const targetDir = path.join(UPLOADS_ROOT, safeFolder);
  await fs.mkdir(targetDir, { recursive: true });

  const fileName = `${randomUUID()}${sanitizedExtension(file.name, kind)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(targetDir, fileName), buffer);

  return `/uploads/${safeFolder}/${fileName}`;
}

export async function deleteUploadedFile(publicUrl: string | undefined | null): Promise<void> {
  if (!publicUrl || !publicUrl.startsWith("/uploads/")) return;

  const resolvedPath = path.resolve(PUBLIC_DIR, `.${publicUrl}`);
  if (!resolvedPath.startsWith(UPLOADS_ROOT)) return;

  try {
    await fs.unlink(resolvedPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}
