/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          primary: '#10B981',
          secondary: '#6366F1',
          dark: '#1F2937',
          light: '#F9FAFB',
        },
      },
    },
  },
  plugins: [],
}

