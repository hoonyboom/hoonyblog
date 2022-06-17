import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { name } from "@/components/layout";
import useSound from "use-sound";
import { VscGithubInverted } from "react-icons/vsc";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="fixed top-px z-10 flex h-12 w-2/3 flex-row items-center justify-center space-x-16 rounded-lg bg-neutral-200/30 saturate-100 backdrop-blur-sm dark:bg-zinc-600/30 md:max-w-sm">
      <Link href="https://github.com/10004ok">
        <a className="inline-flex justify-center" target="_blank" rel="noreferrer">
          <button>
            <VscGithubInverted className="h-6 grow hover:animate-spin" />
          </button>
        </a>
      </Link>
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
      <button>
        {theme === "dark" ? (
          <MdDarkMode
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          />
        ) : (
          <MdOutlineLightMode
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          />
        )}
      </button>
    </div>
  );
}
