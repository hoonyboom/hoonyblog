import {
  CategoryTabs,
  Profile,
  RecentPosts,
  TabTracker,
  TagList,
} from "@/components/home";
import { Layout /* Pagination */ } from "@/components/utils";
import { getSortedPostsData } from "@/lib/posts";
import { uniqBy } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FcDislike, FcPuzzle, FcWorkflow } from "react-icons/fc";

declare global {
  interface PostsProps {
    id: string;
    title: string;
    date: string;
    categories: string;
    tags: string | string[];
    description: string;
    excerpt?: string;
    pinned?: boolean;
    series?: string;
    image: string;
  }
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: { allPostsData },
  };
}

export default function Home({ allPostsData }: { allPostsData: PostsProps[] }) {
  // 카테고리
  const router = useRouter();
  const whichCategory = router.query.category;
  const [initCategory, setInitCategory] = useState(false);
  const [sortedDataByTag, setSortedDataByTag] = useState<string[]>();
  const deleteOverlapCategories = useMemo(
    () =>
      uniqBy(allPostsData, "categories").sort(({ categories: a }, { categories: b }) => {
        if (a > b) return 1;
        else if (a < b) return -1;
        else return 0;
      }),
    [allPostsData],
  );

  // 페이지네이션
  const page = 1,
    limit = 7,
    offset = (page - 1) * limit;

  // 이달의 글
  const recentPosts = useMemo(() => getPinnedPosts(allPostsData), [allPostsData]);

  useEffect(() => {
    const initData = allPostsData.filter(({ categories }) => {
      if (whichCategory) return categories === whichCategory;
      else return categories === "coding";
    });

    const deleteOverlapTags = initData.reduce(
      (all: string[], each) =>
        typeof each.tags === "string"
          ? [...new Set([...all, each.tags])]
          : [...new Set([...all, ...each.tags])],
      [],
    );
    setInitCategory(false);
    setSortedDataByTag(deleteOverlapTags);
    if (sessionStorage.Page) sessionStorage.removeItem("Page");
  }, [whichCategory, allPostsData]);

  useEffect(() => {
    setInitCategory(true);
  }, [sortedDataByTag]);

  return (
    <Layout home siteTitle="혜조로그">
      <Profile initCategory={initCategory} />
      <RecentPosts recentPosts={recentPosts} />
      <section className="pb-10 sm:mx-5 md:mx-10">
        {/* 카테고리 탭 */}
        <div className="-mb-2 flex">
          <TabTracker initCategory={initCategory} />
        </div>
        <div className="my-3 flex text-center font-grapeNuts text-md font-bold">
          {deleteOverlapCategories?.map(({ categories, id }, i) => (
            <CategoryTabs category={categories} key={id} i={i} />
          ))}
        </div>
        {/* 태그 리스트 */}
        <article className="flex flex-row border-y border-blue-800 py-px backdrop-blur dark:border-blue-900">
          <div className="flex basis-1/12 items-center justify-center pl-3">
            {whichCategory === "project" ? (
              <FcDislike className="size-6" />
            ) : whichCategory === "reading" ? (
              <FcPuzzle className="size-6" />
            ) : (
              <FcWorkflow className="size-6" />
            )}
          </div>
          <div className="writing-vertical basis-11/12 pl-3">
            {sortedDataByTag?.slice(offset, offset + limit).map(tag => (
              <TagList key={tag} tag={tag} />
            ))}
          </div>
        </article>
        {/* 페이지네이션 */}
        <footer></footer>
      </section>
    </Layout>
  );
}

function getPinnedPosts(allPostsData: PostsProps[]) {
  const pinnedPosts = allPostsData.filter(({ pinned }) => pinned);
  return pinnedPosts;
}

// function getThisMonth(allPostsData: PostsProps[]) {
//   const thisMonth =
//     new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, "0");
//   return allPostsData.filter(({ date }) => date.substring(0, 7) === thisMonth);
// }
