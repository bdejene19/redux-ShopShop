import { combineReducers, legacy_createStore } from "redux";
import { cartReducer, openCartReducer } from "./reducers/cartReducers";
const rootReducer = combineReducers({
  cart: cartReducer,
  cartOpen: openCartReducer,
});

export const store = legacy_createStore(rootReducer);
