import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${
    process.env.NODE_ENV === "production"
      ? "https:/hyezoblog.vercel.app/api/graphql"
      : "http://localhost:3000/api/graphql"
  }`,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
