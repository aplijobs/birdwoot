"use strict";

exports.__esModule = true;
exports.reportInp = reportInp;

var _process = require("./process");

var _utils = require("../../../common/utils");

var _constants = require("../../../common/constants");

function reportInp(transactionService) {
  var inp = (0, _process.calculateInp)();

  if (inp >= 0) {
    var startTime = (0, _utils.now)();
    var inpTr = transactionService.startTransaction(_constants.PAGE_EXIT, _constants.PAGE_EXIT, {
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
    (0, _process.restoreINPState)();
    return inpTr;
  }
}