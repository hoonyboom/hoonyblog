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
        className="rounded-md md:inline hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-zinc-800/70 dark:hover:text-gray-100"
      >
        <IoCloud className="w-6 h-6" fill="skyblue" />
      </button>
      {<MouseHoverPopup hover={hover} />}
    </>
  );
}

const MouseHoverPopup = ({ hover }: { hover: boolean }) => {
  return (
    <div
      className={`absolute top-16 w-24 h-8 text-sm outline-1 outline-dotted outline-sky-300 rounded-md sm:hidden md:flex justify-center items-center transition-opacity duration-200 
      ${hover ? "opacity-100" : "opacity-0"}`}
    >
      Cmd/Ctrl + K
    </div>
  );
};
