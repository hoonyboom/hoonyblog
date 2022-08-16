import Head from "next/head";
import Link from "next/link";
import Twemoji from "react-twemoji";
import { HomeNav, Nav } from "@/components";

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export const name = "아구몬";
export const siteTitle = "후니로그";
export const months = "6개월";

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className="h-auto min-h-content w-full transition dark:bg-zinc-900/90 dark:text-slate-200/80 ">
      <div className="container mx-auto max-w-xl">
        <Head>
          <link rel="icon" href="/images/heart.svg" />
          <link rel="apple-touch-icon" href="/images/heart.svg" />
          <link rel="mask-icon" href="/images/heart.svg" />
          <link rel="canonical" href="https://chorok.vercel.app" />,
          <meta name="description" content={`${months}차 뉴비의 프론트엔드 생존기`} />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta property="og:title" content={siteTitle} />
          <meta property="og:url" content="https://chorok.vercel.app" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="robots" content="all" />
        </Head>

        <header className="flex items-center justify-center">{!home && <Nav />}</header>
        {home && <HomeNav />}

        <Twemoji
          options={{ className: "inline m-px w-5 h-5 align-text-20 cursor-default" }}
        >
          <div className="pt-10">
            {children}
            {!home && (
              <div className="mt-16 ml-5 h-20 text-base md:ml-1">
                <Link href="/">
                  <a>← Back to home</a>
                </Link>
              </div>
            )}
          </div>
        </Twemoji>
      </div>
    </div>
  );
}
