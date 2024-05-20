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
    case actions.cart.CLEAR_CART_DATA:
      return {
        ...state,
        cart: [],
      };
    case actions.cart.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.data],
      };
    case actions.cart.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    case actions.cart.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.itemId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};
