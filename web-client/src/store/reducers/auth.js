import {
  AUTH_REQUEST_START,
  AUTH_REQUEST_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from "../actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST_START:
      return { ...state, error: null, loading: true };
    case AUTH_REQUEST_FAIL:
      return { ...state, error: action.error, loading: false };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      return { ...state, error: null, token: null, loading: false };
    default:
      return state;
  }
};

export default authReducer;
