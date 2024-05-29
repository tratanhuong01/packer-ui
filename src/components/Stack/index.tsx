import StackProps from "./props";

const Stack = ({
  style,
  mode,
  className,
  children,
  items,
  justify,
  columnLength,
  isUl,
  handleClick,
}: StackProps) => {
  //
  const convert = () => {
    return mode === "flex"
      ? `${items ? ` items-${items}` : ""}${
          justify ? ` justify-${justify}` : ""
        }`
      : "";
  };
  const classString = `${mode} ` + convert() + ` ${className || ""}`;
  //
  return isUl ? (
    <ul
      onClick={() => {
        handleClick && handleClick();
      }}
      className={classString.trim()}
      style={{
        ...(style || {}),
        ...(columnLength
          ? {
              gridTemplateColumns: Array(columnLength).fill("1fr").join(" "),
            }
          : {}),
      }}
    >
      {children}
    </ul>
  ) : (
    <div
      onClick={() => {
        handleClick && handleClick();
      }}
      className={classString.trim()}
      style={{
        ...(style || {}),
        ...(columnLength
          ? {
              gridTemplateColumns: Array(columnLength).fill("1fr").join(" "),
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
};

export default Stack;
