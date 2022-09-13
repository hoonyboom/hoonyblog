import Twemoji from "react-twemoji";
import { Nav, Seo } from "@/components";
import { useEffect, useState, useMemo, useRef } from "react";
import { throttle } from "lodash";
import { useRouter } from "next/router";

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
  siteTitle?: string;
  tags?: string;
}

export default function Layout({ children, home, siteTitle, tags }: LayoutProps) {
  const router = useRouter();
  const [navShow, setNavShow] = useState(false);
  const beforeScrollY = useRef(0);
  const scrollSensor = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = globalThis.scrollY;
        if (currentScrollY > beforeScrollY.current && currentScrollY > 100) {
          setNavShow(true);
          console.log("스크롤 내려가는 중", currentScrollY);
        } else {
          setNavShow(false);
          console.log("스크롤 올라가는 중", currentScrollY);
        }
        beforeScrollY.current = currentScrollY;
      }, 300),
    [beforeScrollY],
  );
  useEffect(() => {
    globalThis.addEventListener("scroll", scrollSensor);
    return () => globalThis.removeEventListener("scroll", scrollSensor);
  });

  return (
    <div
      className={"h-auto min-h-content w-full dark:bg-zinc-900/90 dark:text-slate-200/80"}
    >
      <div
        className={`container mx-auto ${
          home ? "max-w-4xl" : tags === "일기" ? "max-w-xl" : "max-w-2xl"
        }`}
      >
        <header>
          <Seo siteTitle={siteTitle} />
          <Nav navShow={navShow} />
        </header>

        <section className="pt-10">
          <Twemoji
            options={{
              className:
                "inline m-px md:w-5 md:h-5 sm:h-4 sm:w-4 align-text-17 cursor-default",
            }}
          >
            <article>{children}</article>
            {!home && (
              <footer className="mt-16 ml-5 h-20 text-base md:ml-1">
                <div onClick={() => router.back()} className="cursor-pointer">
                  ← Previous
                </div>
              </footer>
            )}
          </Twemoji>
        </section>
      </div>
    </div>
  );
}
