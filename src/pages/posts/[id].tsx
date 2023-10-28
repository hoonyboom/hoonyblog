import { CommentLayout } from "@/components/comment";
import { Date, Layout, MdxComponents } from "@/components/utils";
import { H3 } from "@/components/utils/MdxComponents";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo, useState } from "react";

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
  id: string;
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

export default function BlogPost({ code, frontmatter, id }: MdxProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    setFade(true);
    return () => setFade(false);
  }, []);

  return (
    <Layout
      siteTitle={`${frontmatter.title} 〰 혜조로그`}
      category={frontmatter.categories}
    >
      <div className={`duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}>
        <h1 className="overflow-hidden text-ellipsis text-center text-3xl sm:mt-20 sm:px-3 md:mt-28">
          {frontmatter.title}
        </h1>
        <div className="flex justify-center text-base leading-6 sm:mt-3 sm:mb-10 md:mt-5 md:mb-12">
          <Date dateString={frontmatter.date} />
        </div>
        <article
          className={`keep-all m-10  ${
            frontmatter.categories === "reading"
              ? "word-arita font-content text-mono leading-6 tracking-tight"
              : "font-sans text-base2 antialiased sm:leading-7 md:leading-9"
          }`}
        >
          <Component components={{ h3: H3, ...MdxComponents }} />
          {/* 댓글영역 */}
          <CommentLayout postId={id} />
        </article>
      </div>
    </Layout>
  );
}
