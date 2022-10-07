import { GraphqlContext } from "@/utils/types";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      context: GraphqlContext,
    ) => {
      const { session, prisma } = context;
    },
  },
};

export default resolvers;
