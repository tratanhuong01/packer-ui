import { Dispatch, ReactNode, createContext, useReducer } from "react";
import AdminReducer from "./AdminReducer";
import { ActionType, AdminType } from "./types";
import * as actionList from "./Actions";
const actions = { ...actionList };

type ProviderType = {
  children?: ReactNode;
};
type ContextType = {
  admin: AdminType;
  actions: ActionType;
  dispatch: Dispatch<any>;
};
const initialState: AdminType = {
  props: {
    done: [],
    component: [],
    current: "",
  },
  nameComponent: "",
  content: [],
};

const AdminContext = createContext<ContextType>({
  admin: initialState,
  actions: {
    updateProps: actionList.updateProps,
    updateNameComponent: actionList.updateNameComponent,
    updateContent: actionList.updateNameComponent,
    addContent: actionList.addContent,
  },
  dispatch: () => "",
});

const AdminProvider = ({ children }: ProviderType) => {
  //
  const [admin, dispatch] = useReducer(AdminReducer, initialState);
  //
  return (
    <AdminContext.Provider
      value={{
        admin,
        actions,
        dispatch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
