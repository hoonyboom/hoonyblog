import { useState, useEffect } from "react";
import Image from "next/image";
import { LoadCommentsData } from "@/types";
import { ApolloError } from "@apollo/client";

interface CommentListProps {
  data?: LoadCommentsData;
  error?: ApolloError;
  loading: boolean;
}

export default function CommentList({ data, loading, error }: CommentListProps) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (error) throw new ApolloError(error);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      {data &&
        data.loadComments.map(({ id, profileImage, nickname, message, createdAt }) => (
          <div className="flex flex-col place-items-start pt-5" key={id}>
            <Image
              src={profileImage}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
            <span>{nickname}</span>
            <span className="flexflex-1">{message}</span>
            <span>{dateFormatter.format(Date.parse(createdAt))}</span>
          </div>
        ))}
    </>
  );
}
