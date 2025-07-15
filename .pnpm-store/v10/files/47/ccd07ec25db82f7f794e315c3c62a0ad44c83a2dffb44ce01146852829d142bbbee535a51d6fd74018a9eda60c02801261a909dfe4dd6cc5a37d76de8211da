import Tracer from './tracer';
import Span from './span';
import { TRANSACTION_SERVICE, LOGGING_SERVICE, PERFORMANCE_MONITORING, ERROR_LOGGING } from '../common/constants';

function createTracer(serviceFactory) {
  var performanceMonitoring = serviceFactory.getService(PERFORMANCE_MONITORING);
  var transactionService = serviceFactory.getService(TRANSACTION_SERVICE);
  var errorLogging = serviceFactory.getService(ERROR_LOGGING);
  var loggingService = serviceFactory.getService(LOGGING_SERVICE);
  return new Tracer(performanceMonitoring, transactionService, loggingService, errorLogging);
}

export { Span, Tracer, createTracer };