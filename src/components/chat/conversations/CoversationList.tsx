import { useState, useEffect } from "react";
import Modal from "./modal";

export default function ConversationList({ session }: sessionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full">
      <div
        className="mb-4 cursor-pointer rounded-md bg-black/80 py-2 px-4"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <p className="text-center text-white/80 ">Find or start a Conversation</p>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} session={session} />
    </div>
  );
}
