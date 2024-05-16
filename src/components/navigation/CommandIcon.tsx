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
        className="relative flex items-center justify-center rounded-md hover:bg-gray-300/30 dark:hover:bg-zinc-800/70"
      >
        <IoCloud
          onMouseDown={() => beep()}
          // onMouseEnter={() => setHover(true)}
          // onMouseLeave={() => setHover(false)}
          onClick={query.toggle}
          className="size-6"
          fill="skyblue"
        />
        {/* {<MouseHoverPopup hover={hover} />} */}
      </button>
    </>
  );
}

// const MouseHoverPopup = ({ hover }: { hover: boolean }) => {
//   return (
//     <div
//       className={`absolute top-9 h-8 w-24 items-center justify-center rounded-md text-sm outline-dotted outline-1 outline-sky-300 transition-opacity duration-200 sm:hidden md:flex
//       ${hover ? "opacity-100" : "opacity-0"}`}
//     >
//       Cmd/Ctrl + K
//     </div>
//   );
// };
