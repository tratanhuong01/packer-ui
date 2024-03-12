import { useEffect, useRef, useState } from "react";
import "./index.scss";
import ButtonProps from "./type";

const Button = (props: ButtonProps) => {
  //
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ref = useRef<HTMLButtonElement>(null);
  const { id, children, mode, handleClick, disabled, width, height } = props;
  const [modeCurrent, setModeCurrent] = useState(mode);
  const generateClassMode = (): string => {
    switch (modeCurrent) {
      case "primary":
        return "border border-solid border-gray-300 bg-blue-500 hover:bg-blue-600 text-white";
      case "gray":
        return "border border-solid border-gray-300 bg-gray-600 hover:bg-gray-500 text-white";
      case "outlined":
        return "border border-solid text-blue-500 border-blue-500 bg-white hover:bg-blue-600 border border-solid border-blue-500 hover:text-white";
      case "contained":
        return disabled
          ? "border border-solid border-gray-300 bg-gray-600 hover:bg-gray-500 text-white cursor-not-allowed"
          : "border border-solid border-gray-300 bg-blue-600 hover:bg-blue-500 text-white";
      default:
        return "border-none text-blue-500";
    }
  };
  const handleClickOverride = async () => {
    setModeCurrent("disabled");
    setLoading(!loading);
    handleClick && (await handleClick());
    setLoading(false);
    setModeCurrent(mode);
  };
  useEffect(() => {
    if (ref.current) {
      // setWidth(ref.current.offsetWidth + 20 || null);
    }
  }, [width]);
  //
  return (
    <button
      ref={ref}
      onClick={handleClickOverride}
      id={id}
      className={`py-2 rounded-sm transition whitespace-nowrap rounded-lg px-5 font-semibold ${generateClassMode()} ${
        !mode ? "text-button" : ""
      } flex items-center justify-center`}
      style={{
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
      }}
      disabled={disabled}
    >
      {loading && mode !== "text" ? (
        <i className="bx bx-loader-circle loader"></i>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
