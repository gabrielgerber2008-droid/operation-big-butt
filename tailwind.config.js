/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#CFB53B',
          light: '#e8cc5a',
          dark: '#a8921f',
          muted: 'rgba(207,181,59,0.15)',
        },
        obs: {
          DEFAULT: '#0d0d0d',
          1: '#141414',
          2: '#1c1c1c',
          3: '#252525',
          4: '#2e2e2e',
          5: '#3a3a3a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 20px rgba(207,181,59,0.15)',
        'gold-sm': '0 0 8px rgba(207,181,59,0.2)',
      },
    },
  },
  plugins: [],
}
