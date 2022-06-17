import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import "@code-hike/mdx/dist/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
