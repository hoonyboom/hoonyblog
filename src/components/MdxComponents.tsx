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
}

// 커스텀 컴퍼넌트
//
//
// NextLink
const Lnk = (props: LinkProps) => {
  return (
    <Link href={props.href}>
      <a {...props}>{props.text}</a>
    </Link>
  );
};

// NextImage
const Img = (props: ImageProps) => {
  return (
    <Image
      {...props}
      width={9999}
      height={9999}
      alt="image"
      className="h-auto w-auto rounded-xl shadow-lg shadow-black dark:shadow-white/30"
    />
  );
};

// Youtube
const Youtube = ({ src }: { src: string }) => {
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
const Note = (props: NotationProps) => {
  const [isCalled, setIsCalled] = useState(false);
  useEffect(() => setIsCalled(true), []);
  return (
    <RoughNotation
      show={isCalled}
      color="tomato"
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
