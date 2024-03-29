import { ReactNode } from "react";

type ModalProps = {
  children?: ReactNode;
  headerTitle?: string;
  width?: number;
  closeModal?: Function;
  buttonHidden?: Boolean;
  footerButton?: {
    id: number;
    handle: Function;
    name: string;
    type: "other" | "confirm" | "close";
  }[];
  footerButtonRender?: ReactNode;
  childrenModal?: string;
  hidden?: boolean;
};

export default ModalProps;
