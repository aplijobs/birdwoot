import { USER_TIMING_THRESHOLD } from '../../common/constants';
import { shouldCreateSpan } from './utils';
import Span from '../span';

function createUserTimingSpans(entries, trStart, trEnd) {
  var userTimingSpans = [];

  for (var i = 0; i < entries.length; i++) {
    var _entries$i = entries[i],
        name = _entries$i.name,
        startTime = _entries$i.startTime,
        duration = _entries$i.duration;
    var end = startTime + duration;

    if (duration <= USER_TIMING_THRESHOLD || !shouldCreateSpan(startTime, end, trStart, trEnd)) {
      continue;
    }

    var kind = 'app';
    var span = new Span(name, kind);
    span._start = startTime;
    span.end(end);
    userTimingSpans.push(span);
  }

  return userTimingSpans;
}

export { createUserTimingSpans };