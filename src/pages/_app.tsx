import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { CommandPalette, Logo } from "@/components";
// import { NextSeo } from "next-seo";
// import SEO from "next-seo.config";
import "@/styles/tailwind.css";
import "@code-hike/mdx/dist/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <NextSeo {...SEO}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <CommandPalette>
          <Logo>
            <Component {...pageProps} />
          </Logo>
        </CommandPalette>
      </ThemeProvider>
    // </NextSeo>
  );
}
