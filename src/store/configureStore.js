import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

export default function configureStore() {
  let store = "";
  if (process.env.NODE_ENV === "development") {
    const cEnhancers =
      typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Extensions
          })
        : compose;
    const enhancers = cEnhancers(applyMiddleware(thunk));
    store = createStore(rootReducer, enhancers);
  } else if (process.env.NODE_ENV === "production") {
    const enhancers = applyMiddleware(thunk);
    store = createStore(rootReducer, enhancers);
  }
  return store;
}
