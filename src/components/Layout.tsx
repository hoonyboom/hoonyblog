import Link from "next/link";
import Twemoji from "react-twemoji";
import { Nav, Seo } from "@/components";
import { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
  siteTitle: string;
}

export default function Layout({ children, home, siteTitle }: LayoutProps) {
  const [navShow, setNavShow] = useState(false);
  let beforeScrollY = 0;
  const scrollSensor = useCallback(
    throttle(() => {
      const currentScrollY = globalThis.scrollY;
      if (currentScrollY > beforeScrollY) {
        setNavShow(true);
        console.log("스크롤 내려가는 중", currentScrollY);
      } else {
        setNavShow(false);
        console.log("스크롤 올라가는 중", currentScrollY);
      }
      beforeScrollY = currentScrollY;
    }, 300),
    [],
  );
  useEffect(() => {
    globalThis.addEventListener("scroll", scrollSensor);
    return () => globalThis.removeEventListener("scroll", scrollSensor);
  });

  return (
    <div
      className={"h-auto min-h-content w-full dark:bg-zinc-900/90 dark:text-slate-200/80"}
    >
      <div className={`container mx-auto ${!home ? "max-w-3xl" : "max-w-6xl"}`}>
        <header>
          <Seo siteTitle={siteTitle} />
          <Nav navShow={navShow} />
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
