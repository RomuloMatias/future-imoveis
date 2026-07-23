"use server";

import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import {
  experienceItemSchema,
  infrastructureContentSchema,
  technicalFeatureSchema,
} from "@/lib/content-schema";
import { deleteUploadedFile, isUploadedFile, saveUploadedFile } from "@/lib/uploads";
import { iconKeys } from "@/lib/icons";

export async function updateInfrastructureTextAction(formData: FormData) {
  const content = await getSiteContent();

  const parsed = infrastructureContentSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    heading: formData.get("heading"),
    paragraph: formData.get("paragraph"),
    experiences: content.infrastructure.experiences,
    technicalEyebrow: formData.get("technicalEyebrow"),
    technicalHeading: formData.get("technicalHeading"),
    technicalFeatures: content.infrastructure.technicalFeatures,
    bannerTitle: formData.get("bannerTitle"),
    bannerDescription: formData.get("bannerDescription"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/infraestrutura?status=error&message=${encodeURIComponent(message)}`);
  }

  await saveSiteContent({ ...content, infrastructure: parsed.data });
  redirect("/admin/infraestrutura?status=success");
}

export async function addExperienceAction() {
  const content = await getSiteContent();
  const experiences = [
    ...content.infrastructure.experiences,
    { title: "Nova experiência", description: "", image: "", icon: iconKeys[0] },
  ];
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, experiences } });
  redirect("/admin/infraestrutura");
}

export async function updateExperienceAction(formData: FormData) {
  const index = Number(formData.get("index"));
  const content = await getSiteContent();
  const experiences = [...content.infrastructure.experiences];
  if (!Number.isInteger(index) || index < 0 || index >= experiences.length) {
    redirect("/admin/infraestrutura");
  }

  let image = String(formData.get("image__current") ?? experiences[index].image);
  const uploaded = formData.get("image");
  if (isUploadedFile(uploaded)) {
    try {
      const newUrl = await saveUploadedFile(uploaded, "infraestrutura", "image");
      await deleteUploadedFile(experiences[index].image);
      image = newUrl;
    } catch (error) {
      const message = (error as Error).message;
      redirect(`/admin/infraestrutura?status=error&message=${encodeURIComponent(message)}`);
    }
  }

  const parsed = experienceItemSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image,
    icon: formData.get("icon"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/infraestrutura?status=error&message=${encodeURIComponent(message)}`);
  }

  experiences[index] = parsed.data;
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, experiences } });
  redirect("/admin/infraestrutura?status=success");
}

async function moveExperience(index: number, direction: "up" | "down") {
  const content = await getSiteContent();
  const experiences = [...content.infrastructure.experiences];
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= experiences.length) redirect("/admin/infraestrutura");

  [experiences[index], experiences[target]] = [experiences[target], experiences[index]];
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, experiences } });
  redirect("/admin/infraestrutura");
}

export async function moveExperienceUpAction(formData: FormData) {
  await moveExperience(Number(formData.get("index")), "up");
}

export async function moveExperienceDownAction(formData: FormData) {
  await moveExperience(Number(formData.get("index")), "down");
}

export async function deleteExperienceAction(formData: FormData) {
  const index = Number(formData.get("index"));
  const content = await getSiteContent();
  const experiences = [...content.infrastructure.experiences];
  if (index >= 0 && index < experiences.length) {
    await deleteUploadedFile(experiences[index].image);
    experiences.splice(index, 1);
  }
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, experiences } });
  redirect("/admin/infraestrutura");
}

export async function addTechnicalFeatureAction() {
  const content = await getSiteContent();
  const technicalFeatures = [
    ...content.infrastructure.technicalFeatures,
    { title: "Novo item", description: "", icon: iconKeys[0] },
  ];
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, technicalFeatures } });
  redirect("/admin/infraestrutura");
}

export async function updateTechnicalFeatureAction(formData: FormData) {
  const index = Number(formData.get("index"));
  const content = await getSiteContent();
  const technicalFeatures = [...content.infrastructure.technicalFeatures];
  if (!Number.isInteger(index) || index < 0 || index >= technicalFeatures.length) {
    redirect("/admin/infraestrutura");
  }

  const parsed = technicalFeatureSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/infraestrutura?status=error&message=${encodeURIComponent(message)}`);
  }

  technicalFeatures[index] = parsed.data;
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, technicalFeatures } });
  redirect("/admin/infraestrutura?status=success");
}

async function moveTechnicalFeature(index: number, direction: "up" | "down") {
  const content = await getSiteContent();
  const technicalFeatures = [...content.infrastructure.technicalFeatures];
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= technicalFeatures.length) redirect("/admin/infraestrutura");

  [technicalFeatures[index], technicalFeatures[target]] = [technicalFeatures[target], technicalFeatures[index]];
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, technicalFeatures } });
  redirect("/admin/infraestrutura");
}

export async function moveTechnicalFeatureUpAction(formData: FormData) {
  await moveTechnicalFeature(Number(formData.get("index")), "up");
}

export async function moveTechnicalFeatureDownAction(formData: FormData) {
  await moveTechnicalFeature(Number(formData.get("index")), "down");
}

export async function deleteTechnicalFeatureAction(formData: FormData) {
  const index = Number(formData.get("index"));
  const content = await getSiteContent();
  const technicalFeatures = [...content.infrastructure.technicalFeatures];
  if (index >= 0 && index < technicalFeatures.length) {
    technicalFeatures.splice(index, 1);
  }
  await saveSiteContent({ ...content, infrastructure: { ...content.infrastructure, technicalFeatures } });
  redirect("/admin/infraestrutura");
}
