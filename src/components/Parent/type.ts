import { ReactNode } from "react";

type ParentProps = {
  children?: ReactNode;
  justify?: undefined | "" | "space-between" | "center" | "left" | "right";
  items?: undefined | "" | "center";
  gap?: Number;
  className?: string;
};

export default ParentProps;
