/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], 
        serif: ["Playfair Display", "serif"], 
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}