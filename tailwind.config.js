/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        porto: {
          pink: '#ec4899',
          lime: '#a3e635',
          dark: '#090a0f',
          card: '#111827',
        }
      }
    },
  },
  plugins: [],
}
