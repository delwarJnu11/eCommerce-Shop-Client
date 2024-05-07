import { actions } from "../actions";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: {},
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case actions.product.PRODUCT_DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };

    case actions.product.PRODUCT_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        error: null,
        product: { ...action.data },
      };

    case actions.product.PRODUCT_DATA_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.product.ALL_PRODUCTS_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        error: null,
        products: [...state.products, action.data],
      };

    default:
      return state;
  }
};
