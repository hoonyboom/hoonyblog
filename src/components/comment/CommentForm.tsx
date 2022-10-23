import commentOperator from "@/lib/graphql/operations/comment";
import { CreateCommentData, CreateCommentInput } from "@/types";
import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

declare global {
  interface sessionProps {
    session: Session;
  }
}
interface CommentType extends sessionProps {
  postId: string;
  refetch: () => void;
}

export default function CommentForm({ session, postId, refetch }: CommentType) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const debounceInput = useMemo(() => debounce(val => setMessage(val), 500), []);
  const [createComment] = useMutation<CreateCommentData, CreateCommentInput>(
    commentOperator.Mutations.createComment,
  );
  const onClick = async () => {
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

  return (
    <div className="mt-16">
      <p>▾ Comment</p>
      <div className="flex place-items-center gap-2 pt-6">
        <Image
          src={session.user.image}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
        <span>{session.user.username}</span>
      </div>
      <div className="mt-3 flex">
        <textarea
          ref={inputRef}
          onChange={e => debounceInput(e.target.value)}
          className="basis-5/6 resize-none rounded-xl border-[1px] border-black/10 px-3 py-2"
        />
        <button
          onClick={onClick}
          disabled={!message}
          className="disabled:bg-stripes-gray ml-2 basis-1/6 rounded-xl border-[1px] border-black/10 bg-icloud text-white transition duration-500 disabled:text-black"
        >
          reply
        </button>
      </div>
    </div>
  );
}
