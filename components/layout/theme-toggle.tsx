"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getResolvedTheme(): Theme {
  const explicitTheme = document.documentElement.dataset.theme;
  if (explicitTheme === "light" || explicitTheme === "dark") return explicitTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const shouldReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("future-theme");

    setTheme(getResolvedTheme());
    setMounted(true);

    if (savedTheme === "light" || savedTheme === "dark") return;

    const syncWithSystem = () => setTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", syncWithSystem);
    return () => mediaQuery.removeEventListener("change", syncWithSystem);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("future-theme", nextTheme);
    setTheme(nextTheme);
  }

  const isDark = mounted ? theme === "dark" : false;
  const actionLabel = isDark ? "Ativar modo claro" : "Ativar modo escuro";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.04 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      aria-label={actionLabel}
      title={actionLabel}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border-[var(--header-glass-border)] bg-[var(--header-glass-toggle-bg)] text-[var(--header-glass-text)] transition-colors hover:bg-[var(--header-glass-toggle-hover)]"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={shouldReduceMotion ? false : { opacity: 0, rotate: -30, scale: 0.65 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
        aria-hidden="true"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.span>
      <span className="sr-only">{actionLabel}</span>
    </motion.button>
  );
}
