import React from "react";
import PostListRow from "./PostListRow";

const PostListRows = ({ loading, postList, clearAllPostMsgs, deletePost }) => {
  if (loading) {
    return (
      <tr>
        <td>Fetching Posts...</td>
      </tr>
    );
  } else if (postList.length === 0) {
    return (
      <tr>
        <td>No Posts to display.</td>
      </tr>
    );
  } else {
    return postList.map(record => {
      return (
        <PostListRow
          record={record}
          clearAllPostMsgs={clearAllPostMsgs}
          deletePost={deletePost}
        />
      );
    });
  }
};

export default PostListRows;
