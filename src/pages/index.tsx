import { getSortedPostsData } from "@/lib/posts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { uniqBy } from "lodash";
import { FcWorkflow, FcDislike } from "react-icons/fc";
import {
  Layout,
  Pagination,
  Profile,
  RecentPosts,
  TabTracker,
  CategoryTabs,
  TagList,
} from "@/components";

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

export default function Home({ allPostsData }: { allPostsData: PostsProps[] }) {
  // 카테고리
  const isCategory = useRouter().query.category;
  const [selectedData, setSelectedData] = useState<PostsProps[]>();
  const [initCategory, setInitCategory] = useState(false);
  const deleteOverlapCategories = uniqBy(allPostsData, "categories");
  // 페이지네이션
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const offset = (page - 1) * limit;
  // 이달의 글
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
    <Layout home siteTitle="혜조로그">
      <Profile initCategory={initCategory} />
      <RecentPosts recentPosts={recentPosts} />
      <section className="sm:mx-5 md:mx-10">
        {/* 카테고리 탭 */}
        <div className="-mb-2 flex">
          <TabTracker initCategory={initCategory} />
        </div>
        <div className="my-3 flex text-center font-heading">
          {deleteOverlapCategories?.map(({ categories, id }, i) => (
            <CategoryTabs selectedCategory={categories} key={id} i={i} />
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
              <TagList key={id} tags={tags} />
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
