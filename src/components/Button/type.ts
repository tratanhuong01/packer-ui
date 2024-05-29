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
    | "deleteOutlined";
  href?: string;
  width?: number | string;
  height?: number | string;
  ping?: boolean;
};

export default ButtonProps;
