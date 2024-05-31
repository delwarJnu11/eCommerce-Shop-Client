import { actions } from "../actions";

export const initialState = {
  loading: false,
  error: null,
  cart: [],
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
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
    case actions.wishlist.ADD_TO_WISHLIST: {
      localStorage.setItem("wishlist", [
        ...state.wishlist,
        JSON.stringify(action.data),
      ]);
      return {
        ...state,
        wishlist: [...state.wishlist, action.data],
      };
    }
    case actions.wishlist.REMOVE_FROM_WISHLIST: {
      const updatedWishlist = state.wishlist.filter(
        (item) => item._id !== action.id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return {
        ...state,
        wishlist: updatedWishlist,
      };
    }
    default:
      return state;
  }
};
