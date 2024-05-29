type AlertProps = {
  severity: "success" | "info" | "warning" | "error";
  mode?: "filled" | "outlined" | "standard";
  content: {
    title: string;
    description: string;
  };
};

export default AlertProps;
