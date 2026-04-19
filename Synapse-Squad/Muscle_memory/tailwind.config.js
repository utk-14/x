/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px rgba(147, 197, 253, 0.22)",
      },
    },
  },
  plugins: [],
};
