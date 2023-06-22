/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#213fff",
        blackOverlay: "rgba(248, 249, 250, 0.85)",
      },
      boxShadow: {
        formShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        reviewModelShadow:
          "0px 5px 26px 0px rgba(0,0,0,0.22), 0px 20px 28px 0px rgba(0,0,0,0.3)",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
};
