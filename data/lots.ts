import type { LotGallerySlide } from "@/components/ui/lot-gallery";

const galleryPlaceholders: LotGallerySlide[] = [
  {
    label: "Vista do lote",
    description: "Imagem ilustrativa temporária.",
    src: "/media/lotes/placeholders/vista-do-lote.jpg",
    alt: "Ilustração temporária de uma vista de lote perto do litoral",
  },
  {
    label: "Implantação",
    description: "Imagem ilustrativa temporária.",
    src: "/media/lotes/placeholders/implantacao.jpg",
    alt: "Ilustração temporária da implantação de lotes",
  },
  {
    label: "Entorno",
    description: "Imagem ilustrativa temporária.",
    src: "/media/lotes/placeholders/entorno.jpg",
    alt: "Ilustração temporária do entorno litorâneo",
  },
];

/** Dados de vitrine. Devem refletir o estoque e a condição comercial vigentes. */
export const lots = [
  {
    id: "Lote 14 — Quadra B",
    area: "200 m²",
    price: "R$ 59.900",
    payment: "ou parcelas a partir de R$ 540/mês",
    status: "Disponível",
    benefit: "A 2 min do mar",
    featured: false,
    gallery: galleryPlaceholders,
  },
  {
    id: "Lote 06 — Quadra D",
    area: "240 m²",
    price: "R$ 68.900",
    payment: "entrada facilitada + saldo direto",
    status: "Disponível",
    benefit: "De esquina, maior frente",
    featured: true,
    gallery: galleryPlaceholders,
  },
  {
    id: "Lote 22 — Quadra A",
    area: "180 m²",
    price: "R$ 540/mês",
    payment: "condições de pré-lançamento",
    status: "Últimas unidades",
    benefit: "Próximo à área de lazer",
    featured: false,
    gallery: galleryPlaceholders,
  },
] as const;
