import { Layout, Date, MdxComponents } from "@/components";
import { useEffect, useMemo, useState } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPostIds, getPostData } from "@/lib/posts";

export interface IdProps {
  params: {
    id: string;
  };
}
export interface MdxProps {
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

export default function BlogPost({ code, frontmatter }: MdxProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    setFade(true);
    return () => setFade(false);
  }, []);

  return (
    <Layout
      siteTitle={`${frontmatter.title} 〰 혜조로그`}
      tags={frontmatter.tags}
      category={frontmatter.categories}
    >
      <div className={`duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-center text-3xl sm:mt-20 md:mt-28">{frontmatter.title}</h1>
        <div className="flex justify-center text-base leading-6 sm:mt-3 sm:mb-10 md:mt-5 md:mb-12">
          <Date dateString={frontmatter.date} />
        </div>
        <article
          className={`keep-all  m-10 font-content ${
            frontmatter.categories === "writing" || frontmatter.categories === "reading"
              ? "word-arita text-mono tracking-tight md:leading-6"
              : "text-base md:leading-8"
          } sm:leading-6`}
        >
          <Component components={MdxComponents} />
        </article>
      </div>
    </Layout>
  );
}
