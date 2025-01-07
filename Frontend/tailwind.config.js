/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        scroll: "scroll 20s linear infinite",
        fadeIn: "fadeIn 2s ease-in-out",
        slideIn: "slideIn 1.5s ease-out",
        rotateBg: "rotateBg 20s infinite linear",
        changeBg: "changeBg 20s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        rotateBg: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        changeBg: {
          "0%": { opacity: "0" },
          "25%": { opacity: "1" },
          "50%": { opacity: "0" },
          "75%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      colors: {
        primary: "#ff4500",
        secondary: "#FDBF50",
        tertiary: "#F4F4F8",
        fourth: "#2A2C14",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "1rem",
        },
      },
    },
  },
  plugins: [],
};
