import * as a from "./actionTypes";
import * as cf from "../commonFunctions";

export async function getConnection() {
  const connection = await cf.checkConnection();
  if (connection) {
    return {
      type: a.CONNECTION_ON
    };
  } else {
    return {
      type: a.CONNECTION_OFF
    };
  }
}

export function setConnectionOn() {
  return {
    type: a.CONNECTION_ON
  };
}

export function setConnectionOff() {
  return {
    type: a.CONNECTION_OFF
  };
}
