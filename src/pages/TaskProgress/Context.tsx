import { ReactNode, createContext } from "react";
import {
  ContextType,
  initialState,
  useCustomContext,
} from "../../hooks/useCustomContext";

type ItemProgressProps = {
  id: number | string;
  tasks: ItemProgressProps[];
  name: string;
  type: "query" | "file";
  isChildren?: boolean;
  saveParams?: boolean;
  receiveParams?: (data: any, newAttribute: any) => any;
  api?: {
    url: string;
    method?: "POST" | "GET" | "PUT" | "DELETE";
    body?: any;
    callback?: (props: { skip: (idOrName: number | string) => void }) => void;
  };
};

const initItemProgress: ItemProgressProps = {
  id: Math.random(),
  tasks: [],
  name: "Upload thumbnail",
  type: "file",
  saveParams: true,
  api: {
    url: "users",
    callback: (props) => {},
  },
};

type StatusProgress = {
  [type: string]: "pending" | "processing" | "success";
};

type ItemTaskProgressProps = {
  item: ItemProgressProps;
};

type TaskProgressState = {
  taskMerge: ItemProgressProps[];
  taskList: ItemProgressProps[];
  data: StatusProgress;
  param: any;
  current: number | string;
  done: (string | number)[];
};

const init: TaskProgressState = {
  taskMerge: [],
  taskList: [],
  data: {},
  param: null,
  current: "",
  done: [],
};

const initContext: ContextType<TaskProgressState> =
  initialState<TaskProgressState>(init);

const TaskProgressContext =
  createContext<ContextType<TaskProgressState>>(initContext);

const TaskProgressProvider = ({ children }: { children: ReactNode }) => {
  const CustomProvider = useCustomContext(init, TaskProgressContext);
  return <CustomProvider>{children}</CustomProvider>;
};

export { TaskProgressContext, TaskProgressProvider };
export type {
  TaskProgressState,
  ItemTaskProgressProps,
  ItemProgressProps,
  StatusProgress,
};

export { initItemProgress };
