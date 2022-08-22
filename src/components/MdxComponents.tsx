import Image, { ImageProps } from "next/future/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RoughNotation, RoughNotationProps } from "react-rough-notation";

/* 인터페이스 커스텀 타입 확장 */
interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  text: string;
  href: string;
}
interface NotationProps extends Omit<RoughNotationProps, "children"> {
  text: string;
  css?: string;
  className?: string;
}

// 커스텀 컴퍼넌트
//
//
// NextLink
export const Lnk = (props: LinkProps) => {
  return (
    <Link href={props.href}>
      <a target="_blank" rel="noopener noreferrer" {...props}>
        {props.text}
      </a>
    </Link>
  );
};

// NextImage
export const Img = (props: ImageProps) => {
  return (
    <Image
      width={9999}
      height={9999}
      quality={100}
      alt="image"
      className="my-3 h-auto w-auto rounded-xl shadow shadow-black dark:shadow-white/30"
      {...props}
    />
  );
};

// Youtube
export const Youtube = ({ src }: { src: string }) => {
  return (
    <div className="relative h-0 pb-[56.25%] pt-6">
      <iframe
        className="absolute top-0 left-0 h-full w-full"
        width="560"
        height="315"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

// RoughNotation
export const Note = (props: NotationProps) => {
  const [isCalled, setIsCalled] = useState(false);
  useEffect(() => setIsCalled(true), []);
  return (
    <RoughNotation
      show={isCalled}
      color="skyblue"
      animationDuration={1200}
      animationDelay={100}
      {...props}
    >
      <span className={props.css}>{props.text}</span>
    </RoughNotation>
  );
};

const MdxComponents = {
  Img,
  Lnk,
  Youtube,
  Note,
};

export default MdxComponents;
