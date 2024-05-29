import { ReactNode, createContext } from "react";
import {
  ContextType,
  initialState,
  useCustomContext,
} from "../../hooks/useCustomContext";
import { Model, ObjectCustom } from "./type";

type TableState<T> = {
  show: boolean;
  index: number;
  idDelete: string | undefined;
  idEdit: string | undefined;
  loading: boolean;
  list: Model<T>[];
  length: number;
  selected: Model<T>[];
  showModalFilter: boolean;
  filterModal: ObjectCustom;
  search: string;
  loadingModal: boolean;
  warningDelete?: boolean;
};

const init: TableState<any> = {
  show: false,
  index: 0,
  idDelete: undefined,
  idEdit: undefined,
  loading: true,
  list: [],
  length: 0,
  selected: [],
  showModalFilter: false,
  filterModal: {},
  search: "",
  loadingModal: false,
  warningDelete: false,
};

const initContext: ContextType<TableState<any>> =
  initialState<TableState<any>>(init);

const TableContext = createContext<ContextType<TableState<any>>>(initContext);

const TableProvider = ({ children }: { children: ReactNode }) => {
  const CustomProvider = useCustomContext(init, TableContext);
  return <CustomProvider>{children}</CustomProvider>;
};

export { TableContext, TableProvider };
