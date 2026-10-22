/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070B16',
          900: '#0B1020',
          850: '#0E1528',
          800: '#141D32',
          750: '#1A2540',
          700: '#233152',
          600: '#33446C',
        },
        cyan: {
          400: '#38D9F8',
          500: '#06B6D4',
        },
        violet: {
          400: '#A78BFA',
          500: '#8B7CFF',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
        },
        rose: {
          400: '#FB7185',
          500: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
