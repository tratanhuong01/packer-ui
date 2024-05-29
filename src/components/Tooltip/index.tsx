import { useRef, useState } from "react";
import "./index.scss";
import TooltipProps from "./type";

const Tooltip = ({
  title,
  children,
  position,
  handleClick,
  disabled,
}: TooltipProps) => {
  //
  const ref = useRef<HTMLDivElement>(null);
  const child = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  let timeOut: ReturnType<typeof setTimeout>;
  const generateClass = (status?: boolean): string => {
    switch (position) {
      case "top":
        return (
          "pb-1" + (status ? "" : " bottom-full transform-x-center left-1/2")
        );
      case "bottom":
        return "pt-1" + (status ? "" : " left-1/2 top-full transform-x-center");
      case "left":
        return (
          "pr-1" + (status ? "" : " right-full top-1/2 transform-y-center")
        );
      case "right":
        return "pl-1" + (status ? "" : " left-full top-1/2 transform-y-center");
      default:
        return "";
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [className, setClassName] = useState(generateClass());
  const process = () => {
    if (!ref.current || !child.current) return;
    const { x, y } = ref.current.getBoundingClientRect();
    const { width, height } = child.current.getBoundingClientRect();
    const { innerWidth } = window;
    if (innerWidth - x > width && y > height) {
      setClassName(generateClass());
      return;
    }

    // if (innerWidth - x < width) {
    //   child.current.style.right = "0px";
    //   setClassName(generateClass(true));
    // }
    if (y < height) {
      child.current.style.top = "100%";
      child.current.style.paddingTop = "12px";
      // if (!(innerWidth - x < width)) {
      //   child.current.style.transform = "translateX(-50%)";
      //   child.current.style.left = "50%";
      // }
      // setClassName(generateClass(true));
    }
  };
  const handleMouseEnter = (boolean?: boolean) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setShow(true);
      process();
      clearTimeout(timeOut);
    }, 300);
  };
  //
  return (
    <div
      ref={ref}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => {
        setShow(false);
        clearTimeout(timeOut);
      }}
      onClick={() => {
        setShow(false);
        handleClick && handleClick();
      }}
      className="relative inline-block"
    >
      <div>{children}</div>
      <div ref={child} className={`opacity-animation absolute ${className}`}>
        {show && !disabled && (
          <span
            className="whitespace-nowrap text-xs bg-gray-700 
          text-white font-semibold flex p-2 rounded-lg"
          >
            {title}
          </span>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
