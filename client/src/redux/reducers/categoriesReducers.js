import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../constants/ActionTypes";

const initialCategories = [];
const initialCategory = "";

export const categoryUpdate = (state = initialCategories, action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES: {
      return {
        categories: [...action.categories],
      };
    }
    default:
      return state;
  }
};

export const categoryNameUpdate = (state = initialCategory, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_CATEGORY: {
      return {
        currentCategory: action.currentCategory,
      };
    }
    default:
      return state;
  }
};
