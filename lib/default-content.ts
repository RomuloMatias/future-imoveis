import type {
  GallerySlide,
  Lot,
  SiteContent,
} from "@/lib/content-schema";

/**
 * Conteúdo de hoje, fiel ao que está hardcoded nas seções. Serve de seed: na
 * primeira execução (antes de a cliente editar qualquer coisa no admin) o
 * site continua exatamente como está.
 */

const galleryPlaceholders: GallerySlide[] = [
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

const defaultLots: Lot[] = [
  {
    id: "lot-1",
    name: "Lote 14 — Quadra B",
    area: "200 m²",
    price: "R$ 59.900",
    payment: "ou parcelas a partir de R$ 540/mês",
    status: "Disponível",
    benefit: "A 2 min do mar",
    featured: false,
    gallery: galleryPlaceholders,
  },
  {
    id: "lot-2",
    name: "Lote 06 — Quadra D",
    area: "240 m²",
    price: "R$ 68.900",
    payment: "entrada facilitada + saldo direto",
    status: "Disponível",
    benefit: "De esquina, maior frente",
    featured: true,
    gallery: galleryPlaceholders,
  },
  {
    id: "lot-3",
    name: "Lote 22 — Quadra A",
    area: "180 m²",
    price: "R$ 540/mês",
    payment: "condições de pré-lançamento",
    status: "Últimas unidades",
    benefit: "Próximo à área de lazer",
    featured: false,
    gallery: galleryPlaceholders,
  },
];

const heroVideoUrl = "/media/hero/“Marbello” 👏🏼🔥 🏖️.mp4";

export const defaultContent: SiteContent = {
  settings: {
    siteName: "Future Imóveis",
    creci: "18705 J",
    domain: "https://futureimoveisce.com.br",
    projectName: "Condomínio Marbello",
    whatsappNumber: "5585999999999",
    headerCtaText: "Falar com corretor",
    whatsappMessageDefault: "Olá, quero conhecer os lotes do Condomínio Marbello.",
    seoTitle: "Lotes à venda em Paraipaba-CE | Future Imóveis",
    seoDescription:
      "Lotes disponíveis no Condomínio Marbello, próximo à Praia da Lagoinha, com financiamento direto e sem burocracia bancária.",
  },
  hero: {
    badgeText: "+8 loteamentos entregues no Ceará",
    heading: "Seu lote na *Praia da Lagoinha* está disponível agora.",
    paragraph:
      "Condomínio Marbello: lazer completo e financiamento direto, sem burocracia bancária. Escolha seu lote e fale com um corretor hoje.",
    primaryCtaText: "Ver lotes disponíveis",
    primaryCtaHref: "#lotes",
    locationLabel: "Paraipaba, CE",
    locationHighlight: "a 2 min do mar",
    videoUrl: heroVideoUrl,
    videoBadgeText: "Condomínio Marbello",
    floatingLocationBadge: "Lagoinha · CE",
    floatingEyebrow: "Pré-lançamento",
    floatingTitle: "Parcelas abaixo de R$ 600",
    floatingStatus: "Disponível",
    floatingFooterLeft: "Financiamento direto",
    floatingFooterRight: "Sem banco",
  },
  lotsCatalog: {
    eyebrow: "Estoque real disponível",
    heading: "Escolha o lote que faz sentido para você.",
    paragraph:
      "Consulte as condições de cada lote e fale direto com o corretor responsável pelo Condomínio Marbello.",
    footnote:
      "Valores e disponibilidade sujeitos a atualização. Confirme as condições diretamente com o corretor.",
    whatsappMessageTemplate: "Vim pelo site e gostaria de saber mais sobre o {lote}.",
  },
  lots: defaultLots,
  infrastructure: {
    eyebrow: "Para aproveitar fora do lote",
    heading: "Estrutura para viver a Lagoinha no seu ritmo.",
    paragraph:
      "Cada área foi pensada para acrescentar uso real ao condomínio, do lazer à rotina de quem chega para ficar.",
    experiences: [
      {
        title: "Piscina e spa",
        description: "Deck, piscina adulta e espaço para desacelerar depois da praia.",
        image: "/media/infraestrutura/piscina-e-spa.webp",
        icon: "waves",
      },
      {
        title: "Beach tennis",
        description: "Quadra de areia integrada ao paisagismo do condomínio.",
        image: "/media/infraestrutura/beach-tennis.webp",
        icon: "route",
      },
      {
        title: "Áreas gourmet",
        description: "Dois espaços cobertos para encontros e refeições ao ar livre.",
        image: "/media/infraestrutura/areas-gourmet.webp",
        icon: "utensils",
      },
    ],
    technicalEyebrow: "Infraestrutura essencial",
    technicalHeading: "Planejamento que também aparece nos detalhes.",
    technicalFeatures: [
      { title: "Portaria controlada", description: "Guarita, cancela e acesso organizado.", icon: "lock" },
      { title: "Vagas para visitantes", description: "Estacionamento com vagas demarcadas.", icon: "car" },
      { title: "Paisagismo planejado", description: "Árvores de grande porte previstas em projeto.", icon: "trees" },
      { title: "Vias internas", description: "Circulação interna e calçamento planejados.", icon: "route" },
      { title: "Muramento perimetral", description: "Limite físico definido em todo o condomínio.", icon: "fence" },
      { title: "Água e iluminação", description: "Diretrizes técnicas para a infraestrutura essencial.", icon: "droplets" },
    ],
    bannerTitle: "Planejamento com validação ambiental",
    bannerDescription:
      "Projeto georreferenciado e assessoria ambiental especializada para orientar a implantação.",
  },
  proof: {
    eyebrow: "Escala que valoriza a região",
    heading: "Um lote dentro do próximo vetor do litoral oeste.",
    paragraph:
      "O Condomínio Marbello está inserido na região das Aldeias da Lagoinha, um projeto de escala que amplia o potencial de uso e valorização do entorno.",
    statistics: [
      { value: 100, prefix: "US$ ", suffix: " mi", label: "em investimento previsto para a região" },
      { value: 12, prefix: "", suffix: " km", label: "de orla no litoral oeste" },
      { value: 1000, prefix: "", suffix: " ha", label: "de área no megaprojeto" },
    ],
    financingEyebrow: "Condição para sair do plano",
    financingHeading: "Financiamento direto, sem depender de banco.",
    financingParagraph: "Escolha o lote e consulte uma condição de entrada e saldo direto com a construtora.",
    priceLabel: "Parcelas a partir de",
    priceValue: "R$ 540",
    priceNote: "por mês, conforme lote e condição comercial.",
    bullets: [
      "Atendimento direto com corretor",
      "Sem burocracia bancária",
      "Condições a confirmar por lote",
    ],
  },
  finalCta: {
    eyebrow: "Condições de pré-lançamento",
    heading: "Seu lote pode estar entre os disponíveis agora.",
    paragraph: "Consulte os lotes restantes e receba a condição correspondente a cada localização e metragem.",
    primaryCtaText: "Ver lotes disponíveis",
    secondaryCtaText: "Prefere falar direto com um corretor?",
    footerText: "Atendimento direto pela Future Imóveis · CRECI 18705 J",
    whatsappMessage:
      "Vim pelo site e gostaria de falar sobre os lotes disponíveis no Condomínio Marbello.",
    videoUrl: heroVideoUrl,
  },
};
