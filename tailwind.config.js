/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#10101B',
          surface: '#19192A',
          elevated: '#23233A',
          lime: '#D6FF3F',
          coral: '#FF6B57',
          violet: '#A78BFA',
          cyan: '#48E5E0',
          text: '#F8F7FF',
          muted: '#B8B6CC',
          border: '#34334B',
          subtle: '#26253B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
