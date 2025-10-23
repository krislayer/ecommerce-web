import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Habilitar modo oscuro basado en clase
  darkMode: 'class',
  theme: {
    extend: {
      // Colores personalizados para liquid glass
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.5)',
          dark: 'rgba(255, 255, 255, 0.1)',
          border: {
            light: 'rgba(255, 255, 255, 0.6)',
            dark: 'rgba(255, 255, 255, 0.2)',
          }
        }
      },
      // Blur personalizados
      backdropBlur: {
        'xs': '2px',
        'strong': '40px',
        'ultra': '60px',
      },
      // Animaciones personalizadas
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)',
          },
        },
      },
      // Tamaños de blur aumentados
      blur: {
        '4xl': '72px',
        '5xl': '96px',
      },
      // Sombras personalizadas para glass
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 20px 60px 0 rgba(31, 38, 135, 0.5)',
        'inner-glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
      // Border radius adicionales
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      // Transiciones personalizadas
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      // Backdrop filter adicional
      backdropBrightness: {
        25: '.25',
        175: '1.75',
      },
    },
  },
  plugins: [
    // Plugin personalizado para utilidades glass
    function({ addUtilities }: any) {
      const newUtilities = {
        '.glass-morphism': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(40px)',
          '-webkit-backdrop-filter': 'blur(40px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.text-shadow-sm': {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
};

export default config;
