import { actions } from "../actions";

export const initialState = {
  loading: false,
  error: null,
  product: {},
  products: [],
  categories: [],
  productsByCategory: {},
  searchProducts: [],
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
        products: action.data,
      };
    case actions.product.ALL_CATEGORIES_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.data,
      };
    case actions.product.PRODUCTS_BY_CATEGORY_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        error: null,
        productsByCategory: {
          ...state.productsByCategory,
          [action.category]: action.data,
        },
      };
    case actions.product.SEARCH_PRODUCTS_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        error: null,
        searchProducts: action.data,
      };

    default:
      return state;
  }
};
