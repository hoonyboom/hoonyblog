import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function FeedWrapper({ session }: sessionProps) {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <div className="flex flex-col">
      {conversationId ? (
        <div className="flex">{conversationId}</div>
      ) : (
        <p>No Conversation Selected</p>
      )}
    </div>
  );
}
