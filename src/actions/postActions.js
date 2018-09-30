import * as a from "./actionTypes";
import { loadingStart, loadingStop } from "./loadingActions";
import PostsAPI from "../api/postsAPI";

export function clearAllPostMsgs() {
  return { type: a.CLEAR_ALL_POST_MSGS };
}
export function getPostListSuccess(list) {
  return { type: a.GET_POST_LIST_SUCCESS, list };
}

export function getPostListError(errorObj) {
  return { type: a.GET_POST_LIST_ERROR, errorObj };
}

export function getPostsList() {
  return async dispatch => {
    try {
      dispatch(loadingStart());
      const list = await PostsAPI.getPostsList();
      dispatch(loadingStop());
      dispatch(getPostListSuccess(list));
    } catch (errorObj) {
      dispatch(loadingStop());
      dispatch(getPostListError(errorObj));
    }
  };
}
