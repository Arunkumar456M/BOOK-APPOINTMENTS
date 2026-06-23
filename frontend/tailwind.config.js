/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070F1F',
          900: '#0B1B36',
          800: '#11244A',
          700: '#16305F',
          600: '#1C3D78'
        },
        brand: {
          50: '#EEF4FF',
          100: '#DCE9FF',
          200: '#B3D0FF',
          300: '#80B0FF',
          400: '#4D8DFF',
          500: '#2868F0',
          600: '#1E50C8',
          700: '#173E9C',
          800: '#122F76',
          900: '#0E2459'
        },
        ice: '#F6F9FD'
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(11,27,54,0.10)',
        card: '0 2px 12px rgba(11,27,54,0.06)',
        glow: '0 0 0 1px rgba(40,104,240,0.15), 0 8px 30px rgba(40,104,240,0.18)'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseDot: {
          '0%,100%': { opacity: 0.35, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' }
        }
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        pulseDot: 'pulseDot 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
