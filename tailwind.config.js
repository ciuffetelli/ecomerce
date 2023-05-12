/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.tsx",
    "./src/Components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#1b2d5e",
        },
      },
      fontFamily: {
        Rubik: ['Rubik', 'sans-serif'],
        Rajdhani: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'disappear': 'disappear 0.5s ease-in-out forwards',
        'appear': 'appear 0.5s ease-in-out forwards',
      },
      transitionDuration: {
        'global': '0.25s',
      },
      keyframes: theme => ({
        'disappear': {
          'from': { display: 'block', opacity: 1 },
          'to': { opacity: 0, display: 'none' },
        },
        'appear': {
          'from': { display: 'none', opacity: 0 },
          'to': { opacity: 1, display: 'block' },
        },
      }),
    }
  },
  plugins: [],
}

