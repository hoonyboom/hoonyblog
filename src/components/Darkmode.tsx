import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import useSound from "use-sound";

export default function Darkmode() {
  const { theme, setTheme } = useTheme();
  const [rotate, setRotate] = useState(false);
  const [switch2] = useSound("/sounds/switch.mp3");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRotate(true);
  }, []);

  return (
    <button
      aria-label="Darkmode Switch"
      className={`md:inline hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-zinc-800/70 dark:hover:text-gray-100 rounded-md
      transition-transform origin-center duration-300 ${rotate ? "rotate-0" : "rotate-45"}
      `}
    >
      {mounted && theme === "dark" ? (
        <MdDarkMode
          onMouseUp={() => switch2()}
          onClick={() => {
            setTheme("light");
            setRotate(false);
          }}
          className="w-6 h-6"
          fill="gold"
        />
      ) : (
        <MdOutlineLightMode
          onMouseUp={() => switch2()}
          onClick={() => {
            setTheme("dark");
            setRotate(true);
          }}
          className="w-6 h-6"
          fill="orange"
        />
      )}
    </button>
  );
}
