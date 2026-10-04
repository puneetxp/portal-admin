import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: "#FCF9F8",
        brand: {
          darkest: "#240017",
          dark: "#380024",
          sidebar: "#3B0227",
          primary: "#550036",
          maroon: "#760046",
          active: "#950250",
          accent: "#B20163",
          light: "#FDF2F7",
          subtle: "#FCE7F1",
        },
        gold: {
          light: "#FFF8D6",
          DEFAULT: "#D9B747",
          hover: "#C5A335",
          dark: "#9E7B1B",
          gradientStart: "#FFE26D",
          gradientMid: "#FDEB9D",
          gradientEnd: "#D9B747",
        },
        stroke: {
          DEFAULT: "#E8D8DE",
          muted: "rgba(219, 192, 201, 0.35)",
          border: "#EADEE2",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #550036 0%, #760046 50%, #950250 100%)",
        "brand-vibrant": "linear-gradient(135deg, #950250 0%, #B20163 100%)",
        "gold-gradient": "linear-gradient(135deg, #FFE26D 0%, #FDEB9D 50%, #D9B747 100%)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        soft: "0 4px 20px -2px rgba(85, 0, 54, 0.05)",
        highlight: "0 0 0 1px rgba(178, 1, 99, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
