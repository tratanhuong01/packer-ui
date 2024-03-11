type StateType = {
  // socket: s
};

type StateKey = keyof StateType;

type Constant = "UPDATE_DATA";

type Payload = { key: StateKey; value: any };

type ActionType = {
  type: Constant;
  payload: Payload;
};

export type { StateType, ActionType, StateKey, Payload };
