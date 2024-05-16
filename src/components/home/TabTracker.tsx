import { useEffect, useState } from "react";

export default function TabTracker({ initCategory }: { initCategory: boolean }) {
  const [translateX, setTranslateX] = useState("0%");
  useEffect(() => {
    if (sessionStorage.watchedTab) {
      const xValue = sessionStorage.getItem("watchedTab");
      setTranslateX(`${xValue}00%`);
    }
  }, [initCategory]);

  return (
    <span
      className={"relative my-1 flex size-1 basis-1/3 justify-center duration-700"}
      style={{ transform: `translate(${translateX})` }}
    >
      <span className="absolute inline-flex size-1 animate-ping rounded-full bg-blue-600 opacity-75 dark:bg-yellow-300"></span>
      <span className="relative inline-flex size-1 rounded-full bg-blue-800 dark:bg-orange"></span>
    </span>
  );
}
