type ToastProps = {
  severity: "success" | "info" | "warning" | "error";
  content: {
    title: string;
    description: string;
  };
  removeToast?: (id: any) => void;
  id?: any;
};

export default ToastProps;
