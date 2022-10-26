import {
  CreateCommentResponse,
  DeleteCommentResponse,
  GraphqlContext,
  ReplyCommentResponse,
  UpdateCommentResponse,
  ToggleLikeResponse,
  LoadComments,
} from "@/types";
import { type Comment } from "@prisma/client";
import { ApolloError } from "apollo-server-nextjs";

const resolvers = {
  Query: {
    loadComments: async (
      _: any,
      args: { postId: string },
      context: GraphqlContext,
    ): Promise<LoadComments[]> => {
      const { postId } = args;
      const { prisma } = context;

      try {
        const loadComments = await prisma.comment.findMany({
          where: {
            postId,
          },
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            nickname: true,
            message: true,
            parentId: true,
            postId: true,
            secret: true,
            createdAt: true,
            updatedAt: true,
            profileImage: true,
            _count: {
              select: { likes: true },
            },
          },
        });
        console.log(loadComments);

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
        await prisma.comment.create({
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
          select: {
            message: true,
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

    toggleLike: async (
      _: any,
      args: { commentId: string },
      context: GraphqlContext,
    ): Promise<ToggleLikeResponse> => {
      const { commentId } = args;
      const { session, prisma } = context;

      if (!session?.user.id)
        return {
          error: "로그인이 필요합니다.",
        };

      const data = {
        commentId,
        userId: session.user.id,
      };

      try {
        const like = await prisma.like.findUnique({
          where: { userId_commentId: data },
        });

        if (like === null)
          return await prisma.like.create({ data }).then(() => {
            return { success: true };
          });
        else
          return await prisma.like
            .delete({
              where: {
                userId_commentId: data,
              },
            })
            .then(() => {
              return { success: true };
            });
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
