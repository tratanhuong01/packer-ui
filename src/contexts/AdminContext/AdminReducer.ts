import {
  ActionContent,
  ActionProps,
  AdminContentType,
  AdminType,
  Constant,
} from "./types";

const AdminReducer = (state: AdminType, action: any) => {
  switch (action.type) {
    case "UPDATE_PROPS":
      const actionProps: ActionProps = action;
      const newProps = { ...state.props };
      newProps[actionProps.key] = action.value;
      return { ...state, props: newProps };
    case "UPDATE_NAME_COMPONENT":
      console.log("update name content");
      const actionNameComponent: ActionProps = action;
      state.nameComponent = actionNameComponent.value;
      return { ...state };
    case "UPDATE_CONTENT":
      const actionContent: ActionContent = action;
      state.content = actionContent.value;
      return { ...state };
    case "ADD_CONTENT":
      const actionAddContent: {
        type: Constant;
        value: AdminContentType;
      } = action;
      let stateTemp = { ...state };
      stateTemp.content.push(actionAddContent.value);
      console.log(stateTemp);
      return { ...stateTemp };
    default:
      return { ...state };
  }
};
export default AdminReducer;
