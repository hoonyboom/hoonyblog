import Image from "next/image";
import Link from "next/link";
import { Darkmode, CommandPaletteIcon } from "@/components/navigation";

export default function Nav({ navShow }: { navShow: boolean }) {
  return (
    <header
      className={`flex items-center justify-center transition-all ${
        navShow ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="fixed top-px z-10 flex h-12 w-2/3 flex-row items-center justify-center space-x-16 rounded-lg bg-neutral-200/30 saturate-100 backdrop-blur-sm dark:bg-zinc-600/30 md:max-w-sm">
        <CommandPaletteIcon />
        <Link href="/" className="mt-1">
          <Image
            priority
            src="/images/default/profile.png"
            className="rounded-full"
            height={40}
            width={40}
            alt="프로필"
            onClick={() => sessionStorage.setItem("watchedTab", String(0))}
          />
        </Link>
        <Darkmode />
      </div>
    </header>
  );
}
