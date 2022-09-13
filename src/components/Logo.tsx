import Image from "next/future/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutProps } from "./Layout";

export default function Logo({ children }: LayoutProps) {
  const [transform, setTransform] = useState("translate(0px)");
  useEffect(() => {
    const width = window.visualViewport.width;
    const height = window.visualViewport.height;
    let curX = 0;
    let curY = 0;
    setInterval(() => {
      const randomX = Math.random() * width;
      const randomY = Math.random() * height;
      const targetX = (randomX + curX) / 2;
      const targetY = (randomY + curY) / 2;
      curX = targetX;
      curY = targetY;
      const randomRotation = (Math.random() - 0.5) * 10;
      setTransform(`translate(${targetX}px, ${targetY}px) rotate(${randomRotation}deg)`);
    }, 3500);
  }, []);

  return (
    <>
      <Link href="/">
        <a>
          <Image
            src="/images/snoopy.gif"
            alt="Home"
            width={0}
            height={0}
            priority
            className="fixed opacity-[.8] transition-all duration-3000 ease-in-out sm:top-5 sm:left-5 sm:h-10 sm:w-10 md:top-16 md:left-32 md:h-12 md:w-12"
            style={{ transform }}
            onClick={() => localStorage.setItem("watchedTab", JSON.stringify({ val: 0 }))}
          />
        </a>
      </Link>
      {children}
    </>
  );
}
