"use strict";

exports.__esModule = true;
exports.getPageLoadMarks = getPageLoadMarks;
exports.COMPRESSED_NAV_TIMING_MARKS = exports.NAVIGATION_TIMING_MARKS = void 0;

var _utils = require("../../common/utils");

var NAVIGATION_TIMING_MARKS = ['fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'];
exports.NAVIGATION_TIMING_MARKS = NAVIGATION_TIMING_MARKS;
var COMPRESSED_NAV_TIMING_MARKS = ['fs', 'ls', 'le', 'cs', 'ce', 'qs', 'rs', 're', 'dl', 'di', 'ds', 'de', 'dc', 'es', 'ee'];
exports.COMPRESSED_NAV_TIMING_MARKS = COMPRESSED_NAV_TIMING_MARKS;

function getPageLoadMarks(timing) {
  var marks = getNavigationTimingMarks(timing);

  if (marks == null) {
    return null;
  }

  return {
    navigationTiming: marks,
    agent: {
      timeToFirstByte: marks.responseStart,
      domInteractive: marks.domInteractive,
      domComplete: marks.domComplete
    }
  };
}

function getNavigationTimingMarks(timing) {
  var redirectStart = timing.redirectStart,
      fetchStart = timing.fetchStart,
      navigationStart = timing.navigationStart,
      responseStart = timing.responseStart,
      responseEnd = timing.responseEnd;

  if (fetchStart >= navigationStart && responseStart >= fetchStart && responseEnd >= responseStart) {
    var marks = {};
    NAVIGATION_TIMING_MARKS.forEach(function (timingKey) {
      var m = timing[timingKey];

      if (m && m >= fetchStart) {
        if ((0, _utils.isRedirectInfoAvailable)(timing)) {
          marks[timingKey] = parseInt(m - redirectStart);
        } else {
          marks[timingKey] = parseInt(m - fetchStart);
        }
      }
    });
    return marks;
  }

  return null;
}