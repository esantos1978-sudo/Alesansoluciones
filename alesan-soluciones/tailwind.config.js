/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/**/*.js'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        paper: '#F5F5F7',
        lime: '#CCFF00',
        coral: '#FF7A70',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        float: '0 32px 90px rgba(0, 0, 0, 0.55)',
        lime: '0 0 0 1px rgba(204, 255, 0, 0.22), 0 26px 70px rgba(204, 255, 0, 0.12)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};
