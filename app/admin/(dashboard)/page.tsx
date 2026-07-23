import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sections = [
  { href: "/admin/geral", title: "Geral e WhatsApp", description: "Nome do site, CRECI, domínio, WhatsApp e SEO." },
  { href: "/admin/hero", title: "Topo (Hero)", description: "Título, texto, vídeo de fundo e cartões do topo." },
  { href: "/admin/lotes", title: "Lotes", description: "Textos da vitrine e cadastro de lotes com fotos." },
  { href: "/admin/infraestrutura", title: "Infraestrutura", description: "Experiências de lazer e itens técnicos." },
  { href: "/admin/condicoes", title: "Condições", description: "Números da região e bloco de financiamento." },
  { href: "/admin/cta-final", title: "Chamada final", description: "Texto e vídeo da última seção da página." },
  { href: "/admin/rastreamento", title: "Rastreamento", description: "GTM, GA4, Google Ads, Meta Pixel e Microsoft Clarity." },
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">
        Painel de conteúdo
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
        Escolha uma seção para editar. As alterações aparecem no site assim que
        forem salvas.
      </p>

      <div className="mt-8 grid gap-4 mobile:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-stone bg-surface p-5 shadow-card transition-transform hover:-translate-y-0.5"
          >
            <div>
              <h2 className="font-display text-sm font-extrabold uppercase tracking-[-0.01em] text-ink">
                {section.title}
              </h2>
              <p className="mt-1 text-sm leading-5 text-ink-soft">{section.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-red transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
