import { useState, useEffect } from "react";
import Image from "next/image";
import { LoadComment } from "@/types";
import IconBtn from "./IconBtn";
import { FaComment, FaEdit, FaHeart, FaTrash } from "react-icons/fa";

interface CommentProps {
  comment: LoadComment;
}

export default function Comment({ comment }: CommentProps) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const { profileImage, createdAt, nickname, message } = comment;

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
          <span className="">{dateFormatter.format(Date.parse(createdAt))}</span>
        </div>
        <span className="pb-2">{nickname}</span>
        <span className="mx-3 whitespace-pre-line break-words">{message}</span>
        <div className="mr-1 flex justify-end gap-3 pt-1">
          <IconBtn Icon={FaHeart} aria-label="Like" color="navy">
            3
          </IconBtn>
          <IconBtn Icon={FaComment} aria-label="Reply" color="navy" />
          <IconBtn Icon={FaEdit} aria-label="Edit" color="navy" />
          <IconBtn Icon={FaTrash} aria-label="Delete" color="crimson" />
        </div>
      </div>
    </>
  );
}
