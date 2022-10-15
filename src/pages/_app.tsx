import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { CommandPalette, Logo } from "@/components/navigation";
import { RecoilRoot } from "recoil";
import "@/styles/tailwind.css";
import "@code-hike/mdx/dist/index.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/graphql/apollo-client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const tanstackClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <QueryClientProvider client={tanstackClient}>
      <ApolloProvider client={apolloClient}>
        <SessionProvider session={pageProps.session}>
          <RecoilRoot>
            <ThemeProvider attribute="class" defaultTheme="system">
              <CommandPalette>
                <Logo>
                  <Component {...pageProps} />
                  <Toaster />
                </Logo>
              </CommandPalette>
            </ThemeProvider>
          </RecoilRoot>
        </SessionProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
