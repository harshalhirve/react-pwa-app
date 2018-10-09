import * as a from "./actionTypes";
import c from "../constants";

function getCacheQuota() {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    return navigator.storage
      .estimate()
      .then(estimate => {
        const maxLimit = (estimate.quota * c.CACHE_QUOTA_PERCENTAGE) / 100;
        //console.log("usage = " + estimate.usage);
        //console.log("quota = " + estimate.quota);
        //console.log("maxLimit = " + maxLimit);
        if (estimate.usage >= maxLimit) {
          return estimate;
        } else {
          return false;
        }
      })
      .catch(err => {
        return false;
      });
  } else {
    return false;
  }
}

export function checkQuotaSuccess(estimate) {
  return { type: a.CACHE_WARNING_ON, estimate };
}

export function checkQuotaError(errorObj) {
  return { type: a.CACHE_WARNING_OFF, errorObj };
}

export function checkQuota() {
  return async dispatch => {
    try {
      const estimate = await getCacheQuota();
      estimate
        ? dispatch(checkQuotaSuccess(estimate))
        : dispatch(checkQuotaSuccess(false));
    } catch (errorObj) {
      dispatch(checkQuotaError(errorObj));
    }
  };
}
