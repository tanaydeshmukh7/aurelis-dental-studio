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
        ivory: {
          DEFAULT: "#F7F5F0",
          light: "#FAF9F6",
          dark: "#EFECE5",
        },
        sand: {
          DEFAULT: "#E9E2D7",
          light: "#F0EAE0",
          dark: "#DDD5C7",
        },
        sage: {
          DEFAULT: "#86A58C",
          dark: "#6F8E75",
          light: "#A1BCAB",
          subtle: "#EDF3EE",
          border: "#C4D5C8",
        },
        champagne: {
          DEFAULT: "#B69A72",
          light: "#CDB694",
          dark: "#9E825A",
          subtle: "#F5EFE6",
        },
        espresso: {
          DEFAULT: "#28231F",
          light: "#3A332E",
          dark: "#1B1714",
        },
        taupe: {
          DEFAULT: "#82786E",
          light: "#9A9086",
          dark: "#6A6157",
        },
        charcoal: {
          DEFAULT: "#242522",
          surface: "#2D2E2A",
          deep: "#1C1D1A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "Helvetica Neue", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.2em",
        wide: "0.1em",
        tighter: "-0.03em",
      },
      lineHeight: {
        snugger: "1.15",
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(40, 35, 31, 0.04)",
        card: "0 10px 30px -4px rgba(40, 35, 31, 0.06)",
        float: "0 20px 40px -10px rgba(40, 35, 31, 0.08)",
        sage: "0 8px 24px -4px rgba(134, 165, 140, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
