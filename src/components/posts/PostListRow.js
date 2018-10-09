import React from "react";
import { Link } from "react-router-dom";

const PostListRow = ({ record, clearAllPostMsgs, deletePost }) => {
  return (
    <tr key={record.id}>
      <td>
        <table border="0" align="left" cellPadding="1" cellSpacing="0">
          <tbody>
            <tr>
              <td>
                <b>({record.id})</b>
                &nbsp;
                {record.title}
              </td>
            </tr>
            <tr>
              <td>{record.body}</td>
            </tr>
            <tr>
              <td>
                <Link to={`/edit/${record.id}`} onClick={clearAllPostMsgs}>
                  Edit
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a
                  href="#"
                  onClick={() => {
                    deletePost(record.id);
                  }}
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default PostListRow;
