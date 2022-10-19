import ConversationOperations from "@/lib/graphql/operations/conversation";
import userOperations from "@/lib/graphql/operations/user";
import { SearchedUser, SearchUsersData, SearchUsersInput } from "@/utils/types";
import { useLazyQuery, useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";

interface ModalProps {
  isOpen: boolean;
  session: Session;
  onClick: () => void;
}

export default function Modal({ isOpen, onClick, session }: ModalProps) {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<SearchedUser[]>([]);
  const [searchUser, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(userOperations.Queries.searchUser);

  const [createConversation] = useMutation(
    ConversationOperations.Mutations.createConversation,
  );

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    searchUser({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants(prev => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants(prev => prev.filter(p => p.id !== userId));
  };

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map(({ id }) => id)];

    try {
      const { data } = await createConversation({
        variables: { participantIds },
      });

      if (!data?.createConversation) throw new Error("Failed to Create Conversation");

      const {
        createConversation: { conversationId },
      } = data;

      router.push({
        query: {
          conversationId,
        },
      });

      /**
       * Clear state and close modal
       * on Successful creation
       */

      setParticipants([]);
      setUsername("");
      onClick();
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };

  const debounceInput = useMemo(() => debounce(val => setUsername(val), 500), []);
  return (
    <>
      <div
        className={`absolute inset-x-0 m-auto w-1/4 bg-black/80 text-center duration-100${
          isOpen ? "opacity-100" : "-z-10 opacity-0"
        }`}
      >
        <h1>Create a Conversation</h1>
        <div>
          <form action="" className="flex flex-col space-y-4 p-3">
            <input
              type="text"
              placeholder="아무거나 써주세요"
              className="text-center"
              onChange={e => debounceInput(e.target.value)}
            />
            <button type="submit" onClick={onSearch} disabled={!username}>
              Search
            </button>
          </form>
          {data?.searchUsers && (
            <UserSearchList users={data?.searchUsers} addParticipant={addParticipant} />
          )}
          {participants.length !== 0 && (
            <>
              <Participants
                participants={participants}
                removeParticipant={removeParticipant}
              />
              <button className="mt-5 w-full bg-icloud" onClick={onCreateConversation}>
                Create Conversation
              </button>
            </>
          )}
        </div>
        <button className="bg-stripes-blue rounded-lg p-3 text-white" onClick={onClick}>
          닫기
        </button>
      </div>
    </>
  );
}
