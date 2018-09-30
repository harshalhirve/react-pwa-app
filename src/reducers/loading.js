import * as a from "../actions/actionTypes";
import initialState from "./initialState";

export default function loading(state = initialState.loading, action) {
  switch (action.type) {
    case a.LOADING_START:
      return true;
    case a.LOADING_STOP:
      return false;
    case a.USER_LOGOUT_SUCCESS:
      return initialState.loading;
    default:
      return state;
  }
}
