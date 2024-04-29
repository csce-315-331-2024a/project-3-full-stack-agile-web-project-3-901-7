/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
        "inter": ["Inter"],
        "ptserif": ["PT Serif"],
    },
    extend: {},
  },
  plugins: [],
  darkMode: 'selector',
}
