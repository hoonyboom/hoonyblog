import Image from "next/future/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo() {
  const [transform, setTransform] = useState("");
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
      let randomRotation = (Math.random() - 0.5) * 10;
      setTransform(`translate(${targetX}px, ${targetY}px) rotate(${randomRotation}deg)`);
    }, 4300);
  }, []);
  return (
    <Link href="/">
      <Image
        src="/images/snoopy.gif"
        alt="Home"
        width={0}
        height={0}
        priority
        className="absolute top-16 left-32 opacity-[.8] transition-all duration-3000 ease-in-out w-14 h-14 cursor-pointer"
        style={{ transform }}
      />
    </Link>
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
