import { actions } from "../actions";

export const initialState = {
  loading: false,
  error: null,
  cart: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case actions.cart.CART_DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.cart.CART_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        cart: action.data,
      };
    case actions.cart.CART_DATA_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
