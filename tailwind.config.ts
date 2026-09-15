import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          dark: "#0E0D0C",
          surface: "#171614",
          border: "rgba(246, 243, 236, 0.12)",
          hairline: "rgba(176, 141, 87, 0.25)",
          white: "#F6F3EC",
          muted: "#A39E93",
          brass: "#B08D57",
          "brass-hover": "#C8A369",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.25em",
        wide: "0.15em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.25, 1, 0.5, 1)",
        gallery: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
