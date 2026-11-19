/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBg: "#0c0b0a",
        brandBgSoft: "#1c1917",
        brandWhite: "#ffffff",
        brandBlack: "#f5f5f4",
        brandRed: "#f5f5f4",
        brandBlue: "#f5f5f4",
        electricBlue: "#f5f5f4",
        textMain: "#ffffff",
        textMuted: "#a8a29e",
        borderSoft: "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        display: ["var(--font-form)", "system-ui", "sans-serif"],
        body: ["var(--font-form)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
