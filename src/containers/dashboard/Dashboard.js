import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cacheActions from "../../actions/cacheActions";
import * as postActions from "../../actions/postActions";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import "../../assets/css/styles.css";
import Header from "../common/Header";
import TopLinks from "../../components/common/TopLinks";
import PostListRows from "../../components/posts/PostListRows";
import SuccessMsg from "../../components/common/SuccessMsg";
import ErrorMsg from "../../components/common/ErrorMsg";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      online: navigator.onLine,
      chart: {
        areaChart: {
          options: {
            xaxis: {
              categories: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
              ]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 25, 50, 49, 21, 70, 51]
            },
            {
              name: "series-2",
              data: [23, 12, 54, 61, 32, 56, 81, 19]
            }
          ]
        },
        barCharts: {
          options: {
            chart: {
              id: "apexchart-example"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        },
        columnChart: {
          options: {
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
              ]
            }
          },
          series: [
            {
              data: [30, 40, 25, 50, 49, 21, 70, 51]
            }
          ]
        },
        donutChart: {
          options: {
            labels: ["A", "B", "C", "D", "E"]
          },
          series: [44, 55, 41, 17, 15]
        },
        lineChart: {
          options: {
            stroke: {
              curve: "smooth"
            },
            markers: {
              size: 0
            },
            xaxis: {
              categories: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
              ]
            }
          },
          series: [
            {
              data: [30, 40, 25, 50, 49, 21, 70, 51]
            }
          ]
        },
        pieChart: {
          options: {
            labels: ["A", "B", "C", "D", "E"]
          },
          series: [44, 55, 41, 17, 15]
        },
        radialBar: {
          options: {
            labels: ["RadialBar"],
            plotOptions: {
              radialBar: {
                hollow: {
                  size: "70%"
                }
              }
            }
          },
          series: [68]
        }
      }
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
    const { chart } = this.state;
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
                      Dashboard
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
                    <td align="center" colSpan="2">
                      <table
                        border="0"
                        align="center"
                        cellPadding="2"
                        cellSpacing="2"
                        width="60%"
                      >
                        <tbody>
                          <tr>
                            <td align="center" className="chartTd">
                              <div className="bar">
                                <Chart
                                  options={chart.barCharts.options}
                                  series={chart.barCharts.series}
                                  type="bar"
                                  width={700}
                                  height={400}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                          <tr>
                            <td align="center" className="chartTd">
                              <div className="area">
                                <Chart
                                  options={chart.areaChart.options}
                                  series={chart.areaChart.series}
                                  type="area"
                                  width={700}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                          <tr>
                            <td align="center" className="chartTd">
                              <div className="line">
                                <Chart
                                  options={chart.lineChart.options}
                                  series={chart.lineChart.series}
                                  type="line"
                                  width={700}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                          <tr>
                            <td align="center" className="chartTd">
                              <div className="donut">
                                <Chart
                                  options={chart.pieChart.options}
                                  series={chart.pieChart.series}
                                  type="donut"
                                  width="380"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                          <tr>
                            <td align="center" className="chartTd">
                              <div className="radialbar">
                                <Chart
                                  options={chart.radialBar.options}
                                  series={chart.radialBar.series}
                                  type="radialBar"
                                  height="380"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                          <tr>
                            <td align="center" className="chartTd">
                              <div className="column">
                                <Chart
                                  options={chart.columnChart.options}
                                  series={chart.columnChart.series}
                                  type="bar"
                                  width={700}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan="2">&nbsp;</td>
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
)(Dashboard);
