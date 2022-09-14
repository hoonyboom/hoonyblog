import { Layout, MdxComponents, Pagination } from "@/components";
import { getAllPostTags, getSortedPostsData } from "@/lib/posts";
import { PostsProps } from "@/pages/index";
import Link from "next/link";
import useSound from "use-sound";
import { filter } from "lodash";
import { useEffect, useState } from "react";

interface PathProps {
  params: {
    tags: string;
  };
}
interface DataProps {
  allTagsData: PostsProps[];
  tag: string;
}
export async function getStaticPaths() {
  const paths = getAllPostTags();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: PathProps) {
  const allTagsData = getSortedPostsData(params.tags);
  return {
    props: { allTagsData, tag: params.tags },
  };
}
const Posts = ({ id, title, date, description }: { [key: string]: string }) => {
  const [tapSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });
  return (
    <Link href={`/posts/${id}`}>
      <a
        onMouseUp={() => tapSound()}
        className="-my-px flex border-y border-blue-800 py-2 text-right no-underline dark:border-blue-900"
      >
        <div className="pl-3 text-left sm:basis-2/12 md:basis-1/12">{description}</div>
        <div className="sm:basis-10/12 sm:pr-3 md:basis-9/12 md:pr-10">{title}</div>
        <div className="basis-2/12 justify-end pr-3 sm:hidden md:inline-flex">{date}</div>
      </a>
    </Link>
  );
};

export default function PostsByTag({ allTagsData, tag }: DataProps) {
  const { Img } = MdxComponents;
  const summary = filter(allTagsData, "excerpt");
  const banner = filter(allTagsData, "image");

  const [page, setPage] = useState(0);
  const total = allTagsData.length;
  const limit = 6; // 손수 건드려야 할 부분
  const offset = page * limit;

  return (
    <Layout siteTitle={`${tag} 〰 혜조로그`}>
      <h1 className="pt-16 pl-4">{tag}</h1>
      <div className="flex justify-between pt-7 pl-3 pb-12">
        <p className="text-base sm:basis-1/2 md:basis-2/5">
          {summary.map(({ excerpt }) => excerpt)}
        </p>
        <div className="pr-3 sm:basis-1/2 md:basis-3/5">
          {banner.map(({ image, id }) => (
            <Img src={image} key={id} />
          ))}
        </div>
      </div>
      <div className="text-base">
        {allTagsData
          .slice(offset, offset + limit)
          .map(({ id, title, date, description }) => (
            <Posts key={id} id={id} title={title} date={date} description={description} />
          ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination limit={limit} total={total} page={page} setPage={setPage} />
    </Layout>
  );
}
