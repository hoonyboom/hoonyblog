import { NextApiRequest, NextApiResponse } from "next";
import { resolvers, typeDefs } from "@/pages/api/schema";
import { GraphqlContext } from "@/utils/types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-micro";
import { getSession } from "next-auth/react";
import prisma from "@/lib/graphql/prismadb";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD", "OPTIONS"],
  credentials: true,
  preflightContinue: true,
});

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

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, result: any) => void,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);

      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await runMiddleware(req, res, cors);
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
