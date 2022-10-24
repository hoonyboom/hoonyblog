import { useState, useEffect } from "react";
import Image from "next/image";
import { LoadComment } from "@/types";
import IconBtn from "./IconBtn";
import { FaComment, FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { commentOperator } from "@/lib/graphql/operations";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface CommentProps {
  comment: LoadComment;
  refetch: () => void;
  session: Session | null;
}

export default function Comment({ comment, refetch, session }: CommentProps) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const { id, profileImage, createdAt, nickname, message } = comment;
  const [DeleteComment] = useMutation(commentOperator.Mutations.deleteComment);
  const onDelete = async () => {
    try {
      await DeleteComment({
        variables: { commentId: id, nickname },
      });
      refetch();
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };
  const [UpdateComment] = useMutation(commentOperator.Mutations.updateComment);
  // const onEdit = () => {};

  return (
    <>
      <div className="mt-2 flex flex-col rounded-lg border-[1px] border-black/10 p-3">
        <div className="flex justify-between pb-2">
          <Image
            src={profileImage}
            alt=""
            width={30}
            height={30}
            layout="fixed"
            className="rounded-full"
          />
          <span className="mr-1 text-sm">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        <span className="pb-2">{nickname}</span>
        <span className="mx-3 whitespace-pre-line break-words">{message}</span>
        <div className="mr-1 flex justify-end gap-3 pt-1">
          <IconBtn Icon={FaHeart} aria-label="Like" color="navy">
            3
          </IconBtn>
          <IconBtn Icon={FaComment} aria-label="Reply" color="navy" />
          {session?.user.username === nickname ? (
            <>
              <IconBtn
                Icon={FaEdit}
                aria-label="Edit"
                color="navy"
                onClick={() => {
                  onEdit;
                }}
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
      </div>
    </>
  );
}
