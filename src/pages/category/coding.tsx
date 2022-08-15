import { getSortedPostsData } from "@/lib/posts";
import { PostsProps } from "..";
import Head from "next/head";
import Link from "next/link";
import Image from "next/future/image";
import { Layout, Date } from "@/components";
import { siteTitle, name } from "@/components/Layout";
import { RoughNotation } from "react-rough-notation";
import useSound from "use-sound";

export default function Coding({ allPostsData }: PostsProps) {
  const [tap] = useSound("/sounds/tap.mp3", { volume: 0.6 });

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
          color="tomato"
          animationDuration={1200}
        >
          <span className="pl-2 text-2xl">Coding&nbsp;</span>
        </RoughNotation>

        <div className="mt-8 pb-10 lg:pb-12">
          {allPostsData.map(({ id, date, title }) => (
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
          {/* todo: 페이지네이션 추가해야 할 곳 */}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData("coding");

  return {
    props: {
      allPostsData,
    },
  };
}
