import { useKBar } from "kbar";
import { useState } from "react";
import { IoCloud } from "react-icons/io5";
import useSound from "use-sound";

export default function CommandPaletteIcon() {
  const { query } = useKBar();
  const [hover, setHover] = useState(false);
  const [beep] = useSound("/sounds/beep.mp3", { volume: 0.7 });
  return (
    <>
      <button
        aria-label="Categories"
        onMouseDown={() => beep()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={query.toggle}
        className="rounded-md hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-zinc-800/70 dark:hover:text-gray-100 md:inline"
      >
        <IoCloud className="h-6 w-6" fill="skyblue" />
      </button>
      {<MouseHoverPopup hover={hover} />}
    </>
  );
}

const MouseHoverPopup = ({ hover }: { hover: boolean }) => {
  return (
    <div
      className={`absolute top-16 h-8 w-24 items-center justify-center rounded-md text-sm outline-dotted outline-1 outline-sky-300 transition-opacity duration-200 sm:hidden md:flex 
      ${hover ? "opacity-100" : "opacity-0"}`}
    >
      Cmd/Ctrl + K
    </div>
  );
};
