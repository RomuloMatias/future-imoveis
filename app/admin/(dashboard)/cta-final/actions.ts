"use server";

import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { finalCtaContentSchema } from "@/lib/content-schema";
import { deleteUploadedFile, isUploadedFile, saveUploadedFile } from "@/lib/uploads";

export async function updateFinalCtaAction(formData: FormData) {
  const content = await getSiteContent();
  let videoUrl = String(formData.get("videoUrl__current") ?? content.finalCta.videoUrl);

  const uploadedVideo = formData.get("videoUrl");
  if (isUploadedFile(uploadedVideo)) {
    try {
      const newUrl = await saveUploadedFile(uploadedVideo, "cta-final", "video");
      await deleteUploadedFile(content.finalCta.videoUrl);
      videoUrl = newUrl;
    } catch (error) {
      const message = (error as Error).message;
      redirect(`/admin/cta-final?status=error&message=${encodeURIComponent(message)}`);
    }
  }

  const parsed = finalCtaContentSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    heading: formData.get("heading"),
    paragraph: formData.get("paragraph"),
    primaryCtaText: formData.get("primaryCtaText"),
    secondaryCtaText: formData.get("secondaryCtaText"),
    footerText: formData.get("footerText"),
    whatsappMessage: formData.get("whatsappMessage"),
    videoUrl,
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/cta-final?status=error&message=${encodeURIComponent(message)}`);
  }

  await saveSiteContent({ ...content, finalCta: parsed.data });
  redirect("/admin/cta-final?status=success");
}
