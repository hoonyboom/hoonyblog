import { ConversationPopulated } from "@/utils/types";
import { useState, useEffect } from "react";

interface ConversationItemsProps {
  conversation: ConversationPopulated;
}

export default function ConversationItems({ conversation }: ConversationItemsProps) {
  console.log("체크", conversation);
  return <div className="flex">컨버세이션 아이디: {conversation.id}</div>;
}
