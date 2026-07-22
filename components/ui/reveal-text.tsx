"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealTextProps = {
  text: string;
  highlightWords?: string[];
  amount?: number;
  delay?: number;
  wordStagger?: number;
};

export function RevealText({ text, highlightWords, amount = 0.6, delay = 0, wordStagger = 0.045 }: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : wordStagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const word: Variants = {
    hidden: { y: shouldReduceMotion ? 0 : "115%" },
    visible: { y: "0%", transition: { duration: shouldReduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={container}
      className="inline"
      aria-label={text}
    >
      {words.map((rawWord, index) => {
        const isHighlighted = highlightWords?.includes(rawWord.replace(/[.,!?]/g, ""));
        return (
          <span key={index}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
              <motion.span variants={word} className={`inline-block ${isHighlighted ? "text-red" : ""}`}>
                {rawWord}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </motion.span>
  );
}
