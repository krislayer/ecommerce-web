import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Colores del sistema macOS
      colors: {
        mac: {
          blue: '#007AFF',
          'blue-dark': '#0051D5',
          green: '#34C759',
          indigo: '#5856D6',
          orange: '#FF9500',
          pink: '#FF2D55',
          purple: '#AF52DE',
          red: '#FF3B30',
          teal: '#5AC8FA',
          yellow: '#FFCC00',
          gray: {
            1: '#F5F5F7',
            2: '#E8E8ED',
            3: '#D2D2D7',
            4: '#C7C7CC',
            5: '#AEAEB2',
            6: '#8E8E93',
          },
        },
      },
      // Tipografía macOS
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      // Espaciado macOS
      spacing: {
        'mac-xs': '4px',
        'mac-sm': '8px',
        'mac-md': '16px',
        'mac-lg': '24px',
        'mac-xl': '32px',
        'mac-2xl': '48px',
        'mac-3xl': '64px',
      },
      // Border radius macOS
      borderRadius: {
        'mac-sm': '6px',
        'mac-md': '8px',
        'mac-lg': '10px',
        'mac-xl': '12px',
      },
      // Sombras macOS
      boxShadow: {
        'mac-sm': '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.06)',
        'mac-md': '0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.08)',
        'mac-lg': '0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      // Backdrop blur macOS
      backdropBlur: {
        'mac': '40px',
      },
      // Transiciones macOS
      transitionTimingFunction: {
        'mac': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        'mac-fast': '100ms',
        'mac-base': '200ms',
        'mac-slow': '300ms',
      },
    },
  },
  plugins: [],
};

export default config;
