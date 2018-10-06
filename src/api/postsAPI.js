import * as cf from "../commonFunctions";

class PostsAPI {
  static async getPostsList() {
    try {
      const response = await cf.getAxios("posts").get("/posts");
      return response.data;
    } catch (errObj) {
      throw cf.throwError(errObj);
    }
  }

  static async saveNewPost(paramObj) {
    try {
      await cf.getAxios("posts").post(`/posts/`, JSON.stringify(paramObj));
      return {
        sucMsg: "New Post saved successfully."
      };
    } catch (errObj) {
      throw cf.throwError(errObj);
    }
  }

  static async getPostDetails(id) {
    try {
      const response = await cf.getAxios("posts").get(`/posts/${id}`);
      return response.data;
    } catch (errObj) {
      throw cf.throwError(errObj);
    }
  }

  static async updatePost(paramObj) {
    try {
      await cf.getAxios("posts").patch(`/posts/${paramObj.id}`, paramObj.data);
      return {
        sucMsg: "Post details updated successfully."
      };
    } catch (errObj) {
      throw cf.throwError(errObj);
    }
  }

  static async deletePost(id) {
    try {
      await cf.getAxios("posts").delete(`/posts/${id}`);
      return {
        sucMsg: "Post deleted successfully."
      };
    } catch (errObj) {
      throw cf.throwError(errObj);
    }
  }
}

export default PostsAPI;
