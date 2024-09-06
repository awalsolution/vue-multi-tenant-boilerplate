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
        primary: '#164e63',
        secondary: '#155e75',
        info: '#0169BE',
        light: '#E3F0FF'
      }
    }
  },
  plugins: []
};
