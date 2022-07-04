import { UPDATE_PRODUCTS } from "../constants/ActionTypes";

const initialProducts = [];
export const productReducer = (state = initialProducts, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS: {
      return {
        products: [...action.products],
      };
    }
    default:
      return state;
  }
};
