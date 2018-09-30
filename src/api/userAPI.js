import * as cf from "../commonFunctions";
import c from "../constants";

class UsersAPI {
  static async validateLogin(paramObj) {
    try {
      const response = await cf.getAxios("user").post("/api/login", {
        email: paramObj.email,
        password: paramObj.password
      });
      if (response) {
        if (response.data) {
          if (response.data.token) {
            const userDetails = {
              loggedIn: true,
              firstName: "Harshal",
              lastName: "Hirve",
              email: paramObj.email,
              token: response.data.token
            };
            window.localStorage.setItem(
              c.USER_SESSION,
              JSON.stringify(userDetails)
            );
            return userDetails;
          } else {
            throw "Error in login. Please retry.";
          }
        } else {
          throw "Error in login. Please retry.";
        }
      } else {
        throw "Error in login. Please retry.";
      }
    } catch (errObj) {
      throw cf.throwError(errObj);
    }
  }

  static async logout() {
    try {
      window.localStorage.removeItem(c.USER_SESSION);
    } catch (errObj) {
      throw {
        errorCode: 400,
        error: "Error while logout. Please retry."
      };
    }
  }
}

export default UsersAPI;
