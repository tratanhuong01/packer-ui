import { useEffect, useState } from "react";
import PaginationProps from "./type";
import "./index.scss";

type PaginationItem = {
  index: number;
  type: "left" | "normal" | "right";
};

const Pagination = ({
  length,
  current,
  limit,
  handleItem,
}: PaginationProps) => {
  //
  const [active, setActive] = useState(current);
  const [loading, setLoading] = useState(false);
  const offset = Math.ceil(length / limit);
  const [list, setList] = useState<PaginationItem[]>(
    length === 0
      ? []
      : new Array(offset > 7 ? 7 : offset)
          .fill(0)
          .map((item, index): PaginationItem => {
            return {
              index,
              type: "normal",
            };
          })
  );
  useEffect(() => {
    setActive(current === -1 ? 0 : current);
    let temp =
      length === 0
        ? []
        : new Array(offset > 7 ? 7 : offset)
            .fill(0)
            .map((item, index): PaginationItem => {
              return {
                index,
                type: "normal",
              };
            });

    if (offset <= 6 || temp.length <= 6) {
      setList(temp);
      return;
    }
    let isLeft = temp.findIndex((_) => _.type === "left");
    if (current >= 4) {
      isLeft === -1 &&
        temp.splice(1, 0, {
          type: "left",
          index: -1,
        });
    } else {
      temp = temp.filter((_) => _.type !== "left");
    }
    isLeft = temp.findIndex((_) => _.type === "left");
    let isRight = temp.findIndex((_) => _.type === "right");
    if (offset >= 9) {
      if (isRight === -1) {
        temp.splice(7, 0, {
          type: "right",
          index: -1,
        });
        if (temp[8]) temp[8].index = offset - 1;
      }
    }
    if (current > offset - 5) {
      temp = temp.filter((item) => item.type !== "right");
      temp[2].index = offset - 6;
      temp[3].index = offset - 5;
      temp[4].index = offset - 4;
      temp[5].index = offset - 3;
      temp[6].index = offset - 2;
    } else {
      const start = isLeft !== -1 ? 2 : 1;
      temp[start].index = current >= 5 ? -2 + current : 1;
      temp[start + 1].index = current >= 5 ? -1 + current : 2;
      temp[start + 2].index = current >= 5 ? 0 + current : 3;
      temp[start + 3].index = current >= 5 ? 1 + current : 4;
      temp[start + 4].index = current >= 5 ? 2 + current : 5;
    }
    setList(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, length]);
  //
  return length > 0 ? (
    <div className="mx-auto my-4 flex items-center justify-center gap-2">
      <div
        onClick={() => {
          if (active === 0 || loading) return;
          setLoading(true);
          setActive(current - 1);
          handleItem(current - 1);
          setLoading(false);
        }}
        className={`w-10 h-10 border-solid border-primary transition-colors rounded-sm 
            flex items-center justify-center bx bx-chevron-left ${
              active === 0
                ? "cursor-not-allowed"
                : false
                ? "bg-primary text-white font-semibold cursor-pointer "
                : "text-gray-500 hover:bg-primary hover:text-white cursor-pointer "
            }`}
      ></div>
      {list.map((item) =>
        item.type === "normal" ? (
          <div
            onClick={() => {
              setActive(item.index);
              handleItem(item.index);
            }}
            key={Math.random()}
            className={`w-10 h-10 border-solid border-primary transition-colors rounded-sm cursor-pointer 
            hover:bg-primary hover:text-white flex items-center justify-center ${
              item.index === active
                ? "bg-primary text-white font-semibold"
                : "text-gray-500"
            }`}
          >
            {item.index + 1}
          </div>
        ) : (
          <div
            key={Math.random()}
            onClick={() => {
              let result = current + (item.type === "left" ? -5 : 5);
              if (result > Math.floor(length / limit)) {
                result = length;
              }
              setActive(result);
              handleItem(result);
            }}
            className={`w-10 h-10 flex items-center justify-center bx bx-dots-horizontal-rounded cursor-pointer  
            text-gray-500 duplicate relative`}
          >
            <div
              key={Math.random()}
              className={`w-10 h-10 absolute top-0 left-0 flex items-center justify-center 
              bx bx-chevrons-${item.type} text-gray-500 hover:text-primary`}
            ></div>
          </div>
        )
      )}
      <div
        onClick={() => {
          if (active === offset - 1 || loading) return;
          setLoading(true);
          setActive(current + 1);
          handleItem(current + 1);
          setLoading(false);
        }}
        className={`w-10 h-10 border-solid border-primary transition-colors rounded-sm 
            flex items-center justify-center bx bx-chevron-right ${
              active === offset - 1
                ? "cursor-not-allowed"
                : false
                ? "bg-primary text-white font-semibold cursor-pointer "
                : "text-gray-500 hover:bg-primary hover:text-white cursor-pointer "
            }`}
      ></div>
    </div>
  ) : (
    <></>
  );
};

export default Pagination;
