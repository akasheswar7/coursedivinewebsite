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
          50: '#F0F6FE',
          100: '#E1EEFE',
          200: '#BADBFC',
          300: '#7EC0FA',
          400: '#3A9FF5',
          500: '#1181EA',
          600: '#0665C9',
          700: '#0650A2',
          800: '#0A4384',
          900: '#0D396E',
          950: '#071F3F'
        },
        navy: {
          800: '#0B1E3F',
          900: '#07142B',
          950: '#040C1B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle-blue': '0 4px 20px -2px rgba(11, 129, 234, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(13, 57, 110, 0.12)',
        'premium-glow': '0 0 25px rgba(58, 159, 245, 0.25)',
      }
    },
  },
  plugins: [],
}
