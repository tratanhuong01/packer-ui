import { ReactNode } from "react";

type ButtonProps = {
  id?: string;
  children: ReactNode;
  handleClick?: Function;
  disabled?: boolean;
  mode?: "primary" | "disabled" | "text" | "contained" | "outlined" | "gray";
  href?: string;
  width?: number;
  height?: number;
};

export default ButtonProps;
