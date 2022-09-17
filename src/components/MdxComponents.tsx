import React, { useEffect, useMemo, useRef, useState } from "react";
import Image, { ImageProps } from "next/future/image";
import Link from "next/link";
import { RoughNotation, RoughNotationProps } from "react-rough-notation";
import styles from "./[MdxComponents].module.css";
import Twemoji from "react-twemoji";
// recoil Import
import { headerState } from "@/lib/store";
import { useRecoilState } from "recoil";
import { EmptyObject, throttle } from "lodash";
import { stringify } from "querystring";
import JSXStyle from "styled-jsx/style";

/* 인터페이스 커스텀 타입 확장 */
interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  text: string;
  href: string;
}
interface NotationProps extends Omit<RoughNotationProps, "children"> {
  className?: string;
  children?: React.ReactNode;
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
      className="my-3 h-auto w-auto rounded-xl drop-shadow-xl"
      {...props}
    />
  );
};

// Youtube
export const Youtube = ({ src }: { src: string }) => {
  return (
    <div className="relative mb-8 pb-[46.25%] pt-6">
      <iframe
        className="absolute top-0 left-0 h-full w-full rounded-2xl bg-black shadow-2xl shadow-black dark:shadow-red-900/30 "
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
      {props.children}
    </RoughNotation>
  );
};

export const H3 = ({ children }: { children?: React.ReactNode }) => {
  const getAnchor = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z가-힣0-9 ]/g, "")
      .replace(/[ ]/g, "-");
  };
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;

  const [header, setHeader] = useRecoilState(headerState);
  useEffect(() => {
    setHeader(prev => [...prev, anchor]);
  }, []);

  // interface HeadingTypes {
  //   id: string;
  //   title: string;
  //   items: [{ id: string; title: string } | null];
  // }
  // const getNestedHeadings = (headingElements: HTMLHeadingElement[]) => {
  //   const nestedHeadings: HeadingTypes[] = [];
  //   headingElements.forEach((heading, i) => {
  //     const { innerText: title, id } = heading;
  //     if (heading.nodeName === "H3") {
  //       nestedHeadings.push({ id, title, items: [null] });
  //     } else if (heading.nodeName === "H4" && nestedHeadings.length > 0) {
  //       nestedHeadings[nestedHeadings.length - 1].items.push({ id, title });
  //     }
  //   });
  //   return nestedHeadings;
  // };
  // const getHeadingsData = () => {
  //   const [nestedHeadings, setNestedHeadings] = useState<HeadingTypes[]>([]);
  //   useEffect(() => {
  //     const headingElements = Array.from(document.querySelectorAll("h3"));
  //     const newNestedHeadings = getNestedHeadings(headingElements);
  //     setNestedHeadings(newNestedHeadings);
  //   }, []);
  //   return { nestedHeadings };
  // };

  return (
    <h3 id={anchor}>
      <Twemoji
        options={{
          className:
            "inline cursor-fancyHover m-px sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 align-text-17",
        }}
      >
        <a className="no-underline" href={link}>
          💡&nbsp;
        </a>
        {children}
      </Twemoji>
    </h3>
  );
};

export const IndexList = () => {
  const { Img } = MdxComponents;
  const [isClick, setIsClick] = useState(true);
  const pinColor = ["blue", "green", "orange"];
  const pickColor = Math.floor(Math.random() * pinColor.length);
  const [header] = useRecoilState(headerState);

  return (
    <div
      className={`fixed font-heading duration-500 ease-out sm:hidden lg:block ${
        isClick
          ? "top-28 w-48 opacity-100 lg:right-12 xl:right-[10%]"
          : "top-0 right-0 w-5 opacity-30"
      }`}
    >
      <div className={`${isClick ? styles.notepad_heading : "bg-transparent"}`}>
        <Img
          onClick={() => setIsClick(!isClick)}
          className="m-auto h-5 w-5 cursor-fancyHover"
          src={`/images/2022/pinColor/pin-${pinColor[pickColor]}@2x.png`}
        />
      </div>
      <div className={`${isClick ? "opacity-100" : "opacity-0"}`}>
        <div className={styles.notepad}>
          {header.map((header, i) => {
            const Heading = header.replace(/[-]/g, " ");
            return (
              <div key={i}>
                <a href={`#${header}`}>
                  {i + 1}. {Heading}
                </a>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MdxComponents = {
  Img,
  Lnk,
  Youtube,
  Note,
  IndexList,
};

export default MdxComponents;
