import { Layout, MdxComponents, Pagination } from "@/components/utils";
import { getAllPostTags, getSortedPostsData } from "@/lib/posts";
import { filter } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSound from "use-sound";

interface PathProps {
  params: {
    tag: string;
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
  const allTagsData = getSortedPostsData(params.tag);

  return {
    props: { allTagsData, tag: params.tag },
  };
}

const Posts = ({
  id,
  title,
  date,
  description,
}: Pick<PostsProps, "id" | "title" | "date" | "description">) => {
  const [tapSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });
  const router = useRouter();

  return (
    <Link
      href={`/posts/${id}`}
      onMouseUp={() => tapSound()}
      onClick={() => sessionStorage.setItem("path", router.asPath)}
      className="-my-px flex border-y border-blue-800 py-2 text-right no-underline dark:border-blue-900"
    >
      <div className="pl-3 text-left sm:basis-4/12 md:basis-3/12">{description}</div>
      <div className="sm:basis-8/12 sm:pr-3 md:basis-7/12 md:pr-10">{title}</div>
      <div className="basis-2/12 justify-end pr-3 sm:hidden md:inline-flex">{date}</div>
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
    <Layout tag siteTitle={`${tag} 〰 혜조로그`}>
      <h1 className="pl-4 pt-16">{tag}</h1>
      <div className="flex justify-between pb-12 pl-3 pt-7">
        <p className="keep-all text-base sm:basis-1/2 md:basis-2/5">
          {summary.reverse().map(({ excerpt }, i) => (
            <span key={i}>
              {excerpt}
              <br />
            </span>
          ))}
        </p>
        <div className="-mt-3 pr-3 sm:basis-1/2 md:basis-3/5">
          {banner.map(({ image, id }) => (
            <Img src={image} key={id} alt={""} />
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
      <Pagination limit={limit} total={total} page={page} setPage={setPage} />
    </Layout>
  );
}
