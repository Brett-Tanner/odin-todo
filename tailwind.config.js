/** @type {import('tailwindcss').config} */
module.exports = {
  content: ["./src/*.ts", "./src/**/*.ts", "./dist/*.html"],
  theme: {
    extend: {
      gridTemplateRows: {
        main: "60px, 1fr",
      },
    },
  },
  plugins: [],
};
