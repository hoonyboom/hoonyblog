import Head from "next/head";
import { Layout, Date, MdxComponents } from "@/components";
import { useEffect, useMemo, useState } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { siteTitle } from "@/components/Layout";
import { RoughNotation } from "react-rough-notation";

export interface IdProps {
  params: {
    id: string;
  };
}
export interface mdxProps {
  code: string;
  frontmatter: {
    [keys: string]: string;
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: IdProps) {
  const postData = await getPostData(params.id);
  return {
    props: {
      ...postData,
    },
  };
}

export default function BlogPost({ code, frontmatter }: mdxProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    setFade(true);
    return () => setFade(false);
  }, []);

  return (
    <Layout>
      <Head>
        <title>{`${frontmatter.title} 〰 ${siteTitle}`}</title>
      </Head>

      <div className={`transition ${fade ? "opacity-100" : "opacity-0"}`}>
        <h1 className="mt-28 mb-2 text-center text-3xl">{frontmatter.title}</h1>
        <div className="flex flex-col text-base leading-6">
          <p className="mt-2 flex justify-center">
            <Date dateString={frontmatter.date} />
          </p>
          <p className="my-1 flex justify-center">
            <RoughNotation
              show
              type="highlight"
              iterations={3}
              strokeWidth={1}
              color="#25c2a0"
            >
              {frontmatter.description}
            </RoughNotation>
          </p>
        </div>

        <article className="keep-all m-10 text-base leading-7 lg:leading-8">
          <Component components={MdxComponents} />
        </article>
      </div>
    </Layout>
  );
}
