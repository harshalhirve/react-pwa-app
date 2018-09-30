import * as cf from "../commonFunctions";
import c from "../constants";

class PostsAPI {
  static async getPostsList() {
    try {
      const response = await cf.getAxios("posts").get("/posts");
      return response.data;
    } catch (errObj) {
      throw cf.throwError(errObj);
    }
  }
}

export default PostsAPI;
