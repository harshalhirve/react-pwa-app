import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cacheActions from "../../actions/cacheActions";
import * as newsActions from "../../actions/newsActions";
import "../../assets/css/styles.css";
import Header from "../common/Header";
import TopLinks from "../../components/common/TopLinks";
import NewsListRows from "../../components/news/NewsListRows";
import SuccessMsg from "../../components/common/SuccessMsg";
import ErrorMsg from "../../components/common/ErrorMsg";

class NewsList extends Component {
  constructor() {
    super();
    this.state = {
      online: navigator.onLine
    };
    this.getNewsList = this.getNewsList.bind(this);
  }

  componentDidMount() {
    this.props.checkQuota();
    this.getNewsList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.connection === false && this.props.connection === true) {
      this.getNewsList();
    }
  }

  async getNewsList() {
    await this.props.getNewsList();
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
                className="dataTable"
              >
                <tbody>
                  {!connection && (
                    <tr>
                      <td align="center" colSpan="2" className="offlineMsg">
                        You are offline! Please check your connection.
                      </td>
                    </tr>
                  )}
                  {cache.warning && (
                    <tr>
                      <td align="center" colSpan="2" className="offlineMsg">
                        {cache.message}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="pageTitle" align="left" width="50%">
                      News List
                    </td>
                    <td align="right" width="50%">
                      &nbsp;
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
                          <NewsListRows loading={loading} newsList={list} />
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
  return {
    ...state.news,
    cache: state.cache,
    loading: state.loading,
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      Object.assign({}, newsActions, cacheActions),
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsList);
