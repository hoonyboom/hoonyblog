import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PaginationProps {
  numPages?: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  total: number;
}

export default function Pagination({ page, setPage, limit, total }: PaginationProps) {
  const [isActive, setIsActive] = useState<boolean[]>([true]);

  const prevNext = (index: -1 | 1) => {
    setPage(now => now + index);
    const copy = [...isActive];
    const nowWatched = copy.findIndex(val => val === true);
    copy[nowWatched] = false;
    copy[nowWatched + index] = true;
    setIsActive(copy);
    sessionStorage.setItem("Page", String(nowWatched + index));
  };
  useEffect(() => {
    if (sessionStorage.Page) {
      const watchedPage = Number(sessionStorage.getItem("Page"));
      setPage(watchedPage);
      const pageTracker = Array(watchedPage + 1).fill(false);
      pageTracker[watchedPage] = true;
      setIsActive(pageTracker);
    }
  }, [setPage]);

  const numPages = Math.ceil(total / limit);
  return (
    <>
      {numPages > 1 && (
        <div className="flex justify-center space-x-5 pt-8 text-base">
          <button onClick={() => prevNext(-1)} disabled={page === 0}>
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
          <button onClick={() => prevNext(1)} disabled={page === numPages - 1}>
            &gt;
          </button>
        </div>
      )}
    </>
  );
}
