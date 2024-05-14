import { actions } from "../actions";
import { api } from "../api";
import { useCart } from "./useCart";

const useFetchCartProducts = () => {
  const { state, dispatch } = useCart();

  const fetchCartProducts = async () => {
    dispatch({ type: actions.cart.CART_DATA_FETCHING });

    try {
      const res = await api.get("/cart-products", { withCredentials: true });

      if (res.data.success) {
        dispatch({
          type: actions.cart.CART_DATA_FETCHED,
          data: res.data.cart,
        });
      } else {
        dispatch({
          type: actions.cart.CART_DATA_FETCHING_ERROR,
          error: res.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.cart.CART_DATA_FETCHING_ERROR,
        error: "An error occurred while fetching cart products",
      });
    }
  };

  return { fetchCartProducts, ...state };
};

export default useFetchCartProducts;
