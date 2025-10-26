/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1a1a2e',
        'dark-purple': '#16213e',
        'accent-blue': '#0f3460',
        'accent-purple': '#533483',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
    },
  },
  plugins: [],
}
