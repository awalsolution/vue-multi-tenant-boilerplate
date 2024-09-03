/** @type {import('tailwindcss').Config} */
const DEFAULT_FONTS =
  'system-ui, -apple-system, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: [DEFAULT_FONTS]
      },
      colors: {
        primary: '#004B85',
        secondary: '#0081E6',
        info: '#0169BE'
      }
    }
  },
  plugins: []
};
