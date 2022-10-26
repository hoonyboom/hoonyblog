import UserOperations from "@/lib/graphql/operations/user";
import { CreateUsernameData, CreateUsernameInput } from "@/types";
import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SiKakaotalk, SiTwitter, SiGoogle } from "react-icons/si";
import { Modal } from "@/components/layout";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

export default function Auth({ session, reloadSession }: AuthProps) {
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameInput
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });
      if (!data?.createUsername) throw new Error();
      if (data.createUsername.error) {
        const { error } = data.createUsername;
        toast.error(error);
        return;
      }
      toast.success(`${username}으로 로그인하셨습니다!`);
      setIsOpen(false);
      reloadSession();
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [session]);

  const debounceInput = useMemo(() => debounce(val => setUsername(val), 300), []);

  return (
    <div className="relative">
      {session?.user.username ? (
        <div
          className="absolute right-2 top-12 select-none text-sm opacity-10 duration-300 hover:cursor-pointer hover:text-jadu hover:opacity-100"
          onClick={() => signOut()}
        >
          Sign Out
        </div>
      ) : session ? (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <input
            autoFocus
            spellCheck="true"
            type="text"
            placeholder="닉네임을 입력하세요"
            onChange={e => debounceInput(e.target.value)}
            className="mt-7 flex-1 border-0 bg-transparent text-center caret-salary outline-none"
          />
          <button
            onClick={onSubmit}
            className={`relative bottom-16 transition duration-500 ${
              username
                ? "animate-wiggle opacity-100 hover:animate-none"
                : "cursor-none opacity-0"
            }`}
          >
            저장
          </button>
        </Modal>
      ) : (
        <div className="flex place-items-center justify-end gap-3">
          <p className="italic">Comment ?</p>
          <button className="btn" onClick={() => signIn("google")}>
            <SiGoogle />
          </button>
          <button className="btn" onClick={() => signIn("twitter")}>
            <SiTwitter />
          </button>
          <button className="btn" onClick={() => signIn("kakao")}>
            <SiKakaotalk />
          </button>
        </div>
      )}
    </div>
  );
}
