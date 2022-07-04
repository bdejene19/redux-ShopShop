import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART,
} from "../constants/ActionTypes";

const initialCartItems = [];
export const cartReducer = (state = initialCartItems, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        cartItems: [
          ...state,
          {
            id: state.cartItems.length,
            item: action.payload,
          },
        ],
      };
    }
    case CLEAR_CART: {
      return {
        cartItems: [],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        cartItems: [...state.filter((item) => item.id !== action.payload)],
      };
    }
    default:
      return state;
  }
};

const initialCartStatus = false;
export const openCartReducer = (state = initialCartStatus, action) => {
  switch (action.type) {
    case TOGGLE_CART: {
      return !state;
    }
    default: {
      return state;
    }
  }
};
