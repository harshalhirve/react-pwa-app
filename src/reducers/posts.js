import * as a from "../actions/actionTypes";
import initialState from "./initialState";

export default function posts(state = initialState.posts, action) {
  switch (action.type) {
    case a.CLEAR_ALL_POST_MSGS:
      return {
        ...state,
        sucMsg: "",
        errorCode: "",
        errorMsg: ""
      };
    case a.CLEAR_POST_ERR_MSGS:
      return {
        ...state,
        errorCode: "",
        errorMsg: ""
      };
    case a.GET_POST_LIST_SUCCESS:
      return {
        ...state,
        list: action.list
      };
    case a.GET_POST_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.postDetails
      };
    case a.UPDATE_POST_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.sucMsg,
        details: {}
      };
    case a.SAVE_NEW_POST_SUCCESS:
    case a.DELETE_POST_SUCCESS:
      return {
        ...state,
        ...action.sucMsg
      };
    case a.GET_POST_LIST_ERROR:
    case a.SAVE_NEW_POST_ERROR:
    case a.GET_POST_DETAILS_ERROR:
    case a.UPDATE_POST_DETAILS_ERROR:
    case a.DELETE_POST_ERROR:
      return {
        ...state,
        errorCode: action.errorObj.errorCode,
        errorMsg: action.errorObj.errorMsg
      };
    case a.USER_LOGOUT_SUCCESS:
      return initialState.posts;
    default:
      return state;
  }
}
