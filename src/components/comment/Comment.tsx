import { AllComments, CommentForm, IconBtn } from "@/components/comment";
import { commentOperator } from "@/lib/graphql/operations";
import {
  DeleteCommentData,
  DeleteCommentInput,
  LoadComment,
  ToggleLikeData,
  ToggleLikeInput,
} from "@/types";
import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaComment, FaEdit, FaHeart, FaTrash } from "react-icons/fa";

interface CommProps extends LoadComment {
  refetch: () => void;
  session: Session | null;
  getReplies: (parentId: string) => LoadComment[];
}

export default function Comment({
  id,
  message,
  profileImage,
  postId,
  nickname,
  createdAt,
  refetch,
  session,
  getReplies,
  parentId,
  _count: { likes },
}: CommProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const childComments = { loadComments: getReplies(id) };
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  const [DeleteComment] = useMutation<DeleteCommentData, DeleteCommentInput>(
    commentOperator.Mutations.deleteComment,
  );
  const onDelete = async () => {
    try {
      await DeleteComment({
        variables: { commentId: id, nickname },
      });
      refetch();
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  };

  const [ToggleLike] = useMutation<ToggleLikeData, ToggleLikeInput>(
    commentOperator.Mutations.toggleLike,
  );
  const onLike = async () => {
    try {
      await ToggleLike({
        variables: { commentId: id },
      });
      refetch();
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  };

  return (
    <>
      <div className="mt-2 flex flex-col rounded-lg border-[1px] border-black/10 p-3 dark:border-white/10">
        {isEditing ? (
          <div className="mt-1 ml-3">
            <CommentForm
              session={session}
              postId={postId}
              refetch={refetch}
              setIsEditing={setIsEditing}
              autofocus
              commentId={id}
              leftMessage={message}
            />
          </div>
        ) : (
          <>
            <div className="flex place-items-center justify-between pb-2">
              <Image
                src={profileImage}
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="mr-1 text-sm">
                {dateFormatter.format(Date.parse(createdAt))}
              </span>
            </div>
            <span className="px-1 pb-2 font-bold text-darkslateblue">{nickname}</span>
            <span className="mx-3 whitespace-pre-line break-words leading-6">
              {message}
            </span>
          </>
        )}

        <div className="mr-1 flex justify-end gap-3 pt-1">
          <IconBtn Icon={FaHeart} aria-label="Like" color="navy" onClick={onLike}>
            {likes}
          </IconBtn>
          {!parentId && (
            <IconBtn
              Icon={FaComment}
              aria-label={isReplying ? "답글 취소" : "답글 달기"}
              color="navy"
              onClick={() => setIsReplying(prev => !prev)}
            />
          )}
          {session?.user.username === nickname ? (
            <>
              <IconBtn
                Icon={FaEdit}
                aria-label={isEditing ? "수정 취소" : "수정"}
                color="navy"
                onClick={() => setIsEditing(prev => !prev)}
              />
              <IconBtn
                Icon={FaTrash}
                aria-label="Delete"
                color="crimson"
                onClick={onDelete}
              />
            </>
          ) : null}
        </div>

        {isReplying && (
          <div className="mt-1 ml-3">
            <CommentForm
              session={session}
              postId={postId}
              refetch={refetch}
              parentId={id}
              setIsReplying={setIsReplying}
              autofocus={true}
            />
          </div>
        )}

        {childComments?.loadComments?.length > 0 && (
          <>
            <div className={`flex ${areChildrenHidden ? "hidden" : "block"}`}>
              <button
                className="relative mt-2 w-4 -translate-x-1/2 cursor-pointer border-0 bg-none p-0 outline-none"
                aria-label="답글 숨김"
                onClick={() => setAreChildrenHidden(true)}
              ></button>
              <div className="flex-1 pl-2">
                <AllComments
                  comments={childComments}
                  getReplies={getReplies}
                  refetch={refetch}
                  session={session}
                />
              </div>
            </div>
            <button
              className={`mt-1 ${!areChildrenHidden ? "hidden" : "block"}`}
              onClick={() => setAreChildrenHidden(false)}
            >
              답글 보기
            </button>
          </>
        )}
      </div>
    </>
  );
}
