/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#213fff",
      },
      boxShadow: {
        formShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      },
    },
  },
  plugins: [],
};
