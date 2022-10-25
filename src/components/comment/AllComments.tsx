import { Comment } from "@/components/comment";
import { LoadComment } from "@/types";
import { Session } from "next-auth";

interface AllCommentsProps {
  comments: { loadComments: LoadComment[] };
  refetch: () => void;
  session: Session | null;
  getReplies: (parentId: string) => LoadComment[];
}

export default function AllComments({
  comments,
  refetch,
  session,
  getReplies,
}: AllCommentsProps) {
  return (
    <>
      {comments?.loadComments?.map(comment => (
        <div key={comment.id}>
          <Comment
            refetch={refetch}
            session={session}
            getReplies={getReplies}
            {...comment}
          />
        </div>
      ))}
    </>
  );
}
