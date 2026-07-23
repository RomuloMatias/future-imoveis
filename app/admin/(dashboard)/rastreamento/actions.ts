"use server";

import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { trackingSettingsSchema } from "@/lib/content-schema";

export async function updateTrackingAction(formData: FormData) {
  const parsed = trackingSettingsSchema.safeParse({
    gtmId: formData.get("gtmId"),
    ga4Id: formData.get("ga4Id"),
    googleAdsId: formData.get("googleAdsId"),
    metaPixelId: formData.get("metaPixelId"),
    clarityId: formData.get("clarityId"),
  });
  if (!parsed.success) {
    redirect(`/admin/rastreamento?status=error&message=${encodeURIComponent("Configuração inválida.")}`);
  }
  const content = await getSiteContent();
  await saveSiteContent({ ...content, tracking: parsed.data });
  redirect("/admin/rastreamento?status=success");
}
