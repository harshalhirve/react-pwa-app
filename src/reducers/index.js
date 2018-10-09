import { combineReducers } from "redux";
import connection from "./connection";
import loading from "./loading";
import user from "./user";
import posts from "./posts";

const rootReducer = combineReducers({
  connection,
  loading,
  user,
  posts
});

export default rootReducer;
