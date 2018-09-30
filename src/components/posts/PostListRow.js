import React from "react";

const PostListRow = ({ record }) => {
  return (
    <tr key={record.id}>
      <td>
        <table border="0" align="left" cellPadding="1" cellSpacing="0">
          <tbody>
            <tr>
              <td>
                {record.id}
                .&nbsp;
                {record.title}
              </td>
            </tr>
            <tr>
              <td>{record.body}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default PostListRow;
