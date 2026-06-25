/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBg: "#141313",
        brandBgSoft: "#1a1a1a",
        brandWhite: "#f9f9f9",
        brandBlack: "#141313",
        brandBlue: "#38B6FF",
        electricBlue: "#38B6FF",
        textMain: "#f9f9f9",
        textMuted: "#a3a3a3",
        borderSoft: "#2a2a2a",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
