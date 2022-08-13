import React from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import useSound from "use-sound";

export default function Darkmode() {
  const { theme, setTheme } = useTheme();
  const [switch2] = useSound("/sounds/switch.mp3");
  return (
    <button className="md:inline hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 rounded-md">
      {theme === "dark" ? (
        <MdDarkMode
          onMouseUp={() => switch2()}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="w-6 h-6"
          fill="gold"
        />
      ) : (
        <MdOutlineLightMode
          onMouseUp={() => switch2()}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="w-6 h-6"
          fill="orange"
        />
      )}
    </button>
  );
}
