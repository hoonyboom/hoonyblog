import { useKBar } from "kbar";
import { IoCloud } from "react-icons/io5";
export default function CommandPaletteIcon() {
  const { query } = useKBar();
  return (
    <button
      onClick={query.toggle}
      className="md:inline hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100 rounded-md">
      <IoCloud className="w-5 h-5" fill="skyblue" />
    </button>
  );
}
