import Image from "next/image";
import Link from "next/link";
import { name } from "@/components/layout";
import { VscGithub, VscGithubAlt, VscGithubInverted } from "react-icons/vsc";
import { FaGithubSquare } from "react-icons/fa";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
import useSound from "use-sound";

function Toggle() {
  if (!("theme" in localStorage)) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    console.log("다크모드 설정");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
    console.log("라이트모드 설정");
  }
}

export default function Navbar() {
  return (
    <div className="fixed z-10 m-1 flex h-12 w-2/3 flex-row items-center justify-center rounded-lg bg-neutral-200/30 saturate-100 backdrop-blur-sm dark:bg-zinc-600/30 md:max-w-sm">
      <Link href="https://github.com/10004ok">
        <a className="inline-flex grow justify-center" target="_blank" rel="noreferrer">
          <VscGithubInverted className="h-6 grow" />
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
      <MdDarkMode className="h-6 grow" onClick={Toggle} />

      {/* <h2 className="font-custom text-base">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </h2> */}
    </div>
  );
}
