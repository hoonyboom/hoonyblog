import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";

// const CustomLink = (props: LinkProps) => {
//   const href = props.href;
//   const isInternalLink = href;

//   if (isInternalLink) {
//     return (
//       <Link href={href}>
//         <a {...props}>{props.children}</a>
//       </Link>
//     );
//   }

//   return <a target="_blank" rel="noopener noreferrer" {...props} />;
// };

const BlogImg = (props: ImageProps) => {
  return (
    <>
      <Image {...props} layout="responsive" className="rounded-xl" />
    </>
  );
};

const MDXComponent = {
  Image,
  BlogImg,
  // a: CustomLink,
};

export default MDXComponent;
