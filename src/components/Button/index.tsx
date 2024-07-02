import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import "./index.scss";
import ButtonProps from "./type";

const Button = (
  props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  //
  const {
    type,
    children,
    mode,
    handleClick,
    width,
    className,
    loading,
    height,
    icon,
    ping,
    disabled,
    rounded,
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(loading);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ref = useRef<HTMLButtonElement>(null);
  const [modeCurrent, setModeCurrent] = useState(mode);
  const generateClassMode = (): string => {
    switch (modeCurrent) {
      case "delete":
        return `border border-solid border-500 hover:bg-red-600 bg-red-500 text-white`;
      case "primary":
        return `border border-solid border-primary bg-primary hover:bg-primary text-white`;
      case "gray":
        return `border border-solid border-gray-300 bg-gray-600 hover:bg-gray-500 text-white`;
      case "outlined":
        return `border border-solid text-primary border-primary bg-white hover:bg-primary hover:text-white`;
      case "contained":
        return `border border-solid border-primary bg-primary hover:bg-primary text-white`;
      default:
        return `border-none ${className || "text-primary"}`;
    }
  };
  const handleClickOverride = async (e: any) => {
    setModeCurrent("disabled");
    setIsLoading(true);
    if (typeof handleClick === "string") {
      // eslint-disable-next-line no-new-func
      const func = new Function(handleClick);
      await func();
    }
    typeof handleClick === "function" && (await handleClick());
    typeof props.onClick === "function" && (await props.onClick(e));
    setIsLoading(false);
    setModeCurrent(mode);
  };
  const customProps = () => {
    let temp = { ...props };
    delete temp.mode;
    delete temp.icon;
    delete temp.handleClick;
    delete temp.href;
    delete temp.width;
    delete temp.height;
    delete temp.rounded;
    delete temp.ping;
    return temp;
  };
  useEffect(() => {
    if (ref.current) {
      // setWidth(ref.current.offsetWidth + 20 || null);
    }
  }, [width]);
  //
  return (
    <button
      {...customProps()}
      type={type || "button"}
      ref={ref}
      onClick={handleClickOverride}
      className={`py-2 relative transition whitespace-nowrap ${
        rounded ? `rounded-${rounded}` : "rounded-lg"
      } px-4 ${generateClassMode()} ${
        !mode ? "text-button" : ""
      } disabled:bg-gray-600 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed flex 
      items-center justify-center ${className} disabled:border-gray-500`}
      style={
        loading
          ? { width: 48, height: 48 }
          : {
              width:
                typeof width === "string"
                  ? width
                  : width
                  ? `${width}px`
                  : "auto",
              height: height ? `${height}px` : "auto",
            }
      }
      disabled={mode === "disabled" || disabled}
    >
      {
        // isLoading && mode !== "text" ? (
        //   <i className="bx bx-loader-circle loader"></i>
        // ) :
        icon ? (
          <div className="flex items-center gap-2.5">
            <span className={icon}></span>
            <span className="">{children}</span>
          </div>
        ) : (
          children
        )
      }
      {ping && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      )}
    </button>
  );
};

export default Button;
