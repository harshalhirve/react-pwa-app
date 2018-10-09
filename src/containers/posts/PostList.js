import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../actions/postActions";
import { Link } from "react-router-dom";
import styles from "../../../assets/css/styles.css";
import Header from "../common/Header";
import TopLinks from "../../components/common/TopLinks";
import PostListRows from "../../components/posts/PostListRows";
import SuccessMsg from "../../components/common/SuccessMsg";
import ErrorMsg from "../../components/common/ErrorMsg";

class PostList extends Component {
  constructor() {
    super();
    this.state = {
      online: navigator.onLine
    };
    this.getPostsList = this.getPostsList.bind(this);
    this.clearAllPostMsgs = this.clearAllPostMsgs.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  clearAllPostMsgs() {
    this.props.clearAllPostMsgs();
  }

  async getPostsList() {
    await this.props.getPostsList();
  }

  async deletePost(id) {
    this.clearAllPostMsgs();
    if (this.props.connection) {
      await this.props.deletePost(id);
    }
  }

  render() {
    const { loading, list, sucMsg, errorMsg, connection } = this.props;

    console.log("post list connection=", connection);

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
              <table border="0" align="center" cellPadding="2" cellSpacing="2">
                <tbody>
                  {!connection && (
                    <>
                      <tr>
                        <td
                          align="center"
                          colSpan="2"
                          className={styles.offlineMsg}
                        >
                          You are offline! Please check your connection.
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td className={styles.pageTitle} align="left">
                      Post List
                    </td>
                    <td align="right">
                      <Link
                        to="/post/addnew"
                        onClick={() => {
                          this.clearAllPostMsgs();
                        }}
                      >
                        Add New
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">&nbsp;</td>
                  </tr>
                  {sucMsg !== "" && <SuccessMsg sucMsg={sucMsg} />}
                  {errorMsg !== "" && <ErrorMsg errorMsg={errorMsg} />}
                  <tr>
                    <td colSpan="2">
                      <table
                        border="0"
                        align="center"
                        cellPadding="6"
                        cellSpacing="0"
                      >
                        <tbody>
                          <PostListRows
                            loading={loading}
                            postList={list}
                            clearAllPostMsgs={this.clearAllPostMsgs}
                            deletePost={this.deletePost}
                          />
                        </tbody>
                      </table>
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

function mapStateToProps(state) {
  //console.log("posts state = ", state.posts);
  return {
    ...state.posts,
    loading: state.loading,
    connection: state.connection
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
)(PostList);
