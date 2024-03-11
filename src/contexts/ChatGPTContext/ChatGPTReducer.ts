import { StateType, ActionType } from "./types";

const AppReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "UPDATE_DATA":
      switch (action.payload.key) {
        case "current":
          state.current = action.payload.value;
          break;
        case "historyList":
          state.historyList = action.payload.value;
          break;
        case "isDone":
          state.isDone = action.payload.value;
          break;
        case "pendingResponse":
          state.pendingResponse = action.payload.value;
          break;
        case "stopRender":
          state.stopRender = action.payload.value;
          break;
        default:
          break;
      }
      return { ...state };

    default:
      return { ...state };
  }
};
export default AppReducer;
