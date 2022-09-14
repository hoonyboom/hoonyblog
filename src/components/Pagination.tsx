import { /* useState, */ Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdxComponents } from "@/components";

interface PaginationProps {
  total?: number;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({ total, page, setPage, limit }: PaginationProps) {
  const [isActive, setIsActive] = useState<boolean[]>([true]);
  const onClick = (index: number) => {
    setPage(prev => prev + index);
    const copy = [...isActive];
    const watcher = copy.findIndex(val => val === true);
    copy[watcher] = false;
    copy[watcher + index] = true;
    setIsActive(copy);
    sessionStorage.setItem("Page", String(watcher + index));
  };
  useEffect(() => {
    if (sessionStorage.Page) {
      const watchedPage = Number(sessionStorage.getItem("Page"));
      const tracker = Array(watchedPage + 1).fill(false);
      tracker[watchedPage] = true;
      setPage(watchedPage);
      setIsActive(tracker);
    }
  }, []);
  let numPages = 0;
  if (total) numPages = Math.ceil(total / limit);
  console.log(page, "페이지번호");
  console.log(isActive, "액티브");
  return (
    <div className="flex justify-center space-x-5 pt-8 text-base">
      <button onClick={() => onClick(-1)} disabled={page === 0}>
        &lt;
      </button>
      {Array(numPages)
        .fill(undefined)
        .map((__, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                setPage(i);
                const copy: boolean[] = Array(numPages).fill(false);
                copy[i] = true;
                setIsActive(copy);
                sessionStorage.setItem("Page", String(i));
              }}
              disabled={isActive[i]}
              className={isActive[i] ? "underline underline-offset-4" : ""}
            >
              {i + 1}
            </button>
          );
        })}
      <button onClick={() => onClick(1)} disabled={page === numPages - 1}>
        &gt;
      </button>

      {/* 한무 스크롤 */}
      {/* <button
        onClick={() => {
          setLimit((prev: number) => prev + 7);
        }}
        className={page === numPages ? "hidden text-base" : ""}
      >
      </button> */}
    </div>
  );
}
