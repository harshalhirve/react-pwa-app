import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../actions/postActions";
import Header from "../common/Header";
import TopLinks from "../../components/common/TopLinks";
import PostListRows from "../../components/posts/PostListRows";

class PostList extends Component {
  constructor() {
    super();
    this.getPostsList = this.getPostsList.bind(this);
  }

  componentDidMount() {
    this.getPostsList();
  }

  async getPostsList() {
    await this.props.getPostsList();
  }

  render() {
    const { loading, list } = this.props;
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
                  <tr>
                    <td>Post List</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        border="0"
                        align="center"
                        cellPadding="6"
                        cellSpacing="0"
                      >
                        <tbody>
                          <PostListRows loading={loading} postList={list} />
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
)(PostList);
