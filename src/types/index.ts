import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export interface GraphqlContext {
  session: Session | null;
  prisma: PrismaClient;
}

export type Root = any;

/**
 * * 유저
 */
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}
export interface CreateUsernameInput {
  username: string;
}
export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}
export interface SearchUsersInput {
  username: string;
}
export interface SearchedUser {
  id: string;
  username: string;
}

/**
 * * 코멘트
 */
export interface LoadCommentsData {
  loadComments: LoadComment[];
}
export interface LoadCommentsInput {
  postId: string;
}
export interface LoadComment {
  id: string;
  nickname: string;
  message: string;
  postId: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  secret: boolean;
  _count: {
    likes: number;
  };
}
export interface LoadComments {
  id: string;
  nickname: string;
  message: string;
  postId: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;
  secret: boolean;
  _count: {
    likes: number;
  };
}

export interface CreateCommentData {
  success?: boolean;
  error?: string;
}
export interface CreateCommentInput {
  message: string;
  postId: string;
}
export interface CreateCommentResponse {
  success?: boolean;
  error?: string;
}

export interface DeleteCommentData {
  success?: boolean;
  error?: string;
}
export interface DeleteCommentInput {
  commentId: string;
  nickname: string;
}
export interface DeleteCommentResponse {
  success?: boolean;
  error?: string;
}

export interface UpdateCommentData {
  success?: boolean;
  error?: string;
}
export interface UpdateCommentInput {
  commentId: string;
  message: string;
}
export interface UpdateCommentResponse {
  success?: boolean;
  error?: string;
}

export interface ReplyCommentData {
  success?: boolean;
  error?: string;
}
export interface ReplyCommentInput {
  postId: string;
  message: string;
  parentId: string;
}
export interface ReplyCommentResponse {
  success?: boolean;
  error?: string;
}

export interface ToggleLikeData {
  success?: boolean;
  error?: string;
}
export interface ToggleLikeInput {
  commentId: string;
}
export interface ToggleLikeResponse {
  success?: boolean;
  error?: string;
}
