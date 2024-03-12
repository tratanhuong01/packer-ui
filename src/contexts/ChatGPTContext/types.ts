import {
  HistoryProps,
  MessageProps,
} from "../../modules/ChatGPT/interfaces/Message";

type StateType = {
  historyList: HistoryProps[];
  current: HistoryProps | null;
  isDone: boolean;
  pendingResponse: MessageProps | null;
  stopRender: number;
};

type StateKey = keyof StateType;

type Constant = "UPDATE_DATA";

type Payload = {
  key: StateKey;
  value: never | any;
};

type ActionType = {
  type: Constant;
  payload: Payload;
};

export type { StateType, ActionType, StateKey, Payload };
