import { ReactNode } from "react";

type ButtonProps = {
  id?: string;
  children: ReactNode;
  handleClick?: Function;
  loading?: boolean;
  disabled?: boolean;
  mode?: "primary" | "disabled" | "text" | "contained" | "outlined" | "gray";
  href?: string;
  width?: number | string;
  height?: number | string;
  type?: "submit" | "button" | "reset";
  className?: string;
};

export default ButtonProps;
