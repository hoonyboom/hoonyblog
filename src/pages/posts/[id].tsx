import { Layout, Date } from "@/components";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPostIds, getPostData } from "@/lib/posts";

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
      <h1 className="text-xxxl text-center font-custom">{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <span className="text-base flex justify-center">
        <Date dateString={frontmatter.date} />
      </span>
      <article className="text-base font-custom m-10 leading-6">
        <Component />
      </article>
    </Layout>
  );
}
