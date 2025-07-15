"use strict";

exports.__esModule = true;
exports.createUserTimingSpans = createUserTimingSpans;

var _constants = require("../../common/constants");

var _utils = require("./utils");

var _span = _interopRequireDefault(require("../span"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUserTimingSpans(entries, trStart, trEnd) {
  var userTimingSpans = [];

  for (var i = 0; i < entries.length; i++) {
    var _entries$i = entries[i],
        name = _entries$i.name,
        startTime = _entries$i.startTime,
        duration = _entries$i.duration;
    var end = startTime + duration;

    if (duration <= _constants.USER_TIMING_THRESHOLD || !(0, _utils.shouldCreateSpan)(startTime, end, trStart, trEnd)) {
      continue;
    }

    var kind = 'app';
    var span = new _span.default(name, kind);
    span._start = startTime;
    span.end(end);
    userTimingSpans.push(span);
  }

  return userTimingSpans;
}