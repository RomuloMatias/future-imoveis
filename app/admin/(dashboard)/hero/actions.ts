"use server";

import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { heroContentSchema } from "@/lib/content-schema";
import { deleteUploadedFile, isUploadedFile, saveUploadedFile } from "@/lib/uploads";

export async function updateHeroAction(formData: FormData) {
  const content = await getSiteContent();
  let videoUrl = String(formData.get("videoUrl__current") ?? content.hero.videoUrl);

  const uploadedVideo = formData.get("videoUrl");
  if (isUploadedFile(uploadedVideo)) {
    try {
      const newUrl = await saveUploadedFile(uploadedVideo, "hero", "video");
      await deleteUploadedFile(content.hero.videoUrl);
      videoUrl = newUrl;
    } catch (error) {
      redirect(`/admin/hero?status=error&message=${encodeURIComponent((error as Error).message)}`);
    }
  }

  const parsed = heroContentSchema.safeParse({
    badgeText: formData.get("badgeText"),
    heading: formData.get("heading"),
    paragraph: formData.get("paragraph"),
    primaryCtaText: formData.get("primaryCtaText"),
    primaryCtaHref: formData.get("primaryCtaHref"),
    locationLabel: formData.get("locationLabel"),
    locationHighlight: formData.get("locationHighlight"),
    videoUrl,
    videoBadgeText: formData.get("videoBadgeText"),
    floatingLocationBadge: formData.get("floatingLocationBadge"),
    floatingEyebrow: formData.get("floatingEyebrow"),
    floatingTitle: formData.get("floatingTitle"),
    floatingStatus: formData.get("floatingStatus"),
    floatingFooterLeft: formData.get("floatingFooterLeft"),
    floatingFooterRight: formData.get("floatingFooterRight"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/hero?status=error&message=${encodeURIComponent(message)}`);
  }

  await saveSiteContent({ ...content, hero: parsed.data });
  redirect("/admin/hero?status=success");
}
