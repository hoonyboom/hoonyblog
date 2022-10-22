import { Comments } from "@/components/comment";
import { Date, Layout, MdxComponents } from "@/components/utils";
import { H3 } from "@/components/utils/MdxComponents";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo, useState } from "react";
import { Comment } from "@prisma/client";
import { type LoadComment } from "@/types";

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
  // allComments: LoadComment[];
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
  // const getComment = await prisma.comment.findMany({
  //   where: {
  //     postId: params.id,
  //   },
  // });
  // const allComments = getComment.reduce((all: LoadComment[], each: Comment) => {
  //   const comment = { ...each };
  //   const modifiedComment = {
  //     ...comment,
  //     createdAt: String(comment.createdAt),
  //     updatedAt: String(comment.updatedAt),
  //   };
  //   return [...all, modifiedComment];
  // }, []);

  return {
    props: {
      // allComments,
      ...postData,
    },
  };
}

export default function BlogPost({ code, frontmatter, id /* allComments */ }: MdxProps) {
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
        <h1 className="text-center text-3xl sm:mt-20 sm:px-3 md:mt-28">
          {frontmatter.title}
        </h1>
        <div className="flex justify-center text-base leading-6 sm:mt-3 sm:mb-10 md:mt-5 md:mb-12">
          <Date dateString={frontmatter.date} />
        </div>
        <article
          className={`keep-all m-10  ${
            frontmatter.categories === "diarying" || frontmatter.categories === "reading"
              ? "word-arita font-content text-mono leading-6 tracking-tight"
              : "font-sans text-base2 antialiased sm:leading-7 md:leading-9"
          }`}
        >
          <Component components={{ h3: H3, ...MdxComponents }} />
          {/* 댓글영역 */}
          <Comments postId={id} /* allComments={allComments}  */ />
        </article>
      </div>
    </Layout>
  );
}
