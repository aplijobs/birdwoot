import { PERF, isPerfTimelineSupported, isRedirectInfoAvailable } from '../../common/utils';
import { PAGE_LOAD, RESOURCE, MEASURE } from '../../common/constants';
import { state } from '../../state';
import { createNavigationTimingSpans } from './navigation-timing';
import { createUserTimingSpans } from './user-timing';
import { createResourceTimingSpans } from './resource-timing';
import { getPageLoadMarks } from './marks';

function captureNavigation(transaction) {
  if (!transaction.captureTimings) {
    if (transaction.type === PAGE_LOAD) {
      transaction._start = 0;
    }

    return;
  }

  var trEnd = transaction._end;

  if (transaction.type === PAGE_LOAD) {
    if (transaction.marks && transaction.marks.custom) {
      var customMarks = transaction.marks.custom;
      Object.keys(customMarks).forEach(function (key) {
        customMarks[key] += transaction._start;
      });
    }

    var trStart = 0;
    transaction._start = trStart;
    var timings = PERF.timing;
    var baseTime = isRedirectInfoAvailable(timings) ? timings.redirectStart : timings.fetchStart;
    createNavigationTimingSpans(timings, baseTime, trStart, trEnd).forEach(function (span) {
      span.traceId = transaction.traceId;
      span.sampled = transaction.sampled;

      if (span.pageResponse && transaction.options.pageLoadSpanId) {
        span.id = transaction.options.pageLoadSpanId;
      }

      transaction.spans.push(span);
    });

    if (transaction.options.pageLoadParentId) {
      transaction.parentId = transaction.options.pageLoadParentId;
    }

    transaction.addMarks(getPageLoadMarks(timings));
  }

  if (isPerfTimelineSupported()) {
    var _trStart = transaction._start;
    var resourceEntries = PERF.getEntriesByType(RESOURCE);
    createResourceTimingSpans(resourceEntries, state.bootstrapTime, _trStart, trEnd).forEach(function (span) {
      return transaction.spans.push(span);
    });
    var userEntries = PERF.getEntriesByType(MEASURE);
    createUserTimingSpans(userEntries, _trStart, trEnd).forEach(function (span) {
      return transaction.spans.push(span);
    });
  }
}

export { captureNavigation, createNavigationTimingSpans, createResourceTimingSpans, createUserTimingSpans, getPageLoadMarks };