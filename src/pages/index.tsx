import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Layout, Date } from "@/components";
import { siteTitle, name } from "@/components/layout";
import { getSortedPostsData } from "@/lib/posts";
import { RoughNotation } from "react-rough-notation";
import Twemoji from "react-twemoji";
import { useEffect } from "react";

interface PostsProps {
  allPostsData: [
    {
      id: string;
      date: string;
      title: string;
      description?: string;
      tag?: string;
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
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Twemoji
        options={{ className: "inline m-px w-5 h-5 align-text-bottom cursor-default" }}>
        <section className="mx-2 flex p-10">
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={80}
              width={80}
              alt={name}
            />
            <div className="ml-8 flex flex-col justify-center space-y-1">
              <h1 className="text-lg">{name}</h1>
              <h3 className="text-md">갸륵하도다</h3>
            </div>
          </>
        </section>

        <section className="mx-10 mb-28 flex items-center">
          <p className="leading-7">
            {/* 안녕하세요. 부족한 실력을 채우기 위해 만든 사이트입니다. <br />
            더 나은 코드, 더 나은 디자인을 위해 틈틈이 기록합니다. <br />
            요즘에는 Next.js에 빠져 있어요 👅 */}
            아구몬의 처절한 코딩 생존기 🍖
          </p>
        </section>

        <section className="mx-10 md:mx-0">
          <RoughNotation
            show={true}
            type="bracket"
            strokeWidth={3}
            brackets={["left", "right"]}
            color="tomato"
            animationDuration={1200}>
            <span className="pl-2 text-xxl">Blog&nbsp;</span>
          </RoughNotation>

          <ul className="mt-10">
            {allPostsData.map(({ id, date, title }) => (
              <li className="mb-8 font-custom text-lg first:mt-5" key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Twemoji>
    </Layout>
  );
}
