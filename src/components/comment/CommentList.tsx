import { Comment } from "@/components/comment";
import { LoadCommentsData } from "@/types";
import { ApolloError } from "@apollo/client";
import { Session } from "next-auth";

interface CommentListProps {
  data?: LoadCommentsData;
  error?: ApolloError;
  loading: boolean;
  refetch: () => void;
  session: Session | null;
}

export default function CommentList({
  data,
  error,
  loading,
  refetch,
  session,
}: CommentListProps) {
  if (error) throw new ApolloError(error);
  if (loading) return <div>🚧 🚧 🚧</div>;
  return (
    <div className="mt-5">
      {data &&
        data.loadComments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            refetch={refetch}
            session={session}
          />
        ))}
    </div>
  );
}
