"use strict";

exports.__esModule = true;
exports.registerServices = registerServices;

var _performanceMonitoring = _interopRequireDefault(require("./performance-monitoring"));

var _transactionService = _interopRequireDefault(require("./transaction-service"));

var _constants = require("../common/constants");

var _serviceFactory = require("../common/service-factory");

var _process = require("./metrics/inp/process");

exports.observeUserInteractions = _process.observeUserInteractions;

var _report = require("./metrics/inp/report");

exports.reportInp = _report.reportInp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerServices() {
  _serviceFactory.serviceCreators[_constants.TRANSACTION_SERVICE] = function (serviceFactory) {
    var _serviceFactory$getSe = serviceFactory.getService([_constants.LOGGING_SERVICE, _constants.CONFIG_SERVICE]),
        loggingService = _serviceFactory$getSe[0],
        configService = _serviceFactory$getSe[1];

    return new _transactionService.default(loggingService, configService);
  };

  _serviceFactory.serviceCreators[_constants.PERFORMANCE_MONITORING] = function (serviceFactory) {
    var _serviceFactory$getSe2 = serviceFactory.getService([_constants.APM_SERVER, _constants.CONFIG_SERVICE, _constants.LOGGING_SERVICE, _constants.TRANSACTION_SERVICE]),
        apmServer = _serviceFactory$getSe2[0],
        configService = _serviceFactory$getSe2[1],
        loggingService = _serviceFactory$getSe2[2],
        transactionService = _serviceFactory$getSe2[3];

    return new _performanceMonitoring.default(apmServer, configService, loggingService, transactionService);
  };
}