import PerformanceMonitoring from './performance-monitoring';
import TransactionService from './transaction-service';
import { APM_SERVER, CONFIG_SERVICE, LOGGING_SERVICE, TRANSACTION_SERVICE, PERFORMANCE_MONITORING } from '../common/constants';
import { serviceCreators } from '../common/service-factory';
import { observeUserInteractions } from './metrics/inp/process';
import { reportInp } from './metrics/inp/report';

function registerServices() {
  serviceCreators[TRANSACTION_SERVICE] = function (serviceFactory) {
    var _serviceFactory$getSe = serviceFactory.getService([LOGGING_SERVICE, CONFIG_SERVICE]),
        loggingService = _serviceFactory$getSe[0],
        configService = _serviceFactory$getSe[1];

    return new TransactionService(loggingService, configService);
  };

  serviceCreators[PERFORMANCE_MONITORING] = function (serviceFactory) {
    var _serviceFactory$getSe2 = serviceFactory.getService([APM_SERVER, CONFIG_SERVICE, LOGGING_SERVICE, TRANSACTION_SERVICE]),
        apmServer = _serviceFactory$getSe2[0],
        configService = _serviceFactory$getSe2[1],
        loggingService = _serviceFactory$getSe2[2],
        transactionService = _serviceFactory$getSe2[3];

    return new PerformanceMonitoring(apmServer, configService, loggingService, transactionService);
  };
}

export { registerServices, observeUserInteractions, reportInp };