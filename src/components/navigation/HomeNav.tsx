import { Darkmode, CommandPaletteIcon } from "@/components/navigation";

export default function Nav() {
  return (
    <div className="flex justify-end space-x-3 py-8 pr-4">
      <CommandPaletteIcon />
      <Darkmode />
    </div>
  );
}
