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
        className="w-[32px] h-[32px] bg-primary rounded-full flex items-center justify-center"
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={`${theme === "dark" ? "Light" : "Dark"}`}
        onClick={handleThemeChange}
      >
        {theme === "dark" ? (
          <HiSun className="text-accent text-xl" />
        ) : (
          <HiMoon className="text-accent text-xl" />
        )}
      </button>
      {/* Tooltip Component */}
      <Tooltip
        id="theme-tooltip"
        place="bottom"
        style={{
          backgroundColor: theme === "light" ? "#18181b" : "#f4f4f5",
          color: theme === "light" ? "#ffffff" : "#000000",
          padding: "6px 20px",
          borderRadius: "6px",
        }}
      />
    </div>
  );
};

export default ThemeToggle;
