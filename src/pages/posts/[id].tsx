import Head from "next/head";
import Twemoji from "react-twemoji";
import MDXComponent from "@/components/MDXComponent";
import { Layout, Date } from "@/components";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { siteTitle } from "@/components/layout";
interface IdProps {
  params: {
    id: string;
  };
}
interface mdxProps {
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
  return (
    <Layout>
      <Head>
        <title>
          {frontmatter.title} | {siteTitle}
        </title>
        <meta name="keyword" content={frontmatter.tags} />
      </Head>
      <Twemoji
        options={{ className: "inline m-px w-5 h-5 align-text-bottom cursor-default" }}>
        <h1 className="mb-2 text-center text-3xl">{frontmatter.title}</h1>
        <div className="flex flex-col text-base leading-6">
          <p>{frontmatter.description}</p>
          <p className="flex justify-center">
            <Date dateString={frontmatter.date} />
          </p>
          <p className="flex justify-center">{frontmatter.tag}</p>
        </div>

        <article className="keep-all m-10 indent-3 text-base leading-7 lg:leading-8">
          <Component components={{ ...MDXComponent }} />
        </article>
      </Twemoji>
    </Layout>
  );
}
