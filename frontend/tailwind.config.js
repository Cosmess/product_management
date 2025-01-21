/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayLight: "#f5f5f5",
        blueButton: "#007bff",
      },
    },
  },
  plugins: [],
};
