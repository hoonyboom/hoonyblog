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
            className="fixed md:top-16 md:left-32 opacity-[.8] transition-all duration-3000 ease-in-out md:w-12 md:h-12 sm:w-10 sm:h-10 sm:top-5 sm:left-5"
            style={{ transform }}
          />
        </a>
      </Link>
      {children}
    </>
  );
}

// $(document).ready(function () {
//   const logo = document.getElementById("logo");
//   const width = window.screen.width;
//   const height = window.screen.height;
//   let curX = 0;
//   let curY = 0;
//   const logoInterval = window.setInterval(() => {
//     const randomX = Math.random() * width;
//     const randomY = Math.random() * height;
//     const targetX = (randomX + curX) / 2;
//     const targetY = (randomY + curY) / 2;
//     curX = targetX;
//     curY = targetY;
//     randomRotation = (Math.random() - 0.5) * 10;
//     logo.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${randomRotation}deg)`;
//   }, 3300);
// });
