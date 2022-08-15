import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Layout, Date } from "@/components";
import { siteTitle, name } from "@/components/Layout";
import { getSortedPostsData } from "@/lib/posts";
import { RoughNotation } from "react-rough-notation";
import useSound from "use-sound";

export interface PostsProps {
  allPostsData: [
    {
      id: string;
      date: string;
      title: string;
      description?: string;
      tags?: string;
      categories?: string;
      img?: string;
    },
  ];
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: PostsProps) {
  const [tap] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="flex p-10 mx-2">
        <Image
          priority
          src="/images/profile.jpg"
          className="rounded-full"
          height={80}
          width={80}
          layout="intrinsic"
          alt={name}
        />
        <div className="flex flex-col justify-center ml-8 space-y-1">
          <h4 className="text-lg">{name}</h4>
          <h5 className="text-md">갸륵하도다</h5>
        </div>
      </section>
      <section className="flex items-center mx-10 mb-28">
        <p className="leading-7">
          안녕하세요. 처절한 코딩 생존기를 담은 사이트입니다.
          <br />
          코딩과 일기가 뒤죽박죽 섞여 있어요 😵‍💫
          <br />
        </p>
      </section>

      <section className="mx-10 md:mx-0">
        <RoughNotation
          show={true}
          type="bracket"
          strokeWidth={3}
          brackets={["left", "right"]}
          color="skyblue"
          animationDuration={1200}
        >
          <span className="pl-2 text-2xl">Blog&nbsp;</span>
        </RoughNotation>

        <div className="pb-10 mt-8 lg:pb-12">
          {allPostsData.map(({ id, date, title }) => (
            <div
              onMouseUp={() => tap()}
              className="my-5 rounded-3xl border border-zinc-600/10 bg-white bg-opacity-[.05] p-5 filter backdrop-blur"
              key={id}
            >
              <Link href={`/posts/${id}`} passHref>
                <div className="flex flex-col">
                  <a className="text-lg">{title}</a>
                  <small className="mt-2 text-base">
                    <Date dateString={date} />
                  </small>
                </div>
              </Link>
            </div>
          ))}
          {/* todo: 페이지네이션 추가해야 할 곳 */}
        </div>
      </section>
    </Layout>
  );
}
