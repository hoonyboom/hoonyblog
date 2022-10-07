import { useState, useEffect } from "react";
import { Session } from "next-auth";
import ConversationList from "./CoversationList";

declare global {
  interface sessionProps {
    session: Session;
  }
}

export default function ConversationsWrapper({ session }: sessionProps) {
  return (
    <>
      <p>Conversations Wrapper</p>
      <ConversationList session={session} />
    </>
  );
}
