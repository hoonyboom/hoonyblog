import { getAllPostTags, getSortedPostsData } from "@/lib/posts";
import { PostsProps } from "@/pages/index";

interface PathProps {
  params: {
    tags: string;
  };
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
  console.log(allTagsData);
  return {
    props: { allTagsData },
  };
}

export default function PostByTag({ allTagsData }: { allTagsData: PostsProps[] }) {
  return <h1>{allTagsData.map(post => post.tags)}</h1>;
}
