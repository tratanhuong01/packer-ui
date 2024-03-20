import { ReactNode } from "react";
import { Style } from "util";

type ParentProps = {
  children?: ReactNode;
  justify?: undefined | "" | "space-between" | "center" | "left" | "right";
  items?: undefined | "" | "center";
  gap?: Number;
  className?: string;
  handleClick?: Function;
  style?: Style;
};

export default ParentProps;
