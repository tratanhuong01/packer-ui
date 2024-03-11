import BoxProps from "./type";

const Box = (props: BoxProps) => {
  //
  const {
    width,
    height,
    children,
    border,
    className,
    rounded,
    handleClick,
    disabled,
  } = props;
  //
  return (
    <div
      onClick={() => {
        !disabled && handleClick && handleClick();
      }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={`${className || ""} ${
        rounded ? "rounded-full" : ""
      } flex justify-center items-center ${
        border || "border border-solid border-gray-100"
      } ${disabled ? "cursor-not-allowed" : ""}`}
    >
      {children}
    </div>
  );
};
export default Box;
