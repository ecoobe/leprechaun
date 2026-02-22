import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /* Основной текст сайта (Manrope из next/font) */
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],

        /* Моно */
        mono: ["var(--font-mono)", "monospace"],

        /* Логотип */
        atelas: ["Atelas", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;