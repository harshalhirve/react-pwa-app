import * as a from "../actions/actionTypes";
import initialState from "./initialState";

export default function news(state = initialState.news, action) {
  switch (action.type) {
    case a.GET_NEWS_LIST_SUCCESS:               
    return {
        ...state,
        list: action.list
      };
    case a.GET_NEWS_LIST_ERROR:
      return {
        ...state,
        errorCode: action.errorObj.errorCode,
        errorMsg: action.errorObj.errorMsg
      };
    case a.USER_LOGOUT_SUCCESS:
      return initialState.news;
    default:
      return state;
  }
}
