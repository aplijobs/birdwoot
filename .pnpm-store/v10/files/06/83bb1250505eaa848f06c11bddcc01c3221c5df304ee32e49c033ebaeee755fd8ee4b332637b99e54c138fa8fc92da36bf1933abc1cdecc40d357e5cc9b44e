import { MAX_SPAN_DURATION } from '../../common/constants';

function shouldCreateSpan(start, end, trStart, trEnd, baseTime) {
  if (baseTime === void 0) {
    baseTime = 0;
  }

  return typeof start === 'number' && typeof end === 'number' && start >= baseTime && end > start && start - baseTime >= trStart && end - baseTime <= trEnd && end - start < MAX_SPAN_DURATION && start - baseTime < MAX_SPAN_DURATION && end - baseTime < MAX_SPAN_DURATION;
}

export { shouldCreateSpan };