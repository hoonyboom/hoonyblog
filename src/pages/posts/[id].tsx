import { CommentLayout } from "@/components/comment";
import { Date, Layout, MdxComponents } from "@/components/utils";
import { H3, Note } from "@/components/utils/MdxComponents";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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
  series: {
    id: string;
    title: string;
  }[];
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

export default function BlogPost({ code, frontmatter, id, series }: MdxProps) {
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

        {series && renderSeriesList({ series, id })}

        <article
          className={`keep-all my-10 mx-6 ${
            frontmatter.categories === "reading"
              ? "word-arita font-content text-mono leading-6 tracking-tight"
              : "font-line text-base2 antialiased sm:leading-7 md:leading-9"
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

const renderSeriesList = ({ series, id: postId }: Pick<MdxProps, "series" | "id">) => {
  return (
    <div className="flex rounded-lg border p-5 text-base leading-6 sm:mx-20 sm:mb-10 md:mx-24 md:mb-12">
      <div className="flex flex-col">
        <h5 className="font-heading text-base font-bold">시리즈</h5>
        <ul className="flex list-decimal flex-col">
          {series.map(each => (
            <li
              className={`${
                postId !== each.id
                  ? "marker:text-black"
                  : "text-emerald-600 marker:text-emerald-600"
              }`}
              key={each.id}
            >
              <Link className="no-underline" href={`/posts/${each.id}`}>
                <Note type="highlight" color="#CAFC9D" show={postId === each.id}>
                  {each.title}
                </Note>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
