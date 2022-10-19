import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import Image from "next/image";
import PostOperator from "@/lib/graphql/operations/post";
import toast from "react-hot-toast";
import { useMemo, useRef, useState } from "react";
import { debounce } from "lodash";

declare global {
  interface sessionProps {
    session: Session;
    postId?: string;
  }
}

export default function CoomentList({ session, postId }: sessionProps) {
  const [message, setMessage] = useState("");
  const debounceInput = useMemo(() => debounce(val => setMessage(val), 500), []);
  const [createComment] = useMutation(PostOperator.Mutations.createComment);

  const onCreateComment = async () => {
    try {
      const { data } = await createComment({
        variables: { postId, message },
      });

      console.log(data);
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };

  return (
    <>
      <p>글쓰는 인풋</p>
      <div className="flex place-items-center gap-2">
        <Image
          src={session.user.image}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
        <span>{session.user.username}</span>
        <input type="text" onChange={e => debounceInput(e.target.value)} />
        {/* 그큐엘 뮤테이트로 인풋내용+auth유저정보로 Comment 데이터 저장  */}
        <button onClick={onCreateComment}>reply</button>
      </div>
    </>
  );
}
