import {
  ActionNameComponent,
  ActionProps,
  PropsType,
  ActionContent,
  AdminContentType,
  Constant,
} from "./types";

const updateProps = (key: keyof PropsType, value: any): ActionProps => {
  return {
    type: "UPDATE_PROPS",
    key,
    value,
  };
};

const updateNameComponent = (value: string): ActionNameComponent => {
  return {
    type: "UPDATE_NAME_COMPONENT",
    value,
  };
};

const updateContent = (value: any): ActionContent => {
  return {
    type: "UPDATE_CONTENT",
    value,
  };
};

const addContent = (
  value: AdminContentType
): {
  type: Constant;
  value: AdminContentType;
} => {
  return {
    type: "ADD_CONTENT",
    value,
  };
};

export { updateProps, updateNameComponent, updateContent, addContent };
