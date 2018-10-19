import React from "react";
import moment from "moment";

const NewsListRow = ({ record, index }) => {
  return (
    <tr key={index}>
      <td>
        <table border="0" align="left" cellPadding="5" cellSpacing="1">
          <tbody>
            <tr>
              <td valign="top" align="center">
                <a href={record.url} target="_blank">
                  <img src={record.urlToImage} width="100" alt="" />
                </a>
              </td>
              <td valign="top">
                <table border="0" align="left" cellPadding="1" cellSpacing="1">
                  <tbody>
                    <tr>
                      <td>
                        <a href={record.url} target="_blank">
                          {record.title}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>{record.description}</td>
                    </tr>
                    <tr>
                      <td className="newsDate">
                        {moment(record.publishedAt).format(
                          "dddd, MMMM Do YYYY, h:mm a"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default NewsListRow;
