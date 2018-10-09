import * as a from "../actions/actionTypes";
import initialState from "./initialState";

export default function connection(state = initialState.connection, action) {
  switch (action.type) {
    case a.CONNECTION:
      return navigator.onLine;
    default:
      return state;
  }
}
