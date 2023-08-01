import React, { createContext, useReducer } from "react";
import { UserToken } from "./Types/UserAccessTokenType";
import { UserSignUpMessage } from "./Types/UserSignUpMessage";

type AppState = {
  mode: string;
  userAccessToken?: UserToken;
  userRegistered?: UserSignUpMessage;
};



const initialState: AppState = {
  userRegistered: localStorage.getItem("userRegistered")
    ? JSON.parse(localStorage.getItem("userRegistered")!)
    : null,
  userAccessToken: localStorage.getItem("userAccessToken")
    ? JSON.parse(localStorage.getItem("userAccessToken")!)
    : null,
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

type Action = { type: "SWITCH_MODE" } | {type: "USER_LOGIN" ; payload: UserToken} | {type: "USER_REGISTERED" ; payload: UserSignUpMessage}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
      case "USER_LOGIN": 
      return {...state, userAccessToken: action.payload};
      case "USER_REGISTERED":
      return {...state, userRegistered: action.payload};
    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );
  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
