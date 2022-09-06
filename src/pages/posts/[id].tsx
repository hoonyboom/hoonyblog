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
    <Layout siteTitle={`${frontmatter.title} 〰 후니로그`}>
      <div className={`transition ${fade ? "opacity-100" : "opacity-0"}`}>
        <h1 className="mt-28 mb-2 text-center text-3xl">{frontmatter.title}</h1>
        <div className="mt-4 flex justify-center text-base leading-6">
          <Date dateString={frontmatter.date} />
        </div>
        <article className="keep-all m-10 font-content text-base leading-7 md:leading-8">
          <Component components={MdxComponents} />
        </article>
      </div>
    </Layout>
  );
}
