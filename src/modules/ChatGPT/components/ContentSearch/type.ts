import { MessageChildProps } from "../../interfaces/Message";

type TaskbarTextProps = {
  content: string;
  fetchData: (callback?: (str: string) => void) => Promise<void>;
  messages: MessageChildProps;
};

type ContentSearchProps = {
  messages: MessageChildProps;
  scrollTop: Function;
  fetchData: (callback?: (str: string) => void) => Promise<void>;
};

export type { TaskbarTextProps, ContentSearchProps };
