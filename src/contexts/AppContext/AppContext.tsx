import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { ActionType, ContextType, ProviderType, StateType } from "./types";
import * as actionList from "./Actions";

const actions = { ...actionList };

const initialState: StateType = {
  menuActive: false,
  toasts: [],
};

const AppContext = createContext<ContextType>({
  app: initialState,
  actions,
  dispatch: (value: ActionType) => "",
});

const AppProvider = ({ children }: ProviderType) => {
  //
  const [app, dispatch] = useReducer(AppReducer, initialState);
  //
  return (
    <AppContext.Provider
      value={{
        app,
        actions,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
