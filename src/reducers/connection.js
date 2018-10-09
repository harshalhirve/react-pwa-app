import * as a from "../actions/actionTypes";
import initialState from "./initialState";

export default function connection(state = initialState.connection, action) {
  switch (action.type) {
    case a.CONNECTION_ON:
      return true;
    case a.CONNECTION_OFF:
      return false;
    default:
      return null;
  }
}
