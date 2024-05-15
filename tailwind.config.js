/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#F1D643",
        secondary: "#3B3838",
      },
    },
  },
  plugins: [],
};
