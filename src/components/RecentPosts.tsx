import { PostsProps } from "@/pages";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FcWorkflow, FcDislike } from "react-icons/fc";
import Link from "next/link";

export default function RecentPosts({ recentPosts }: { recentPosts: PostsProps[] }) {
  const [isClick, setIsClick] = useState(false);
  const [animation, setAnimation] = useState(false);
  const Month = new Date().getMonth() + 1;

  useEffect(() => {
    setAnimation(!animation);
  }, [isClick]);
  useEffect(() => {
    if (localStorage.getItem("Monthly")) {
      const data = JSON.parse(localStorage.getItem("Monthly") as string).toggle;
      setIsClick(data);
    }
  }, []);

  return (
    <div className="mb-px cursor-pointer sm:mx-5 sm:mt-8 md:mx-10 md:mt-16">
      <div
        onClick={() => {
          setIsClick(!isClick);
          localStorage.setItem("Monthly", JSON.stringify({ toggle: !isClick }));
        }}
        className="relative my-2 flex place-items-center justify-center bg-blue-800 py-1 text-md text-white dark:bg-blue-900"
      >
        <div className="grow text-center">{Month}月</div>
        <div className="absolute right-2">
          <BsChevronDown
            className={`duration-700 ${!animation ? "-rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div
        className={`grid gap-x-5 text-base duration-1000 sm:grid-cols-1 md:grid-cols-2 ${
          !animation ? "opacity-100" : "opacity-0"
        }`}
      >
        {isClick &&
          recentPosts.map(({ id, categories, title }) => {
            return (
              <div
                key={id}
                className={
                  "mb-2 flex flex-row justify-between border-slate-600/30 px-5 sm:border-y-0 sm:py-1 md:border-y md:py-2"
                }
              >
                <div>
                  {categories === "coding" ? (
                    <FcWorkflow className="h-5 w-5" />
                  ) : (
                    <FcDislike className="h-5 w-5" />
                  )}
                </div>
                <Link href={`/posts/${id}`}>
                  <a className="no-underline">{title}</a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
