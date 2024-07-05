import { Dispatch, ReactNode, createContext, useReducer } from "react";
import ChatGPTReducer from "./ChatGPTReducer";
import { ActionType, Payload, StateType } from "./types";
import * as actionList from "./Actions";
import { Auth0Provider } from "@auth0/auth0-react";

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
  isDone: [],
  pendingResponse: null,
  isRendering: false,
  fullScreen: false,
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
    <Auth0Provider
      domain={process.env.REACT_APP_GPT_DOMAIN || ""}
      clientId={process.env.REACT_APP_GPT_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_GPT_URI,
      }}
    >
      <ChatGPTContext.Provider
        value={{
          app,
          actions,
          dispatch,
        }}
      >
        {children}
      </ChatGPTContext.Provider>
    </Auth0Provider>
  );
};

export { ChatGPTContext, ChatGPTProvider };
