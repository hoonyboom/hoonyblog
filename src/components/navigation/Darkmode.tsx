import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import useSound from "use-sound";

export default function Darkmode() {
  const { theme, setTheme } = useTheme();
  const [rotate, setRotate] = useState(false);
  const [sound] = useSound("/sounds/switch.mp3");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRotate(true);
  }, []);

  return (
    <button
      aria-label="Darkmode Switch"
      className={`rounded-md transition-transform duration-300 hover:bg-gray-300/30
      dark:hover:bg-zinc-800/30 md:inline
      ${rotate ? "rotate-0" : "rotate-45"}
      `}
    >
      {mounted && theme === "dark" ? (
        <MdDarkMode
          onMouseUp={() => sound()}
          onClick={() => {
            setTheme("light");
            setRotate(false);
          }}
          className="size-6"
          fill="gold"
        />
      ) : (
        <MdOutlineLightMode
          onMouseUp={() => sound()}
          onClick={() => {
            setTheme("dark");
            setRotate(true);
          }}
          className="size-6"
          fill="orange"
        />
      )}
    </button>
  );
}
