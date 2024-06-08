/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{jsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
      colors: {
        deepDark: "#17181C",
        mediumDark: "#1E1F24",
        lighterDark: "#F0F0F0",
      },
      scrollbar: {
        width: "thin",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
