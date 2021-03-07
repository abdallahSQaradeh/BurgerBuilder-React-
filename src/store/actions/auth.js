import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authSFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0SZE6PB45q0MW8xbg6WvmlD6q2vXVIB0";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0SZE6PB45q0MW8xbg6WvmlD6q2vXVIB0";
    }
    axios
      .post(url, authData)
      .then((response) => {
        // console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch((err) => {
        //console.log(err);
        dispatch(authSFail(err.response.data.error));
        //* Axios Wrap the response of the error
      });
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logOut());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
