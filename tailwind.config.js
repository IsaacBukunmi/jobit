/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "white":"var(--white)",
        "black":"var(--black)",
        "grey":"var(--grey)",
        "grey-border":"var(--border)",
      },
      backgroundImage:{
        "search-bg": "url('./assets/images/search-bg.png')"
      },
    },
  },
  plugins: [],
}
