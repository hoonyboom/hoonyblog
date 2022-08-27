import Link from "next/link";
import Twemoji from "react-twemoji";
import { HomeNav, Nav, Seo } from "@/components";

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div
      className={`h-auto min-h-content w-full ${
        !home && "animate-swapReverse"
      } dark:bg-zinc-900/90 dark:text-slate-200/80`}
    >
      <div className={"container mx-auto max-w-xl"}>
        <header>
          <Seo />
          {!home && <Nav />}
          {home && <HomeNav />}
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
