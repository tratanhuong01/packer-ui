import { useEffect, useState } from "react";
import ToastProps from "./type";

const Toast = ({ severity, content, removeToast, id }: ToastProps) => {
  //
  //
  const renderIcon = () => {
    switch (severity) {
      case "success":
        return "bx bxs-check-circle text-green-500";
      case "info":
        return "bx bx-info-circle text-orange-500";
      case "warning":
        return "bx bx-shape-triangle text-yellow-600";
      case "error":
        return "bx bx-info-circle text-red-500";
      default:
        return "";
    }
  };
  const renderGround = () => {
    switch (severity) {
      case "success":
        return "border-l-green-500 border-l-4";
      case "info":
        return "border-l-orange-500 border-l-4";
      case "warning":
        return "border-l-yellow-600 border-l-4";
      case "error":
        return "border-l-red-500 border-l-4";
      default:
        return "";
    }
  };
  const [animate, setAnimate] = useState("");
  const icon = renderIcon();
  const ground = renderGround();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAnimate("fadeOutAnimation");
      const delay = setTimeout(() => {
        removeToast && removeToast(id);
        clearTimeout(delay);
      }, 500);
    }, 1500);
    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //
  return (
    <div
      className={`p-3 w-80 rounded-sm flex items-center gap-2 border border-solid border-gray-200 
      shadow-lg relative ${animate} ${ground}`}
    >
      <span className="absolute top-2 right-2 bx bx-x cursor-pointer"></span>
      <i className={`text-2xl ${icon}`}></i>
      <div className="text-sm">
        <p className={`-pl-1 font-bold`}>{content.title}</p>
        <p className={`text-sm text-gray-700`}>{content.description}</p>
      </div>
    </div>
  );
};

export default Toast;
