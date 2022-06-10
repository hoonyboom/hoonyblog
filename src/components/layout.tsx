import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components";
interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export const name = "후니훈";
export const siteTitle = "후니로그";

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className="container max-w-xl mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        <Navbar />
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={100}
              width={100}
              alt={name}
            />
            <h1 className="font-custom text-lg">{name}</h1>
          </>
        ) : null}
      </header>

      <div className="mt-24">{children}</div>

      {!home && (
        <div className="mt-12 mb-20">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
