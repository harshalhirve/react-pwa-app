import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cacheActions from "../../actions/cacheActions";
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

  componentDidMount() {
    this.props.checkQuota();
    this.getPostsList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.connection === false && this.props.connection === true) {
      this.getPostsList();
    }
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
    const { loading, list, sucMsg, errorMsg, connection, cache } = this.props;
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
                width="85%"
              >
                <tbody>
                  {!connection && (
                    <tr>
                      <td
                        align="center"
                        colSpan="2"
                        className={styles.offlineMsg}
                      >
                        You are offline! Please check your connection.
                      </td>
                    </tr>
                  )}
                  {cache.warning && (
                    <tr>
                      <td
                        align="center"
                        colSpan="2"
                        className={styles.offlineMsg}
                      >
                        {cache.message}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className={styles.pageTitle} align="left" width="50%">
                      Post List
                    </td>
                    <td align="right" width="50%">
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
    cache: state.cache,
    loading: state.loading,
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      Object.assign({}, postActions, cacheActions),
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
