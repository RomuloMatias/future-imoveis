"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CarFront,
  Droplets,
  Fence,
  LockKeyhole,
  Route,
  ShieldCheck,
  Trees,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    title: "Piscina e spa",
    description: "Deck, piscina adulta e espaço para desacelerar depois da praia.",
    src: "/media/infraestrutura/piscina-e-spa.webp",
    alt: "Render da piscina e spa do Condomínio Marbello em Paraipaba",
    icon: Waves,
    className: "aspect-[4/3]",
  },
  {
    title: "Beach tennis",
    description: "Quadra de areia integrada ao paisagismo do condomínio.",
    src: "/media/infraestrutura/beach-tennis.webp",
    alt: "Render da quadra de beach tennis do Condomínio Marbello",
    icon: Route,
    className: "aspect-[4/3]",
  },
  {
    title: "Áreas gourmet",
    description: "Dois espaços cobertos para encontros e refeições ao ar livre.",
    src: "/media/infraestrutura/areas-gourmet.webp",
    alt: "Render das áreas gourmet do Condomínio Marbello",
    icon: UtensilsCrossed,
    className: "aspect-[4/3]",
  },
];

const technicalFeatures = [
  { title: "Portaria controlada", description: "Guarita, cancela e acesso organizado.", icon: LockKeyhole },
  { title: "Vagas para visitantes", description: "Estacionamento com vagas demarcadas.", icon: CarFront },
  { title: "Paisagismo planejado", description: "Árvores de grande porte previstas em projeto.", icon: Trees },
  { title: "Vias internas", description: "Circulação interna e calçamento planejados.", icon: Route },
  { title: "Muramento perimetral", description: "Limite físico definido em todo o condomínio.", icon: Fence },
  { title: "Água e iluminação", description: "Diretrizes técnicas para a infraestrutura essencial.", icon: Droplets },
];

function ExperienceCard({ experience }: { experience: (typeof experiences)[number] }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const Icon = experience.icon;

  return (
    <article className={`group relative min-h-72 overflow-hidden rounded-3xl border border-stone bg-stone-soft ${experience.className}`}>
      {!imageUnavailable && (
        <img
          src={experience.src}
          alt={experience.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setImageUnavailable(true)}
        />
      )}
      <div className={`absolute inset-0 ${imageUnavailable ? "bg-[radial-gradient(circle_at_85%_10%,rgba(213,39,44,0.18),transparent_36%),linear-gradient(135deg,var(--stone-soft),var(--paper))]" : "bg-gradient-to-t from-[#18191a]/90 via-[#18191a]/20 to-transparent"}`} />

      <div className="relative flex h-full flex-col justify-end p-6 tablet:p-7">
        {imageUnavailable && (
          <span className="mb-auto flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-red shadow-card">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
        <div className={imageUnavailable ? "text-ink" : "text-white"}>
          {imageUnavailable && (
            <p className="mb-2 font-display text-[9px] font-bold uppercase tracking-[0.15em] text-graphite-soft">Render em breve</p>
          )}
          <h3 className="font-display text-xl font-extrabold uppercase tracking-[-0.035em]">{experience.title}</h3>
          <p className={`mt-2 max-w-md text-sm leading-6 ${imageUnavailable ? "text-ink-soft" : "text-white/80"}`}>{experience.description}</p>
        </div>
      </div>
    </article>
  );
}

export function InfrastructureSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="infraestrutura" className="scroll-mt-24 bg-paper py-20 mobile:py-24 tablet:py-28">
      <div className="mx-auto max-w-site px-5 mobile:px-7 tablet:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
          className="grid gap-6 tablet:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)] tablet:items-end tablet:gap-12"
        >
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-red">Para aproveitar fora do lote</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.045em] text-ink">
              Estrutura para viver a Lagoinha no seu ritmo.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-ink-soft">
            Cada área foi pensada para acrescentar uso real ao condomínio, do lazer à rotina de quem chega para ficar.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } } }}
          className="mt-10 grid gap-4 tablet:grid-cols-3 tablet:gap-5"
        >
          {experiences.map((experience) => (
            <motion.div
              key={experience.title}
              variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: "easeOut" }}
            >
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 border-t border-stone pt-10 tablet:mt-20 tablet:pt-12">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-red">Infraestrutura essencial</p>
            <h3 className="font-display text-[clamp(1.55rem,3vw,2.25rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.04em] text-ink">
              Planejamento que também aparece nos detalhes.
            </h3>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 } } }}
            className="mt-8 grid gap-3 mobile:grid-cols-2 tablet:grid-cols-3 tablet:gap-4"
          >
            {technicalFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  variants={{ hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }, visible: { opacity: 1, scale: 1 } }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: "easeOut" }}
                  className="rounded-2xl border border-stone bg-surface p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-soft text-red">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h4 className="mt-5 font-display text-sm font-extrabold uppercase tracking-[-0.02em] text-ink">{feature.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{feature.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.36, ease: "easeOut" }}
          className="mt-8 flex flex-col gap-4 rounded-2xl border border-stone bg-surface p-5 mobile:flex-row mobile:items-center mobile:gap-5 tablet:mt-10 tablet:p-6"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red text-cta-primary-text">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[-0.02em] text-ink">Planejamento com validação ambiental</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">Projeto georreferenciado e assessoria ambiental especializada para orientar a implantação.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
