import { combineReducers, legacy_createStore } from "redux";
import { cartReducer, openCartReducer } from "./reducers/cartReducers";
import {
  categoryUpdate,
  categoryNameUpdate,
} from "./reducers/categoriesReducers";
import { productReducer } from "./reducers/productsReducers";
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  cartOpen: openCartReducer,
  categories: categoryUpdate,
  currentCategory: categoryNameUpdate,
});

export const store = legacy_createStore(rootReducer);
