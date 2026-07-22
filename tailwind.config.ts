import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "520px",
        tablet: "900px",
        wide: "1180px",
      },
      colors: {
        red: "var(--red)",
        "red-deep": "var(--red-deep)",
        graphite: "var(--graphite)",
        "graphite-soft": "var(--graphite-soft)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        stone: "var(--stone)",
        "stone-soft": "var(--stone-soft)",
        "cta-primary-text": "var(--cta-primary-text)",
        "inverse-surface": "var(--inverse-surface)",
        "inverse-text": "var(--inverse-text)",
        "inverse-muted": "var(--inverse-muted)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: {
        site: "1180px",
      },
      boxShadow: {
        card: "0 18px 50px rgba(27, 27, 26, 0.08)",
        "card-hover": "0 26px 70px rgba(27, 27, 26, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
