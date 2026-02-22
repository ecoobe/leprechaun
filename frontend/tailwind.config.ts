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
        /* Основной текст сайта */
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],

        /* Моно */
        mono: ["var(--font-mono)", "monospace"],

        /* Логотип */
        atelas: ["var(--font-atelas)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;