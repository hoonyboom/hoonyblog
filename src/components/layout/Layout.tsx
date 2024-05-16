import { Nav } from "@/components/navigation";
import { Seo } from "@/components/layout";
import { useEffect, useState, useRef, useMemo } from "react";
import { throttle } from "lodash";
import { useRouter } from "next/router";

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
  tag?: boolean;
  siteTitle?: string;
  category?: string;
}

export default function Layout({
  children,
  home,
  siteTitle,
  tag,
  category,
}: LayoutProps) {
  const router = useRouter();
  const [navShow, setNavShow] = useState(false);
  const beforeScrollY = useRef(0);
  const scrollSensor = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = globalThis.scrollY;
        if (currentScrollY > beforeScrollY.current && currentScrollY > 60)
          setNavShow(true);
        else setNavShow(false);

        beforeScrollY.current = currentScrollY;
      }, 300),
    [],
  );

  useEffect(() => {
    globalThis.addEventListener("scroll", scrollSensor);
    return () => globalThis.removeEventListener("scroll", scrollSensor);
  }, [scrollSensor]);

  return (
    <div
      className={"h-auto min-h-content w-full dark:bg-zinc-900/90 dark:text-slate-200/80"}
    >
      <div
        className={`container mx-auto ${
          home ? "max-w-4xl" : category === "reading" ? "max-w-xl" : "max-w-3xl"
        }`}
      >
        <header>
          <Seo siteTitle={siteTitle} />
          <Nav navShow={navShow} />
        </header>

        <section className="pt-10">
          <article>{children}</article>

          {tag ? (
            <footer className="ml-3 mt-16 pb-20 text-base">
              <a
                onClick={() => {
                  switch (sessionStorage.watchedTab) {
                    case "2":
                      router.push({ pathname: "/", query: { category: "reading" } }, "/");
                      break;
                    case "1":
                      router.push({ pathname: "/", query: { category: "project" } }, "/");
                      break;
                    default:
                      router.push("/");
                      break;
                  }
                }}
                className="no-underline"
              >
                ← Previous
              </a>
            </footer>
          ) : (
            !home && (
              <footer className="ml-3 mt-16 pb-20 text-base">
                <a
                  onClick={() =>
                    sessionStorage.path
                      ? router.push(`${sessionStorage.getItem("path")}`)
                      : router.push("/")
                  }
                  className="select-none no-underline"
                >
                  ← Previous
                </a>
              </footer>
            )
          )}
        </section>
      </div>
    </div>
  );
}
