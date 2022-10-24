import commentOperator from "@/lib/graphql/operations/comment";
import { CreateCommentData, CreateCommentInput } from "@/types";
import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

interface CommentType {
  postId: string;
  refetch: () => void;
  session: Session | null;
}

export default function CommentForm({ session, postId, refetch }: CommentType) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const debounceInput = useMemo(() => debounce(val => setMessage(val), 300), []);
  const [createComment] = useMutation<CreateCommentData, CreateCommentInput>(
    commentOperator.Mutations.createComment,
  );

  const onClick = async () => {
    try {
      const data = await createComment({
        variables: { message, postId },
      });
      refetch();
      console.log(data);
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
    <div className="mt-10 select-none">
      <p className="mb-5">▾ Comment</p>
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
          spellCheck="false"
          placeholder="💥 로그인 하셔야 합니당"
          ref={inputRef}
          onChange={e => debounceInput(e.target.value)}
          className="h-20 basis-5/6 resize-none rounded-xl border-[1px] border-black/10 px-3 py-2 leading-5"
        />
        <button
          onClick={onClick}
          disabled={!message || !session?.user.username}
          className="disabled:bg-stripes-gray $ ml-2 basis-1/6 rounded-xl border-[1px] border-black/10 bg-icloud text-white transition disabled:cursor-not-allowed disabled:text-black"
        >
          reply
        </button>
      </div>
    </div>
  );
}
