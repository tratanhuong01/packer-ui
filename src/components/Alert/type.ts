import { ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
  severity: "success" | "info" | "warning" | "error";
};

export default AlertProps;
