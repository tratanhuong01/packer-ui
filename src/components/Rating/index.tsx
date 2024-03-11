import { createRef, useState } from "react";
import "./index.scss";
import RatingProps from "./type";

const Rating = (props: RatingProps) => {
  //
  const { maxStar, current, disabled } = props;
  const [starCurrent, setStarCurrent] = useState(current);
  const [half, setHalf] = useState(false);
  const hoverStar = (
    item: number,
    position: { x: number; y: number; width: number }
  ) => {
    if (!disabled) {
      setStarCurrent(item + 1);
    }
    setHalf(position.x < position.width / 2);
  };
  const refs = Array(maxStar || 5)
    .fill(0)
    .map(() => createRef<HTMLLIElement>());

  //
  return (
    <div
      className={`flex items-center justify-center gap-1 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {refs.map((ref, index) => (
        <i
          ref={ref}
          onMouseMove={(event) => {
            if (ref.current) {
              var mouseX =
                event.clientX - ref.current.getBoundingClientRect().left;
              var mouseY =
                event.clientY - ref.current.getBoundingClientRect().top;
              hoverStar(index, {
                x: mouseX,
                y: mouseY,
                width: ref.current.offsetWidth,
              });
            }
          }}
          key={index}
          className={`text-4xl ${disabled ? "" : "cursor-pointer"} ${
            index <= starCurrent - 1
              ? `bx bxs-star${
                  half && index === starCurrent - 1 ? "-half" : ""
                } text-yellow-500`
              : "bx bx-star"
          }`}
        ></i>
      ))}
    </div>
  );
};

export default Rating;
