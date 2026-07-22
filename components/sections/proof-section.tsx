"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck, Building2, HandCoins, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type StatisticProps = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
};

function Statistic({ value, prefix = "", suffix, label }: StatisticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <div ref={ref} className="border-l border-stone pl-5 tablet:pl-6">
      <p className="font-display text-[clamp(2.15rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.065em] text-ink tabular-nums">
        {prefix}{displayValue.toLocaleString("pt-BR")}{suffix}
      </p>
      <p className="mt-3 max-w-36 text-sm leading-5 text-ink-soft">{label}</p>
    </div>
  );
}

export function ProofSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="condicoes" className="scroll-mt-24 border-y border-stone bg-surface py-20 mobile:py-24 tablet:py-28">
      <div className="mx-auto max-w-site px-5 mobile:px-7 tablet:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-red">Escala que valoriza a região</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.045em] text-ink">
            Um lote dentro do próximo vetor do litoral oeste.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft mobile:text-lg">
            O Condomínio Marbello está inserido na região das Aldeias da Lagoinha, um projeto de escala que amplia o potencial de uso e valorização do entorno.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 mobile:grid-cols-3 mobile:gap-4 tablet:mt-12 tablet:gap-8">
          <Statistic value={100} prefix="US$ " suffix=" mi" label="em investimento previsto para a região" />
          <Statistic value={12} suffix=" km" label="de orla no litoral oeste" />
          <Statistic value={1000} suffix=" ha" label="de área no megaprojeto" />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          className="mt-14 overflow-hidden rounded-3xl bg-inverse-surface p-6 text-inverse-text mobile:p-8 tablet:mt-20 tablet:grid tablet:grid-cols-[minmax(0,1fr)_minmax(17rem,0.72fr)] tablet:gap-12 tablet:p-10"
        >
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-red">
              <HandCoins className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-6 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-inverse-muted">Condição para sair do plano</p>
            <h3 className="mt-3 max-w-xl font-display text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.045em]">
              Financiamento direto, sem depender de banco.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-inverse-muted">
              Escolha o lote e consulte uma condição de entrada e saldo direto com a construtora.
            </p>
          </div>

          <div className="mt-10 border-t border-white/10 pt-7 tablet:mt-0 tablet:border-l tablet:border-t-0 tablet:pl-10 tablet:pt-0">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-inverse-muted">Parcelas a partir de</p>
            <p className="mt-2 font-display text-[clamp(3rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-0.07em] tabular-nums text-red">R$ 540</p>
            <p className="mt-2 text-sm text-inverse-muted">por mês, conforme lote e condição comercial.</p>
            <div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm text-inverse-text">
              <p className="flex items-center gap-3"><BadgeCheck className="h-4 w-4 shrink-0 text-red" aria-hidden="true" /> Atendimento direto com corretor</p>
              <p className="flex items-center gap-3"><Landmark className="h-4 w-4 shrink-0 text-red" aria-hidden="true" /> Sem burocracia bancária</p>
              <p className="flex items-center gap-3"><Building2 className="h-4 w-4 shrink-0 text-red" aria-hidden="true" /> Condições a confirmar por lote</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
