/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-transparent": "var(--primary-transparent)",
        "secondary-color": "var(--secondary-color)",
        "pending-transparent": "var(--pending-transparent)",
        "declined-transparent": "var(--declined-transparent)",
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
