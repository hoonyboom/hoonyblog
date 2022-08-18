import Head from "next/head";
import Link from "next/link";
import Image from "next/future/image";
import { Layout, Date, MdxComponents, Pagination } from "@/components";
import { siteTitle, name } from "@/components/Layout";
import { getSortedPostsData } from "@/lib/posts";
import useSound from "use-sound";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

export default function Home({ allPostsData }: { allPostsData: PostsProps[] }) {
  const [tap] = useSound("/sounds/tap.mp3", { volume: 0.6 });
  const { Note } = MdxComponents;
  // 카테고리 state
  const id = useRouter().query.id;
  const [category, setCategory] = useState<PostsProps[]>();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const sorted = allPostsData.filter(({ categories }) => {
      return categories === id;
    });
    setChanged(false);
    setCategory(sorted);
    setPage(1);
  }, [id, allPostsData]);

  useEffect(() => {
    setChanged(true);
  }, [category]);

  // 페이지네이션 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const offset = (page - 1) * limit;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="mx-2 flex p-10">
        <Image
          priority
          src="/images/profile.jpg"
          className="h-20 w-20 rounded-full"
          height={80}
          width={80}
          alt={name}
        />
        <div className="ml-8 flex flex-col justify-center space-y-1">
          <h4 className="text-lg">{name}</h4>
          <h5 className="text-base">갸륵하도다</h5>
        </div>
      </section>
      <section className="mx-10 mb-28 flex items-center">
        <p className="text-md leading-7">
          안녕하세요. 처절한 코딩 생존기를 담은 사이트입니다.
          <br />
          <Note
            show={changed}
            type="underline"
            color="orange"
            animationDuration={1000}
            text="코딩과 일기"
          />
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
          color={id === "coding" ? "tomato" : id === "writing" ? "crimson" : "skyblue"}
          animationDelay={1200}
          css="px-2 text-2xl"
          text={id ? `${id}` : "Blog"}
        />

        <div className="mt-8 pb-5 lg:pb-10">
          {!id
            ? allPostsData.slice(offset, offset + limit).map(({ id, date, title }) => (
                <div
                  key={id}
                  onMouseUp={() => tap()}
                  className="my-5 rounded-3xl border border-zinc-600/10 bg-white bg-opacity-[.05] p-5 backdrop-blur"
                >
                  <div className="flex flex-col">
                    <Link href={`/posts/${id}`}>
                      <a className="text-lg">{title}</a>
                    </Link>
                    <small className="mt-2 text-base">
                      <Date dateString={date} />
                    </small>
                  </div>
                </div>
              ))
            : category?.slice(offset, offset + limit).map(({ id, date, title }) => (
                <div
                  onMouseUp={() => tap()}
                  className="my-5 rounded-3xl border border-zinc-600/10 bg-white bg-opacity-[.05] p-5 backdrop-blur"
                  key={id}
                >
                  <div className="flex flex-col">
                    <Link href={`/posts/${id}`}>
                      <a className="text-lg">{title}</a>
                    </Link>
                    <small className="mt-2 text-base">
                      <Date dateString={date} />
                    </small>
                  </div>
                </div>
              ))}
        </div>
        <footer>
          {!id ? (
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
