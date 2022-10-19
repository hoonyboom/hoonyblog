import Auth from "@/components/auth";
import { CommentList } from "@/components/utils";
import PostOperator from "@/lib/graphql/operations/post";
import { loadCommentsData, loadCommentsInput } from "@/utils/types";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

export default function Comments({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const { data, loading, error } = useQuery<loadCommentsData, loadCommentsInput>(
    PostOperator.Queries.loadComments,
    {
      variables: { postId },
    },
  );

  return (
    <div className="bg-stripes-sky mt-10">
      <div>
        {session?.user?.username ? (
          <CommentList session={session} postId={postId} />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
        <div>
          {/* {data?.comments.map(c => (
            <div key={c.id}>
              <span>{c.nickname}</span>
              <span>{c.message}</span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
