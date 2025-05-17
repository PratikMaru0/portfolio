import { useEffect, useState } from "react";
import { darkModeIcon, lightModeIcon } from "../assets";

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme:dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const switchMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div onClick={switchMode} className="cursor-pointer">
      <img
        className="text-xl md:inline"
        src={theme === "light" ? darkModeIcon : lightModeIcon}
        alt={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      />
    </div>
  );
};

export default Theme;
