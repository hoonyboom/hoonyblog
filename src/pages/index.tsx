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
  date: string;
  title: string;
  categories: string;
  index: number;
  description?: string;
  tags?: string;
  img?: string;
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
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
      <section className="mx-10 mb-28 flex items-center">
        <p className="text-md leading-7">
          안녕하세요. 처절한 코딩 생존기를 담은 사이트입니다.
          <br />
          <Note show={changed} type="underline" color="orange" animationDuration={1000}>
            코딩과 일기
          </Note>
          가 뒤죽박죽 섞여 있어요 😵‍💫
          <br />
        </p>
      </section>
      <section className="mx-10 md:mx-0">
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
      </section>
    </>
  );
}
function Posts({ title, date }: { [keys: string]: string }) {
  const [tap] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  return (
    <div
      onMouseUp={() => tap()}
      className="my-5 rounded-3xl border border-zinc-600/10 bg-white bg-opacity-[.05] p-5 backdrop-blur"
    >
      <div className="flex flex-col">
        <span className="text-lg no-underline">{title}</span>
        <small className="pt-2 text-base">
          <Date dateString={date} />
        </small>
      </div>
    </div>
  );
}

export default function Home({ allPostsData }: { allPostsData: PostsProps[] }) {
  // 카테고리 state
  const isCategory = useRouter().query.category;
  const [category, setCategory] = useState<PostsProps[]>();
  const [changed, setChanged] = useState(false);
  // 페이지네이션 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const categoryData = allPostsData.filter(({ categories }) => {
      return categories === isCategory;
    });
    setChanged(false);
    setCategory(categoryData);
  }, [isCategory, allPostsData]);

  useEffect(() => {
    setChanged(true);
    setLimit(7);
    setPage(1);
  }, [category]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Profile changed={changed} isCategory={isCategory} />

      <section className="mx-10 md:mx-0">
        <article className="mt-8 pb-5 lg:pb-10">
          {!isCategory
            ? allPostsData.slice(offset, offset + limit).map(({ id, date, title }) => (
                <Link key={id} href={`/posts/${id}`}>
                  <a className="no-underline">
                    <Posts date={date} title={title} />
                  </a>
                </Link>
              ))
            : category?.slice(offset, offset + limit).map(({ id, date, title }) => (
                <Link key={id} href={`/posts/${id}`}>
                  <a className="no-underline">
                    <Posts date={date} title={title} />
                  </a>
                </Link>
              ))}
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
              total={category?.length}
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
