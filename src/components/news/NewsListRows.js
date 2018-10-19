import React from "react";
import NewsListRow from "./NewsListRow";

const NewsListRows = ({ loading, newsList }) => {
  if (loading) {
    return (
      <tr>
        <td>Fetching News...</td>
      </tr>
    );
  } else if (newsList.length === 0) {
    return (
      <tr>
        <td>No News to display.</td>
      </tr>
    );
  } else {
    return newsList.map((record, index) => {
      return <NewsListRow record={record} index={index} />;
    });
  }
};

export default NewsListRows;
