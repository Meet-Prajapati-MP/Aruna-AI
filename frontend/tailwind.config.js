/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B1D2A',
          dark: '#4A1019',
        },
        'rose-light': '#f2b8a8',
        cream: '#faf5f0',
        beige: '#f0e8e0',
        'warm-white': '#fdfaf7',
        border: '#e8ddd6',
        text: {
          primary: '#1a1410',
          secondary: '#6b5c54',
          muted: '#9e8c84',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
