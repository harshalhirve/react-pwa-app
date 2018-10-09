import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import pretty from "prettysize";
import configureStore from "./store/configureStore";
import RootComponent from "./components/RootComponent";
import { validateLoginSuccess } from "./actions/userActions";
import * as cf from "./commonFunctions";
import "../assets/css/gstyles.css";

const store = configureStore();

const savedUser = cf.getUserSession();
if (savedUser) {
  store.dispatch(
    validateLoginSuccess({
      loggedIn: true,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      token: savedUser.token
    })
  );
}

if ("storage" in navigator && "estimate" in navigator.storage) {
  navigator.storage.estimate().then(estimate => {
    //console.log("usage = " + pretty(estimate.usage));
    //console.log("quota = " + pretty(estimate.quota));
  });
}

ReactDOM.render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <Route component={RootComponent} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("container")
);
