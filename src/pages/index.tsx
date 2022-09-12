import Link from "next/link";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSortedPostsData } from "@/lib/posts";
import { Layout, MdxComponents, Pagination } from "@/components";
import useSound from "use-sound";
import { uniqBy } from "lodash";
import { FcWorkflow, FcDislike } from "react-icons/fc";
import { BsChevronDown } from "react-icons/bs";

interface TabsProps {
  selectedCategory: string;
  i: number;
}
export interface PostsProps {
  id: string;
  title: string;
  date: string;
  categories: string;
  tags: string;
  description: string;
  excerpt?: string;
  image: string;
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

const Profile = ({ initCategory }: { initCategory: boolean }) => {
  const { Note } = MdxComponents;
  return (
    <>
      <div className="flex flex-col place-items-center">
        <div>
          <section className="mx-2 flex sm:p-8 md:mt-10  md:p-10">
            <Image
              priority
              src="/images/profile.png"
              className="rounded-full ring-2 ring-indigo-900 ring-offset-1 sm:h-16 sm:w-16 md:h-20 md:w-20"
              height={80}
              width={80}
              alt="프로필"
            />
            <div className="ml-8 flex flex-col justify-center space-y-1">
              <p className="font-heading text-lg">츄륵</p>
              <p className="text-base">갸륵하도다</p>
            </div>
          </section>
          <section className="mx-10 flex items-center">
            <p className="font-content text-base leading-7">
              안녕하세요. 처절한 코딩 생존기를 담은 사이트입니다.
              <br />
              <Note
                show={initCategory}
                type="underline"
                color="orange"
                animationDuration={1000}
              >
                코딩과 일기
              </Note>
              가 뒤죽박죽 섞여 있어요 😵‍💫
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
const RecentPosts = ({ recentPosts }: { recentPosts: PostsProps[] }) => {
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
};
const Tabs = ({ selectedCategory, i }: TabsProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push({ query: { category: selectedCategory } }, "/");
    localStorage.setItem("watchedTab", JSON.stringify({ val: i }));
  };

  return (
    <div onClick={onClick} className="basis-1/3 cursor-pointer">
      {selectedCategory}
    </div>
  );
};
const TabSelector = ({ initCategory }: { initCategory: boolean }) => {
  const [translateX, setTranslateX] = useState("0%");
  useEffect(() => {
    if (localStorage.watchedTab) {
      const xValue = JSON.parse(localStorage.getItem("watchedTab") as string).val;
      setTranslateX(`${xValue}00%`);
    }
  }, [initCategory]);

  return (
    <span
      className={"relative flex h-1 w-1 basis-1/3 justify-end duration-700"}
      style={{ transform: `translate(${translateX})` }}
    >
      <span className="absolute inline-flex h-1 w-1 animate-ping rounded-full bg-blue-600 opacity-75 dark:bg-yellow-300"></span>
      <span className="relative inline-flex h-1 w-1 rounded-full bg-blue-800 dark:bg-orange"></span>
    </span>
  );
};
const Posts = ({ tags }: Partial<PostsProps>) => {
  const [clickSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });
  return (
    <div
      onMouseUp={() => clickSound()}
      className="md:word-tightest my-5 -ml-px border-x border-r-0 border-blue-800/20 px-2 backdrop-blur sm:h-40 md:h-52"
    >
      <Link href={`/tags/${tags}`}>
        <a className="text-md no-underline">{tags}</a>
      </Link>
    </div>
  );
};

export default function Home({ allPostsData }: { allPostsData: PostsProps[] }) {
  // 카테고리 state
  const isCategory = useRouter().query.category;
  const [selectedData, setSelectedData] = useState<PostsProps[]>();
  const [initCategory, setInitCategory] = useState(false);
  const deleteOverlapCategories = uniqBy(allPostsData, "categories");
  // 페이지네이션 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const offset = (page - 1) * limit;
  const thisMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const recentPosts = allPostsData.filter(({ date }) => {
    return date.substring(5, 7) === thisMonth;
  });

  useEffect(() => {
    const initData = allPostsData.filter(({ categories }) => {
      if (isCategory) return categories === isCategory;
      return categories === "coding";
    });
    const deleteOverlapTags = uniqBy(initData, "tags");
    setInitCategory(false);
    setSelectedData(deleteOverlapTags);
  }, [isCategory, allPostsData]);
  useEffect(() => {
    setInitCategory(true);
    // setLimit(7);
    // setPage(1);
  }, [selectedData]);

  return (
    <Layout home siteTitle="후니로그">
      <Profile initCategory={initCategory} />
      <RecentPosts recentPosts={recentPosts} />
      <section className="sm:mx-5 md:mx-10">
        {/* 카테고리 탭 */}
        <div className="-mb-2 flex">
          <TabSelector initCategory={initCategory} />
        </div>
        <div className="my-3 flex text-center font-heading">
          {deleteOverlapCategories?.map(({ categories, id }, i) => (
            <Tabs selectedCategory={categories} key={id} i={i} />
          ))}
        </div>
        {/* 태그 리스트 */}
        <article className="flex flex-row border-y border-blue-800 py-px backdrop-blur dark:border-blue-900">
          <div className="flex basis-1/12 items-center justify-center pl-3">
            {isCategory === "writing" ? (
              <FcDislike className="h-6 w-6" />
            ) : (
              <FcWorkflow className="h-6 w-6" />
            )}
          </div>
          <div className="writing-vertical basis-11/12 pl-3">
            {selectedData?.slice(offset, offset + limit).map(({ id, tags }) => (
              <Posts key={id} tags={tags} />
            ))}
          </div>
        </article>
        {/* 페이지네이션 */}
        <footer>
          {
            <Pagination
              total={selectedData?.length}
              limit={limit}
              page={page}
              setLimit={setLimit}
              setPage={setPage}
            />
          }
        </footer>
      </section>
    </Layout>
  );
}
