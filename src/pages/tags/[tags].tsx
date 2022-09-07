import { Layout, MdxComponents } from "@/components";
import { getAllPostTags, getSortedPostsData } from "@/lib/posts";
import { PostsProps } from "@/pages/index";
import Link from "next/link";
import useSound from "use-sound";

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
  const [clickSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  return (
    <Link href={`/posts/${id}`}>
      <a
        onMouseUp={() => clickSound()}
        className="-my-px flex items-center border-y border-blue-800 py-3 text-right no-underline"
      >
        <div className="pl-3 text-left sm:basis-2/12 md:basis-1/12">{description}</div>
        <div className="sm:basis-10/12 sm:pr-3 md:basis-9/12 md:pr-12">{title}</div>
        <div className="basis-2/12 pr-3 sm:hidden md:inline-flex">{date}</div>
      </a>
    </Link>
  );
};

export default function PostByTag({ allTagsData, tag }: DataProps) {
  const { Img } = MdxComponents;

  return (
    <Layout siteTitle={`${tag} 〰 후니로그`}>
      <h1 className="pt-20">{tag}</h1>
      <div className="flex justify-between pt-7">
        <p className="font-content text-md">
          {allTagsData.map(({ excerpt }) => excerpt)}
        </p>
        <Img src={"/images/profile.png"} />
      </div>
      <div className="pt-16 font-content text-md">
        {allTagsData.reverse().map(({ id, title, date, description }) => (
          <Posts key={id} id={id} title={title} date={date} description={description} />
        ))}
      </div>
    </Layout>
  );
}
