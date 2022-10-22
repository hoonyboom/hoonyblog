import Auth from "@/components/auth";
import { CommentForm, CommentList } from "@/components/comment";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import commentOperator from "@/lib/graphql/operations/comment";
import { LoadCommentsData, LoadCommentsInput } from "@/types";

export default function Comments({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const { data, loading, error, refetch } = useQuery<LoadCommentsData, LoadCommentsInput>(
    commentOperator.Queries.loadComments,
    {
      variables: { postId },
    },
  );

  return (
    <div className="mt-10 p-5">
      <div>
        {session?.user?.username ? (
          <CommentForm session={session} postId={postId} refetch={refetch} />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
        <CommentList data={data} loading={loading} error={error} />
      </div>
    </div>
  );
}
