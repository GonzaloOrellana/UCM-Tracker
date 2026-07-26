/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crextio: {
          yellow: '#F5C842',
          'yellow-hover': '#E5B731',
          black: '#1A1A1A',
          bg: '#FAFAFA',
          outer: '#E6E6E8',
          card: '#FFFFFF',
          border: '#EBEBEB',
          muted: '#71717A',
          subtle: '#A1A1AA',
        },
        theme: {
          canvas: '#FAFAFA',
          bg: '#FAFAFA',
          card: '#FFFFFF',
          'card-hover': '#F7F7FA',
          border: '#EBEBEB',
          'border-strong': '#D4D4D8',
          red: '#F5C842',
          'red-dark': '#1A1A1A',
          'red-light': '#FEF9C3',
          gold: '#F5C842',
          text: '#1A1A1A',
          muted: '#71717A',
          subtle: '#A1A1AA',
        }
      },
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'crextio-card': '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 2px 10px -2px rgba(0, 0, 0, 0.02)',
        'crextio-hover': '0 16px 40px -8px rgba(0, 0, 0, 0.08)',
        'saas-card': '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 2px 10px -2px rgba(0, 0, 0, 0.02)',
        'saas-hover': '0 16px 40px -8px rgba(0, 0, 0, 0.08)',
        'app-shell': '0 25px 70px -15px rgba(0, 0, 0, 0.06)',
        'floating-pill': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        bounceCheck: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'bounce-check': 'bounceCheck 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
