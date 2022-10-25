import {
  CreateCommentResponse,
  DeleteCommentResponse,
  UpdateCommentResponse,
  GraphqlContext,
  ReplyCommentResponse,
  ToggleLikeResponse,
} from "@/types";
import { ApolloError } from "apollo-server-nextjs";
import { type Like, type Comment } from "@prisma/client";

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
        const loadComments = await prisma.comment.findMany({
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

    // loadLikes: async (
    //   _: any,
    //   args: { postId: string },
    //   context: GraphqlContext,
    // ): Promise<Like[]> => {
    //   const { postId } = args;
    //   const { session, prisma } = context;
    //   try {
    //     const allCommentsByPost = await prisma.comment.findMany({
    //       where: { postId },
    //     });
    //     const loadLikes = await prisma.like.findMany({
    //       where: {
    //         userId: session?.user.id,
    //         commentId: {
    //           in: allCommentsByPost.map(comment => comment.id),
    //         },
    //       },
    //     });
    //     return loadLikes;
    //   } catch (error) {
    //     const err = error as ErrorEvent;
    //     throw new ApolloError(err.message);
    //   }
    // },
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

    replyComment: async (
      _: any,
      args: { postId: string; parentId: string; message: string },
      context: GraphqlContext,
    ): Promise<ReplyCommentResponse> => {
      const { postId, parentId, message } = args;
      const { session, prisma } = context;

      try {
        await prisma.comment.create({
          data: {
            message,
            postId,
            user: {
              connect: {
                id: session?.user.id,
              },
            },
            image: {
              connect: {
                id: session?.user.id,
              },
            },
            parent: {
              connect: {
                id: parentId,
              },
            },
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

    deleteComment: async (
      _: any,
      args: { commentId: string; nickname: string },
      context: GraphqlContext,
    ): Promise<DeleteCommentResponse> => {
      const { commentId, nickname } = args;
      const { session, prisma } = context;

      if (nickname !== session?.user.username)
        return {
          error: "삭제할 수 없습니다",
        };

      try {
        await prisma.comment.delete({
          where: {
            id: commentId,
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

    updateComment: async (
      _: any,
      args: { commentId: string; message: string },
      context: GraphqlContext,
    ): Promise<UpdateCommentResponse> => {
      const { commentId, message } = args;
      const { session, prisma } = context;

      try {
        await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            message,
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

    // toggleLike: async (
    //   _: any,
    //   args: { commentId: string },
    //   context: GraphqlContext,
    // ): Promise<ToggleLikeResponse> => {
    //   const { commentId } = args;
    //   const { session, prisma } = context;

    //   if (!session?.user.id)
    //     return {
    //       error: "로그인이 필요합니다.",
    //     };

    //   const data = {
    //     commentId,
    //     userId: session.user.id,
    //   };

    //   try {
    //     await prisma.like.findUnique({
    //       where: { userId_commentId: data },
    //     });

    //     return { success: true };
    //   } catch (error) {
    //     const err = error as ErrorEvent;
    //     return {
    //       error: err.message,
    //     };
    //   }
    // },
  },
};

export default resolvers;
