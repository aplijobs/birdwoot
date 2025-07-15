"use strict";

exports.__esModule = true;
exports.createServiceFactory = createServiceFactory;

var _errorLogging = require("./error-logging");

var _performanceMonitoring = require("./performance-monitoring");

exports.observeUserInteractions = _performanceMonitoring.observeUserInteractions;

var _serviceFactory = require("./common/service-factory");

exports.ServiceFactory = _serviceFactory.ServiceFactory;

var _utils = require("./common/utils");

exports.isPlatformSupported = _utils.isPlatformSupported;
exports.scheduleMicroTask = _utils.scheduleMicroTask;
exports.scheduleMacroTask = _utils.scheduleMacroTask;
exports.isBrowser = _utils.isBrowser;

var _patching = require("./common/patching");

exports.patchAll = _patching.patchAll;
exports.patchEventHandler = _patching.patchEventHandler;

var _observers = require("./common/observers");

exports.observePageVisibility = _observers.observePageVisibility;
exports.observePageClicks = _observers.observePageClicks;

var _constants = require("./common/constants");

exports.PAGE_LOAD_DELAY = _constants.PAGE_LOAD_DELAY;
exports.PAGE_LOAD = _constants.PAGE_LOAD;
exports.ERROR = _constants.ERROR;
exports.CONFIG_SERVICE = _constants.CONFIG_SERVICE;
exports.LOGGING_SERVICE = _constants.LOGGING_SERVICE;
exports.TRANSACTION_SERVICE = _constants.TRANSACTION_SERVICE;
exports.APM_SERVER = _constants.APM_SERVER;
exports.PERFORMANCE_MONITORING = _constants.PERFORMANCE_MONITORING;
exports.ERROR_LOGGING = _constants.ERROR_LOGGING;
exports.EVENT_TARGET = _constants.EVENT_TARGET;
exports.CLICK = _constants.CLICK;

var _instrument = require("./common/instrument");

exports.getInstrumentationFlags = _instrument.getInstrumentationFlags;

var _afterFrame = _interopRequireDefault(require("./common/after-frame"));

exports.afterFrame = _afterFrame.default;

var _bootstrap = require("./bootstrap");

exports.bootstrap = _bootstrap.bootstrap;

var _opentracing = require("./opentracing");

exports.createTracer = _opentracing.createTracer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createServiceFactory() {
  (0, _performanceMonitoring.registerServices)();
  (0, _errorLogging.registerServices)();
  var serviceFactory = new _serviceFactory.ServiceFactory();
  return serviceFactory;
}