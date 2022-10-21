import UserOperations from "@/lib/graphql/operations/user";
import { CreateUsernameData, CreateUsernameInput } from "@/types";
import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SiKakaotalk, SiTwitter, SiGoogle } from "react-icons/si";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

export default function Auth({ session, reloadSession }: AuthProps) {
  const [username, setUsername] = useState("");
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
      toast.success("로그인 성공 🚀");
      reloadSession();
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };

  const debounceInput = useMemo(() => debounce(val => setUsername(val), 500), []);

  return (
    <>
      {session ? (
        <div className="flex flex-col place-items-center justify-center gap-1">
          <p>닉네임</p>
          <input
            type="text"
            placeholder="What's yours?"
            onChange={e => debounceInput(e.target.value)}
            className="text-center"
          />
          <button onClick={onSubmit}>저장</button>
        </div>
      ) : (
        <div className="flex place-items-center justify-end gap-3">
          <p>Question?</p>
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
    </>
  );
}
