import Stack from "../Stack";
import SquareProps from "./props";

const Square = ({
  style,
  rounded,
  children,
  className,
  icon,
  handleClick,
}: SquareProps) => {
  return (
    <Stack
      mode="flex"
      items="center"
      justify="center"
      style={
        style || {
          width: 40,
          height: 40,
          borderRadius: rounded === "full" ? "50%" : rounded,
        }
      }
      className={className || ""}
      handleClick={handleClick}
    >
      {icon ? <i className={icon} /> : children}
    </Stack>
  );
};

export default Square;
