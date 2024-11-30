module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      colors: {
        'dark-green': '#1B4332', // Customize this to your shade
        'green-500': '#00C853',
        'green-300': '#A8E6CF',
      },
      darkMode: 'class',
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
