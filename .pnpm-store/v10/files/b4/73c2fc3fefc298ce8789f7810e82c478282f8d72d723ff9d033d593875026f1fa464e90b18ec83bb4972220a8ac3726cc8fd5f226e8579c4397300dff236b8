import { EVENT, FIRST_INPUT } from '../../../common/constants';
import { isPerfInteractionCountSupported } from '../../../common/utils';
import { PerfEntryRecorder } from '../metrics';
var INP_THRESHOLD = 40;
var MAX_INTERACTIONS_TO_CONSIDER = 10;
export var inpState = {
  minInteractionId: Infinity,
  maxInteractionId: 0,
  interactionCount: 0,
  longestInteractions: []
};
export function observeUserInteractions(recorder) {
  if (recorder === void 0) {
    recorder = new PerfEntryRecorder(processUserInteractions);
  }

  var isPerfCountSupported = isPerfInteractionCountSupported();
  var durationThreshold = isPerfCountSupported ? INP_THRESHOLD : 16;
  recorder.start(EVENT, {
    buffered: true,
    durationThreshold: durationThreshold
  });

  if (!isPerfCountSupported) {
    recorder.start(FIRST_INPUT);
  }
}
export function processUserInteractions(list) {
  var entries = list.getEntries();
  entries.forEach(function (entry) {
    if (!entry.interactionId) {
      return;
    }

    updateInteractionCount(entry);

    if (entry.duration < INP_THRESHOLD) {
      return;
    }

    storeUserInteraction(entry);
  });
}
export function calculateInp() {
  if (inpState.longestInteractions.length === 0) {
    if (interactionCount() > 0) {
      return 0;
    }

    return;
  }

  var interactionIndex = Math.min(inpState.longestInteractions.length - 1, Math.floor(interactionCount() / 50));
  var inp = inpState.longestInteractions[interactionIndex].duration;
  return inp;
}
export function interactionCount() {
  return performance.interactionCount || inpState.interactionCount;
}
export function restoreINPState() {
  inpState.minInteractionId = Infinity;
  inpState.maxInteractionId = 0;
  inpState.interactionCount = 0;
  inpState.longestInteractions = [];
}

function storeUserInteraction(entry) {
  var leastSlow = inpState.longestInteractions[inpState.longestInteractions.length - 1];

  if (typeof leastSlow !== 'undefined' && entry.duration <= leastSlow.duration && entry.interactionId != leastSlow.id) {
    return;
  }

  var filteredInteraction = inpState.longestInteractions.filter(function (interaction) {
    return interaction.id === entry.interactionId;
  });

  if (filteredInteraction.length > 0) {
    var foundInteraction = filteredInteraction[0];
    foundInteraction.duration = Math.max(foundInteraction.duration, entry.duration);
  } else {
    inpState.longestInteractions.push({
      id: entry.interactionId,
      duration: entry.duration
    });
  }

  inpState.longestInteractions.sort(function (a, b) {
    return b.duration - a.duration;
  });
  inpState.longestInteractions.splice(MAX_INTERACTIONS_TO_CONSIDER);
}

function updateInteractionCount(entry) {
  if (isPerfInteractionCountSupported()) {
    return;
  }

  inpState.minInteractionId = Math.min(inpState.minInteractionId, entry.interactionId);
  inpState.maxInteractionId = Math.max(inpState.maxInteractionId, entry.interactionId);
  inpState.interactionCount = (inpState.maxInteractionId - inpState.minInteractionId) / 7 + 1;
}