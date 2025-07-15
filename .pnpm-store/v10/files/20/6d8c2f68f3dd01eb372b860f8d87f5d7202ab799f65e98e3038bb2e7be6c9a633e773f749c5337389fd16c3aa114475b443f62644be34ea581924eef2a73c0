"use strict";

exports.__esModule = true;
exports.captureNavigation = captureNavigation;

var _utils = require("../../common/utils");

var _constants = require("../../common/constants");

var _state = require("../../state");

var _navigationTiming = require("./navigation-timing");

exports.createNavigationTimingSpans = _navigationTiming.createNavigationTimingSpans;

var _userTiming = require("./user-timing");

exports.createUserTimingSpans = _userTiming.createUserTimingSpans;

var _resourceTiming = require("./resource-timing");

exports.createResourceTimingSpans = _resourceTiming.createResourceTimingSpans;

var _marks = require("./marks");

exports.getPageLoadMarks = _marks.getPageLoadMarks;

function captureNavigation(transaction) {
  if (!transaction.captureTimings) {
    if (transaction.type === _constants.PAGE_LOAD) {
      transaction._start = 0;
    }

    return;
  }

  var trEnd = transaction._end;

  if (transaction.type === _constants.PAGE_LOAD) {
    if (transaction.marks && transaction.marks.custom) {
      var customMarks = transaction.marks.custom;
      Object.keys(customMarks).forEach(function (key) {
        customMarks[key] += transaction._start;
      });
    }

    var trStart = 0;
    transaction._start = trStart;
    var timings = _utils.PERF.timing;
    var baseTime = (0, _utils.isRedirectInfoAvailable)(timings) ? timings.redirectStart : timings.fetchStart;
    (0, _navigationTiming.createNavigationTimingSpans)(timings, baseTime, trStart, trEnd).forEach(function (span) {
      span.traceId = transaction.traceId;
      span.sampled = transaction.sampled;

      if (span.pageResponse && transaction.options.pageLoadSpanId) {
        span.id = transaction.options.pageLoadSpanId;
      }

      transaction.spans.push(span);
    });

    if (transaction.options.pageLoadParentId) {
      transaction.parentId = transaction.options.pageLoadParentId;
    }

    transaction.addMarks((0, _marks.getPageLoadMarks)(timings));
  }

  if ((0, _utils.isPerfTimelineSupported)()) {
    var _trStart = transaction._start;

    var resourceEntries = _utils.PERF.getEntriesByType(_constants.RESOURCE);

    (0, _resourceTiming.createResourceTimingSpans)(resourceEntries, _state.state.bootstrapTime, _trStart, trEnd).forEach(function (span) {
      return transaction.spans.push(span);
    });

    var userEntries = _utils.PERF.getEntriesByType(_constants.MEASURE);

    (0, _userTiming.createUserTimingSpans)(userEntries, _trStart, trEnd).forEach(function (span) {
      return transaction.spans.push(span);
    });
  }
}