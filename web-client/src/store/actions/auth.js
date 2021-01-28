import httpProvider from "../../common/httpProvider";
import {
  AUTH_REQUEST_FAIL,
  AUTH_REQUEST_START,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_HIDE_MESSAGE,
} from "../actionTypes";

const authRequestStart = () => {
  return {
    type: AUTH_REQUEST_START,
  };
};

const authRequestFail = (error) => {
  return {
    type: AUTH_REQUEST_FAIL,
    error,
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const authHideMessage = () => {
  return {
    type: AUTH_HIDE_MESSAGE,
  };
};

export const register = (username, password, successCallback = () => {}) => {
  return (dispatch) => {
    dispatch(authRequestStart());

    const authData = { username, password };

    httpProvider
      .post("register", authData)
      .then((res) => {
        dispatch(registerSuccess());
        successCallback();
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authRequestFail(error.response.data));
      });
  };
};

export const login = (username, password, successCallback = () => {}) => {
  return (dispatch) => {
    dispatch(authRequestStart());

    const authData = { username, password };

    httpProvider
      .post("login", authData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(loginSuccess(res.data.token));
        successCallback();
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authRequestFail(error.response.data));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(authRequestStart());

    httpProvider
      .post("logout")
      .then((res) => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authRequestFail(error.response.data));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
      return;
    }

    dispatch(loginSuccess(token));
  };
};
