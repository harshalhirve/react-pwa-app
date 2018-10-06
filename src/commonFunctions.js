import axios from "axios";
import c from "./constants";

export function getAxios(type) {
  return axios.create({
    baseURL: type === "user" ? c.USER_API_BASE_URL : c.POST_API_BASE_URL,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

export function getUserSession() {
  try {
    const userObj = JSON.parse(window.localStorage.getItem(c.USER_SESSION));
    if (userObj) {
      return userObj;
    } else return null;
  } catch (errObj) {
    return null;
  }
}

export function getParsedErrObj(error) {
  return JSON.parse(JSON.stringify(error));
}

export function throwError(errObj) {
  const parsedErrObj = this.getParsedErrObj(errObj);
  return {
    errorCode: parsedErrObj.response.status
      ? parsedErrObj.response.status
      : null,
    errorMsg: "An error occurred. Please retry."
  };
}
