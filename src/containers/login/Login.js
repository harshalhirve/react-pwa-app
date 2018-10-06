import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import * as userActions from "../../actions/userActions";
import styles from "../../../assets/css/styles.css";
import image1 from "../../../assets/images/img1.jpg";

class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "hh@hh.com",
      emailErr: false,
      password: "password1234",
      passwordErr: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      ...(name === "email" && { emailErr: false }),
      ...(name === "password" && { passwordErr: false })
    });
  }

  async validateForm() {
    return new Promise(resolve => {
      this.setState(
        {
          emailErr: this.state.email.trim() === "" ? true : false,
          passwordErr: this.state.password.trim() === "" ? true : false
        },
        () => {
          this.state.emailErr || this.state.passwordErr
            ? resolve(false)
            : resolve(true);
        }
      );
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (await this.validateForm()) {
      await this.props.validateLogin({
        email: this.state.email,
        password: this.state.password
      });
    }
  }
  
  render() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/posts"
          }}
        />
      );
    } else {
      let loadingTr = "";
      if (this.props.loading) {
        loadingTr = (
          <tr>
            <td colSpan="2" align="center">
              ...Processing
            </td>
          </tr>
        );
      }
      return (
        <form name="form1" onSubmit={this.handleSubmit}>
          <table border="0" align="center" cellPadding="2" cellSpacing="2">
            <tbody>
              <tr>
                <td colSpan="2" align="center">
                  <img src={image1} width="100" />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    maxLength="200"
                    className={
                      this.state.emailErr ? styles.textBoxErr : styles.textBox
                    }
                    onChange={this.handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    maxLength="20"
                    className={
                      this.state.emailErr ? styles.textBoxErr : styles.textBox
                    }
                    onChange={this.handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  <input
                    type="submit"
                    disabled={this.props.loading ? true : false}
                    value={this.props.loading ? "Processing" : "Login"}
                    className={styles.button}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      );
    }
  }
}

function mapStateToProps(state) {
  //console.log("user state = ", state.user);
  return {
    ...state.user,
    loading: state.loading
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
)(HomeComponent);
