import { ReactNode } from "react";

type PopoverProps = {
  component: ReactNode;
  children: ReactNode;
  stylePop?: {
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
  };
  className?: string;
};

export default PopoverProps;
