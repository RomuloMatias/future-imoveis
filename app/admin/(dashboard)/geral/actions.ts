"use server";

import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { siteSettingsSchema } from "@/lib/content-schema";

export async function updateSettingsAction(formData: FormData) {
  const parsed = siteSettingsSchema.safeParse({
    siteName: formData.get("siteName"),
    creci: formData.get("creci"),
    domain: formData.get("domain"),
    projectName: formData.get("projectName"),
    whatsappNumber: formData.get("whatsappNumber"),
    headerCtaText: formData.get("headerCtaText"),
    whatsappMessageDefault: formData.get("whatsappMessageDefault"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/geral?status=error&message=${encodeURIComponent(message)}`);
  }

  const content = await getSiteContent();
  await saveSiteContent({ ...content, settings: parsed.data });

  redirect("/admin/geral?status=success");
}
