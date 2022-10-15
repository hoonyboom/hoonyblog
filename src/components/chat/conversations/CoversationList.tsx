import { useState, useEffect } from "react";
import ConversationItems from "./ConversationItem";
import Modal from "./modal";

export default function ConversationList({ session, conversation }: sessionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(!isOpen);

  return (
    <div className="w-full">
      <div
        className="mb-4 cursor-pointer rounded-md bg-black/80 py-2 px-4"
        onClick={onClick}
      >
        <p className="text-center text-white/80 ">Find or start a Conversation</p>
      </div>
      <Modal isOpen={isOpen} onClick={onClick} session={session} />
      {conversation?.map(c => (
        <ConversationItems key={c.id} conversation={c} />
      ))}
    </div>
  );
}
