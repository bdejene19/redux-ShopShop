import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { connect, useDispatch } from "react-redux";

function ProductList(props) {
  // const [state, dispatch] = useStoreContext();
  // const { currentCategory } = state;

  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!props.currentCategory) {
      return props.products;
    }

    return props.products.filter(
      (product) => product.category._id === props.currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {props.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  let { products, currentCategory } = state;
  return {
    products: products,
    currentCategory: currentCategory,
  };
};

export default connect(mapStateToProps)(ProductList);
// export default ProductList;
