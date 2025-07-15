"use strict";

exports.__esModule = true;
exports.observePageVisibility = observePageVisibility;

var _constants = require("../constants");

var _state = require("../../state");

var _utils = require("../utils");

var _report = require("../../performance-monitoring/metrics/inp/report");

function observePageVisibility(configService, transactionService) {
  if (document.visibilityState === 'hidden') {
    _state.state.lastHiddenStart = 0;
  }

  var visibilityChangeHandler = function visibilityChangeHandler() {
    if (document.visibilityState === 'hidden') {
      onPageHidden(configService, transactionService);
    }
  };

  var pageHideHandler = function pageHideHandler() {
    return onPageHidden(configService, transactionService);
  };

  var useCapture = true;
  window.addEventListener('visibilitychange', visibilityChangeHandler, useCapture);
  window.addEventListener('pagehide', pageHideHandler, useCapture);
  return function () {
    window.removeEventListener('visibilitychange', visibilityChangeHandler, useCapture);
    window.removeEventListener('pagehide', pageHideHandler, useCapture);
  };
}

function onPageHidden(configService, transactionService) {
  var inpTr = (0, _report.reportInp)(transactionService);

  if (inpTr) {
    var unobserve = configService.observeEvent(_constants.QUEUE_ADD_TRANSACTION, function () {
      endManagedTransaction(configService, transactionService);
      unobserve();
    });
  } else {
    endManagedTransaction(configService, transactionService);
  }
}

function endManagedTransaction(configService, transactionService) {
  var tr = transactionService.getCurrentTransaction();

  if (tr) {
    var unobserveDiscard = configService.observeEvent(_constants.TRANSACTION_IGNORE, function () {
      _state.state.lastHiddenStart = (0, _utils.now)();
      unobserveDiscard();
      unobserveQueueAdd();
    });
    var unobserveQueueAdd = configService.observeEvent(_constants.QUEUE_ADD_TRANSACTION, function () {
      configService.dispatchEvent(_constants.QUEUE_FLUSH);
      _state.state.lastHiddenStart = (0, _utils.now)();
      unobserveQueueAdd();
      unobserveDiscard();
    });
    tr.end();
  } else {
    configService.dispatchEvent(_constants.QUEUE_FLUSH);
    _state.state.lastHiddenStart = (0, _utils.now)();
  }
}