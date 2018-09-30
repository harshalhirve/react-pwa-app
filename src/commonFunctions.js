import axios from "axios";
import c from "./constants";

export function getAxios(type) {
  return axios.create({
    baseURL: type === "user" ? c.USER_API_BASE_URL : c.POST_API_BASE_URL,
    headers: {
      "Content-Type": "application/json"
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
    error: parsedErrObj.response.data.error
      ? parsedErrObj.response.data.error
      : ""
  };
}
