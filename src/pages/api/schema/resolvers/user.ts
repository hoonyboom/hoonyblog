import { CreateUsernameResponse, GraphqlContext } from "@/utils/types";
import { type User } from "@prisma/client";
import { ApolloError } from "apollo-server-nextjs";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphqlContext,
    ): Promise<Array<User>> => {
      const { username: searchedUsersName } = args;
      const { session, prisma } = context;

      if (!session?.user) throw new ApolloError("Not Authorize");

      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsersName,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });
        return users;
      } catch (error) {
        const err = error as ErrorEvent;
        console.log("searchUsers error :", err);
        throw new ApolloError(err?.message);
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
