/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16c5f5',
        secondary: '#0ea5e9',
        backgroundImage: {
          'site-bg': "url('/src/assets/sonny-mauricio-kIr8e-01eAw-unsplash.jpg')", // Adjust the path to your image
        },
      }
    },
  },
  plugins: [],
}