import * as a from "../actions/actionTypes";
import initialState from "./initialState";

export default function user(state = initialState.user, action) {
  switch (action.type) {
    case a.CLEAR_ALL_USER_MSGS:
      return {
        ...state,
        errorCode: "",
        errorMsg: ""
      };
    case a.USER_LOGIN_SUCCESS:
      return {
        ...action.userDetails
      };
    case a.USER_LOGIN_ERROR:
      return {
        ...state,
        loggedIn: false,
        errorCode: action.errorObj.errorCode,
        errorMsg: action.errorObj.error
      };
    case a.USER_LOGOUT_SUCCESS:
      return initialState.user;
    case a.USER_LOGOUT_ERROR:
      return {
        ...state,
        errorCode: action.errorObj.errorCode,
        errorMsg: action.errorObj.error
      };
    default:
      return state;
  }
}
