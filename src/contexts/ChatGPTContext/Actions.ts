import { ActionType, Payload } from "./types";

const updateData = (payload: Payload): ActionType => {
  return {
    type: "UPDATE_DATA",
    payload,
  };
};

export { updateData };
