"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useState } from "react";

export type LotGallerySlide = {
  label: string;
  description: string;
  src?: string;
  alt?: string;
};

type LotGalleryProps = {
  lotName: string;
  slides: LotGallerySlide[];
  featured?: boolean;
};

export function LotGallery({ lotName, slides, featured = false }: LotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const total = slides.length;

  const goTo = (nextIndex: number) => {
    setActiveIndex((nextIndex + total) % total);
  };

  if (total === 0) {
    return (
      <section
        aria-label={`Galeria do ${lotName}`}
        className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border ${
          featured ? "border-white/10 bg-[#29292b]" : "border-stone bg-stone-soft"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${featured ? "bg-white/10 text-red" : "bg-paper text-red"}`}>
            <Images className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className={`text-xs ${featured ? "text-[#a9abb2]" : "text-graphite-soft"}`}>Fotos em breve</p>
        </div>
      </section>
    );
  }

  const activeSlide = slides[activeIndex] ?? slides[0];
  const hasImage = Boolean(activeSlide.src && !failedImages.includes(activeSlide.src));

  return (
    <section
      aria-label={`Galeria do ${lotName}`}
      aria-roledescription="carrossel"
      className={`relative aspect-[4/3] overflow-hidden rounded-2xl border ${
        featured ? "border-white/10 bg-[#29292b]" : "border-stone bg-stone-soft"
      }`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(activeIndex - 1);
        if (event.key === "ArrowRight") goTo(activeIndex + 1);
      }}
      tabIndex={0}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeSlide.label}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, x: -14 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {hasImage ? (
            <img
              src={activeSlide.src}
              alt={activeSlide.alt ?? `${activeSlide.label} — ${lotName}`}
              className="h-full w-full object-cover"
              onError={() => setFailedImages((current) => [...current, activeSlide.src!])}
            />
          ) : (
            <div className="relative flex h-full w-full overflow-hidden p-5">
              <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full border ${featured ? "border-white/10" : "border-stone"}`} />
              <div className={`absolute -bottom-16 left-8 h-40 w-64 rotate-[-18deg] rounded-[50%] border ${featured ? "border-white/10" : "border-stone"}`} />
              <div className="relative mt-auto max-w-[15rem]">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${featured ? "bg-white/10 text-red" : "bg-paper text-red"}`}>
                  <Images className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className={`mt-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] ${featured ? "text-[#a9abb2]" : "text-graphite-soft"}`}>
                  {activeSlide.label}
                </p>
                <p className={`mt-1 text-sm leading-5 ${featured ? "text-[#f2f0ea]" : "text-ink"}`}>{activeSlide.description}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
        <div className={`rounded-full px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.12em] backdrop-blur ${featured ? "bg-[#18191a]/70 text-[#f2f0ea]" : "bg-paper/85 text-ink"}`}>
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Foto anterior"
            className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red ${featured ? "border-white/20 bg-[#18191a]/70 text-white hover:bg-[#18191a]" : "border-paper bg-paper/85 text-ink hover:bg-paper"}`}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Próxima foto"
            className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red ${featured ? "border-white/20 bg-[#18191a]/70 text-white hover:bg-[#18191a]" : "border-paper bg-paper/85 text-ink hover:bg-paper"}`}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="absolute left-5 top-5 flex gap-2.5" aria-label="Selecionar foto">
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Mostrar ${slide.label}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red ${index === activeIndex ? "w-6 bg-red" : featured ? "w-1.5 bg-white/50 hover:bg-white" : "w-1.5 bg-ink/35 hover:bg-ink/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
