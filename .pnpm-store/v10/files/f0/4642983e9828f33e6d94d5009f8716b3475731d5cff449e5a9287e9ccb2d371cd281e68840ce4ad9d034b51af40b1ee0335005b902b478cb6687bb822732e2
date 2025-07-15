"use strict";

exports.__esModule = true;
exports.createTracer = createTracer;

var _tracer = _interopRequireDefault(require("./tracer"));

exports.Tracer = _tracer.default;

var _span = _interopRequireDefault(require("./span"));

exports.Span = _span.default;

var _constants = require("../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTracer(serviceFactory) {
  var performanceMonitoring = serviceFactory.getService(_constants.PERFORMANCE_MONITORING);
  var transactionService = serviceFactory.getService(_constants.TRANSACTION_SERVICE);
  var errorLogging = serviceFactory.getService(_constants.ERROR_LOGGING);
  var loggingService = serviceFactory.getService(_constants.LOGGING_SERVICE);
  return new _tracer.default(performanceMonitoring, transactionService, loggingService, errorLogging);
}