import { z } from "zod";
import { iconKeys } from "@/lib/icons";

const requiredText = z.string().trim().min(1, "Campo obrigatório.");
const optionalText = z.string().trim().optional().default("");
const iconKeySchema = z.enum(iconKeys as [string, ...string[]]);

export const gallerySlideSchema = z.object({
  src: optionalText,
  label: requiredText,
  description: optionalText,
  alt: optionalText,
});
export type GallerySlide = z.infer<typeof gallerySlideSchema>;

export const lotSchema = z.object({
  id: z.string(),
  name: requiredText,
  // Vazios logo após "+ Adicionar lote" — a cliente preenche na tela de edição.
  area: optionalText,
  price: optionalText,
  payment: optionalText,
  status: requiredText,
  benefit: optionalText,
  featured: z.boolean().default(false),
  gallery: z.array(gallerySlideSchema).default([]),
});
export type Lot = z.infer<typeof lotSchema>;

export const siteSettingsSchema = z.object({
  siteName: requiredText,
  creci: requiredText,
  domain: requiredText,
  projectName: requiredText,
  whatsappNumber: requiredText,
  headerCtaText: requiredText,
  whatsappMessageDefault: requiredText,
  seoTitle: requiredText,
  seoDescription: requiredText,
});
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

export const heroContentSchema = z.object({
  badgeText: requiredText,
  heading: requiredText,
  paragraph: requiredText,
  primaryCtaText: requiredText,
  primaryCtaHref: requiredText,
  locationLabel: requiredText,
  locationHighlight: requiredText,
  videoUrl: optionalText,
  videoBadgeText: requiredText,
  floatingLocationBadge: requiredText,
  floatingEyebrow: requiredText,
  floatingTitle: requiredText,
  floatingStatus: requiredText,
  floatingFooterLeft: requiredText,
  floatingFooterRight: requiredText,
});
export type HeroContent = z.infer<typeof heroContentSchema>;

export const lotsCatalogContentSchema = z.object({
  eyebrow: requiredText,
  heading: requiredText,
  paragraph: requiredText,
  footnote: requiredText,
  whatsappMessageTemplate: requiredText,
});
export type LotsCatalogContent = z.infer<typeof lotsCatalogContentSchema>;

export const experienceItemSchema = z.object({
  title: requiredText,
  // Vazio logo após "+ Adicionar experiência" — a cliente preenche em seguida.
  description: optionalText,
  image: optionalText,
  icon: iconKeySchema,
});
export type ExperienceItem = z.infer<typeof experienceItemSchema>;

export const technicalFeatureSchema = z.object({
  title: requiredText,
  description: optionalText,
  icon: iconKeySchema,
});
export type TechnicalFeature = z.infer<typeof technicalFeatureSchema>;

export const infrastructureContentSchema = z.object({
  eyebrow: requiredText,
  heading: requiredText,
  paragraph: requiredText,
  experiences: z.array(experienceItemSchema).default([]),
  technicalEyebrow: requiredText,
  technicalHeading: requiredText,
  technicalFeatures: z.array(technicalFeatureSchema).default([]),
  bannerTitle: requiredText,
  bannerDescription: requiredText,
});
export type InfrastructureContent = z.infer<typeof infrastructureContentSchema>;

export const statisticSchema = z.object({
  value: z.coerce.number(),
  prefix: optionalText,
  suffix: requiredText,
  label: requiredText,
});
export type Statistic = z.infer<typeof statisticSchema>;

export const proofContentSchema = z.object({
  eyebrow: requiredText,
  heading: requiredText,
  paragraph: requiredText,
  statistics: z.tuple([statisticSchema, statisticSchema, statisticSchema]),
  financingEyebrow: requiredText,
  financingHeading: requiredText,
  financingParagraph: requiredText,
  priceLabel: requiredText,
  priceValue: requiredText,
  priceNote: requiredText,
  bullets: z.tuple([requiredText, requiredText, requiredText]),
});
export type ProofContent = z.infer<typeof proofContentSchema>;

export const finalCtaContentSchema = z.object({
  eyebrow: requiredText,
  heading: requiredText,
  paragraph: requiredText,
  primaryCtaText: requiredText,
  secondaryCtaText: requiredText,
  footerText: requiredText,
  whatsappMessage: requiredText,
  videoUrl: optionalText,
});
export type FinalCtaContent = z.infer<typeof finalCtaContentSchema>;

export const siteContentSchema = z.object({
  settings: siteSettingsSchema,
  hero: heroContentSchema,
  lotsCatalog: lotsCatalogContentSchema,
  lots: z.array(lotSchema).default([]),
  infrastructure: infrastructureContentSchema,
  proof: proofContentSchema,
  finalCta: finalCtaContentSchema,
});
export type SiteContent = z.infer<typeof siteContentSchema>;
