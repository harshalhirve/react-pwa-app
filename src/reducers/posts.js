import * as a from "../actions/actionTypes";
import initialState from "./initialState";

export default function posts(state = initialState.posts, action) {
  switch (action.type) {
    case a.CLEAR_ALL_POST_MSGS:
      return {
        ...state,
        errorCode: null,
        error: ""
      };
    case a.GET_POST_LIST_SUCCESS:
      return {
        ...state,
        list: action.list
      };
    case a.GET_POST_LIST_ERROR:
      return {
        ...state,
        errorCode: action.errorObj.errorCode,
        error: action.errorObj.error
      };
    case a.USER_LOGOUT_SUCCESS:
      return initialState.posts;
    default:
      return state;
  }
}
