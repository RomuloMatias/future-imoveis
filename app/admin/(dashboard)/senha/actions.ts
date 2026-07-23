"use server";

import { redirect } from "next/navigation";
import { getAdminUser, updateAdminPassword, verifyCredentials } from "@/lib/auth";

export async function changePasswordAction(formData: FormData) {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 8) {
    redirect(
      `/admin/senha?status=error&message=${encodeURIComponent("A nova senha precisa ter pelo menos 8 caracteres.")}`,
    );
  }
  if (newPassword !== confirmPassword) {
    redirect(`/admin/senha?status=error&message=${encodeURIComponent("A confirmação não bate com a nova senha.")}`);
  }

  const user = await getAdminUser();
  const isCurrentValid = await verifyCredentials(user.username, currentPassword);
  if (!isCurrentValid) {
    redirect(`/admin/senha?status=error&message=${encodeURIComponent("Senha atual incorreta.")}`);
  }

  await updateAdminPassword(newPassword);
  redirect(`/admin/senha?status=success&message=${encodeURIComponent("Senha atualizada.")}`);
}
