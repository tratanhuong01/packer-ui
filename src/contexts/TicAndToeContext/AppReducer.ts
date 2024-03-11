import { StateType, ActionType } from "./types";

const AppReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "UPDATE_DATA":
      const newState = { ...state };
      return { ...newState };

    default:
      return { ...state };
  }
};
export default AppReducer;
