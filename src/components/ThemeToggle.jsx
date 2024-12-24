import { Tooltip } from "react-tooltip";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Handle theme toggle
  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center">
      <button
        className="w-[34px] h-[34px] border border-base-300 rounded-[6px] flex items-center justify-center"
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={`${theme === "dark" ? "Light" : "Dark"} Mode`}
        onClick={handleThemeChange}
      >
        {theme === "dark" ? (
          <HiSun className="text-white text-2xl" />
        ) : (
          <HiMoon className="text-black text-2xl" />
        )}
      </button>
      {/* Tooltip Component */}
      <Tooltip
        id="theme-tooltip"
        place="bottom"
        style={{
          backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
          padding: "6px 20px",
          borderRadius: "6px",
        }}
      />
    </div>
  );
};

export default ThemeToggle;