import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { remarkCodeHike } from "@code-hike/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism";
import { theme } from "./theme/theme";

interface FileType {
  id: string;
  date: string;
  tags: string | string[];
  fullpath: string;
  [key: string]: string | string[];
}
const postsDirectory = path.join(process.cwd(), "drafts");

const getAllFiles = (dir: string): FileType[] => {
  const folderNames = fs.readdirSync(dir);
  const getAllFilesData = folderNames.reduce((allFiles: FileType[], file: string) => {
    if (file === ".obsidian") return [];

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
          tags: matterResult.tags || "쪼가리",
          date: matterResult.date,
          fullpath,
          ...matterResult,
        },
      ];
    }
  }, []);
  return getAllFilesData;
};

export function getSortedPostsData(tag?: string) {
  const allPostsData = getAllFiles(postsDirectory);

  if (tag) {
    const postsByTag = allPostsData.filter(post =>
      typeof post.tags === "string"
        ? post.tags === tag
        : post.tags.find(tagInArr => tagInArr === tag),
    );
    return postsByTag.sort(({ date: a }, { date: b }) => (a < b ? 1 : -1));
  } else return allPostsData.sort(({ date: a }, { date: b }) => (a < b ? 1 : -1));
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
    (all: string[], each) =>
      typeof each.tags === "string"
        ? [...new Set([...all, each.tags])]
        : [...new Set([...all, ...each.tags])],
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
  const file = allPostsData.find(post => {
    return post.id === `${id}`;
  });

  if (!file) throw new Error(`No such file: ${id}`);

  const source = fs.readFileSync(file.fullpath, "utf8");

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

  const series = getSeriesList(allPostsData, frontmatter.series);

  return {
    id,
    code,
    frontmatter,
    series,
  };
}

function getSeriesList(allPostsData: FileType[], series?: string) {
  if (!series) return null;

  const posts = allPostsData
    .filter(post => post.series === series)
    .sort(({ date: a }, { date: b }) => (a > b ? 1 : -1));

  return posts.map(post => ({ id: post.id, title: post.title }));
}
