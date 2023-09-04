import React, { createContext, useReducer } from "react";
import { UserToken } from "./Types/UserAccessTokenType";
import { UserSignUpMessage } from "./Types/UserSignUpMessage";
import { Cart, DeliveryAddress, OrderItems } from "./Types/CartItem";

type AppState = {
  mode: string;
  userAccessToken?: UserToken;
  userRegistered?: UserSignUpMessage;
  cart: Cart;
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
  cart: {
    orderItems: [],
    deliveryAddress: localStorage.getItem("deliveryAddress")
      ? JSON.parse(localStorage.getItem("deliveryAddress")!)
      : {},
    itemPrice: 0,
    deliveryPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "USER_LOGIN"; payload: UserToken }
  | { type: "USER_REGISTERED"; payload: UserSignUpMessage }
  | { type: "CART_ADD_ITEM"; payload: OrderItems }
  | {
      type: "CART_REMOVE_ITEM";
      payload: OrderItems;
    }
  | { type: "SAVE_DELIVERY_ADDRESS"; payload: DeliveryAddress }
  | { type: "USER_LOGOUT" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
    case "USER_LOGIN":
      return { ...state, userAccessToken: action.payload };
    case "USER_LOGOUT":
      return {
        mode: "",
        cart: {
          orderItems: [],
          deliveryAddress: {
            fullname: "",
            address: "",
            city: "",
            postalcode: "",
            country: ""
          },
          itemPrice: 0,
          deliveryPrice: 0,
          totalPrice: 0
        }
      };

    case "USER_REGISTERED":
      return { ...state, userRegistered: action.payload };

    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.orderItems.find(
        (item: OrderItems) => item.name === newItem.name
      );
      const cartItems = existItem
        ? state.cart.orderItems.map((item: OrderItems) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.orderItems, newItem];
      localStorage.setItem("orderItems", JSON.stringify(newItem));

      // console.log("cartItems", cartItems);

      return { ...state, cart: { ...state.cart, orderItems: cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.orderItems.filter(
        (item: OrderItems) => item.name !== action.payload.name
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, orderItems: cartItems } };
    }

    case "SAVE_DELIVERY_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          deliveryAddress: action.payload,
        },
      };

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
