import { AllComments, Comment } from "@/components/comment";
import { LoadComment, LoadCommentsData } from "@/types";
import { ApolloError } from "@apollo/client";
import { Session } from "next-auth";
import { useMemo } from "react";

interface CommentListProps {
  data?: LoadCommentsData;
  error?: ApolloError;
  loading?: boolean;
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
  const comments = data?.loadComments;
  const commentsByParentId = useMemo(() => {
    const group = {};
    comments?.forEach(comment => {
      if (comment.parentId !== null) {
        const setParent: LoadComment[] = (group[comment.parentId] ||= []);
        setParent.push(comment);
      } else {
        const rootComments: { loadComments: LoadComment[] } = (group["rootComments"] ||= {
          loadComments: [],
        });
        rootComments.loadComments.push(comment);
      }
    });
    return group;
  }, [comments]);

  const getReplies = (parentId: string) => {
    return commentsByParentId[parentId];
  };

  const rootComments: { loadComments: LoadComment[] } =
    commentsByParentId["rootComments"];

  if (error) throw new ApolloError(error);
  if (loading) return <div className="mt-5 text-center">🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 </div>;

  return (
    <div className="mt-5">
      <AllComments
        comments={rootComments}
        getReplies={getReplies}
        refetch={refetch}
        session={session}
      />
    </div>
  );
}
