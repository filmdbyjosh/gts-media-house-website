/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          brandBg: "#ffffff",
          brandBgSoft: "#fafafa",
          brandWhite: "#ffffff",
          brandBlack: "#000000",
          electricBlue: "#00b8ff",
          textMain: "#000000",
          textMuted: "#6a6a6a",
          borderSoft: "#e8e8e8",
        },
        boxShadow: {
          cardSm: "0 4px 20px rgba(0,0,0,0.04)",
          cardLg: "0 10px 40px rgba(0,0,0,0.06)",
        },
        fontFamily: {
          heading: ['"jumbox"', "system-ui", "sans-serif"],
          body: ['"Jumbox"', "system-ui", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  