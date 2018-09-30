import * as a from "./actionTypes";

export function loadingStart() {
  return {
    type: a.LOADING_START
  };
}

export function loadingStop() {
  return {
    type: a.LOADING_STOP
  };
}
