import { CSSProperties, ReactNode } from "react";

type StackProps = {
  className?: string;
  style?: CSSProperties;
  mode: "flex" | "grid";
  children: ReactNode;
  items?: "center" | "start" | "end";
  justify?: "center" | "between" | "around";
  columnLength?: number;
  isUl?: boolean;
  handleClick?: Function;
};

export default StackProps;
