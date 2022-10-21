import { Prisma, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

/**
 * user
 */

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface GraphqlContext {
  session: Session | null;
  prisma: PrismaClient;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

/**
 * Comment
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
  createdAt: Date;
  updatedAt: Date;
  parentId: string;
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

/**
 * Conversations
 */

// export type ConversationPopulated = Prisma.ConversationGetPayload<{
//   include: typeof conversationPopulated;
// }>;

// export type participantPopulated = Prisma.ConversationParticipantGetPayload<{
//   include: typeof participantPopulated;
// }>;

// export interface ConversationData {
//   conversation: ConversationPopulated[];
// }

// export interface CreateConversationdata {
//   createConversation: {
//     conversationId: string;
//   };
// }

// export interface CreateConversationInput {
//   participantIds: string[];
// }
