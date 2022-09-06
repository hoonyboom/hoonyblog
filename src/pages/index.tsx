import Head from "next/head";
import Link from "next/link";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSortedPostsData } from "@/lib/posts";
import { Layout, Date, MdxComponents, Pagination } from "@/components";
import { siteTitle, name } from "@/components/Seo";
import useSound from "use-sound";

export interface PostsProps {
  id: string;
  title: string;
  date: string;
  categories: string;
  description?: string;
  // index: number;
  tags: string;
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  console.log(allPostsData);
  return {
    props: { allPostsData },
  };
}

function Profile({
  changed,
  isCategory,
}: {
  changed: boolean;
  isCategory?: string | string[];
}) {
  const { Note } = MdxComponents;
  return (
    <>
      <div className="flex flex-col place-items-center">
        <div>
          <section className="mx-2 mt-10 flex p-10">
            <Image
              priority
              src="/images/profile3.png"
              className="h-20 w-20 rounded-full ring-2 ring-blue-300/90 ring-offset-4 ring-offset-slate-600"
              height={80}
              width={80}
              alt={name}
            />
            <div className="ml-8 flex flex-col justify-center space-y-1">
              <p className="text-lg">{name}</p>
              <p className="text-base">갸륵하도다</p>
            </div>
          </section>
          <section className="mx-10 flex items-center">
            <p className="font-content text-md leading-7">
              안녕하세요. 처절한 코딩 생존기를 담은 사이트입니다.
              <br />
              <Note
                show={changed}
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

      <div className="my-12 border-b border-blue-800"></div>
      <div className="border-y border-blue-800">
        <div className="my-2 flex gap-4 bg-blue-800 py-2 text-xl text-white">
          <div className="flex-none pl-4">&nbsp;</div>
          <div className="grow text-center">이번달의 글</div>
          <div className="flex-none pr-4">x</div>
        </div>
      </div>

      {/* 카레고리 헤더 */}
      {/* <section className="mx-10 mt-28 md:mx-0">
        <Note
          show={changed}
          type="bracket"
          strokeWidth={3}
          brackets={["left", "right"]}
          color={
            isCategory === "coding"
              ? "tomato"
              : isCategory === "writing"
              ? "crimson"
              : "skyblue"
          }
          animationDelay={1200}
          css="px-2 text-2xl"
          text={isCategory ? `${isCategory}` : "Blog"}
        />
      </section> */}
    </>
  );
}
function Posts({ tags, date }: { [keys: string]: string }) {
  const [clickSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  return (
    <div
      onMouseUp={() => clickSound()}
      className="my-5 -ml-px border-x border-r-0 border-blue-800 px-3 backdrop-blur"
    >
      <div className="word-tightest text-lg tracking-[0.275em] no-underline">{tags}</div>
    </div>
  );
}

export default function Home({ allPostsData }: { allPostsData: PostsProps[] }) {
  // 카테고리 state
  const isCategory = useRouter().query.category;
  const [categoryData, setCategoryData] = useState<PostsProps[]>();
  const [defaultData, setDefaultData] = useState<PostsProps[]>();
  const [changed, setChanged] = useState(false);
  // 페이지네이션 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const main = allPostsData.filter(({ categories }) => {
      return categories === "coding";
    });
    setDefaultData(main);
  }, []);

  useEffect(() => {
    const category = allPostsData.filter(({ categories }) => {
      return categories === isCategory;
    });
    setChanged(false);
    setCategoryData(category);
  }, [isCategory, allPostsData]);

  useEffect(() => {
    setChanged(true);
    setLimit(7);
    setPage(1);
  }, [categoryData]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Profile changed={changed} isCategory={isCategory} />

      <section className="mx-10 md:mx-0">
        <article className="my-5 mt-8 flex h-96 flex-row border-y border-blue-800 py-2 backdrop-blur">
          <div className="flex basis-1/5 items-center justify-center text-2xl">제목</div>
          <div className="writing-vertical basis-4/5 pl-5">
            {!isCategory
              ? defaultData?.slice(offset, offset + limit).map(({ id, date, tags }) => (
                  <Link key={id} href={`/posts/${id}`}>
                    <a className="no-underline">
                      <Posts date={date} tags={tags} />
                    </a>
                  </Link>
                ))
              : categoryData?.slice(offset, offset + limit).map(({ id, date, tags }) => (
                  <Link key={id} href={`/posts/${id}`}>
                    <a className="no-underline">
                      <Posts date={date} tags={tags} />
                    </a>
                  </Link>
                ))}
          </div>
        </article>
        <footer>
          {!isCategory ? (
            <Pagination
              total={allPostsData.length}
              limit={limit}
              page={page}
              setLimit={setLimit}
              setPage={setPage}
            />
          ) : (
            <Pagination
              total={categoryData?.length}
              limit={limit}
              page={page}
              setLimit={setLimit}
              setPage={setPage}
            />
          )}
        </footer>
      </section>
    </Layout>
  );
}
