import Image from "next/image";
import Link from "next/link";
import { name } from "@/components/Layout";
import { Darkmode, CommandPaletteIcon } from "@/components";

export default function Nav() {
  return (
    <header className="flex items-center justify-center">
      <div className="fixed top-px z-10 flex h-12 w-2/3 flex-row items-center justify-center space-x-16 rounded-lg bg-neutral-200/30 saturate-100 backdrop-blur-sm dark:bg-zinc-600/30 md:max-w-sm">
        <CommandPaletteIcon />
        <Link href="/">
          <a className="mt-1">
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={40}
              width={40}
              alt={name}
            />
          </a>
        </Link>
        <Darkmode />
      </div>
    </header>
  );
}
