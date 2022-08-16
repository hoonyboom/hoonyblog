import { Darkmode, CommandPaletteIcon } from "@/components";

export default function Nav() {
  return (
    <div className="flex justify-end space-x-3 py-8 pr-4 dark:bg-zinc-900/90">
      <CommandPaletteIcon />
      <Darkmode />
    </div>
  );
}
