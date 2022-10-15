import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: `${
    process.env.NODE_ENV === "production"
      ? "https://hyezoprk.com/api/graphql"
      : "http://localhost:3000/api/graphql"
  }`,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

/**
 * 웹소켓
 */
// const wsLink =
//   typeof globalThis !== "undefined"
//     ? new GraphQLWsLink(
//         createClient({
//           url: `${
//             process.env.NODE_ENV === "production"
//               ? "ws://hyezoprk.com/graphql/subscription"
//               : "ws://localhost:3000/graphql/subscription"
//           }`,
//         }),
//       )
//     : null;
//
// const link =
//   typeof globalThis !== "undefined" && wsLink != null
//     ? split(
//         ({ query }) => {
//           const definition = getMainDefinition(query);
//           return (
//             definition.kind === "OperationDefinition" &&
//             definition.operation === "subscription"
//           );
//         },
//         wsLink,
//         httpLink,
//       )
//     : httpLink;

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
