import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RoughNotation, RoughNotationProps } from "react-rough-notation";
import styles from "./[MdxComponents].module.css";
// recoil Import
import { headerState } from "@/lib/atoms";
import { useRecoilState } from "recoil";

/* 인터페이스 커스텀 타입 확장 */
interface NotationProps extends Omit<RoughNotationProps, "children"> {
  className?: string;
  children?: React.ReactNode;
}

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  text: string;
  href: string;
}

export const Lnk = (props: LinkProps) => {
  return (
    <Link
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-paleBlue"
    >
      {props.text}
    </Link>
  );
};

// NextImage
export const Img = ({ className, ...props }: ImageProps) => {
  return (
    <Image
      {...props}
      width={props.width ?? 1000}
      height={props.height ?? 1000}
      quality={props.quality ?? 100}
      alt={props.alt ?? "이미지"}
      className={`mb-3 mt-5 h-auto max-w-full rounded-xl bg-cover bg-no-repeat align-middle ${className}`}
    />
  );
};

// Youtube
export const Youtube = ({ src }: { src: string }) => {
  return (
    <div className="relative mb-8 pb-[76.25%] pt-6 md:w-screen md:max-w-3xl">
      <iframe
        className="absolute left-0 top-0 size-full rounded-2xl bg-black shadow-lg shadow-black dark:shadow-red-900/30 "
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
  useEffect(() => {
    setIsCalled(true);
    return () => setIsCalled(false);
  }, []);
  return (
    <RoughNotation show={isCalled} color="tomato" animationDuration={1200} {...props}>
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

  const [, setHeaders] = useRecoilState(headerState);
  useEffect(() => {
    setHeaders(prev => [...prev, link]);
    return () => setHeaders([]);
  }, [link, setHeaders]);

  return (
    <h3 id={anchor}>
      <a className="anchor-link no-underline" href={link}>
        💡&nbsp;
      </a>
      {children}
    </h3>
  );
};

interface HeadersType {
  isIntersecting?: boolean;
  target: { id: string };
}

function useIntersectionObserver(setActiveId: Dispatch<SetStateAction<string>>) {
  const headingElementsRef = useRef<Record<string, HeadersType>>({});

  useEffect(() => {
    const navigator = (entries: IntersectionObserverEntry[]) => {
      headingElementsRef.current = entries.reduce(
        (
          map: Record<string, { target: { id: string } }>,
          headingElement: { target: { id: string } },
        ) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current,
      );

      const visibleHeadings: HeadersType[] = [];
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex(heading => heading.id === id);

      if (visibleHeadings.length === 1) setActiveId(visibleHeadings[0].target.id);
      else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) => {
          if (getIndexFromId(a.target.id) > getIndexFromId(b.target.id)) return 1;
          else return 0;
        });
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(navigator, {
      rootMargin: "-50px 0px -50%",
    });

    const headingElements = Array.from(document.querySelectorAll("h3"));
    headingElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
}

export const HeadingNavigator = () => {
  const [isClick, setIsClick] = useState(true);
  const [activeId, setActiveId] = useState("");
  const [headers] = useRecoilState(headerState);
  useIntersectionObserver(setActiveId);
  const { Img } = MdxComponents;
  const pinColor = ["blue", "green", "orange"];
  const pickColor = useMemo(
    () => Math.floor(Math.random() * pinColor.length),
    [pinColor.length],
  );

  return (
    <div
      className={`fixed font-heading duration-500 ease-out sm:hidden lg:block ${
        isClick
          ? "top-1/4 w-48 opacity-100 lg:right-12 xl:right-[10%]"
          : "right-0 top-0 w-5 opacity-30"
      }`}
    >
      <div className={`${isClick ? styles.notepad_heading : "bg-transparent"}`}>
        <Img
          onClick={() => setIsClick(!isClick)}
          className="m-auto mt-0 size-5 cursor-fancyHover transition hover:scale-110"
          src={`/images/2022/pinColor/pin-${pinColor[pickColor]}@2x.png`}
          alt={"image"}
        />
      </div>
      <div className={`${isClick ? "opacity-100" : "opacity-0"}`}>
        <div className={styles.notepad}>
          {headers.map((header, i) => {
            const Heading = header.replace(/[#]/g, " ").replace(/[-]/g, " ");
            return (
              <div key={i}>
                <div
                  className={`absolute left-0 duration-300 ${
                    header === `#${activeId}` ? "blue-dot" : "white-dot"
                  }`}
                ></div>
                <a
                  href={header}
                  className={`duration-300 ${
                    header === `#${activeId}`
                      ? "scale-125 opacity-100"
                      : "scale-100 opacity-30"
                  }`}
                >
                  {Heading}
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
  HeadingNavigator,
};

export default MdxComponents;
