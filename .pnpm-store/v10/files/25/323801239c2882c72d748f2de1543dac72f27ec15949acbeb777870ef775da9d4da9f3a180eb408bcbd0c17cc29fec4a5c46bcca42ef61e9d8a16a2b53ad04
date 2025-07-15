"use strict";

exports.__esModule = true;
exports.shouldCreateSpan = shouldCreateSpan;

var _constants = require("../../common/constants");

function shouldCreateSpan(start, end, trStart, trEnd, baseTime) {
  if (baseTime === void 0) {
    baseTime = 0;
  }

  return typeof start === 'number' && typeof end === 'number' && start >= baseTime && end > start && start - baseTime >= trStart && end - baseTime <= trEnd && end - start < _constants.MAX_SPAN_DURATION && start - baseTime < _constants.MAX_SPAN_DURATION && end - baseTime < _constants.MAX_SPAN_DURATION;
}