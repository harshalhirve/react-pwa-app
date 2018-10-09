import { combineReducers } from "redux";
import connection from "./connection";
import cache from "./cache";
import loading from "./loading";
import user from "./user";
import posts from "./posts";

const rootReducer = combineReducers({
  connection,
  cache,
  loading,
  user,
  posts
});

export default rootReducer;
