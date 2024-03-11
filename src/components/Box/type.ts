import { ReactNode } from "react";

type BoxProps = {
  children?: ReactNode;
  width: number;
  height: number;
  rounded?: boolean;
  border?: string;
  className?: string;
  handleClick?: Function;
  disabled?: boolean;
};

export default BoxProps;
