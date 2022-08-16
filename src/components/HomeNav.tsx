import { Darkmode, CommandPaletteIcon } from "@/components";

export default function Nav() {
  return (
    <div className="my-8 mr-4 flex justify-end space-x-3 dark:bg-zinc-900/90">
      <CommandPaletteIcon />
      <Darkmode />
    </div>
  );
}
