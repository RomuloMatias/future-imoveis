"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin, ShieldCheck, Waves } from "lucide-react";
import { useRef } from "react";
import { RevealText } from "@/components/ui/reveal-text";
import { parseHighlightedText } from "@/lib/highlight";
import type { HeroContent } from "@/lib/content-schema";

// Adapted from 21st.dev's public FinancialHero composition by Lavi Katiyar:
// https://21st.dev/community/components/lavikatiyar/hero-section/default
export function HeroSection({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const heading = parseHighlightedText(content.heading);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 72]);

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-paper pt-28 tablet:pt-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-20 hidden w-[46%] bg-[#202124] tablet:block"
      />
      <div
        aria-hidden="true"
        className="absolute right-[36%] top-0 -z-10 hidden h-full w-[18%] -skew-x-[8deg] bg-red tablet:block"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-[24rem] top-[9%] -z-10 h-[42rem] w-[70rem] text-stone/55 tablet:-left-[16rem]"
        viewBox="0 0 1100 660"
        fill="none"
      >
        <ellipse cx="550" cy="330" rx="500" ry="224" stroke="currentColor" strokeWidth="1.4" />
      </svg>

      <div className="mx-auto grid w-full max-w-site grid-cols-1 items-center gap-12 px-5 pb-20 mobile:px-7 tablet:grid-cols-12 tablet:gap-8 tablet:px-6 tablet:pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.09, delayChildren: 0.08 }}
          className="tablet:col-span-7 tablet:pr-8 wide:col-span-6"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.42 }}
            className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-stone bg-surface/80 px-4 shadow-sm backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4 text-red" aria-hidden="true" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.13em] text-graphite">
              {content.badgeText}
            </span>
          </motion.div>

          <motion.h1
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.48 }}
            className="max-w-[15ch] font-display text-[clamp(2.55rem,4.25vw,4rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.05em] text-ink"
          >
            <RevealText
              text={heading.text}
              highlightWords={heading.highlightWords}
              wordStagger={0.055}
              delay={0.15}
            />
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.46 }}
            className="mt-6 max-w-xl text-base leading-7 text-ink-soft mobile:text-lg"
          >
            {content.paragraph}
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.44 }}
            className="mt-8 flex flex-col gap-3 mobile:flex-row mobile:items-center"
          >
            <motion.a
              href={content.primaryCtaHref}
              data-tracking-event="view_lots"
              data-cta-location="hero"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="group flex min-h-14 items-center justify-center gap-3 rounded-xl bg-red px-6 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_18px_45px_rgba(213,39,44,0.25)] mobile:w-fit"
            >
              {content.primaryCtaText}
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.a>

            <div className="flex min-h-14 items-center gap-3 px-1 mobile:px-4">
              <MapPin className="h-5 w-5 text-red" aria-hidden="true" />
              <span className="text-sm text-ink-soft">
                {content.locationLabel}{" "}
                <strong className="block font-display text-xs uppercase text-ink">{content.locationHighlight}</strong>
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: visualY }}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[25rem] tablet:col-span-5 tablet:min-h-[35rem] wide:col-span-6"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/15 bg-[#292a2d] shadow-[0_32px_90px_rgba(0,0,0,0.24)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Vídeo aéreo do Condomínio Marbello na Praia da Lagoinha"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={content.videoUrl} type="video/mp4" />
            </video>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />
            <svg
              viewBox="0 0 700 760"
              role="img"
              aria-label="Ilustração aérea do Condomínio Marbello próximo ao litoral de Lagoinha"
              className="hidden"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="sea" x1="0" y1="0" x2="0.8" y2="1">
                  <stop stopColor="#54636a" />
                  <stop offset="1" stopColor="#25343a" />
                </linearGradient>
                <linearGradient id="sand" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#d8cfb6" />
                  <stop offset="1" stopColor="#9a8e72" />
                </linearGradient>
                <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#6f765e" />
                  <stop offset="1" stopColor="#343c31" />
                </linearGradient>
              </defs>
              <rect width="700" height="760" fill="url(#sea)" />
              <path d="M-40 245C145 169 255 292 396 246C535 201 607 97 760 110V760H-40Z" fill="url(#sand)" />
              <path d="M-30 312C135 244 269 355 413 301C548 251 631 175 750 180V760H-30Z" fill="url(#land)" />
              <path d="M-10 272C155 210 270 326 410 272C545 220 626 139 735 150" fill="none" stroke="#f2f0ea" strokeOpacity=".8" strokeWidth="7" />
              <g transform="translate(110 352) rotate(-8 240 165)">
                <rect x="0" y="0" width="480" height="330" rx="24" fill="#202124" stroke="#f2f0ea" strokeOpacity=".22" />
                <path d="M24 24H456V306H24Z" fill="#cbc9c0" fillOpacity=".12" />
                <path d="M42 50H438M42 112H438M42 174H438M42 236H438M105 30V286M185 30V286M265 30V286M345 30V286" stroke="#f2f0ea" strokeOpacity=".28" strokeWidth="3" />
                <rect x="197" y="119" width="135" height="86" rx="43" fill="#496d79" stroke="#f2f0ea" strokeOpacity=".7" strokeWidth="4" />
                <circle cx="357" cy="161" r="37" fill="#496d79" stroke="#f2f0ea" strokeOpacity=".7" strokeWidth="4" />
                <rect x="56" y="205" width="105" height="58" rx="5" fill="#96594d" />
                <path d="M65 252L150 215M65 215L150 252" stroke="#f2f0ea" strokeOpacity=".6" strokeWidth="3" />
                <g fill="#d5272c">
                  <circle cx="68" cy="69" r="8" /><circle cx="152" cy="143" r="8" /><circle cx="387" cy="75" r="8" /><circle cx="410" cy="260" r="8" />
                </g>
              </g>
              <rect width="700" height="760" fill="url(#shade)" opacity=".12" />
            </svg>

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-white">
              <div className="rounded-full border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-md">
                <span className="font-display text-[9px] font-bold uppercase tracking-[0.18em]">{content.videoBadgeText}</span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-md">
                <Waves className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-[#191a1c]/88 p-4 text-[#f2f0ea] shadow-xl backdrop-blur-xl mobile:inset-x-5 mobile:bottom-5 mobile:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-[9px] font-bold uppercase tracking-[0.18em] text-[#a9abb2]">{content.floatingEyebrow}</p>
                  <p className="mt-1 font-display text-xl font-extrabold uppercase tracking-tight">{content.floatingTitle}</p>
                </div>
                <span className="rounded-full bg-[#d5272c] px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-wider">{content.floatingStatus}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-[#b7b6b0]">
                <span>{content.floatingFooterLeft}</span>
                <span className="font-display font-bold uppercase text-white">{content.floatingFooterRight}</span>
              </div>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-24 rounded-2xl border border-stone/70 bg-surface p-3 shadow-card mobile:right-5 mobile:top-28 tablet:-right-12 tablet:top-28"
          >
            <p className="font-display text-[9px] font-bold uppercase tracking-[0.14em] text-graphite-soft">Localização</p>
            <p className="mt-1 font-display text-sm font-extrabold uppercase text-ink">{content.floatingLocationBadge}</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#lotes"
        data-tracking-event="view_lots"
        data-cta-location="hero_scroll_indicator"
        aria-label="Ir para os lotes disponíveis"
        animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 hidden min-h-11 -translate-x-1/2 items-center justify-center text-graphite-soft tablet:flex"
      >
        <ArrowDown className="h-5 w-5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
