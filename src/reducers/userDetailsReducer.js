import { actions } from "../actions";

export const initailState = {
  data: {},
  users: [],
  loading: true,
  error: null,
};

export const userDetailsReducer = (state, action) => {
  switch (action.type) {
    case actions.user.USER_DATA_FETCHING:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.user.USER_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case actions.user.USER_DATA_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.user.USER_LOGGED_OUT:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
      };
    case actions.user.ALL_USER_DATA_FETCHED:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.data,
      };

    default:
      return state;
  }
};
