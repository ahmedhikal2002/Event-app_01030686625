/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "Primary-light": "#ffff",
        "primary-dark": "#0f172a",
        "btn-color": "#3B82F6",
        "btn-hover": "#2563EB",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      boxShadow: {
        "input-shadow": "0px 1px 6px rgba(0,0,255,0.4)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
