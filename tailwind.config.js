/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{jsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["raleway", "sans-serif"],
      },
      colors: {
        deepDark: "#17181C",
        mediumDark: "#1E1F24",
        lighterDark: "#F0F0F0",
      },
    },
  },
  plugins: [],
};
