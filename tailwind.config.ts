import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-teal": "#002633",
        "accent-teal": "#3e6a7e",
        "chip-teal": "#517789",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "card-spring": "cardSpring 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      keyframes: {
        cardSpring: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
