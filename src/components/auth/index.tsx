import UserOperations from "@/graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

export default function Auth({ session, reloadSession }: AuthProps) {
  const [username, setUsername] = useState("");
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
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

      toast.success("Username successfully created! 🚀");
      reloadSession();
    } catch (error) {
      const err = error as ErrorEvent;
      toast.error(err.message);
    }
  };

  const debounceInput = useMemo(() => debounce(val => setUsername(val), 500), []);

  return (
    <div className="flex flex-col place-items-center space-y-3">
      {session ? (
        <>
          <p>Create a Username</p>
          <input
            type="text"
            placeholder="Enter A Username"
            onChange={e => debounceInput(e.target.value)}
            className="text-center"
          />
          <button onClick={onSubmit}>Save</button>
        </>
      ) : (
        <>
          <p>채팅방</p>
          <button className="btn" onClick={() => signIn("google")}>
            Continue with Google
          </button>
          <button className="btn" onClick={() => signIn("twitter")}>
            Continue with Twitter
          </button>
          <button className="btn" onClick={() => signIn("kakao")}>
            Continue with Kakao
          </button>
        </>
      )}
    </div>
  );
}
