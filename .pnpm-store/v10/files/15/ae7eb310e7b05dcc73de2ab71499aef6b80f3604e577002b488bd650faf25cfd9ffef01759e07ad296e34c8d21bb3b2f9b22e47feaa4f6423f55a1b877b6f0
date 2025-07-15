import ErrorLogging from './error-logging';
import { CONFIG_SERVICE, TRANSACTION_SERVICE, ERROR_LOGGING, APM_SERVER } from '../common/constants';
import { serviceCreators } from '../common/service-factory';

function registerServices() {
  serviceCreators[ERROR_LOGGING] = function (serviceFactory) {
    var _serviceFactory$getSe = serviceFactory.getService([APM_SERVER, CONFIG_SERVICE, TRANSACTION_SERVICE]),
        apmServer = _serviceFactory$getSe[0],
        configService = _serviceFactory$getSe[1],
        transactionService = _serviceFactory$getSe[2];

    return new ErrorLogging(apmServer, configService, transactionService);
  };
}

export { registerServices };