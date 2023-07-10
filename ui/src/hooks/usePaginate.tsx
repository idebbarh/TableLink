import { useState } from "react";

type UsePaginate = {
  paginate: <T>(arr: T[]) => T[];
  paginationLinks: (
    arrLen: number,
    tailwindClasses?: string,
    activeTailwindClasses?: string
  ) => JSX.Element[];
};

function usePaginate(perPage: number): UsePaginate {
  const [start, setStart] = useState<number>(0);
  const [activeLink, setActiveLink] = useState<number>(1);

  const linkClickHandler = (linkNumber: number) => {
    setStart(linkNumber * perPage - perPage);
    setActiveLink(linkNumber);
  };

  function paginate<T>(arr: T[]): T[] {
    return arr.slice(start, start + perPage);
  }

  const paginationLinks = (
    arrLen: number,
    tailwindClasses: string = "",
    activeTailwindClasses: string = ""
  ) => {
    return new Array(Math.ceil(arrLen / perPage)).fill(0).map((_, index) => {
      return (
        <div
          className={`${tailwindClasses} ${
            index + 1 === activeLink ? activeTailwindClasses : ""
          }`}
          key={index}
          onClick={() => linkClickHandler(index + 1)}
        >
          {index + 1}
        </div>
      );
    });
  };
  return { paginate, paginationLinks };
}

export default usePaginate;
