import { promises as fs } from "node:fs";
import path from "node:path";

const STORE_DIR = path.join(process.cwd(), "data", "store");
const CONTENT_PATH = path.join(STORE_DIR, "content.json");
const AUTH_PATH = path.join(STORE_DIR, "auth.json");

/**
 * Processo único (Node persistente), então uma fila em memória já evita
 * escritas concorrentes corromperem o arquivo. Some com o restart, o que é
 * aceitável para o volume de escrita de um admin de conteúdo.
 */
let writeQueue: Promise<unknown> = Promise.resolve();

async function withLock<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function writeJsonFileAtomic(filePath: string, data: unknown): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
  try {
    await fs.rename(tempPath, filePath);
  } catch (error) {
    await fs.unlink(tempPath).catch(() => undefined);
    throw error;
  }
}

export function readContentFile<T>(): Promise<T | null> {
  return readJsonFile<T>(CONTENT_PATH);
}

export function writeContentFile(data: unknown): Promise<void> {
  return withLock(() => writeJsonFileAtomic(CONTENT_PATH, data));
}

export function readAuthFile<T>(): Promise<T | null> {
  return readJsonFile<T>(AUTH_PATH);
}

export function writeAuthFile(data: unknown): Promise<void> {
  return withLock(() => writeJsonFileAtomic(AUTH_PATH, data));
}
