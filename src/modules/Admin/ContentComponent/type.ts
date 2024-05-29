import { AdminContentType } from "../../../contexts/AdminContext/types";

type DisplayComponentProps = {
  closeModal: Function;
  index: number;
  handleSubmit: Function;
};

type WrapperContentProps = {
  item: AdminContentType;
  setShowModal: Function;
};

type ListComponentProps = {
  closeModal: Function;
  index: number;
  handleSubmit: (item: { id: number; value: string }[]) => void;
};

type TextComponentProps = { item: AdminContentType };

export type {
  DisplayComponentProps,
  WrapperContentProps,
  ListComponentProps,
  TextComponentProps,
};
