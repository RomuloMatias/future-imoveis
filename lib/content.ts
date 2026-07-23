import {
  finalCtaContentSchema,
  heroContentSchema,
  infrastructureContentSchema,
  lotSchema,
  lotsCatalogContentSchema,
  proofContentSchema,
  siteSettingsSchema,
  type Lot,
  type SiteContent,
} from "@/lib/content-schema";
import { defaultContent } from "@/lib/default-content";
import { readContentFile, writeContentFile } from "@/lib/store";
import type { z } from "zod";

/**
 * Um problema em uma seção (ex.: um lote com dado inválido) não pode derrubar
 * o resto do conteúdo real da cliente — cada seção é validada de forma
 * independente e só ela cai para o padrão em caso de erro.
 */
function parseSection<T>(schema: z.ZodType<T>, value: unknown, fallback: T, sectionName: string): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    console.warn(`Seção "${sectionName}" inválida no conteúdo salvo, usando o padrão.`, parsed.error.flatten());
    return fallback;
  }
  return parsed.data;
}

function parseLots(value: unknown): Lot[] {
  if (!Array.isArray(value)) return defaultContent.lots;

  const lots: Lot[] = [];
  value.forEach((raw, index) => {
    const parsed = lotSchema.safeParse(raw);
    if (parsed.success) {
      lots.push(parsed.data);
    } else {
      console.warn(`Lote #${index + 1} inválido no conteúdo salvo, ignorado.`, parsed.error.flatten());
    }
  });
  return lots;
}

export async function getSiteContent(): Promise<SiteContent> {
  const stored = await readContentFile<Record<string, unknown>>();

  if (!stored) {
    try {
      await writeContentFile(defaultContent);
    } catch (error) {
      // Em builds com várias páginas geradas em paralelo, mais de um processo
      // pode tentar semear o arquivo ao mesmo tempo — não é fatal, quem
      // ganhar a corrida grava e as próximas leituras já encontram o arquivo.
      console.warn("Não foi possível gravar o conteúdo padrão agora.", error);
    }
    return defaultContent;
  }

  return {
    settings: parseSection(siteSettingsSchema, stored.settings, defaultContent.settings, "settings"),
    hero: parseSection(heroContentSchema, stored.hero, defaultContent.hero, "hero"),
    lotsCatalog: parseSection(lotsCatalogContentSchema, stored.lotsCatalog, defaultContent.lotsCatalog, "lotsCatalog"),
    lots: parseLots(stored.lots),
    infrastructure: parseSection(
      infrastructureContentSchema,
      stored.infrastructure,
      defaultContent.infrastructure,
      "infrastructure",
    ),
    proof: parseSection(proofContentSchema, stored.proof, defaultContent.proof, "proof"),
    finalCta: parseSection(finalCtaContentSchema, stored.finalCta, defaultContent.finalCta, "finalCta"),
  };
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await writeContentFile(content);
}
