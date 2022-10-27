import Auth from "@/components/auth";
import { CommentForm, CommentList } from "@/components/comment";
import commentOperator from "@/lib/graphql/operations/comment";
import { LoadCommentsData, LoadCommentsInput } from "@/types";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

interface CommentsProps {
  postId: string;
}

export default function CommentLayout({ postId }: CommentsProps) {
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const { data, refetch, error, loading } = useQuery<LoadCommentsData, LoadCommentsInput>(
    commentOperator.Queries.loadComments,
    {
      variables: { postId },
    },
  );

  return (
    <div className="mx-auto mt-10 max-w-xl sm:p-0 md:p-5">
      <div className="font-content text-mono">
        <Auth session={session} reloadSession={reloadSession} />
        <p className="mb-5 mt-10 select-none ">▾ Comment</p>
        <CommentForm session={session} postId={postId} refetch={refetch} />
        <CommentList
          data={data}
          error={error}
          loading={loading}
          refetch={refetch}
          session={session}
        />
      </div>
    </div>
  );
}
