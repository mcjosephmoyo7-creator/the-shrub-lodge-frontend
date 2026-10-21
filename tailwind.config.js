const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f2f5f2",
          100: "#dfe7e1",
          200: "#bfcfc4",
          300: "#96b09f",
          400: "#6a8c76",
          500: "#4b6f57",
          600: "#395843",
          700: "#2e4636",
          800: "#263a2c",
          900: "#1e2f24",
          950: "#101a13",
        },
        gold: {
          50: "#fbf7ee",
          100: "#f5ebd3",
          200: "#ead3a3",
          300: "#ddb86d",
          400: "#d3a04a",
          500: "#c8893a",
          600: "#ad6c2f",
          700: "#8f5229",
          800: "#754227",
          900: "#613824",
        },
        sand: {
          50: "#faf7f1",
          100: "#f4ede0",
          200: "#e8d9c0",
          300: "#d9bf95",
          400: "#cba06a",
          500: "#bf884c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-playfair)", ...fontFamily.serif],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.9s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
