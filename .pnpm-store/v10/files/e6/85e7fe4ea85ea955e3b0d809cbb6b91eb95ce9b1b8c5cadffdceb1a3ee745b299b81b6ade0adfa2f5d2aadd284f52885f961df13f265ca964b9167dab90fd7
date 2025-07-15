import { QUEUE_ADD_TRANSACTION, QUEUE_FLUSH, TRANSACTION_IGNORE } from '../constants';
import { state } from '../../state';
import { now } from '../utils';
import { reportInp } from '../../performance-monitoring/metrics/inp/report';
export function observePageVisibility(configService, transactionService) {
  if (document.visibilityState === 'hidden') {
    state.lastHiddenStart = 0;
  }

  var visibilityChangeHandler = function visibilityChangeHandler() {
    if (document.visibilityState === 'hidden') {
      onPageHidden(configService, transactionService);
    }
  };

  var pageHideHandler = function pageHideHandler() {
    return onPageHidden(configService, transactionService);
  };

  var useCapture = true;
  window.addEventListener('visibilitychange', visibilityChangeHandler, useCapture);
  window.addEventListener('pagehide', pageHideHandler, useCapture);
  return function () {
    window.removeEventListener('visibilitychange', visibilityChangeHandler, useCapture);
    window.removeEventListener('pagehide', pageHideHandler, useCapture);
  };
}

function onPageHidden(configService, transactionService) {
  var inpTr = reportInp(transactionService);

  if (inpTr) {
    var unobserve = configService.observeEvent(QUEUE_ADD_TRANSACTION, function () {
      endManagedTransaction(configService, transactionService);
      unobserve();
    });
  } else {
    endManagedTransaction(configService, transactionService);
  }
}

function endManagedTransaction(configService, transactionService) {
  var tr = transactionService.getCurrentTransaction();

  if (tr) {
    var unobserveDiscard = configService.observeEvent(TRANSACTION_IGNORE, function () {
      state.lastHiddenStart = now();
      unobserveDiscard();
      unobserveQueueAdd();
    });
    var unobserveQueueAdd = configService.observeEvent(QUEUE_ADD_TRANSACTION, function () {
      configService.dispatchEvent(QUEUE_FLUSH);
      state.lastHiddenStart = now();
      unobserveQueueAdd();
      unobserveDiscard();
    });
    tr.end();
  } else {
    configService.dispatchEvent(QUEUE_FLUSH);
    state.lastHiddenStart = now();
  }
}