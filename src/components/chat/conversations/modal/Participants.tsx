import { SearchedUser } from "@/utils/types";
import { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ParticipantsProps {
  participants: SearchedUser[];
  removeParticipant: (userId: string) => void;
}

export default function Participants({
  participants,
  removeParticipant,
}: ParticipantsProps) {
  console.log(participants, " List");

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-10">
        {participants.map(participant => (
          <div
            key={participant.id}
            className="flex-row items-center rounded-md bg-smokeWhite p-2"
          >
            <p>{participant.username}</p>
            <IoIosCloseCircleOutline
              size={20}
              cursor="pointer"
              onClick={() => removeParticipant(participant.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
