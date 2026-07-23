"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { lotsCatalogContentSchema, type Lot } from "@/lib/content-schema";
import { deleteUploadedFile } from "@/lib/uploads";

export async function updateLotsCatalogAction(formData: FormData) {
  const parsed = lotsCatalogContentSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    heading: formData.get("heading"),
    paragraph: formData.get("paragraph"),
    footnote: formData.get("footnote"),
    whatsappMessageTemplate: formData.get("whatsappMessageTemplate"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/lotes?status=error&message=${encodeURIComponent(message)}`);
  }

  const content = await getSiteContent();
  await saveSiteContent({ ...content, lotsCatalog: parsed.data });
  redirect("/admin/lotes?status=success");
}

export async function createLotAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    redirect(`/admin/lotes?status=error&message=${encodeURIComponent("Informe um nome para o lote.")}`);
  }

  const content = await getSiteContent();
  const newLot: Lot = {
    id: randomUUID(),
    name,
    area: "",
    price: "",
    payment: "",
    status: "Disponível",
    benefit: "",
    featured: false,
    gallery: [],
  };
  await saveSiteContent({ ...content, lots: [...content.lots, newLot] });
  redirect(`/admin/lotes/${newLot.id}`);
}

async function moveLot(id: string, direction: "up" | "down") {
  const content = await getSiteContent();
  const index = content.lots.findIndex((lot) => lot.id === id);
  if (index === -1) redirect("/admin/lotes");

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= content.lots.length) redirect("/admin/lotes");

  const lots = [...content.lots];
  [lots[index], lots[targetIndex]] = [lots[targetIndex], lots[index]];
  await saveSiteContent({ ...content, lots });
  redirect("/admin/lotes");
}

export async function moveLotUpAction(formData: FormData) {
  await moveLot(String(formData.get("id") ?? ""), "up");
}

export async function moveLotDownAction(formData: FormData) {
  await moveLot(String(formData.get("id") ?? ""), "down");
}

export async function deleteLotAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const content = await getSiteContent();
  const lot = content.lots.find((item) => item.id === id);
  if (lot) {
    await Promise.all(lot.gallery.map((slide) => deleteUploadedFile(slide.src)));
  }
  const lots = content.lots.filter((item) => item.id !== id);
  await saveSiteContent({ ...content, lots });
  redirect("/admin/lotes");
}
