import * as a from "../actions/actionTypes";
import initialState from "./initialState";
import pretty from "prettysize";

export default function cache(state = initialState.cache, action) {
  switch (action.type) {
    case a.CACHE_WARNING_ON:
      return {
        ...state,
        warning: !action.estimate ? false : true,
        message: !action.estimate
          ? ""
          : `Cache limit exceeded! You are using ${pretty(
              action.estimate.usage
            )} out of ${pretty(action.estimate.quota)} of cache.`
      };
    case a.CACHE_WARNING_OFF:
      return initialState.cache;
    default:
      return state;
  }
}
