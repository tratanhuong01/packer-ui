import AlertProps from "./type";

const Alert = ({ severity, content, mode }: AlertProps) => {
  //
  const backgroundComputed = (color: string) =>
    !mode || mode === "standard"
      ? `bg-${color}-200 bg-opacity-70`
      : mode === "filled"
      ? `bg-${color}-600 text-white`
      : `bg-white border border-solid border-${color}-600`;

  const colorComputed = (color: string) =>
    !mode || mode === "standard"
      ? `text-${color}-500`
      : mode === "filled"
      ? "text-white"
      : "";

  const render = (): { background: string; color: string } => {
    switch (severity) {
      case "success":
        return {
          background: backgroundComputed("green"),
          color: "bx bx-check-circle " + colorComputed("green"),
        };
      case "info":
        return {
          background: backgroundComputed("blue"),
          color: "bx bx-info-circle " + colorComputed("blue"),
        };
      case "warning":
        return {
          background: backgroundComputed("yellow"),
          color: "bx bx-shape-triangle " + colorComputed("yellow"),
        };
      case "error":
        return {
          background: backgroundComputed("red"),
          color: "bx bx-info-circle " + colorComputed("red"),
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
      className={`p-3 w-80 rounded-sm flex items-center gap-2 ${data.background}`}
    >
      <i className={`text-2xl ${data.color}`}></i>
      <div className="text-sm">
        <p className={`${data.color.split(" ")[2]} font-bold`}>
          {content.title}
        </p>
        <p className={`text-sm text-gray-700`}>{content.description}</p>
      </div>
    </div>
  );
};

export default Alert;
