"use client";

import { ArrowDown, ArrowUpRight, BadgeCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";
import { createWhatsAppLink } from "@/config/site";

const whatsappMessage = "Vim pelo site e gostaria de falar sobre os lotes disponíveis no Condomínio Marbello.";
const whatsappHref = createWhatsAppLink(whatsappMessage);

export function FinalCtaSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="escolher-lote" className="relative scroll-mt-24 overflow-hidden bg-inverse-surface py-20 mobile:py-24 tablet:py-28">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/media/hero/“Marbello” 👏🏼🔥 🏖️.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#18191a]/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#18191a]/55 via-transparent to-red/20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-site px-5 mobile:px-7 tablet:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-[#18191a]/75 px-6 py-12 text-center text-inverse-text shadow-2xl shadow-black/30 backdrop-blur-xl mobile:px-8 tablet:px-16 tablet:py-16"
        >
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-red">Condições de pré-lançamento</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.45rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.05em]">
              <RevealText text="Seu lote pode estar entre os disponíveis agora." />
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-inverse-muted">
              Consulte os lotes restantes e receba a condição correspondente a cada localização e metragem.
            </p>

            <motion.a
              href="#lotes"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.018, 1] }}
              transition={shouldReduceMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              data-conversion-event="View_available_lots_final"
              className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red px-5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-cta-primary-text mobile:mx-auto mobile:w-auto mobile:min-w-64"
            >
              Ver lotes disponíveis
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </motion.a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              data-conversion-event="WhatsApp_general_final"
              className="mt-6 inline-flex items-center gap-2 text-sm text-inverse-text underline decoration-white/30 underline-offset-4 transition-colors hover:text-red"
            >
              Prefere falar direto com um corretor?
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <p className="mt-8 flex items-center justify-center gap-2 text-xs text-inverse-muted">
              <BadgeCheck className="h-4 w-4 text-red" aria-hidden="true" />
              Atendimento direto pela Future Imóveis · CRECI 18705 J
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
