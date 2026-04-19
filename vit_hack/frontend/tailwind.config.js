/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        dyslexic: ['OpenDyslexic', 'Atkinson Hyperlegible', 'Arial', 'sans-serif'],
      },
      colors: {
        surface: '#f5f7ff',
        ink: '#14213d',
        calm: '#5f6fff',
      },
    },
  },
  plugins: [],
}
