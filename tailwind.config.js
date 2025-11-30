const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],

        poppins: ["Poppins", "sans-serif"],
        unbounded: ["Unbounded", "sans-serif"],
        bitcount: ["Bitcount Prop Single Ink", "monospace"],
      },
        backgroundImage: {
        "radial-custom":
          "radial-gradient(ellipse at top, var(--tw-gradient-stops))", 
      },
    },
  },
  plugins: [],
};
