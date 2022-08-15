import { Darkmode, CommandPaletteIcon } from "@/components";

export default function Nav() {
  return (
    <div className="my-8 mr-4 flex justify-end space-x-3">
      <CommandPaletteIcon />
      <Darkmode />
    </div>
  );
}
