import { resolvers, typeDefs } from "@/pages/api/schema";
import { GraphqlContext } from "@/utils/types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-micro";
import { getSession } from "next-auth/react";
import prisma from "@/lib/graphql/prismadb";
import Cors from "micro-cors";
import { send } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({});
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
});
const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === "OPTIONS") {
  //   res.end();
  //   return false;
  // }

  await startServer;
  const handle = await apolloServer.createHandler({
    path: "/api/graphql",
  });

  return cors((req, res) => {
    req.method === "OPTIONS" ? send(res, 200, "ok") : handle(req, res);
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
