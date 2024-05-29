import { Context, Dispatch, ReactNode, useReducer } from "react";

type ActionType<T> = {
  type: Constant;
  key: keyof T;
  value: any;
};

type ContextType<T> = {
  custom: T;
  actions: {
    updateData: (key: StateKey<T>, value: any) => ActionType<T>;
  };
  dispatch: Dispatch<ActionType<T>>;
};

type StateKey<T> = keyof T;

type Constant = "UPDATE_DATA" | "UPDATE_DATA_MULTI";

const updateData = <T,>(key: StateKey<T>, value: any): ActionType<T> => {
  return {
    type: "UPDATE_DATA",
    key,
    value,
  };
};

const CustomReducer = <T,>(state: T, action: ActionType<T>) => {
  let newState = { ...state };
  switch (action.type) {
    case "UPDATE_DATA":
      if (!Array.isArray(action.key)) {
        newState[action.key] = action.value;
      }
      return { ...newState };
    default:
      return { ...state };
  }
};

const initialState = <T,>(init: T): ContextType<T> => {
  return {
    custom: init,
    actions: {
      updateData,
    },
    dispatch: (value: ActionType<T>) => "",
  };
};

const useCustomContext = <T,>(
  initialState: T,
  CustomContext: Context<ContextType<T>>
) => {
  const CustomProvider = ({ children }: { children: ReactNode }) => {
    const [custom, dispatch] = useReducer(CustomReducer<T>, initialState);
    return (
      <CustomContext.Provider
        value={{
          custom,
          actions: {
            updateData,
          },
          dispatch,
        }}
      >
        {children}
      </CustomContext.Provider>
    );
  };

  return CustomProvider;
};

export { useCustomContext, initialState };

export type { ContextType };
