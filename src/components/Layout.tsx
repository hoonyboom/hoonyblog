import Link from "next/link";
import Twemoji from "react-twemoji";
import { HomeNav, Nav, Seo } from "@/components";
import { useEffect, useState } from "react";
import { throttle } from "lodash";

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
  category?: string;
}

export default function Layout({ children, home, category }: LayoutProps) {
  const [y, setY] = useState(0);
  const handle = () => {
    setY(globalThis.scrollY), console.log("스크롤은 ", y);
  };

  useEffect(() => {
    globalThis.addEventListener("scroll", throttle(handle, 300));
    return () => globalThis.removeEventListener("scroll", handle);
  });

  return (
    <div
      className={"h-auto min-h-content w-full dark:bg-zinc-900/90 dark:text-slate-200/80"}
    >
      <div
        className={`container mx-auto ${
          home || category === "writing" ? "max-w-xl" : "max-w-2xl"
        }`}
      >
        <header>
          <Seo />
          {!home && <Nav />}
          {home && y >= 160 && <Nav />}
        </header>

        <section className="pt-10">
          <Twemoji
            options={{ className: "inline m-px w-5 h-5 align-text-20 cursor-default" }}
          >
            <article>{children}</article>
            {!home && (
              <footer className="mt-16 ml-5 h-20 text-base md:ml-1">
                <Link href="/">
                  <a className="no-underline">← Back to home</a>
                </Link>
              </footer>
            )}
          </Twemoji>
        </section>
      </div>
    </div>
  );
}
