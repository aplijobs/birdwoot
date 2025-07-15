"use strict";

exports.__esModule = true;
exports.observeUserInteractions = observeUserInteractions;
exports.processUserInteractions = processUserInteractions;
exports.calculateInp = calculateInp;
exports.interactionCount = interactionCount;
exports.restoreINPState = restoreINPState;
exports.inpState = void 0;

var _constants = require("../../../common/constants");

var _utils = require("../../../common/utils");

var _metrics = require("../metrics");

var INP_THRESHOLD = 40;
var MAX_INTERACTIONS_TO_CONSIDER = 10;
var inpState = {
  minInteractionId: Infinity,
  maxInteractionId: 0,
  interactionCount: 0,
  longestInteractions: []
};
exports.inpState = inpState;

function observeUserInteractions(recorder) {
  if (recorder === void 0) {
    recorder = new _metrics.PerfEntryRecorder(processUserInteractions);
  }

  var isPerfCountSupported = (0, _utils.isPerfInteractionCountSupported)();
  var durationThreshold = isPerfCountSupported ? INP_THRESHOLD : 16;
  recorder.start(_constants.EVENT, {
    buffered: true,
    durationThreshold: durationThreshold
  });

  if (!isPerfCountSupported) {
    recorder.start(_constants.FIRST_INPUT);
  }
}

function processUserInteractions(list) {
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

function calculateInp() {
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

function interactionCount() {
  return performance.interactionCount || inpState.interactionCount;
}

function restoreINPState() {
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
  if ((0, _utils.isPerfInteractionCountSupported)()) {
    return;
  }

  inpState.minInteractionId = Math.min(inpState.minInteractionId, entry.interactionId);
  inpState.maxInteractionId = Math.max(inpState.maxInteractionId, entry.interactionId);
  inpState.interactionCount = (inpState.maxInteractionId - inpState.minInteractionId) / 7 + 1;
}