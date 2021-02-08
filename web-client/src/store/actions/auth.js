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

const loginSuccess = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("expirationDate", data.expirationDate);

  return {
    type: LOGIN_SUCCESS,
    token: data.token,
  };
};

const logoutSuccess = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");

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
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        dispatch(loginSuccess({ token: res.data.token, expirationDate }));
        dispatch(checkAuthTimeout(res.data.expiresIn));

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
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (!token || expirationDate < new Date()) {
      dispatch(logoutSuccess());
      return;
    }

    dispatch(loginSuccess({ token, expirationDate }));
    dispatch(
      checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), +expirationTime * 1000);
  };
};
