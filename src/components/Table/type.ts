type ColumnsProps<T> = {
  field: keyof T;
  headerName: string;
  customColumn?: any;
  align?: "left" | "center" | "right";
  hidden?: boolean;
  handle?: Function;
};

type CommandBarProps = {
  name: string;
  icon?: string;
  handle?: Function;
  type: "delete" | "edit" | "normal" | "add";
  props?: Object;
};

type SelectBarProps<T> = {
  nameSearch?: keyof T;
  handle?: (item: T) => void;
  options: T[];
  defaultValue: any;
};

type OptionFilerProps = { key: string | number; value: string };

type FilterItemProps<T> = {
  options: OptionFilerProps[];
  defaultValue: string;
  name: string;
  field: keyof T;
  type: "checkbox";
};

type GetItemParam = {
  offset: number;
  limit: number;
  search?: string;
  filters?: {
    [key: string]: (string | number)[];
  };
};

type GetItemResponse<T> = {
  list: T[];
  total: number;
};

type TableProps<T, O> = {
  commandBars?: CommandBarProps[];
  columns: ColumnsProps<T>[];
  callbackButton?: {
    edit?: (item: Model<T>, callback: Function) => boolean | undefined | void;
    delete?: (
      item: Model<T>,
      callback: Function
    ) => Promise<boolean | undefined | void>;
  };
  hidden?: ("edit" | "delete" | "checkbox" | "add" | "normal")[];
  handleCheck?: Function;
  disableEdit?: boolean;
  disableDelete?: boolean;
  selectBars?: SelectBarProps<O>[];
  debounce?: boolean;
  filters?: FilterItemProps<T>[];
  limit?: number;
  getItems?: (params: GetItemParam) => Promise<GetItemResponse<T>>;
  ModalContainer?: any;
  filterDefault?: { [key: string]: (string | number)[] };
  deleteMultiAPI?: (ids: number[]) => void;
};

type TableModel = {
  id: number;
};

type Model<T> = TableModel & T;

type ObjectCustom = {
  [key: string]: OptionFilerProps[];
};

export type {
  TableProps,
  ColumnsProps,
  Model,
  CommandBarProps,
  SelectBarProps,
  FilterItemProps,
  OptionFilerProps,
  ObjectCustom,
  GetItemParam,
  GetItemResponse,
};
