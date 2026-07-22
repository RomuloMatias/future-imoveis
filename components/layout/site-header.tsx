"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { createWhatsAppLink } from "@/config/site";

const navItems = [
  { label: "Lotes", href: "#lotes" },
  { label: "Infraestrutura", href: "#infraestrutura" },
  { label: "Condições", href: "#condicoes" },
  { label: "Dúvidas", href: "#faq" },
];

export function SiteHeader() {
  const shouldReduceMotion = useReducedMotion();
  const whatsappHref = createWhatsAppLink("Olá, quero conhecer os lotes do Condomínio Marbello.");

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 tablet:px-6 tablet:pt-4"
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-site items-center justify-between rounded-2xl border-[var(--header-glass-border)] bg-[var(--header-glass-bg)] px-4 text-[var(--header-glass-text)] shadow-[0_16px_45px_rgba(5,10,18,0.24)] backdrop-blur-2xl backdrop-saturate-150 tablet:px-6"
      >
        <a href="#inicio" className="flex min-h-11 items-center gap-2.5" aria-label="Future Imóveis — início">
          <BrandMark />
          <span className="hidden leading-none mobile:block">
            <strong className="block font-display text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--header-glass-text)]">
              <span className="text-red">Future</span> Imóveis
            </strong>
            <span className="mt-1 block font-display text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--header-glass-muted)]">
              CRECI 18705 J
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 tablet:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={shouldReduceMotion ? undefined : { y: -2, color: "#d5272c" }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="flex min-h-11 items-center font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--header-glass-muted)]"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#d5272c] px-4 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-white tablet:px-5"
            aria-label="Falar com um corretor pelo WhatsApp"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden mobile:inline">Falar com corretor</span>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
