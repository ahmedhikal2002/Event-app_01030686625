import React, { useEffect, useState } from "react";
import Moon from "../assets/moon.png";
import Sun from "../assets/sun.svg";
function ThemeMode() {
  const storedTheme = localStorage.getItem("mode");
  const [mode, setMode] = useState(storedTheme || "light");

  const handleThemeMode = () => {
    const theme = mode === "light" ? "dark" : "light";
    setMode(theme);
    localStorage.setItem("mode", theme);
  };
  useEffect(() => {
    if (mode === "dark") {
      document.querySelector("html").classList.add("dark");
      document.querySelector("html").classList.remove("light");
    } else {
      document.querySelector("html").classList.add("light");
      document.querySelector("html").classList.remove("dark");
    }
  }, [mode]);

  return (
    <div
      onClick={handleThemeMode}
      className="block w-fit  cursor-pointer border-gray-200
       dark:border-gray-800 rounded-full bg-white  dark:bg-gray-600 p-2 "
    >
      {mode === "light" ? (
        <img src={Moon} alt="dark mode" className="w-6 h-6" />
      ) : (
        <img src={Sun} alt="light mode" />
      )}
    </div>
  );
}

export default ThemeMode;
