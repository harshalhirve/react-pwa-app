import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ErrorHandler from "./common/ErrorHandler";
import NotFoundComponent from "./notfound/NotFoundComponent";
import PrivateRoute from "../components/hoc/PrivateRoute";
import * as loadables from "./lodables";

class RootComponent extends Component {
  render() {
    const { loggedIn, loading } = this.props;
    return (
      <table
        border="0"
        align="center"
        cellPadding="0"
        cellSpacing="0"
        width="90%"
      >
        <tbody>
          <tr>
            <td>
              <ErrorHandler>
                <Switch>
                  <Route exact path="/" component={loadables.Login} />
                  <PrivateRoute
                    authed={loggedIn}
                    path="/posts"
                    component={loadables.PostList}
                  />
                  <PrivateRoute
                    authed={loggedIn}
                    path="/post/addnew"
                    component={loadables.PostAddNew}
                  />
                  <PrivateRoute
                    authed={loggedIn}
                    path="/post/edit/:id"
                    component={loadables.PostEdit}
                  />
                  <Route path="**" component={NotFoundComponent} />
                </Switch>
              </ErrorHandler>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(RootComponent);
