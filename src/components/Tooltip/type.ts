import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  title: string | ReactNode;
  position: "top" | "left" | "right" | "bottom";
  handleClick?: Function;
};

export default TooltipProps;
