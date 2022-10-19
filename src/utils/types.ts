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
  // pubsub:
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
 * Post
 */
export interface createCommentResponse {
  success?: boolean;
  error?: string;
}

export interface loadCommentsData {
  comments: Comment[];
}
export interface loadCommentsInput {
  postId: string;
}
export interface Comment {
  id: string;
  nickname: string;
  message: string;
  createdAt: Date;
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
