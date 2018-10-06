import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect, Prompt } from "react-router-dom";
import * as postActions from "../../actions/postActions";
import styles from "../../../assets/css/styles.css";
import Header from "../common/Header";
import TopLinks from "../../components/common/TopLinks";
import ErrorMsg from "../../components/common/ErrorMsg";

class PostEdit extends Component {
  constructor() {
    super();
    this.state = {
      postId: "",
      postTitle: "",
      postTitleErr: false,
      postBody: "",
      postBodyErr: false,
      isBlocking: false
    };
    this.getPostDetails = this.getPostDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getPostDetails();
  }

  componentWillUnmount() {
    this.props.clearPostErrMsgs();
  }

  async getPostDetails() {
    const {
      match: { params }
    } = this.props;
    await this.props.getPostDetails(params.id);
    this.setState({
      postId: params.id,
      postTitle: this.props.details.title,
      postBody: this.props.details.body
    });
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      isBlocking: true,
      ...(name === "postTitle" && { postTitleErr: false }),
      ...(name === "postBody" && { postBodyErr: false })
    });
  }

  async validateForm() {
    return new Promise(resolve => {
      this.setState(
        {
          postTitleErr: this.state.postTitle.trim() === "" ? true : false,
          postBodyErr: this.state.postBody.trim() === "" ? true : false
        },
        () => {
          this.state.postTitleErr || this.state.postBodyErr
            ? resolve(false)
            : resolve(true);
        }
      );
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.clearPostErrMsgs();
    if (await this.validateForm()) {
      await this.props.updatePost({
        id: this.state.postId,
        data: {
          title: this.state.postTitle,
          body: this.state.postBody
        }
      });
    }
  }

  render() {
    const { loading, details, sucMsg, errorMsg } = this.props;
    if (sucMsg !== "") {
      return (
        <Redirect
          to={{
            pathname: "/posts"
          }}
        />
      );
    } else {
      return (
        <table
          border="0"
          align="center"
          cellPadding="0"
          cellSpacing="0"
          width="100%"
        >
          <tbody>
            <Header />
            <TopLinks />
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  border="0"
                  align="center"
                  cellPadding="2"
                  cellSpacing="2"
                >
                  <tbody>
                    <tr>
                      <td className={styles.pageTitle}>Edit Post</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                    {errorMsg !== "" && <ErrorMsg errorMsg={errorMsg} />}
                    <tr>
                      <td>
                        {Object.keys(details).length > 0 && (
                          <form name="form1" onSubmit={this.handleSubmit}>
                            <Prompt
                              when={this.state.isBlocking}
                              message={() => "Leave without saving?"}
                            />
                            <table
                              border="0"
                              align="center"
                              cellPadding="6"
                              cellSpacing="0"
                            >
                              <tbody>
                                <tr>
                                  <td>Title</td>
                                  <td>
                                    <input
                                      type="text"
                                      name="postTitle"
                                      value={this.state.postTitle}
                                      maxLength="500"
                                      className={
                                        this.state.postTitleErr
                                          ? styles.textBoxErr
                                          : styles.textBox
                                      }
                                      size="100"
                                      onChange={this.handleChange}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>Body</td>
                                  <td>
                                    <textarea
                                      name="postBody"
                                      value={this.state.postBody}
                                      maxLength="5000"
                                      className={
                                        this.state.postBodyErr
                                          ? styles.textBoxErr
                                          : styles.textBox
                                      }
                                      rows="5"
                                      cols="101"
                                      onChange={this.handleChange}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan="2" align="center">
                                    <input
                                      type="submit"
                                      value={loading ? "Updating..." : "Update"}
                                      disabled={loading ? true : false}
                                      className={styles.button}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </form>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
}

function mapStateToProps(state) {
  //console.log("posts state = ", state.posts);
  return {
    ...state.posts,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Object.assign({}, postActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEdit);
