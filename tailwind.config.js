/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      colors: {
        gray: {
        100: "#eeeeef",
        200: "#e6e9ed",
        600: "#95989c"
        },
        purple: {
        200: "#d9ddee",
        500: "#9492db",
        600: "#7164c0",
        }
       }
    },
  },
  plugins: [],
}

