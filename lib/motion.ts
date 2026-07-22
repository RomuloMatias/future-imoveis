import type { Variants } from "framer-motion";

export const dropIn: Variants = {
  hidden: { opacity: 0, y: -56, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export const dropInReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.18 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
