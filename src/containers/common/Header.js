import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/userActions";

class Header extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  async logout() {
    await this.props.logout();
  }

  render() {
    return (
      <tr>
        <td align="right">
          <table border="0" align="right" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  Welcome! {this.props.firstName}
                  &nbsp;
                  {this.props.lastName}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      this.logout();
                    }}
                  >
                    Log out
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Object.assign({}, userActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
