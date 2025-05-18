/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(var(--primary))',
        themeBackground: 'rgba(var(--themeBackground))',
        themeText: "rgba(var(--themeText))",
        border: 'rgba(var(--border))',
      },
      fontFamily: {
        sans: ['Georgia', 'serif'],
        serif: ['Georgia', 'serif'],
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}