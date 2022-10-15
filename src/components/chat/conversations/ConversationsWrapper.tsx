import ConversationOprations from "@/lib/graphql/operations/conversation";
import { ConversationData, ConversationPopulated } from "@/utils/types";
import { useQuery } from "@apollo/client";
import { Session } from "next-auth";
import ConversationList from "./CoversationList";

declare global {
  interface sessionProps {
    session: Session;
    conversation?: ConversationPopulated[];
  }
}

export default function ConversationsWrapper({ session }: sessionProps) {
  const { data, error, loading } = useQuery<ConversationData>(
    ConversationOprations.Queries.conversation,
  );

  return (
    <>
      <p>Conversations Wrapper</p>
      <ConversationList session={session} conversation={data?.conversation} />
    </>
  );
}
