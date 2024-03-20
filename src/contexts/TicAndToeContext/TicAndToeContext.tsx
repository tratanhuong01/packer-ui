import { ReactNode, createContext, useReducer } from "react";
import * as actions from "./Actions";
import { ActionType, TicAndToeContextProps, TicAndToeProps } from "./types";
import TicAndToeReducer from "./TicAndToeReducer";
// import { io } from "socket.io-client";

const initialState: TicAndToeProps = {
  boxList: [],
  user: null,
  socket: { on: () => {}, emit: () => {} },
  idSocket: null,
  level: 1,
  rooms: [],
  roomId: null,
};

const TicAndToeContext = createContext<TicAndToeContextProps>({
  ticAndToe: initialState,
  actions,
  dispatch: (value: ActionType) => {},
});

const TicAndToeProvider = ({ children }: { children: ReactNode }) => {
  //
  const [ticAndToe, dispatch] = useReducer(TicAndToeReducer, initialState);
  //
  return (
    <TicAndToeContext.Provider
      value={{
        ticAndToe,
        actions,
        dispatch,
      }}
    >
      {children}
    </TicAndToeContext.Provider>
  );
};

export { TicAndToeContext, TicAndToeProvider };
