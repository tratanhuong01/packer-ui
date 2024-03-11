import AlertProps from "./type";

const Alert = ({ children, severity }: AlertProps) => {
  //
  const render = (): { background: string; color: string } => {
    switch (severity) {
      case "success":
        return {
          background: "bg-green-200",
          color: "bx bx-check-circle text-green-500",
        };
      case "info":
        return {
          background: "bg-blue-200",
          color: "bx bx-info-circle text-blue-500",
        };
      case "warning":
        return {
          background: "bg-yellow-200",
          color: "bx bx-shape-triangle text-yellow-500",
        };
      case "error":
        return {
          background: "bg-red-200",
          color: "bx bx-info-circle text-red-500",
        };
      default:
        return {
          background: "",
          color: "",
        };
    }
  };
  const data = render();
  //
  return (
    <div
      className={`p-2 w-80 bg-opacity-70 rounded-sm flex items-center gap-2 ${data.background}`}
    >
      <i className={`text-xl ${data.color}`}></i>
      <span className="text-sm">{children}</span>
    </div>
  );
};

export default Alert;
