import { ActionType, Payload } from "./types";

const updateData = (payload: Payload): ActionType => {
  return {
    type: "UPDATE_DATA",
    payload,
  };
};

const resetData = () => {
  return {
    type: "RESET_DATA",
  };
};

export { updateData, resetData };
