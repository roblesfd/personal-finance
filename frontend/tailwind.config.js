/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef4eb",
          100: "#fce8d7",
          200: "#f9d1af",
          300: "#f6bb87",
          400: "#f3a45f",
          500: "#f08d37",
          600: "#c0712c",
          700: "#905521",
          800: "#603816",
          900: "#301c0b",
        },
        secondary: {
          40: "#e7edf6",
          50: "#cfdaed",
          100: "#9fb5da",
          200: "#6e90c8",
          300: "#3e6bb5",
          400: "#2659ac",
          500: "#366c9c",
          600: "#2b567d",
          700: "#20415e",
          800: "#162b3e",
          900: "#0b161f",
        },
        accent1: "#0b161f",
        accent2: "#6DA2D1",
        accent3: "#95C8F5",
      },
    },
  },
  plugins: [],
};
