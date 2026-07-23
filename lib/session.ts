/**
 * Sessão do admin via cookie assinado com HMAC (Web Crypto). Usa apenas APIs
 * disponíveis tanto no runtime Node quanto no Edge (middleware.ts roda em
 * Edge no Next 14), por isso não usa `node:crypto` aqui.
 */
export const SESSION_COOKIE = "future_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 dias

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const padLength = (4 - (value.length % 4)) % 4;
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET não configurado nas variáveis de ambiente.");
  }
  return secret;
}

async function getSigningKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

type SessionPayload = { username: string; expiresAt: number };

export async function createSessionToken(username: string): Promise<string> {
  const payload: SessionPayload = {
    username,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const payloadBytes = encoder.encode(JSON.stringify(payload));
  const payloadB64 = base64UrlEncode(payloadBytes);
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  const signatureB64 = base64UrlEncode(new Uint8Array(signature));
  return `${payloadB64}.${signatureB64}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<{ username: string } | null> {
  if (!token) return null;
  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return null;

  try {
    const key = await getSigningKey();
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(signatureB64) as BufferSource,
      encoder.encode(payloadB64),
    );
    if (!isValid) return null;

    const payload = JSON.parse(decoder.decode(base64UrlDecode(payloadB64))) as SessionPayload;
    if (typeof payload.username !== "string" || typeof payload.expiresAt !== "number") return null;
    if (Date.now() > payload.expiresAt) return null;

    return { username: payload.username };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
