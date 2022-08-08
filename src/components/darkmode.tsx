import { useTheme } from "next-themes";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
export default function Darkmode() {
  const { theme, setTheme } = useTheme();

  return (
    <button className="md:inline hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 rounded-md">
      {theme === "dark" ? (
        <MdDarkMode
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="w-6 h-6"
          fill="gold"
        />
      ) : (
        <MdOutlineLightMode
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
