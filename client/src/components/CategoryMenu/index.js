import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { connect, useDispatch } from "react-redux";

function CategoryMenu(props) {
  // linked redux to replace useContext global
  // const [state, dispatch] = useStoreContext();
  // const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const dispatch = useDispatch();
  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {props.categories?.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
const mapStateToProps = (state) => {
  let { categories, currentCategory } = state;
  return {
    categories: categories.categories,
    currentCategory: currentCategory,
  };
};

export default connect(mapStateToProps)(CategoryMenu);
// export default CategoryMenu;
