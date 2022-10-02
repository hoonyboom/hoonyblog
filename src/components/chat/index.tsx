import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function ChatList({ session }: { session: Session }) {
  return (
    <div>
      <p>닉네임: {session.user?.username}</p>
      <p>ChatList</p>
      <button className="btn" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
