"use server";

import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { proofContentSchema } from "@/lib/content-schema";

export async function updateProofAction(formData: FormData) {
  const parsed = proofContentSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    heading: formData.get("heading"),
    paragraph: formData.get("paragraph"),
    statistics: [0, 1, 2].map((i) => ({
      value: formData.get(`statistic-${i}-value`),
      prefix: formData.get(`statistic-${i}-prefix`),
      suffix: formData.get(`statistic-${i}-suffix`),
      label: formData.get(`statistic-${i}-label`),
    })),
    financingEyebrow: formData.get("financingEyebrow"),
    financingHeading: formData.get("financingHeading"),
    financingParagraph: formData.get("financingParagraph"),
    priceLabel: formData.get("priceLabel"),
    priceValue: formData.get("priceValue"),
    priceNote: formData.get("priceNote"),
    bullets: [0, 1, 2].map((i) => formData.get(`bullet-${i}`)),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/condicoes?status=error&message=${encodeURIComponent(message)}`);
  }

  const content = await getSiteContent();
  await saveSiteContent({ ...content, proof: parsed.data });
  redirect("/admin/condicoes?status=success");
}
