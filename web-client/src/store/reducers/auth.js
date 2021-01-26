import {
  AUTH_REQUEST_START,
  AUTH_REQUEST_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_HIDE_MESSAGE,
} from "../actionTypes";

const initialState = {
  token: null,
  message: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST_START:
      return { ...state, message: null, error: null, loading: true };
    case AUTH_REQUEST_FAIL:
      return { ...state, message: null, error: action.error, loading: false };
    case AUTH_HIDE_MESSAGE:
      return { ...state, message: null, error: null };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: "Registered successfully!",
        error: null,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        message: null,
        error: null,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
