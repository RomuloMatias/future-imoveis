"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Início" },
  { href: "/admin/geral", label: "Geral e WhatsApp" },
  { href: "/admin/hero", label: "Topo (Hero)" },
  { href: "/admin/lotes", label: "Lotes" },
  { href: "/admin/infraestrutura", label: "Infraestrutura" },
  { href: "/admin/condicoes", label: "Condições" },
  { href: "/admin/cta-final", label: "Chamada final" },
  { href: "/admin/rastreamento", label: "Rastreamento" },
  { href: "/admin/senha", label: "Minha senha" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-soft text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 tablet:flex-row tablet:gap-8 tablet:px-6 tablet:py-10">
        <aside className="tablet:w-64 tablet:shrink-0">
          <div className="rounded-2xl border border-stone bg-surface p-4 shadow-card tablet:sticky tablet:top-10">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-ink">
              Future Imóveis
            </p>
            <p className="mt-1 text-xs text-ink-soft">Painel de conteúdo</p>

            <nav className="mt-5 flex flex-row flex-wrap gap-1.5 tablet:flex-col">
              {navItems.map((item) => {
                const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "bg-red text-cta-primary-text" : "text-ink-soft hover:bg-stone-soft hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex flex-col gap-2 border-t border-stone pt-4">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-red"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Ver site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-red"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sair
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
