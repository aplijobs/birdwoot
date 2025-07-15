import { calculateInp, restoreINPState } from './process';
import { now } from '../../../common/utils';
import { PAGE_EXIT } from '../../../common/constants';
export function reportInp(transactionService) {
  var inp = calculateInp();

  if (inp >= 0) {
    var startTime = now();
    var inpTr = transactionService.startTransaction(PAGE_EXIT, PAGE_EXIT, {
      startTime: startTime
    });
    var navigations = performance.getEntriesByType('navigation');

    if (navigations.length > 0) {
      var hardNavigationUrl = navigations[0].name;
      inpTr.addContext({
        page: {
          url: hardNavigationUrl
        }
      });
    }

    inpTr.addLabels({
      inp_value: inp
    });
    var endTime = startTime + inp + 1;
    inpTr.end(endTime);
    restoreINPState();
    return inpTr;
  }
}