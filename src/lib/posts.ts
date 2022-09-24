import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { remarkCodeHike } from "@code-hike/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism/lib/src";
import { theme } from "./theme/search-light";

interface FileType {
  id: string;
  date: string;
  tags: string;
  fullpath: string;
  [key: string]: string;
}
const postsDirectory = path.join(process.cwd(), "drafts");

const getAllFiles = (dir: string): FileType[] => {
  const folderNames = fs.readdirSync(dir);
  const getAllFilesData = folderNames.reduce((allFiles: FileType[], file: string) => {
    const fullpath = path.join(dir, file);
    const isDirectory = fs.statSync(fullpath).isDirectory();
    if (isDirectory) return [...allFiles, ...getAllFiles(fullpath)];
    else {
      const id = file.replace(/\.mdx$/, "");
      const fileContents = fs.readFileSync(fullpath, "utf-8");
      const matterResult = matter(fileContents).data;
      return [
        ...allFiles,
        {
          id,
          tags: matterResult.tags as string,
          date: matterResult.date as string,
          fullpath,
          ...matterResult,
        },
      ];
    }
  }, []);
  return getAllFilesData;
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
  const allPostsData = getAllFiles(postsDirectory);
  return allPostsData.map(post => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

export function getAllPostTags() {
  const allPostsData = getAllFiles(postsDirectory);
  const deleteOverlapTags = allPostsData.reduce(
    (all: string[], each) => (all.includes(each.tags) ? all : [...all, each.tags]),
    [],
  );
  return deleteOverlapTags.map(tag => {
    return {
      params: {
        tag,
      },
    };
  });
}

export async function getPostData(id: string) {
  const allPostsData = getAllFiles(postsDirectory);
  const path = allPostsData.find(post => {
    return post.id === `${id}`;
  });

  const source = fs.readFileSync(path!.fullpath, "utf8");

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
