import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

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
