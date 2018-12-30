import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function useFetch(url, initialState = {}, options = {}) {
  let defaultOptions = {
    method: "GET",
    body: {},
    timeout: 3000,
    headers: {},
    runWhenSpecificPropsChanges: [],
    calculateTimeTaken: true,
    returnRawFetchResponse: false
  };
  let [fetchData, fetchState] = useState(initialState);
  options = { ...defaultOptions, ...options };
  let startTime = new Date().getTime();
  let fetchObj = {
    headers: options.headers
  };
  if (options.method && options.method.toLowerCase() !== "get") {
    fetchObj = { ...fetchObj, body: options.body };
  }
  let controller;
  let signal;
  if ("AbortController" in window) {
    controller = new window.AbortController();
    signal = controller.signal;
    fetchObj = { ...fetchObj, signal };
  }
  if (options.timeout) {
    setTimeout(() => {
      let { success } = fetchData;
      if (success == null) {
        controller && controller.abort && controller.abort();
      }
    }, options.timeout);
  }
  useEffect(() => {
    if (!typeCheck(options)) {
      throw new Error("Invalid Options Type");
    }
    fetch(url, fetchObj)
      .then(resp => {
        if (resp.ok) {
          return resp;
        }
        throw new Error(resp);
      })
      .then(resp => {
        if (!options.returnRawFetchResponse) {
          let headers = resp.headers.entries();
          let responseType = resp.headers.get("Content-Type");
          if (responseType.indexOf("application/json") !== -1) {
            return resp.json();
          } else if (responseType.indexOf("application/text") !== -1) {
            return resp.text();
          } else {
            return resp.blob();
          }
        } else {
          //Just return the raw fetch response
          return resp;
        }
      })
      .then(res => {
        let timeTaken = 0;
        let obj;
        obj = {
          response: res,
          success: true
        };
        if (options.calculateTimeTaken) {
          timeTaken = new Date().getTime() - startTime;
          obj = { ...obj, timeTaken };
        }
        fetchState(obj);
      })
      .catch(err => {
        fetchState({ success: false, error: err });
      });
  }, options.runWhenSpecificPropsChanges);
  let abort = () => {
    if (controller && controller.abort) {
      controller.abort();
      return true;
    }
    return false;
  };
  let { success, error, response, timeTaken } = { ...fetchData };
  return {
    data: response ? response : initialState,
    success,
    error,
    abort,
    timeTaken
  };
}

function typeCheck(options) {
  //Check fpr body, method, headers and runWhenSpecificPropsChanges
  if (!options.body || typeof options.body !== "object") {
    return false;
  }

  if (!options.method || typeof options.method !== "string") {
    return false;
  }

  if (!options.headers || typeof options.headers !== "object") {
    return false;
  }

  if (!options.runWhenSpecificPropsChanges || typeof options.runWhenSpecificPropsChanges !== "object") {
    return false;
  }

  return true;
}

export default useFetch;