import { getSortedPostsData } from "@/lib/posts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { uniqBy } from "lodash";
import { FcWorkflow, FcDislike, FcPuzzle } from "react-icons/fc";
import { Layout /* Pagination */ } from "@/components/utils";
import {
  Profile,
  RecentPosts,
  TabTracker,
  CategoryTabs,
  TagList,
} from "@/components/home";

declare global {
  interface PostsProps {
    id: string;
    title: string;
    date: string;
    categories: string;
    tags: string | string[];
    description: string;
    excerpt?: string;
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
  const isCategory = useRouter().query.category;
  const [selectedData, setSelectedData] = useState<string[]>();
  const [initCategory, setInitCategory] = useState(false);
  const deleteOverlapCategories = uniqBy(allPostsData, "categories").sort(
    ({ categories: a }, { categories: b }) => {
      if (a > b) return 1;
      else if (a < b) return -1;
      else return 0;
    },
  );
  // 페이지네이션
  const [page] = useState(1);
  const [limit] = useState(7);
  const offset = (page - 1) * limit;
  // 이달의 글
  const thisMonth =
    new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, "0");
  const recentPosts = allPostsData.filter(({ date }) => {
    return date.substring(0, 7) === thisMonth;
  });

  useEffect(() => {
    const initData = allPostsData.filter(({ categories }) => {
      if (isCategory) return categories === isCategory;
      return categories === "coding";
    });
    const deleteOverlapTags = initData.reduce(
      (all: string[], each) =>
        typeof each.tags === "string"
          ? [...new Set([...all, each.tags])]
          : [...new Set([...all, ...each.tags])],
      [],
    );
    setInitCategory(false);
    setSelectedData(deleteOverlapTags);
  }, [isCategory, allPostsData]);
  useEffect(() => {
    setInitCategory(true);
    // setLimit(7);
    // setPage(1);
  }, [selectedData]);
  useEffect(() => {
    if (sessionStorage.Page) sessionStorage.removeItem("Page");
  }, []);

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
            <CategoryTabs selectedCategory={categories} key={id} i={i} />
          ))}
        </div>
        {/* 태그 리스트 */}
        <article className="flex flex-row border-y border-blue-800 py-px backdrop-blur dark:border-blue-900">
          <div className="flex basis-1/12 items-center justify-center pl-3">
            {isCategory === "diarying" ? (
              <FcDislike className="h-6 w-6" />
            ) : isCategory === "reading" ? (
              <FcPuzzle className="h-6 w-6" />
            ) : (
              <FcWorkflow className="h-6 w-6" />
            )}
          </div>
          <div className="writing-vertical basis-11/12 pl-3">
            {selectedData?.slice(offset, offset + limit).map(tag => (
              <TagList key={tag} tags={tag} />
            ))}
          </div>
        </article>
        {/* 페이지네이션 */}
        <footer></footer>
      </section>
    </Layout>
  );
}
