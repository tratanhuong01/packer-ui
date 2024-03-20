import { Dispatch } from "react";

interface TicAndToeProps {
  boxList: number[][];
  user: UserProps | null;
  socket: any;
  idSocket: number | null;
  level: number;
  rooms: RoomProps[];
  roomId: number | null;
}

interface RoomProps {
  id: number;
  owner: UserProps;
  members: UserProps[];
  boxList: number[][];
}

interface UserProps {
  id: number;
  name: string;
  socketId: number | null;
}

type StateKey = keyof TicAndToeProps;

type Payload = { key: StateKey; value: any };

type Constant = "UPDATE_DATA" | "RESET_DATA";

type ActionType = {
  type: Constant;
  payload: Payload;
};

type TicAndToeContextProps = {
  ticAndToe: TicAndToeProps;
  actions: {
    updateData: (payload: Payload) => ActionType;
  };
  dispatch: Dispatch<ActionType>;
};

export type {
  TicAndToeProps,
  ActionType,
  Payload,
  Constant,
  TicAndToeContextProps,
  UserProps,
  RoomProps,
};
