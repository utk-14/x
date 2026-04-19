/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['OpenDyslexic', 'Arial', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Arial', 'sans-serif'],
      },
      colors: {
        surface: '#f5f7ff',
        ink: '#14213d',
        calm: '#5f6fff',
      },
      backgroundImage: {
        'kid-joy':
          'linear-gradient(145deg, #5ecfff 0%, #7b8cff 40%, #c4a8ff 72%, #ffc8df 100%)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
