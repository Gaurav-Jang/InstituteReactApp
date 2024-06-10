/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // dark mode class value
  darkMode: "class",
  theme: {
    // screen sizes
    screens: {
      xs: "320px",
      sm: "375px",
      md: "425px",
      lg: "768px",
      xl: "1024px",
      xxl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
