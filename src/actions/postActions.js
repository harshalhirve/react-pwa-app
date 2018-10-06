import * as a from "./actionTypes";
import { loadingStart, loadingStop } from "./loadingActions";
import PostsAPI from "../api/postsAPI";

export function clearAllPostMsgs() {
  return { type: a.CLEAR_ALL_POST_MSGS };
}

export function clearPostErrMsgs() {
  return { type: a.CLEAR_POST_ERR_MSGS };
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

export function saveNewPostSuccess(sucMsg) {
  return { type: a.SAVE_NEW_POST_SUCCESS, sucMsg };
}

export function saveNewPostError(errorObj) {
  return { type: a.SAVE_NEW_POST_ERROR, errorObj };
}

export function saveNewPost(paramObj) {
  return async dispatch => {
    try {
      dispatch(loadingStart());
      const sucMsg = await PostsAPI.saveNewPost(paramObj);
      dispatch(loadingStop());
      dispatch(saveNewPostSuccess(sucMsg));
    } catch (errorObj) {
      dispatch(loadingStop());
      dispatch(saveNewPostError(errorObj));
    }
  };
}

export function getPostDetailsSuccess(postDetails) {
  return { type: a.GET_POST_DETAILS_SUCCESS, postDetails };
}

export function getPostDetailsError(errorObj) {
  return { type: a.GET_POST_DETAILS_ERROR, errorObj };
}

export function getPostDetails(id) {
  return async dispatch => {
    try {
      dispatch(loadingStart());
      const postDetails = await PostsAPI.getPostDetails(id);
      dispatch(loadingStop());
      dispatch(getPostDetailsSuccess(postDetails));
    } catch (errorObj) {
      dispatch(loadingStop());
      dispatch(getPostDetailsError(errorObj));
    }
  };
}

export function updatePostSuccess(sucMsg) {
  return { type: a.UPDATE_POST_DETAILS_SUCCESS, sucMsg };
}

export function updatePostError(errorObj) {
  return { type: a.UPDATE_POST_DETAILS_ERROR, errorObj };
}

export function updatePost(paramObj) {
  return async dispatch => {
    try {
      dispatch(loadingStart());
      const sucMsg = await PostsAPI.updatePost(paramObj);
      dispatch(loadingStop());
      dispatch(updatePostSuccess(sucMsg));
    } catch (errorObj) {
      dispatch(loadingStop());
      dispatch(updatePostError(errorObj));
    }
  };
}

export function deletePostSuccess(sucMsg) {
  return { type: a.DELETE_POST_SUCCESS, sucMsg };
}

export function deletePostError(errorObj) {
  return { type: a.DELETE_POST_ERROR, errorObj };
}

export function deletePost(paramObj) {
  return async dispatch => {
    try {
      dispatch(loadingStart());
      const sucMsg = await PostsAPI.deletePost(paramObj);
      dispatch(loadingStop());
      dispatch(deletePostSuccess(sucMsg));
    } catch (errorObj) {
      dispatch(loadingStop());
      dispatch(deletePostError(errorObj));
    }
  };
}
