import useSound from "use-sound";
import Link from "next/link";
import { PostsProps } from "@/pages";

export default function TagList({ tags }: Partial<PostsProps>) {
  const [tabSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  return (
    <div
      onClick={() => tabSound()}
      className={`my-5 -ml-px border-x border-r-0 border-blue-800/20 px-2 backdrop-blur sm:h-40 md:h-52 ${
        navigator.userAgent.indexOf("Safari") !== -1 &&
        navigator.userAgent.indexOf("Chrome") === -1
          ? "word-safari tracking-wider"
          : "word-tightest"
      }`}
    >
      <Link href={`/tags/${tags}`}>
        <a className="text-md no-underline">{tags}</a>
      </Link>
    </div>
  );
}
