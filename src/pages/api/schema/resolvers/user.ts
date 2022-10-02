import { CreateUsernameResponse, GraphqlContext } from "@/utils/types";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphqlContext,
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { prisma } = context;
      try {
        await prisma.user.findMany({
          where: { username },
        });
        return { success: true };
      } catch (error) {
        const err = error as ErrorEvent;
        return {
          error: err.message,
        };
      }
    },
  },

  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphqlContext,
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user)
        return {
          error: "Not authorized",
        };

      const { id: userId } = session.user;

      try {
        /**
         * Check that username is not taken
         */
        const existUser = await prisma.user.findUnique({ where: { username } });

        if (existUser)
          return {
            error: "Username already taken. Try another.",
          };

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error) {
        const err = error as ErrorEvent;
        return {
          error: err.message,
        };
      }
    },
  },
};

export default resolvers;
