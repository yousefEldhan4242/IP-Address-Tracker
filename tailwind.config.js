/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      boxShadow:{
        "my-shadow": "0 2px 4px rgba(0, 0, 0, 1)"
      },
    },
  },
  plugins: [],
}

