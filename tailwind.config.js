/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {},
      colors: {},
      borderColor: (theme) => ({
        ...theme("colors"),
      }),
    },
  },
  plugins: [],
};
