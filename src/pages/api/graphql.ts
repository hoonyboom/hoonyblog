import prisma from "@/lib/graphql/prismadb";
import { resolvers, typeDefs } from "@/pages/api/schema";
import { GraphqlContext } from "@/utils/types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-nextjs";
import { getSession } from "next-auth/react";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  context: async ({ req }): Promise<GraphqlContext> => {
    const session = await getSession({ req });
    return { session, prisma };
  },
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export default apolloServer.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "https://hyezoprk.com",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      allowedHeaders: "Content-Type, Authorization",
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
