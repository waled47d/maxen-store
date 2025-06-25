/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        electric: {
          blue: '#00BFFF',
          cyan: '#00FFFF',
          purple: '#8A2BE2',
          green: '#00FF7F',
        },
        dark: {
          100: '#1a1a1a',
          200: '#2d2d2d',
          300: '#404040',
          400: '#525252',
          500: '#666666',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gaming': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        'gradient-electric': 'linear-gradient(135deg, #00BFFF 0%, #00FFFF 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 191, 255, 0.5)',
        'neon-strong': '0 0 30px rgba(0, 191, 255, 0.8)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 191, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};