import { Darkmode, CommandPaletteIcon } from "@/components";

export default function Nav() {
  return (
    <div className="flex justify-end my-8 space-x-3 sm:mr-4">
      <CommandPaletteIcon />
      <Darkmode />
    </div>
  );
}
