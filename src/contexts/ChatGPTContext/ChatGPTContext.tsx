import { Dispatch, ReactNode, createContext, useReducer } from "react";
import ChatGPTReducer from "./ChatGPTReducer";
import { ActionType, Payload, StateType } from "./types";
import * as actionList from "./Actions";

const actions = { ...actionList };

type ProviderType = {
  children?: ReactNode;
};
type ContextType = {
  app: StateType;
  actions: {
    updateData: (payload: Payload) => ActionType;
  };
  dispatch: Dispatch<ActionType>;
};
const initialState: StateType = {
  historyList: [],
  current: null,
  isDone: true,
  pendingResponse: null,
  stopRender: 1,
};

const ChatGPTContext = createContext<ContextType>({
  app: initialState,
  actions,
  dispatch: (value: ActionType) => "",
});

const ChatGPTProvider = ({ children }: ProviderType) => {
  //
  const [app, dispatch] = useReducer(ChatGPTReducer, initialState);
  //
  return (
    <ChatGPTContext.Provider
      value={{
        app,
        actions,
        dispatch,
      }}
    >
      {children}
    </ChatGPTContext.Provider>
  );
};

export { ChatGPTContext, ChatGPTProvider };
