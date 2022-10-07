import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import ConversationsWrapper from "./conversations/ConversationsWrapper";
import FeedWrapper from "./feed/FeedWrapper";

export default function ChatList({ session }: sessionProps) {
  return (
    <div>
      <ConversationsWrapper session={session} />
      <FeedWrapper session={session} />
    </div>
  );
}
