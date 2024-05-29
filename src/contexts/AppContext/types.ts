import { ReactNode, Dispatch } from "react";

type StateType = {
  menuActive: boolean;
  toasts: { id: number; severity: "" }[];
};

type StateKey = keyof StateType;

type Constant = "UPDATE_DATA";

type Payload = { key: StateKey; value: any };

type ActionType = {
  type: Constant;
  payload: Payload;
};

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

export type {
  StateType,
  ActionType,
  StateKey,
  Payload,
  ContextType,
  ProviderType,
};
