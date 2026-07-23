import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { readAuthFile, writeAuthFile } from "@/lib/store";

type AdminUser = {
  username: string;
  passwordHash: string;
};

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function seedAdminUser(): Promise<AdminUser> {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    throw new Error(
      "Nenhum usuário admin configurado. Defina ADMIN_USERNAME e ADMIN_PASSWORD no .env.local.",
    );
  }
  const user: AdminUser = { username, passwordHash: hashPassword(password) };
  await writeAuthFile(user);
  return user;
}

export async function getAdminUser(): Promise<AdminUser> {
  const stored = await readAuthFile<AdminUser>();
  if (stored?.username && stored?.passwordHash) return stored;
  return seedAdminUser();
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const user = await getAdminUser();
  return user.username === username && verifyPassword(password, user.passwordHash);
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  const user = await getAdminUser();
  await writeAuthFile({ username: user.username, passwordHash: hashPassword(newPassword) } satisfies AdminUser);
}
