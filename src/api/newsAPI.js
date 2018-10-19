import axios from "axios";
import * as cf from "../commonFunctions";
import * as k from "../keys";
import c from "../constants";

class newsAPI {
  static async getNewsList() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(c.NEWS_API_BASE_URL + k.NEWS_API_KEY)
        .then(function(response) {
          resolve(response.data.articles);
        })
        .catch(function(error) {
          reject(cf.throwError(error));
        });
    });
  }
}

export default newsAPI;
