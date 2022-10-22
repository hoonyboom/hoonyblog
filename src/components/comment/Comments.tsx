import Auth from "@/components/auth";
import { CommentForm, CommentList } from "@/components/comment";
import { LoadComment, LoadCommentsData, LoadCommentsInput } from "@/types";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import commentOperator from "@/lib/graphql/operations/comment";

interface CommentsProps {
  allComments: LoadComment[];
  postId: string;
}

export default function Comments({ allComments: data, postId }: CommentsProps) {
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const { data: queryData, refetch } = useQuery<LoadCommentsData, LoadCommentsInput>(
    commentOperator.Queries.loadComments,
    {
      variables: { postId },
    },
  );

  console.log(queryData);

  return (
    <div className="mt-10 p-5">
      <div>
        {session?.user?.username ? (
          <CommentForm session={session} postId={postId} refetch={refetch} />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
        <CommentList data={data} />
      </div>
    </div>
  );
}
