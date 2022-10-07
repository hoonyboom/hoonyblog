import { PrismaClient } from "@prisma/client";
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
 * Conversations
 */

export interface CreateConversationdata {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: string[];
}
