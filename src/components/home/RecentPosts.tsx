import { PostsProps } from "@/pages";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FcWorkflow, FcDislike } from "react-icons/fc";
import useSound from "use-sound";
import Link from "next/link";

export default function RecentPosts({ recentPosts }: { recentPosts: PostsProps[] }) {
  const [tabSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });
  const [beepSound] = useSound("/sounds/beep.mp3", { volume: 0.6 });
  const [isClick, setIsClick] = useState(false);
  const [animation, setAnimation] = useState(false);
  const thisMonth = new Date().getMonth() + 1;

  useEffect(() => {
    if (localStorage.getItem("RecentPosts")) {
      const data = JSON.parse(localStorage.getItem("RecentPosts") as string).toggle;
      setIsClick(data);
    }
  }, []);
  useEffect(() => {
    setAnimation(prev => !prev);
  }, [isClick]);

  return (
    <div className="mb-px sm:mx-5 sm:mt-12 md:mx-10 md:mt-16">
      <div
        onClick={() => {
          setIsClick(!isClick);
          localStorage.setItem("RecentPosts", JSON.stringify({ toggle: !isClick }));
          beepSound();
        }}
        className="relative my-2 flex cursor-fancyHover place-items-center justify-center bg-blue-800 py-1 text-md text-white dark:bg-blue-900"
      >
        <div className="grow text-center">{thisMonth}月</div>
        <div className="absolute right-2">
          <BsChevronDown
            className={`duration-700 ${animation ? "-rotate-180" : "rotate-0"}`}
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
              <Link key={id} href={`/posts/${id}`}>
                <a
                  onMouseUp={() => tabSound()}
                  className={
                    "mb-2 flex flex-row justify-between border-slate-600/30 px-5 no-underline sm:border-y-0 sm:py-1 md:border-y md:py-2"
                  }
                >
                  <div>
                    {categories === "coding" ? (
                      <FcWorkflow className="h-5 w-5" />
                    ) : (
                      <FcDislike className="h-5 w-5" />
                    )}
                  </div>
                  <div>{title}</div>
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
