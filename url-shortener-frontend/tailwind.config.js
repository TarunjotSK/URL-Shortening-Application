/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-purple': {
          '500': '#6C63FF', // main custom purple color
          '700': '#5948D6', // A darker shade of the custom purple
          '100': '#cecbff', // A lighter shade of the custom purple
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
