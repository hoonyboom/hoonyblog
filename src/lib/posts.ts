import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { remarkCodeHike } from "@code-hike/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism/lib/src";
import { theme } from "./theme/search-light";

interface DataType {
  id: string;
  date: string;
  tags: string;
  path: string;
  [key: string]: string;
}
const postsDirectory = path.join(process.cwd(), "drafts");
const getAllFiles = (dir: string): DataType[] => {
  const folderNames = fs.readdirSync(dir);
  const allFileNames = folderNames.reduce((all: DataType[], name: string) => {
    const paths = path.join(dir, name);
    const isDirectory = fs.statSync(paths).isDirectory();
    if (isDirectory) return [...all, ...getAllFiles(paths)];
    else {
      const id = name.replace(/\.mdx$/, "");
      const fileContents = fs.readFileSync(paths, "utf-8");
      const matterResult = matter(fileContents).data;
      return [
        ...all,
        {
          id,
          tags: matterResult.tags as string,
          date: matterResult.date as string,
          path: paths,
          ...matterResult,
        },
      ];
    }
  }, []);
  return allFileNames;
};

export function getSortedPostsData(tags?: string) {
  const allPostsData = getAllFiles(postsDirectory);

  if (tags) {
    const postsByTag = allPostsData.filter(post => post.tags === tags);
    return postsByTag.sort(({ date: a }, { date: b }) => {
      if (a < b) return 1;
      else if (a > b) return -1;
      else return 0;
    });
  }
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}

export function getAllPostIds() {
  const fileNames = getAllFiles(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.id.replace(/\.mdx$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const data = getAllFiles(postsDirectory);
  const fullPath = data.find(post => {
    return post.id === `${id}`;
  });

  const source = fs.readFileSync(fullPath!.path, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [
        remarkGfm,
        [
          remarkCodeHike,
          {
            theme,
            showCopyButton: true,
            staticMediaQuery: "not screen, (max-width: 768px)",
          },
        ],
        ...(options?.remarkPlugins ?? []),
      ];
      options.rehypePlugins = [...(options?.rehypePlugins ?? []), rehypePrism];

      return options;
    },
  });

  return {
    id,
    code,
    frontmatter,
  };
}

export function getAllPostTags() {
  const data = getSortedPostsData();
  return data.map(post => {
    return {
      params: {
        tags: post.tags,
      },
    };
  });
}
