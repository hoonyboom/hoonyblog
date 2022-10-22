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
  if (error) throw new ApolloError(error);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      {data &&
        data.loadComments.map(({ id, profileImage, nickname, message }) => (
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
          </div>
        ))}
    </>
  );
}
