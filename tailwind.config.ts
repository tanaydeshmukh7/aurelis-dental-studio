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
        // Muted Luxury Darkened Palette Tokens
        stone: {
          DEFAULT: "#DCD4C8", // Main background
          light: "#E5DFD4",
          dark: "#CFC5B7",   // Secondary background
          muted: "#BEB2A2",  // Muted section background
          border: "#B8ADA0", // Light-surface borders
        },
        ivory: {
          DEFAULT: "#DCD4C8", // Muted stone (no bright washed-out F7F5F0)
          light: "#E5DFD4",
          dark: "#CFC5B7",
          warm: "#F0E9DF",   // Light text on dark
        },
        sand: {
          DEFAULT: "#CFC5B7", // Secondary background
          light: "#DCD4C8",
          dark: "#BEB2A2",   // Muted section
          border: "#B8ADA0",
        },
        sage: {
          DEFAULT: "#86A58C",
          dark: "#66866D",
          light: "#9BB3A0",
          subtle: "#3A3F3B",
          border: "#66866D",
        },
        champagne: {
          DEFAULT: "#B69A72",
          light: "#C7AF8A",
          dark: "#9E825A",
          subtle: "#3B362F",
        },
        espresso: {
          DEFAULT: "#28231F", // Main text on light
          light: "#514A42",   // Secondary text on light
          dark: "#24221F",    // Deep espresso background
          surface: "#302D28", // Dark section background
          border: "#514A41",  // Dark-surface borders
        },
        taupe: {
          DEFAULT: "#514A42", // Secondary text on light
          light: "#6A6157",
          dark: "#3D3730",
          muted: "#C6BCAE",   // Secondary text on dark
        },
        charcoal: {
          DEFAULT: "#302D28", // Dark section background
          surface: "#24221F", // Deep espresso background
          deep: "#1C1A17",
          border: "#514A41",
        },
        darkSection: {
          DEFAULT: "#302D28",
          deep: "#24221F",
          text: "#F0E9DF",
          secondary: "#C6BCAE",
          border: "#514A41",
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
