import commentOperator from "@/lib/graphql/operations/comment";
import { CreateCommentData, CreateCommentInput } from "@/types";
import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import Image from "next/image";
import { useMemo, useState } from "react";
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
  const debounceInput = useMemo(() => debounce(val => setMessage(val), 500), []);
  const [createComment] = useMutation<CreateCommentData, CreateCommentInput>(
    commentOperator.Mutations.createComment,
  );
  const onClick = async () => {
    try {
      const data = await createComment({
        variables: { message, postId },
      });
      console.log(data);
      refetch();
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };

  return (
    <>
      <p>Comments 💍</p>
      <div className="flex place-items-center gap-2 pt-6">
        <Image
          src={session.user.image}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
        <span>{session.user.username}</span>
        <input type="text" onChange={e => debounceInput(e.target.value)} />
        <button onClick={onClick} disabled={!message}>
          reply
        </button>
      </div>
    </>
  );
}
