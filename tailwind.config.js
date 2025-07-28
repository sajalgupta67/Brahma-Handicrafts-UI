/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        maharlika: ['Maharlika', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair', 'serif'],
      },
    },
  },
  plugins: [],
};
