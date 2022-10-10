import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  // uri: `${
  //   process.env.NODE_ENV === "production"
  //     ? "https://hyezoprk.com/api/graphql"
  //     : "http://localhost:3000/api/graphql"
  // }`,
  uri: "https://hyezoprk.com/api/graphql",
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
