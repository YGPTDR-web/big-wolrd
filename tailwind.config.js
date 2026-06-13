/** @type {import('tailwindcss').Config} */
 
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
    extend: {
      colors: {
        ink: {
          950: '#050B14',
          900: '#0B1A2B',
          800: '#12253F',
          700: '#1B3356',
          600: '#2A4A74',
        },
        gold: {
          50: '#FBF3DF',
          200: '#F2D893',
          400: '#E9B44C',
          500: '#D69A2A',
          600: '#A87318',
        },
        jade: {
          300: '#A8F0DA',
          400: '#7AE7C7',
          500: '#3ECFA4',
        },
        parchment: {
          50: '#FBF7EE',
          100: '#F1EAD6',
          200: '#E3D7B3',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Noto Serif SC"', 'serif'],
        serif: ['"Noto Serif SC"', '"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.35)',
        card: '0 10px 40px -10px rgba(233, 180, 76, 0.25)',
        gold: '0 0 0 1px rgba(233, 180, 76, 0.4), 0 12px 40px -12px rgba(233, 180, 76, 0.3)',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        drift: {
          '0%': { transform: 'translate(0,0)' },
          '100%': { transform: 'translate(-40px,-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        reveal: 'reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        glow: 'glow 4s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite alternate',
        shimmer: 'shimmer 3s linear infinite',
      },
      backgroundImage: {
        'grid-gold': 'linear-gradient(rgba(233,180,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(233,180,76,0.06) 1px, transparent 1px)',
        'noise': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.75  0 0 0 0 0.5  0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      },
    },
    extend: {},
  },
  plugins: [],
};