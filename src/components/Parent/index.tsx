import ParentProps from "./type";

const Parent = ({
  justify,
  items,
  gap,
  className,
  children,
  handleClick,
}: ParentProps) => {
  //
  const generateJustify = () => {
    switch (justify) {
      case "space-between":
        return "justify-between";
      case "left":
        return "justify-left";
      case "right":
        return "justify-right";
      case "center":
        return "justify-center";
      default:
        return "";
    }
  };
  const generateItems = () => {
    switch (items) {
      case "center":
        return "items-center";
      default:
        return "";
    }
  };
  const classNameChildren = `${generateJustify()} ${generateItems()}`;
  //
  return (
    <div
      onClick={() => handleClick && handleClick()}
      className={`flex ${className || ""} ${classNameChildren || ""}`}
      style={{ gap: `${gap || 0}px` }}
    >
      {children}
    </div>
  );
};

export default Parent;
