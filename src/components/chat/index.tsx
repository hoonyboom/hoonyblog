import ConversationsWrapper from "../utils/CommentList";

export default function ChatList({ session }: sessionProps) {
  return (
    <div>
      <ConversationsWrapper session={session} />
    </div>
  );
}
