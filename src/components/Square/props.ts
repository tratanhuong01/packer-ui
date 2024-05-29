import { CSSProperties, ReactNode } from "react";

type SquareProps = {
  style?: CSSProperties;
  rounded?: string | "full";
  className?: string;
  children?: ReactNode;
  icon?: string;
  handleClick?: Function;
};

export default SquareProps;
