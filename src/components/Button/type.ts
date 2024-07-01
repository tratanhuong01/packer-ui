import { ReactNode } from "react";

type ButtonProps = {
  icon?: string;
  children: ReactNode;
  handleClick?: Function;
  loading?: boolean;
  mode?:
    | "primary"
    | "disabled"
    | "text"
    | "contained"
    | "outlined"
    | "gray"
    | "delete";
  href?: string;
  width?: number | string;
  height?: number | string;
  ping?: boolean;
  rounded?: "sm" | "xs" | "md" | "lg" | "xl" | "2xl" | "full";
};

export default ButtonProps;
