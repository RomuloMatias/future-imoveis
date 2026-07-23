"use server";

import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { gallerySlideSchema, lotSchema } from "@/lib/content-schema";
import { deleteUploadedFile, isUploadedFile, saveUploadedFile } from "@/lib/uploads";

async function findLotOrRedirect(id: string) {
  const content = await getSiteContent();
  const index = content.lots.findIndex((lot) => lot.id === id);
  if (index === -1) redirect("/admin/lotes");
  return { content, index };
}

export async function updateLotAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { content, index } = await findLotOrRedirect(id);
  const current = content.lots[index];

  const parsed = lotSchema.safeParse({
    id,
    name: formData.get("name"),
    area: formData.get("area"),
    price: formData.get("price"),
    payment: formData.get("payment"),
    status: formData.get("status"),
    benefit: formData.get("benefit"),
    featured: formData.get("featured") === "on",
    gallery: current.gallery,
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/lotes/${id}?status=error&message=${encodeURIComponent(message)}`);
  }

  const lots = [...content.lots];
  lots[index] = parsed.data;
  await saveSiteContent({ ...content, lots });
  redirect(`/admin/lotes/${id}?status=success`);
}

export async function addLotPhotosAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { content, index } = await findLotOrRedirect(id);
  const current = content.lots[index];

  const files = formData.getAll("photos").filter(isUploadedFile);
  if (files.length === 0) {
    redirect(`/admin/lotes/${id}`);
  }

  const newSlides: (typeof current.gallery)[number][] = [];
  for (const file of files) {
    try {
      const src = await saveUploadedFile(file, `lotes/${id}`, "image");
      newSlides.push({
        src,
        label: `Foto ${current.gallery.length + newSlides.length + 1}`,
        description: "",
        alt: current.name,
      });
    } catch (error) {
      const message = (error as Error).message;
      redirect(`/admin/lotes/${id}?status=error&message=${encodeURIComponent(message)}`);
    }
  }

  const lots = [...content.lots];
  lots[index] = { ...current, gallery: [...current.gallery, ...newSlides] };
  await saveSiteContent({ ...content, lots });
  redirect(`/admin/lotes/${id}?status=success&message=${encodeURIComponent("Fotos adicionadas.")}`);
}

export async function updateLotPhotoAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const photoIndex = Number(formData.get("photoIndex"));
  const { content, index } = await findLotOrRedirect(id);
  const current = content.lots[index];

  if (!Number.isInteger(photoIndex) || photoIndex < 0 || photoIndex >= current.gallery.length) {
    redirect(`/admin/lotes/${id}`);
  }

  const parsed = gallerySlideSchema.safeParse({
    src: current.gallery[photoIndex].src,
    label: formData.get("label"),
    description: formData.get("description"),
    alt: formData.get("alt"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/lotes/${id}?status=error&message=${encodeURIComponent(message)}`);
  }

  const gallery = [...current.gallery];
  gallery[photoIndex] = parsed.data;
  const lots = [...content.lots];
  lots[index] = { ...current, gallery };
  await saveSiteContent({ ...content, lots });
  redirect(`/admin/lotes/${id}?status=success`);
}

async function moveLotPhoto(id: string, photoIndex: number, direction: "up" | "down") {
  const { content, index } = await findLotOrRedirect(id);
  const current = content.lots[index];
  const targetIndex = direction === "up" ? photoIndex - 1 : photoIndex + 1;
  if (targetIndex < 0 || targetIndex >= current.gallery.length) redirect(`/admin/lotes/${id}`);

  const gallery = [...current.gallery];
  [gallery[photoIndex], gallery[targetIndex]] = [gallery[targetIndex], gallery[photoIndex]];
  const lots = [...content.lots];
  lots[index] = { ...current, gallery };
  await saveSiteContent({ ...content, lots });
  redirect(`/admin/lotes/${id}`);
}

export async function moveLotPhotoUpAction(formData: FormData) {
  await moveLotPhoto(String(formData.get("id") ?? ""), Number(formData.get("photoIndex")), "up");
}

export async function moveLotPhotoDownAction(formData: FormData) {
  await moveLotPhoto(String(formData.get("id") ?? ""), Number(formData.get("photoIndex")), "down");
}

export async function deleteLotPhotoAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const photoIndex = Number(formData.get("photoIndex"));
  const { content, index } = await findLotOrRedirect(id);
  const current = content.lots[index];

  if (!Number.isInteger(photoIndex) || photoIndex < 0 || photoIndex >= current.gallery.length) {
    redirect(`/admin/lotes/${id}`);
  }

  const removed = current.gallery[photoIndex];
  const gallery = current.gallery.filter((_, i) => i !== photoIndex);
  await deleteUploadedFile(removed?.src);

  const lots = [...content.lots];
  lots[index] = { ...current, gallery };
  await saveSiteContent({ ...content, lots });
  redirect(`/admin/lotes/${id}`);
}
