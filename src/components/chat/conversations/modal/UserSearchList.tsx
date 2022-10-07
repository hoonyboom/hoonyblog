import { SearchedUser } from "@/utils/types";
import Image from "next/future/image";
import { useState, useEffect } from "react";

interface userSearchListProps {
  users: SearchedUser[];
  addParticipant: (user: SearchedUser) => void;
}

export default function UserSearchList({ users, addParticipant }: userSearchListProps) {
  return (
    <>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="flex flex-col">
          {users.map(user => {
            return (
              <div key={user.id} className="flex place-items-center space-x-4 px-3">
                <Image
                  className="avartar"
                  width={12}
                  height={12}
                  src="/images/profile.png"
                  alt=""
                />
                <div className="flex w-full justify-between text-center hover:bg-white/80">
                  <span>{user.username}</span>
                  <button
                    className="hover:bg-icloud"
                    onClick={() => addParticipant(user)}
                  >
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
