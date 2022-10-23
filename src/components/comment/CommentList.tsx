import { LoadCommentsData } from "@/types";
import { ApolloError } from "@apollo/client";
import Image from "next/image";
import { Comment } from "@/components/comment";

interface CommentListProps {
  data?: LoadCommentsData;
  error?: ApolloError;
  loading: boolean;
}

export default function CommentList({ data, error, loading }: CommentListProps) {
  if (error) throw new ApolloError(error);
  if (loading) return <div>🚧 🚧 🚧</div>;

  return (
    <div className="mt-5">
      {data &&
        data.loadComments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}
