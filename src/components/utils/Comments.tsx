import Auth from "@/components/auth";
import { CommentList } from "@/components/utils";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import commentOperator from "@/lib/graphql/operations/comment";
import { LoadCommentsData, LoadCommentsInput } from "@/utils/types";
import Image from "next/image";

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

  console.log(data);

  return (
    <div className="mt-10 p-5">
      <div>
        {session?.user?.username ? (
          <CommentList session={session} postId={postId} refetch={refetch} />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
        {data &&
          data.loadComments.map(comment => (
            <div className="flex flex-col place-items-start pt-5" key={comment.id}>
              <Image
                src={comment.profileImage}
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
              <span>{comment.nickname}</span>
              <span className="flexflex-1">{comment.message}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
