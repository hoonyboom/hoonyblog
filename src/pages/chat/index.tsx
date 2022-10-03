import Auth from "@/components/auth";
import ChatList from "@/components/chat";
import { Layout } from "@/components/utils";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

export default function Chat() {
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Layout>
      <div className="mt-20 flex flex-col place-items-center space-y-3">
        <div className="border-2 border-black p-10">
          {session?.user?.username ? (
            <ChatList session={session} />
          ) : (
            <Auth session={session} reloadSession={reloadSession} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}
