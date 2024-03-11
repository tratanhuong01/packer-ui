import ParentProps from "./type";

const Parent = (props: ParentProps) => {
  //
  const { justify, items, gap, className, children } = props;
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
      className={`flex ${className || ""} ${classNameChildren || ""}`}
      style={{ gap: `${gap || 0}px` }}
    >
      {children}
    </div>
  );
};

export default Parent;
