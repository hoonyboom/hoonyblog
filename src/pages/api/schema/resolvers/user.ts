import { CreateUsernameResponse, GraphqlContext } from "@/types";

const resolvers = {
  Query: {},

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
          error: "로그인 해주세요",
        };

      const { id: userId } = session.user;

      try {
        const existUser = await prisma.user.findUnique({ where: { username } });
        if (existUser)
          return {
            error: "이미 사용중인 이름입니다.",
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
      } catch (e) {
        return {
          error: (e as Error).message,
        };
      }
    },
  },
};

export default resolvers;
