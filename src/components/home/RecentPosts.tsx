import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FcDislike, FcWorkflow, FcPuzzle } from "react-icons/fc";
import useSound from "use-sound";

export default function RecentPosts({ recentPosts }: { recentPosts: PostsProps[] }) {
  const [tabSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });
  const [beepSound] = useSound("/sounds/beep.mp3", { volume: 0.6 });
  const [isClick, setIsClick] = useState(true);
  const [animation, setAnimation] = useState(false);
  const thisMonth = useRef<string>();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.RecentPosts) {
      const data = JSON.parse(localStorage.getItem("RecentPosts") as string).toggle;
      setIsClick(data);
    }
    thisMonth.current = new Date().toLocaleString("en", { month: "short" });
  }, [recentPosts]);

  useEffect(() => {
    setAnimation(isClick);
  }, [isClick]);

  return (
    <div className="mb-px sm:mx-5 sm:mt-12 md:mx-10 md:mt-16">
      <div
        onClick={() => {
          localStorage.setItem("RecentPosts", JSON.stringify({ toggle: !isClick }));
          setIsClick(!isClick);
          beepSound();
        }}
        className="relative my-2 flex cursor-fancyHover place-items-center justify-center rounded-md bg-blue-800 py-1 text-md text-white dark:bg-blue-900"
      >
        <div className="grow select-none text-center font-grapeNuts">
          {thisMonth.current}
        </div>
        <div className="absolute right-2">
          <BsChevronDown
            className={`duration-700 ${animation ? "rotate-0" : "-rotate-180"}`}
          />
        </div>
      </div>
      <div
        className={`grid gap-x-5 text-base transition-all duration-1000 sm:grid-cols-1 md:grid-cols-2 ${
          animation ? "opacity-100" : "opacity-0"
        }`}
      >
        {isClick &&
          recentPosts.map(({ id, categories, title }) => {
            return (
              <Link
                key={id}
                href={`/posts/${id}`}
                onMouseUp={() => tabSound()}
                onClick={() => sessionStorage.setItem("path", router.asPath)}
                className="mb-2 flex flex-row justify-between border-slate-600/30 px-5 no-underline sm:border-y-0 sm:py-1 md:border-y md:py-2"
              >
                <div>
                  {categories === "coding" ? (
                    <FcWorkflow className="size-5" />
                  ) : categories === "project" ? (
                    <FcDislike className="size-5" />
                  ) : (
                    <FcPuzzle className="size-5" />
                  )}
                </div>
                <div>{title}</div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
