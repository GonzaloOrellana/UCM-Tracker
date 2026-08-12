/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ──────────────────────────────────────────────
        // MARVEL DESIGN SYSTEM TOKENS
        // See DESIGN.md for usage rules and elevation mapping
        // ──────────────────────────────────────────────
        marvel: {
          // --- SISTEMA CÓMIC EDITORIAL (TOKENS PLANOS CLAROS Y TINTA) ---
          paper:       '#F7F4EE',  // bg-marvel-paper (fondo crema de imprenta)
          'paper-dim': '#EFECE6',  // bg-marvel-paper-dim (fondo hundido)
          card:        '#FFFFFF',  // bg-marvel-card (superficie blanca plana)
          ink:         '#12131A',  // text-marvel-ink / border-marvel-ink (negro tinta profundo)
          'ink-muted': '#52525B',  // text-marvel-ink-muted (gris tinta para texto secundario)
          'ink-subtle':'#A1A1AA',  // text-marvel-ink-subtle (placeholders)
          divider:     '#C81D25',  // border-marvel-divider (líneas rojas finas)
          issue:       '#12131A',  // bg-marvel-issue (badge esquinero ISSUE #XX)

          // --- BRAND RED ---
          red: {
            DEFAULT: '#C81D25',  // Primary brand red
            dark:    '#800A10',  // Dark accent / border
            bright:  '#E62429',  // Bright highlight
            hover:   '#A8151C',  // Button hover state
          },

          // --- STATE TOKENS ---
          error: {
            DEFAULT: '#E11D48',  // Crimson-rose alert tone
            muted:   '#FFE4E6',  // Soft crimson alert container
          },
          success: {
            DEFAULT: '#10B981',  // Emerald green
          },

          // --- TOKENS LEGADOS EN MODO OSCURO (100% RETROCOMPATIBLES) ---
          // Mantenidos intactos para que las vistas no migradas sigan funcionando perfecto
          surface: {
            base:    '#0C0D17',  // L0: Deepest background
            dim:     '#12131C',  // L0: Background fallback
            low:     '#141625',  // L1: Cards glass
            DEFAULT: '#161726',  // L1: Standard glass
            high:    '#1e2238',  // L2: Modals
            highest: '#24273E',  // L2+: Elevated cards
          },
          silver: {
            DEFAULT: '#A1A1AA',  // Muted silver text
            light:   '#D4D4D8',  // Light silver border/text
          },
        },

        // ──────────────────────────────────────────────
        // LEGACY NAMESPACES (deprecated — do not use for new code)
        // Kept for backward compatibility with existing components.
        // ──────────────────────────────────────────────
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
        },
      },
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        label: ['"Space Grotesk"', 'monospace', 'sans-serif'],
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
