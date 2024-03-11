import { Dispatch, ReactNode, createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
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
const initialState: StateType = {};

const TicAndToeContext = createContext<ContextType>({
  app: initialState,
  actions,
  dispatch: (value: ActionType) => "",
});

const TicAndToeProvider = ({ children }: ProviderType) => {
  //
  const [app, dispatch] = useReducer(AppReducer, initialState);
  //
  return (
    <TicAndToeContext.Provider
      value={{
        app,
        actions,
        dispatch,
      }}
    >
      {children}
    </TicAndToeContext.Provider>
  );
};

export { TicAndToeContext, TicAndToeProvider };
