"use strict";

exports.__esModule = true;
exports.bootstrap = bootstrap;

var _utils = require("./common/utils");

var _patching = require("./common/patching");

var _state = require("./state");

var enabled = false;

function bootstrap() {
  if ((0, _utils.isPlatformSupported)()) {
    (0, _patching.patchAll)();
    _state.state.bootstrapTime = (0, _utils.now)();
    enabled = true;
  } else if (_utils.isBrowser) {
    console.log('[Elastic APM] platform is not supported!');
  }

  return enabled;
}