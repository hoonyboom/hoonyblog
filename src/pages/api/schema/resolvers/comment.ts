import { CreateCommentResponse, GraphqlContext } from "@/types";
import { ApolloError } from "apollo-server-nextjs";
import { type Comment } from "@prisma/client";

const resolvers = {
  Query: {
    loadComments: async (
      _: any,
      args: { postId: string },
      context: GraphqlContext,
    ): Promise<Array<Comment>> => {
      const { postId } = args;
      const { session, prisma } = context;

      try {
        const loadComments = prisma.comment.findMany({
          where: {
            postId,
          },
        });
        return loadComments;
      } catch (error) {
        const err = error as ErrorEvent;
        throw new ApolloError(err.message);
      }
    },
  },

  Mutation: {
    createComment: async (
      _: any,
      args: { message: string; postId: string },
      context: GraphqlContext,
    ): Promise<CreateCommentResponse> => {
      const { message, postId } = args;
      const { session, prisma } = context;

      if (!session?.user)
        return {
          error: "로그인 해주세요",
        };

      try {
        const data = await prisma.comment.create({
          data: {
            message,
            postId,
            user: {
              connect: {
                id: session.user.id,
              },
            },
            image: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
        console.log(data);
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
