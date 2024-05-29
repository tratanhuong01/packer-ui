interface PropItem {
  id: number;
  value: string;
  dataType: {
    type: string;
    detail: { id: number; value: string }[];
  };
  optional: boolean;
  isAdded?: boolean;
}
type AdminContentType = {
  id: number;
  content: string | string[];
  // type: "list" | "description" | "title" | "show" | "normal";
  type: string;
  component: {
    code: {
      expand: string;
      collapse: string;
    };
    name: string;
    props: PropItem | null;
  };
};

type AdminType = {
  props: PropsType;
  nameComponent: string;
  content: AdminContentType[];
};

type PropsType = {
  current: string;
  done: PropItem[];
  component: PropItem[];
};

type Constant =
  | "UPDATE_PROPS"
  | "UPDATE_NAME_COMPONENT"
  | "UPDATE_CONTENT"
  | "ADD_CONTENT";

type ActionProps = {
  type: Constant;
  key: keyof PropsType;
  value: any;
};

type ActionNameComponent = {
  type: Constant;
  value: string;
};

type ActionContent = {
  type: Constant;
  value: any;
};

type ActionType = {
  updateProps: (key: keyof PropsType, value: any) => ActionProps;
  updateNameComponent: (value: string) => ActionNameComponent;
  updateContent: (value: any) => ActionContent;
  addContent: (value: AdminContentType) => {
    type: Constant;
    value: AdminContentType;
  };
};

export type {
  AdminType,
  PropsType,
  PropItem,
  ActionType,
  ActionProps,
  ActionNameComponent,
  Constant,
  ActionContent,
  AdminContentType,
};
