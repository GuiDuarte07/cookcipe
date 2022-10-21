/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        removed: {
          '0%': {height: '200px'},
          '100%':{height: '0px'},
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
