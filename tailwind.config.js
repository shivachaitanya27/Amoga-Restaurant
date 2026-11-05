/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amoga: {
          burgundy: '#651B25',
          burgundyDark: '#470717',
          burgundyLight: '#7E2231',
          orange: '#E88A32',
          orangeDark: '#9E4200',
          orangeLight: '#FD8541',
          cream: '#FFF8EF',
          creamLight: '#FFF8F6',
          creamDark: '#FFE9E5',
          charcoal: '#242424',
          charcoalLight: '#544244',
          gold: '#D8A64A',
          goldLight: '#EDC065',
          goldPale: '#FFDEA3'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'amoga': '0 12px 32px -6px rgba(100, 30, 43, 0.15)',
        'amoga-lg': '0 20px 48px -10px rgba(71, 7, 23, 0.25)',
        'amoga-glow': '0 0 35px rgba(232, 138, 50, 0.25)',
      }
    },
  },
  plugins: [],
}

