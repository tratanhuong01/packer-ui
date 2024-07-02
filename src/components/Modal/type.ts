import { ReactNode } from "react";
import ButtonProps from "../Button/type";

type ItemFooterButtonProps = {
  id?: number;
  handle?: Function;
  name: string;
  type: "other" | "confirm" | "close";
  disabled?: boolean;
  loading?: boolean;
  customMode?:
    | "primary"
    | "disabled"
    | "text"
    | "contained"
    | "outlined"
    | "gray"
    | "delete";
  props?: ButtonProps;
};

type ModalProps = {
  children?: ReactNode;
  headerTitle?: string;
  width?: number;
  closeModal?: Function;
  buttonHidden?: Boolean;
  footerButton?: ItemFooterButtonProps[];
  footerButtonRender?: ReactNode;
  childrenModal?: string;
  hidden?: boolean;
  loading?: boolean;
  submitForm?: any;
  mode?: "panel" | "modal";
  disabledCenter?: boolean;
  disableSubmitForm?: boolean;
  noPadding?: boolean;
  noAnimate?: boolean;
  invisible?: boolean;
};

type ModalPortalProps = {
  children?: ReactNode;
};
export type { ModalProps, ModalPortalProps };
