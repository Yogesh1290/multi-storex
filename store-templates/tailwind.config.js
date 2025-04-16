/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./basic/**/*.{js,ts,jsx,tsx,mdx}", "./fashion/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
}
