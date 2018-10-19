import * as a from "./actionTypes";
import { loadingStart, loadingStop } from "./loadingActions";
import NewsAPI from "../api/newsAPI";

export function getNewsListSuccess(list) {
  return { type: a.GET_NEWS_LIST_SUCCESS, list };
}

export function getNewsListError(errorObj) {
  return { type: a.GET_NEWS_LIST_ERROR, errorObj };
}

export function getNewsList() {
  return async dispatch => {
    try {
      dispatch(loadingStart());
      const list = await NewsAPI.getNewsList();     
      dispatch(loadingStop());
      dispatch(getNewsListSuccess(list));
    } catch (errorObj) {
      dispatch(loadingStop());
      dispatch(getNewsListError(errorObj));
    }
  };
}
