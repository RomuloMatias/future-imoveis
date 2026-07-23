"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Ruler, Sparkles } from "lucide-react";
import { LotGallery } from "@/components/ui/lot-gallery";
import { RevealText } from "@/components/ui/reveal-text";
import { createWhatsAppLink } from "@/config/site";
import { dropIn, dropInReduced } from "@/lib/motion";
import type { Lot, LotsCatalogContent } from "@/lib/content-schema";

function getWhatsappLink(whatsappNumber: string, template: string, lotName: string) {
  const message = template.replaceAll("{lote}", lotName);
  return createWhatsAppLink(whatsappNumber, message);
}

export function LotsCatalog({
  content,
  lots,
  projectName,
  whatsappNumber,
}: {
  content: LotsCatalogContent;
  lots: Lot[];
  projectName: string;
  whatsappNumber: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="lotes" className="scroll-mt-24 border-y border-stone bg-surface py-20 mobile:py-24 tablet:py-28">
      <div className="mx-auto max-w-site px-5 mobile:px-7 tablet:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
          className="flex max-w-2xl flex-col gap-5"
        >
          <div className="flex items-center gap-2 text-red">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.16em]">{content.eyebrow}</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.045em] text-ink">
            <RevealText text={content.heading} />
          </h2>
          <p className="max-w-xl text-base leading-7 text-ink-soft mobile:text-lg">{content.paragraph}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.14 } },
          }}
          className="mt-10 grid grid-cols-1 gap-4 mobile:mt-12 tablet:grid-cols-2 tablet:gap-5 wide:grid-cols-3"
        >
          {lots.map((lot) => (
              <motion.article
                key={lot.id}
                variants={shouldReduceMotion ? dropInReduced : dropIn}
                whileHover={shouldReduceMotion ? undefined : { y: -12, scale: 1.015, rotateX: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                className={`group flex min-h-[25rem] h-full transform-gpu flex-col rounded-3xl border p-5 shadow-card [perspective:1000px] tablet:p-6 ${
                  lot.featured
                    ? "border-red bg-[#1f2022] text-[#f2f0ea]"
                    : "border-stone bg-paper text-ink"
                }`}
              >
              <div className="relative">
                <LotGallery lotName={lot.name} slides={lot.gallery} featured={lot.featured} />
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.14em] ${
                    lot.status === "Últimas unidades"
                      ? "bg-red text-cta-primary-text"
                      : "bg-paper/90 text-ink backdrop-blur"
                  }`}
                >
                  {lot.status}
                </span>
              </div>

              <div className="mt-6">
                <p className={`font-display text-[10px] font-bold uppercase tracking-[0.16em] ${lot.featured ? "text-[#a9abb2]" : "text-graphite-soft"}`}>
                  {projectName}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight tracking-[-0.035em]">
                  {lot.name}
                </h3>
              </div>

              <div className={`mt-6 flex items-center gap-3 border-y py-4 ${lot.featured ? "border-white/10" : "border-stone"}`}>
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${lot.featured ? "bg-white/10" : "bg-surface"}`}>
                  <Ruler className={`h-4 w-4 ${lot.featured ? "text-[#e8484d]" : "text-red"}`} aria-hidden="true" />
                </span>
                <div>
                  <p className={`font-display text-[9px] font-bold uppercase tracking-[0.15em] ${lot.featured ? "text-[#a9abb2]" : "text-graphite-soft"}`}>Metragem</p>
                  <p className="font-display text-xl font-extrabold tabular-nums">{lot.area}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className={`font-display text-[9px] font-bold uppercase tracking-[0.15em] ${lot.featured ? "text-[#a9abb2]" : "text-graphite-soft"}`}>Condições de pré-lançamento</p>
                <p className="mt-1 font-display text-3xl font-extrabold tracking-[-0.05em] tabular-nums">{lot.price}</p>
                <p className={`mt-1 text-sm ${lot.featured ? "text-[#b7b6b0]" : "text-ink-soft"}`}>{lot.payment}</p>
              </div>

              <div className={`mb-7 mt-5 flex items-center gap-2 text-sm ${lot.featured ? "text-[#f2f0ea]" : "text-ink-soft"}`}>
                <MapPin className={`h-4 w-4 shrink-0 ${lot.featured ? "text-[#e8484d]" : "text-red"}`} aria-hidden="true" />
                {lot.benefit}
              </div>

              <motion.a
                href={getWhatsappLink(whatsappNumber, content.whatsappMessageTemplate, lot.name)}
                target="_blank"
                rel="noreferrer"
                data-conversion-event={`Lead_${lot.name.replaceAll(" ", "_")}`}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="mt-auto flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red px-4 pt-0.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-cta-primary-text"
              >
                Quero este lote
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
              </motion.article>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-xs leading-5 text-graphite-soft">{content.footnote}</p>
      </div>
    </section>
  );
}
