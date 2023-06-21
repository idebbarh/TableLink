/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#213fff",
        blackOverlay: "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        formShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
};
