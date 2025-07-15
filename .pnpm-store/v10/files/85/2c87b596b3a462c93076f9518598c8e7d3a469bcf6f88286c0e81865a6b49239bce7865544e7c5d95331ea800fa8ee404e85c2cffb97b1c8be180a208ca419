"use strict";

exports.__esModule = true;
exports.patchFetch = patchFetch;

var _polyfills = require("../polyfills");

var _patchUtils = require("./patch-utils");

var _constants = require("../constants");

var _utils = require("../utils");

var _fetch = require("../http/fetch");

function patchFetch(callback) {
  if (!(0, _fetch.isFetchSupported)()) {
    return;
  }

  function scheduleTask(task) {
    task.state = _constants.SCHEDULE;
    callback(_constants.SCHEDULE, task);
  }

  function invokeTask(task) {
    task.state = _constants.INVOKE;
    callback(_constants.INVOKE, task);
  }

  function handleResponseError(task, error) {
    task.data.aborted = isAbortError(error);
    task.data.error = error;
    invokeTask(task);
  }

  function readStream(stream, task) {
    var reader = stream.getReader();

    var read = function read() {
      reader.read().then(function (_ref) {
        var done = _ref.done;

        if (done) {
          invokeTask(task);
        } else {
          read();
        }
      }, function (error) {
        handleResponseError(task, error);
      });
    };

    read();
  }

  var nativeFetch = window.fetch;

  window.fetch = function (input, init) {
    var fetchSelf = this;
    var args = arguments;
    var request, url;
    var isURL = input instanceof URL;

    if (typeof input === 'string' || isURL) {
      request = new Request(input, init);

      if (isURL) {
        url = request.url;
      } else {
        url = input;
      }
    } else if (input) {
      request = input;
      url = request.url;
    } else {
      return nativeFetch.apply(fetchSelf, args);
    }

    var task = {
      source: _constants.FETCH,
      state: '',
      type: 'macroTask',
      data: {
        target: request,
        method: request.method,
        url: url,
        aborted: false
      }
    };
    return new _polyfills.Promise(function (resolve, reject) {
      _patchUtils.globalState.fetchInProgress = true;
      scheduleTask(task);
      var promise;

      try {
        promise = nativeFetch.apply(fetchSelf, [request]);
      } catch (error) {
        reject(error);
        task.data.error = error;
        invokeTask(task);
        _patchUtils.globalState.fetchInProgress = false;
        return;
      }

      promise.then(function (response) {
        var clonedResponse = response.clone ? response.clone() : {};
        resolve(response);
        (0, _utils.scheduleMicroTask)(function () {
          task.data.response = response;
          var body = clonedResponse.body;

          if (body) {
            readStream(body, task);
          } else {
            invokeTask(task);
          }
        });
      }, function (error) {
        reject(error);
        (0, _utils.scheduleMicroTask)(function () {
          handleResponseError(task, error);
        });
      });
      _patchUtils.globalState.fetchInProgress = false;
    });
  };
}

function isAbortError(error) {
  return error && error.name === 'AbortError';
}