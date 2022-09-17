import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { CommandPalette, Logo } from "@/components";
import { RecoilRoot } from "recoil";
import "@/styles/tailwind.css";
import "@code-hike/mdx/dist/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <CommandPalette>
        <Logo>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Logo>
      </CommandPalette>
    </ThemeProvider>
  );
}
