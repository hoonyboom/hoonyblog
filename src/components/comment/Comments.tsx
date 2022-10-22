import Auth from "@/components/auth";
import { CommentForm, CommentList } from "@/components/comment";
import { LoadComment } from "@/types";
import { useSession } from "next-auth/react";

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

  return (
    <div className="mt-10 p-5">
      <div>
        {session?.user?.username ? (
          <CommentForm session={session} postId={postId} /* refetch={refetch} */ />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
        <CommentList data={data} />
      </div>
    </div>
  );
}
