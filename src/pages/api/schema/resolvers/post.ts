import { createCommentResponse, GraphqlContext } from "@/utils/types";
import { type Comment } from "@prisma/client";
import { ApolloError } from "apollo-server-nextjs";

const resolvers = {
  Query: {
    loadComments: async (
      _: any,
      args: { postId: string },
      context: GraphqlContext,
    ): Promise<Array<Comment>> => {
      const { postId: parentPostId } = args;
      const { prisma } = context;

      try {
        const comments = await prisma.comment.findMany({
          where: {
            postId: parentPostId,
          },
        });
        return comments;
      } catch (error) {
        const err = error as ErrorEvent;
        throw new ApolloError(err?.message);
      }
    },
  },

  Mutation: {
    createComment: async (
      _: any,
      args: { postId: string; message: string },
      context: GraphqlContext,
    ): Promise<createCommentResponse> => {
      const { message } = args;
      const { session, prisma } = context;

      if (!session?.user)
        return {
          error: "로그인 해주세요",
        };

      const { username: nickname } = session.user;

      try {
        await prisma.comment.create({
          data: {
            message,
            nickname,
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
