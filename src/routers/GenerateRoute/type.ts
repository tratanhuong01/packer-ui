import { ReactNode } from "react";

export type ItemGenerateRoute = {
  id: number;
  name: string;
  items: ItemGenerateChild[];
};

export type ItemGenerateChild = {
  id: number;
  name: string;
  type: "component" | "app" | "doc";
  component: ReactNode | any;
};
