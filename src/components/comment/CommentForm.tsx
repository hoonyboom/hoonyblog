import commentOperator from "@/lib/graphql/operations/comment";
import {
  CreateCommentData,
  CreateCommentInput,
  ReplyCommentData,
  ReplyCommentInput,
  UpdateCommentData,
  UpdateCommentInput,
} from "@/types";
import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

interface CommentType {
  postId: string;
  refetch: () => void;
  session: Session | null;
  parentId?: string;
  commentId?: string;
  setIsReplying?: Dispatch<SetStateAction<boolean>>;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  autofocus?: boolean;
  leftMessage?: string;
}

export default function CommentForm({
  session,
  postId,
  refetch,
  parentId,
  setIsReplying,
  setIsEditing,
  autofocus,
  commentId,
  leftMessage,
}: CommentType) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const debounceInput = useMemo(() => debounce(val => setMessage(val), 300), []);

  const [createComment] = useMutation<CreateCommentData, CreateCommentInput>(
    commentOperator.Mutations.createComment,
  );
  const [ReplyComment] = useMutation<ReplyCommentData, ReplyCommentInput>(
    commentOperator.Mutations.replyComment,
  );
  const [UpdateComment] = useMutation<UpdateCommentData, UpdateCommentInput>(
    commentOperator.Mutations.updateComment,
  );

  useEffect(() => {
    if (leftMessage && inputRef.current) inputRef.current.value = leftMessage;
  }, [leftMessage]);

  const onCreate = async () => {
    try {
      await createComment({
        variables: { message, postId },
      });
      refetch();
      if (inputRef.current) {
        inputRef.current.value = "";
        setMessage("");
      }
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };

  const onReply = async () => {
    if (parentId && setIsReplying && inputRef.current)
      try {
        await ReplyComment({
          variables: { message, postId, parentId },
        });
        setIsReplying(false);
        setMessage("");
        inputRef.current.value = "";
        refetch();
      } catch (error) {
        const err = error as ErrorEvent;
        toast.error(err.message);
      }
  };

  const onEdit = async () => {
    if (commentId && setIsEditing && inputRef.current) {
      console.log(commentId, message);
      try {
        await UpdateComment({
          variables: { commentId, message },
        });
        setIsEditing(false);
        setMessage("");
        inputRef.current.value = "";
        refetch();
      } catch (error) {
        const err = error as ErrorEvent;
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="select-none">
      <div className="flex place-items-center gap-2">
        {session?.user.username ? (
          <Image
            src={session.user.image}
            alt=""
            width={30}
            height={30}
            className="rounded-full"
          />
        ) : null}
        <span>{session?.user.username}</span>
      </div>
      <div className="mt-3 flex">
        <textarea
          autoFocus={autofocus}
          spellCheck="false"
          placeholder="💥 로그인 하셔야 합니당"
          ref={inputRef}
          onChange={e => debounceInput(e.target.value)}
          className="h-20 basis-5/6 resize-none rounded-xl border-[1px] border-black/10 px-3 py-2 leading-5"
        />
        <button
          onClick={parentId ? onReply : commentId ? onEdit : onCreate}
          disabled={!message || !session?.user.username}
          className="disabled:bg-stripes-gray $ ml-2 basis-1/6 rounded-xl border-[1px] border-black/10 bg-icloud transition disabled:cursor-not-allowed"
        >
          {parentId ? "reply" : commentId ? "edit" : "post"}
        </button>
      </div>
    </div>
  );
}
