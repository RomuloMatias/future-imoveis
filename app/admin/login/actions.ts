"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/session";

function resolveSafeRedirect(target: string): string {
  if (target.startsWith("/admin") && target !== "/admin/login") return target;
  return "/admin";
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const safeRedirect = resolveSafeRedirect(String(formData.get("redirectTo") ?? "/admin"));

  let errorCode: "invalid" | "config" | null = null;

  if (!username || !password) {
    errorCode = "invalid";
  } else {
    try {
      const isValid = await verifyCredentials(username, password);
      if (!isValid) errorCode = "invalid";
    } catch {
      errorCode = "config";
    }
  }

  if (errorCode) {
    redirect(`/admin/login?error=${errorCode}&redirectTo=${encodeURIComponent(safeRedirect)}`);
  }

  const token = await createSessionToken(username);
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions);
  redirect(safeRedirect);
}
