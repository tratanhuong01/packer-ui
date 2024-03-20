import { ActionType, TicAndToeProps } from "./types";

const TicAndToeReducer = (state: TicAndToeProps, action: ActionType) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, [action.payload.key]: action.payload.value };
    case "RESET_DATA":
      return { ...state };
    default:
      return { ...state };
  }
};

export default TicAndToeReducer;
