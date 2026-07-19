import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FEFCF8",
          100: "#FBF6EC",
          200: "#F5EBD8",
          300: "#EDDCBE",
        },
        blush: {
          100: "#F7E9E3",
          200: "#EFD4C8",
          300: "#E3B8A6",
          400: "#D89C88",
        },
        sage: {
          100: "#E9EFE3",
          200: "#D2E0C6",
          300: "#B7CEA5",
          400: "#93B37D",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(120, 90, 60, 0.18)",
        card: "0 8px 24px -8px rgba(120, 90, 60, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
