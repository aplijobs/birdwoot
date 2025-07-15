(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["elastic-apm-opentracing"] = factory();
	else
		root["elastic-apm-opentracing"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../rum-core/dist/es/bootstrap.js":
/*!****************************************!*\
  !*** ../rum-core/dist/es/bootstrap.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bootstrap: function() { return /* binding */ bootstrap; }
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_patching__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/patching */ "../rum-core/dist/es/common/patching/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "../rum-core/dist/es/state.js");



var enabled = false;
function bootstrap() {
  if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isPlatformSupported)()) {
    (0,_common_patching__WEBPACK_IMPORTED_MODULE_1__.patchAll)();
    _state__WEBPACK_IMPORTED_MODULE_2__.state.bootstrapTime = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.now)();
    enabled = true;
  } else if (_common_utils__WEBPACK_IMPORTED_MODULE_0__.isBrowser) {
    console.log('[Elastic APM] platform is not supported!');
  }

  return enabled;
}

/***/ }),

/***/ "../rum-core/dist/es/common/after-frame.js":
/*!*************************************************!*\
  !*** ../rum-core/dist/es/common/after-frame.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ afterFrame; }
/* harmony export */ });
var RAF_TIMEOUT = 100;
function afterFrame(callback) {
  var handler = function handler() {
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    setTimeout(callback);
  };

  var timeout = setTimeout(handler, RAF_TIMEOUT);
  var raf = requestAnimationFrame(handler);
}

/***/ }),

/***/ "../rum-core/dist/es/common/apm-server.js":
/*!************************************************!*\
  !*** ../rum-core/dist/es/common/apm-server.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queue */ "../rum-core/dist/es/common/queue.js");
/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./throttle */ "../rum-core/dist/es/common/throttle.js");
/* harmony import */ var _ndjson__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ndjson */ "../rum-core/dist/es/common/ndjson.js");
/* harmony import */ var _truncate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./truncate */ "../rum-core/dist/es/common/truncate.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./polyfills */ "../rum-core/dist/es/common/polyfills.js");
/* harmony import */ var _compress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compress */ "../rum-core/dist/es/common/compress.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state */ "../rum-core/dist/es/state.js");
/* harmony import */ var _http_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./http/fetch */ "../rum-core/dist/es/common/http/fetch.js");
/* harmony import */ var _http_xhr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./http/xhr */ "../rum-core/dist/es/common/http/xhr.js");











var THROTTLE_INTERVAL = 60000;

var ApmServer = function () {
  function ApmServer(configService, loggingService) {
    this._configService = configService;
    this._loggingService = loggingService;
    this.queue = undefined;
    this.throttleEvents = _utils__WEBPACK_IMPORTED_MODULE_0__.noop;
  }

  var _proto = ApmServer.prototype;

  _proto.init = function init() {
    var _this = this;

    var queueLimit = this._configService.get('queueLimit');

    var flushInterval = this._configService.get('flushInterval');

    var limit = this._configService.get('eventsLimit');

    var onFlush = function onFlush(events) {
      var promise = _this.sendEvents(events);

      if (promise) {
        promise.catch(function (reason) {
          _this._loggingService.warn('Failed sending events!', _this._constructError(reason));
        });
      }
    };

    this.queue = new _queue__WEBPACK_IMPORTED_MODULE_1__["default"](onFlush, {
      queueLimit: queueLimit,
      flushInterval: flushInterval
    });
    this.throttleEvents = (0,_throttle__WEBPACK_IMPORTED_MODULE_2__["default"])(this.queue.add.bind(this.queue), function () {
      return _this._loggingService.warn('Dropped events due to throttling!');
    }, {
      limit: limit,
      interval: THROTTLE_INTERVAL
    });

    this._configService.observeEvent(_constants__WEBPACK_IMPORTED_MODULE_3__.QUEUE_FLUSH, function () {
      _this.queue.flush();
    });
  };

  _proto._postJson = function _postJson(endPoint, payload) {
    var _this2 = this;

    var headers = {
      'Content-Type': 'application/x-ndjson'
    };

    var apmRequest = this._configService.get('apmRequest');

    var params = {
      payload: payload,
      headers: headers,
      beforeSend: apmRequest
    };
    return (0,_compress__WEBPACK_IMPORTED_MODULE_4__.compressPayload)(params).catch(function (error) {
      if (_state__WEBPACK_IMPORTED_MODULE_5__.__DEV__) {
        _this2._loggingService.debug('Compressing the payload using CompressionStream API failed', error.message);
      }

      return params;
    }).then(function (result) {
      return _this2._makeHttpRequest('POST', endPoint, result);
    }).then(function (_ref) {
      var responseText = _ref.responseText;
      return responseText;
    });
  };

  _proto._constructError = function _constructError(reason) {
    var url = reason.url,
        status = reason.status,
        responseText = reason.responseText;

    if (typeof status == 'undefined') {
      return reason;
    }

    var message = url + ' HTTP status: ' + status;

    if (_state__WEBPACK_IMPORTED_MODULE_5__.__DEV__ && responseText) {
      try {
        var serverErrors = [];
        var response = JSON.parse(responseText);

        if (response.errors && response.errors.length > 0) {
          response.errors.forEach(function (err) {
            return serverErrors.push(err.message);
          });
          message += ' ' + serverErrors.join(',');
        }
      } catch (e) {
        this._loggingService.debug('Error parsing response from APM server', e);
      }
    }

    return new Error(message);
  };

  _proto._makeHttpRequest = function _makeHttpRequest(method, url, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$timeout = _ref2.timeout,
        timeout = _ref2$timeout === void 0 ? _constants__WEBPACK_IMPORTED_MODULE_3__.HTTP_REQUEST_TIMEOUT : _ref2$timeout,
        payload = _ref2.payload,
        headers = _ref2.headers,
        beforeSend = _ref2.beforeSend;

    var sendCredentials = this._configService.get('sendCredentials');

    if (!beforeSend && (0,_http_fetch__WEBPACK_IMPORTED_MODULE_6__.shouldUseFetchWithKeepAlive)(method, payload)) {
      return (0,_http_fetch__WEBPACK_IMPORTED_MODULE_6__.sendFetchRequest)(method, url, {
        keepalive: true,
        timeout: timeout,
        payload: payload,
        headers: headers,
        sendCredentials: sendCredentials
      }).catch(function (reason) {
        if (reason instanceof TypeError) {
          return (0,_http_xhr__WEBPACK_IMPORTED_MODULE_7__.sendXHR)(method, url, {
            timeout: timeout,
            payload: payload,
            headers: headers,
            beforeSend: beforeSend,
            sendCredentials: sendCredentials
          });
        }

        throw reason;
      });
    }

    return (0,_http_xhr__WEBPACK_IMPORTED_MODULE_7__.sendXHR)(method, url, {
      timeout: timeout,
      payload: payload,
      headers: headers,
      beforeSend: beforeSend,
      sendCredentials: sendCredentials
    });
  };

  _proto.fetchConfig = function fetchConfig(serviceName, environment) {
    var _this3 = this;

    var _this$getEndpoints = this.getEndpoints(),
        configEndpoint = _this$getEndpoints.configEndpoint;

    if (!serviceName) {
      return _polyfills__WEBPACK_IMPORTED_MODULE_8__.Promise.reject('serviceName is required for fetching central config.');
    }

    configEndpoint += "?service.name=" + serviceName;

    if (environment) {
      configEndpoint += "&service.environment=" + environment;
    }

    var localConfig = this._configService.getLocalConfig();

    if (localConfig) {
      configEndpoint += "&ifnonematch=" + localConfig.etag;
    }

    var apmRequest = this._configService.get('apmRequest');

    return this._makeHttpRequest('GET', configEndpoint, {
      timeout: 5000,
      beforeSend: apmRequest
    }).then(function (xhr) {
      var status = xhr.status,
          responseText = xhr.responseText;

      if (status === 304) {
        return localConfig;
      } else {
        var remoteConfig = JSON.parse(responseText);
        var etag = xhr.getResponseHeader('etag');

        if (etag) {
          remoteConfig.etag = etag.replace(/["]/g, '');

          _this3._configService.setLocalConfig(remoteConfig, true);
        }

        return remoteConfig;
      }
    }).catch(function (reason) {
      var error = _this3._constructError(reason);

      return _polyfills__WEBPACK_IMPORTED_MODULE_8__.Promise.reject(error);
    });
  };

  _proto.createMetaData = function createMetaData() {
    var cfg = this._configService;
    var metadata = {
      service: {
        name: cfg.get('serviceName'),
        version: cfg.get('serviceVersion'),
        agent: {
          name: 'rum-js',
          version: cfg.version
        },
        language: {
          name: 'javascript'
        },
        environment: cfg.get('environment')
      },
      labels: cfg.get('context.tags')
    };
    return (0,_truncate__WEBPACK_IMPORTED_MODULE_9__.truncateModel)(_truncate__WEBPACK_IMPORTED_MODULE_9__.METADATA_MODEL, metadata);
  };

  _proto.addError = function addError(error) {
    var _this$throttleEvents;

    this.throttleEvents((_this$throttleEvents = {}, _this$throttleEvents[_constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS] = error, _this$throttleEvents));
  };

  _proto.addTransaction = function addTransaction(transaction) {
    var _this$throttleEvents2;

    this.throttleEvents((_this$throttleEvents2 = {}, _this$throttleEvents2[_constants__WEBPACK_IMPORTED_MODULE_3__.TRANSACTIONS] = transaction, _this$throttleEvents2));
  };

  _proto.ndjsonErrors = function ndjsonErrors(errors, compress) {
    var key = compress ? 'e' : 'error';
    return errors.map(function (error) {
      var _NDJSON$stringify;

      return _ndjson__WEBPACK_IMPORTED_MODULE_10__["default"].stringify((_NDJSON$stringify = {}, _NDJSON$stringify[key] = compress ? (0,_compress__WEBPACK_IMPORTED_MODULE_4__.compressError)(error) : error, _NDJSON$stringify));
    });
  };

  _proto.ndjsonMetricsets = function ndjsonMetricsets(metricsets) {
    return metricsets.map(function (metricset) {
      return _ndjson__WEBPACK_IMPORTED_MODULE_10__["default"].stringify({
        metricset: metricset
      });
    }).join('');
  };

  _proto.ndjsonTransactions = function ndjsonTransactions(transactions, compress) {
    var _this4 = this;

    var key = compress ? 'x' : 'transaction';
    return transactions.map(function (tr) {
      var _NDJSON$stringify2;

      var spans = '',
          breakdowns = '';

      if (!compress) {
        if (tr.spans) {
          spans = tr.spans.map(function (span) {
            return _ndjson__WEBPACK_IMPORTED_MODULE_10__["default"].stringify({
              span: span
            });
          }).join('');
          delete tr.spans;
        }

        if (tr.breakdown) {
          breakdowns = _this4.ndjsonMetricsets(tr.breakdown);
          delete tr.breakdown;
        }
      }

      return _ndjson__WEBPACK_IMPORTED_MODULE_10__["default"].stringify((_NDJSON$stringify2 = {}, _NDJSON$stringify2[key] = compress ? (0,_compress__WEBPACK_IMPORTED_MODULE_4__.compressTransaction)(tr) : tr, _NDJSON$stringify2)) + spans + breakdowns;
    });
  };

  _proto.sendEvents = function sendEvents(events) {
    var _payload, _NDJSON$stringify3;

    if (events.length === 0) {
      return;
    }

    var transactions = [];
    var errors = [];

    for (var i = 0; i < events.length; i++) {
      var event = events[i];

      if (event[_constants__WEBPACK_IMPORTED_MODULE_3__.TRANSACTIONS]) {
        transactions.push(event[_constants__WEBPACK_IMPORTED_MODULE_3__.TRANSACTIONS]);
      }

      if (event[_constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS]) {
        errors.push(event[_constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS]);
      }
    }

    if (transactions.length === 0 && errors.length === 0) {
      return;
    }

    var cfg = this._configService;
    var payload = (_payload = {}, _payload[_constants__WEBPACK_IMPORTED_MODULE_3__.TRANSACTIONS] = transactions, _payload[_constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS] = errors, _payload);
    var filteredPayload = cfg.applyFilters(payload);

    if (!filteredPayload) {
      this._loggingService.warn('Dropped payload due to filtering!');

      return;
    }

    var apiVersion = cfg.get('apiVersion');
    var compress = apiVersion > 2;
    var ndjson = [];
    var metadata = this.createMetaData();
    var metadataKey = compress ? 'm' : 'metadata';
    ndjson.push(_ndjson__WEBPACK_IMPORTED_MODULE_10__["default"].stringify((_NDJSON$stringify3 = {}, _NDJSON$stringify3[metadataKey] = compress ? (0,_compress__WEBPACK_IMPORTED_MODULE_4__.compressMetadata)(metadata) : metadata, _NDJSON$stringify3)));
    ndjson = ndjson.concat(this.ndjsonErrors(filteredPayload[_constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS], compress), this.ndjsonTransactions(filteredPayload[_constants__WEBPACK_IMPORTED_MODULE_3__.TRANSACTIONS], compress));
    var ndjsonPayload = ndjson.join('');

    var _this$getEndpoints2 = this.getEndpoints(),
        intakeEndpoint = _this$getEndpoints2.intakeEndpoint;

    return this._postJson(intakeEndpoint, ndjsonPayload);
  };

  _proto.getEndpoints = function getEndpoints() {
    var serverUrl = this._configService.get('serverUrl');

    var apiVersion = this._configService.get('apiVersion');

    var serverUrlPrefix = this._configService.get('serverUrlPrefix') || "/intake/v" + apiVersion + "/rum/events";
    var intakeEndpoint = serverUrl + serverUrlPrefix;
    var configEndpoint = serverUrl + "/config/v1/rum/agents";
    return {
      intakeEndpoint: intakeEndpoint,
      configEndpoint: configEndpoint
    };
  };

  return ApmServer;
}();

/* harmony default export */ __webpack_exports__["default"] = (ApmServer);

/***/ }),

/***/ "../rum-core/dist/es/common/compress.js":
/*!**********************************************!*\
  !*** ../rum-core/dist/es/common/compress.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compressError: function() { return /* binding */ compressError; },
/* harmony export */   compressMetadata: function() { return /* binding */ compressMetadata; },
/* harmony export */   compressMetricsets: function() { return /* binding */ compressMetricsets; },
/* harmony export */   compressPayload: function() { return /* binding */ compressPayload; },
/* harmony export */   compressTransaction: function() { return /* binding */ compressTransaction; }
/* harmony export */ });
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfills */ "../rum-core/dist/es/common/polyfills.js");
/* harmony import */ var _performance_monitoring_navigation_marks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../performance-monitoring/navigation/marks */ "../rum-core/dist/es/performance-monitoring/navigation/marks.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/common/utils.js");




function compressStackFrames(frames) {
  return frames.map(function (frame) {
    return {
      ap: frame.abs_path,
      f: frame.filename,
      fn: frame.function,
      li: frame.lineno,
      co: frame.colno
    };
  });
}

function compressResponse(response) {
  return {
    ts: response.transfer_size,
    ebs: response.encoded_body_size,
    dbs: response.decoded_body_size
  };
}

function compressHTTP(http) {
  var compressed = {};
  var method = http.method,
      status_code = http.status_code,
      url = http.url,
      response = http.response;
  compressed.url = url;

  if (method) {
    compressed.mt = method;
  }

  if (status_code) {
    compressed.sc = status_code;
  }

  if (response) {
    compressed.r = compressResponse(response);
  }

  return compressed;
}

function compressContext(context) {
  if (!context) {
    return null;
  }

  var compressed = {};
  var page = context.page,
      http = context.http,
      response = context.response,
      destination = context.destination,
      user = context.user,
      custom = context.custom;

  if (page) {
    compressed.p = {
      rf: page.referer,
      url: page.url
    };
  }

  if (http) {
    compressed.h = compressHTTP(http);
  }

  if (response) {
    compressed.r = compressResponse(response);
  }

  if (destination) {
    var service = destination.service;
    compressed.dt = {
      se: {
        n: service.name,
        t: service.type,
        rc: service.resource
      },
      ad: destination.address,
      po: destination.port
    };
  }

  if (user) {
    compressed.u = {
      id: user.id,
      un: user.username,
      em: user.email
    };
  }

  if (custom) {
    compressed.cu = custom;
  }

  return compressed;
}

function compressMarks(marks) {
  if (!marks) {
    return null;
  }

  var compressedNtMarks = compressNavigationTimingMarks(marks.navigationTiming);
  var compressed = {
    nt: compressedNtMarks,
    a: compressAgentMarks(compressedNtMarks, marks.agent)
  };
  return compressed;
}

function compressNavigationTimingMarks(ntMarks) {
  if (!ntMarks) {
    return null;
  }

  var compressed = {};
  _performance_monitoring_navigation_marks__WEBPACK_IMPORTED_MODULE_0__.COMPRESSED_NAV_TIMING_MARKS.forEach(function (mark, index) {
    var mapping = _performance_monitoring_navigation_marks__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_TIMING_MARKS[index];
    compressed[mark] = ntMarks[mapping];
  });
  return compressed;
}

function compressAgentMarks(compressedNtMarks, agentMarks) {
  var compressed = {};

  if (compressedNtMarks) {
    compressed = {
      fb: compressedNtMarks.rs,
      di: compressedNtMarks.di,
      dc: compressedNtMarks.dc
    };
  }

  if (agentMarks) {
    var fp = agentMarks.firstContentfulPaint;
    var lp = agentMarks.largestContentfulPaint;

    if (fp) {
      compressed.fp = fp;
    }

    if (lp) {
      compressed.lp = lp;
    }
  }

  if (Object.keys(compressed).length === 0) {
    return null;
  }

  return compressed;
}

function compressMetadata(metadata) {
  var service = metadata.service,
      labels = metadata.labels;
  var agent = service.agent,
      language = service.language;
  return {
    se: {
      n: service.name,
      ve: service.version,
      a: {
        n: agent.name,
        ve: agent.version
      },
      la: {
        n: language.name
      },
      en: service.environment
    },
    l: labels
  };
}
function compressTransaction(transaction) {
  var spans = transaction.spans.map(function (span) {
    var spanData = {
      id: span.id,
      n: span.name,
      t: span.type,
      s: span.start,
      d: span.duration,
      c: compressContext(span.context),
      o: span.outcome,
      sr: span.sample_rate
    };

    if (span.parent_id !== transaction.id) {
      spanData.pid = span.parent_id;
    }

    if (span.sync === true) {
      spanData.sy = true;
    }

    if (span.subtype) {
      spanData.su = span.subtype;
    }

    if (span.action) {
      spanData.ac = span.action;
    }

    return spanData;
  });
  var tr = {
    id: transaction.id,
    pid: transaction.parent_id,
    tid: transaction.trace_id,
    n: transaction.name,
    t: transaction.type,
    d: transaction.duration,
    c: compressContext(transaction.context),
    k: compressMarks(transaction.marks),
    me: compressMetricsets(transaction.breakdown),
    y: spans,
    yc: {
      sd: spans.length
    },
    sm: transaction.sampled,
    sr: transaction.sample_rate,
    o: transaction.outcome
  };

  if (transaction.experience) {
    var _transaction$experien = transaction.experience,
        cls = _transaction$experien.cls,
        fid = _transaction$experien.fid,
        tbt = _transaction$experien.tbt,
        longtask = _transaction$experien.longtask;
    tr.exp = {
      cls: cls,
      fid: fid,
      tbt: tbt,
      lt: longtask
    };
  }

  if (transaction.session) {
    var _transaction$session = transaction.session,
        id = _transaction$session.id,
        sequence = _transaction$session.sequence;
    tr.ses = {
      id: id,
      seq: sequence
    };
  }

  return tr;
}
function compressError(error) {
  var exception = error.exception;
  var compressed = {
    id: error.id,
    cl: error.culprit,
    ex: {
      mg: exception.message,
      st: compressStackFrames(exception.stacktrace),
      t: error.type
    },
    c: compressContext(error.context)
  };
  var transaction = error.transaction;

  if (transaction) {
    compressed.tid = error.trace_id;
    compressed.pid = error.parent_id;
    compressed.xid = error.transaction_id;
    compressed.x = {
      t: transaction.type,
      sm: transaction.sampled
    };
  }

  return compressed;
}
function compressMetricsets(breakdowns) {
  return breakdowns.map(function (_ref) {
    var span = _ref.span,
        samples = _ref.samples;
    return {
      y: {
        t: span.type
      },
      sa: {
        ysc: {
          v: samples['span.self_time.count'].value
        },
        yss: {
          v: samples['span.self_time.sum.us'].value
        }
      }
    };
  });
}
function compressPayload(params, type) {
  if (type === void 0) {
    type = 'gzip';
  }

  var isCompressionStreamSupported = typeof CompressionStream === 'function';
  return new _polyfills__WEBPACK_IMPORTED_MODULE_1__.Promise(function (resolve) {
    if (!isCompressionStreamSupported) {
      return resolve(params);
    }

    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isBeaconInspectionEnabled)()) {
      return resolve(params);
    }

    var payload = params.payload,
        headers = params.headers,
        beforeSend = params.beforeSend;
    var payloadStream = new Blob([payload]).stream();
    var compressedStream = payloadStream.pipeThrough(new CompressionStream(type));
    return new Response(compressedStream).blob().then(function (payload) {
      headers['Content-Encoding'] = type;
      return resolve({
        payload: payload,
        headers: headers,
        beforeSend: beforeSend
      });
    });
  });
}

/***/ }),

/***/ "../rum-core/dist/es/common/config-service.js":
/*!****************************************************!*\
  !*** ../rum-core/dist/es/common/config-service.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _event_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-handler */ "../rum-core/dist/es/common/event-handler.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../rum-core/dist/es/common/constants.js");
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}





function getConfigFromScript() {
  var script = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCurrentScript)();
  var config = getDataAttributesFromNode(script);
  return config;
}

function getDataAttributesFromNode(node) {
  if (!node) {
    return {};
  }

  var dataAttrs = {};
  var dataRegex = /^data-([\w-]+)$/;
  var attrs = node.attributes;

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];

    if (dataRegex.test(attr.nodeName)) {
      var key = attr.nodeName.match(dataRegex)[1];
      var camelCasedkey = key.split('-').map(function (value, index) {
        return index > 0 ? value.charAt(0).toUpperCase() + value.substring(1) : value;
      }).join('');
      dataAttrs[camelCasedkey] = attr.value || attr.nodeValue;
    }
  }

  return dataAttrs;
}

var Config = function () {
  function Config() {
    this.config = {
      serviceName: '',
      serviceVersion: '',
      environment: '',
      serverUrl: 'http://localhost:8200',
      serverUrlPrefix: '',
      active: true,
      instrument: true,
      disableInstrumentations: [],
      logLevel: 'warn',
      breakdownMetrics: false,
      ignoreTransactions: [],
      eventsLimit: 80,
      queueLimit: -1,
      flushInterval: 500,
      distributedTracing: true,
      distributedTracingOrigins: [],
      distributedTracingHeaderName: 'traceparent',
      pageLoadTraceId: '',
      pageLoadSpanId: '',
      pageLoadSampled: false,
      pageLoadParentId: '',
      pageLoadTransactionName: '',
      propagateTracestate: false,
      transactionSampleRate: 1.0,
      centralConfig: false,
      monitorLongtasks: true,
      apiVersion: 2,
      context: {},
      session: false,
      apmRequest: null,
      sendCredentials: false
    };
    this.events = new _event_handler__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.filters = [];
    this.version = '';
  }

  var _proto = Config.prototype;

  _proto.init = function init() {
    var scriptData = getConfigFromScript();
    this.setConfig(scriptData);
  };

  _proto.setVersion = function setVersion(version) {
    this.version = version;
  };

  _proto.addFilter = function addFilter(cb) {
    if (typeof cb !== 'function') {
      throw new Error('Argument to must be function');
    }

    this.filters.push(cb);
  };

  _proto.applyFilters = function applyFilters(data) {
    for (var i = 0; i < this.filters.length; i++) {
      data = this.filters[i](data);

      if (!data) {
        return;
      }
    }

    return data;
  };

  _proto.get = function get(key) {
    return key.split('.').reduce(function (obj, objKey) {
      return obj && obj[objKey];
    }, this.config);
  };

  _proto.setUserContext = function setUserContext(userContext) {
    if (userContext === void 0) {
      userContext = {};
    }

    var context = {};
    var _userContext = userContext,
        id = _userContext.id,
        username = _userContext.username,
        email = _userContext.email;

    if (typeof id === 'number' || typeof id === 'string') {
      context.id = id;
    }

    if (typeof username === 'string') {
      context.username = username;
    }

    if (typeof email === 'string') {
      context.email = email;
    }

    this.config.context.user = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.extend)(this.config.context.user || {}, context);
  };

  _proto.setCustomContext = function setCustomContext(customContext) {
    if (customContext === void 0) {
      customContext = {};
    }

    this.config.context.custom = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.extend)(this.config.context.custom || {}, customContext);
  };

  _proto.addLabels = function addLabels(tags) {
    var _this = this;

    if (!this.config.context.tags) {
      this.config.context.tags = {};
    }

    var keys = Object.keys(tags);
    keys.forEach(function (k) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLabel)(k, tags[k], _this.config.context.tags);
    });
  };

  _proto.setConfig = function setConfig(properties) {
    if (properties === void 0) {
      properties = {};
    }

    var _properties = properties,
        transactionSampleRate = _properties.transactionSampleRate,
        serverUrl = _properties.serverUrl;

    if (serverUrl) {
      properties.serverUrl = serverUrl.replace(/\/+$/, '');
    }

    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(transactionSampleRate)) {
      if (transactionSampleRate < 0.0001 && transactionSampleRate > 0) {
        transactionSampleRate = 0.0001;
      }

      properties.transactionSampleRate = Math.round(transactionSampleRate * 10000) / 10000;
    }

    this.config = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.merge)(this.config, properties);
    this.events.send(_constants__WEBPACK_IMPORTED_MODULE_2__.CONFIG_CHANGE, [this.config]);
  };

  _proto.validate = function validate(properties) {
    if (properties === void 0) {
      properties = {};
    }

    var requiredKeys = ['serviceName', 'serverUrl'];
    var allKeys = Object.keys(this.config);
    var errors = {
      missing: [],
      invalid: [],
      unknown: []
    };
    Object.keys(properties).forEach(function (key) {
      if (requiredKeys.indexOf(key) !== -1 && !properties[key]) {
        errors.missing.push(key);
      }

      if (allKeys.indexOf(key) === -1) {
        errors.unknown.push(key);
      }
    });

    if (properties.serviceName && !/^[a-zA-Z0-9 _-]+$/.test(properties.serviceName)) {
      errors.invalid.push({
        key: 'serviceName',
        value: properties.serviceName,
        allowed: 'a-z, A-Z, 0-9, _, -, <space>'
      });
    }

    var sampleRate = properties.transactionSampleRate;

    if (typeof sampleRate !== 'undefined' && (typeof sampleRate !== 'number' || isNaN(sampleRate) || sampleRate < 0 || sampleRate > 1)) {
      errors.invalid.push({
        key: 'transactionSampleRate',
        value: sampleRate,
        allowed: 'Number between 0 and 1'
      });
    }

    return errors;
  };

  _proto.getLocalConfig = function getLocalConfig() {
    var storage = sessionStorage;

    if (this.config.session) {
      storage = localStorage;
    }

    var config = storage.getItem(_constants__WEBPACK_IMPORTED_MODULE_2__.LOCAL_CONFIG_KEY);

    if (config) {
      return JSON.parse(config);
    }
  };

  _proto.setLocalConfig = function setLocalConfig(config, merge) {
    if (config) {
      if (merge) {
        var prevConfig = this.getLocalConfig();
        config = _extends({}, prevConfig, config);
      }

      var storage = sessionStorage;

      if (this.config.session) {
        storage = localStorage;
      }

      storage.setItem(_constants__WEBPACK_IMPORTED_MODULE_2__.LOCAL_CONFIG_KEY, JSON.stringify(config));
    }
  };

  _proto.dispatchEvent = function dispatchEvent(name, args) {
    this.events.send(name, args);
  };

  _proto.observeEvent = function observeEvent(name, fn) {
    return this.events.observe(name, fn);
  };

  return Config;
}();

/* harmony default export */ __webpack_exports__["default"] = (Config);

/***/ }),

/***/ "../rum-core/dist/es/common/constants.js":
/*!***********************************************!*\
  !*** ../rum-core/dist/es/common/constants.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADD_EVENT_LISTENER_STR: function() { return /* binding */ ADD_EVENT_LISTENER_STR; },
/* harmony export */   AFTER_EVENT: function() { return /* binding */ AFTER_EVENT; },
/* harmony export */   APM_SERVER: function() { return /* binding */ APM_SERVER; },
/* harmony export */   BEFORE_EVENT: function() { return /* binding */ BEFORE_EVENT; },
/* harmony export */   CLICK: function() { return /* binding */ CLICK; },
/* harmony export */   CONFIG_CHANGE: function() { return /* binding */ CONFIG_CHANGE; },
/* harmony export */   CONFIG_SERVICE: function() { return /* binding */ CONFIG_SERVICE; },
/* harmony export */   ERROR: function() { return /* binding */ ERROR; },
/* harmony export */   ERRORS: function() { return /* binding */ ERRORS; },
/* harmony export */   ERROR_LOGGING: function() { return /* binding */ ERROR_LOGGING; },
/* harmony export */   EVENT: function() { return /* binding */ EVENT; },
/* harmony export */   EVENT_TARGET: function() { return /* binding */ EVENT_TARGET; },
/* harmony export */   FETCH: function() { return /* binding */ FETCH; },
/* harmony export */   FIRST_CONTENTFUL_PAINT: function() { return /* binding */ FIRST_CONTENTFUL_PAINT; },
/* harmony export */   FIRST_INPUT: function() { return /* binding */ FIRST_INPUT; },
/* harmony export */   HISTORY: function() { return /* binding */ HISTORY; },
/* harmony export */   HTTP_REQUEST_TIMEOUT: function() { return /* binding */ HTTP_REQUEST_TIMEOUT; },
/* harmony export */   HTTP_REQUEST_TYPE: function() { return /* binding */ HTTP_REQUEST_TYPE; },
/* harmony export */   INVOKE: function() { return /* binding */ INVOKE; },
/* harmony export */   KEYWORD_LIMIT: function() { return /* binding */ KEYWORD_LIMIT; },
/* harmony export */   LARGEST_CONTENTFUL_PAINT: function() { return /* binding */ LARGEST_CONTENTFUL_PAINT; },
/* harmony export */   LAYOUT_SHIFT: function() { return /* binding */ LAYOUT_SHIFT; },
/* harmony export */   LOCAL_CONFIG_KEY: function() { return /* binding */ LOCAL_CONFIG_KEY; },
/* harmony export */   LOGGING_SERVICE: function() { return /* binding */ LOGGING_SERVICE; },
/* harmony export */   LONG_TASK: function() { return /* binding */ LONG_TASK; },
/* harmony export */   MAX_SPAN_DURATION: function() { return /* binding */ MAX_SPAN_DURATION; },
/* harmony export */   MEASURE: function() { return /* binding */ MEASURE; },
/* harmony export */   NAME_UNKNOWN: function() { return /* binding */ NAME_UNKNOWN; },
/* harmony export */   NAVIGATION: function() { return /* binding */ NAVIGATION; },
/* harmony export */   OUTCOME_FAILURE: function() { return /* binding */ OUTCOME_FAILURE; },
/* harmony export */   OUTCOME_SUCCESS: function() { return /* binding */ OUTCOME_SUCCESS; },
/* harmony export */   OUTCOME_UNKNOWN: function() { return /* binding */ OUTCOME_UNKNOWN; },
/* harmony export */   PAGE_EXIT: function() { return /* binding */ PAGE_EXIT; },
/* harmony export */   PAGE_LOAD: function() { return /* binding */ PAGE_LOAD; },
/* harmony export */   PAGE_LOAD_DELAY: function() { return /* binding */ PAGE_LOAD_DELAY; },
/* harmony export */   PAINT: function() { return /* binding */ PAINT; },
/* harmony export */   PERFORMANCE_MONITORING: function() { return /* binding */ PERFORMANCE_MONITORING; },
/* harmony export */   QUEUE_ADD_TRANSACTION: function() { return /* binding */ QUEUE_ADD_TRANSACTION; },
/* harmony export */   QUEUE_FLUSH: function() { return /* binding */ QUEUE_FLUSH; },
/* harmony export */   REMOVE_EVENT_LISTENER_STR: function() { return /* binding */ REMOVE_EVENT_LISTENER_STR; },
/* harmony export */   RESOURCE: function() { return /* binding */ RESOURCE; },
/* harmony export */   RESOURCE_INITIATOR_TYPES: function() { return /* binding */ RESOURCE_INITIATOR_TYPES; },
/* harmony export */   REUSABILITY_THRESHOLD: function() { return /* binding */ REUSABILITY_THRESHOLD; },
/* harmony export */   ROUTE_CHANGE: function() { return /* binding */ ROUTE_CHANGE; },
/* harmony export */   SCHEDULE: function() { return /* binding */ SCHEDULE; },
/* harmony export */   SESSION_TIMEOUT: function() { return /* binding */ SESSION_TIMEOUT; },
/* harmony export */   TEMPORARY_TYPE: function() { return /* binding */ TEMPORARY_TYPE; },
/* harmony export */   TRANSACTIONS: function() { return /* binding */ TRANSACTIONS; },
/* harmony export */   TRANSACTION_END: function() { return /* binding */ TRANSACTION_END; },
/* harmony export */   TRANSACTION_IGNORE: function() { return /* binding */ TRANSACTION_IGNORE; },
/* harmony export */   TRANSACTION_SERVICE: function() { return /* binding */ TRANSACTION_SERVICE; },
/* harmony export */   TRANSACTION_START: function() { return /* binding */ TRANSACTION_START; },
/* harmony export */   TRANSACTION_TYPE_ORDER: function() { return /* binding */ TRANSACTION_TYPE_ORDER; },
/* harmony export */   TRUNCATED_TYPE: function() { return /* binding */ TRUNCATED_TYPE; },
/* harmony export */   TYPE_CUSTOM: function() { return /* binding */ TYPE_CUSTOM; },
/* harmony export */   USER_INTERACTION: function() { return /* binding */ USER_INTERACTION; },
/* harmony export */   USER_TIMING_THRESHOLD: function() { return /* binding */ USER_TIMING_THRESHOLD; },
/* harmony export */   XMLHTTPREQUEST: function() { return /* binding */ XMLHTTPREQUEST; }
/* harmony export */ });
var SCHEDULE = 'schedule';
var INVOKE = 'invoke';
var ADD_EVENT_LISTENER_STR = 'addEventListener';
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
var RESOURCE_INITIATOR_TYPES = ['link', 'css', 'script', 'img', 'xmlhttprequest', 'fetch', 'beacon', 'iframe'];
var REUSABILITY_THRESHOLD = 5000;
var MAX_SPAN_DURATION = 5 * 60 * 1000;
var PAGE_LOAD_DELAY = 1000;
var PAGE_LOAD = 'page-load';
var ROUTE_CHANGE = 'route-change';
var TYPE_CUSTOM = 'custom';
var USER_INTERACTION = 'user-interaction';
var HTTP_REQUEST_TYPE = 'http-request';
var TEMPORARY_TYPE = 'temporary';
var NAME_UNKNOWN = 'Unknown';
var PAGE_EXIT = 'page-exit';
var TRANSACTION_TYPE_ORDER = [PAGE_LOAD, ROUTE_CHANGE, USER_INTERACTION, HTTP_REQUEST_TYPE, TYPE_CUSTOM, TEMPORARY_TYPE];
var OUTCOME_SUCCESS = 'success';
var OUTCOME_FAILURE = 'failure';
var OUTCOME_UNKNOWN = 'unknown';
var USER_TIMING_THRESHOLD = 60;
var TRANSACTION_START = 'transaction:start';
var TRANSACTION_END = 'transaction:end';
var CONFIG_CHANGE = 'config:change';
var QUEUE_FLUSH = 'queue:flush';
var QUEUE_ADD_TRANSACTION = 'queue:add_transaction';
var TRANSACTION_IGNORE = 'transaction:ignore';
var XMLHTTPREQUEST = 'xmlhttprequest';
var FETCH = 'fetch';
var HISTORY = 'history';
var EVENT_TARGET = 'eventtarget';
var CLICK = 'click';
var ERROR = 'error';
var BEFORE_EVENT = ':before';
var AFTER_EVENT = ':after';
var LOCAL_CONFIG_KEY = 'elastic_apm_config';
var LONG_TASK = 'longtask';
var PAINT = 'paint';
var MEASURE = 'measure';
var NAVIGATION = 'navigation';
var RESOURCE = 'resource';
var FIRST_CONTENTFUL_PAINT = 'first-contentful-paint';
var LARGEST_CONTENTFUL_PAINT = 'largest-contentful-paint';
var FIRST_INPUT = 'first-input';
var LAYOUT_SHIFT = 'layout-shift';
var EVENT = 'event';
var ERRORS = 'errors';
var TRANSACTIONS = 'transactions';
var CONFIG_SERVICE = 'ConfigService';
var LOGGING_SERVICE = 'LoggingService';
var TRANSACTION_SERVICE = 'TransactionService';
var APM_SERVER = 'ApmServer';
var PERFORMANCE_MONITORING = 'PerformanceMonitoring';
var ERROR_LOGGING = 'ErrorLogging';
var TRUNCATED_TYPE = '.truncated';
var KEYWORD_LIMIT = 1024;
var SESSION_TIMEOUT = 30 * 60000;
var HTTP_REQUEST_TIMEOUT = 10000;


/***/ }),

/***/ "../rum-core/dist/es/common/context.js":
/*!*********************************************!*\
  !*** ../rum-core/dist/es/common/context.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSpanContext: function() { return /* binding */ addSpanContext; },
/* harmony export */   addTransactionContext: function() { return /* binding */ addTransactionContext; },
/* harmony export */   getPageContext: function() { return /* binding */ getPageContext; }
/* harmony export */ });
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url */ "../rum-core/dist/es/common/url.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/common/utils.js");
var _excluded = ["tags"];

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}




var LEFT_SQUARE_BRACKET = 91;
var RIGHT_SQUARE_BRACKET = 93;
var EXTERNAL = 'external';
var RESOURCE = 'resource';
var HARD_NAVIGATION = 'hard-navigation';

function getPortNumber(port, protocol) {
  if (port === '') {
    port = protocol === 'http:' ? '80' : protocol === 'https:' ? '443' : '';
  }

  return port;
}

function getResponseContext(perfTimingEntry) {
  var transferSize = perfTimingEntry.transferSize,
      encodedBodySize = perfTimingEntry.encodedBodySize,
      decodedBodySize = perfTimingEntry.decodedBodySize,
      serverTiming = perfTimingEntry.serverTiming;
  var respContext = {
    transfer_size: transferSize,
    encoded_body_size: encodedBodySize,
    decoded_body_size: decodedBodySize
  };
  var serverTimingStr = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getServerTimingInfo)(serverTiming);

  if (serverTimingStr) {
    respContext.headers = {
      'server-timing': serverTimingStr
    };
  }

  return respContext;
}

function getDestination(parsedUrl) {
  var port = parsedUrl.port,
      protocol = parsedUrl.protocol,
      hostname = parsedUrl.hostname;
  var portNumber = getPortNumber(port, protocol);
  var ipv6Hostname = hostname.charCodeAt(0) === LEFT_SQUARE_BRACKET && hostname.charCodeAt(hostname.length - 1) === RIGHT_SQUARE_BRACKET;
  var address = hostname;

  if (ipv6Hostname) {
    address = hostname.slice(1, -1);
  }

  return {
    service: {
      resource: hostname + ':' + portNumber,
      name: '',
      type: ''
    },
    address: address,
    port: Number(portNumber)
  };
}

function getResourceContext(data) {
  var entry = data.entry,
      url = data.url;
  var parsedUrl = new _url__WEBPACK_IMPORTED_MODULE_1__.Url(url);
  var destination = getDestination(parsedUrl);
  return {
    http: {
      url: url,
      response: getResponseContext(entry)
    },
    destination: destination
  };
}

function getExternalContext(data) {
  var url = data.url,
      method = data.method,
      target = data.target,
      response = data.response;
  var parsedUrl = new _url__WEBPACK_IMPORTED_MODULE_1__.Url(url);
  var destination = getDestination(parsedUrl);
  var context = {
    http: {
      method: method,
      url: parsedUrl.href
    },
    destination: destination
  };
  var statusCode;

  if (target && typeof target.status !== 'undefined') {
    statusCode = target.status;
  } else if (response) {
    statusCode = response.status;
  }

  context.http.status_code = statusCode;
  return context;
}

function getNavigationContext(data) {
  var url = data.url;
  var parsedUrl = new _url__WEBPACK_IMPORTED_MODULE_1__.Url(url);
  var destination = getDestination(parsedUrl);
  return {
    destination: destination
  };
}

function getPageContext() {
  return {
    page: {
      referer: document.referrer,
      url: location.href
    }
  };
}
function addSpanContext(span, data) {
  if (!data) {
    return;
  }

  var type = span.type;
  var context;

  switch (type) {
    case EXTERNAL:
      context = getExternalContext(data);
      break;

    case RESOURCE:
      context = getResourceContext(data);
      break;

    case HARD_NAVIGATION:
      context = getNavigationContext(data);
      break;
  }

  span.addContext(context);
}
function addTransactionContext(transaction, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      tags = _ref.tags,
      configContext = _objectWithoutPropertiesLoose(_ref, _excluded);

  var pageContext = getPageContext();
  var responseContext = {};

  if (transaction.type === _constants__WEBPACK_IMPORTED_MODULE_2__.PAGE_EXIT) {
    transaction.ensureContext();

    if (transaction.context.page && transaction.context.page.url) {
      pageContext.page.url = transaction.context.page.url;
    }
  } else if (transaction.type === _constants__WEBPACK_IMPORTED_MODULE_2__.PAGE_LOAD && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isPerfTimelineSupported)()) {
    var entries = _utils__WEBPACK_IMPORTED_MODULE_0__.PERF.getEntriesByType(_constants__WEBPACK_IMPORTED_MODULE_2__.NAVIGATION);

    if (entries && entries.length > 0) {
      responseContext = {
        response: getResponseContext(entries[0])
      };
    }
  }

  transaction.addContext(pageContext, responseContext, configContext);
}

/***/ }),

/***/ "../rum-core/dist/es/common/event-handler.js":
/*!***************************************************!*\
  !*** ../rum-core/dist/es/common/event-handler.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../rum-core/dist/es/common/constants.js");


var EventHandler = function () {
  function EventHandler() {
    this.observers = {};
  }

  var _proto = EventHandler.prototype;

  _proto.observe = function observe(name, fn) {
    var _this = this;

    if (typeof fn === 'function') {
      if (!this.observers[name]) {
        this.observers[name] = [];
      }

      this.observers[name].push(fn);
      return function () {
        var index = _this.observers[name].indexOf(fn);

        if (index > -1) {
          _this.observers[name].splice(index, 1);
        }
      };
    }
  };

  _proto.sendOnly = function sendOnly(name, args) {
    var obs = this.observers[name];

    if (obs) {
      obs.forEach(function (fn) {
        try {
          fn.apply(undefined, args);
        } catch (error) {
          console.log(error, error.stack);
        }
      });
    }
  };

  _proto.send = function send(name, args) {
    this.sendOnly(name + _constants__WEBPACK_IMPORTED_MODULE_0__.BEFORE_EVENT, args);
    this.sendOnly(name, args);
    this.sendOnly(name + _constants__WEBPACK_IMPORTED_MODULE_0__.AFTER_EVENT, args);
  };

  return EventHandler;
}();

/* harmony default export */ __webpack_exports__["default"] = (EventHandler);

/***/ }),

/***/ "../rum-core/dist/es/common/http/fetch.js":
/*!************************************************!*\
  !*** ../rum-core/dist/es/common/http/fetch.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BYTE_LIMIT: function() { return /* binding */ BYTE_LIMIT; },
/* harmony export */   isFetchSupported: function() { return /* binding */ isFetchSupported; },
/* harmony export */   sendFetchRequest: function() { return /* binding */ sendFetchRequest; },
/* harmony export */   shouldUseFetchWithKeepAlive: function() { return /* binding */ shouldUseFetchWithKeepAlive; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _response_status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./response-status */ "../rum-core/dist/es/common/http/response-status.js");
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}



var BYTE_LIMIT = 60 * 1000;
function shouldUseFetchWithKeepAlive(method, payload) {
  if (!isFetchSupported()) {
    return false;
  }

  var isKeepAliveSupported = ('keepalive' in new Request(''));

  if (!isKeepAliveSupported) {
    return false;
  }

  var size = calculateSize(payload);
  return method === 'POST' && size < BYTE_LIMIT;
}
function sendFetchRequest(method, url, _ref) {
  var _ref$keepalive = _ref.keepalive,
      keepalive = _ref$keepalive === void 0 ? false : _ref$keepalive,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? _constants__WEBPACK_IMPORTED_MODULE_0__.HTTP_REQUEST_TIMEOUT : _ref$timeout,
      payload = _ref.payload,
      headers = _ref.headers,
      sendCredentials = _ref.sendCredentials;
  var timeoutConfig = {};

  if (typeof AbortController === 'function') {
    var controller = new AbortController();
    timeoutConfig.signal = controller.signal;
    setTimeout(function () {
      return controller.abort();
    }, timeout);
  }

  var fetchResponse;
  return window.fetch(url, _extends({
    body: payload,
    headers: headers,
    method: method,
    keepalive: keepalive,
    credentials: sendCredentials ? 'include' : 'omit'
  }, timeoutConfig)).then(function (response) {
    fetchResponse = response;
    return fetchResponse.text();
  }).then(function (responseText) {
    var bodyResponse = {
      url: url,
      status: fetchResponse.status,
      responseText: responseText
    };

    if (!(0,_response_status__WEBPACK_IMPORTED_MODULE_1__.isResponseSuccessful)(fetchResponse.status)) {
      throw bodyResponse;
    }

    return bodyResponse;
  });
}
function isFetchSupported() {
  return typeof window.fetch === 'function' && typeof window.Request === 'function';
}

function calculateSize(payload) {
  if (!payload) {
    return 0;
  }

  if (payload instanceof Blob) {
    return payload.size;
  }

  return new Blob([payload]).size;
}

/***/ }),

/***/ "../rum-core/dist/es/common/http/response-status.js":
/*!**********************************************************!*\
  !*** ../rum-core/dist/es/common/http/response-status.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isResponseSuccessful: function() { return /* binding */ isResponseSuccessful; }
/* harmony export */ });
function isResponseSuccessful(status) {
  if (status === 0 || status > 399 && status < 600) {
    return false;
  }

  return true;
}

/***/ }),

/***/ "../rum-core/dist/es/common/http/xhr.js":
/*!**********************************************!*\
  !*** ../rum-core/dist/es/common/http/xhr.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sendXHR: function() { return /* binding */ sendXHR; }
/* harmony export */ });
/* harmony import */ var _patching_patch_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../patching/patch-utils */ "../rum-core/dist/es/common/patching/patch-utils.js");
/* harmony import */ var _response_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./response-status */ "../rum-core/dist/es/common/http/response-status.js");
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../polyfills */ "../rum-core/dist/es/common/polyfills.js");



function sendXHR(method, url, _ref) {
  var _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? HTTP_REQUEST_TIMEOUT : _ref$timeout,
      payload = _ref.payload,
      headers = _ref.headers,
      beforeSend = _ref.beforeSend,
      sendCredentials = _ref.sendCredentials;
  return new _polyfills__WEBPACK_IMPORTED_MODULE_0__.Promise(function (resolve, reject) {
    var xhr = new window.XMLHttpRequest();
    xhr[_patching_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_IGNORE] = true;
    xhr.open(method, url, true);
    xhr.timeout = timeout;
    xhr.withCredentials = sendCredentials;

    if (headers) {
      for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var status = xhr.status,
            responseText = xhr.responseText;

        if ((0,_response_status__WEBPACK_IMPORTED_MODULE_2__.isResponseSuccessful)(status)) {
          resolve(xhr);
        } else {
          reject({
            url: url,
            status: status,
            responseText: responseText
          });
        }
      }
    };

    xhr.onerror = function () {
      var status = xhr.status,
          responseText = xhr.responseText;
      reject({
        url: url,
        status: status,
        responseText: responseText
      });
    };

    var canSend = true;

    if (typeof beforeSend === 'function') {
      canSend = beforeSend({
        url: url,
        method: method,
        headers: headers,
        payload: payload,
        xhr: xhr
      });
    }

    if (canSend) {
      xhr.send(payload);
    } else {
      reject({
        url: url,
        status: 0,
        responseText: 'Request rejected by user configuration.'
      });
    }
  });
}

/***/ }),

/***/ "../rum-core/dist/es/common/instrument.js":
/*!************************************************!*\
  !*** ../rum-core/dist/es/common/instrument.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInstrumentationFlags: function() { return /* binding */ getInstrumentationFlags; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../rum-core/dist/es/common/constants.js");

function getInstrumentationFlags(instrument, disabledInstrumentations) {
  var _flags;

  var flags = (_flags = {}, _flags[_constants__WEBPACK_IMPORTED_MODULE_0__.XMLHTTPREQUEST] = false, _flags[_constants__WEBPACK_IMPORTED_MODULE_0__.FETCH] = false, _flags[_constants__WEBPACK_IMPORTED_MODULE_0__.HISTORY] = false, _flags[_constants__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD] = false, _flags[_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR] = false, _flags[_constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TARGET] = false, _flags[_constants__WEBPACK_IMPORTED_MODULE_0__.CLICK] = false, _flags);

  if (!instrument) {
    return flags;
  }

  Object.keys(flags).forEach(function (key) {
    if (disabledInstrumentations.indexOf(key) === -1) {
      flags[key] = true;
    }
  });
  return flags;
}

/***/ }),

/***/ "../rum-core/dist/es/common/logging-service.js":
/*!*****************************************************!*\
  !*** ../rum-core/dist/es/common/logging-service.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/common/utils.js");


var LoggingService = function () {
  function LoggingService(spec) {
    if (spec === void 0) {
      spec = {};
    }

    this.levels = ['trace', 'debug', 'info', 'warn', 'error'];
    this.level = spec.level || 'warn';
    this.prefix = spec.prefix || '';
    this.resetLogMethods();
  }

  var _proto = LoggingService.prototype;

  _proto.shouldLog = function shouldLog(level) {
    return this.levels.indexOf(level) >= this.levels.indexOf(this.level);
  };

  _proto.setLevel = function setLevel(level) {
    if (level === this.level) {
      return;
    }

    this.level = level;
    this.resetLogMethods();
  };

  _proto.resetLogMethods = function resetLogMethods() {
    var _this = this;

    this.levels.forEach(function (level) {
      _this[level] = _this.shouldLog(level) ? log : _utils__WEBPACK_IMPORTED_MODULE_0__.noop;

      function log() {
        var normalizedLevel = level;

        if (level === 'trace' || level === 'debug') {
          normalizedLevel = 'info';
        }

        var args = arguments;
        args[0] = this.prefix + args[0];

        if (console) {
          var realMethod = console[normalizedLevel] || console.log;

          if (typeof realMethod === 'function') {
            realMethod.apply(console, args);
          }
        }
      }
    });
  };

  return LoggingService;
}();

/* harmony default export */ __webpack_exports__["default"] = (LoggingService);

/***/ }),

/***/ "../rum-core/dist/es/common/ndjson.js":
/*!********************************************!*\
  !*** ../rum-core/dist/es/common/ndjson.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var NDJSON = function () {
  function NDJSON() {}

  NDJSON.stringify = function stringify(object) {
    return JSON.stringify(object) + '\n';
  };

  return NDJSON;
}();

/* harmony default export */ __webpack_exports__["default"] = (NDJSON);

/***/ }),

/***/ "../rum-core/dist/es/common/observers/page-clicks.js":
/*!***********************************************************!*\
  !*** ../rum-core/dist/es/common/observers/page-clicks.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observePageClicks: function() { return /* binding */ observePageClicks; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../rum-core/dist/es/common/constants.js");

var INTERACTIVE_SELECTOR = 'a[data-transaction-name], button[data-transaction-name]';
function observePageClicks(transactionService) {
  var clickHandler = function clickHandler(event) {
    if (event.target instanceof Element) {
      createUserInteractionTransaction(transactionService, event.target);
    }
  };

  var eventName = 'click';
  var useCapture = true;
  window.addEventListener(eventName, clickHandler, useCapture);
  return function () {
    window.removeEventListener(eventName, clickHandler, useCapture);
  };
}

function createUserInteractionTransaction(transactionService, target) {
  var _getTransactionMetada = getTransactionMetadata(target),
      transactionName = _getTransactionMetada.transactionName,
      context = _getTransactionMetada.context;

  var tr = transactionService.startTransaction("Click - " + transactionName, _constants__WEBPACK_IMPORTED_MODULE_0__.USER_INTERACTION, {
    managed: true,
    canReuse: true,
    reuseThreshold: 300
  });

  if (tr && context) {
    tr.addContext(context);
  }
}

function getTransactionMetadata(target) {
  var metadata = {
    transactionName: null,
    context: null
  };
  metadata.transactionName = buildTransactionName(target);
  var classes = target.getAttribute('class');

  if (classes) {
    metadata.context = {
      custom: {
        classes: classes
      }
    };
  }

  return metadata;
}

function buildTransactionName(target) {
  var dtName = findCustomTransactionName(target);

  if (dtName) {
    return dtName;
  }

  var tagName = target.tagName.toLowerCase();
  var name = target.getAttribute('name');

  if (!!name) {
    return tagName + "[\"" + name + "\"]";
  }

  return tagName;
}

function findCustomTransactionName(target) {
  var trCustomNameAttribute = 'data-transaction-name';
  var fallbackName = target.getAttribute(trCustomNameAttribute);

  if (target.closest) {
    var element = target.closest(INTERACTIVE_SELECTOR);
    return element ? element.getAttribute(trCustomNameAttribute) : fallbackName;
  }

  return fallbackName;
}

/***/ }),

/***/ "../rum-core/dist/es/common/observers/page-visibility.js":
/*!***************************************************************!*\
  !*** ../rum-core/dist/es/common/observers/page-visibility.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observePageVisibility: function() { return /* binding */ observePageVisibility; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state */ "../rum-core/dist/es/state.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _performance_monitoring_metrics_inp_report__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../performance-monitoring/metrics/inp/report */ "../rum-core/dist/es/performance-monitoring/metrics/inp/report.js");




function observePageVisibility(configService, transactionService) {
  if (document.visibilityState === 'hidden') {
    _state__WEBPACK_IMPORTED_MODULE_0__.state.lastHiddenStart = 0;
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
  var inpTr = (0,_performance_monitoring_metrics_inp_report__WEBPACK_IMPORTED_MODULE_1__.reportInp)(transactionService);

  if (inpTr) {
    var unobserve = configService.observeEvent(_constants__WEBPACK_IMPORTED_MODULE_2__.QUEUE_ADD_TRANSACTION, function () {
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
    var unobserveDiscard = configService.observeEvent(_constants__WEBPACK_IMPORTED_MODULE_2__.TRANSACTION_IGNORE, function () {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.lastHiddenStart = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.now)();
      unobserveDiscard();
      unobserveQueueAdd();
    });
    var unobserveQueueAdd = configService.observeEvent(_constants__WEBPACK_IMPORTED_MODULE_2__.QUEUE_ADD_TRANSACTION, function () {
      configService.dispatchEvent(_constants__WEBPACK_IMPORTED_MODULE_2__.QUEUE_FLUSH);
      _state__WEBPACK_IMPORTED_MODULE_0__.state.lastHiddenStart = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.now)();
      unobserveQueueAdd();
      unobserveDiscard();
    });
    tr.end();
  } else {
    configService.dispatchEvent(_constants__WEBPACK_IMPORTED_MODULE_2__.QUEUE_FLUSH);
    _state__WEBPACK_IMPORTED_MODULE_0__.state.lastHiddenStart = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.now)();
  }
}

/***/ }),

/***/ "../rum-core/dist/es/common/patching/fetch-patch.js":
/*!**********************************************************!*\
  !*** ../rum-core/dist/es/common/patching/fetch-patch.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   patchFetch: function() { return /* binding */ patchFetch; }
/* harmony export */ });
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../polyfills */ "../rum-core/dist/es/common/polyfills.js");
/* harmony import */ var _patch_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./patch-utils */ "../rum-core/dist/es/common/patching/patch-utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _http_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../http/fetch */ "../rum-core/dist/es/common/http/fetch.js");





function patchFetch(callback) {
  if (!(0,_http_fetch__WEBPACK_IMPORTED_MODULE_0__.isFetchSupported)()) {
    return;
  }

  function scheduleTask(task) {
    task.state = _constants__WEBPACK_IMPORTED_MODULE_1__.SCHEDULE;
    callback(_constants__WEBPACK_IMPORTED_MODULE_1__.SCHEDULE, task);
  }

  function invokeTask(task) {
    task.state = _constants__WEBPACK_IMPORTED_MODULE_1__.INVOKE;
    callback(_constants__WEBPACK_IMPORTED_MODULE_1__.INVOKE, task);
  }

  function handleResponseError(task, error) {
    task.data.aborted = isAbortError(error);
    task.data.error = error;
    invokeTask(task);
  }

  function readStream(stream, task) {
    var reader = stream.getReader();

    var read = function read() {
      reader.read().then(function (_ref) {
        var done = _ref.done;

        if (done) {
          invokeTask(task);
        } else {
          read();
        }
      }, function (error) {
        handleResponseError(task, error);
      });
    };

    read();
  }

  var nativeFetch = window.fetch;

  window.fetch = function (input, init) {
    var fetchSelf = this;
    var args = arguments;
    var request, url;
    var isURL = input instanceof URL;

    if (typeof input === 'string' || isURL) {
      request = new Request(input, init);

      if (isURL) {
        url = request.url;
      } else {
        url = input;
      }
    } else if (input) {
      request = input;
      url = request.url;
    } else {
      return nativeFetch.apply(fetchSelf, args);
    }

    var task = {
      source: _constants__WEBPACK_IMPORTED_MODULE_1__.FETCH,
      state: '',
      type: 'macroTask',
      data: {
        target: request,
        method: request.method,
        url: url,
        aborted: false
      }
    };
    return new _polyfills__WEBPACK_IMPORTED_MODULE_2__.Promise(function (resolve, reject) {
      _patch_utils__WEBPACK_IMPORTED_MODULE_3__.globalState.fetchInProgress = true;
      scheduleTask(task);
      var promise;

      try {
        promise = nativeFetch.apply(fetchSelf, [request]);
      } catch (error) {
        reject(error);
        task.data.error = error;
        invokeTask(task);
        _patch_utils__WEBPACK_IMPORTED_MODULE_3__.globalState.fetchInProgress = false;
        return;
      }

      promise.then(function (response) {
        var clonedResponse = response.clone ? response.clone() : {};
        resolve(response);
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.scheduleMicroTask)(function () {
          task.data.response = response;
          var body = clonedResponse.body;

          if (body) {
            readStream(body, task);
          } else {
            invokeTask(task);
          }
        });
      }, function (error) {
        reject(error);
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.scheduleMicroTask)(function () {
          handleResponseError(task, error);
        });
      });
      _patch_utils__WEBPACK_IMPORTED_MODULE_3__.globalState.fetchInProgress = false;
    });
  };
}

function isAbortError(error) {
  return error && error.name === 'AbortError';
}

/***/ }),

/***/ "../rum-core/dist/es/common/patching/history-patch.js":
/*!************************************************************!*\
  !*** ../rum-core/dist/es/common/patching/history-patch.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   patchHistory: function() { return /* binding */ patchHistory; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../rum-core/dist/es/common/constants.js");

function patchHistory(callback) {
  if (!window.history) {
    return;
  }

  var nativePushState = history.pushState;

  if (typeof nativePushState === 'function') {
    history.pushState = function (state, title, url) {
      var task = {
        source: _constants__WEBPACK_IMPORTED_MODULE_0__.HISTORY,
        data: {
          state: state,
          title: title,
          url: url
        }
      };
      callback(_constants__WEBPACK_IMPORTED_MODULE_0__.INVOKE, task);
      nativePushState.apply(this, arguments);
    };
  }
}

/***/ }),

/***/ "../rum-core/dist/es/common/patching/index.js":
/*!****************************************************!*\
  !*** ../rum-core/dist/es/common/patching/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   patchAll: function() { return /* binding */ patchAll; },
/* harmony export */   patchEventHandler: function() { return /* binding */ patchEventHandler; }
/* harmony export */ });
/* harmony import */ var _xhr_patch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr-patch */ "../rum-core/dist/es/common/patching/xhr-patch.js");
/* harmony import */ var _fetch_patch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetch-patch */ "../rum-core/dist/es/common/patching/fetch-patch.js");
/* harmony import */ var _history_patch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./history-patch */ "../rum-core/dist/es/common/patching/history-patch.js");
/* harmony import */ var _event_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../event-handler */ "../rum-core/dist/es/common/event-handler.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "../rum-core/dist/es/common/constants.js");





var patchEventHandler = new _event_handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
var alreadyPatched = false;

function patchAll() {
  if (!alreadyPatched) {
    alreadyPatched = true;
    (0,_xhr_patch__WEBPACK_IMPORTED_MODULE_1__.patchXMLHttpRequest)(function (event, task) {
      patchEventHandler.send(_constants__WEBPACK_IMPORTED_MODULE_2__.XMLHTTPREQUEST, [event, task]);
    });
    (0,_fetch_patch__WEBPACK_IMPORTED_MODULE_3__.patchFetch)(function (event, task) {
      patchEventHandler.send(_constants__WEBPACK_IMPORTED_MODULE_2__.FETCH, [event, task]);
    });
    (0,_history_patch__WEBPACK_IMPORTED_MODULE_4__.patchHistory)(function (event, task) {
      patchEventHandler.send(_constants__WEBPACK_IMPORTED_MODULE_2__.HISTORY, [event, task]);
    });
  }

  return patchEventHandler;
}



/***/ }),

/***/ "../rum-core/dist/es/common/patching/patch-utils.js":
/*!**********************************************************!*\
  !*** ../rum-core/dist/es/common/patching/patch-utils.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XHR_IGNORE: function() { return /* binding */ XHR_IGNORE; },
/* harmony export */   XHR_METHOD: function() { return /* binding */ XHR_METHOD; },
/* harmony export */   XHR_SYNC: function() { return /* binding */ XHR_SYNC; },
/* harmony export */   XHR_URL: function() { return /* binding */ XHR_URL; },
/* harmony export */   apmSymbol: function() { return /* binding */ apmSymbol; },
/* harmony export */   globalState: function() { return /* binding */ globalState; },
/* harmony export */   patchMethod: function() { return /* binding */ patchMethod; }
/* harmony export */ });
var globalState = {
  fetchInProgress: false
};
function apmSymbol(name) {
  return '__apm_symbol__' + name;
}

function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }

  if (propertyDesc.writable === false) {
    return false;
  }

  return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}

function attachOriginToPatched(patched, original) {
  patched[apmSymbol('OriginalDelegate')] = original;
}

function patchMethod(target, name, patchFn) {
  var proto = target;

  while (proto && !proto.hasOwnProperty(name)) {
    proto = Object.getPrototypeOf(proto);
  }

  if (!proto && target[name]) {
    proto = target;
  }

  var delegateName = apmSymbol(name);
  var delegate;

  if (proto && !(delegate = proto[delegateName])) {
    delegate = proto[delegateName] = proto[name];
    var desc = proto && Object.getOwnPropertyDescriptor(proto, name);

    if (isPropertyWritable(desc)) {
      var patchDelegate = patchFn(delegate, delegateName, name);

      proto[name] = function () {
        return patchDelegate(this, arguments);
      };

      attachOriginToPatched(proto[name], delegate);
    }
  }

  return delegate;
}
var XHR_IGNORE = apmSymbol('xhrIgnore');
var XHR_SYNC = apmSymbol('xhrSync');
var XHR_URL = apmSymbol('xhrURL');
var XHR_METHOD = apmSymbol('xhrMethod');

/***/ }),

/***/ "../rum-core/dist/es/common/patching/xhr-patch.js":
/*!********************************************************!*\
  !*** ../rum-core/dist/es/common/patching/xhr-patch.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   patchXMLHttpRequest: function() { return /* binding */ patchXMLHttpRequest; }
/* harmony export */ });
/* harmony import */ var _patch_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patch-utils */ "../rum-core/dist/es/common/patching/patch-utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../rum-core/dist/es/common/constants.js");


function patchXMLHttpRequest(callback) {
  var XMLHttpRequestPrototype = XMLHttpRequest.prototype;

  if (!XMLHttpRequestPrototype || !XMLHttpRequestPrototype[_constants__WEBPACK_IMPORTED_MODULE_0__.ADD_EVENT_LISTENER_STR]) {
    return;
  }

  var READY_STATE_CHANGE = 'readystatechange';
  var LOAD = 'load';
  var ERROR = 'error';
  var TIMEOUT = 'timeout';
  var ABORT = 'abort';

  function invokeTask(task, status) {
    if (task.state !== _constants__WEBPACK_IMPORTED_MODULE_0__.INVOKE) {
      task.state = _constants__WEBPACK_IMPORTED_MODULE_0__.INVOKE;
      task.data.status = status;
      callback(_constants__WEBPACK_IMPORTED_MODULE_0__.INVOKE, task);
    }
  }

  function scheduleTask(task) {
    if (task.state === _constants__WEBPACK_IMPORTED_MODULE_0__.SCHEDULE) {
      return;
    }

    task.state = _constants__WEBPACK_IMPORTED_MODULE_0__.SCHEDULE;
    callback(_constants__WEBPACK_IMPORTED_MODULE_0__.SCHEDULE, task);
    var target = task.data.target;

    function addListener(name) {
      target[_constants__WEBPACK_IMPORTED_MODULE_0__.ADD_EVENT_LISTENER_STR](name, function (_ref) {
        var type = _ref.type;

        if (type === READY_STATE_CHANGE) {
          if (target.readyState === 4 && target.status !== 0) {
            invokeTask(task, 'success');
          }
        } else {
          var status = type === LOAD ? 'success' : type;
          invokeTask(task, status);
        }
      });
    }

    addListener(READY_STATE_CHANGE);
    addListener(LOAD);
    addListener(TIMEOUT);
    addListener(ERROR);
    addListener(ABORT);
  }

  var openNative = (0,_patch_utils__WEBPACK_IMPORTED_MODULE_1__.patchMethod)(XMLHttpRequestPrototype, 'open', function () {
    return function (self, args) {
      if (!self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_IGNORE]) {
        self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_METHOD] = args[0];
        self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_URL] = args[1];
        self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_SYNC] = args[2] === false;
      }

      return openNative.apply(self, args);
    };
  });
  var sendNative = (0,_patch_utils__WEBPACK_IMPORTED_MODULE_1__.patchMethod)(XMLHttpRequestPrototype, 'send', function () {
    return function (self, args) {
      if (self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_IGNORE]) {
        return sendNative.apply(self, args);
      }

      var task = {
        source: _constants__WEBPACK_IMPORTED_MODULE_0__.XMLHTTPREQUEST,
        state: '',
        type: 'macroTask',
        data: {
          target: self,
          method: self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_METHOD],
          sync: self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_SYNC],
          url: self[_patch_utils__WEBPACK_IMPORTED_MODULE_1__.XHR_URL],
          status: ''
        }
      };

      try {
        scheduleTask(task);
        return sendNative.apply(self, args);
      } catch (e) {
        invokeTask(task, ERROR);
        throw e;
      }
    };
  });
}

/***/ }),

/***/ "../rum-core/dist/es/common/polyfills.js":
/*!***********************************************!*\
  !*** ../rum-core/dist/es/common/polyfills.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Promise: function() { return /* binding */ Promise; }
/* harmony export */ });
/* harmony import */ var promise_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! promise-polyfill */ "../../node_modules/promise-polyfill/src/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/common/utils.js");


var local = {};

if (_utils__WEBPACK_IMPORTED_MODULE_1__.isBrowser) {
  local = window;
} else if (typeof self !== 'undefined') {
  local = self;
}

var Promise = 'Promise' in local ? local.Promise : promise_polyfill__WEBPACK_IMPORTED_MODULE_0__["default"];


/***/ }),

/***/ "../rum-core/dist/es/common/queue.js":
/*!*******************************************!*\
  !*** ../rum-core/dist/es/common/queue.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Queue = function () {
  function Queue(onFlush, opts) {
    if (opts === void 0) {
      opts = {};
    }

    this.onFlush = onFlush;
    this.items = [];
    this.queueLimit = opts.queueLimit || -1;
    this.flushInterval = opts.flushInterval || 0;
    this.timeoutId = undefined;
  }

  var _proto = Queue.prototype;

  _proto._setTimer = function _setTimer() {
    var _this = this;

    this.timeoutId = setTimeout(function () {
      return _this.flush();
    }, this.flushInterval);
  };

  _proto._clear = function _clear() {
    if (typeof this.timeoutId !== 'undefined') {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }

    this.items = [];
  };

  _proto.flush = function flush() {
    this.onFlush(this.items);

    this._clear();
  };

  _proto.add = function add(item) {
    this.items.push(item);

    if (this.queueLimit !== -1 && this.items.length >= this.queueLimit) {
      this.flush();
    } else {
      if (typeof this.timeoutId === 'undefined') {
        this._setTimer();
      }
    }
  };

  return Queue;
}();

/* harmony default export */ __webpack_exports__["default"] = (Queue);

/***/ }),

/***/ "../rum-core/dist/es/common/service-factory.js":
/*!*****************************************************!*\
  !*** ../rum-core/dist/es/common/service-factory.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceFactory: function() { return /* binding */ ServiceFactory; },
/* harmony export */   serviceCreators: function() { return /* binding */ serviceCreators; }
/* harmony export */ });
/* harmony import */ var _apm_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apm-server */ "../rum-core/dist/es/common/apm-server.js");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-service */ "../rum-core/dist/es/common/config-service.js");
/* harmony import */ var _logging_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logging-service */ "../rum-core/dist/es/common/logging-service.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state */ "../rum-core/dist/es/state.js");
var _serviceCreators;






var serviceCreators = (_serviceCreators = {}, _serviceCreators[_constants__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE] = function () {
  return new _config_service__WEBPACK_IMPORTED_MODULE_1__["default"]();
}, _serviceCreators[_constants__WEBPACK_IMPORTED_MODULE_0__.LOGGING_SERVICE] = function () {
  return new _logging_service__WEBPACK_IMPORTED_MODULE_2__["default"]({
    prefix: '[Elastic APM] '
  });
}, _serviceCreators[_constants__WEBPACK_IMPORTED_MODULE_0__.APM_SERVER] = function (factory) {
  var _factory$getService = factory.getService([_constants__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE, _constants__WEBPACK_IMPORTED_MODULE_0__.LOGGING_SERVICE]),
      configService = _factory$getService[0],
      loggingService = _factory$getService[1];

  return new _apm_server__WEBPACK_IMPORTED_MODULE_3__["default"](configService, loggingService);
}, _serviceCreators);

var ServiceFactory = function () {
  function ServiceFactory() {
    this.instances = {};
    this.initialized = false;
  }

  var _proto = ServiceFactory.prototype;

  _proto.init = function init() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    var configService = this.getService(_constants__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    configService.init();

    var _this$getService = this.getService([_constants__WEBPACK_IMPORTED_MODULE_0__.LOGGING_SERVICE, _constants__WEBPACK_IMPORTED_MODULE_0__.APM_SERVER]),
        loggingService = _this$getService[0],
        apmServer = _this$getService[1];

    configService.events.observe(_constants__WEBPACK_IMPORTED_MODULE_0__.CONFIG_CHANGE, function () {
      var logLevel = configService.get('logLevel');
      loggingService.setLevel(logLevel);
    });
    apmServer.init();
  };

  _proto.getService = function getService(name) {
    var _this = this;

    if (typeof name === 'string') {
      if (!this.instances[name]) {
        if (typeof serviceCreators[name] === 'function') {
          this.instances[name] = serviceCreators[name](this);
        } else if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
          console.log('Cannot get service, No creator for: ' + name);
        }
      }

      return this.instances[name];
    } else if (Array.isArray(name)) {
      return name.map(function (n) {
        return _this.getService(n);
      });
    }
  };

  return ServiceFactory;
}();



/***/ }),

/***/ "../rum-core/dist/es/common/throttle.js":
/*!**********************************************!*\
  !*** ../rum-core/dist/es/common/throttle.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ throttle; }
/* harmony export */ });
function throttle(fn, onThrottle, opts) {
  var context = this;
  var limit = opts.limit;
  var interval = opts.interval;
  var counter = 0;
  var timeoutId;
  return function () {
    counter++;

    if (typeof timeoutId === 'undefined') {
      timeoutId = setTimeout(function () {
        counter = 0;
        timeoutId = undefined;
      }, interval);
    }

    if (counter > limit && typeof onThrottle === 'function') {
      return onThrottle.apply(context, arguments);
    } else {
      return fn.apply(context, arguments);
    }
  };
}

/***/ }),

/***/ "../rum-core/dist/es/common/truncate.js":
/*!**********************************************!*\
  !*** ../rum-core/dist/es/common/truncate.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_MODEL: function() { return /* binding */ ERROR_MODEL; },
/* harmony export */   METADATA_MODEL: function() { return /* binding */ METADATA_MODEL; },
/* harmony export */   RESPONSE_MODEL: function() { return /* binding */ RESPONSE_MODEL; },
/* harmony export */   SPAN_MODEL: function() { return /* binding */ SPAN_MODEL; },
/* harmony export */   TRANSACTION_MODEL: function() { return /* binding */ TRANSACTION_MODEL; },
/* harmony export */   truncate: function() { return /* binding */ truncate; },
/* harmony export */   truncateModel: function() { return /* binding */ truncateModel; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../rum-core/dist/es/common/constants.js");

var METADATA_MODEL = {
  service: {
    name: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
    version: true,
    agent: {
      version: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true]
    },
    environment: true
  },
  labels: {
    '*': true
  }
};
var RESPONSE_MODEL = {
  '*': true,
  headers: {
    '*': true
  }
};
var DESTINATION_MODEL = {
  address: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT],
  service: {
    '*': [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true]
  }
};
var CONTEXT_MODEL = {
  user: {
    id: true,
    email: true,
    username: true
  },
  tags: {
    '*': true
  },
  http: {
    response: RESPONSE_MODEL
  },
  destination: DESTINATION_MODEL,
  response: RESPONSE_MODEL
};
var SPAN_MODEL = {
  name: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  type: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  id: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  trace_id: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  parent_id: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  transaction_id: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  subtype: true,
  action: true,
  context: CONTEXT_MODEL
};
var TRANSACTION_MODEL = {
  name: true,
  parent_id: true,
  type: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  id: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  trace_id: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  span_count: {
    started: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true]
  },
  context: CONTEXT_MODEL
};
var ERROR_MODEL = {
  id: [_constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT, true],
  trace_id: true,
  transaction_id: true,
  parent_id: true,
  culprit: true,
  exception: {
    type: true
  },
  transaction: {
    type: true
  },
  context: CONTEXT_MODEL
};

function truncate(value, limit, required, placeholder) {
  if (limit === void 0) {
    limit = _constants__WEBPACK_IMPORTED_MODULE_0__.KEYWORD_LIMIT;
  }

  if (required === void 0) {
    required = false;
  }

  if (placeholder === void 0) {
    placeholder = 'N/A';
  }

  if (required && isEmpty(value)) {
    value = placeholder;
  }

  if (typeof value === 'string') {
    return value.substring(0, limit);
  }

  return value;
}

function isEmpty(value) {
  return value == null || value === '' || typeof value === 'undefined';
}

function replaceValue(target, key, currModel) {
  var value = truncate(target[key], currModel[0], currModel[1]);

  if (isEmpty(value)) {
    delete target[key];
    return;
  }

  target[key] = value;
}

function truncateModel(model, target, childTarget) {
  if (model === void 0) {
    model = {};
  }

  if (childTarget === void 0) {
    childTarget = target;
  }

  var keys = Object.keys(model);
  var emptyArr = [];

  var _loop = function _loop(i) {
    var currKey = keys[i];
    var currModel = model[currKey] === true ? emptyArr : model[currKey];

    if (!Array.isArray(currModel)) {
      truncateModel(currModel, target, childTarget[currKey]);
    } else {
      if (currKey === '*') {
        Object.keys(childTarget).forEach(function (key) {
          return replaceValue(childTarget, key, currModel);
        });
      } else {
        replaceValue(childTarget, currKey, currModel);
      }
    }
  };

  for (var i = 0; i < keys.length; i++) {
    _loop(i);
  }

  return target;
}



/***/ }),

/***/ "../rum-core/dist/es/common/url.js":
/*!*****************************************!*\
  !*** ../rum-core/dist/es/common/url.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Url: function() { return /* binding */ Url; },
/* harmony export */   slugifyUrl: function() { return /* binding */ slugifyUrl; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/common/utils.js");


function isDefaultPort(port, protocol) {
  switch (protocol) {
    case 'http:':
      return port === '80';

    case 'https:':
      return port === '443';
  }

  return true;
}

var RULES = [['#', 'hash'], ['?', 'query'], ['/', 'path'], ['@', 'auth', 1], [NaN, 'host', undefined, 1]];
var PROTOCOL_REGEX = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;
var Url = function () {
  function Url(url) {
    var _this$extractProtocol = this.extractProtocol(url || ''),
        protocol = _this$extractProtocol.protocol,
        address = _this$extractProtocol.address,
        slashes = _this$extractProtocol.slashes;

    var relative = !protocol && !slashes;
    var location = this.getLocation();
    var instructions = RULES.slice();
    address = address.replace('\\', '/');

    if (!slashes) {
      instructions[2] = [NaN, 'path'];
    }

    var index;

    for (var i = 0; i < instructions.length; i++) {
      var instruction = instructions[i];
      var parse = instruction[0];
      var key = instruction[1];

      if (typeof parse === 'string') {
        index = address.indexOf(parse);

        if (~index) {
          var instLength = instruction[2];

          if (instLength) {
            var newIndex = address.lastIndexOf(parse);
            index = Math.max(index, newIndex);
            this[key] = address.slice(0, index);
            address = address.slice(index + instLength);
          } else {
            this[key] = address.slice(index);
            address = address.slice(0, index);
          }
        }
      } else {
        this[key] = address;
        address = '';
      }

      this[key] = this[key] || (relative && instruction[3] ? location[key] || '' : '');
      if (instruction[3]) this[key] = this[key].toLowerCase();
    }

    if (relative && this.path.charAt(0) !== '/') {
      this.path = '/' + this.path;
    }

    this.relative = relative;
    this.protocol = protocol || location.protocol;
    this.hostname = this.host;
    this.port = '';

    if (/:\d+$/.test(this.host)) {
      var value = this.host.split(':');
      var port = value.pop();
      var hostname = value.join(':');

      if (isDefaultPort(port, this.protocol)) {
        this.host = hostname;
      } else {
        this.port = port;
      }

      this.hostname = hostname;
    }

    this.origin = this.protocol && this.host && this.protocol !== 'file:' ? this.protocol + '//' + this.host : 'null';
    this.href = this.toString();
  }

  var _proto = Url.prototype;

  _proto.toString = function toString() {
    var result = this.protocol;
    result += '//';

    if (this.auth) {
      var REDACTED = '[REDACTED]';
      var userpass = this.auth.split(':');
      var username = userpass[0] ? REDACTED : '';
      var password = userpass[1] ? ':' + REDACTED : '';
      result += username + password + '@';
    }

    result += this.host;
    result += this.path;
    result += this.query;
    result += this.hash;
    return result;
  };

  _proto.getLocation = function getLocation() {
    var globalVar = {};

    if (_utils__WEBPACK_IMPORTED_MODULE_0__.isBrowser) {
      globalVar = window;
    }

    return globalVar.location;
  };

  _proto.extractProtocol = function extractProtocol(url) {
    var match = PROTOCOL_REGEX.exec(url);
    return {
      protocol: match[1] ? match[1].toLowerCase() : '',
      slashes: !!match[2],
      address: match[3]
    };
  };

  return Url;
}();
function slugifyUrl(urlStr, depth) {
  if (depth === void 0) {
    depth = 2;
  }

  var parsedUrl = new Url(urlStr);
  var query = parsedUrl.query,
      path = parsedUrl.path;
  var pathParts = path.substring(1).split('/');
  var redactString = ':id';
  var wildcard = '*';
  var specialCharsRegex = /\W|_/g;
  var digitsRegex = /[0-9]/g;
  var lowerCaseRegex = /[a-z]/g;
  var upperCaseRegex = /[A-Z]/g;
  var redactedParts = [];
  var redactedBefore = false;

  for (var index = 0; index < pathParts.length; index++) {
    var part = pathParts[index];

    if (redactedBefore || index > depth - 1) {
      if (part) {
        redactedParts.push(wildcard);
      }

      break;
    }

    var numberOfSpecialChars = (part.match(specialCharsRegex) || []).length;

    if (numberOfSpecialChars >= 2) {
      redactedParts.push(redactString);
      redactedBefore = true;
      continue;
    }

    var numberOfDigits = (part.match(digitsRegex) || []).length;

    if (numberOfDigits > 3 || part.length > 3 && numberOfDigits / part.length >= 0.3) {
      redactedParts.push(redactString);
      redactedBefore = true;
      continue;
    }

    var numberofUpperCase = (part.match(upperCaseRegex) || []).length;
    var numberofLowerCase = (part.match(lowerCaseRegex) || []).length;
    var lowerCaseRate = numberofLowerCase / part.length;
    var upperCaseRate = numberofUpperCase / part.length;

    if (part.length > 5 && (upperCaseRate > 0.3 && upperCaseRate < 0.6 || lowerCaseRate > 0.3 && lowerCaseRate < 0.6)) {
      redactedParts.push(redactString);
      redactedBefore = true;
      continue;
    }

    part && redactedParts.push(part);
  }

  var redacted = '/' + (redactedParts.length >= 2 ? redactedParts.join('/') : redactedParts.join('')) + (query ? '?{query}' : '');
  return redacted;
}

/***/ }),

/***/ "../rum-core/dist/es/common/utils.js":
/*!*******************************************!*\
  !*** ../rum-core/dist/es/common/utils.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PERF: function() { return /* binding */ PERF; },
/* harmony export */   baseExtend: function() { return /* binding */ baseExtend; },
/* harmony export */   bytesToHex: function() { return /* binding */ bytesToHex; },
/* harmony export */   checkSameOrigin: function() { return /* binding */ checkSameOrigin; },
/* harmony export */   extend: function() { return /* binding */ extend; },
/* harmony export */   find: function() { return /* binding */ find; },
/* harmony export */   generateRandomId: function() { return /* binding */ generateRandomId; },
/* harmony export */   getCurrentScript: function() { return /* binding */ getCurrentScript; },
/* harmony export */   getDtHeaderValue: function() { return /* binding */ getDtHeaderValue; },
/* harmony export */   getDuration: function() { return /* binding */ getDuration; },
/* harmony export */   getEarliestSpan: function() { return /* binding */ getEarliestSpan; },
/* harmony export */   getElasticScript: function() { return /* binding */ getElasticScript; },
/* harmony export */   getLatestNonXHRSpan: function() { return /* binding */ getLatestNonXHRSpan; },
/* harmony export */   getLatestXHRSpan: function() { return /* binding */ getLatestXHRSpan; },
/* harmony export */   getServerTimingInfo: function() { return /* binding */ getServerTimingInfo; },
/* harmony export */   getTSHeaderValue: function() { return /* binding */ getTSHeaderValue; },
/* harmony export */   getTime: function() { return /* binding */ getTime; },
/* harmony export */   getTimeOrigin: function() { return /* binding */ getTimeOrigin; },
/* harmony export */   isBeaconInspectionEnabled: function() { return /* binding */ isBeaconInspectionEnabled; },
/* harmony export */   isBrowser: function() { return /* binding */ isBrowser; },
/* harmony export */   isCORSSupported: function() { return /* binding */ isCORSSupported; },
/* harmony export */   isDtHeaderValid: function() { return /* binding */ isDtHeaderValid; },
/* harmony export */   isFunction: function() { return /* binding */ isFunction; },
/* harmony export */   isObject: function() { return /* binding */ isObject; },
/* harmony export */   isPerfInteractionCountSupported: function() { return /* binding */ isPerfInteractionCountSupported; },
/* harmony export */   isPerfTimelineSupported: function() { return /* binding */ isPerfTimelineSupported; },
/* harmony export */   isPerfTypeSupported: function() { return /* binding */ isPerfTypeSupported; },
/* harmony export */   isPlatformSupported: function() { return /* binding */ isPlatformSupported; },
/* harmony export */   isRedirectInfoAvailable: function() { return /* binding */ isRedirectInfoAvailable; },
/* harmony export */   isUndefined: function() { return /* binding */ isUndefined; },
/* harmony export */   merge: function() { return /* binding */ merge; },
/* harmony export */   noop: function() { return /* binding */ noop; },
/* harmony export */   now: function() { return /* binding */ now; },
/* harmony export */   parseDtHeaderValue: function() { return /* binding */ parseDtHeaderValue; },
/* harmony export */   removeInvalidChars: function() { return /* binding */ removeInvalidChars; },
/* harmony export */   rng: function() { return /* binding */ rng; },
/* harmony export */   scheduleMacroTask: function() { return /* binding */ scheduleMacroTask; },
/* harmony export */   scheduleMicroTask: function() { return /* binding */ scheduleMicroTask; },
/* harmony export */   setLabel: function() { return /* binding */ setLabel; },
/* harmony export */   setRequestHeader: function() { return /* binding */ setRequestHeader; },
/* harmony export */   stripQueryStringFromUrl: function() { return /* binding */ stripQueryStringFromUrl; }
/* harmony export */ });
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "../rum-core/dist/es/common/polyfills.js");

var slice = [].slice;
var isBrowser = typeof window !== 'undefined';
var PERF = isBrowser && typeof performance !== 'undefined' ? performance : {};

function isCORSSupported() {
  var xhr = new window.XMLHttpRequest();
  return 'withCredentials' in xhr;
}

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToHex(buffer) {
  var hexOctets = [];

  for (var _i = 0; _i < buffer.length; _i++) {
    hexOctets.push(byteToHex[buffer[_i]]);
  }

  return hexOctets.join('');
}

var destination = new Uint8Array(16);

function rng() {
  if (typeof crypto != 'undefined' && typeof crypto.getRandomValues == 'function') {
    return crypto.getRandomValues(destination);
  } else if (typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function') {
    return msCrypto.getRandomValues(destination);
  }

  return destination;
}

function generateRandomId(length) {
  var id = bytesToHex(rng());
  return id.substr(0, length);
}

function getDtHeaderValue(span) {
  var dtVersion = '00';
  var dtUnSampledFlags = '00';
  var dtSampledFlags = '01';

  if (span && span.traceId && span.id && span.parentId) {
    var flags = span.sampled ? dtSampledFlags : dtUnSampledFlags;
    var id = span.sampled ? span.id : span.parentId;
    return dtVersion + '-' + span.traceId + '-' + id + '-' + flags;
  }
}

function parseDtHeaderValue(value) {
  var parsed = /^([\da-f]{2})-([\da-f]{32})-([\da-f]{16})-([\da-f]{2})$/.exec(value);

  if (parsed) {
    var flags = parsed[4];
    var sampled = flags !== '00';
    return {
      traceId: parsed[2],
      id: parsed[3],
      sampled: sampled
    };
  }
}

function isDtHeaderValid(header) {
  return /^[\da-f]{2}-[\da-f]{32}-[\da-f]{16}-[\da-f]{2}$/.test(header) && header.slice(3, 35) !== '00000000000000000000000000000000' && header.slice(36, 52) !== '0000000000000000';
}

function getTSHeaderValue(_ref) {
  var sampleRate = _ref.sampleRate;

  if (typeof sampleRate !== 'number' || String(sampleRate).length > 256) {
    return;
  }

  var NAMESPACE = 'es';
  var SEPARATOR = '=';
  return "" + NAMESPACE + SEPARATOR + "s:" + sampleRate;
}

function setRequestHeader(target, name, value) {
  if (typeof target.setRequestHeader === 'function') {
    target.setRequestHeader(name, value);
  } else if (target.headers && typeof target.headers.append === 'function') {
    target.headers.append(name, value);
  } else {
    target[name] = value;
  }
}

function checkSameOrigin(source, target) {
  var isSame = false;

  if (typeof target === 'string') {
    isSame = source === target;
  } else if (target && typeof target.test === 'function') {
    isSame = target.test(source);
  } else if (Array.isArray(target)) {
    target.forEach(function (t) {
      if (!isSame) {
        isSame = checkSameOrigin(source, t);
      }
    });
  }

  return isSame;
}

function isPlatformSupported() {
  return isBrowser && typeof Set === 'function' && typeof JSON.stringify === 'function' && PERF && typeof PERF.now === 'function' && isCORSSupported();
}

function setLabel(key, value, obj) {
  if (!obj || !key) return;
  var skey = removeInvalidChars(key);
  var valueType = typeof value;

  if (value != undefined && valueType !== 'boolean' && valueType !== 'number') {
    value = String(value);
  }

  obj[skey] = value;
  return obj;
}

function getServerTimingInfo(serverTimingEntries) {
  if (serverTimingEntries === void 0) {
    serverTimingEntries = [];
  }

  var serverTimingInfo = [];
  var entrySeparator = ', ';
  var valueSeparator = ';';

  for (var _i2 = 0; _i2 < serverTimingEntries.length; _i2++) {
    var _serverTimingEntries$ = serverTimingEntries[_i2],
        name = _serverTimingEntries$.name,
        duration = _serverTimingEntries$.duration,
        description = _serverTimingEntries$.description;
    var timingValue = name;

    if (description) {
      timingValue += valueSeparator + 'desc=' + description;
    }

    if (duration) {
      timingValue += valueSeparator + 'dur=' + duration;
    }

    serverTimingInfo.push(timingValue);
  }

  return serverTimingInfo.join(entrySeparator);
}

function getTimeOrigin() {
  return PERF.timing.fetchStart;
}

function stripQueryStringFromUrl(url) {
  return url && url.split('?')[0];
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function baseExtend(dst, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i];
    if (!isObject(obj) && !isFunction(obj)) continue;
    var keys = Object.keys(obj);

    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];

      if (deep && isObject(src)) {
        if (!isObject(dst[key])) dst[key] = Array.isArray(src) ? [] : {};
        baseExtend(dst[key], [src], false);
      } else {
        dst[key] = src;
      }
    }
  }

  return dst;
}

function getElasticScript() {
  if (typeof document !== 'undefined') {
    var scripts = document.getElementsByTagName('script');

    for (var i = 0, l = scripts.length; i < l; i++) {
      var sc = scripts[i];

      if (sc.src.indexOf('elastic') > 0) {
        return sc;
      }
    }
  }
}

function getCurrentScript() {
  if (typeof document !== 'undefined') {
    var currentScript = document.currentScript;

    if (!currentScript) {
      return getElasticScript();
    }

    return currentScript;
  }
}

function extend() {
  return baseExtend(Object.create(null), slice.call(arguments), false);
}

function merge() {
  return baseExtend(Object.create(null), slice.call(arguments), true);
}

function isUndefined(obj) {
  return typeof obj === 'undefined';
}

function noop() {}

function find(array, predicate, thisArg) {
  if (array == null) {
    throw new TypeError('array is null or not defined');
  }

  var o = Object(array);
  var len = o.length >>> 0;

  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }

  var k = 0;

  while (k < len) {
    var kValue = o[k];

    if (predicate.call(thisArg, kValue, k, o)) {
      return kValue;
    }

    k++;
  }

  return undefined;
}

function removeInvalidChars(key) {
  return key.replace(/[.*"]/g, '_');
}

function getLatestSpan(spans, typeFilter) {
  var latestSpan = null;

  for (var _i3 = 0; _i3 < spans.length; _i3++) {
    var span = spans[_i3];

    if (typeFilter && typeFilter(span.type) && (!latestSpan || latestSpan._end < span._end)) {
      latestSpan = span;
    }
  }

  return latestSpan;
}

function getLatestNonXHRSpan(spans) {
  return getLatestSpan(spans, function (type) {
    return String(type).indexOf('external') === -1;
  });
}

function getLatestXHRSpan(spans) {
  return getLatestSpan(spans, function (type) {
    return String(type).indexOf('external') !== -1;
  });
}

function getEarliestSpan(spans) {
  var earliestSpan = spans[0];

  for (var _i4 = 1; _i4 < spans.length; _i4++) {
    var span = spans[_i4];

    if (earliestSpan._start > span._start) {
      earliestSpan = span;
    }
  }

  return earliestSpan;
}

function now() {
  return PERF.now();
}

function getTime(time) {
  return typeof time === 'number' && time >= 0 ? time : now();
}

function getDuration(start, end) {
  if (isUndefined(end) || isUndefined(start)) {
    return null;
  }

  return parseInt(end - start);
}

function scheduleMacroTask(callback) {
  setTimeout(callback, 0);
}

function scheduleMicroTask(callback) {
  _polyfills__WEBPACK_IMPORTED_MODULE_0__.Promise.resolve().then(callback);
}

function isPerfTimelineSupported() {
  return typeof PERF.getEntriesByType === 'function';
}

function isPerfTypeSupported(type) {
  return typeof PerformanceObserver !== 'undefined' && PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.indexOf(type) >= 0;
}

function isPerfInteractionCountSupported() {
  return 'interactionCount' in performance;
}

function isBeaconInspectionEnabled() {
  var flagName = '_elastic_inspect_beacon_';

  if (sessionStorage.getItem(flagName) != null) {
    return true;
  }

  if (!window.URL || !window.URLSearchParams) {
    return false;
  }

  try {
    var parsedUrl = new URL(window.location.href);
    var isFlagSet = parsedUrl.searchParams.has(flagName);

    if (isFlagSet) {
      sessionStorage.setItem(flagName, true);
    }

    return isFlagSet;
  } catch (e) {}

  return false;
}

function isRedirectInfoAvailable(timing) {
  return timing.redirectStart > 0;
}



/***/ }),

/***/ "../rum-core/dist/es/error-logging/error-logging.js":
/*!**********************************************************!*\
  !*** ../rum-core/dist/es/error-logging/error-logging.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stack_trace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stack-trace */ "../rum-core/dist/es/error-logging/stack-trace.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/context */ "../rum-core/dist/es/common/context.js");
/* harmony import */ var _common_truncate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/truncate */ "../rum-core/dist/es/common/truncate.js");
/* harmony import */ var error_stack_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! error-stack-parser */ "../../node_modules/error-stack-parser/error-stack-parser.js");
/* harmony import */ var error_stack_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(error_stack_parser__WEBPACK_IMPORTED_MODULE_0__);
var _excluded = ["tags"];

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}






var IGNORE_KEYS = ['stack', 'message'];
var PROMISE_REJECTION_PREFIX = 'Unhandled promise rejection: ';

function getErrorProperties(error) {
  var propertyFound = false;
  var properties = {};
  Object.keys(error).forEach(function (key) {
    if (IGNORE_KEYS.indexOf(key) >= 0) {
      return;
    }

    var val = error[key];

    if (val == null || typeof val === 'function') {
      return;
    }

    if (typeof val === 'object') {
      if (typeof val.toISOString !== 'function') return;
      val = val.toISOString();
    }

    properties[key] = val;
    propertyFound = true;
  });

  if (propertyFound) {
    return properties;
  }
}

var ErrorLogging = function () {
  function ErrorLogging(apmServer, configService, transactionService) {
    this._apmServer = apmServer;
    this._configService = configService;
    this._transactionService = transactionService;
  }

  var _proto = ErrorLogging.prototype;

  _proto.createErrorDataModel = function createErrorDataModel(errorEvent, opts) {
    var frames = (0,_stack_trace__WEBPACK_IMPORTED_MODULE_1__.createStackTraces)((error_stack_parser__WEBPACK_IMPORTED_MODULE_0___default()), errorEvent);
    var filteredFrames = (0,_stack_trace__WEBPACK_IMPORTED_MODULE_1__.filterInvalidFrames)(frames);
    var culprit = '(inline script)';
    var lastFrame = filteredFrames[filteredFrames.length - 1];

    if (lastFrame && lastFrame.filename) {
      culprit = lastFrame.filename;
    }

    var message = errorEvent.message,
        error = errorEvent.error;
    var errorMessage = message;
    var errorType = '';
    var errorContext = {};

    if (error && typeof error === 'object') {
      errorMessage = errorMessage || error.message;
      errorType = error.name;
      var customProperties = getErrorProperties(error);

      if (customProperties) {
        errorContext.custom = customProperties;
      }
    }

    if (opts && opts.labels) {
      var keys = Object.keys(opts.labels);
      errorContext.tags = {};
      keys.forEach(function (k) {
        return (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.setLabel)(k, opts.labels[k], errorContext.tags);
      });
    }

    if (!errorType) {
      if (errorMessage && errorMessage.indexOf(':') > -1) {
        errorType = errorMessage.split(':')[0];
      }
    }

    var currentTransaction = this._transactionService.getCurrentTransaction();

    var transactionContext = currentTransaction ? currentTransaction.context : {};

    var _this$_configService$ = this._configService.get('context'),
        tags = _this$_configService$.tags,
        configContext = _objectWithoutPropertiesLoose(_this$_configService$, _excluded);

    var pageContext = (0,_common_context__WEBPACK_IMPORTED_MODULE_3__.getPageContext)();
    var context = (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.merge)({}, pageContext, transactionContext, configContext, errorContext);
    var errorObject = {
      id: (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.generateRandomId)(),
      culprit: culprit,
      exception: {
        message: errorMessage,
        stacktrace: filteredFrames,
        type: errorType
      },
      context: context
    };

    if (currentTransaction) {
      errorObject = (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.extend)(errorObject, {
        trace_id: currentTransaction.traceId,
        parent_id: currentTransaction.id,
        transaction_id: currentTransaction.id,
        transaction: {
          type: currentTransaction.type,
          sampled: currentTransaction.sampled
        }
      });
    }

    return (0,_common_truncate__WEBPACK_IMPORTED_MODULE_4__.truncateModel)(_common_truncate__WEBPACK_IMPORTED_MODULE_4__.ERROR_MODEL, errorObject);
  };

  _proto.logErrorEvent = function logErrorEvent(errorEvent, opts) {
    if (typeof errorEvent === 'undefined') {
      return;
    }

    var errorObject = this.createErrorDataModel(errorEvent, opts);

    if (typeof errorObject.exception.message === 'undefined') {
      return;
    }

    this._apmServer.addError(errorObject);
  };

  _proto.registerListeners = function registerListeners() {
    var _this = this;

    window.addEventListener('error', function (errorEvent) {
      return _this.logErrorEvent(errorEvent);
    });
    window.addEventListener('unhandledrejection', function (promiseRejectionEvent) {
      return _this.logPromiseEvent(promiseRejectionEvent);
    });
  };

  _proto.logPromiseEvent = function logPromiseEvent(promiseRejectionEvent) {
    var reason = promiseRejectionEvent.reason;

    if (reason == null) {
      reason = '<no reason specified>';
    }

    var errorEvent;

    if (typeof reason.message === 'string') {
      var name = reason.name ? reason.name + ': ' : '';
      errorEvent = {
        error: reason,
        message: PROMISE_REJECTION_PREFIX + name + reason.message
      };
    } else {
      errorEvent = this._parseRejectReason(reason);
    }

    this.logErrorEvent(errorEvent);
  };

  _proto.logError = function logError(messageOrError, opts) {
    var errorEvent = {};

    if (typeof messageOrError === 'string') {
      errorEvent.message = messageOrError;
    } else {
      errorEvent.error = messageOrError;
    }

    return this.logErrorEvent(errorEvent, opts);
  };

  _proto._parseRejectReason = function _parseRejectReason(reason) {
    var errorEvent = {
      message: PROMISE_REJECTION_PREFIX
    };

    if (Array.isArray(reason)) {
      errorEvent.message += '<object>';
    } else if (typeof reason === 'object') {
      try {
        errorEvent.message += JSON.stringify(reason);
        errorEvent.error = reason;
      } catch (error) {
        errorEvent.message += '<object>';
      }
    } else if (typeof reason === 'function') {
      errorEvent.message += '<function>';
    } else {
      errorEvent.message += reason;
    }

    return errorEvent;
  };

  return ErrorLogging;
}();

/* harmony default export */ __webpack_exports__["default"] = (ErrorLogging);

/***/ }),

/***/ "../rum-core/dist/es/error-logging/index.js":
/*!**************************************************!*\
  !*** ../rum-core/dist/es/error-logging/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerServices: function() { return /* binding */ registerServices; }
/* harmony export */ });
/* harmony import */ var _error_logging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error-logging */ "../rum-core/dist/es/error-logging/error-logging.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _common_service_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/service-factory */ "../rum-core/dist/es/common/service-factory.js");




function registerServices() {
  _common_service_factory__WEBPACK_IMPORTED_MODULE_0__.serviceCreators[_common_constants__WEBPACK_IMPORTED_MODULE_1__.ERROR_LOGGING] = function (serviceFactory) {
    var _serviceFactory$getSe = serviceFactory.getService([_common_constants__WEBPACK_IMPORTED_MODULE_1__.APM_SERVER, _common_constants__WEBPACK_IMPORTED_MODULE_1__.CONFIG_SERVICE, _common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_SERVICE]),
        apmServer = _serviceFactory$getSe[0],
        configService = _serviceFactory$getSe[1],
        transactionService = _serviceFactory$getSe[2];

    return new _error_logging__WEBPACK_IMPORTED_MODULE_2__["default"](apmServer, configService, transactionService);
  };
}



/***/ }),

/***/ "../rum-core/dist/es/error-logging/stack-trace.js":
/*!********************************************************!*\
  !*** ../rum-core/dist/es/error-logging/stack-trace.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStackTraces: function() { return /* binding */ createStackTraces; },
/* harmony export */   filterInvalidFrames: function() { return /* binding */ filterInvalidFrames; }
/* harmony export */ });
function filePathToFileName(fileUrl) {
  var origin = window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

  if (fileUrl.indexOf(origin) > -1) {
    fileUrl = fileUrl.replace(origin + '/', '');
  }

  return fileUrl;
}

function cleanFilePath(filePath) {
  if (filePath === void 0) {
    filePath = '';
  }

  if (filePath === '<anonymous>') {
    filePath = '';
  }

  return filePath;
}

function isFileInline(fileUrl) {
  if (fileUrl) {
    return window.location.href.indexOf(fileUrl) === 0;
  }

  return false;
}

function normalizeStackFrames(stackFrames) {
  return stackFrames.map(function (frame) {
    if (frame.functionName) {
      frame.functionName = normalizeFunctionName(frame.functionName);
    }

    return frame;
  });
}

function normalizeFunctionName(fnName) {
  var parts = fnName.split('/');

  if (parts.length > 1) {
    fnName = ['Object', parts[parts.length - 1]].join('.');
  } else {
    fnName = parts[0];
  }

  fnName = fnName.replace(/.<$/gi, '.<anonymous>');
  fnName = fnName.replace(/^Anonymous function$/, '<anonymous>');
  parts = fnName.split('.');

  if (parts.length > 1) {
    fnName = parts[parts.length - 1];
  } else {
    fnName = parts[0];
  }

  return fnName;
}

function isValidStackTrace(stackTraces) {
  if (stackTraces.length === 0) {
    return false;
  }

  if (stackTraces.length === 1) {
    var stackTrace = stackTraces[0];
    return 'lineNumber' in stackTrace;
  }

  return true;
}

function createStackTraces(stackParser, errorEvent) {
  var error = errorEvent.error,
      filename = errorEvent.filename,
      lineno = errorEvent.lineno,
      colno = errorEvent.colno;
  var stackTraces = [];

  if (error) {
    try {
      stackTraces = stackParser.parse(error);
    } catch (e) {}
  }

  if (!isValidStackTrace(stackTraces)) {
    stackTraces = [{
      fileName: filename,
      lineNumber: lineno,
      columnNumber: colno
    }];
  }

  var normalizedStackTraces = normalizeStackFrames(stackTraces);
  return normalizedStackTraces.map(function (stack) {
    var fileName = stack.fileName,
        lineNumber = stack.lineNumber,
        columnNumber = stack.columnNumber,
        _stack$functionName = stack.functionName,
        functionName = _stack$functionName === void 0 ? '<anonymous>' : _stack$functionName;

    if (!fileName && !lineNumber) {
      return {};
    }

    if (!columnNumber && !lineNumber) {
      return {};
    }

    var filePath = cleanFilePath(fileName);
    var cleanedFileName = filePathToFileName(filePath);

    if (isFileInline(filePath)) {
      cleanedFileName = '(inline script)';
    }

    return {
      abs_path: fileName,
      filename: cleanedFileName,
      function: functionName,
      lineno: lineNumber,
      colno: columnNumber
    };
  });
}
function filterInvalidFrames(frames) {
  return frames.filter(function (_ref) {
    var filename = _ref.filename,
        lineno = _ref.lineno;
    return typeof filename !== 'undefined' && typeof lineno !== 'undefined';
  });
}

/***/ }),

/***/ "../rum-core/dist/es/index.js":
/*!************************************!*\
  !*** ../rum-core/dist/es/index.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APM_SERVER: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.APM_SERVER; },
/* harmony export */   CLICK: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.CLICK; },
/* harmony export */   CONFIG_SERVICE: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.CONFIG_SERVICE; },
/* harmony export */   ERROR: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR; },
/* harmony export */   ERROR_LOGGING: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR_LOGGING; },
/* harmony export */   EVENT_TARGET: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.EVENT_TARGET; },
/* harmony export */   LOGGING_SERVICE: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.LOGGING_SERVICE; },
/* harmony export */   PAGE_LOAD: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.PAGE_LOAD; },
/* harmony export */   PAGE_LOAD_DELAY: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.PAGE_LOAD_DELAY; },
/* harmony export */   PERFORMANCE_MONITORING: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.PERFORMANCE_MONITORING; },
/* harmony export */   ServiceFactory: function() { return /* reexport safe */ _common_service_factory__WEBPACK_IMPORTED_MODULE_2__.ServiceFactory; },
/* harmony export */   TRANSACTION_SERVICE: function() { return /* reexport safe */ _common_constants__WEBPACK_IMPORTED_MODULE_8__.TRANSACTION_SERVICE; },
/* harmony export */   afterFrame: function() { return /* reexport safe */ _common_after_frame__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   bootstrap: function() { return /* reexport safe */ _bootstrap__WEBPACK_IMPORTED_MODULE_10__.bootstrap; },
/* harmony export */   createServiceFactory: function() { return /* binding */ createServiceFactory; },
/* harmony export */   createTracer: function() { return /* reexport safe */ _opentracing__WEBPACK_IMPORTED_MODULE_6__.createTracer; },
/* harmony export */   getInstrumentationFlags: function() { return /* reexport safe */ _common_instrument__WEBPACK_IMPORTED_MODULE_5__.getInstrumentationFlags; },
/* harmony export */   isBrowser: function() { return /* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_4__.isBrowser; },
/* harmony export */   isPlatformSupported: function() { return /* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_4__.isPlatformSupported; },
/* harmony export */   observePageClicks: function() { return /* reexport safe */ _common_observers__WEBPACK_IMPORTED_MODULE_12__.observePageClicks; },
/* harmony export */   observePageVisibility: function() { return /* reexport safe */ _common_observers__WEBPACK_IMPORTED_MODULE_11__.observePageVisibility; },
/* harmony export */   observeUserInteractions: function() { return /* reexport safe */ _performance_monitoring__WEBPACK_IMPORTED_MODULE_9__.observeUserInteractions; },
/* harmony export */   patchAll: function() { return /* reexport safe */ _common_patching__WEBPACK_IMPORTED_MODULE_3__.patchAll; },
/* harmony export */   patchEventHandler: function() { return /* reexport safe */ _common_patching__WEBPACK_IMPORTED_MODULE_3__.patchEventHandler; },
/* harmony export */   scheduleMacroTask: function() { return /* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_4__.scheduleMacroTask; },
/* harmony export */   scheduleMicroTask: function() { return /* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_4__.scheduleMicroTask; }
/* harmony export */ });
/* harmony import */ var _error_logging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error-logging */ "../rum-core/dist/es/error-logging/index.js");
/* harmony import */ var _performance_monitoring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./performance-monitoring */ "../rum-core/dist/es/performance-monitoring/index.js");
/* harmony import */ var _performance_monitoring__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./performance-monitoring */ "../rum-core/dist/es/performance-monitoring/metrics/inp/process.js");
/* harmony import */ var _common_service_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/service-factory */ "../rum-core/dist/es/common/service-factory.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_patching__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/patching */ "../rum-core/dist/es/common/patching/index.js");
/* harmony import */ var _common_observers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common/observers */ "../rum-core/dist/es/common/observers/page-visibility.js");
/* harmony import */ var _common_observers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/observers */ "../rum-core/dist/es/common/observers/page-clicks.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _common_instrument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/instrument */ "../rum-core/dist/es/common/instrument.js");
/* harmony import */ var _common_after_frame__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/after-frame */ "../rum-core/dist/es/common/after-frame.js");
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bootstrap */ "../rum-core/dist/es/bootstrap.js");
/* harmony import */ var _opentracing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./opentracing */ "../rum-core/dist/es/opentracing/index.js");












function createServiceFactory() {
  (0,_performance_monitoring__WEBPACK_IMPORTED_MODULE_0__.registerServices)();
  (0,_error_logging__WEBPACK_IMPORTED_MODULE_1__.registerServices)();
  var serviceFactory = new _common_service_factory__WEBPACK_IMPORTED_MODULE_2__.ServiceFactory();
  return serviceFactory;
}



/***/ }),

/***/ "../rum-core/dist/es/opentracing/index.js":
/*!************************************************!*\
  !*** ../rum-core/dist/es/opentracing/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Span: function() { return /* reexport safe */ _span__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   Tracer: function() { return /* reexport safe */ _tracer__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   createTracer: function() { return /* binding */ createTracer; }
/* harmony export */ });
/* harmony import */ var _tracer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tracer */ "../rum-core/dist/es/opentracing/tracer.js");
/* harmony import */ var _span__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./span */ "../rum-core/dist/es/opentracing/span.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");




function createTracer(serviceFactory) {
  var performanceMonitoring = serviceFactory.getService(_common_constants__WEBPACK_IMPORTED_MODULE_0__.PERFORMANCE_MONITORING);
  var transactionService = serviceFactory.getService(_common_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_SERVICE);
  var errorLogging = serviceFactory.getService(_common_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_LOGGING);
  var loggingService = serviceFactory.getService(_common_constants__WEBPACK_IMPORTED_MODULE_0__.LOGGING_SERVICE);
  return new _tracer__WEBPACK_IMPORTED_MODULE_1__["default"](performanceMonitoring, transactionService, loggingService, errorLogging);
}



/***/ }),

/***/ "../rum-core/dist/es/opentracing/span.js":
/*!***********************************************!*\
  !*** ../rum-core/dist/es/opentracing/span.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var opentracing_lib_span__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! opentracing/lib/span */ "../../node_modules/opentracing/lib/span.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _performance_monitoring_transaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../performance-monitoring/transaction */ "../rum-core/dist/es/performance-monitoring/transaction.js");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}





var Span = function (_otSpan) {
  _inheritsLoose(Span, _otSpan);

  function Span(tracer, span) {
    var _this;

    _this = _otSpan.call(this) || this;
    _this.__tracer = tracer;
    _this.span = span;
    _this.isTransaction = span instanceof _performance_monitoring_transaction__WEBPACK_IMPORTED_MODULE_1__["default"];
    _this.spanContext = {
      id: span.id,
      traceId: span.traceId,
      sampled: span.sampled
    };
    return _this;
  }

  var _proto = Span.prototype;

  _proto._context = function _context() {
    return this.spanContext;
  };

  _proto._tracer = function _tracer() {
    return this.__tracer;
  };

  _proto._setOperationName = function _setOperationName(name) {
    this.span.name = name;
  };

  _proto._addTags = function _addTags(keyValuePairs) {
    var tags = (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.extend)({}, keyValuePairs);

    if (tags.type) {
      this.span.type = tags.type;
      delete tags.type;
    }

    if (this.isTransaction) {
      var userId = tags['user.id'];
      var username = tags['user.username'];
      var email = tags['user.email'];

      if (userId || username || email) {
        this.span.addContext({
          user: {
            id: userId,
            username: username,
            email: email
          }
        });
        delete tags['user.id'];
        delete tags['user.username'];
        delete tags['user.email'];
      }
    }

    this.span.addLabels(tags);
  };

  _proto._log = function _log(log, timestamp) {
    if (log.event === 'error') {
      if (log['error.object']) {
        this.__tracer.errorLogging.logError(log['error.object']);
      } else if (log.message) {
        this.__tracer.errorLogging.logError(log.message);
      }
    }
  };

  _proto._finish = function _finish(finishTime) {
    this.span.end();

    if (finishTime) {
      this.span._end = finishTime - (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.getTimeOrigin)();
    }
  };

  return Span;
}(opentracing_lib_span__WEBPACK_IMPORTED_MODULE_0__.Span);

/* harmony default export */ __webpack_exports__["default"] = (Span);

/***/ }),

/***/ "../rum-core/dist/es/opentracing/tracer.js":
/*!*************************************************!*\
  !*** ../rum-core/dist/es/opentracing/tracer.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var opentracing_lib_tracer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! opentracing/lib/tracer */ "../../node_modules/opentracing/lib/tracer.js");
/* harmony import */ var opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! opentracing/lib/constants */ "../../node_modules/opentracing/lib/constants.js");
/* harmony import */ var opentracing_lib_span__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! opentracing/lib/span */ "../../node_modules/opentracing/lib/span.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state */ "../rum-core/dist/es/state.js");
/* harmony import */ var _span__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./span */ "../rum-core/dist/es/opentracing/span.js");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}








var Tracer = function (_otTracer) {
  _inheritsLoose(Tracer, _otTracer);

  function Tracer(performanceMonitoring, transactionService, loggingService, errorLogging) {
    var _this;

    _this = _otTracer.call(this) || this;
    _this.performanceMonitoring = performanceMonitoring;
    _this.transactionService = transactionService;
    _this.loggingService = loggingService;
    _this.errorLogging = errorLogging;
    return _this;
  }

  var _proto = Tracer.prototype;

  _proto._startSpan = function _startSpan(name, options) {
    var spanOptions = {
      managed: true
    };

    if (options) {
      spanOptions.timestamp = options.startTime;

      if (options.childOf) {
        spanOptions.parentId = options.childOf.id;
      } else if (options.references && options.references.length > 0) {
        if (options.references.length > 1) {
          if (_state__WEBPACK_IMPORTED_MODULE_3__.__DEV__) {
            this.loggingService.debug('Elastic APM OpenTracing: Unsupported number of references, only the first childOf reference will be recorded.');
          }
        }

        var childRef = (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.find)(options.references, function (ref) {
          return ref.type() === opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__.REFERENCE_CHILD_OF;
        });

        if (childRef) {
          spanOptions.parentId = childRef.referencedContext().id;
        }
      }
    }

    var span;
    var currentTransaction = this.transactionService.getCurrentTransaction();

    if (currentTransaction) {
      span = this.transactionService.startSpan(name, undefined, spanOptions);
    } else {
      span = this.transactionService.startTransaction(name, undefined, spanOptions);
    }

    if (!span) {
      return new opentracing_lib_span__WEBPACK_IMPORTED_MODULE_2__.Span();
    }

    if (spanOptions.timestamp) {
      span._start = spanOptions.timestamp - (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getTimeOrigin)();
    }

    var otSpan = new _span__WEBPACK_IMPORTED_MODULE_5__["default"](this, span);

    if (options && options.tags) {
      otSpan.addTags(options.tags);
    }

    return otSpan;
  };

  _proto._inject = function _inject(spanContext, format, carrier) {
    switch (format) {
      case opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__.FORMAT_TEXT_MAP:
      case opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__.FORMAT_HTTP_HEADERS:
        this.performanceMonitoring.injectDtHeader(spanContext, carrier);
        break;

      case opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__.FORMAT_BINARY:
        if (_state__WEBPACK_IMPORTED_MODULE_3__.__DEV__) {
          this.loggingService.debug('Elastic APM OpenTracing: binary carrier format is not supported.');
        }

        break;
    }
  };

  _proto._extract = function _extract(format, carrier) {
    var ctx;

    switch (format) {
      case opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__.FORMAT_TEXT_MAP:
      case opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__.FORMAT_HTTP_HEADERS:
        ctx = this.performanceMonitoring.extractDtHeader(carrier);
        break;

      case opentracing_lib_constants__WEBPACK_IMPORTED_MODULE_1__.FORMAT_BINARY:
        if (_state__WEBPACK_IMPORTED_MODULE_3__.__DEV__) {
          this.loggingService.debug('Elastic APM OpenTracing: binary carrier format is not supported.');
        }

        break;
    }

    if (!ctx) {
      ctx = null;
    }

    return ctx;
  };

  return Tracer;
}(opentracing_lib_tracer__WEBPACK_IMPORTED_MODULE_0__.Tracer);

/* harmony default export */ __webpack_exports__["default"] = (Tracer);

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/breakdown.js":
/*!***************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/breakdown.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureBreakdown: function() { return /* binding */ captureBreakdown; }
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");


var pageLoadBreakdowns = [['domainLookupStart', 'domainLookupEnd', 'DNS'], ['connectStart', 'connectEnd', 'TCP'], ['requestStart', 'responseStart', 'Request'], ['responseStart', 'responseEnd', 'Response'], ['domLoading', 'domComplete', 'Processing'], ['loadEventStart', 'loadEventEnd', 'Load']];

function getValue(value) {
  return {
    value: value
  };
}

function calculateSelfTime(transaction) {
  var spans = transaction.spans,
      _start = transaction._start,
      _end = transaction._end;

  if (spans.length === 0) {
    return transaction.duration();
  }

  spans.sort(function (span1, span2) {
    return span1._start - span2._start;
  });
  var span = spans[0];
  var spanEnd = span._end;
  var spanStart = span._start;
  var lastContinuousEnd = spanEnd;
  var selfTime = spanStart - _start;

  for (var i = 1; i < spans.length; i++) {
    span = spans[i];
    spanStart = span._start;
    spanEnd = span._end;

    if (spanStart > lastContinuousEnd) {
      selfTime += spanStart - lastContinuousEnd;
      lastContinuousEnd = spanEnd;
    } else if (spanEnd > lastContinuousEnd) {
      lastContinuousEnd = spanEnd;
    }
  }

  if (lastContinuousEnd < _end) {
    selfTime += _end - lastContinuousEnd;
  }

  return selfTime;
}

function groupSpans(transaction) {
  var spanMap = {};
  var transactionSelfTime = calculateSelfTime(transaction);
  spanMap['app'] = {
    count: 1,
    duration: transactionSelfTime
  };
  var spans = transaction.spans;

  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var duration = span.duration();

    if (duration === 0 || duration == null) {
      continue;
    }

    var type = span.type,
        subtype = span.subtype;
    var key = type.replace(_common_constants__WEBPACK_IMPORTED_MODULE_0__.TRUNCATED_TYPE, '');

    if (subtype) {
      key += '.' + subtype;
    }

    if (!spanMap[key]) {
      spanMap[key] = {
        duration: 0,
        count: 0
      };
    }

    spanMap[key].count++;
    spanMap[key].duration += duration;
  }

  return spanMap;
}

function getSpanBreakdown(transactionDetails, _ref) {
  var details = _ref.details,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count,
      duration = _ref.duration;
  return {
    transaction: transactionDetails,
    span: details,
    samples: {
      'span.self_time.count': getValue(count),
      'span.self_time.sum.us': getValue(duration * 1000)
    }
  };
}

function captureBreakdown(transaction, timings) {
  if (timings === void 0) {
    timings = _common_utils__WEBPACK_IMPORTED_MODULE_1__.PERF.timing;
  }

  var breakdowns = [];
  var name = transaction.name,
      type = transaction.type,
      sampled = transaction.sampled;
  var transactionDetails = {
    name: name,
    type: type
  };

  if (!sampled) {
    return breakdowns;
  }

  if (type === _common_constants__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD && timings) {
    for (var i = 0; i < pageLoadBreakdowns.length; i++) {
      var current = pageLoadBreakdowns[i];
      var start = timings[current[0]];
      var end = timings[current[1]];
      var duration = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getDuration)(start, end);

      if (duration === 0 || duration == null) {
        continue;
      }

      breakdowns.push(getSpanBreakdown(transactionDetails, {
        details: {
          type: current[2]
        },
        duration: duration
      }));
    }
  } else {
    var spanMap = groupSpans(transaction);
    Object.keys(spanMap).forEach(function (key) {
      var _key$split = key.split('.'),
          type = _key$split[0],
          subtype = _key$split[1];

      var _spanMap$key = spanMap[key],
          duration = _spanMap$key.duration,
          count = _spanMap$key.count;
      breakdowns.push(getSpanBreakdown(transactionDetails, {
        details: {
          type: type,
          subtype: subtype
        },
        duration: duration,
        count: count
      }));
    });
  }

  return breakdowns;
}

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/index.js":
/*!***********************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/index.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeUserInteractions: function() { return /* reexport safe */ _metrics_inp_process__WEBPACK_IMPORTED_MODULE_4__.observeUserInteractions; },
/* harmony export */   registerServices: function() { return /* binding */ registerServices; },
/* harmony export */   reportInp: function() { return /* reexport safe */ _metrics_inp_report__WEBPACK_IMPORTED_MODULE_5__.reportInp; }
/* harmony export */ });
/* harmony import */ var _performance_monitoring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./performance-monitoring */ "../rum-core/dist/es/performance-monitoring/performance-monitoring.js");
/* harmony import */ var _transaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transaction-service */ "../rum-core/dist/es/performance-monitoring/transaction-service.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _common_service_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/service-factory */ "../rum-core/dist/es/common/service-factory.js");
/* harmony import */ var _metrics_inp_process__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metrics/inp/process */ "../rum-core/dist/es/performance-monitoring/metrics/inp/process.js");
/* harmony import */ var _metrics_inp_report__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./metrics/inp/report */ "../rum-core/dist/es/performance-monitoring/metrics/inp/report.js");







function registerServices() {
  _common_service_factory__WEBPACK_IMPORTED_MODULE_0__.serviceCreators[_common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_SERVICE] = function (serviceFactory) {
    var _serviceFactory$getSe = serviceFactory.getService([_common_constants__WEBPACK_IMPORTED_MODULE_1__.LOGGING_SERVICE, _common_constants__WEBPACK_IMPORTED_MODULE_1__.CONFIG_SERVICE]),
        loggingService = _serviceFactory$getSe[0],
        configService = _serviceFactory$getSe[1];

    return new _transaction_service__WEBPACK_IMPORTED_MODULE_2__["default"](loggingService, configService);
  };

  _common_service_factory__WEBPACK_IMPORTED_MODULE_0__.serviceCreators[_common_constants__WEBPACK_IMPORTED_MODULE_1__.PERFORMANCE_MONITORING] = function (serviceFactory) {
    var _serviceFactory$getSe2 = serviceFactory.getService([_common_constants__WEBPACK_IMPORTED_MODULE_1__.APM_SERVER, _common_constants__WEBPACK_IMPORTED_MODULE_1__.CONFIG_SERVICE, _common_constants__WEBPACK_IMPORTED_MODULE_1__.LOGGING_SERVICE, _common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_SERVICE]),
        apmServer = _serviceFactory$getSe2[0],
        configService = _serviceFactory$getSe2[1],
        loggingService = _serviceFactory$getSe2[2],
        transactionService = _serviceFactory$getSe2[3];

    return new _performance_monitoring__WEBPACK_IMPORTED_MODULE_3__["default"](apmServer, configService, loggingService, transactionService);
  };
}



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/metrics/inp/process.js":
/*!*************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/metrics/inp/process.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateInp: function() { return /* binding */ calculateInp; },
/* harmony export */   inpState: function() { return /* binding */ inpState; },
/* harmony export */   interactionCount: function() { return /* binding */ interactionCount; },
/* harmony export */   observeUserInteractions: function() { return /* binding */ observeUserInteractions; },
/* harmony export */   processUserInteractions: function() { return /* binding */ processUserInteractions; },
/* harmony export */   restoreINPState: function() { return /* binding */ restoreINPState; }
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _metrics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../metrics */ "../rum-core/dist/es/performance-monitoring/metrics/metrics.js");



var INP_THRESHOLD = 40;
var MAX_INTERACTIONS_TO_CONSIDER = 10;
var inpState = {
  minInteractionId: Infinity,
  maxInteractionId: 0,
  interactionCount: 0,
  longestInteractions: []
};
function observeUserInteractions(recorder) {
  if (recorder === void 0) {
    recorder = new _metrics__WEBPACK_IMPORTED_MODULE_0__.PerfEntryRecorder(processUserInteractions);
  }

  var isPerfCountSupported = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isPerfInteractionCountSupported)();
  var durationThreshold = isPerfCountSupported ? INP_THRESHOLD : 16;
  recorder.start(_common_constants__WEBPACK_IMPORTED_MODULE_2__.EVENT, {
    buffered: true,
    durationThreshold: durationThreshold
  });

  if (!isPerfCountSupported) {
    recorder.start(_common_constants__WEBPACK_IMPORTED_MODULE_2__.FIRST_INPUT);
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
  if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isPerfInteractionCountSupported)()) {
    return;
  }

  inpState.minInteractionId = Math.min(inpState.minInteractionId, entry.interactionId);
  inpState.maxInteractionId = Math.max(inpState.maxInteractionId, entry.interactionId);
  inpState.interactionCount = (inpState.maxInteractionId - inpState.minInteractionId) / 7 + 1;
}

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/metrics/inp/report.js":
/*!************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/metrics/inp/report.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reportInp: function() { return /* binding */ reportInp; }
/* harmony export */ });
/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./process */ "../rum-core/dist/es/performance-monitoring/metrics/inp/process.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/constants */ "../rum-core/dist/es/common/constants.js");



function reportInp(transactionService) {
  var inp = (0,_process__WEBPACK_IMPORTED_MODULE_0__.calculateInp)();

  if (inp >= 0) {
    var startTime = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.now)();
    var inpTr = transactionService.startTransaction(_common_constants__WEBPACK_IMPORTED_MODULE_2__.PAGE_EXIT, _common_constants__WEBPACK_IMPORTED_MODULE_2__.PAGE_EXIT, {
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
    (0,_process__WEBPACK_IMPORTED_MODULE_0__.restoreINPState)();
    return inpTr;
  }
}

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/metrics/metrics.js":
/*!*********************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/metrics/metrics.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerfEntryRecorder: function() { return /* binding */ PerfEntryRecorder; },
/* harmony export */   calculateCumulativeLayoutShift: function() { return /* binding */ calculateCumulativeLayoutShift; },
/* harmony export */   calculateTotalBlockingTime: function() { return /* binding */ calculateTotalBlockingTime; },
/* harmony export */   captureObserverEntries: function() { return /* binding */ captureObserverEntries; },
/* harmony export */   createFirstInputDelaySpan: function() { return /* binding */ createFirstInputDelaySpan; },
/* harmony export */   createLongTaskSpans: function() { return /* binding */ createLongTaskSpans; },
/* harmony export */   createTotalBlockingTimeSpan: function() { return /* binding */ createTotalBlockingTimeSpan; },
/* harmony export */   metrics: function() { return /* binding */ metrics; }
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _span__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../span */ "../rum-core/dist/es/performance-monitoring/span.js");
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}




var metrics = {
  fid: 0,
  fcp: 0,
  tbt: {
    start: Infinity,
    duration: 0
  },
  cls: {
    score: 0,
    firstEntryTime: Number.NEGATIVE_INFINITY,
    prevEntryTime: Number.NEGATIVE_INFINITY,
    currentSessionScore: 0
  },
  longtask: {
    count: 0,
    duration: 0,
    max: 0
  }
};
var LONG_TASK_THRESHOLD = 50;
function createLongTaskSpans(longtasks, agg) {
  var spans = [];

  for (var i = 0; i < longtasks.length; i++) {
    var _longtasks$i = longtasks[i],
        name = _longtasks$i.name,
        startTime = _longtasks$i.startTime,
        duration = _longtasks$i.duration,
        attribution = _longtasks$i.attribution;
    var end = startTime + duration;
    var span = new _span__WEBPACK_IMPORTED_MODULE_0__["default"]("Longtask(" + name + ")", _common_constants__WEBPACK_IMPORTED_MODULE_1__.LONG_TASK, {
      startTime: startTime
    });
    agg.count++;
    agg.duration += duration;
    agg.max = Math.max(duration, agg.max);

    if (attribution.length > 0) {
      var _attribution$ = attribution[0],
          _name = _attribution$.name,
          containerType = _attribution$.containerType,
          containerName = _attribution$.containerName,
          containerId = _attribution$.containerId;
      var customContext = {
        attribution: _name,
        type: containerType
      };

      if (containerName) {
        customContext.name = containerName;
      }

      if (containerId) {
        customContext.id = containerId;
      }

      span.addContext({
        custom: customContext
      });
    }

    span.end(end);
    spans.push(span);
  }

  return spans;
}
function createFirstInputDelaySpan(fidEntries) {
  var firstInput = fidEntries[0];

  if (firstInput) {
    var startTime = firstInput.startTime,
        processingStart = firstInput.processingStart;
    var span = new _span__WEBPACK_IMPORTED_MODULE_0__["default"]('First Input Delay', _common_constants__WEBPACK_IMPORTED_MODULE_1__.FIRST_INPUT, {
      startTime: startTime
    });
    span.end(processingStart);
    return span;
  }
}
function createTotalBlockingTimeSpan(tbtObject) {
  var start = tbtObject.start,
      duration = tbtObject.duration;
  var tbtSpan = new _span__WEBPACK_IMPORTED_MODULE_0__["default"]('Total Blocking Time', _common_constants__WEBPACK_IMPORTED_MODULE_1__.LONG_TASK, {
    startTime: start
  });
  tbtSpan.end(start + duration);
  return tbtSpan;
}
function calculateTotalBlockingTime(longtaskEntries) {
  longtaskEntries.forEach(function (entry) {
    var name = entry.name,
        startTime = entry.startTime,
        duration = entry.duration;

    if (startTime < metrics.fcp) {
      return;
    }

    if (name !== 'self' && name.indexOf('same-origin') === -1) {
      return;
    }

    metrics.tbt.start = Math.min(metrics.tbt.start, startTime);
    var blockingTime = duration - LONG_TASK_THRESHOLD;

    if (blockingTime > 0) {
      metrics.tbt.duration += blockingTime;
    }
  });
}
function calculateCumulativeLayoutShift(clsEntries) {
  clsEntries.forEach(function (entry) {
    if (!entry.hadRecentInput && entry.value) {
      var shouldCreateNewSession = entry.startTime - metrics.cls.firstEntryTime > 5000 || entry.startTime - metrics.cls.prevEntryTime > 1000;

      if (shouldCreateNewSession) {
        metrics.cls.firstEntryTime = entry.startTime;
        metrics.cls.currentSessionScore = 0;
      }

      metrics.cls.prevEntryTime = entry.startTime;
      metrics.cls.currentSessionScore += entry.value;
      metrics.cls.score = Math.max(metrics.cls.score, metrics.cls.currentSessionScore);
    }
  });
}
function captureObserverEntries(list, _ref) {
  var isHardNavigation = _ref.isHardNavigation,
      trStart = _ref.trStart;
  var longtaskEntries = list.getEntriesByType(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LONG_TASK).filter(function (entry) {
    return entry.startTime >= trStart;
  });
  var longTaskSpans = createLongTaskSpans(longtaskEntries, metrics.longtask);
  var result = {
    spans: longTaskSpans,
    marks: {}
  };

  if (!isHardNavigation) {
    return result;
  }

  var lcpEntries = list.getEntriesByType(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LARGEST_CONTENTFUL_PAINT);
  var lastLcpEntry = lcpEntries[lcpEntries.length - 1];

  if (lastLcpEntry) {
    var lcp = parseInt(lastLcpEntry.startTime);
    metrics.lcp = lcp;
    result.marks.largestContentfulPaint = lcp;
  }

  var timing = _common_utils__WEBPACK_IMPORTED_MODULE_2__.PERF.timing;
  var unloadDiff = timing.fetchStart - timing.navigationStart;

  if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.isRedirectInfoAvailable)(timing)) {
    unloadDiff = 0;
  }

  var fcpEntry = list.getEntriesByName(_common_constants__WEBPACK_IMPORTED_MODULE_1__.FIRST_CONTENTFUL_PAINT)[0];

  if (fcpEntry) {
    var fcp = parseInt(unloadDiff >= 0 ? fcpEntry.startTime - unloadDiff : fcpEntry.startTime);
    metrics.fcp = fcp;
    result.marks.firstContentfulPaint = fcp;
  }

  var fidEntries = list.getEntriesByType(_common_constants__WEBPACK_IMPORTED_MODULE_1__.FIRST_INPUT);
  var fidSpan = createFirstInputDelaySpan(fidEntries);

  if (fidSpan) {
    metrics.fid = fidSpan.duration();
    result.spans.push(fidSpan);
  }

  calculateTotalBlockingTime(longtaskEntries);
  var clsEntries = list.getEntriesByType(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_SHIFT);
  calculateCumulativeLayoutShift(clsEntries);
  return result;
}
var PerfEntryRecorder = function () {
  function PerfEntryRecorder(callback) {
    this.po = {
      observe: _common_utils__WEBPACK_IMPORTED_MODULE_2__.noop,
      disconnect: _common_utils__WEBPACK_IMPORTED_MODULE_2__.noop
    };

    if (window.PerformanceObserver) {
      this.po = new PerformanceObserver(callback);
    }
  }

  var _proto = PerfEntryRecorder.prototype;

  _proto.start = function start(type, options) {
    if (options === void 0) {
      options = {
        buffered: true
      };
    }

    try {
      if (!(0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.isPerfTypeSupported)(type)) {
        return;
      }

      this.po.observe(_extends({
        type: type
      }, options));
    } catch (_) {}
  };

  _proto.stop = function stop() {
    this.po.disconnect();
  };

  return PerfEntryRecorder;
}();

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/navigation/capture-navigation.js":
/*!***********************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/navigation/capture-navigation.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureNavigation: function() { return /* binding */ captureNavigation; },
/* harmony export */   createNavigationTimingSpans: function() { return /* reexport safe */ _navigation_timing__WEBPACK_IMPORTED_MODULE_2__.createNavigationTimingSpans; },
/* harmony export */   createResourceTimingSpans: function() { return /* reexport safe */ _resource_timing__WEBPACK_IMPORTED_MODULE_4__.createResourceTimingSpans; },
/* harmony export */   createUserTimingSpans: function() { return /* reexport safe */ _user_timing__WEBPACK_IMPORTED_MODULE_6__.createUserTimingSpans; },
/* harmony export */   getPageLoadMarks: function() { return /* reexport safe */ _marks__WEBPACK_IMPORTED_MODULE_3__.getPageLoadMarks; }
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../state */ "../rum-core/dist/es/state.js");
/* harmony import */ var _navigation_timing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigation-timing */ "../rum-core/dist/es/performance-monitoring/navigation/navigation-timing.js");
/* harmony import */ var _user_timing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-timing */ "../rum-core/dist/es/performance-monitoring/navigation/user-timing.js");
/* harmony import */ var _resource_timing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resource-timing */ "../rum-core/dist/es/performance-monitoring/navigation/resource-timing.js");
/* harmony import */ var _marks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./marks */ "../rum-core/dist/es/performance-monitoring/navigation/marks.js");








function captureNavigation(transaction) {
  if (!transaction.captureTimings) {
    if (transaction.type === _common_constants__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD) {
      transaction._start = 0;
    }

    return;
  }

  var trEnd = transaction._end;

  if (transaction.type === _common_constants__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD) {
    if (transaction.marks && transaction.marks.custom) {
      var customMarks = transaction.marks.custom;
      Object.keys(customMarks).forEach(function (key) {
        customMarks[key] += transaction._start;
      });
    }

    var trStart = 0;
    transaction._start = trStart;
    var timings = _common_utils__WEBPACK_IMPORTED_MODULE_1__.PERF.timing;
    var baseTime = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isRedirectInfoAvailable)(timings) ? timings.redirectStart : timings.fetchStart;
    (0,_navigation_timing__WEBPACK_IMPORTED_MODULE_2__.createNavigationTimingSpans)(timings, baseTime, trStart, trEnd).forEach(function (span) {
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

    transaction.addMarks((0,_marks__WEBPACK_IMPORTED_MODULE_3__.getPageLoadMarks)(timings));
  }

  if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isPerfTimelineSupported)()) {
    var _trStart = transaction._start;
    var resourceEntries = _common_utils__WEBPACK_IMPORTED_MODULE_1__.PERF.getEntriesByType(_common_constants__WEBPACK_IMPORTED_MODULE_0__.RESOURCE);
    (0,_resource_timing__WEBPACK_IMPORTED_MODULE_4__.createResourceTimingSpans)(resourceEntries, _state__WEBPACK_IMPORTED_MODULE_5__.state.bootstrapTime, _trStart, trEnd).forEach(function (span) {
      return transaction.spans.push(span);
    });
    var userEntries = _common_utils__WEBPACK_IMPORTED_MODULE_1__.PERF.getEntriesByType(_common_constants__WEBPACK_IMPORTED_MODULE_0__.MEASURE);
    (0,_user_timing__WEBPACK_IMPORTED_MODULE_6__.createUserTimingSpans)(userEntries, _trStart, trEnd).forEach(function (span) {
      return transaction.spans.push(span);
    });
  }
}



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/navigation/marks.js":
/*!**********************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/navigation/marks.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMPRESSED_NAV_TIMING_MARKS: function() { return /* binding */ COMPRESSED_NAV_TIMING_MARKS; },
/* harmony export */   NAVIGATION_TIMING_MARKS: function() { return /* binding */ NAVIGATION_TIMING_MARKS; },
/* harmony export */   getPageLoadMarks: function() { return /* binding */ getPageLoadMarks; }
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils */ "../rum-core/dist/es/common/utils.js");

var NAVIGATION_TIMING_MARKS = ['fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'];
var COMPRESSED_NAV_TIMING_MARKS = ['fs', 'ls', 'le', 'cs', 'ce', 'qs', 'rs', 're', 'dl', 'di', 'ds', 'de', 'dc', 'es', 'ee'];

function getPageLoadMarks(timing) {
  var marks = getNavigationTimingMarks(timing);

  if (marks == null) {
    return null;
  }

  return {
    navigationTiming: marks,
    agent: {
      timeToFirstByte: marks.responseStart,
      domInteractive: marks.domInteractive,
      domComplete: marks.domComplete
    }
  };
}

function getNavigationTimingMarks(timing) {
  var redirectStart = timing.redirectStart,
      fetchStart = timing.fetchStart,
      navigationStart = timing.navigationStart,
      responseStart = timing.responseStart,
      responseEnd = timing.responseEnd;

  if (fetchStart >= navigationStart && responseStart >= fetchStart && responseEnd >= responseStart) {
    var marks = {};
    NAVIGATION_TIMING_MARKS.forEach(function (timingKey) {
      var m = timing[timingKey];

      if (m && m >= fetchStart) {
        if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isRedirectInfoAvailable)(timing)) {
          marks[timingKey] = parseInt(m - redirectStart);
        } else {
          marks[timingKey] = parseInt(m - fetchStart);
        }
      }
    });
    return marks;
  }

  return null;
}



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/navigation/navigation-timing.js":
/*!**********************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/navigation/navigation-timing.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNavigationTimingSpans: function() { return /* binding */ createNavigationTimingSpans; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/performance-monitoring/navigation/utils.js");
/* harmony import */ var _span__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../span */ "../rum-core/dist/es/performance-monitoring/span.js");


var eventPairs = [['redirectStart', 'redirectEnd', 'Redirect'], ['domainLookupStart', 'domainLookupEnd', 'Domain lookup'], ['connectStart', 'connectEnd', 'Making a connection to the server'], ['requestStart', 'responseEnd', 'Requesting and receiving the document'], ['domLoading', 'domInteractive', 'Parsing the document, executing sync. scripts'], ['domContentLoadedEventStart', 'domContentLoadedEventEnd', 'Fire "DOMContentLoaded" event'], ['loadEventStart', 'loadEventEnd', 'Fire "load" event']];

function createNavigationTimingSpans(timings, baseTime, trStart, trEnd) {
  var spans = [];

  for (var i = 0; i < eventPairs.length; i++) {
    var start = timings[eventPairs[i][0]];
    var end = timings[eventPairs[i][1]];

    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.shouldCreateSpan)(start, end, trStart, trEnd, baseTime)) {
      continue;
    }

    var span = new _span__WEBPACK_IMPORTED_MODULE_1__["default"](eventPairs[i][2], 'hard-navigation.browser-timing');
    var data = null;

    if (eventPairs[i][0] === 'requestStart') {
      span.pageResponse = true;
      data = {
        url: location.origin
      };
    }

    span._start = start - baseTime;
    span.end(end - baseTime, data);
    spans.push(span);
  }

  return spans;
}



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/navigation/resource-timing.js":
/*!********************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/navigation/resource-timing.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createResourceTimingSpans: function() { return /* binding */ createResourceTimingSpans; }
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/performance-monitoring/navigation/utils.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _span__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../span */ "../rum-core/dist/es/performance-monitoring/span.js");





function createResourceTimingSpan(resourceTimingEntry) {
  var name = resourceTimingEntry.name,
      initiatorType = resourceTimingEntry.initiatorType,
      startTime = resourceTimingEntry.startTime,
      responseEnd = resourceTimingEntry.responseEnd;
  var kind = 'resource';

  if (initiatorType) {
    kind += '.' + initiatorType;
  }

  var spanName = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.stripQueryStringFromUrl)(name);
  var span = new _span__WEBPACK_IMPORTED_MODULE_1__["default"](spanName, kind);
  span._start = startTime;
  span.end(responseEnd, {
    url: name,
    entry: resourceTimingEntry
  });
  return span;
}

function isCapturedByPatching(resourceStartTime, requestPatchTime) {
  return requestPatchTime != null && resourceStartTime > requestPatchTime;
}

function isIntakeAPIEndpoint(url) {
  return /intake\/v\d+\/rum\/events/.test(url);
}

function createResourceTimingSpans(entries, requestPatchTime, trStart, trEnd) {
  var spans = [];

  for (var i = 0; i < entries.length; i++) {
    var _entries$i = entries[i],
        initiatorType = _entries$i.initiatorType,
        name = _entries$i.name,
        startTime = _entries$i.startTime,
        responseEnd = _entries$i.responseEnd;

    if (_common_constants__WEBPACK_IMPORTED_MODULE_2__.RESOURCE_INITIATOR_TYPES.indexOf(initiatorType) === -1 || name == null) {
      continue;
    }

    if ((initiatorType === 'xmlhttprequest' || initiatorType === 'fetch') && (isIntakeAPIEndpoint(name) || isCapturedByPatching(startTime, requestPatchTime))) {
      continue;
    }

    if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.shouldCreateSpan)(startTime, responseEnd, trStart, trEnd)) {
      spans.push(createResourceTimingSpan(entries[i]));
    }
  }

  return spans;
}



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/navigation/user-timing.js":
/*!****************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/navigation/user-timing.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUserTimingSpans: function() { return /* binding */ createUserTimingSpans; }
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../rum-core/dist/es/performance-monitoring/navigation/utils.js");
/* harmony import */ var _span__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../span */ "../rum-core/dist/es/performance-monitoring/span.js");




function createUserTimingSpans(entries, trStart, trEnd) {
  var userTimingSpans = [];

  for (var i = 0; i < entries.length; i++) {
    var _entries$i = entries[i],
        name = _entries$i.name,
        startTime = _entries$i.startTime,
        duration = _entries$i.duration;
    var end = startTime + duration;

    if (duration <= _common_constants__WEBPACK_IMPORTED_MODULE_0__.USER_TIMING_THRESHOLD || !(0,_utils__WEBPACK_IMPORTED_MODULE_1__.shouldCreateSpan)(startTime, end, trStart, trEnd)) {
      continue;
    }

    var kind = 'app';
    var span = new _span__WEBPACK_IMPORTED_MODULE_2__["default"](name, kind);
    span._start = startTime;
    span.end(end);
    userTimingSpans.push(span);
  }

  return userTimingSpans;
}



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/navigation/utils.js":
/*!**********************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/navigation/utils.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shouldCreateSpan: function() { return /* binding */ shouldCreateSpan; }
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/constants */ "../rum-core/dist/es/common/constants.js");


function shouldCreateSpan(start, end, trStart, trEnd, baseTime) {
  if (baseTime === void 0) {
    baseTime = 0;
  }

  return typeof start === 'number' && typeof end === 'number' && start >= baseTime && end > start && start - baseTime >= trStart && end - baseTime <= trEnd && end - start < _common_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SPAN_DURATION && start - baseTime < _common_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SPAN_DURATION && end - baseTime < _common_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_SPAN_DURATION;
}



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/performance-monitoring.js":
/*!****************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/performance-monitoring.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adjustTransaction: function() { return /* binding */ adjustTransaction; },
/* harmony export */   "default": function() { return /* binding */ PerformanceMonitoring; },
/* harmony export */   groupSmallContinuouslySimilarSpans: function() { return /* binding */ groupSmallContinuouslySimilarSpans; }
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/url */ "../rum-core/dist/es/common/url.js");
/* harmony import */ var _common_patching__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/patching */ "../rum-core/dist/es/common/patching/index.js");
/* harmony import */ var _common_patching_patch_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/patching/patch-utils */ "../rum-core/dist/es/common/patching/patch-utils.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _common_truncate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/truncate */ "../rum-core/dist/es/common/truncate.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state */ "../rum-core/dist/es/state.js");







var SIMILAR_SPAN_TO_TRANSACTION_RATIO = 0.05;
var TRANSACTION_DURATION_THRESHOLD = 60000;
function groupSmallContinuouslySimilarSpans(originalSpans, transDuration, threshold) {
  originalSpans.sort(function (spanA, spanB) {
    return spanA._start - spanB._start;
  });
  var spans = [];
  var lastCount = 1;
  originalSpans.forEach(function (span, index) {
    if (spans.length === 0) {
      spans.push(span);
    } else {
      var lastSpan = spans[spans.length - 1];
      var isContinuouslySimilar = lastSpan.type === span.type && lastSpan.subtype === span.subtype && lastSpan.action === span.action && lastSpan.name === span.name && span.duration() / transDuration < threshold && (span._start - lastSpan._end) / transDuration < threshold;
      var isLastSpan = originalSpans.length === index + 1;

      if (isContinuouslySimilar) {
        lastCount++;
        lastSpan._end = span._end;
      }

      if (lastCount > 1 && (!isContinuouslySimilar || isLastSpan)) {
        lastSpan.name = lastCount + 'x ' + lastSpan.name;
        lastCount = 1;
      }

      if (!isContinuouslySimilar) {
        spans.push(span);
      }
    }
  });
  return spans;
}
function adjustTransaction(transaction) {
  if (transaction.sampled) {
    var filterdSpans = transaction.spans.filter(function (span) {
      return span.duration() > 0 && span._start >= transaction._start && span._end <= transaction._end;
    });

    if (transaction.isManaged()) {
      var duration = transaction.duration();
      var similarSpans = groupSmallContinuouslySimilarSpans(filterdSpans, duration, SIMILAR_SPAN_TO_TRANSACTION_RATIO);
      transaction.spans = similarSpans;
    } else {
      transaction.spans = filterdSpans;
    }
  } else {
    transaction.resetFields();
  }

  return transaction;
}

var PerformanceMonitoring = function () {
  function PerformanceMonitoring(apmServer, configService, loggingService, transactionService) {
    this._apmServer = apmServer;
    this._configService = configService;
    this._logginService = loggingService;
    this._transactionService = transactionService;
  }

  var _proto = PerformanceMonitoring.prototype;

  _proto.init = function init(flags) {
    var _this = this;

    if (flags === void 0) {
      flags = {};
    }

    this._configService.events.observe(_common_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_END + _common_constants__WEBPACK_IMPORTED_MODULE_0__.AFTER_EVENT, function (tr) {
      var payload = _this.createTransactionPayload(tr);

      if (payload) {
        _this._apmServer.addTransaction(payload);

        _this._configService.dispatchEvent(_common_constants__WEBPACK_IMPORTED_MODULE_0__.QUEUE_ADD_TRANSACTION);
      }
    });

    if (flags[_common_constants__WEBPACK_IMPORTED_MODULE_0__.HISTORY]) {
      _common_patching__WEBPACK_IMPORTED_MODULE_1__.patchEventHandler.observe(_common_constants__WEBPACK_IMPORTED_MODULE_0__.HISTORY, this.getHistorySub());
    }

    if (flags[_common_constants__WEBPACK_IMPORTED_MODULE_0__.XMLHTTPREQUEST]) {
      _common_patching__WEBPACK_IMPORTED_MODULE_1__.patchEventHandler.observe(_common_constants__WEBPACK_IMPORTED_MODULE_0__.XMLHTTPREQUEST, this.getXHRSub());
    }

    if (flags[_common_constants__WEBPACK_IMPORTED_MODULE_0__.FETCH]) {
      _common_patching__WEBPACK_IMPORTED_MODULE_1__.patchEventHandler.observe(_common_constants__WEBPACK_IMPORTED_MODULE_0__.FETCH, this.getFetchSub());
    }
  };

  _proto.getHistorySub = function getHistorySub() {
    var transactionService = this._transactionService;
    return function (event, task) {
      if (task.source === _common_constants__WEBPACK_IMPORTED_MODULE_0__.HISTORY && event === _common_constants__WEBPACK_IMPORTED_MODULE_0__.INVOKE) {
        transactionService.startTransaction(task.data.title, 'route-change', {
          managed: true,
          canReuse: true
        });
      }
    };
  };

  _proto.getXHRSub = function getXHRSub() {
    var _this2 = this;

    return function (event, task) {
      if (task.source === _common_constants__WEBPACK_IMPORTED_MODULE_0__.XMLHTTPREQUEST && !_common_patching_patch_utils__WEBPACK_IMPORTED_MODULE_2__.globalState.fetchInProgress) {
        _this2.processAPICalls(event, task);
      }
    };
  };

  _proto.getFetchSub = function getFetchSub() {
    var _this3 = this;

    return function (event, task) {
      if (task.source === _common_constants__WEBPACK_IMPORTED_MODULE_0__.FETCH) {
        _this3.processAPICalls(event, task);
      }
    };
  };

  _proto.processAPICalls = function processAPICalls(event, task) {
    var configService = this._configService;
    var transactionService = this._transactionService;

    if (task.data && task.data.url) {
      var endpoints = this._apmServer.getEndpoints();

      var isOwnEndpoint = Object.keys(endpoints).some(function (endpoint) {
        return task.data.url.indexOf(endpoints[endpoint]) !== -1;
      });

      if (isOwnEndpoint) {
        return;
      }
    }

    if (event === _common_constants__WEBPACK_IMPORTED_MODULE_0__.SCHEDULE && task.data) {
      var data = task.data;
      var requestUrl = new _common_url__WEBPACK_IMPORTED_MODULE_3__.Url(data.url);
      var spanName = data.method + ' ' + (requestUrl.relative ? requestUrl.path : (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.stripQueryStringFromUrl)(requestUrl.href));

      if (!transactionService.getCurrentTransaction()) {
        transactionService.startTransaction(spanName, _common_constants__WEBPACK_IMPORTED_MODULE_0__.HTTP_REQUEST_TYPE, {
          managed: true
        });
      }

      var span = transactionService.startSpan(spanName, 'external.http', {
        blocking: true
      });

      if (!span) {
        return;
      }

      var isDtEnabled = configService.get('distributedTracing');
      var dtOrigins = configService.get('distributedTracingOrigins');
      var currentUrl = new _common_url__WEBPACK_IMPORTED_MODULE_3__.Url(window.location.href);
      var isSameOrigin = (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.checkSameOrigin)(requestUrl.origin, currentUrl.origin) || (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.checkSameOrigin)(requestUrl.origin, dtOrigins);
      var target = data.target;

      if (isDtEnabled && isSameOrigin && target) {
        this.injectDtHeader(span, target);
        var propagateTracestate = configService.get('propagateTracestate');

        if (propagateTracestate) {
          this.injectTSHeader(span, target);
        }
      } else if (_state__WEBPACK_IMPORTED_MODULE_5__.__DEV__) {
        this._logginService.debug("Could not inject distributed tracing header to the request origin ('" + requestUrl.origin + "') from the current origin ('" + currentUrl.origin + "')");
      }

      if (data.sync) {
        span.sync = data.sync;
      }

      data.span = span;
    } else if (event === _common_constants__WEBPACK_IMPORTED_MODULE_0__.INVOKE) {
      var _data = task.data;

      if (_data && _data.span) {
        var _span = _data.span,
            response = _data.response,
            _target = _data.target;
        var status;

        if (response) {
          status = response.status;
        } else {
          status = _target.status;
        }

        var outcome;

        if (_data.status != 'abort' && !_data.aborted) {
          if (status >= 400 || status == 0) {
            outcome = _common_constants__WEBPACK_IMPORTED_MODULE_0__.OUTCOME_FAILURE;
          } else {
            outcome = _common_constants__WEBPACK_IMPORTED_MODULE_0__.OUTCOME_SUCCESS;
          }
        } else {
          outcome = _common_constants__WEBPACK_IMPORTED_MODULE_0__.OUTCOME_UNKNOWN;
        }

        _span.outcome = outcome;
        var tr = transactionService.getCurrentTransaction();

        if (tr && tr.type === _common_constants__WEBPACK_IMPORTED_MODULE_0__.HTTP_REQUEST_TYPE) {
          tr.outcome = outcome;
        }

        transactionService.endSpan(_span, _data);
      }
    }
  };

  _proto.injectDtHeader = function injectDtHeader(span, target) {
    var headerName = this._configService.get('distributedTracingHeaderName');

    var headerValue = (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getDtHeaderValue)(span);
    var isHeaderValid = (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.isDtHeaderValid)(headerValue);

    if (isHeaderValid && headerValue && headerName) {
      (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.setRequestHeader)(target, headerName, headerValue);
    }
  };

  _proto.injectTSHeader = function injectTSHeader(span, target) {
    var headerValue = (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getTSHeaderValue)(span);

    if (headerValue) {
      (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.setRequestHeader)(target, 'tracestate', headerValue);
    }
  };

  _proto.extractDtHeader = function extractDtHeader(target) {
    var configService = this._configService;
    var headerName = configService.get('distributedTracingHeaderName');

    if (target) {
      return (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.parseDtHeaderValue)(target[headerName]);
    }
  };

  _proto.filterTransaction = function filterTransaction(tr) {
    var duration = tr.duration();

    if (!duration) {
      if (_state__WEBPACK_IMPORTED_MODULE_5__.__DEV__) {
        var message = "transaction(" + tr.id + ", " + tr.name + ") was discarded! ";

        if (duration === 0) {
          message += "Transaction duration is 0";
        } else {
          message += "Transaction wasn't ended";
        }

        this._logginService.debug(message);
      }

      return false;
    }

    if (tr.isManaged()) {
      if (duration > TRANSACTION_DURATION_THRESHOLD) {
        if (_state__WEBPACK_IMPORTED_MODULE_5__.__DEV__) {
          this._logginService.debug("transaction(" + tr.id + ", " + tr.name + ") was discarded! Transaction duration (" + duration + ") is greater than managed transaction threshold (" + TRANSACTION_DURATION_THRESHOLD + ")");
        }

        return false;
      }

      if (tr.sampled && tr.spans.length === 0) {
        if (_state__WEBPACK_IMPORTED_MODULE_5__.__DEV__) {
          this._logginService.debug("transaction(" + tr.id + ", " + tr.name + ") was discarded! Transaction does not have any spans");
        }

        return false;
      }
    }

    return true;
  };

  _proto.createTransactionDataModel = function createTransactionDataModel(transaction) {
    var transactionStart = transaction._start;
    var spans = transaction.spans.map(function (span) {
      var spanData = {
        id: span.id,
        transaction_id: transaction.id,
        parent_id: span.parentId || transaction.id,
        trace_id: transaction.traceId,
        name: span.name,
        type: span.type,
        subtype: span.subtype,
        action: span.action,
        sync: span.sync,
        start: parseInt(span._start - transactionStart),
        duration: span.duration(),
        context: span.context,
        outcome: span.outcome,
        sample_rate: span.sampleRate
      };
      return (0,_common_truncate__WEBPACK_IMPORTED_MODULE_6__.truncateModel)(_common_truncate__WEBPACK_IMPORTED_MODULE_6__.SPAN_MODEL, spanData);
    });
    var transactionData = {
      id: transaction.id,
      parent_id: transaction.parentId,
      trace_id: transaction.traceId,
      session: transaction.session,
      name: transaction.name,
      type: transaction.type,
      duration: transaction.duration(),
      spans: spans,
      context: transaction.context,
      marks: transaction.marks,
      breakdown: transaction.breakdownTimings,
      span_count: {
        started: spans.length
      },
      sampled: transaction.sampled,
      sample_rate: transaction.sampleRate,
      experience: transaction.experience,
      outcome: transaction.outcome
    };
    return (0,_common_truncate__WEBPACK_IMPORTED_MODULE_6__.truncateModel)(_common_truncate__WEBPACK_IMPORTED_MODULE_6__.TRANSACTION_MODEL, transactionData);
  };

  _proto.createTransactionPayload = function createTransactionPayload(transaction) {
    var adjustedTransaction = adjustTransaction(transaction);
    var filtered = this.filterTransaction(adjustedTransaction);

    if (filtered) {
      return this.createTransactionDataModel(transaction);
    }

    this._configService.dispatchEvent(_common_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_IGNORE);
  };

  return PerformanceMonitoring;
}();



/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/span-base.js":
/*!***************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/span-base.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");



var SpanBase = function () {
  function SpanBase(name, type, options) {
    if (options === void 0) {
      options = {};
    }

    if (!name) {
      name = _common_constants__WEBPACK_IMPORTED_MODULE_0__.NAME_UNKNOWN;
    }

    if (!type) {
      type = _common_constants__WEBPACK_IMPORTED_MODULE_0__.TYPE_CUSTOM;
    }

    this.name = name;
    this.type = type;
    this.options = options;
    this.id = options.id || (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.generateRandomId)(16);
    this.traceId = options.traceId;
    this.sampled = options.sampled;
    this.sampleRate = options.sampleRate;
    this.timestamp = options.timestamp;
    this._start = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getTime)(options.startTime);
    this._end = undefined;
    this.ended = false;
    this.outcome = undefined;
    this.onEnd = options.onEnd;
  }

  var _proto = SpanBase.prototype;

  _proto.ensureContext = function ensureContext() {
    if (!this.context) {
      this.context = {};
    }
  };

  _proto.addLabels = function addLabels(tags) {
    this.ensureContext();
    var ctx = this.context;

    if (!ctx.tags) {
      ctx.tags = {};
    }

    var keys = Object.keys(tags);
    keys.forEach(function (k) {
      return (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.setLabel)(k, tags[k], ctx.tags);
    });
  };

  _proto.addContext = function addContext() {
    for (var _len = arguments.length, context = new Array(_len), _key = 0; _key < _len; _key++) {
      context[_key] = arguments[_key];
    }

    if (context.length === 0) return;
    this.ensureContext();
    this.context = _common_utils__WEBPACK_IMPORTED_MODULE_1__.merge.apply(void 0, [this.context].concat(context));
  };

  _proto.end = function end(endTime) {
    if (this.ended) {
      return;
    }

    this.ended = true;
    this._end = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getTime)(endTime);
    this.callOnEnd();
  };

  _proto.callOnEnd = function callOnEnd() {
    if (typeof this.onEnd === 'function') {
      this.onEnd(this);
    }
  };

  _proto.duration = function duration() {
    return (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getDuration)(this._start, this._end);
  };

  return SpanBase;
}();

/* harmony default export */ __webpack_exports__["default"] = (SpanBase);

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/span.js":
/*!**********************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/span.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _span_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./span-base */ "../rum-core/dist/es/performance-monitoring/span-base.js");
/* harmony import */ var _common_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/context */ "../rum-core/dist/es/common/context.js");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}




var Span = function (_SpanBase) {
  _inheritsLoose(Span, _SpanBase);

  function Span(name, type, options) {
    var _this;

    _this = _SpanBase.call(this, name, type, options) || this;
    _this.parentId = _this.options.parentId;
    _this.subtype = undefined;
    _this.action = undefined;

    if (_this.type.indexOf('.') !== -1) {
      var fields = _this.type.split('.', 3);

      _this.type = fields[0];
      _this.subtype = fields[1];
      _this.action = fields[2];
    }

    _this.sync = _this.options.sync;
    return _this;
  }

  var _proto = Span.prototype;

  _proto.end = function end(endTime, data) {
    _SpanBase.prototype.end.call(this, endTime);

    (0,_common_context__WEBPACK_IMPORTED_MODULE_0__.addSpanContext)(this, data);
  };

  return Span;
}(_span_base__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Span);

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/transaction-service.js":
/*!*************************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/transaction-service.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_polyfills__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/polyfills */ "../rum-core/dist/es/common/polyfills.js");
/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transaction */ "../rum-core/dist/es/performance-monitoring/transaction.js");
/* harmony import */ var _metrics_metrics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metrics/metrics */ "../rum-core/dist/es/performance-monitoring/metrics/metrics.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _navigation_capture_navigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navigation/capture-navigation */ "../rum-core/dist/es/performance-monitoring/navigation/capture-navigation.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _common_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/context */ "../rum-core/dist/es/common/context.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state */ "../rum-core/dist/es/state.js");
/* harmony import */ var _common_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/url */ "../rum-core/dist/es/common/url.js");










var TransactionService = function () {
  function TransactionService(logger, config) {
    var _this = this;

    this._config = config;
    this._logger = logger;
    this.currentTransaction = undefined;
    this.respIntervalId = undefined;
    this.recorder = new _metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.PerfEntryRecorder(function (list) {
      var tr = _this.getCurrentTransaction();

      if (tr && tr.captureTimings) {
        var _tr$spans;

        var isHardNavigation = tr.type === _common_constants__WEBPACK_IMPORTED_MODULE_1__.PAGE_LOAD;

        var _captureObserverEntri = (0,_metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.captureObserverEntries)(list, {
          isHardNavigation: isHardNavigation,
          trStart: isHardNavigation ? 0 : tr._start
        }),
            spans = _captureObserverEntri.spans,
            marks = _captureObserverEntri.marks;

        (_tr$spans = tr.spans).push.apply(_tr$spans, spans);

        tr.addMarks({
          agent: marks
        });
      }
    });
  }

  var _proto = TransactionService.prototype;

  _proto.createCurrentTransaction = function createCurrentTransaction(name, type, options) {
    var tr = new _transaction__WEBPACK_IMPORTED_MODULE_2__["default"](name, type, options);
    this.currentTransaction = tr;
    return tr;
  };

  _proto.getCurrentTransaction = function getCurrentTransaction() {
    if (this.currentTransaction && !this.currentTransaction.ended) {
      return this.currentTransaction;
    }
  };

  _proto.createOptions = function createOptions(options) {
    var config = this._config.config;
    var presetOptions = {
      transactionSampleRate: config.transactionSampleRate
    };
    var perfOptions = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.extend)(presetOptions, options);

    if (perfOptions.managed) {
      perfOptions = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.extend)({
        pageLoadTraceId: config.pageLoadTraceId,
        pageLoadSampled: config.pageLoadSampled,
        pageLoadSpanId: config.pageLoadSpanId,
        pageLoadTransactionName: config.pageLoadTransactionName,
        pageLoadParentId: config.pageLoadParentId
      }, perfOptions);
    }

    return perfOptions;
  };

  _proto.startManagedTransaction = function startManagedTransaction(name, type, perfOptions) {
    var tr = this.getCurrentTransaction();
    var isRedefined = false;

    if (!tr) {
      tr = this.createCurrentTransaction(name, type, perfOptions);
    } else if (tr.canReuse() && perfOptions.canReuse) {
      var redefineType = tr.type;
      var currentTypeOrder = _common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_TYPE_ORDER.indexOf(tr.type);
      var redefineTypeOrder = _common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_TYPE_ORDER.indexOf(type);

      if (currentTypeOrder >= 0 && redefineTypeOrder < currentTypeOrder) {
        redefineType = type;
      }

      if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
        this._logger.debug("redefining transaction(" + tr.id + ", " + tr.name + ", " + tr.type + ")", 'to', "(" + (name || tr.name) + ", " + redefineType + ")", tr);
      }

      tr.redefine(name, redefineType, perfOptions);
      isRedefined = true;
    } else {
      if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
        this._logger.debug("ending previous transaction(" + tr.id + ", " + tr.name + ")", tr);
      }

      tr.end();
      tr = this.createCurrentTransaction(name, type, perfOptions);
    }

    if (tr.type === _common_constants__WEBPACK_IMPORTED_MODULE_1__.PAGE_LOAD) {
      if (!isRedefined) {
        this.recorder.start(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LARGEST_CONTENTFUL_PAINT);
        this.recorder.start(_common_constants__WEBPACK_IMPORTED_MODULE_1__.PAINT);
        this.recorder.start(_common_constants__WEBPACK_IMPORTED_MODULE_1__.FIRST_INPUT);
        this.recorder.start(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_SHIFT);
      }

      if (perfOptions.pageLoadTraceId) {
        tr.traceId = perfOptions.pageLoadTraceId;
      }

      if (perfOptions.pageLoadSampled) {
        tr.sampled = perfOptions.pageLoadSampled;
      }

      if (tr.name === _common_constants__WEBPACK_IMPORTED_MODULE_1__.NAME_UNKNOWN && perfOptions.pageLoadTransactionName) {
        tr.name = perfOptions.pageLoadTransactionName;
      }
    }

    if (!isRedefined && this._config.get('monitorLongtasks')) {
      this.recorder.start(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LONG_TASK);
    }

    if (tr.sampled) {
      tr.captureTimings = true;
    }

    return tr;
  };

  _proto.startTransaction = function startTransaction(name, type, options) {
    var _this2 = this;

    var perfOptions = this.createOptions(options);
    var tr;
    var fireOnstartHook = true;

    if (perfOptions.managed) {
      var current = this.currentTransaction;
      tr = this.startManagedTransaction(name, type, perfOptions);

      if (current === tr) {
        fireOnstartHook = false;
      }
    } else {
      tr = new _transaction__WEBPACK_IMPORTED_MODULE_2__["default"](name, type, perfOptions);
    }

    tr.onEnd = function () {
      return _this2.handleTransactionEnd(tr);
    };

    if (fireOnstartHook) {
      if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
        this._logger.debug("startTransaction(" + tr.id + ", " + tr.name + ", " + tr.type + ")");
      }

      this._config.events.send(_common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_START, [tr]);
    }

    return tr;
  };

  _proto.handleTransactionEnd = function handleTransactionEnd(tr) {
    var _this3 = this;

    this.recorder.stop();
    var currentUrl = window.location.href;
    return _common_polyfills__WEBPACK_IMPORTED_MODULE_5__.Promise.resolve().then(function () {
      var name = tr.name,
          type = tr.type;
      var lastHiddenStart = _state__WEBPACK_IMPORTED_MODULE_4__.state.lastHiddenStart;

      if (lastHiddenStart >= tr._start) {
        if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
          _this3._logger.debug("transaction(" + tr.id + ", " + name + ", " + type + ") was discarded! The page was hidden during the transaction!");
        }

        _this3._config.dispatchEvent(_common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_IGNORE);

        return;
      }

      if (_this3.shouldIgnoreTransaction(name) || type === _common_constants__WEBPACK_IMPORTED_MODULE_1__.TEMPORARY_TYPE) {
        if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
          _this3._logger.debug("transaction(" + tr.id + ", " + name + ", " + type + ") is ignored");
        }

        _this3._config.dispatchEvent(_common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_IGNORE);

        return;
      }

      if (type === _common_constants__WEBPACK_IMPORTED_MODULE_1__.PAGE_LOAD) {
        var pageLoadTransactionName = _this3._config.get('pageLoadTransactionName');

        if (name === _common_constants__WEBPACK_IMPORTED_MODULE_1__.NAME_UNKNOWN && pageLoadTransactionName) {
          tr.name = pageLoadTransactionName;
        }

        if (tr.captureTimings) {
          var cls = _metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.metrics.cls,
              fid = _metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.metrics.fid,
              tbt = _metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.metrics.tbt,
              longtask = _metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.metrics.longtask;

          if (tbt.duration > 0) {
            tr.spans.push((0,_metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.createTotalBlockingTimeSpan)(tbt));
          }

          tr.experience = {};

          if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.isPerfTypeSupported)(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LONG_TASK)) {
            tr.experience.tbt = tbt.duration;
          }

          if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.isPerfTypeSupported)(_common_constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_SHIFT)) {
            tr.experience.cls = cls.score;
          }

          if (fid > 0) {
            tr.experience.fid = fid;
          }

          if (longtask.count > 0) {
            tr.experience.longtask = {
              count: longtask.count,
              sum: longtask.duration,
              max: longtask.max
            };
          }
        }

        _this3.setSession(tr);
      }

      if (tr.name === _common_constants__WEBPACK_IMPORTED_MODULE_1__.NAME_UNKNOWN) {
        tr.name = (0,_common_url__WEBPACK_IMPORTED_MODULE_6__.slugifyUrl)(currentUrl);
      }

      (0,_navigation_capture_navigation__WEBPACK_IMPORTED_MODULE_7__.captureNavigation)(tr);

      _this3.adjustTransactionTime(tr);

      var breakdownMetrics = _this3._config.get('breakdownMetrics');

      if (breakdownMetrics) {
        tr.captureBreakdown();
      }

      var configContext = _this3._config.get('context');

      (0,_common_context__WEBPACK_IMPORTED_MODULE_8__.addTransactionContext)(tr, configContext);

      _this3._config.events.send(_common_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSACTION_END, [tr]);

      if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
        _this3._logger.debug("end transaction(" + tr.id + ", " + tr.name + ", " + tr.type + ")", tr);
      }
    }, function (err) {
      if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
        _this3._logger.debug("error ending transaction(" + tr.id + ", " + tr.name + ")", err);
      }
    });
  };

  _proto.setSession = function setSession(tr) {
    var session = this._config.get('session');

    if (session) {
      if (typeof session == 'boolean') {
        tr.session = {
          id: (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.generateRandomId)(16),
          sequence: 1
        };
      } else {
        if (session.timestamp && Date.now() - session.timestamp > _common_constants__WEBPACK_IMPORTED_MODULE_1__.SESSION_TIMEOUT) {
          tr.session = {
            id: (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.generateRandomId)(16),
            sequence: 1
          };
        } else {
          tr.session = {
            id: session.id,
            sequence: session.sequence ? session.sequence + 1 : 1
          };
        }
      }

      var sessionConfig = {
        session: {
          id: tr.session.id,
          sequence: tr.session.sequence,
          timestamp: Date.now()
        }
      };

      this._config.setConfig(sessionConfig);

      this._config.setLocalConfig(sessionConfig, true);
    }
  };

  _proto.adjustTransactionTime = function adjustTransactionTime(transaction) {
    var spans = transaction.spans;
    var earliestSpan = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.getEarliestSpan)(spans);

    if (earliestSpan && earliestSpan._start < transaction._start) {
      transaction._start = earliestSpan._start;
    }

    var latestSpan = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.getLatestNonXHRSpan)(spans) || {};
    var latestSpanEnd = latestSpan._end || 0;

    if (transaction.type === _common_constants__WEBPACK_IMPORTED_MODULE_1__.PAGE_LOAD) {
      var transactionEndWithoutDelay = transaction._end - _common_constants__WEBPACK_IMPORTED_MODULE_1__.PAGE_LOAD_DELAY;
      var lcp = _metrics_metrics__WEBPACK_IMPORTED_MODULE_0__.metrics.lcp || 0;
      var latestXHRSpan = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.getLatestXHRSpan)(spans) || {};
      var latestXHRSpanEnd = latestXHRSpan._end || 0;
      transaction._end = Math.max(latestSpanEnd, latestXHRSpanEnd, lcp, transactionEndWithoutDelay);
    } else if (latestSpanEnd > transaction._end) {
      transaction._end = latestSpanEnd;
    }

    this.truncateSpans(spans, transaction._end);
  };

  _proto.truncateSpans = function truncateSpans(spans, transactionEnd) {
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];

      if (span._end > transactionEnd) {
        span._end = transactionEnd;
        span.type += _common_constants__WEBPACK_IMPORTED_MODULE_1__.TRUNCATED_TYPE;
      }

      if (span._start > transactionEnd) {
        span._start = transactionEnd;
      }
    }
  };

  _proto.shouldIgnoreTransaction = function shouldIgnoreTransaction(transactionName) {
    var ignoreList = this._config.get('ignoreTransactions');

    if (ignoreList && ignoreList.length) {
      for (var i = 0; i < ignoreList.length; i++) {
        var element = ignoreList[i];

        if (typeof element.test === 'function') {
          if (element.test(transactionName)) {
            return true;
          }
        } else if (element === transactionName) {
          return true;
        }
      }
    }

    return false;
  };

  _proto.startSpan = function startSpan(name, type, options) {
    var tr = this.getCurrentTransaction();

    if (!tr) {
      tr = this.createCurrentTransaction(undefined, _common_constants__WEBPACK_IMPORTED_MODULE_1__.TEMPORARY_TYPE, this.createOptions({
        canReuse: true,
        managed: true
      }));
    }

    var span = tr.startSpan(name, type, options);

    if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
      this._logger.debug("startSpan(" + name + ", " + span.type + ")", "on transaction(" + tr.id + ", " + tr.name + ")");
    }

    return span;
  };

  _proto.endSpan = function endSpan(span, context) {
    if (!span) {
      return;
    }

    if (_state__WEBPACK_IMPORTED_MODULE_4__.__DEV__) {
      var tr = this.getCurrentTransaction();
      tr && this._logger.debug("endSpan(" + span.name + ", " + span.type + ")", "on transaction(" + tr.id + ", " + tr.name + ")");
    }

    span.end(null, context);
  };

  return TransactionService;
}();

/* harmony default export */ __webpack_exports__["default"] = (TransactionService);

/***/ }),

/***/ "../rum-core/dist/es/performance-monitoring/transaction.js":
/*!*****************************************************************!*\
  !*** ../rum-core/dist/es/performance-monitoring/transaction.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _span__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./span */ "../rum-core/dist/es/performance-monitoring/span.js");
/* harmony import */ var _span_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./span-base */ "../rum-core/dist/es/performance-monitoring/span-base.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/constants */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _breakdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./breakdown */ "../rum-core/dist/es/performance-monitoring/breakdown.js");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}







var Transaction = function (_SpanBase) {
  _inheritsLoose(Transaction, _SpanBase);

  function Transaction(name, type, options) {
    var _this;

    _this = _SpanBase.call(this, name, type, options) || this;
    _this.traceId = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.generateRandomId)();
    _this.marks = undefined;
    _this.spans = [];
    _this._activeSpans = {};
    _this._activeTasks = new Set();
    _this.blocked = false;
    _this.captureTimings = false;
    _this.breakdownTimings = [];
    _this.sampleRate = _this.options.transactionSampleRate;
    _this.sampled = Math.random() <= _this.sampleRate;
    return _this;
  }

  var _proto = Transaction.prototype;

  _proto.addMarks = function addMarks(obj) {
    this.marks = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.merge)(this.marks || {}, obj);
  };

  _proto.mark = function mark(key) {
    var skey = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.removeInvalidChars)(key);

    var markTime = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - this._start;

    var custom = {};
    custom[skey] = markTime;
    this.addMarks({
      custom: custom
    });
  };

  _proto.canReuse = function canReuse() {
    var threshold = this.options.reuseThreshold || _common_constants__WEBPACK_IMPORTED_MODULE_1__.REUSABILITY_THRESHOLD;
    return !!this.options.canReuse && !this.ended && (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - this._start < threshold;
  };

  _proto.redefine = function redefine(name, type, options) {
    if (name) {
      this.name = name;
    }

    if (type) {
      this.type = type;
    }

    if (options) {
      this.options.reuseThreshold = options.reuseThreshold;
      this.options = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.extend)(this.options, options);
    }
  };

  _proto.startSpan = function startSpan(name, type, options) {
    var _this2 = this;

    if (this.ended) {
      return;
    }

    var opts = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.extend)({}, options);

    opts.onEnd = function (trc) {
      _this2._onSpanEnd(trc);
    };

    opts.traceId = this.traceId;
    opts.sampled = this.sampled;
    opts.sampleRate = this.sampleRate;

    if (!opts.parentId) {
      opts.parentId = this.id;
    }

    var span = new _span__WEBPACK_IMPORTED_MODULE_2__["default"](name, type, opts);
    this._activeSpans[span.id] = span;

    if (opts.blocking) {
      this.addTask(span.id);
    }

    return span;
  };

  _proto.isFinished = function isFinished() {
    return !this.blocked && this._activeTasks.size === 0;
  };

  _proto.detectFinish = function detectFinish() {
    if (this.isFinished()) this.end();
  };

  _proto.end = function end(endTime) {
    if (this.ended) {
      return;
    }

    this.ended = true;
    this._end = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.getTime)(endTime);

    for (var sid in this._activeSpans) {
      var span = this._activeSpans[sid];
      span.type = span.type + _common_constants__WEBPACK_IMPORTED_MODULE_1__.TRUNCATED_TYPE;
      span.end(endTime);
    }

    this.callOnEnd();
  };

  _proto.captureBreakdown = function captureBreakdown() {
    this.breakdownTimings = (0,_breakdown__WEBPACK_IMPORTED_MODULE_3__.captureBreakdown)(this);
  };

  _proto.block = function block(flag) {
    this.blocked = flag;

    if (!this.blocked) {
      this.detectFinish();
    }
  };

  _proto.addTask = function addTask(taskId) {
    if (!taskId) {
      taskId = 'task-' + (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.generateRandomId)(16);
    }

    this._activeTasks.add(taskId);

    return taskId;
  };

  _proto.removeTask = function removeTask(taskId) {
    var deleted = this._activeTasks.delete(taskId);

    deleted && this.detectFinish();
  };

  _proto.resetFields = function resetFields() {
    this.spans = [];
    this.sampleRate = 0;
  };

  _proto._onSpanEnd = function _onSpanEnd(span) {
    this.spans.push(span);
    delete this._activeSpans[span.id];
    this.removeTask(span.id);
  };

  _proto.isManaged = function isManaged() {
    return !!this.options.managed;
  };

  return Transaction;
}(_span_base__WEBPACK_IMPORTED_MODULE_4__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Transaction);

/***/ }),

/***/ "../rum-core/dist/es/state.js":
/*!************************************!*\
  !*** ../rum-core/dist/es/state.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __DEV__: function() { return /* binding */ __DEV__; },
/* harmony export */   state: function() { return /* binding */ state; }
/* harmony export */ });
var __DEV__ = "development" !== 'production';

var state = {
  bootstrapTime: null,
  lastHiddenStart: Number.MIN_SAFE_INTEGER
};


/***/ }),

/***/ "./src/apm-base.js":
/*!*************************!*\
  !*** ./src/apm-base.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ApmBase; }
/* harmony export */ });
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/common/constants.js");
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/common/instrument.js");
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/common/observers/page-visibility.js");
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/common/observers/page-clicks.js");
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/performance-monitoring/metrics/inp/process.js");


var ApmBase = function () {
  function ApmBase(serviceFactory, disable) {
    this._disable = disable;
    this.serviceFactory = serviceFactory;
    this._initialized = false;
  }

  var _proto = ApmBase.prototype;

  _proto.isEnabled = function isEnabled() {
    return !this._disable;
  };

  _proto.isActive = function isActive() {
    var configService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    return this.isEnabled() && this._initialized && configService.get('active');
  };

  _proto.init = function init(config) {
    var _this = this;

    if (this.isEnabled() && !this._initialized) {
      this._initialized = true;

      var _this$serviceFactory$ = this.serviceFactory.getService([_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE, _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.LOGGING_SERVICE, _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_SERVICE]),
          configService = _this$serviceFactory$[0],
          loggingService = _this$serviceFactory$[1],
          transactionService = _this$serviceFactory$[2];

      configService.setVersion('5.17.0');
      this.config(config);
      var logLevel = configService.get('logLevel');
      loggingService.setLevel(logLevel);
      var isConfigActive = configService.get('active');

      if (isConfigActive) {
        this.serviceFactory.init();
        var flags = (0,_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_1__.getInstrumentationFlags)(configService.get('instrument'), configService.get('disableInstrumentations'));
        var performanceMonitoring = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.PERFORMANCE_MONITORING);
        performanceMonitoring.init(flags);

        if (flags[_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.ERROR]) {
          var errorLogging = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.ERROR_LOGGING);
          errorLogging.registerListeners();
        }

        if (configService.get('session')) {
          var localConfig = configService.getLocalConfig();

          if (localConfig && localConfig.session) {
            configService.setConfig({
              session: localConfig.session
            });
          }
        }

        var sendPageLoad = function sendPageLoad() {
          return flags[_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD] && _this._sendPageLoadMetrics();
        };

        if (configService.get('centralConfig')) {
          this.fetchCentralConfig().then(sendPageLoad);
        } else {
          sendPageLoad();
        }

        (0,_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_2__.observePageVisibility)(configService, transactionService);

        if (flags[_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.EVENT_TARGET] && flags[_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CLICK]) {
          (0,_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_3__.observePageClicks)(transactionService);
        }

        (0,_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_4__.observeUserInteractions)();
      } else {
        this._disable = true;
        loggingService.warn('RUM agent is inactive');
      }
    }

    return this;
  };

  _proto.fetchCentralConfig = function fetchCentralConfig() {
    var _this$serviceFactory$2 = this.serviceFactory.getService([_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.APM_SERVER, _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.LOGGING_SERVICE, _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE]),
        apmServer = _this$serviceFactory$2[0],
        loggingService = _this$serviceFactory$2[1],
        configService = _this$serviceFactory$2[2];

    return apmServer.fetchConfig(configService.get('serviceName'), configService.get('environment')).then(function (config) {
      var transactionSampleRate = config['transaction_sample_rate'];

      if (transactionSampleRate) {
        transactionSampleRate = Number(transactionSampleRate);
        var _config2 = {
          transactionSampleRate: transactionSampleRate
        };

        var _configService$valida = configService.validate(_config2),
            invalid = _configService$valida.invalid;

        if (invalid.length === 0) {
          configService.setConfig(_config2);
        } else {
          var _invalid$ = invalid[0],
              key = _invalid$.key,
              value = _invalid$.value,
              allowed = _invalid$.allowed;
          loggingService.warn("invalid value \"" + value + "\" for " + key + ". Allowed: " + allowed + ".");
        }
      }

      return config;
    }).catch(function (error) {
      loggingService.warn('failed fetching config:', error);
    });
  };

  _proto._sendPageLoadMetrics = function _sendPageLoadMetrics() {
    var tr = this.startTransaction(undefined, _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD, {
      managed: true,
      canReuse: true
    });

    if (!tr) {
      return;
    }

    tr.addTask(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD);

    var sendPageLoadMetrics = function sendPageLoadMetrics() {
      setTimeout(function () {
        return tr.removeTask(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD);
      }, _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.PAGE_LOAD_DELAY);
    };

    if (document.readyState === 'complete') {
      sendPageLoadMetrics();
    } else {
      window.addEventListener('load', sendPageLoadMetrics);
    }
  };

  _proto.observe = function observe(name, fn) {
    var configService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    configService.events.observe(name, fn);
  };

  _proto.config = function config(_config) {
    var _this$serviceFactory$3 = this.serviceFactory.getService([_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE, _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.LOGGING_SERVICE]),
        configService = _this$serviceFactory$3[0],
        loggingService = _this$serviceFactory$3[1];

    var _configService$valida2 = configService.validate(_config),
        missing = _configService$valida2.missing,
        invalid = _configService$valida2.invalid,
        unknown = _configService$valida2.unknown;

    if (unknown.length > 0) {
      var message = 'Unknown config options are specified for RUM agent: ' + unknown.join(', ');
      loggingService.warn(message);
    }

    if (missing.length === 0 && invalid.length === 0) {
      configService.setConfig(_config);
    } else {
      var separator = ', ';
      var _message = "RUM agent isn't correctly configured. ";

      if (missing.length > 0) {
        _message += missing.join(separator) + ' is missing';

        if (invalid.length > 0) {
          _message += separator;
        }
      }

      invalid.forEach(function (_ref, index) {
        var key = _ref.key,
            value = _ref.value,
            allowed = _ref.allowed;
        _message += key + " \"" + value + "\" contains invalid characters! (allowed: " + allowed + ")" + (index !== invalid.length - 1 ? separator : '');
      });
      loggingService.error(_message);
      configService.setConfig({
        active: false
      });
    }
  };

  _proto.setUserContext = function setUserContext(userContext) {
    var configService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    configService.setUserContext(userContext);
  };

  _proto.setCustomContext = function setCustomContext(customContext) {
    var configService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    configService.setCustomContext(customContext);
  };

  _proto.addLabels = function addLabels(labels) {
    var configService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    configService.addLabels(labels);
  };

  _proto.setInitialPageLoadName = function setInitialPageLoadName(name) {
    var configService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    configService.setConfig({
      pageLoadTransactionName: name
    });
  };

  _proto.startTransaction = function startTransaction(name, type, options) {
    if (this.isEnabled()) {
      var transactionService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_SERVICE);
      return transactionService.startTransaction(name, type, options);
    }
  };

  _proto.startSpan = function startSpan(name, type, options) {
    if (this.isEnabled()) {
      var transactionService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_SERVICE);
      return transactionService.startSpan(name, type, options);
    }
  };

  _proto.getCurrentTransaction = function getCurrentTransaction() {
    if (this.isEnabled()) {
      var transactionService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_SERVICE);
      return transactionService.getCurrentTransaction();
    }
  };

  _proto.captureError = function captureError(error, opts) {
    if (this.isEnabled()) {
      var errorLogging = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.ERROR_LOGGING);
      return errorLogging.logError(error, opts);
    }
  };

  _proto.addFilter = function addFilter(fn) {
    var configService = this.serviceFactory.getService(_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_0__.CONFIG_SERVICE);
    configService.addFilter(fn);
  };

  return ApmBase;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApmBase: function() { return /* reexport safe */ _apm_base__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   apm: function() { return /* binding */ apmBase; },
/* harmony export */   apmBase: function() { return /* binding */ apmBase; },
/* harmony export */   init: function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/common/utils.js");
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/bootstrap.js");
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/index.js");
/* harmony import */ var _apm_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apm-base */ "./src/apm-base.js");



function getApmBase() {
  if (_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_1__.isBrowser && window.elasticApm) {
    return window.elasticApm;
  }

  var enabled = (0,_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_2__.bootstrap)();
  var serviceFactory = (0,_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_3__.createServiceFactory)();
  var apmBase = new _apm_base__WEBPACK_IMPORTED_MODULE_0__["default"](serviceFactory, !enabled);

  if (_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_1__.isBrowser) {
    window.elasticApm = apmBase;
  }

  return apmBase;
}

var apmBase = getApmBase();
var init = apmBase.init.bind(apmBase);
/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),

/***/ "../../node_modules/error-stack-parser/error-stack-parser.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/error-stack-parser/error-stack-parser.js ***!
  \*******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! stackframe */ "../../node_modules/stackframe/stackframe.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    function _map(array, fn, thisArg) {
        if (typeof Array.prototype.map === 'function') {
            return array.map(fn, thisArg);
        } else {
            var output = new Array(array.length);
            for (var i = 0; i < array.length; i++) {
                output[i] = fn.call(thisArg, array[i]);
            }
            return output;
        }
    }

    function _filter(array, fn, thisArg) {
        if (typeof Array.prototype.filter === 'function') {
            return array.filter(fn, thisArg);
        } else {
            var output = [];
            for (var i = 0; i < array.length; i++) {
                if (fn.call(thisArg, array[i])) {
                    output.push(array[i]);
                }
            }
            return output;
        }
    }

    function _indexOf(array, target) {
        if (typeof Array.prototype.indexOf === 'function') {
            return array.indexOf(target);
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === target) {
                    return i;
                }
            }
            return -1;
        }
    }

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame(line);
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;
                    return new StackFrame(functionName,
                        undefined,
                        locationParts[0],
                        locationParts[1],
                        locationParts[2],
                        line);
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame(
                            match[3] || undefined,
                            undefined,
                            match[2],
                            match[1],
                            undefined,
                            lines[i]
                        )
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return _map(filtered, function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');
                return new StackFrame(
                    functionName,
                    args,
                    locationParts[0],
                    locationParts[1],
                    locationParts[2],
                    line);
            }, this);
        }
    };
}));



/***/ }),

/***/ "../../node_modules/opentracing/lib/constants.js":
/*!*******************************************************!*\
  !*** ../../node_modules/opentracing/lib/constants.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * The FORMAT_BINARY format represents SpanContexts in an opaque binary
 * carrier.
 *
 * Tracer.inject() will set the buffer field to an Array-like (Array,
 * ArrayBuffer, or TypedBuffer) object containing the injected binary data.
 * Any valid Object can be used as long as the buffer field of the object
 * can be set.
 *
 * Tracer.extract() will look for `carrier.buffer`, and that field is
 * expected to be an Array-like object (Array, ArrayBuffer, or
 * TypedBuffer).
 */
exports.FORMAT_BINARY = 'binary';
/**
 * The FORMAT_TEXT_MAP format represents SpanContexts using a
 * string->string map (backed by a Javascript Object) as a carrier.
 *
 * NOTE: Unlike FORMAT_HTTP_HEADERS, FORMAT_TEXT_MAP places no restrictions
 * on the characters used in either the keys or the values of the map
 * entries.
 *
 * The FORMAT_TEXT_MAP carrier map may contain unrelated data (e.g.,
 * arbitrary gRPC metadata); as such, the Tracer implementation should use
 * a prefix or other convention to distinguish Tracer-specific key:value
 * pairs.
 */
exports.FORMAT_TEXT_MAP = 'text_map';
/**
 * The FORMAT_HTTP_HEADERS format represents SpanContexts using a
 * character-restricted string->string map (backed by a Javascript Object)
 * as a carrier.
 *
 * Keys and values in the FORMAT_HTTP_HEADERS carrier must be suitable for
 * use as HTTP headers (without modification or further escaping). That is,
 * the keys have a greatly restricted character set, casing for the keys
 * may not be preserved by various intermediaries, and the values should be
 * URL-escaped.
 *
 * The FORMAT_HTTP_HEADERS carrier map may contain unrelated data (e.g.,
 * arbitrary HTTP headers); as such, the Tracer implementation should use a
 * prefix or other convention to distinguish Tracer-specific key:value
 * pairs.
 */
exports.FORMAT_HTTP_HEADERS = 'http_headers';
/**
 * A Span may be the "child of" a parent Span. In a “child of” reference,
 * the parent Span depends on the child Span in some capacity.
 *
 * See more about reference types at https://github.com/opentracing/specification
 */
exports.REFERENCE_CHILD_OF = 'child_of';
/**
 * Some parent Spans do not depend in any way on the result of their child
 * Spans. In these cases, we say merely that the child Span “follows from”
 * the parent Span in a causal sense.
 *
 * See more about reference types at https://github.com/opentracing/specification
 */
exports.REFERENCE_FOLLOWS_FROM = 'follows_from';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../node_modules/opentracing/lib/functions.js":
/*!*******************************************************!*\
  !*** ../../node_modules/opentracing/lib/functions.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Constants = __webpack_require__(/*! ./constants */ "../../node_modules/opentracing/lib/constants.js");
var reference_1 = __webpack_require__(/*! ./reference */ "../../node_modules/opentracing/lib/reference.js");
var span_1 = __webpack_require__(/*! ./span */ "../../node_modules/opentracing/lib/span.js");
/**
 * Return a new REFERENCE_CHILD_OF reference.
 *
 * @param {SpanContext} spanContext - the parent SpanContext instance to
 *        reference.
 * @return a REFERENCE_CHILD_OF reference pointing to `spanContext`
 */
function childOf(spanContext) {
    // Allow the user to pass a Span instead of a SpanContext
    if (spanContext instanceof span_1.default) {
        spanContext = spanContext.context();
    }
    return new reference_1.default(Constants.REFERENCE_CHILD_OF, spanContext);
}
exports.childOf = childOf;
/**
 * Return a new REFERENCE_FOLLOWS_FROM reference.
 *
 * @param {SpanContext} spanContext - the parent SpanContext instance to
 *        reference.
 * @return a REFERENCE_FOLLOWS_FROM reference pointing to `spanContext`
 */
function followsFrom(spanContext) {
    // Allow the user to pass a Span instead of a SpanContext
    if (spanContext instanceof span_1.default) {
        spanContext = spanContext.context();
    }
    return new reference_1.default(Constants.REFERENCE_FOLLOWS_FROM, spanContext);
}
exports.followsFrom = followsFrom;
//# sourceMappingURL=functions.js.map

/***/ }),

/***/ "../../node_modules/opentracing/lib/noop.js":
/*!**************************************************!*\
  !*** ../../node_modules/opentracing/lib/noop.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var span_1 = __webpack_require__(/*! ./span */ "../../node_modules/opentracing/lib/span.js");
var span_context_1 = __webpack_require__(/*! ./span_context */ "../../node_modules/opentracing/lib/span_context.js");
var tracer_1 = __webpack_require__(/*! ./tracer */ "../../node_modules/opentracing/lib/tracer.js");
exports.tracer = null;
exports.spanContext = null;
exports.span = null;
// Deferred initialization to avoid a dependency cycle where Tracer depends on
// Span which depends on the noop tracer.
function initialize() {
    exports.tracer = new tracer_1.default();
    exports.span = new span_1.default();
    exports.spanContext = new span_context_1.default();
}
exports.initialize = initialize;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "../../node_modules/opentracing/lib/reference.js":
/*!*******************************************************!*\
  !*** ../../node_modules/opentracing/lib/reference.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var span_1 = __webpack_require__(/*! ./span */ "../../node_modules/opentracing/lib/span.js");
/**
 * Reference pairs a reference type constant (e.g., REFERENCE_CHILD_OF or
 * REFERENCE_FOLLOWS_FROM) with the SpanContext it points to.
 *
 * See the exported childOf() and followsFrom() functions at the package level.
 */
var Reference = /** @class */ (function () {
    /**
     * Initialize a new Reference instance.
     *
     * @param {string} type - the Reference type constant (e.g.,
     *        REFERENCE_CHILD_OF or REFERENCE_FOLLOWS_FROM).
     * @param {SpanContext} referencedContext - the SpanContext being referred
     *        to. As a convenience, a Span instance may be passed in instead
     *        (in which case its .context() is used here).
     */
    function Reference(type, referencedContext) {
        this._type = type;
        this._referencedContext = (referencedContext instanceof span_1.default ?
            referencedContext.context() :
            referencedContext);
    }
    /**
     * @return {string} The Reference type (e.g., REFERENCE_CHILD_OF or
     *         REFERENCE_FOLLOWS_FROM).
     */
    Reference.prototype.type = function () {
        return this._type;
    };
    /**
     * @return {SpanContext} The SpanContext being referred to (e.g., the
     *         parent in a REFERENCE_CHILD_OF Reference).
     */
    Reference.prototype.referencedContext = function () {
        return this._referencedContext;
    };
    return Reference;
}());
exports["default"] = Reference;
//# sourceMappingURL=reference.js.map

/***/ }),

/***/ "../../node_modules/opentracing/lib/span.js":
/*!**************************************************!*\
  !*** ../../node_modules/opentracing/lib/span.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var noop = __webpack_require__(/*! ./noop */ "../../node_modules/opentracing/lib/noop.js");
/**
 * Span represents a logical unit of work as part of a broader Trace. Examples
 * of span might include remote procedure calls or a in-process function calls
 * to sub-components. A Trace has a single, top-level "root" Span that in turn
 * may have zero or more child Spans, which in turn may have children.
 */
var Span = /** @class */ (function () {
    function Span() {
    }
    // ---------------------------------------------------------------------- //
    // OpenTracing API methods
    // ---------------------------------------------------------------------- //
    /**
     * Returns the SpanContext object associated with this Span.
     *
     * @return {SpanContext}
     */
    Span.prototype.context = function () {
        return this._context();
    };
    /**
     * Returns the Tracer object used to create this Span.
     *
     * @return {Tracer}
     */
    Span.prototype.tracer = function () {
        return this._tracer();
    };
    /**
     * Sets the string name for the logical operation this span represents.
     *
     * @param {string} name
     */
    Span.prototype.setOperationName = function (name) {
        this._setOperationName(name);
        return this;
    };
    /**
     * Sets a key:value pair on this Span that also propagates to future
     * children of the associated Span.
     *
     * setBaggageItem() enables powerful functionality given a full-stack
     * opentracing integration (e.g., arbitrary application data from a web
     * client can make it, transparently, all the way into the depths of a
     * storage system), and with it some powerful costs: use this feature with
     * care.
     *
     * IMPORTANT NOTE #1: setBaggageItem() will only propagate baggage items to
     * *future* causal descendants of the associated Span.
     *
     * IMPORTANT NOTE #2: Use this thoughtfully and with care. Every key and
     * value is copied into every local *and remote* child of the associated
     * Span, and that can add up to a lot of network and cpu overhead.
     *
     * @param {string} key
     * @param {string} value
     */
    Span.prototype.setBaggageItem = function (key, value) {
        this._setBaggageItem(key, value);
        return this;
    };
    /**
     * Returns the value for a baggage item given its key.
     *
     * @param  {string} key
     *         The key for the given trace attribute.
     * @return {string}
     *         String value for the given key, or undefined if the key does not
     *         correspond to a set trace attribute.
     */
    Span.prototype.getBaggageItem = function (key) {
        return this._getBaggageItem(key);
    };
    /**
     * Adds a single tag to the span.  See `addTags()` for details.
     *
     * @param {string} key
     * @param {any} value
     */
    Span.prototype.setTag = function (key, value) {
        // NOTE: the call is normalized to a call to _addTags()
        this._addTags((_a = {}, _a[key] = value, _a));
        return this;
        var _a;
    };
    /**
     * Adds the given key value pairs to the set of span tags.
     *
     * Multiple calls to addTags() results in the tags being the superset of
     * all calls.
     *
     * The behavior of setting the same key multiple times on the same span
     * is undefined.
     *
     * The supported type of the values is implementation-dependent.
     * Implementations are expected to safely handle all types of values but
     * may choose to ignore unrecognized / unhandle-able values (e.g. objects
     * with cyclic references, function objects).
     *
     * @return {[type]} [description]
     */
    Span.prototype.addTags = function (keyValueMap) {
        this._addTags(keyValueMap);
        return this;
    };
    /**
     * Add a log record to this Span, optionally at a user-provided timestamp.
     *
     * For example:
     *
     *     span.log({
     *         size: rpc.size(),  // numeric value
     *         URI: rpc.URI(),  // string value
     *         payload: rpc.payload(),  // Object value
     *         "keys can be arbitrary strings": rpc.foo(),
     *     });
     *
     *     span.log({
     *         "error.description": someError.description(),
     *     }, someError.timestampMillis());
     *
     * @param {object} keyValuePairs
     *        An object mapping string keys to arbitrary value types. All
     *        Tracer implementations should support bool, string, and numeric
     *        value types, and some may also support Object values.
     * @param {number} timestamp
     *        An optional parameter specifying the timestamp in milliseconds
     *        since the Unix epoch. Fractional values are allowed so that
     *        timestamps with sub-millisecond accuracy can be represented. If
     *        not specified, the implementation is expected to use its notion
     *        of the current time of the call.
     */
    Span.prototype.log = function (keyValuePairs, timestamp) {
        this._log(keyValuePairs, timestamp);
        return this;
    };
    /**
     * DEPRECATED
     */
    Span.prototype.logEvent = function (eventName, payload) {
        return this._log({ event: eventName, payload: payload });
    };
    /**
     * Sets the end timestamp and finalizes Span state.
     *
     * With the exception of calls to Span.context() (which are always allowed),
     * finish() must be the last call made to any span instance, and to do
     * otherwise leads to undefined behavior.
     *
     * @param  {number} finishTime
     *         Optional finish time in milliseconds as a Unix timestamp. Decimal
     *         values are supported for timestamps with sub-millisecond accuracy.
     *         If not specified, the current time (as defined by the
     *         implementation) will be used.
     */
    Span.prototype.finish = function (finishTime) {
        this._finish(finishTime);
        // Do not return `this`. The Span generally should not be used after it
        // is finished so chaining is not desired in this context.
    };
    // ---------------------------------------------------------------------- //
    // Derived classes can choose to implement the below
    // ---------------------------------------------------------------------- //
    // By default returns a no-op SpanContext.
    Span.prototype._context = function () {
        return noop.spanContext;
    };
    // By default returns a no-op tracer.
    //
    // The base class could store the tracer that created it, but it does not
    // in order to ensure the no-op span implementation has zero members,
    // which allows V8 to aggressively optimize calls to such objects.
    Span.prototype._tracer = function () {
        return noop.tracer;
    };
    // By default does nothing
    Span.prototype._setOperationName = function (name) {
    };
    // By default does nothing
    Span.prototype._setBaggageItem = function (key, value) {
    };
    // By default does nothing
    Span.prototype._getBaggageItem = function (key) {
        return undefined;
    };
    // By default does nothing
    //
    // NOTE: both setTag() and addTags() map to this function. keyValuePairs
    // will always be an associative array.
    Span.prototype._addTags = function (keyValuePairs) {
    };
    // By default does nothing
    Span.prototype._log = function (keyValuePairs, timestamp) {
    };
    // By default does nothing
    //
    // finishTime is expected to be either a number or undefined.
    Span.prototype._finish = function (finishTime) {
    };
    return Span;
}());
exports.Span = Span;
exports["default"] = Span;
//# sourceMappingURL=span.js.map

/***/ }),

/***/ "../../node_modules/opentracing/lib/span_context.js":
/*!**********************************************************!*\
  !*** ../../node_modules/opentracing/lib/span_context.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * SpanContext represents Span state that must propagate to descendant Spans
 * and across process boundaries.
 *
 * SpanContext is logically divided into two pieces: the user-level "Baggage"
 * (see setBaggageItem and getBaggageItem) that propagates across Span
 * boundaries and any Tracer-implementation-specific fields that are needed to
 * identify or otherwise contextualize the associated Span instance (e.g., a
 * <trace_id, span_id, sampled> tuple).
 */
var SpanContext = /** @class */ (function () {
    function SpanContext() {
    }
    return SpanContext;
}());
exports.SpanContext = SpanContext;
exports["default"] = SpanContext;
//# sourceMappingURL=span_context.js.map

/***/ }),

/***/ "../../node_modules/opentracing/lib/tracer.js":
/*!****************************************************!*\
  !*** ../../node_modules/opentracing/lib/tracer.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Functions = __webpack_require__(/*! ./functions */ "../../node_modules/opentracing/lib/functions.js");
var Noop = __webpack_require__(/*! ./noop */ "../../node_modules/opentracing/lib/noop.js");
var span_1 = __webpack_require__(/*! ./span */ "../../node_modules/opentracing/lib/span.js");
/**
 * Tracer is the entry-point between the instrumentation API and the tracing
 * implementation.
 *
 * The default object acts as a no-op implementation.
 *
 * Note to implementators: derived classes can choose to directly implement the
 * methods in the "OpenTracing API methods" section, or optionally the subset of
 * underscore-prefixed methods to pick up the argument checking and handling
 * automatically from the base class.
 */
var Tracer = /** @class */ (function () {
    function Tracer() {
    }
    // ---------------------------------------------------------------------- //
    // OpenTracing API methods
    // ---------------------------------------------------------------------- //
    /**
     * Starts and returns a new Span representing a logical unit of work.
     *
     * For example:
     *
     *     // Start a new (parentless) root Span:
     *     var parent = Tracer.startSpan('DoWork');
     *
     *     // Start a new (child) Span:
     *     var child = Tracer.startSpan('load-from-db', {
     *         childOf: parent.context(),
     *     });
     *
     *     // Start a new async (FollowsFrom) Span:
     *     var child = Tracer.startSpan('async-cache-write', {
     *         references: [
     *             opentracing.followsFrom(parent.context())
     *         ],
     *     });
     *
     * @param {string} name - the name of the operation (REQUIRED).
     * @param {SpanOptions} [options] - options for the newly created span.
     * @return {Span} - a new Span object.
     */
    Tracer.prototype.startSpan = function (name, options) {
        if (options === void 0) { options = {}; }
        // Convert options.childOf to fields.references as needed.
        if (options.childOf) {
            // Convert from a Span or a SpanContext into a Reference.
            var childOf = Functions.childOf(options.childOf);
            if (options.references) {
                options.references.push(childOf);
            }
            else {
                options.references = [childOf];
            }
            delete (options.childOf);
        }
        return this._startSpan(name, options);
    };
    /**
     * Injects the given SpanContext instance for cross-process propagation
     * within `carrier`. The expected type of `carrier` depends on the value of
     * `format.
     *
     * OpenTracing defines a common set of `format` values (see
     * FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS, and FORMAT_BINARY), and each has
     * an expected carrier type.
     *
     * Consider this pseudocode example:
     *
     *     var clientSpan = ...;
     *     ...
     *     // Inject clientSpan into a text carrier.
     *     var headersCarrier = {};
     *     Tracer.inject(clientSpan.context(), Tracer.FORMAT_HTTP_HEADERS, headersCarrier);
     *     // Incorporate the textCarrier into the outbound HTTP request header
     *     // map.
     *     Object.assign(outboundHTTPReq.headers, headersCarrier);
     *     // ... send the httpReq
     *
     * @param  {SpanContext} spanContext - the SpanContext to inject into the
     *         carrier object. As a convenience, a Span instance may be passed
     *         in instead (in which case its .context() is used for the
     *         inject()).
     * @param  {string} format - the format of the carrier.
     * @param  {any} carrier - see the documentation for the chosen `format`
     *         for a description of the carrier object.
     */
    Tracer.prototype.inject = function (spanContext, format, carrier) {
        // Allow the user to pass a Span instead of a SpanContext
        if (spanContext instanceof span_1.default) {
            spanContext = spanContext.context();
        }
        return this._inject(spanContext, format, carrier);
    };
    /**
     * Returns a SpanContext instance extracted from `carrier` in the given
     * `format`.
     *
     * OpenTracing defines a common set of `format` values (see
     * FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS, and FORMAT_BINARY), and each has
     * an expected carrier type.
     *
     * Consider this pseudocode example:
     *
     *     // Use the inbound HTTP request's headers as a text map carrier.
     *     var headersCarrier = inboundHTTPReq.headers;
     *     var wireCtx = Tracer.extract(Tracer.FORMAT_HTTP_HEADERS, headersCarrier);
     *     var serverSpan = Tracer.startSpan('...', { childOf : wireCtx });
     *
     * @param  {string} format - the format of the carrier.
     * @param  {any} carrier - the type of the carrier object is determined by
     *         the format.
     * @return {SpanContext}
     *         The extracted SpanContext, or null if no such SpanContext could
     *         be found in `carrier`
     */
    Tracer.prototype.extract = function (format, carrier) {
        return this._extract(format, carrier);
    };
    // ---------------------------------------------------------------------- //
    // Derived classes can choose to implement the below
    // ---------------------------------------------------------------------- //
    // NOTE: the input to this method is *always* an associative array. The
    // public-facing startSpan() method normalizes the arguments so that
    // all N implementations do not need to worry about variations in the call
    // signature.
    //
    // The default behavior returns a no-op span.
    Tracer.prototype._startSpan = function (name, fields) {
        return Noop.span;
    };
    // The default behavior is a no-op.
    Tracer.prototype._inject = function (spanContext, format, carrier) {
    };
    // The default behavior is to return a no-op SpanContext.
    Tracer.prototype._extract = function (format, carrier) {
        return Noop.spanContext;
    };
    return Tracer;
}());
exports.Tracer = Tracer;
exports["default"] = Tracer;
//# sourceMappingURL=tracer.js.map

/***/ }),

/***/ "../../node_modules/promise-polyfill/src/finally.js":
/*!**********************************************************!*\
  !*** ../../node_modules/promise-polyfill/src/finally.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

/* harmony default export */ __webpack_exports__["default"] = (finallyConstructor);


/***/ }),

/***/ "../../node_modules/promise-polyfill/src/index.js":
/*!********************************************************!*\
  !*** ../../node_modules/promise-polyfill/src/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./finally */ "../../node_modules/promise-polyfill/src/finally.js");


// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_0__["default"];

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Promise);


/***/ }),

/***/ "../../node_modules/stackframe/stackframe.js":
/*!***************************************************!*\
  !*** ../../node_modules/stackframe/stackframe.js ***!
  \***************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
        if (functionName !== undefined) {
            this.setFunctionName(functionName);
        }
        if (args !== undefined) {
            this.setArgs(args);
        }
        if (fileName !== undefined) {
            this.setFileName(fileName);
        }
        if (lineNumber !== undefined) {
            this.setLineNumber(lineNumber);
        }
        if (columnNumber !== undefined) {
            this.setColumnNumber(columnNumber);
        }
        if (source !== undefined) {
            this.setSource(source);
        }
    }

    StackFrame.prototype = {
        getFunctionName: function () {
            return this.functionName;
        },
        setFunctionName: function (v) {
            this.functionName = String(v);
        },

        getArgs: function () {
            return this.args;
        },
        setArgs: function (v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        // NOTE: Property name may be misleading as it includes the path,
        // but it somewhat mirrors V8's JavaScriptStackTraceApi
        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
        getFileName: function () {
            return this.fileName;
        },
        setFileName: function (v) {
            this.fileName = String(v);
        },

        getLineNumber: function () {
            return this.lineNumber;
        },
        setLineNumber: function (v) {
            if (!_isNumber(v)) {
                throw new TypeError('Line Number must be a Number');
            }
            this.lineNumber = Number(v);
        },

        getColumnNumber: function () {
            return this.columnNumber;
        },
        setColumnNumber: function (v) {
            if (!_isNumber(v)) {
                throw new TypeError('Column Number must be a Number');
            }
            this.columnNumber = Number(v);
        },

        getSource: function () {
            return this.source;
        },
        setSource: function (v) {
            this.source = String(v);
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    return StackFrame;
}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!****************************!*\
  !*** ./src/opentracing.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApmBase: function() { return /* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ApmBase; },
/* harmony export */   apm: function() { return /* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.apm; },
/* harmony export */   apmBase: function() { return /* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.apmBase; },
/* harmony export */   createTracer: function() { return /* binding */ createTracer; },
/* harmony export */   init: function() { return /* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.init; }
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var opentracing_lib_tracer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! opentracing/lib/tracer */ "../../node_modules/opentracing/lib/tracer.js");
/* harmony import */ var _elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @elastic/apm-rum-core */ "../rum-core/dist/es/opentracing/index.js");




function createTracer(apmBase) {
  if (apmBase._disable) {
    return new opentracing_lib_tracer__WEBPACK_IMPORTED_MODULE_1__.Tracer();
  }

  return (0,_elastic_apm_rum_core__WEBPACK_IMPORTED_MODULE_2__.createTracer)(apmBase.serviceFactory);
}

if (typeof window !== 'undefined' && window.elasticApm) {
  window.elasticApm.createTracer = createTracer.bind(window.elasticApm, window.elasticApm);
}

/* harmony default export */ __webpack_exports__["default"] = (createTracer);

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1hcG0tb3BlbnRyYWNpbmcudW1kLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFEQTs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BOztBQUVBO0FBQ0E7O0FBRUE7QUFBQTs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFWQTtBQVlBO0FBYkE7QUFlQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQUE7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBOztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwV0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQVBBO0FBU0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFWQTtBQVlBO0FBYkE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTs7QUFXQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFoQkE7O0FBbUJBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQVJBO0FBVUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFKQTtBQUpBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM1VBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0JBO0FBaUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQVBBO0FBU0E7O0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUxBO0FBT0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFMQTtBQU9BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQVhBOztBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNLQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTs7QUFNQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBOztBQU1BO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBSkE7QUFXQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUpBOztBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFBQTs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQU5BO0FBUUE7QUFDQTtBQURBO0FBVEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBYkE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQUdBO0FBWkE7O0FBZUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFMQTs7QUFRQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUlBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcFhBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUFBO0FBQUE7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQVJBOztBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUpBO0FBU0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQURBOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFLQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFEQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRkE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBREE7O0FBSUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQVhBO0FBYUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBWEE7O0FBY0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBUUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFGQTs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQU5BO0FBUUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBS0E7O0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBYkE7QUFtQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUZBOztBQUtBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQURBO0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7O0FBS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7QUFRQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUlBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBR0E7O0FBRUE7QUFDQTtBQURBOztBQUlBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBbEJBO0FBb0JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoV0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFBQTs7QUFPQTs7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBS0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQURBOztBQVFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JaQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUtBOztBQUVBO0FBQ0E7QUFDQTtBQUZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN1QkE7O0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBOztBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBWUE7QUFDQTtBQUlBO0FBQ0E7QUFJQTs7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBOztBQUVBO0FBQUE7QUFBQTs7QUFHQTtBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFPQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQVVBO0FBTUE7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFGQTs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7O0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBaUJBO0FBQ0E7QUFBQTtBQUFBOztBQUlBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1NBO0FBS0E7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ21CQTtBQUNBO0FBQ0E7O0FBRUE7QUFLQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBSUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vYWZ0ZXItZnJhbWUuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi9hcG0tc2VydmVyLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vY29tcHJlc3MuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi9jb25maWctc2VydmljZS5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvY29tbW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvY29tbW9uL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi9ldmVudC1oYW5kbGVyLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vaHR0cC9mZXRjaC5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvY29tbW9uL2h0dHAvcmVzcG9uc2Utc3RhdHVzLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vaHR0cC94aHIuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi9pbnN0cnVtZW50LmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vbG9nZ2luZy1zZXJ2aWNlLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vbmRqc29uLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vb2JzZXJ2ZXJzL3BhZ2UtY2xpY2tzLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vb2JzZXJ2ZXJzL3BhZ2UtdmlzaWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvY29tbW9uL3BhdGNoaW5nL2ZldGNoLXBhdGNoLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vcGF0Y2hpbmcvaGlzdG9yeS1wYXRjaC5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvY29tbW9uL3BhdGNoaW5nL2luZGV4LmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vcGF0Y2hpbmcvcGF0Y2gtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi9wYXRjaGluZy94aHItcGF0Y2guanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi9wb2x5ZmlsbHMuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi9xdWV1ZS5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvY29tbW9uL3NlcnZpY2UtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvY29tbW9uL3Rocm90dGxlLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9jb21tb24vdHJ1bmNhdGUuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi91cmwuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL2NvbW1vbi91dGlscy5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvZXJyb3ItbG9nZ2luZy9lcnJvci1sb2dnaW5nLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9lcnJvci1sb2dnaW5nL2luZGV4LmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9lcnJvci1sb2dnaW5nL3N0YWNrLXRyYWNlLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvb3BlbnRyYWNpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL29wZW50cmFjaW5nL3NwYW4uanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL29wZW50cmFjaW5nL3RyYWNlci5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvcGVyZm9ybWFuY2UtbW9uaXRvcmluZy9icmVha2Rvd24uanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL3BlcmZvcm1hbmNlLW1vbml0b3JpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL3BlcmZvcm1hbmNlLW1vbml0b3JpbmcvbWV0cmljcy9pbnAvcHJvY2Vzcy5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvcGVyZm9ybWFuY2UtbW9uaXRvcmluZy9tZXRyaWNzL2lucC9yZXBvcnQuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL3BlcmZvcm1hbmNlLW1vbml0b3JpbmcvbWV0cmljcy9tZXRyaWNzLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9wZXJmb3JtYW5jZS1tb25pdG9yaW5nL25hdmlnYXRpb24vY2FwdHVyZS1uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9wZXJmb3JtYW5jZS1tb25pdG9yaW5nL25hdmlnYXRpb24vbWFya3MuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL3BlcmZvcm1hbmNlLW1vbml0b3JpbmcvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLXRpbWluZy5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvcGVyZm9ybWFuY2UtbW9uaXRvcmluZy9uYXZpZ2F0aW9uL3Jlc291cmNlLXRpbWluZy5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvcGVyZm9ybWFuY2UtbW9uaXRvcmluZy9uYXZpZ2F0aW9uL3VzZXItdGltaW5nLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9wZXJmb3JtYW5jZS1tb25pdG9yaW5nL25hdmlnYXRpb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL3BlcmZvcm1hbmNlLW1vbml0b3JpbmcvcGVyZm9ybWFuY2UtbW9uaXRvcmluZy5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvcGVyZm9ybWFuY2UtbW9uaXRvcmluZy9zcGFuLWJhc2UuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi9ydW0tY29yZS9kaXN0L2VzL3BlcmZvcm1hbmNlLW1vbml0b3Jpbmcvc3Bhbi5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uL3J1bS1jb3JlL2Rpc3QvZXMvcGVyZm9ybWFuY2UtbW9uaXRvcmluZy90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9wZXJmb3JtYW5jZS1tb25pdG9yaW5nL3RyYW5zYWN0aW9uLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vcnVtLWNvcmUvZGlzdC9lcy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4vc3JjL2FwbS1iYXNlLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi8uLi9ub2RlX21vZHVsZXMvZXJyb3Itc3RhY2stcGFyc2VyL2Vycm9yLXN0YWNrLXBhcnNlci5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uLy4uL25vZGVfbW9kdWxlcy9vcGVudHJhY2luZy9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vLi4vbm9kZV9tb2R1bGVzL29wZW50cmFjaW5nL2xpYi9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi8uLi9ub2RlX21vZHVsZXMvb3BlbnRyYWNpbmcvbGliL25vb3AuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi8uLi9ub2RlX21vZHVsZXMvb3BlbnRyYWNpbmcvbGliL3JlZmVyZW5jZS5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uLy4uL25vZGVfbW9kdWxlcy9vcGVudHJhY2luZy9saWIvc3Bhbi5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uLy4uL25vZGVfbW9kdWxlcy9vcGVudHJhY2luZy9saWIvc3Bhbl9jb250ZXh0LmpzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vLi4vLi4vbm9kZV9tb2R1bGVzL29wZW50cmFjaW5nL2xpYi90cmFjZXIuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uLi8uLi9ub2RlX21vZHVsZXMvcHJvbWlzZS1wb2x5ZmlsbC9zcmMvZmluYWxseS5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9taXNlLXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtLy4uLy4uL25vZGVfbW9kdWxlcy9zdGFja2ZyYW1lL3N0YWNrZnJhbWUuanMiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BlbGFzdGljL2FwbS1ydW0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZWxhc3RpYy9hcG0tcnVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGVsYXN0aWMvYXBtLXJ1bS8uL3NyYy9vcGVudHJhY2luZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJlbGFzdGljLWFwbS1vcGVudHJhY2luZ1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJlbGFzdGljLWFwbS1vcGVudHJhY2luZ1wiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImltcG9ydCB7IGlzUGxhdGZvcm1TdXBwb3J0ZWQsIGlzQnJvd3Nlciwgbm93IH0gZnJvbSAnLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgcGF0Y2hBbGwgfSBmcm9tICcuL2NvbW1vbi9wYXRjaGluZyc7XG5pbXBvcnQgeyBzdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xudmFyIGVuYWJsZWQgPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXAoKSB7XG4gIGlmIChpc1BsYXRmb3JtU3VwcG9ydGVkKCkpIHtcbiAgICBwYXRjaEFsbCgpO1xuICAgIHN0YXRlLmJvb3RzdHJhcFRpbWUgPSBub3coKTtcbiAgICBlbmFibGVkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0Jyb3dzZXIpIHtcbiAgICBjb25zb2xlLmxvZygnW0VsYXN0aWMgQVBNXSBwbGF0Zm9ybSBpcyBub3Qgc3VwcG9ydGVkIScpO1xuICB9XG5cbiAgcmV0dXJuIGVuYWJsZWQ7XG59IiwidmFyIFJBRl9USU1FT1VUID0gMTAwO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWZ0ZXJGcmFtZShjYWxsYmFjaykge1xuICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgc2V0VGltZW91dChjYWxsYmFjayk7XG4gIH07XG5cbiAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGhhbmRsZXIsIFJBRl9USU1FT1VUKTtcbiAgdmFyIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGVyKTtcbn0iLCJpbXBvcnQgUXVldWUgZnJvbSAnLi9xdWV1ZSc7XG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnLi90aHJvdHRsZSc7XG5pbXBvcnQgTkRKU09OIGZyb20gJy4vbmRqc29uJztcbmltcG9ydCB7IHRydW5jYXRlTW9kZWwsIE1FVEFEQVRBX01PREVMIH0gZnJvbSAnLi90cnVuY2F0ZSc7XG5pbXBvcnQgeyBFUlJPUlMsIEhUVFBfUkVRVUVTVF9USU1FT1VULCBRVUVVRV9GTFVTSCwgVFJBTlNBQ1RJT05TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJy4vcG9seWZpbGxzJztcbmltcG9ydCB7IGNvbXByZXNzTWV0YWRhdGEsIGNvbXByZXNzVHJhbnNhY3Rpb24sIGNvbXByZXNzRXJyb3IsIGNvbXByZXNzUGF5bG9hZCB9IGZyb20gJy4vY29tcHJlc3MnO1xuaW1wb3J0IHsgX19ERVZfXyB9IGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7IHNlbmRGZXRjaFJlcXVlc3QsIHNob3VsZFVzZUZldGNoV2l0aEtlZXBBbGl2ZSB9IGZyb20gJy4vaHR0cC9mZXRjaCc7XG5pbXBvcnQgeyBzZW5kWEhSIH0gZnJvbSAnLi9odHRwL3hocic7XG52YXIgVEhST1RUTEVfSU5URVJWQUwgPSA2MDAwMDtcblxudmFyIEFwbVNlcnZlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQXBtU2VydmVyKGNvbmZpZ1NlcnZpY2UsIGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgdGhpcy5fY29uZmlnU2VydmljZSA9IGNvbmZpZ1NlcnZpY2U7XG4gICAgdGhpcy5fbG9nZ2luZ1NlcnZpY2UgPSBsb2dnaW5nU2VydmljZTtcbiAgICB0aGlzLnF1ZXVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGhyb3R0bGVFdmVudHMgPSBub29wO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEFwbVNlcnZlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcXVldWVMaW1pdCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0KCdxdWV1ZUxpbWl0Jyk7XG5cbiAgICB2YXIgZmx1c2hJbnRlcnZhbCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0KCdmbHVzaEludGVydmFsJyk7XG5cbiAgICB2YXIgbGltaXQgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldCgnZXZlbnRzTGltaXQnKTtcblxuICAgIHZhciBvbkZsdXNoID0gZnVuY3Rpb24gb25GbHVzaChldmVudHMpIHtcbiAgICAgIHZhciBwcm9taXNlID0gX3RoaXMuc2VuZEV2ZW50cyhldmVudHMpO1xuXG4gICAgICBpZiAocHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlLmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICBfdGhpcy5fbG9nZ2luZ1NlcnZpY2Uud2FybignRmFpbGVkIHNlbmRpbmcgZXZlbnRzIScsIF90aGlzLl9jb25zdHJ1Y3RFcnJvcihyZWFzb24pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucXVldWUgPSBuZXcgUXVldWUob25GbHVzaCwge1xuICAgICAgcXVldWVMaW1pdDogcXVldWVMaW1pdCxcbiAgICAgIGZsdXNoSW50ZXJ2YWw6IGZsdXNoSW50ZXJ2YWxcbiAgICB9KTtcbiAgICB0aGlzLnRocm90dGxlRXZlbnRzID0gdGhyb3R0bGUodGhpcy5xdWV1ZS5hZGQuYmluZCh0aGlzLnF1ZXVlKSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLl9sb2dnaW5nU2VydmljZS53YXJuKCdEcm9wcGVkIGV2ZW50cyBkdWUgdG8gdGhyb3R0bGluZyEnKTtcbiAgICB9LCB7XG4gICAgICBsaW1pdDogbGltaXQsXG4gICAgICBpbnRlcnZhbDogVEhST1RUTEVfSU5URVJWQUxcbiAgICB9KTtcblxuICAgIHRoaXMuX2NvbmZpZ1NlcnZpY2Uub2JzZXJ2ZUV2ZW50KFFVRVVFX0ZMVVNILCBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5xdWV1ZS5mbHVzaCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5fcG9zdEpzb24gPSBmdW5jdGlvbiBfcG9zdEpzb24oZW5kUG9pbnQsIHBheWxvYWQpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBoZWFkZXJzID0ge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LW5kanNvbidcbiAgICB9O1xuXG4gICAgdmFyIGFwbVJlcXVlc3QgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldCgnYXBtUmVxdWVzdCcpO1xuXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgYmVmb3JlU2VuZDogYXBtUmVxdWVzdFxuICAgIH07XG4gICAgcmV0dXJuIGNvbXByZXNzUGF5bG9hZChwYXJhbXMpLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgX3RoaXMyLl9sb2dnaW5nU2VydmljZS5kZWJ1ZygnQ29tcHJlc3NpbmcgdGhlIHBheWxvYWQgdXNpbmcgQ29tcHJlc3Npb25TdHJlYW0gQVBJIGZhaWxlZCcsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIF90aGlzMi5fbWFrZUh0dHBSZXF1ZXN0KCdQT1NUJywgZW5kUG9pbnQsIHJlc3VsdCk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIHJlc3BvbnNlVGV4dCA9IF9yZWYucmVzcG9uc2VUZXh0O1xuICAgICAgcmV0dXJuIHJlc3BvbnNlVGV4dDtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uX2NvbnN0cnVjdEVycm9yID0gZnVuY3Rpb24gX2NvbnN0cnVjdEVycm9yKHJlYXNvbikge1xuICAgIHZhciB1cmwgPSByZWFzb24udXJsLFxuICAgICAgICBzdGF0dXMgPSByZWFzb24uc3RhdHVzLFxuICAgICAgICByZXNwb25zZVRleHQgPSByZWFzb24ucmVzcG9uc2VUZXh0O1xuXG4gICAgaWYgKHR5cGVvZiBzdGF0dXMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiByZWFzb247XG4gICAgfVxuXG4gICAgdmFyIG1lc3NhZ2UgPSB1cmwgKyAnIEhUVFAgc3RhdHVzOiAnICsgc3RhdHVzO1xuXG4gICAgaWYgKF9fREVWX18gJiYgcmVzcG9uc2VUZXh0KSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgc2VydmVyRXJyb3JzID0gW107XG4gICAgICAgIHZhciByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3JzICYmIHJlc3BvbnNlLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmVzcG9uc2UuZXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHNlcnZlckVycm9ycy5wdXNoKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXNzYWdlICs9ICcgJyArIHNlcnZlckVycm9ycy5qb2luKCcsJyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2luZ1NlcnZpY2UuZGVidWcoJ0Vycm9yIHBhcnNpbmcgcmVzcG9uc2UgZnJvbSBBUE0gc2VydmVyJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfTtcblxuICBfcHJvdG8uX21ha2VIdHRwUmVxdWVzdCA9IGZ1bmN0aW9uIF9tYWtlSHR0cFJlcXVlc3QobWV0aG9kLCB1cmwsIF90ZW1wKSB7XG4gICAgdmFyIF9yZWYyID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXAsXG4gICAgICAgIF9yZWYyJHRpbWVvdXQgPSBfcmVmMi50aW1lb3V0LFxuICAgICAgICB0aW1lb3V0ID0gX3JlZjIkdGltZW91dCA9PT0gdm9pZCAwID8gSFRUUF9SRVFVRVNUX1RJTUVPVVQgOiBfcmVmMiR0aW1lb3V0LFxuICAgICAgICBwYXlsb2FkID0gX3JlZjIucGF5bG9hZCxcbiAgICAgICAgaGVhZGVycyA9IF9yZWYyLmhlYWRlcnMsXG4gICAgICAgIGJlZm9yZVNlbmQgPSBfcmVmMi5iZWZvcmVTZW5kO1xuXG4gICAgdmFyIHNlbmRDcmVkZW50aWFscyA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0KCdzZW5kQ3JlZGVudGlhbHMnKTtcblxuICAgIGlmICghYmVmb3JlU2VuZCAmJiBzaG91bGRVc2VGZXRjaFdpdGhLZWVwQWxpdmUobWV0aG9kLCBwYXlsb2FkKSkge1xuICAgICAgcmV0dXJuIHNlbmRGZXRjaFJlcXVlc3QobWV0aG9kLCB1cmwsIHtcbiAgICAgICAga2VlcGFsaXZlOiB0cnVlLFxuICAgICAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICBzZW5kQ3JlZGVudGlhbHM6IHNlbmRDcmVkZW50aWFsc1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICBpZiAocmVhc29uIGluc3RhbmNlb2YgVHlwZUVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbmRYSFIobWV0aG9kLCB1cmwsIHtcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVvdXQsXG4gICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGJlZm9yZVNlbmQsXG4gICAgICAgICAgICBzZW5kQ3JlZGVudGlhbHM6IHNlbmRDcmVkZW50aWFsc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbmRYSFIobWV0aG9kLCB1cmwsIHtcbiAgICAgIHRpbWVvdXQ6IHRpbWVvdXQsXG4gICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIGJlZm9yZVNlbmQ6IGJlZm9yZVNlbmQsXG4gICAgICBzZW5kQ3JlZGVudGlhbHM6IHNlbmRDcmVkZW50aWFsc1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5mZXRjaENvbmZpZyA9IGZ1bmN0aW9uIGZldGNoQ29uZmlnKHNlcnZpY2VOYW1lLCBlbnZpcm9ubWVudCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIF90aGlzJGdldEVuZHBvaW50cyA9IHRoaXMuZ2V0RW5kcG9pbnRzKCksXG4gICAgICAgIGNvbmZpZ0VuZHBvaW50ID0gX3RoaXMkZ2V0RW5kcG9pbnRzLmNvbmZpZ0VuZHBvaW50O1xuXG4gICAgaWYgKCFzZXJ2aWNlTmFtZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdzZXJ2aWNlTmFtZSBpcyByZXF1aXJlZCBmb3IgZmV0Y2hpbmcgY2VudHJhbCBjb25maWcuJyk7XG4gICAgfVxuXG4gICAgY29uZmlnRW5kcG9pbnQgKz0gXCI/c2VydmljZS5uYW1lPVwiICsgc2VydmljZU5hbWU7XG5cbiAgICBpZiAoZW52aXJvbm1lbnQpIHtcbiAgICAgIGNvbmZpZ0VuZHBvaW50ICs9IFwiJnNlcnZpY2UuZW52aXJvbm1lbnQ9XCIgKyBlbnZpcm9ubWVudDtcbiAgICB9XG5cbiAgICB2YXIgbG9jYWxDb25maWcgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldExvY2FsQ29uZmlnKCk7XG5cbiAgICBpZiAobG9jYWxDb25maWcpIHtcbiAgICAgIGNvbmZpZ0VuZHBvaW50ICs9IFwiJmlmbm9uZW1hdGNoPVwiICsgbG9jYWxDb25maWcuZXRhZztcbiAgICB9XG5cbiAgICB2YXIgYXBtUmVxdWVzdCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0KCdhcG1SZXF1ZXN0Jyk7XG5cbiAgICByZXR1cm4gdGhpcy5fbWFrZUh0dHBSZXF1ZXN0KCdHRVQnLCBjb25maWdFbmRwb2ludCwge1xuICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgIGJlZm9yZVNlbmQ6IGFwbVJlcXVlc3RcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgIHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzLFxuICAgICAgICAgIHJlc3BvbnNlVGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XG5cbiAgICAgIGlmIChzdGF0dXMgPT09IDMwNCkge1xuICAgICAgICByZXR1cm4gbG9jYWxDb25maWc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVtb3RlQ29uZmlnID0gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgICB2YXIgZXRhZyA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignZXRhZycpO1xuXG4gICAgICAgIGlmIChldGFnKSB7XG4gICAgICAgICAgcmVtb3RlQ29uZmlnLmV0YWcgPSBldGFnLnJlcGxhY2UoL1tcIl0vZywgJycpO1xuXG4gICAgICAgICAgX3RoaXMzLl9jb25maWdTZXJ2aWNlLnNldExvY2FsQ29uZmlnKHJlbW90ZUNvbmZpZywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVtb3RlQ29uZmlnO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHZhciBlcnJvciA9IF90aGlzMy5fY29uc3RydWN0RXJyb3IocmVhc29uKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlTWV0YURhdGEgPSBmdW5jdGlvbiBjcmVhdGVNZXRhRGF0YSgpIHtcbiAgICB2YXIgY2ZnID0gdGhpcy5fY29uZmlnU2VydmljZTtcbiAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICBzZXJ2aWNlOiB7XG4gICAgICAgIG5hbWU6IGNmZy5nZXQoJ3NlcnZpY2VOYW1lJyksXG4gICAgICAgIHZlcnNpb246IGNmZy5nZXQoJ3NlcnZpY2VWZXJzaW9uJyksXG4gICAgICAgIGFnZW50OiB7XG4gICAgICAgICAgbmFtZTogJ3J1bS1qcycsXG4gICAgICAgICAgdmVyc2lvbjogY2ZnLnZlcnNpb25cbiAgICAgICAgfSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnamF2YXNjcmlwdCdcbiAgICAgICAgfSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IGNmZy5nZXQoJ2Vudmlyb25tZW50JylcbiAgICAgIH0sXG4gICAgICBsYWJlbHM6IGNmZy5nZXQoJ2NvbnRleHQudGFncycpXG4gICAgfTtcbiAgICByZXR1cm4gdHJ1bmNhdGVNb2RlbChNRVRBREFUQV9NT0RFTCwgbWV0YWRhdGEpO1xuICB9O1xuXG4gIF9wcm90by5hZGRFcnJvciA9IGZ1bmN0aW9uIGFkZEVycm9yKGVycm9yKSB7XG4gICAgdmFyIF90aGlzJHRocm90dGxlRXZlbnRzO1xuXG4gICAgdGhpcy50aHJvdHRsZUV2ZW50cygoX3RoaXMkdGhyb3R0bGVFdmVudHMgPSB7fSwgX3RoaXMkdGhyb3R0bGVFdmVudHNbRVJST1JTXSA9IGVycm9yLCBfdGhpcyR0aHJvdHRsZUV2ZW50cykpO1xuICB9O1xuXG4gIF9wcm90by5hZGRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIGFkZFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKSB7XG4gICAgdmFyIF90aGlzJHRocm90dGxlRXZlbnRzMjtcblxuICAgIHRoaXMudGhyb3R0bGVFdmVudHMoKF90aGlzJHRocm90dGxlRXZlbnRzMiA9IHt9LCBfdGhpcyR0aHJvdHRsZUV2ZW50czJbVFJBTlNBQ1RJT05TXSA9IHRyYW5zYWN0aW9uLCBfdGhpcyR0aHJvdHRsZUV2ZW50czIpKTtcbiAgfTtcblxuICBfcHJvdG8ubmRqc29uRXJyb3JzID0gZnVuY3Rpb24gbmRqc29uRXJyb3JzKGVycm9ycywgY29tcHJlc3MpIHtcbiAgICB2YXIga2V5ID0gY29tcHJlc3MgPyAnZScgOiAnZXJyb3InO1xuICAgIHJldHVybiBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9OREpTT04kc3RyaW5naWZ5O1xuXG4gICAgICByZXR1cm4gTkRKU09OLnN0cmluZ2lmeSgoX05ESlNPTiRzdHJpbmdpZnkgPSB7fSwgX05ESlNPTiRzdHJpbmdpZnlba2V5XSA9IGNvbXByZXNzID8gY29tcHJlc3NFcnJvcihlcnJvcikgOiBlcnJvciwgX05ESlNPTiRzdHJpbmdpZnkpKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8ubmRqc29uTWV0cmljc2V0cyA9IGZ1bmN0aW9uIG5kanNvbk1ldHJpY3NldHMobWV0cmljc2V0cykge1xuICAgIHJldHVybiBtZXRyaWNzZXRzLm1hcChmdW5jdGlvbiAobWV0cmljc2V0KSB7XG4gICAgICByZXR1cm4gTkRKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG1ldHJpY3NldDogbWV0cmljc2V0XG4gICAgICB9KTtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTtcblxuICBfcHJvdG8ubmRqc29uVHJhbnNhY3Rpb25zID0gZnVuY3Rpb24gbmRqc29uVHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9ucywgY29tcHJlc3MpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciBrZXkgPSBjb21wcmVzcyA/ICd4JyA6ICd0cmFuc2FjdGlvbic7XG4gICAgcmV0dXJuIHRyYW5zYWN0aW9ucy5tYXAoZnVuY3Rpb24gKHRyKSB7XG4gICAgICB2YXIgX05ESlNPTiRzdHJpbmdpZnkyO1xuXG4gICAgICB2YXIgc3BhbnMgPSAnJyxcbiAgICAgICAgICBicmVha2Rvd25zID0gJyc7XG5cbiAgICAgIGlmICghY29tcHJlc3MpIHtcbiAgICAgICAgaWYgKHRyLnNwYW5zKSB7XG4gICAgICAgICAgc3BhbnMgPSB0ci5zcGFucy5tYXAoZnVuY3Rpb24gKHNwYW4pIHtcbiAgICAgICAgICAgIHJldHVybiBOREpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgc3Bhbjogc3BhblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgICAgZGVsZXRlIHRyLnNwYW5zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyLmJyZWFrZG93bikge1xuICAgICAgICAgIGJyZWFrZG93bnMgPSBfdGhpczQubmRqc29uTWV0cmljc2V0cyh0ci5icmVha2Rvd24pO1xuICAgICAgICAgIGRlbGV0ZSB0ci5icmVha2Rvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE5ESlNPTi5zdHJpbmdpZnkoKF9OREpTT04kc3RyaW5naWZ5MiA9IHt9LCBfTkRKU09OJHN0cmluZ2lmeTJba2V5XSA9IGNvbXByZXNzID8gY29tcHJlc3NUcmFuc2FjdGlvbih0cikgOiB0ciwgX05ESlNPTiRzdHJpbmdpZnkyKSkgKyBzcGFucyArIGJyZWFrZG93bnM7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLnNlbmRFdmVudHMgPSBmdW5jdGlvbiBzZW5kRXZlbnRzKGV2ZW50cykge1xuICAgIHZhciBfcGF5bG9hZCwgX05ESlNPTiRzdHJpbmdpZnkzO1xuXG4gICAgaWYgKGV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNhY3Rpb25zID0gW107XG4gICAgdmFyIGVycm9ycyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcblxuICAgICAgaWYgKGV2ZW50W1RSQU5TQUNUSU9OU10pIHtcbiAgICAgICAgdHJhbnNhY3Rpb25zLnB1c2goZXZlbnRbVFJBTlNBQ1RJT05TXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudFtFUlJPUlNdKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKGV2ZW50W0VSUk9SU10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0cmFuc2FjdGlvbnMubGVuZ3RoID09PSAwICYmIGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2ZnID0gdGhpcy5fY29uZmlnU2VydmljZTtcbiAgICB2YXIgcGF5bG9hZCA9IChfcGF5bG9hZCA9IHt9LCBfcGF5bG9hZFtUUkFOU0FDVElPTlNdID0gdHJhbnNhY3Rpb25zLCBfcGF5bG9hZFtFUlJPUlNdID0gZXJyb3JzLCBfcGF5bG9hZCk7XG4gICAgdmFyIGZpbHRlcmVkUGF5bG9hZCA9IGNmZy5hcHBseUZpbHRlcnMocGF5bG9hZCk7XG5cbiAgICBpZiAoIWZpbHRlcmVkUGF5bG9hZCkge1xuICAgICAgdGhpcy5fbG9nZ2luZ1NlcnZpY2Uud2FybignRHJvcHBlZCBwYXlsb2FkIGR1ZSB0byBmaWx0ZXJpbmchJyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYXBpVmVyc2lvbiA9IGNmZy5nZXQoJ2FwaVZlcnNpb24nKTtcbiAgICB2YXIgY29tcHJlc3MgPSBhcGlWZXJzaW9uID4gMjtcbiAgICB2YXIgbmRqc29uID0gW107XG4gICAgdmFyIG1ldGFkYXRhID0gdGhpcy5jcmVhdGVNZXRhRGF0YSgpO1xuICAgIHZhciBtZXRhZGF0YUtleSA9IGNvbXByZXNzID8gJ20nIDogJ21ldGFkYXRhJztcbiAgICBuZGpzb24ucHVzaChOREpTT04uc3RyaW5naWZ5KChfTkRKU09OJHN0cmluZ2lmeTMgPSB7fSwgX05ESlNPTiRzdHJpbmdpZnkzW21ldGFkYXRhS2V5XSA9IGNvbXByZXNzID8gY29tcHJlc3NNZXRhZGF0YShtZXRhZGF0YSkgOiBtZXRhZGF0YSwgX05ESlNPTiRzdHJpbmdpZnkzKSkpO1xuICAgIG5kanNvbiA9IG5kanNvbi5jb25jYXQodGhpcy5uZGpzb25FcnJvcnMoZmlsdGVyZWRQYXlsb2FkW0VSUk9SU10sIGNvbXByZXNzKSwgdGhpcy5uZGpzb25UcmFuc2FjdGlvbnMoZmlsdGVyZWRQYXlsb2FkW1RSQU5TQUNUSU9OU10sIGNvbXByZXNzKSk7XG4gICAgdmFyIG5kanNvblBheWxvYWQgPSBuZGpzb24uam9pbignJyk7XG5cbiAgICB2YXIgX3RoaXMkZ2V0RW5kcG9pbnRzMiA9IHRoaXMuZ2V0RW5kcG9pbnRzKCksXG4gICAgICAgIGludGFrZUVuZHBvaW50ID0gX3RoaXMkZ2V0RW5kcG9pbnRzMi5pbnRha2VFbmRwb2ludDtcblxuICAgIHJldHVybiB0aGlzLl9wb3N0SnNvbihpbnRha2VFbmRwb2ludCwgbmRqc29uUGF5bG9hZCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEVuZHBvaW50cyA9IGZ1bmN0aW9uIGdldEVuZHBvaW50cygpIHtcbiAgICB2YXIgc2VydmVyVXJsID0gdGhpcy5fY29uZmlnU2VydmljZS5nZXQoJ3NlcnZlclVybCcpO1xuXG4gICAgdmFyIGFwaVZlcnNpb24gPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldCgnYXBpVmVyc2lvbicpO1xuXG4gICAgdmFyIHNlcnZlclVybFByZWZpeCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0KCdzZXJ2ZXJVcmxQcmVmaXgnKSB8fCBcIi9pbnRha2UvdlwiICsgYXBpVmVyc2lvbiArIFwiL3J1bS9ldmVudHNcIjtcbiAgICB2YXIgaW50YWtlRW5kcG9pbnQgPSBzZXJ2ZXJVcmwgKyBzZXJ2ZXJVcmxQcmVmaXg7XG4gICAgdmFyIGNvbmZpZ0VuZHBvaW50ID0gc2VydmVyVXJsICsgXCIvY29uZmlnL3YxL3J1bS9hZ2VudHNcIjtcbiAgICByZXR1cm4ge1xuICAgICAgaW50YWtlRW5kcG9pbnQ6IGludGFrZUVuZHBvaW50LFxuICAgICAgY29uZmlnRW5kcG9pbnQ6IGNvbmZpZ0VuZHBvaW50XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gQXBtU2VydmVyO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBBcG1TZXJ2ZXI7IiwiaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJy4vcG9seWZpbGxzJztcbmltcG9ydCB7IE5BVklHQVRJT05fVElNSU5HX01BUktTLCBDT01QUkVTU0VEX05BVl9USU1JTkdfTUFSS1MgfSBmcm9tICcuLi9wZXJmb3JtYW5jZS1tb25pdG9yaW5nL25hdmlnYXRpb24vbWFya3MnO1xuaW1wb3J0IHsgaXNCZWFjb25JbnNwZWN0aW9uRW5hYmxlZCB9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBjb21wcmVzc1N0YWNrRnJhbWVzKGZyYW1lcykge1xuICByZXR1cm4gZnJhbWVzLm1hcChmdW5jdGlvbiAoZnJhbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXA6IGZyYW1lLmFic19wYXRoLFxuICAgICAgZjogZnJhbWUuZmlsZW5hbWUsXG4gICAgICBmbjogZnJhbWUuZnVuY3Rpb24sXG4gICAgICBsaTogZnJhbWUubGluZW5vLFxuICAgICAgY286IGZyYW1lLmNvbG5vXG4gICAgfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbXByZXNzUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0czogcmVzcG9uc2UudHJhbnNmZXJfc2l6ZSxcbiAgICBlYnM6IHJlc3BvbnNlLmVuY29kZWRfYm9keV9zaXplLFxuICAgIGRiczogcmVzcG9uc2UuZGVjb2RlZF9ib2R5X3NpemVcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29tcHJlc3NIVFRQKGh0dHApIHtcbiAgdmFyIGNvbXByZXNzZWQgPSB7fTtcbiAgdmFyIG1ldGhvZCA9IGh0dHAubWV0aG9kLFxuICAgICAgc3RhdHVzX2NvZGUgPSBodHRwLnN0YXR1c19jb2RlLFxuICAgICAgdXJsID0gaHR0cC51cmwsXG4gICAgICByZXNwb25zZSA9IGh0dHAucmVzcG9uc2U7XG4gIGNvbXByZXNzZWQudXJsID0gdXJsO1xuXG4gIGlmIChtZXRob2QpIHtcbiAgICBjb21wcmVzc2VkLm10ID0gbWV0aG9kO1xuICB9XG5cbiAgaWYgKHN0YXR1c19jb2RlKSB7XG4gICAgY29tcHJlc3NlZC5zYyA9IHN0YXR1c19jb2RlO1xuICB9XG5cbiAgaWYgKHJlc3BvbnNlKSB7XG4gICAgY29tcHJlc3NlZC5yID0gY29tcHJlc3NSZXNwb25zZShyZXNwb25zZSk7XG4gIH1cblxuICByZXR1cm4gY29tcHJlc3NlZDtcbn1cblxuZnVuY3Rpb24gY29tcHJlc3NDb250ZXh0KGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgY29tcHJlc3NlZCA9IHt9O1xuICB2YXIgcGFnZSA9IGNvbnRleHQucGFnZSxcbiAgICAgIGh0dHAgPSBjb250ZXh0Lmh0dHAsXG4gICAgICByZXNwb25zZSA9IGNvbnRleHQucmVzcG9uc2UsXG4gICAgICBkZXN0aW5hdGlvbiA9IGNvbnRleHQuZGVzdGluYXRpb24sXG4gICAgICB1c2VyID0gY29udGV4dC51c2VyLFxuICAgICAgY3VzdG9tID0gY29udGV4dC5jdXN0b207XG5cbiAgaWYgKHBhZ2UpIHtcbiAgICBjb21wcmVzc2VkLnAgPSB7XG4gICAgICByZjogcGFnZS5yZWZlcmVyLFxuICAgICAgdXJsOiBwYWdlLnVybFxuICAgIH07XG4gIH1cblxuICBpZiAoaHR0cCkge1xuICAgIGNvbXByZXNzZWQuaCA9IGNvbXByZXNzSFRUUChodHRwKTtcbiAgfVxuXG4gIGlmIChyZXNwb25zZSkge1xuICAgIGNvbXByZXNzZWQuciA9IGNvbXByZXNzUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9XG5cbiAgaWYgKGRlc3RpbmF0aW9uKSB7XG4gICAgdmFyIHNlcnZpY2UgPSBkZXN0aW5hdGlvbi5zZXJ2aWNlO1xuICAgIGNvbXByZXNzZWQuZHQgPSB7XG4gICAgICBzZToge1xuICAgICAgICBuOiBzZXJ2aWNlLm5hbWUsXG4gICAgICAgIHQ6IHNlcnZpY2UudHlwZSxcbiAgICAgICAgcmM6IHNlcnZpY2UucmVzb3VyY2VcbiAgICAgIH0sXG4gICAgICBhZDogZGVzdGluYXRpb24uYWRkcmVzcyxcbiAgICAgIHBvOiBkZXN0aW5hdGlvbi5wb3J0XG4gICAgfTtcbiAgfVxuXG4gIGlmICh1c2VyKSB7XG4gICAgY29tcHJlc3NlZC51ID0ge1xuICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICB1bjogdXNlci51c2VybmFtZSxcbiAgICAgIGVtOiB1c2VyLmVtYWlsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChjdXN0b20pIHtcbiAgICBjb21wcmVzc2VkLmN1ID0gY3VzdG9tO1xuICB9XG5cbiAgcmV0dXJuIGNvbXByZXNzZWQ7XG59XG5cbmZ1bmN0aW9uIGNvbXByZXNzTWFya3MobWFya3MpIHtcbiAgaWYgKCFtYXJrcykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIGNvbXByZXNzZWROdE1hcmtzID0gY29tcHJlc3NOYXZpZ2F0aW9uVGltaW5nTWFya3MobWFya3MubmF2aWdhdGlvblRpbWluZyk7XG4gIHZhciBjb21wcmVzc2VkID0ge1xuICAgIG50OiBjb21wcmVzc2VkTnRNYXJrcyxcbiAgICBhOiBjb21wcmVzc0FnZW50TWFya3MoY29tcHJlc3NlZE50TWFya3MsIG1hcmtzLmFnZW50KVxuICB9O1xuICByZXR1cm4gY29tcHJlc3NlZDtcbn1cblxuZnVuY3Rpb24gY29tcHJlc3NOYXZpZ2F0aW9uVGltaW5nTWFya3MobnRNYXJrcykge1xuICBpZiAoIW50TWFya3MpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBjb21wcmVzc2VkID0ge307XG4gIENPTVBSRVNTRURfTkFWX1RJTUlOR19NQVJLUy5mb3JFYWNoKGZ1bmN0aW9uIChtYXJrLCBpbmRleCkge1xuICAgIHZhciBtYXBwaW5nID0gTkFWSUdBVElPTl9USU1JTkdfTUFSS1NbaW5kZXhdO1xuICAgIGNvbXByZXNzZWRbbWFya10gPSBudE1hcmtzW21hcHBpbmddO1xuICB9KTtcbiAgcmV0dXJuIGNvbXByZXNzZWQ7XG59XG5cbmZ1bmN0aW9uIGNvbXByZXNzQWdlbnRNYXJrcyhjb21wcmVzc2VkTnRNYXJrcywgYWdlbnRNYXJrcykge1xuICB2YXIgY29tcHJlc3NlZCA9IHt9O1xuXG4gIGlmIChjb21wcmVzc2VkTnRNYXJrcykge1xuICAgIGNvbXByZXNzZWQgPSB7XG4gICAgICBmYjogY29tcHJlc3NlZE50TWFya3MucnMsXG4gICAgICBkaTogY29tcHJlc3NlZE50TWFya3MuZGksXG4gICAgICBkYzogY29tcHJlc3NlZE50TWFya3MuZGNcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFnZW50TWFya3MpIHtcbiAgICB2YXIgZnAgPSBhZ2VudE1hcmtzLmZpcnN0Q29udGVudGZ1bFBhaW50O1xuICAgIHZhciBscCA9IGFnZW50TWFya3MubGFyZ2VzdENvbnRlbnRmdWxQYWludDtcblxuICAgIGlmIChmcCkge1xuICAgICAgY29tcHJlc3NlZC5mcCA9IGZwO1xuICAgIH1cblxuICAgIGlmIChscCkge1xuICAgICAgY29tcHJlc3NlZC5scCA9IGxwO1xuICAgIH1cbiAgfVxuXG4gIGlmIChPYmplY3Qua2V5cyhjb21wcmVzc2VkKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb21wcmVzc2VkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHJlc3NNZXRhZGF0YShtZXRhZGF0YSkge1xuICB2YXIgc2VydmljZSA9IG1ldGFkYXRhLnNlcnZpY2UsXG4gICAgICBsYWJlbHMgPSBtZXRhZGF0YS5sYWJlbHM7XG4gIHZhciBhZ2VudCA9IHNlcnZpY2UuYWdlbnQsXG4gICAgICBsYW5ndWFnZSA9IHNlcnZpY2UubGFuZ3VhZ2U7XG4gIHJldHVybiB7XG4gICAgc2U6IHtcbiAgICAgIG46IHNlcnZpY2UubmFtZSxcbiAgICAgIHZlOiBzZXJ2aWNlLnZlcnNpb24sXG4gICAgICBhOiB7XG4gICAgICAgIG46IGFnZW50Lm5hbWUsXG4gICAgICAgIHZlOiBhZ2VudC52ZXJzaW9uXG4gICAgICB9LFxuICAgICAgbGE6IHtcbiAgICAgICAgbjogbGFuZ3VhZ2UubmFtZVxuICAgICAgfSxcbiAgICAgIGVuOiBzZXJ2aWNlLmVudmlyb25tZW50XG4gICAgfSxcbiAgICBsOiBsYWJlbHNcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21wcmVzc1RyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKSB7XG4gIHZhciBzcGFucyA9IHRyYW5zYWN0aW9uLnNwYW5zLm1hcChmdW5jdGlvbiAoc3Bhbikge1xuICAgIHZhciBzcGFuRGF0YSA9IHtcbiAgICAgIGlkOiBzcGFuLmlkLFxuICAgICAgbjogc3Bhbi5uYW1lLFxuICAgICAgdDogc3Bhbi50eXBlLFxuICAgICAgczogc3Bhbi5zdGFydCxcbiAgICAgIGQ6IHNwYW4uZHVyYXRpb24sXG4gICAgICBjOiBjb21wcmVzc0NvbnRleHQoc3Bhbi5jb250ZXh0KSxcbiAgICAgIG86IHNwYW4ub3V0Y29tZSxcbiAgICAgIHNyOiBzcGFuLnNhbXBsZV9yYXRlXG4gICAgfTtcblxuICAgIGlmIChzcGFuLnBhcmVudF9pZCAhPT0gdHJhbnNhY3Rpb24uaWQpIHtcbiAgICAgIHNwYW5EYXRhLnBpZCA9IHNwYW4ucGFyZW50X2lkO1xuICAgIH1cblxuICAgIGlmIChzcGFuLnN5bmMgPT09IHRydWUpIHtcbiAgICAgIHNwYW5EYXRhLnN5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc3Bhbi5zdWJ0eXBlKSB7XG4gICAgICBzcGFuRGF0YS5zdSA9IHNwYW4uc3VidHlwZTtcbiAgICB9XG5cbiAgICBpZiAoc3Bhbi5hY3Rpb24pIHtcbiAgICAgIHNwYW5EYXRhLmFjID0gc3Bhbi5hY3Rpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwYW5EYXRhO1xuICB9KTtcbiAgdmFyIHRyID0ge1xuICAgIGlkOiB0cmFuc2FjdGlvbi5pZCxcbiAgICBwaWQ6IHRyYW5zYWN0aW9uLnBhcmVudF9pZCxcbiAgICB0aWQ6IHRyYW5zYWN0aW9uLnRyYWNlX2lkLFxuICAgIG46IHRyYW5zYWN0aW9uLm5hbWUsXG4gICAgdDogdHJhbnNhY3Rpb24udHlwZSxcbiAgICBkOiB0cmFuc2FjdGlvbi5kdXJhdGlvbixcbiAgICBjOiBjb21wcmVzc0NvbnRleHQodHJhbnNhY3Rpb24uY29udGV4dCksXG4gICAgazogY29tcHJlc3NNYXJrcyh0cmFuc2FjdGlvbi5tYXJrcyksXG4gICAgbWU6IGNvbXByZXNzTWV0cmljc2V0cyh0cmFuc2FjdGlvbi5icmVha2Rvd24pLFxuICAgIHk6IHNwYW5zLFxuICAgIHljOiB7XG4gICAgICBzZDogc3BhbnMubGVuZ3RoXG4gICAgfSxcbiAgICBzbTogdHJhbnNhY3Rpb24uc2FtcGxlZCxcbiAgICBzcjogdHJhbnNhY3Rpb24uc2FtcGxlX3JhdGUsXG4gICAgbzogdHJhbnNhY3Rpb24ub3V0Y29tZVxuICB9O1xuXG4gIGlmICh0cmFuc2FjdGlvbi5leHBlcmllbmNlKSB7XG4gICAgdmFyIF90cmFuc2FjdGlvbiRleHBlcmllbiA9IHRyYW5zYWN0aW9uLmV4cGVyaWVuY2UsXG4gICAgICAgIGNscyA9IF90cmFuc2FjdGlvbiRleHBlcmllbi5jbHMsXG4gICAgICAgIGZpZCA9IF90cmFuc2FjdGlvbiRleHBlcmllbi5maWQsXG4gICAgICAgIHRidCA9IF90cmFuc2FjdGlvbiRleHBlcmllbi50YnQsXG4gICAgICAgIGxvbmd0YXNrID0gX3RyYW5zYWN0aW9uJGV4cGVyaWVuLmxvbmd0YXNrO1xuICAgIHRyLmV4cCA9IHtcbiAgICAgIGNsczogY2xzLFxuICAgICAgZmlkOiBmaWQsXG4gICAgICB0YnQ6IHRidCxcbiAgICAgIGx0OiBsb25ndGFza1xuICAgIH07XG4gIH1cblxuICBpZiAodHJhbnNhY3Rpb24uc2Vzc2lvbikge1xuICAgIHZhciBfdHJhbnNhY3Rpb24kc2Vzc2lvbiA9IHRyYW5zYWN0aW9uLnNlc3Npb24sXG4gICAgICAgIGlkID0gX3RyYW5zYWN0aW9uJHNlc3Npb24uaWQsXG4gICAgICAgIHNlcXVlbmNlID0gX3RyYW5zYWN0aW9uJHNlc3Npb24uc2VxdWVuY2U7XG4gICAgdHIuc2VzID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgc2VxOiBzZXF1ZW5jZVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gdHI7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tcHJlc3NFcnJvcihlcnJvcikge1xuICB2YXIgZXhjZXB0aW9uID0gZXJyb3IuZXhjZXB0aW9uO1xuICB2YXIgY29tcHJlc3NlZCA9IHtcbiAgICBpZDogZXJyb3IuaWQsXG4gICAgY2w6IGVycm9yLmN1bHByaXQsXG4gICAgZXg6IHtcbiAgICAgIG1nOiBleGNlcHRpb24ubWVzc2FnZSxcbiAgICAgIHN0OiBjb21wcmVzc1N0YWNrRnJhbWVzKGV4Y2VwdGlvbi5zdGFja3RyYWNlKSxcbiAgICAgIHQ6IGVycm9yLnR5cGVcbiAgICB9LFxuICAgIGM6IGNvbXByZXNzQ29udGV4dChlcnJvci5jb250ZXh0KVxuICB9O1xuICB2YXIgdHJhbnNhY3Rpb24gPSBlcnJvci50cmFuc2FjdGlvbjtcblxuICBpZiAodHJhbnNhY3Rpb24pIHtcbiAgICBjb21wcmVzc2VkLnRpZCA9IGVycm9yLnRyYWNlX2lkO1xuICAgIGNvbXByZXNzZWQucGlkID0gZXJyb3IucGFyZW50X2lkO1xuICAgIGNvbXByZXNzZWQueGlkID0gZXJyb3IudHJhbnNhY3Rpb25faWQ7XG4gICAgY29tcHJlc3NlZC54ID0ge1xuICAgICAgdDogdHJhbnNhY3Rpb24udHlwZSxcbiAgICAgIHNtOiB0cmFuc2FjdGlvbi5zYW1wbGVkXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBjb21wcmVzc2VkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbXByZXNzTWV0cmljc2V0cyhicmVha2Rvd25zKSB7XG4gIHJldHVybiBicmVha2Rvd25zLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBzcGFuID0gX3JlZi5zcGFuLFxuICAgICAgICBzYW1wbGVzID0gX3JlZi5zYW1wbGVzO1xuICAgIHJldHVybiB7XG4gICAgICB5OiB7XG4gICAgICAgIHQ6IHNwYW4udHlwZVxuICAgICAgfSxcbiAgICAgIHNhOiB7XG4gICAgICAgIHlzYzoge1xuICAgICAgICAgIHY6IHNhbXBsZXNbJ3NwYW4uc2VsZl90aW1lLmNvdW50J10udmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgeXNzOiB7XG4gICAgICAgICAgdjogc2FtcGxlc1snc3Bhbi5zZWxmX3RpbWUuc3VtLnVzJ10udmFsdWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbXByZXNzUGF5bG9hZChwYXJhbXMsIHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09IHZvaWQgMCkge1xuICAgIHR5cGUgPSAnZ3ppcCc7XG4gIH1cblxuICB2YXIgaXNDb21wcmVzc2lvblN0cmVhbVN1cHBvcnRlZCA9IHR5cGVvZiBDb21wcmVzc2lvblN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgaWYgKCFpc0NvbXByZXNzaW9uU3RyZWFtU3VwcG9ydGVkKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShwYXJhbXMpO1xuICAgIH1cblxuICAgIGlmIChpc0JlYWNvbkluc3BlY3Rpb25FbmFibGVkKCkpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgdmFyIHBheWxvYWQgPSBwYXJhbXMucGF5bG9hZCxcbiAgICAgICAgaGVhZGVycyA9IHBhcmFtcy5oZWFkZXJzLFxuICAgICAgICBiZWZvcmVTZW5kID0gcGFyYW1zLmJlZm9yZVNlbmQ7XG4gICAgdmFyIHBheWxvYWRTdHJlYW0gPSBuZXcgQmxvYihbcGF5bG9hZF0pLnN0cmVhbSgpO1xuICAgIHZhciBjb21wcmVzc2VkU3RyZWFtID0gcGF5bG9hZFN0cmVhbS5waXBlVGhyb3VnaChuZXcgQ29tcHJlc3Npb25TdHJlYW0odHlwZSkpO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoY29tcHJlc3NlZFN0cmVhbSkuYmxvYigpLnRoZW4oZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtRW5jb2RpbmcnXSA9IHR5cGU7XG4gICAgICByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgIGJlZm9yZVNlbmQ6IGJlZm9yZVNlbmRcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0iLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHsgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9OyByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuXG5pbXBvcnQgeyBnZXRDdXJyZW50U2NyaXB0LCBzZXRMYWJlbCwgbWVyZ2UsIGV4dGVuZCwgaXNVbmRlZmluZWQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9ldmVudC1oYW5kbGVyJztcbmltcG9ydCB7IENPTkZJR19DSEFOR0UsIExPQ0FMX0NPTkZJR19LRVkgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIGdldENvbmZpZ0Zyb21TY3JpcHQoKSB7XG4gIHZhciBzY3JpcHQgPSBnZXRDdXJyZW50U2NyaXB0KCk7XG4gIHZhciBjb25maWcgPSBnZXREYXRhQXR0cmlidXRlc0Zyb21Ob2RlKHNjcmlwdCk7XG4gIHJldHVybiBjb25maWc7XG59XG5cbmZ1bmN0aW9uIGdldERhdGFBdHRyaWJ1dGVzRnJvbU5vZGUobm9kZSkge1xuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgZGF0YUF0dHJzID0ge307XG4gIHZhciBkYXRhUmVnZXggPSAvXmRhdGEtKFtcXHctXSspJC87XG4gIHZhciBhdHRycyA9IG5vZGUuYXR0cmlidXRlcztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcblxuICAgIGlmIChkYXRhUmVnZXgudGVzdChhdHRyLm5vZGVOYW1lKSkge1xuICAgICAgdmFyIGtleSA9IGF0dHIubm9kZU5hbWUubWF0Y2goZGF0YVJlZ2V4KVsxXTtcbiAgICAgIHZhciBjYW1lbENhc2Vka2V5ID0ga2V5LnNwbGl0KCctJykubWFwKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID4gMCA/IHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc3Vic3RyaW5nKDEpIDogdmFsdWU7XG4gICAgICB9KS5qb2luKCcnKTtcbiAgICAgIGRhdGFBdHRyc1tjYW1lbENhc2Vka2V5XSA9IGF0dHIudmFsdWUgfHwgYXR0ci5ub2RlVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGFBdHRycztcbn1cblxudmFyIENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29uZmlnKCkge1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgc2VydmljZU5hbWU6ICcnLFxuICAgICAgc2VydmljZVZlcnNpb246ICcnLFxuICAgICAgZW52aXJvbm1lbnQ6ICcnLFxuICAgICAgc2VydmVyVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MjAwJyxcbiAgICAgIHNlcnZlclVybFByZWZpeDogJycsXG4gICAgICBhY3RpdmU6IHRydWUsXG4gICAgICBpbnN0cnVtZW50OiB0cnVlLFxuICAgICAgZGlzYWJsZUluc3RydW1lbnRhdGlvbnM6IFtdLFxuICAgICAgbG9nTGV2ZWw6ICd3YXJuJyxcbiAgICAgIGJyZWFrZG93bk1ldHJpY3M6IGZhbHNlLFxuICAgICAgaWdub3JlVHJhbnNhY3Rpb25zOiBbXSxcbiAgICAgIGV2ZW50c0xpbWl0OiA4MCxcbiAgICAgIHF1ZXVlTGltaXQ6IC0xLFxuICAgICAgZmx1c2hJbnRlcnZhbDogNTAwLFxuICAgICAgZGlzdHJpYnV0ZWRUcmFjaW5nOiB0cnVlLFxuICAgICAgZGlzdHJpYnV0ZWRUcmFjaW5nT3JpZ2luczogW10sXG4gICAgICBkaXN0cmlidXRlZFRyYWNpbmdIZWFkZXJOYW1lOiAndHJhY2VwYXJlbnQnLFxuICAgICAgcGFnZUxvYWRUcmFjZUlkOiAnJyxcbiAgICAgIHBhZ2VMb2FkU3BhbklkOiAnJyxcbiAgICAgIHBhZ2VMb2FkU2FtcGxlZDogZmFsc2UsXG4gICAgICBwYWdlTG9hZFBhcmVudElkOiAnJyxcbiAgICAgIHBhZ2VMb2FkVHJhbnNhY3Rpb25OYW1lOiAnJyxcbiAgICAgIHByb3BhZ2F0ZVRyYWNlc3RhdGU6IGZhbHNlLFxuICAgICAgdHJhbnNhY3Rpb25TYW1wbGVSYXRlOiAxLjAsXG4gICAgICBjZW50cmFsQ29uZmlnOiBmYWxzZSxcbiAgICAgIG1vbml0b3JMb25ndGFza3M6IHRydWUsXG4gICAgICBhcGlWZXJzaW9uOiAyLFxuICAgICAgY29udGV4dDoge30sXG4gICAgICBzZXNzaW9uOiBmYWxzZSxcbiAgICAgIGFwbVJlcXVlc3Q6IG51bGwsXG4gICAgICBzZW5kQ3JlZGVudGlhbHM6IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLmZpbHRlcnMgPSBbXTtcbiAgICB0aGlzLnZlcnNpb24gPSAnJztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBDb25maWcucHJvdG90eXBlO1xuXG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgc2NyaXB0RGF0YSA9IGdldENvbmZpZ0Zyb21TY3JpcHQoKTtcbiAgICB0aGlzLnNldENvbmZpZyhzY3JpcHREYXRhKTtcbiAgfTtcblxuICBfcHJvdG8uc2V0VmVyc2lvbiA9IGZ1bmN0aW9uIHNldFZlcnNpb24odmVyc2lvbikge1xuICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gIH07XG5cbiAgX3Byb3RvLmFkZEZpbHRlciA9IGZ1bmN0aW9uIGFkZEZpbHRlcihjYikge1xuICAgIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgdG8gbXVzdCBiZSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHRoaXMuZmlsdGVycy5wdXNoKGNiKTtcbiAgfTtcblxuICBfcHJvdG8uYXBwbHlGaWx0ZXJzID0gZnVuY3Rpb24gYXBwbHlGaWx0ZXJzKGRhdGEpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YSA9IHRoaXMuZmlsdGVyc1tpXShkYXRhKTtcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0ID0gZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgb2JqS2V5KSB7XG4gICAgICByZXR1cm4gb2JqICYmIG9ialtvYmpLZXldO1xuICAgIH0sIHRoaXMuY29uZmlnKTtcbiAgfTtcblxuICBfcHJvdG8uc2V0VXNlckNvbnRleHQgPSBmdW5jdGlvbiBzZXRVc2VyQ29udGV4dCh1c2VyQ29udGV4dCkge1xuICAgIGlmICh1c2VyQ29udGV4dCA9PT0gdm9pZCAwKSB7XG4gICAgICB1c2VyQ29udGV4dCA9IHt9O1xuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgdmFyIF91c2VyQ29udGV4dCA9IHVzZXJDb250ZXh0LFxuICAgICAgICBpZCA9IF91c2VyQ29udGV4dC5pZCxcbiAgICAgICAgdXNlcm5hbWUgPSBfdXNlckNvbnRleHQudXNlcm5hbWUsXG4gICAgICAgIGVtYWlsID0gX3VzZXJDb250ZXh0LmVtYWlsO1xuXG4gICAgaWYgKHR5cGVvZiBpZCA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGV4dC5pZCA9IGlkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZXh0LnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBlbWFpbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRleHQuZW1haWwgPSBlbWFpbDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpZy5jb250ZXh0LnVzZXIgPSBleHRlbmQodGhpcy5jb25maWcuY29udGV4dC51c2VyIHx8IHt9LCBjb250ZXh0KTtcbiAgfTtcblxuICBfcHJvdG8uc2V0Q3VzdG9tQ29udGV4dCA9IGZ1bmN0aW9uIHNldEN1c3RvbUNvbnRleHQoY3VzdG9tQ29udGV4dCkge1xuICAgIGlmIChjdXN0b21Db250ZXh0ID09PSB2b2lkIDApIHtcbiAgICAgIGN1c3RvbUNvbnRleHQgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpZy5jb250ZXh0LmN1c3RvbSA9IGV4dGVuZCh0aGlzLmNvbmZpZy5jb250ZXh0LmN1c3RvbSB8fCB7fSwgY3VzdG9tQ29udGV4dCk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZExhYmVscyA9IGZ1bmN0aW9uIGFkZExhYmVscyh0YWdzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICghdGhpcy5jb25maWcuY29udGV4dC50YWdzKSB7XG4gICAgICB0aGlzLmNvbmZpZy5jb250ZXh0LnRhZ3MgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRhZ3MpO1xuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgcmV0dXJuIHNldExhYmVsKGssIHRhZ3Nba10sIF90aGlzLmNvbmZpZy5jb250ZXh0LnRhZ3MpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5zZXRDb25maWcgPSBmdW5jdGlvbiBzZXRDb25maWcocHJvcGVydGllcykge1xuICAgIGlmIChwcm9wZXJ0aWVzID09PSB2b2lkIDApIHtcbiAgICAgIHByb3BlcnRpZXMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3BlcnRpZXMgPSBwcm9wZXJ0aWVzLFxuICAgICAgICB0cmFuc2FjdGlvblNhbXBsZVJhdGUgPSBfcHJvcGVydGllcy50cmFuc2FjdGlvblNhbXBsZVJhdGUsXG4gICAgICAgIHNlcnZlclVybCA9IF9wcm9wZXJ0aWVzLnNlcnZlclVybDtcblxuICAgIGlmIChzZXJ2ZXJVcmwpIHtcbiAgICAgIHByb3BlcnRpZXMuc2VydmVyVXJsID0gc2VydmVyVXJsLnJlcGxhY2UoL1xcLyskLywgJycpO1xuICAgIH1cblxuICAgIGlmICghaXNVbmRlZmluZWQodHJhbnNhY3Rpb25TYW1wbGVSYXRlKSkge1xuICAgICAgaWYgKHRyYW5zYWN0aW9uU2FtcGxlUmF0ZSA8IDAuMDAwMSAmJiB0cmFuc2FjdGlvblNhbXBsZVJhdGUgPiAwKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uU2FtcGxlUmF0ZSA9IDAuMDAwMTtcbiAgICAgIH1cblxuICAgICAgcHJvcGVydGllcy50cmFuc2FjdGlvblNhbXBsZVJhdGUgPSBNYXRoLnJvdW5kKHRyYW5zYWN0aW9uU2FtcGxlUmF0ZSAqIDEwMDAwKSAvIDEwMDAwO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gbWVyZ2UodGhpcy5jb25maWcsIHByb3BlcnRpZXMpO1xuICAgIHRoaXMuZXZlbnRzLnNlbmQoQ09ORklHX0NIQU5HRSwgW3RoaXMuY29uZmlnXSk7XG4gIH07XG5cbiAgX3Byb3RvLnZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUocHJvcGVydGllcykge1xuICAgIGlmIChwcm9wZXJ0aWVzID09PSB2b2lkIDApIHtcbiAgICAgIHByb3BlcnRpZXMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgcmVxdWlyZWRLZXlzID0gWydzZXJ2aWNlTmFtZScsICdzZXJ2ZXJVcmwnXTtcbiAgICB2YXIgYWxsS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY29uZmlnKTtcbiAgICB2YXIgZXJyb3JzID0ge1xuICAgICAgbWlzc2luZzogW10sXG4gICAgICBpbnZhbGlkOiBbXSxcbiAgICAgIHVua25vd246IFtdXG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChyZXF1aXJlZEtleXMuaW5kZXhPZihrZXkpICE9PSAtMSAmJiAhcHJvcGVydGllc1trZXldKSB7XG4gICAgICAgIGVycm9ycy5taXNzaW5nLnB1c2goa2V5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFsbEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICBlcnJvcnMudW5rbm93bi5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJvcGVydGllcy5zZXJ2aWNlTmFtZSAmJiAhL15bYS16QS1aMC05IF8tXSskLy50ZXN0KHByb3BlcnRpZXMuc2VydmljZU5hbWUpKSB7XG4gICAgICBlcnJvcnMuaW52YWxpZC5wdXNoKHtcbiAgICAgICAga2V5OiAnc2VydmljZU5hbWUnLFxuICAgICAgICB2YWx1ZTogcHJvcGVydGllcy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgYWxsb3dlZDogJ2EteiwgQS1aLCAwLTksIF8sIC0sIDxzcGFjZT4nXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgc2FtcGxlUmF0ZSA9IHByb3BlcnRpZXMudHJhbnNhY3Rpb25TYW1wbGVSYXRlO1xuXG4gICAgaWYgKHR5cGVvZiBzYW1wbGVSYXRlICE9PSAndW5kZWZpbmVkJyAmJiAodHlwZW9mIHNhbXBsZVJhdGUgIT09ICdudW1iZXInIHx8IGlzTmFOKHNhbXBsZVJhdGUpIHx8IHNhbXBsZVJhdGUgPCAwIHx8IHNhbXBsZVJhdGUgPiAxKSkge1xuICAgICAgZXJyb3JzLmludmFsaWQucHVzaCh7XG4gICAgICAgIGtleTogJ3RyYW5zYWN0aW9uU2FtcGxlUmF0ZScsXG4gICAgICAgIHZhbHVlOiBzYW1wbGVSYXRlLFxuICAgICAgICBhbGxvd2VkOiAnTnVtYmVyIGJldHdlZW4gMCBhbmQgMSdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlcnJvcnM7XG4gIH07XG5cbiAgX3Byb3RvLmdldExvY2FsQ29uZmlnID0gZnVuY3Rpb24gZ2V0TG9jYWxDb25maWcoKSB7XG4gICAgdmFyIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5zZXNzaW9uKSB7XG4gICAgICBzdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xuICAgIH1cblxuICAgIHZhciBjb25maWcgPSBzdG9yYWdlLmdldEl0ZW0oTE9DQUxfQ09ORklHX0tFWSk7XG5cbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShjb25maWcpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uc2V0TG9jYWxDb25maWcgPSBmdW5jdGlvbiBzZXRMb2NhbENvbmZpZyhjb25maWcsIG1lcmdlKSB7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgaWYgKG1lcmdlKSB7XG4gICAgICAgIHZhciBwcmV2Q29uZmlnID0gdGhpcy5nZXRMb2NhbENvbmZpZygpO1xuICAgICAgICBjb25maWcgPSBfZXh0ZW5kcyh7fSwgcHJldkNvbmZpZywgY29uZmlnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0b3JhZ2UgPSBzZXNzaW9uU3RvcmFnZTtcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLnNlc3Npb24pIHtcbiAgICAgICAgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcbiAgICAgIH1cblxuICAgICAgc3RvcmFnZS5zZXRJdGVtKExPQ0FMX0NPTkZJR19LRVksIEpTT04uc3RyaW5naWZ5KGNvbmZpZykpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQobmFtZSwgYXJncykge1xuICAgIHRoaXMuZXZlbnRzLnNlbmQobmFtZSwgYXJncyk7XG4gIH07XG5cbiAgX3Byb3RvLm9ic2VydmVFdmVudCA9IGZ1bmN0aW9uIG9ic2VydmVFdmVudChuYW1lLCBmbikge1xuICAgIHJldHVybiB0aGlzLmV2ZW50cy5vYnNlcnZlKG5hbWUsIGZuKTtcbiAgfTtcblxuICByZXR1cm4gQ29uZmlnO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBDb25maWc7IiwidmFyIFNDSEVEVUxFID0gJ3NjaGVkdWxlJztcbnZhciBJTlZPS0UgPSAnaW52b2tlJztcbnZhciBBRERfRVZFTlRfTElTVEVORVJfU1RSID0gJ2FkZEV2ZW50TGlzdGVuZXInO1xudmFyIFJFTU9WRV9FVkVOVF9MSVNURU5FUl9TVFIgPSAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG52YXIgUkVTT1VSQ0VfSU5JVElBVE9SX1RZUEVTID0gWydsaW5rJywgJ2NzcycsICdzY3JpcHQnLCAnaW1nJywgJ3htbGh0dHByZXF1ZXN0JywgJ2ZldGNoJywgJ2JlYWNvbicsICdpZnJhbWUnXTtcbnZhciBSRVVTQUJJTElUWV9USFJFU0hPTEQgPSA1MDAwO1xudmFyIE1BWF9TUEFOX0RVUkFUSU9OID0gNSAqIDYwICogMTAwMDtcbnZhciBQQUdFX0xPQURfREVMQVkgPSAxMDAwO1xudmFyIFBBR0VfTE9BRCA9ICdwYWdlLWxvYWQnO1xudmFyIFJPVVRFX0NIQU5HRSA9ICdyb3V0ZS1jaGFuZ2UnO1xudmFyIFRZUEVfQ1VTVE9NID0gJ2N1c3RvbSc7XG52YXIgVVNFUl9JTlRFUkFDVElPTiA9ICd1c2VyLWludGVyYWN0aW9uJztcbnZhciBIVFRQX1JFUVVFU1RfVFlQRSA9ICdodHRwLXJlcXVlc3QnO1xudmFyIFRFTVBPUkFSWV9UWVBFID0gJ3RlbXBvcmFyeSc7XG52YXIgTkFNRV9VTktOT1dOID0gJ1Vua25vd24nO1xudmFyIFBBR0VfRVhJVCA9ICdwYWdlLWV4aXQnO1xudmFyIFRSQU5TQUNUSU9OX1RZUEVfT1JERVIgPSBbUEFHRV9MT0FELCBST1VURV9DSEFOR0UsIFVTRVJfSU5URVJBQ1RJT04sIEhUVFBfUkVRVUVTVF9UWVBFLCBUWVBFX0NVU1RPTSwgVEVNUE9SQVJZX1RZUEVdO1xudmFyIE9VVENPTUVfU1VDQ0VTUyA9ICdzdWNjZXNzJztcbnZhciBPVVRDT01FX0ZBSUxVUkUgPSAnZmFpbHVyZSc7XG52YXIgT1VUQ09NRV9VTktOT1dOID0gJ3Vua25vd24nO1xudmFyIFVTRVJfVElNSU5HX1RIUkVTSE9MRCA9IDYwO1xudmFyIFRSQU5TQUNUSU9OX1NUQVJUID0gJ3RyYW5zYWN0aW9uOnN0YXJ0JztcbnZhciBUUkFOU0FDVElPTl9FTkQgPSAndHJhbnNhY3Rpb246ZW5kJztcbnZhciBDT05GSUdfQ0hBTkdFID0gJ2NvbmZpZzpjaGFuZ2UnO1xudmFyIFFVRVVFX0ZMVVNIID0gJ3F1ZXVlOmZsdXNoJztcbnZhciBRVUVVRV9BRERfVFJBTlNBQ1RJT04gPSAncXVldWU6YWRkX3RyYW5zYWN0aW9uJztcbnZhciBUUkFOU0FDVElPTl9JR05PUkUgPSAndHJhbnNhY3Rpb246aWdub3JlJztcbnZhciBYTUxIVFRQUkVRVUVTVCA9ICd4bWxodHRwcmVxdWVzdCc7XG52YXIgRkVUQ0ggPSAnZmV0Y2gnO1xudmFyIEhJU1RPUlkgPSAnaGlzdG9yeSc7XG52YXIgRVZFTlRfVEFSR0VUID0gJ2V2ZW50dGFyZ2V0JztcbnZhciBDTElDSyA9ICdjbGljayc7XG52YXIgRVJST1IgPSAnZXJyb3InO1xudmFyIEJFRk9SRV9FVkVOVCA9ICc6YmVmb3JlJztcbnZhciBBRlRFUl9FVkVOVCA9ICc6YWZ0ZXInO1xudmFyIExPQ0FMX0NPTkZJR19LRVkgPSAnZWxhc3RpY19hcG1fY29uZmlnJztcbnZhciBMT05HX1RBU0sgPSAnbG9uZ3Rhc2snO1xudmFyIFBBSU5UID0gJ3BhaW50JztcbnZhciBNRUFTVVJFID0gJ21lYXN1cmUnO1xudmFyIE5BVklHQVRJT04gPSAnbmF2aWdhdGlvbic7XG52YXIgUkVTT1VSQ0UgPSAncmVzb3VyY2UnO1xudmFyIEZJUlNUX0NPTlRFTlRGVUxfUEFJTlQgPSAnZmlyc3QtY29udGVudGZ1bC1wYWludCc7XG52YXIgTEFSR0VTVF9DT05URU5URlVMX1BBSU5UID0gJ2xhcmdlc3QtY29udGVudGZ1bC1wYWludCc7XG52YXIgRklSU1RfSU5QVVQgPSAnZmlyc3QtaW5wdXQnO1xudmFyIExBWU9VVF9TSElGVCA9ICdsYXlvdXQtc2hpZnQnO1xudmFyIEVWRU5UID0gJ2V2ZW50JztcbnZhciBFUlJPUlMgPSAnZXJyb3JzJztcbnZhciBUUkFOU0FDVElPTlMgPSAndHJhbnNhY3Rpb25zJztcbnZhciBDT05GSUdfU0VSVklDRSA9ICdDb25maWdTZXJ2aWNlJztcbnZhciBMT0dHSU5HX1NFUlZJQ0UgPSAnTG9nZ2luZ1NlcnZpY2UnO1xudmFyIFRSQU5TQUNUSU9OX1NFUlZJQ0UgPSAnVHJhbnNhY3Rpb25TZXJ2aWNlJztcbnZhciBBUE1fU0VSVkVSID0gJ0FwbVNlcnZlcic7XG52YXIgUEVSRk9STUFOQ0VfTU9OSVRPUklORyA9ICdQZXJmb3JtYW5jZU1vbml0b3JpbmcnO1xudmFyIEVSUk9SX0xPR0dJTkcgPSAnRXJyb3JMb2dnaW5nJztcbnZhciBUUlVOQ0FURURfVFlQRSA9ICcudHJ1bmNhdGVkJztcbnZhciBLRVlXT1JEX0xJTUlUID0gMTAyNDtcbnZhciBTRVNTSU9OX1RJTUVPVVQgPSAzMCAqIDYwMDAwO1xudmFyIEhUVFBfUkVRVUVTVF9USU1FT1VUID0gMTAwMDA7XG5leHBvcnQgeyBTQ0hFRFVMRSwgSU5WT0tFLCBBRERfRVZFTlRfTElTVEVORVJfU1RSLCBSRU1PVkVfRVZFTlRfTElTVEVORVJfU1RSLCBSRVNPVVJDRV9JTklUSUFUT1JfVFlQRVMsIFJFVVNBQklMSVRZX1RIUkVTSE9MRCwgTUFYX1NQQU5fRFVSQVRJT04sIFBBR0VfTE9BRF9ERUxBWSwgUEFHRV9MT0FELCBST1VURV9DSEFOR0UsIE5BTUVfVU5LTk9XTiwgUEFHRV9FWElULCBUWVBFX0NVU1RPTSwgVVNFUl9USU1JTkdfVEhSRVNIT0xELCBUUkFOU0FDVElPTl9TVEFSVCwgVFJBTlNBQ1RJT05fRU5ELCBDT05GSUdfQ0hBTkdFLCBRVUVVRV9GTFVTSCwgUVVFVUVfQUREX1RSQU5TQUNUSU9OLCBUUkFOU0FDVElPTl9JR05PUkUsIFhNTEhUVFBSRVFVRVNULCBGRVRDSCwgSElTVE9SWSwgRVZFTlRfVEFSR0VULCBDTElDSywgRVJST1IsIEJFRk9SRV9FVkVOVCwgQUZURVJfRVZFTlQsIExPQ0FMX0NPTkZJR19LRVksIEhUVFBfUkVRVUVTVF9UWVBFLCBMT05HX1RBU0ssIFBBSU5ULCBNRUFTVVJFLCBOQVZJR0FUSU9OLCBSRVNPVVJDRSwgRklSU1RfQ09OVEVOVEZVTF9QQUlOVCwgTEFSR0VTVF9DT05URU5URlVMX1BBSU5ULCBLRVlXT1JEX0xJTUlULCBURU1QT1JBUllfVFlQRSwgVVNFUl9JTlRFUkFDVElPTiwgVFJBTlNBQ1RJT05fVFlQRV9PUkRFUiwgRVJST1JTLCBUUkFOU0FDVElPTlMsIENPTkZJR19TRVJWSUNFLCBMT0dHSU5HX1NFUlZJQ0UsIFRSQU5TQUNUSU9OX1NFUlZJQ0UsIEFQTV9TRVJWRVIsIFBFUkZPUk1BTkNFX01PTklUT1JJTkcsIEVSUk9SX0xPR0dJTkcsIFRSVU5DQVRFRF9UWVBFLCBGSVJTVF9JTlBVVCwgTEFZT1VUX1NISUZULCBFVkVOVCwgT1VUQ09NRV9TVUNDRVNTLCBPVVRDT01FX0ZBSUxVUkUsIE9VVENPTUVfVU5LTk9XTiwgU0VTU0lPTl9USU1FT1VULCBIVFRQX1JFUVVFU1RfVElNRU9VVCB9OyIsInZhciBfZXhjbHVkZWQgPSBbXCJ0YWdzXCJdO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7IGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9OyB2YXIgdGFyZ2V0ID0ge307IHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTsgdmFyIGtleSwgaTsgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHsga2V5ID0gc291cmNlS2V5c1tpXTsgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCB7IFVybCB9IGZyb20gJy4vdXJsJztcbmltcG9ydCB7IFBBR0VfTE9BRCwgUEFHRV9FWElULCBOQVZJR0FUSU9OIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0U2VydmVyVGltaW5nSW5mbywgUEVSRiwgaXNQZXJmVGltZWxpbmVTdXBwb3J0ZWQgfSBmcm9tICcuL3V0aWxzJztcbnZhciBMRUZUX1NRVUFSRV9CUkFDS0VUID0gOTE7XG52YXIgUklHSFRfU1FVQVJFX0JSQUNLRVQgPSA5MztcbnZhciBFWFRFUk5BTCA9ICdleHRlcm5hbCc7XG52YXIgUkVTT1VSQ0UgPSAncmVzb3VyY2UnO1xudmFyIEhBUkRfTkFWSUdBVElPTiA9ICdoYXJkLW5hdmlnYXRpb24nO1xuXG5mdW5jdGlvbiBnZXRQb3J0TnVtYmVyKHBvcnQsIHByb3RvY29sKSB7XG4gIGlmIChwb3J0ID09PSAnJykge1xuICAgIHBvcnQgPSBwcm90b2NvbCA9PT0gJ2h0dHA6JyA/ICc4MCcgOiBwcm90b2NvbCA9PT0gJ2h0dHBzOicgPyAnNDQzJyA6ICcnO1xuICB9XG5cbiAgcmV0dXJuIHBvcnQ7XG59XG5cbmZ1bmN0aW9uIGdldFJlc3BvbnNlQ29udGV4dChwZXJmVGltaW5nRW50cnkpIHtcbiAgdmFyIHRyYW5zZmVyU2l6ZSA9IHBlcmZUaW1pbmdFbnRyeS50cmFuc2ZlclNpemUsXG4gICAgICBlbmNvZGVkQm9keVNpemUgPSBwZXJmVGltaW5nRW50cnkuZW5jb2RlZEJvZHlTaXplLFxuICAgICAgZGVjb2RlZEJvZHlTaXplID0gcGVyZlRpbWluZ0VudHJ5LmRlY29kZWRCb2R5U2l6ZSxcbiAgICAgIHNlcnZlclRpbWluZyA9IHBlcmZUaW1pbmdFbnRyeS5zZXJ2ZXJUaW1pbmc7XG4gIHZhciByZXNwQ29udGV4dCA9IHtcbiAgICB0cmFuc2Zlcl9zaXplOiB0cmFuc2ZlclNpemUsXG4gICAgZW5jb2RlZF9ib2R5X3NpemU6IGVuY29kZWRCb2R5U2l6ZSxcbiAgICBkZWNvZGVkX2JvZHlfc2l6ZTogZGVjb2RlZEJvZHlTaXplXG4gIH07XG4gIHZhciBzZXJ2ZXJUaW1pbmdTdHIgPSBnZXRTZXJ2ZXJUaW1pbmdJbmZvKHNlcnZlclRpbWluZyk7XG5cbiAgaWYgKHNlcnZlclRpbWluZ1N0cikge1xuICAgIHJlc3BDb250ZXh0LmhlYWRlcnMgPSB7XG4gICAgICAnc2VydmVyLXRpbWluZyc6IHNlcnZlclRpbWluZ1N0clxuICAgIH07XG4gIH1cblxuICByZXR1cm4gcmVzcENvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGdldERlc3RpbmF0aW9uKHBhcnNlZFVybCkge1xuICB2YXIgcG9ydCA9IHBhcnNlZFVybC5wb3J0LFxuICAgICAgcHJvdG9jb2wgPSBwYXJzZWRVcmwucHJvdG9jb2wsXG4gICAgICBob3N0bmFtZSA9IHBhcnNlZFVybC5ob3N0bmFtZTtcbiAgdmFyIHBvcnROdW1iZXIgPSBnZXRQb3J0TnVtYmVyKHBvcnQsIHByb3RvY29sKTtcbiAgdmFyIGlwdjZIb3N0bmFtZSA9IGhvc3RuYW1lLmNoYXJDb2RlQXQoMCkgPT09IExFRlRfU1FVQVJFX0JSQUNLRVQgJiYgaG9zdG5hbWUuY2hhckNvZGVBdChob3N0bmFtZS5sZW5ndGggLSAxKSA9PT0gUklHSFRfU1FVQVJFX0JSQUNLRVQ7XG4gIHZhciBhZGRyZXNzID0gaG9zdG5hbWU7XG5cbiAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgIGFkZHJlc3MgPSBob3N0bmFtZS5zbGljZSgxLCAtMSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNlcnZpY2U6IHtcbiAgICAgIHJlc291cmNlOiBob3N0bmFtZSArICc6JyArIHBvcnROdW1iZXIsXG4gICAgICBuYW1lOiAnJyxcbiAgICAgIHR5cGU6ICcnXG4gICAgfSxcbiAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgIHBvcnQ6IE51bWJlcihwb3J0TnVtYmVyKVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRSZXNvdXJjZUNvbnRleHQoZGF0YSkge1xuICB2YXIgZW50cnkgPSBkYXRhLmVudHJ5LFxuICAgICAgdXJsID0gZGF0YS51cmw7XG4gIHZhciBwYXJzZWRVcmwgPSBuZXcgVXJsKHVybCk7XG4gIHZhciBkZXN0aW5hdGlvbiA9IGdldERlc3RpbmF0aW9uKHBhcnNlZFVybCk7XG4gIHJldHVybiB7XG4gICAgaHR0cDoge1xuICAgICAgdXJsOiB1cmwsXG4gICAgICByZXNwb25zZTogZ2V0UmVzcG9uc2VDb250ZXh0KGVudHJ5KVxuICAgIH0sXG4gICAgZGVzdGluYXRpb246IGRlc3RpbmF0aW9uXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEV4dGVybmFsQ29udGV4dChkYXRhKSB7XG4gIHZhciB1cmwgPSBkYXRhLnVybCxcbiAgICAgIG1ldGhvZCA9IGRhdGEubWV0aG9kLFxuICAgICAgdGFyZ2V0ID0gZGF0YS50YXJnZXQsXG4gICAgICByZXNwb25zZSA9IGRhdGEucmVzcG9uc2U7XG4gIHZhciBwYXJzZWRVcmwgPSBuZXcgVXJsKHVybCk7XG4gIHZhciBkZXN0aW5hdGlvbiA9IGdldERlc3RpbmF0aW9uKHBhcnNlZFVybCk7XG4gIHZhciBjb250ZXh0ID0ge1xuICAgIGh0dHA6IHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiBwYXJzZWRVcmwuaHJlZlxuICAgIH0sXG4gICAgZGVzdGluYXRpb246IGRlc3RpbmF0aW9uXG4gIH07XG4gIHZhciBzdGF0dXNDb2RlO1xuXG4gIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldC5zdGF0dXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RhdHVzQ29kZSA9IHRhcmdldC5zdGF0dXM7XG4gIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICBzdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzO1xuICB9XG5cbiAgY29udGV4dC5odHRwLnN0YXR1c19jb2RlID0gc3RhdHVzQ29kZTtcbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGdldE5hdmlnYXRpb25Db250ZXh0KGRhdGEpIHtcbiAgdmFyIHVybCA9IGRhdGEudXJsO1xuICB2YXIgcGFyc2VkVXJsID0gbmV3IFVybCh1cmwpO1xuICB2YXIgZGVzdGluYXRpb24gPSBnZXREZXN0aW5hdGlvbihwYXJzZWRVcmwpO1xuICByZXR1cm4ge1xuICAgIGRlc3RpbmF0aW9uOiBkZXN0aW5hdGlvblxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFnZUNvbnRleHQoKSB7XG4gIHJldHVybiB7XG4gICAgcGFnZToge1xuICAgICAgcmVmZXJlcjogZG9jdW1lbnQucmVmZXJyZXIsXG4gICAgICB1cmw6IGxvY2F0aW9uLmhyZWZcbiAgICB9XG4gIH07XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkU3BhbkNvbnRleHQoc3BhbiwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdHlwZSA9IHNwYW4udHlwZTtcbiAgdmFyIGNvbnRleHQ7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBFWFRFUk5BTDpcbiAgICAgIGNvbnRleHQgPSBnZXRFeHRlcm5hbENvbnRleHQoZGF0YSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgUkVTT1VSQ0U6XG4gICAgICBjb250ZXh0ID0gZ2V0UmVzb3VyY2VDb250ZXh0KGRhdGEpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEhBUkRfTkFWSUdBVElPTjpcbiAgICAgIGNvbnRleHQgPSBnZXROYXZpZ2F0aW9uQ29udGV4dChkYXRhKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgc3Bhbi5hZGRDb250ZXh0KGNvbnRleHQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRyYW5zYWN0aW9uQ29udGV4dCh0cmFuc2FjdGlvbiwgX3RlbXApIHtcbiAgdmFyIF9yZWYgPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcCxcbiAgICAgIHRhZ3MgPSBfcmVmLnRhZ3MsXG4gICAgICBjb25maWdDb250ZXh0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgX2V4Y2x1ZGVkKTtcblxuICB2YXIgcGFnZUNvbnRleHQgPSBnZXRQYWdlQ29udGV4dCgpO1xuICB2YXIgcmVzcG9uc2VDb250ZXh0ID0ge307XG5cbiAgaWYgKHRyYW5zYWN0aW9uLnR5cGUgPT09IFBBR0VfRVhJVCkge1xuICAgIHRyYW5zYWN0aW9uLmVuc3VyZUNvbnRleHQoKTtcblxuICAgIGlmICh0cmFuc2FjdGlvbi5jb250ZXh0LnBhZ2UgJiYgdHJhbnNhY3Rpb24uY29udGV4dC5wYWdlLnVybCkge1xuICAgICAgcGFnZUNvbnRleHQucGFnZS51cmwgPSB0cmFuc2FjdGlvbi5jb250ZXh0LnBhZ2UudXJsO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0cmFuc2FjdGlvbi50eXBlID09PSBQQUdFX0xPQUQgJiYgaXNQZXJmVGltZWxpbmVTdXBwb3J0ZWQoKSkge1xuICAgIHZhciBlbnRyaWVzID0gUEVSRi5nZXRFbnRyaWVzQnlUeXBlKE5BVklHQVRJT04pO1xuXG4gICAgaWYgKGVudHJpZXMgJiYgZW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXNwb25zZUNvbnRleHQgPSB7XG4gICAgICAgIHJlc3BvbnNlOiBnZXRSZXNwb25zZUNvbnRleHQoZW50cmllc1swXSlcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdHJhbnNhY3Rpb24uYWRkQ29udGV4dChwYWdlQ29udGV4dCwgcmVzcG9uc2VDb250ZXh0LCBjb25maWdDb250ZXh0KTtcbn0iLCJpbXBvcnQgeyBCRUZPUkVfRVZFTlQsIEFGVEVSX0VWRU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG52YXIgRXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudEhhbmRsZXIoKSB7XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBFdmVudEhhbmRsZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5vYnNlcnZlID0gZnVuY3Rpb24gb2JzZXJ2ZShuYW1lLCBmbikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoIXRoaXMub2JzZXJ2ZXJzW25hbWVdKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzW25hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMub2JzZXJ2ZXJzW25hbWVdLnB1c2goZm4pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gX3RoaXMub2JzZXJ2ZXJzW25hbWVdLmluZGV4T2YoZm4pO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgX3RoaXMub2JzZXJ2ZXJzW25hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5zZW5kT25seSA9IGZ1bmN0aW9uIHNlbmRPbmx5KG5hbWUsIGFyZ3MpIHtcbiAgICB2YXIgb2JzID0gdGhpcy5vYnNlcnZlcnNbbmFtZV07XG5cbiAgICBpZiAob2JzKSB7XG4gICAgICBvYnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLCBlcnJvci5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uc2VuZCA9IGZ1bmN0aW9uIHNlbmQobmFtZSwgYXJncykge1xuICAgIHRoaXMuc2VuZE9ubHkobmFtZSArIEJFRk9SRV9FVkVOVCwgYXJncyk7XG4gICAgdGhpcy5zZW5kT25seShuYW1lLCBhcmdzKTtcbiAgICB0aGlzLnNlbmRPbmx5KG5hbWUgKyBBRlRFUl9FVkVOVCwgYXJncyk7XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50SGFuZGxlcjtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRIYW5kbGVyOyIsImZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07IHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG5cbmltcG9ydCB7IEhUVFBfUkVRVUVTVF9USU1FT1VUIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzUmVzcG9uc2VTdWNjZXNzZnVsIH0gZnJvbSAnLi9yZXNwb25zZS1zdGF0dXMnO1xuZXhwb3J0IHZhciBCWVRFX0xJTUlUID0gNjAgKiAxMDAwO1xuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFVzZUZldGNoV2l0aEtlZXBBbGl2ZShtZXRob2QsIHBheWxvYWQpIHtcbiAgaWYgKCFpc0ZldGNoU3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaXNLZWVwQWxpdmVTdXBwb3J0ZWQgPSAoJ2tlZXBhbGl2ZScgaW4gbmV3IFJlcXVlc3QoJycpKTtcblxuICBpZiAoIWlzS2VlcEFsaXZlU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHNpemUgPSBjYWxjdWxhdGVTaXplKHBheWxvYWQpO1xuICByZXR1cm4gbWV0aG9kID09PSAnUE9TVCcgJiYgc2l6ZSA8IEJZVEVfTElNSVQ7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VuZEZldGNoUmVxdWVzdChtZXRob2QsIHVybCwgX3JlZikge1xuICB2YXIgX3JlZiRrZWVwYWxpdmUgPSBfcmVmLmtlZXBhbGl2ZSxcbiAgICAgIGtlZXBhbGl2ZSA9IF9yZWYka2VlcGFsaXZlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYka2VlcGFsaXZlLFxuICAgICAgX3JlZiR0aW1lb3V0ID0gX3JlZi50aW1lb3V0LFxuICAgICAgdGltZW91dCA9IF9yZWYkdGltZW91dCA9PT0gdm9pZCAwID8gSFRUUF9SRVFVRVNUX1RJTUVPVVQgOiBfcmVmJHRpbWVvdXQsXG4gICAgICBwYXlsb2FkID0gX3JlZi5wYXlsb2FkLFxuICAgICAgaGVhZGVycyA9IF9yZWYuaGVhZGVycyxcbiAgICAgIHNlbmRDcmVkZW50aWFscyA9IF9yZWYuc2VuZENyZWRlbnRpYWxzO1xuICB2YXIgdGltZW91dENvbmZpZyA9IHt9O1xuXG4gIGlmICh0eXBlb2YgQWJvcnRDb250cm9sbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgdGltZW91dENvbmZpZy5zaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfSwgdGltZW91dCk7XG4gIH1cblxuICB2YXIgZmV0Y2hSZXNwb25zZTtcbiAgcmV0dXJuIHdpbmRvdy5mZXRjaCh1cmwsIF9leHRlbmRzKHtcbiAgICBib2R5OiBwYXlsb2FkLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAga2VlcGFsaXZlOiBrZWVwYWxpdmUsXG4gICAgY3JlZGVudGlhbHM6IHNlbmRDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdvbWl0J1xuICB9LCB0aW1lb3V0Q29uZmlnKSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICBmZXRjaFJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgcmV0dXJuIGZldGNoUmVzcG9uc2UudGV4dCgpO1xuICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZVRleHQpIHtcbiAgICB2YXIgYm9keVJlc3BvbnNlID0ge1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBzdGF0dXM6IGZldGNoUmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2VUZXh0OiByZXNwb25zZVRleHRcbiAgICB9O1xuXG4gICAgaWYgKCFpc1Jlc3BvbnNlU3VjY2Vzc2Z1bChmZXRjaFJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgIHRocm93IGJvZHlSZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9keVJlc3BvbnNlO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0ZldGNoU3VwcG9ydGVkKCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdy5mZXRjaCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygd2luZG93LlJlcXVlc3QgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpemUocGF5bG9hZCkge1xuICBpZiAoIXBheWxvYWQpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChwYXlsb2FkIGluc3RhbmNlb2YgQmxvYikge1xuICAgIHJldHVybiBwYXlsb2FkLnNpemU7XG4gIH1cblxuICByZXR1cm4gbmV3IEJsb2IoW3BheWxvYWRdKS5zaXplO1xufSIsImV4cG9ydCBmdW5jdGlvbiBpc1Jlc3BvbnNlU3VjY2Vzc2Z1bChzdGF0dXMpIHtcbiAgaWYgKHN0YXR1cyA9PT0gMCB8fCBzdGF0dXMgPiAzOTkgJiYgc3RhdHVzIDwgNjAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59IiwiaW1wb3J0IHsgWEhSX0lHTk9SRSB9IGZyb20gJy4uL3BhdGNoaW5nL3BhdGNoLXV0aWxzJztcbmltcG9ydCB7IGlzUmVzcG9uc2VTdWNjZXNzZnVsIH0gZnJvbSAnLi9yZXNwb25zZS1zdGF0dXMnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJy4uL3BvbHlmaWxscyc7XG5leHBvcnQgZnVuY3Rpb24gc2VuZFhIUihtZXRob2QsIHVybCwgX3JlZikge1xuICB2YXIgX3JlZiR0aW1lb3V0ID0gX3JlZi50aW1lb3V0LFxuICAgICAgdGltZW91dCA9IF9yZWYkdGltZW91dCA9PT0gdm9pZCAwID8gSFRUUF9SRVFVRVNUX1RJTUVPVVQgOiBfcmVmJHRpbWVvdXQsXG4gICAgICBwYXlsb2FkID0gX3JlZi5wYXlsb2FkLFxuICAgICAgaGVhZGVycyA9IF9yZWYuaGVhZGVycyxcbiAgICAgIGJlZm9yZVNlbmQgPSBfcmVmLmJlZm9yZVNlbmQsXG4gICAgICBzZW5kQ3JlZGVudGlhbHMgPSBfcmVmLnNlbmRDcmVkZW50aWFscztcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhocltYSFJfSUdOT1JFXSA9IHRydWU7XG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgIHhoci50aW1lb3V0ID0gdGltZW91dDtcbiAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gc2VuZENyZWRlbnRpYWxzO1xuXG4gICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgIGZvciAodmFyIGhlYWRlciBpbiBoZWFkZXJzKSB7XG4gICAgICAgIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KGhlYWRlcikpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgIHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzLFxuICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcblxuICAgICAgICBpZiAoaXNSZXNwb25zZVN1Y2Nlc3NmdWwoc3RhdHVzKSkge1xuICAgICAgICAgIHJlc29sdmUoeGhyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgIHJlc3BvbnNlVGV4dDogcmVzcG9uc2VUZXh0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RhdHVzID0geGhyLnN0YXR1cyxcbiAgICAgICAgICByZXNwb25zZVRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgcmVqZWN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICByZXNwb25zZVRleHQ6IHJlc3BvbnNlVGV4dFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjYW5TZW5kID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgYmVmb3JlU2VuZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FuU2VuZCA9IGJlZm9yZVNlbmQoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgIHhocjogeGhyXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY2FuU2VuZCkge1xuICAgICAgeGhyLnNlbmQocGF5bG9hZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHJlc3BvbnNlVGV4dDogJ1JlcXVlc3QgcmVqZWN0ZWQgYnkgdXNlciBjb25maWd1cmF0aW9uLidcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59IiwiaW1wb3J0IHsgWE1MSFRUUFJFUVVFU1QsIEZFVENILCBISVNUT1JZLCBQQUdFX0xPQUQsIEVSUk9SLCBFVkVOVF9UQVJHRVQsIENMSUNLIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RydW1lbnRhdGlvbkZsYWdzKGluc3RydW1lbnQsIGRpc2FibGVkSW5zdHJ1bWVudGF0aW9ucykge1xuICB2YXIgX2ZsYWdzO1xuXG4gIHZhciBmbGFncyA9IChfZmxhZ3MgPSB7fSwgX2ZsYWdzW1hNTEhUVFBSRVFVRVNUXSA9IGZhbHNlLCBfZmxhZ3NbRkVUQ0hdID0gZmFsc2UsIF9mbGFnc1tISVNUT1JZXSA9IGZhbHNlLCBfZmxhZ3NbUEFHRV9MT0FEXSA9IGZhbHNlLCBfZmxhZ3NbRVJST1JdID0gZmFsc2UsIF9mbGFnc1tFVkVOVF9UQVJHRVRdID0gZmFsc2UsIF9mbGFnc1tDTElDS10gPSBmYWxzZSwgX2ZsYWdzKTtcblxuICBpZiAoIWluc3RydW1lbnQpIHtcbiAgICByZXR1cm4gZmxhZ3M7XG4gIH1cblxuICBPYmplY3Qua2V5cyhmbGFncykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGRpc2FibGVkSW5zdHJ1bWVudGF0aW9ucy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICBmbGFnc1trZXldID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhZ3M7XG59IiwiaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4vdXRpbHMnO1xuXG52YXIgTG9nZ2luZ1NlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIExvZ2dpbmdTZXJ2aWNlKHNwZWMpIHtcbiAgICBpZiAoc3BlYyA9PT0gdm9pZCAwKSB7XG4gICAgICBzcGVjID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5sZXZlbHMgPSBbJ3RyYWNlJywgJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddO1xuICAgIHRoaXMubGV2ZWwgPSBzcGVjLmxldmVsIHx8ICd3YXJuJztcbiAgICB0aGlzLnByZWZpeCA9IHNwZWMucHJlZml4IHx8ICcnO1xuICAgIHRoaXMucmVzZXRMb2dNZXRob2RzKCk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTG9nZ2luZ1NlcnZpY2UucHJvdG90eXBlO1xuXG4gIF9wcm90by5zaG91bGRMb2cgPSBmdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcbiAgICByZXR1cm4gdGhpcy5sZXZlbHMuaW5kZXhPZihsZXZlbCkgPj0gdGhpcy5sZXZlbHMuaW5kZXhPZih0aGlzLmxldmVsKTtcbiAgfTtcblxuICBfcHJvdG8uc2V0TGV2ZWwgPSBmdW5jdGlvbiBzZXRMZXZlbChsZXZlbCkge1xuICAgIGlmIChsZXZlbCA9PT0gdGhpcy5sZXZlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICB0aGlzLnJlc2V0TG9nTWV0aG9kcygpO1xuICB9O1xuXG4gIF9wcm90by5yZXNldExvZ01ldGhvZHMgPSBmdW5jdGlvbiByZXNldExvZ01ldGhvZHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMubGV2ZWxzLmZvckVhY2goZnVuY3Rpb24gKGxldmVsKSB7XG4gICAgICBfdGhpc1tsZXZlbF0gPSBfdGhpcy5zaG91bGRMb2cobGV2ZWwpID8gbG9nIDogbm9vcDtcblxuICAgICAgZnVuY3Rpb24gbG9nKCkge1xuICAgICAgICB2YXIgbm9ybWFsaXplZExldmVsID0gbGV2ZWw7XG5cbiAgICAgICAgaWYgKGxldmVsID09PSAndHJhY2UnIHx8IGxldmVsID09PSAnZGVidWcnKSB7XG4gICAgICAgICAgbm9ybWFsaXplZExldmVsID0gJ2luZm8nO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGFyZ3NbMF0gPSB0aGlzLnByZWZpeCArIGFyZ3NbMF07XG5cbiAgICAgICAgaWYgKGNvbnNvbGUpIHtcbiAgICAgICAgICB2YXIgcmVhbE1ldGhvZCA9IGNvbnNvbGVbbm9ybWFsaXplZExldmVsXSB8fCBjb25zb2xlLmxvZztcblxuICAgICAgICAgIGlmICh0eXBlb2YgcmVhbE1ldGhvZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmVhbE1ldGhvZC5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gTG9nZ2luZ1NlcnZpY2U7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dpbmdTZXJ2aWNlOyIsInZhciBOREpTT04gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE5ESlNPTigpIHt9XG5cbiAgTkRKU09OLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvYmplY3QpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KSArICdcXG4nO1xuICB9O1xuXG4gIHJldHVybiBOREpTT047XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IE5ESlNPTjsiLCJpbXBvcnQgeyBVU0VSX0lOVEVSQUNUSU9OIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbnZhciBJTlRFUkFDVElWRV9TRUxFQ1RPUiA9ICdhW2RhdGEtdHJhbnNhY3Rpb24tbmFtZV0sIGJ1dHRvbltkYXRhLXRyYW5zYWN0aW9uLW5hbWVdJztcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlUGFnZUNsaWNrcyh0cmFuc2FjdGlvblNlcnZpY2UpIHtcbiAgdmFyIGNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIGNsaWNrSGFuZGxlcihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICBjcmVhdGVVc2VySW50ZXJhY3Rpb25UcmFuc2FjdGlvbih0cmFuc2FjdGlvblNlcnZpY2UsIGV2ZW50LnRhcmdldCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBldmVudE5hbWUgPSAnY2xpY2snO1xuICB2YXIgdXNlQ2FwdHVyZSA9IHRydWU7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2xpY2tIYW5kbGVyLCB1c2VDYXB0dXJlKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNsaWNrSGFuZGxlciwgdXNlQ2FwdHVyZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZXJJbnRlcmFjdGlvblRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uU2VydmljZSwgdGFyZ2V0KSB7XG4gIHZhciBfZ2V0VHJhbnNhY3Rpb25NZXRhZGEgPSBnZXRUcmFuc2FjdGlvbk1ldGFkYXRhKHRhcmdldCksXG4gICAgICB0cmFuc2FjdGlvbk5hbWUgPSBfZ2V0VHJhbnNhY3Rpb25NZXRhZGEudHJhbnNhY3Rpb25OYW1lLFxuICAgICAgY29udGV4dCA9IF9nZXRUcmFuc2FjdGlvbk1ldGFkYS5jb250ZXh0O1xuXG4gIHZhciB0ciA9IHRyYW5zYWN0aW9uU2VydmljZS5zdGFydFRyYW5zYWN0aW9uKFwiQ2xpY2sgLSBcIiArIHRyYW5zYWN0aW9uTmFtZSwgVVNFUl9JTlRFUkFDVElPTiwge1xuICAgIG1hbmFnZWQ6IHRydWUsXG4gICAgY2FuUmV1c2U6IHRydWUsXG4gICAgcmV1c2VUaHJlc2hvbGQ6IDMwMFxuICB9KTtcblxuICBpZiAodHIgJiYgY29udGV4dCkge1xuICAgIHRyLmFkZENvbnRleHQoY29udGV4dCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNhY3Rpb25NZXRhZGF0YSh0YXJnZXQpIHtcbiAgdmFyIG1ldGFkYXRhID0ge1xuICAgIHRyYW5zYWN0aW9uTmFtZTogbnVsbCxcbiAgICBjb250ZXh0OiBudWxsXG4gIH07XG4gIG1ldGFkYXRhLnRyYW5zYWN0aW9uTmFtZSA9IGJ1aWxkVHJhbnNhY3Rpb25OYW1lKHRhcmdldCk7XG4gIHZhciBjbGFzc2VzID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcblxuICBpZiAoY2xhc3Nlcykge1xuICAgIG1ldGFkYXRhLmNvbnRleHQgPSB7XG4gICAgICBjdXN0b206IHtcbiAgICAgICAgY2xhc3NlczogY2xhc3Nlc1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gbWV0YWRhdGE7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkVHJhbnNhY3Rpb25OYW1lKHRhcmdldCkge1xuICB2YXIgZHROYW1lID0gZmluZEN1c3RvbVRyYW5zYWN0aW9uTmFtZSh0YXJnZXQpO1xuXG4gIGlmIChkdE5hbWUpIHtcbiAgICByZXR1cm4gZHROYW1lO1xuICB9XG5cbiAgdmFyIHRhZ05hbWUgPSB0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgbmFtZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICBpZiAoISFuYW1lKSB7XG4gICAgcmV0dXJuIHRhZ05hbWUgKyBcIltcXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiO1xuICB9XG5cbiAgcmV0dXJuIHRhZ05hbWU7XG59XG5cbmZ1bmN0aW9uIGZpbmRDdXN0b21UcmFuc2FjdGlvbk5hbWUodGFyZ2V0KSB7XG4gIHZhciB0ckN1c3RvbU5hbWVBdHRyaWJ1dGUgPSAnZGF0YS10cmFuc2FjdGlvbi1uYW1lJztcbiAgdmFyIGZhbGxiYWNrTmFtZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodHJDdXN0b21OYW1lQXR0cmlidXRlKTtcblxuICBpZiAodGFyZ2V0LmNsb3Nlc3QpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRhcmdldC5jbG9zZXN0KElOVEVSQUNUSVZFX1NFTEVDVE9SKTtcbiAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKHRyQ3VzdG9tTmFtZUF0dHJpYnV0ZSkgOiBmYWxsYmFja05hbWU7XG4gIH1cblxuICByZXR1cm4gZmFsbGJhY2tOYW1lO1xufSIsImltcG9ydCB7IFFVRVVFX0FERF9UUkFOU0FDVElPTiwgUVVFVUVfRkxVU0gsIFRSQU5TQUNUSU9OX0lHTk9SRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBzdGF0ZSB9IGZyb20gJy4uLy4uL3N0YXRlJztcbmltcG9ydCB7IG5vdyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHJlcG9ydElucCB9IGZyb20gJy4uLy4uL3BlcmZvcm1hbmNlLW1vbml0b3JpbmcvbWV0cmljcy9pbnAvcmVwb3J0JztcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlUGFnZVZpc2liaWxpdHkoY29uZmlnU2VydmljZSwgdHJhbnNhY3Rpb25TZXJ2aWNlKSB7XG4gIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgc3RhdGUubGFzdEhpZGRlblN0YXJ0ID0gMDtcbiAgfVxuXG4gIHZhciB2aXNpYmlsaXR5Q2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uIHZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyKCkge1xuICAgIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICBvblBhZ2VIaWRkZW4oY29uZmlnU2VydmljZSwgdHJhbnNhY3Rpb25TZXJ2aWNlKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHBhZ2VIaWRlSGFuZGxlciA9IGZ1bmN0aW9uIHBhZ2VIaWRlSGFuZGxlcigpIHtcbiAgICByZXR1cm4gb25QYWdlSGlkZGVuKGNvbmZpZ1NlcnZpY2UsIHRyYW5zYWN0aW9uU2VydmljZSk7XG4gIH07XG5cbiAgdmFyIHVzZUNhcHR1cmUgPSB0cnVlO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIHZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyLCB1c2VDYXB0dXJlKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VoaWRlJywgcGFnZUhpZGVIYW5kbGVyLCB1c2VDYXB0dXJlKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIHZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyLCB1c2VDYXB0dXJlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFnZWhpZGUnLCBwYWdlSGlkZUhhbmRsZXIsIHVzZUNhcHR1cmUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvblBhZ2VIaWRkZW4oY29uZmlnU2VydmljZSwgdHJhbnNhY3Rpb25TZXJ2aWNlKSB7XG4gIHZhciBpbnBUciA9IHJlcG9ydElucCh0cmFuc2FjdGlvblNlcnZpY2UpO1xuXG4gIGlmIChpbnBUcikge1xuICAgIHZhciB1bm9ic2VydmUgPSBjb25maWdTZXJ2aWNlLm9ic2VydmVFdmVudChRVUVVRV9BRERfVFJBTlNBQ1RJT04sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGVuZE1hbmFnZWRUcmFuc2FjdGlvbihjb25maWdTZXJ2aWNlLCB0cmFuc2FjdGlvblNlcnZpY2UpO1xuICAgICAgdW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZW5kTWFuYWdlZFRyYW5zYWN0aW9uKGNvbmZpZ1NlcnZpY2UsIHRyYW5zYWN0aW9uU2VydmljZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kTWFuYWdlZFRyYW5zYWN0aW9uKGNvbmZpZ1NlcnZpY2UsIHRyYW5zYWN0aW9uU2VydmljZSkge1xuICB2YXIgdHIgPSB0cmFuc2FjdGlvblNlcnZpY2UuZ2V0Q3VycmVudFRyYW5zYWN0aW9uKCk7XG5cbiAgaWYgKHRyKSB7XG4gICAgdmFyIHVub2JzZXJ2ZURpc2NhcmQgPSBjb25maWdTZXJ2aWNlLm9ic2VydmVFdmVudChUUkFOU0FDVElPTl9JR05PUkUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0YXRlLmxhc3RIaWRkZW5TdGFydCA9IG5vdygpO1xuICAgICAgdW5vYnNlcnZlRGlzY2FyZCgpO1xuICAgICAgdW5vYnNlcnZlUXVldWVBZGQoKTtcbiAgICB9KTtcbiAgICB2YXIgdW5vYnNlcnZlUXVldWVBZGQgPSBjb25maWdTZXJ2aWNlLm9ic2VydmVFdmVudChRVUVVRV9BRERfVFJBTlNBQ1RJT04sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbmZpZ1NlcnZpY2UuZGlzcGF0Y2hFdmVudChRVUVVRV9GTFVTSCk7XG4gICAgICBzdGF0ZS5sYXN0SGlkZGVuU3RhcnQgPSBub3coKTtcbiAgICAgIHVub2JzZXJ2ZVF1ZXVlQWRkKCk7XG4gICAgICB1bm9ic2VydmVEaXNjYXJkKCk7XG4gICAgfSk7XG4gICAgdHIuZW5kKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnU2VydmljZS5kaXNwYXRjaEV2ZW50KFFVRVVFX0ZMVVNIKTtcbiAgICBzdGF0ZS5sYXN0SGlkZGVuU3RhcnQgPSBub3coKTtcbiAgfVxufSIsImltcG9ydCB7IFByb21pc2UgfSBmcm9tICcuLi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgZ2xvYmFsU3RhdGUgfSBmcm9tICcuL3BhdGNoLXV0aWxzJztcbmltcG9ydCB7IFNDSEVEVUxFLCBJTlZPS0UsIEZFVENIIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IHNjaGVkdWxlTWljcm9UYXNrIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgaXNGZXRjaFN1cHBvcnRlZCB9IGZyb20gJy4uL2h0dHAvZmV0Y2gnO1xuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoRmV0Y2goY2FsbGJhY2spIHtcbiAgaWYgKCFpc0ZldGNoU3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBzY2hlZHVsZVRhc2sodGFzaykge1xuICAgIHRhc2suc3RhdGUgPSBTQ0hFRFVMRTtcbiAgICBjYWxsYmFjayhTQ0hFRFVMRSwgdGFzayk7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VUYXNrKHRhc2spIHtcbiAgICB0YXNrLnN0YXRlID0gSU5WT0tFO1xuICAgIGNhbGxiYWNrKElOVk9LRSwgdGFzayk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZUVycm9yKHRhc2ssIGVycm9yKSB7XG4gICAgdGFzay5kYXRhLmFib3J0ZWQgPSBpc0Fib3J0RXJyb3IoZXJyb3IpO1xuICAgIHRhc2suZGF0YS5lcnJvciA9IGVycm9yO1xuICAgIGludm9rZVRhc2sodGFzayk7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU3RyZWFtKHN0cmVhbSwgdGFzaykge1xuICAgIHZhciByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG5cbiAgICB2YXIgcmVhZCA9IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICByZWFkZXIucmVhZCgpLnRoZW4oZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIGRvbmUgPSBfcmVmLmRvbmU7XG5cbiAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICBpbnZva2VUYXNrKHRhc2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGhhbmRsZVJlc3BvbnNlRXJyb3IodGFzaywgZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlYWQoKTtcbiAgfVxuXG4gIHZhciBuYXRpdmVGZXRjaCA9IHdpbmRvdy5mZXRjaDtcblxuICB3aW5kb3cuZmV0Y2ggPSBmdW5jdGlvbiAoaW5wdXQsIGluaXQpIHtcbiAgICB2YXIgZmV0Y2hTZWxmID0gdGhpcztcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgcmVxdWVzdCwgdXJsO1xuICAgIHZhciBpc1VSTCA9IGlucHV0IGluc3RhbmNlb2YgVVJMO1xuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgaXNVUkwpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdCk7XG5cbiAgICAgIGlmIChpc1VSTCkge1xuICAgICAgICB1cmwgPSByZXF1ZXN0LnVybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybCA9IGlucHV0O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5wdXQpIHtcbiAgICAgIHJlcXVlc3QgPSBpbnB1dDtcbiAgICAgIHVybCA9IHJlcXVlc3QudXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmF0aXZlRmV0Y2guYXBwbHkoZmV0Y2hTZWxmLCBhcmdzKTtcbiAgICB9XG5cbiAgICB2YXIgdGFzayA9IHtcbiAgICAgIHNvdXJjZTogRkVUQ0gsXG4gICAgICBzdGF0ZTogJycsXG4gICAgICB0eXBlOiAnbWFjcm9UYXNrJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGFyZ2V0OiByZXF1ZXN0LFxuICAgICAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgYWJvcnRlZDogZmFsc2VcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBnbG9iYWxTdGF0ZS5mZXRjaEluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgc2NoZWR1bGVUYXNrKHRhc2spO1xuICAgICAgdmFyIHByb21pc2U7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHByb21pc2UgPSBuYXRpdmVGZXRjaC5hcHBseShmZXRjaFNlbGYsIFtyZXF1ZXN0XSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB0YXNrLmRhdGEuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgaW52b2tlVGFzayh0YXNrKTtcbiAgICAgICAgZ2xvYmFsU3RhdGUuZmV0Y2hJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgY2xvbmVkUmVzcG9uc2UgPSByZXNwb25zZS5jbG9uZSA/IHJlc3BvbnNlLmNsb25lKCkgOiB7fTtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIHNjaGVkdWxlTWljcm9UYXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0YXNrLmRhdGEucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICB2YXIgYm9keSA9IGNsb25lZFJlc3BvbnNlLmJvZHk7XG5cbiAgICAgICAgICBpZiAoYm9keSkge1xuICAgICAgICAgICAgcmVhZFN0cmVhbShib2R5LCB0YXNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW52b2tlVGFzayh0YXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIHNjaGVkdWxlTWljcm9UYXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBoYW5kbGVSZXNwb25zZUVycm9yKHRhc2ssIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGdsb2JhbFN0YXRlLmZldGNoSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpc0Fib3J0RXJyb3IoZXJyb3IpIHtcbiAgcmV0dXJuIGVycm9yICYmIGVycm9yLm5hbWUgPT09ICdBYm9ydEVycm9yJztcbn0iLCJpbXBvcnQgeyBJTlZPS0UsIEhJU1RPUlkgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoSGlzdG9yeShjYWxsYmFjaykge1xuICBpZiAoIXdpbmRvdy5oaXN0b3J5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG5hdGl2ZVB1c2hTdGF0ZSA9IGhpc3RvcnkucHVzaFN0YXRlO1xuXG4gIGlmICh0eXBlb2YgbmF0aXZlUHVzaFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIHRpdGxlLCB1cmwpIHtcbiAgICAgIHZhciB0YXNrID0ge1xuICAgICAgICBzb3VyY2U6IEhJU1RPUlksXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjYWxsYmFjayhJTlZPS0UsIHRhc2spO1xuICAgICAgbmF0aXZlUHVzaFN0YXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufSIsImltcG9ydCB7IHBhdGNoWE1MSHR0cFJlcXVlc3QgfSBmcm9tICcuL3hoci1wYXRjaCc7XG5pbXBvcnQgeyBwYXRjaEZldGNoIH0gZnJvbSAnLi9mZXRjaC1wYXRjaCc7XG5pbXBvcnQgeyBwYXRjaEhpc3RvcnkgfSBmcm9tICcuL2hpc3RvcnktcGF0Y2gnO1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuLi9ldmVudC1oYW5kbGVyJztcbmltcG9ydCB7IEhJU1RPUlksIEZFVENILCBYTUxIVFRQUkVRVUVTVCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG52YXIgcGF0Y2hFdmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG52YXIgYWxyZWFkeVBhdGNoZWQgPSBmYWxzZTtcblxuZnVuY3Rpb24gcGF0Y2hBbGwoKSB7XG4gIGlmICghYWxyZWFkeVBhdGNoZWQpIHtcbiAgICBhbHJlYWR5UGF0Y2hlZCA9IHRydWU7XG4gICAgcGF0Y2hYTUxIdHRwUmVxdWVzdChmdW5jdGlvbiAoZXZlbnQsIHRhc2spIHtcbiAgICAgIHBhdGNoRXZlbnRIYW5kbGVyLnNlbmQoWE1MSFRUUFJFUVVFU1QsIFtldmVudCwgdGFza10pO1xuICAgIH0pO1xuICAgIHBhdGNoRmV0Y2goZnVuY3Rpb24gKGV2ZW50LCB0YXNrKSB7XG4gICAgICBwYXRjaEV2ZW50SGFuZGxlci5zZW5kKEZFVENILCBbZXZlbnQsIHRhc2tdKTtcbiAgICB9KTtcbiAgICBwYXRjaEhpc3RvcnkoZnVuY3Rpb24gKGV2ZW50LCB0YXNrKSB7XG4gICAgICBwYXRjaEV2ZW50SGFuZGxlci5zZW5kKEhJU1RPUlksIFtldmVudCwgdGFza10pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHBhdGNoRXZlbnRIYW5kbGVyO1xufVxuXG5leHBvcnQgeyBwYXRjaEFsbCwgcGF0Y2hFdmVudEhhbmRsZXIgfTsiLCJleHBvcnQgdmFyIGdsb2JhbFN0YXRlID0ge1xuICBmZXRjaEluUHJvZ3Jlc3M6IGZhbHNlXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGFwbVN5bWJvbChuYW1lKSB7XG4gIHJldHVybiAnX19hcG1fc3ltYm9sX18nICsgbmFtZTtcbn1cblxuZnVuY3Rpb24gaXNQcm9wZXJ0eVdyaXRhYmxlKHByb3BlcnR5RGVzYykge1xuICBpZiAoIXByb3BlcnR5RGVzYykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHByb3BlcnR5RGVzYy53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gISh0eXBlb2YgcHJvcGVydHlEZXNjLmdldCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcHJvcGVydHlEZXNjLnNldCA9PT0gJ3VuZGVmaW5lZCcpO1xufVxuXG5mdW5jdGlvbiBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQocGF0Y2hlZCwgb3JpZ2luYWwpIHtcbiAgcGF0Y2hlZFthcG1TeW1ib2woJ09yaWdpbmFsRGVsZWdhdGUnKV0gPSBvcmlnaW5hbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoTWV0aG9kKHRhcmdldCwgbmFtZSwgcGF0Y2hGbikge1xuICB2YXIgcHJvdG8gPSB0YXJnZXQ7XG5cbiAgd2hpbGUgKHByb3RvICYmICFwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgfVxuXG4gIGlmICghcHJvdG8gJiYgdGFyZ2V0W25hbWVdKSB7XG4gICAgcHJvdG8gPSB0YXJnZXQ7XG4gIH1cblxuICB2YXIgZGVsZWdhdGVOYW1lID0gYXBtU3ltYm9sKG5hbWUpO1xuICB2YXIgZGVsZWdhdGU7XG5cbiAgaWYgKHByb3RvICYmICEoZGVsZWdhdGUgPSBwcm90b1tkZWxlZ2F0ZU5hbWVdKSkge1xuICAgIGRlbGVnYXRlID0gcHJvdG9bZGVsZWdhdGVOYW1lXSA9IHByb3RvW25hbWVdO1xuICAgIHZhciBkZXNjID0gcHJvdG8gJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbmFtZSk7XG5cbiAgICBpZiAoaXNQcm9wZXJ0eVdyaXRhYmxlKGRlc2MpKSB7XG4gICAgICB2YXIgcGF0Y2hEZWxlZ2F0ZSA9IHBhdGNoRm4oZGVsZWdhdGUsIGRlbGVnYXRlTmFtZSwgbmFtZSk7XG5cbiAgICAgIHByb3RvW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcGF0Y2hEZWxlZ2F0ZSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcblxuICAgICAgYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHByb3RvW25hbWVdLCBkZWxlZ2F0ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlbGVnYXRlO1xufVxuZXhwb3J0IHZhciBYSFJfSUdOT1JFID0gYXBtU3ltYm9sKCd4aHJJZ25vcmUnKTtcbmV4cG9ydCB2YXIgWEhSX1NZTkMgPSBhcG1TeW1ib2woJ3hoclN5bmMnKTtcbmV4cG9ydCB2YXIgWEhSX1VSTCA9IGFwbVN5bWJvbCgneGhyVVJMJyk7XG5leHBvcnQgdmFyIFhIUl9NRVRIT0QgPSBhcG1TeW1ib2woJ3hock1ldGhvZCcpOyIsImltcG9ydCB7IHBhdGNoTWV0aG9kLCBYSFJfU1lOQywgWEhSX1VSTCwgWEhSX01FVEhPRCwgWEhSX0lHTk9SRSB9IGZyb20gJy4vcGF0Y2gtdXRpbHMnO1xuaW1wb3J0IHsgU0NIRURVTEUsIElOVk9LRSwgWE1MSFRUUFJFUVVFU1QsIEFERF9FVkVOVF9MSVNURU5FUl9TVFIgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoWE1MSHR0cFJlcXVlc3QoY2FsbGJhY2spIHtcbiAgdmFyIFhNTEh0dHBSZXF1ZXN0UHJvdG90eXBlID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlO1xuXG4gIGlmICghWE1MSHR0cFJlcXVlc3RQcm90b3R5cGUgfHwgIVhNTEh0dHBSZXF1ZXN0UHJvdG90eXBlW0FERF9FVkVOVF9MSVNURU5FUl9TVFJdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIFJFQURZX1NUQVRFX0NIQU5HRSA9ICdyZWFkeXN0YXRlY2hhbmdlJztcbiAgdmFyIExPQUQgPSAnbG9hZCc7XG4gIHZhciBFUlJPUiA9ICdlcnJvcic7XG4gIHZhciBUSU1FT1VUID0gJ3RpbWVvdXQnO1xuICB2YXIgQUJPUlQgPSAnYWJvcnQnO1xuXG4gIGZ1bmN0aW9uIGludm9rZVRhc2sodGFzaywgc3RhdHVzKSB7XG4gICAgaWYgKHRhc2suc3RhdGUgIT09IElOVk9LRSkge1xuICAgICAgdGFzay5zdGF0ZSA9IElOVk9LRTtcbiAgICAgIHRhc2suZGF0YS5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICBjYWxsYmFjayhJTlZPS0UsIHRhc2spO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlVGFzayh0YXNrKSB7XG4gICAgaWYgKHRhc2suc3RhdGUgPT09IFNDSEVEVUxFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGFzay5zdGF0ZSA9IFNDSEVEVUxFO1xuICAgIGNhbGxiYWNrKFNDSEVEVUxFLCB0YXNrKTtcbiAgICB2YXIgdGFyZ2V0ID0gdGFzay5kYXRhLnRhcmdldDtcblxuICAgIGZ1bmN0aW9uIGFkZExpc3RlbmVyKG5hbWUpIHtcbiAgICAgIHRhcmdldFtBRERfRVZFTlRfTElTVEVORVJfU1RSXShuYW1lLCBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICB2YXIgdHlwZSA9IF9yZWYudHlwZTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gUkVBRFlfU1RBVEVfQ0hBTkdFKSB7XG4gICAgICAgICAgaWYgKHRhcmdldC5yZWFkeVN0YXRlID09PSA0ICYmIHRhcmdldC5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgICAgIGludm9rZVRhc2sodGFzaywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHN0YXR1cyA9IHR5cGUgPT09IExPQUQgPyAnc3VjY2VzcycgOiB0eXBlO1xuICAgICAgICAgIGludm9rZVRhc2sodGFzaywgc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXIoUkVBRFlfU1RBVEVfQ0hBTkdFKTtcbiAgICBhZGRMaXN0ZW5lcihMT0FEKTtcbiAgICBhZGRMaXN0ZW5lcihUSU1FT1VUKTtcbiAgICBhZGRMaXN0ZW5lcihFUlJPUik7XG4gICAgYWRkTGlzdGVuZXIoQUJPUlQpO1xuICB9XG5cbiAgdmFyIG9wZW5OYXRpdmUgPSBwYXRjaE1ldGhvZChYTUxIdHRwUmVxdWVzdFByb3RvdHlwZSwgJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZWxmLCBhcmdzKSB7XG4gICAgICBpZiAoIXNlbGZbWEhSX0lHTk9SRV0pIHtcbiAgICAgICAgc2VsZltYSFJfTUVUSE9EXSA9IGFyZ3NbMF07XG4gICAgICAgIHNlbGZbWEhSX1VSTF0gPSBhcmdzWzFdO1xuICAgICAgICBzZWxmW1hIUl9TWU5DXSA9IGFyZ3NbMl0gPT09IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3Blbk5hdGl2ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9O1xuICB9KTtcbiAgdmFyIHNlbmROYXRpdmUgPSBwYXRjaE1ldGhvZChYTUxIdHRwUmVxdWVzdFByb3RvdHlwZSwgJ3NlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZWxmLCBhcmdzKSB7XG4gICAgICBpZiAoc2VsZltYSFJfSUdOT1JFXSkge1xuICAgICAgICByZXR1cm4gc2VuZE5hdGl2ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhc2sgPSB7XG4gICAgICAgIHNvdXJjZTogWE1MSFRUUFJFUVVFU1QsXG4gICAgICAgIHN0YXRlOiAnJyxcbiAgICAgICAgdHlwZTogJ21hY3JvVGFzaycsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0YXJnZXQ6IHNlbGYsXG4gICAgICAgICAgbWV0aG9kOiBzZWxmW1hIUl9NRVRIT0RdLFxuICAgICAgICAgIHN5bmM6IHNlbGZbWEhSX1NZTkNdLFxuICAgICAgICAgIHVybDogc2VsZltYSFJfVVJMXSxcbiAgICAgICAgICBzdGF0dXM6ICcnXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHNjaGVkdWxlVGFzayh0YXNrKTtcbiAgICAgICAgcmV0dXJuIHNlbmROYXRpdmUuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGludm9rZVRhc2sodGFzaywgRVJST1IpO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSIsImltcG9ydCBQcm9taXNlUG9sbHlmaWxsIGZyb20gJ3Byb21pc2UtcG9seWZpbGwnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi91dGlscyc7XG52YXIgbG9jYWwgPSB7fTtcblxuaWYgKGlzQnJvd3Nlcikge1xuICBsb2NhbCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIGxvY2FsID0gc2VsZjtcbn1cblxudmFyIFByb21pc2UgPSAnUHJvbWlzZScgaW4gbG9jYWwgPyBsb2NhbC5Qcm9taXNlIDogUHJvbWlzZVBvbGx5ZmlsbDtcbmV4cG9ydCB7IFByb21pc2UgfTsiLCJ2YXIgUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFF1ZXVlKG9uRmx1c2gsIG9wdHMpIHtcbiAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5vbkZsdXNoID0gb25GbHVzaDtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5xdWV1ZUxpbWl0ID0gb3B0cy5xdWV1ZUxpbWl0IHx8IC0xO1xuICAgIHRoaXMuZmx1c2hJbnRlcnZhbCA9IG9wdHMuZmx1c2hJbnRlcnZhbCB8fCAwO1xuICAgIHRoaXMudGltZW91dElkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFF1ZXVlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uX3NldFRpbWVyID0gZnVuY3Rpb24gX3NldFRpbWVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLmZsdXNoKCk7XG4gICAgfSwgdGhpcy5mbHVzaEludGVydmFsKTtcbiAgfTtcblxuICBfcHJvdG8uX2NsZWFyID0gZnVuY3Rpb24gX2NsZWFyKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy50aW1lb3V0SWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SWQpO1xuICAgICAgdGhpcy50aW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICB9O1xuXG4gIF9wcm90by5mbHVzaCA9IGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHRoaXMub25GbHVzaCh0aGlzLml0ZW1zKTtcblxuICAgIHRoaXMuX2NsZWFyKCk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZCA9IGZ1bmN0aW9uIGFkZChpdGVtKSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuXG4gICAgaWYgKHRoaXMucXVldWVMaW1pdCAhPT0gLTEgJiYgdGhpcy5pdGVtcy5sZW5ndGggPj0gdGhpcy5xdWV1ZUxpbWl0KSB7XG4gICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy50aW1lb3V0SWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuX3NldFRpbWVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBRdWV1ZTtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgUXVldWU7IiwidmFyIF9zZXJ2aWNlQ3JlYXRvcnM7XG5cbmltcG9ydCBBcG1TZXJ2ZXIgZnJvbSAnLi9hcG0tc2VydmVyJztcbmltcG9ydCBDb25maWdTZXJ2aWNlIGZyb20gJy4vY29uZmlnLXNlcnZpY2UnO1xuaW1wb3J0IExvZ2dpbmdTZXJ2aWNlIGZyb20gJy4vbG9nZ2luZy1zZXJ2aWNlJztcbmltcG9ydCB7IENPTkZJR19DSEFOR0UsIENPTkZJR19TRVJWSUNFLCBMT0dHSU5HX1NFUlZJQ0UsIEFQTV9TRVJWRVIgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBfX0RFVl9fIH0gZnJvbSAnLi4vc3RhdGUnO1xudmFyIHNlcnZpY2VDcmVhdG9ycyA9IChfc2VydmljZUNyZWF0b3JzID0ge30sIF9zZXJ2aWNlQ3JlYXRvcnNbQ09ORklHX1NFUlZJQ0VdID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IENvbmZpZ1NlcnZpY2UoKTtcbn0sIF9zZXJ2aWNlQ3JlYXRvcnNbTE9HR0lOR19TRVJWSUNFXSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBMb2dnaW5nU2VydmljZSh7XG4gICAgcHJlZml4OiAnW0VsYXN0aWMgQVBNXSAnXG4gIH0pO1xufSwgX3NlcnZpY2VDcmVhdG9yc1tBUE1fU0VSVkVSXSA9IGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gIHZhciBfZmFjdG9yeSRnZXRTZXJ2aWNlID0gZmFjdG9yeS5nZXRTZXJ2aWNlKFtDT05GSUdfU0VSVklDRSwgTE9HR0lOR19TRVJWSUNFXSksXG4gICAgICBjb25maWdTZXJ2aWNlID0gX2ZhY3RvcnkkZ2V0U2VydmljZVswXSxcbiAgICAgIGxvZ2dpbmdTZXJ2aWNlID0gX2ZhY3RvcnkkZ2V0U2VydmljZVsxXTtcblxuICByZXR1cm4gbmV3IEFwbVNlcnZlcihjb25maWdTZXJ2aWNlLCBsb2dnaW5nU2VydmljZSk7XG59LCBfc2VydmljZUNyZWF0b3JzKTtcblxudmFyIFNlcnZpY2VGYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZXJ2aWNlRmFjdG9yeSgpIHtcbiAgICB0aGlzLmluc3RhbmNlcyA9IHt9O1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTZXJ2aWNlRmFjdG9yeS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdmFyIGNvbmZpZ1NlcnZpY2UgPSB0aGlzLmdldFNlcnZpY2UoQ09ORklHX1NFUlZJQ0UpO1xuICAgIGNvbmZpZ1NlcnZpY2UuaW5pdCgpO1xuXG4gICAgdmFyIF90aGlzJGdldFNlcnZpY2UgPSB0aGlzLmdldFNlcnZpY2UoW0xPR0dJTkdfU0VSVklDRSwgQVBNX1NFUlZFUl0pLFxuICAgICAgICBsb2dnaW5nU2VydmljZSA9IF90aGlzJGdldFNlcnZpY2VbMF0sXG4gICAgICAgIGFwbVNlcnZlciA9IF90aGlzJGdldFNlcnZpY2VbMV07XG5cbiAgICBjb25maWdTZXJ2aWNlLmV2ZW50cy5vYnNlcnZlKENPTkZJR19DSEFOR0UsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBsb2dMZXZlbCA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdsb2dMZXZlbCcpO1xuICAgICAgbG9nZ2luZ1NlcnZpY2Uuc2V0TGV2ZWwobG9nTGV2ZWwpO1xuICAgIH0pO1xuICAgIGFwbVNlcnZlci5pbml0KCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldFNlcnZpY2UgPSBmdW5jdGlvbiBnZXRTZXJ2aWNlKG5hbWUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCF0aGlzLmluc3RhbmNlc1tuYW1lXSkge1xuICAgICAgICBpZiAodHlwZW9mIHNlcnZpY2VDcmVhdG9yc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW25hbWVdID0gc2VydmljZUNyZWF0b3JzW25hbWVdKHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGdldCBzZXJ2aWNlLCBObyBjcmVhdG9yIGZvcjogJyArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlc1tuYW1lXTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkpIHtcbiAgICAgIHJldHVybiBuYW1lLm1hcChmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gX3RoaXMuZ2V0U2VydmljZShuKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2VydmljZUZhY3Rvcnk7XG59KCk7XG5cbmV4cG9ydCB7IHNlcnZpY2VDcmVhdG9ycywgU2VydmljZUZhY3RvcnkgfTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aHJvdHRsZShmbiwgb25UaHJvdHRsZSwgb3B0cykge1xuICB2YXIgY29udGV4dCA9IHRoaXM7XG4gIHZhciBsaW1pdCA9IG9wdHMubGltaXQ7XG4gIHZhciBpbnRlcnZhbCA9IG9wdHMuaW50ZXJ2YWw7XG4gIHZhciBjb3VudGVyID0gMDtcbiAgdmFyIHRpbWVvdXRJZDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjb3VudGVyKys7XG5cbiAgICBpZiAodHlwZW9mIHRpbWVvdXRJZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgdGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGlmIChjb3VudGVyID4gbGltaXQgJiYgdHlwZW9mIG9uVGhyb3R0bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBvblRocm90dGxlLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgeyBLRVlXT1JEX0xJTUlUIH0gZnJvbSAnLi9jb25zdGFudHMnO1xudmFyIE1FVEFEQVRBX01PREVMID0ge1xuICBzZXJ2aWNlOiB7XG4gICAgbmFtZTogW0tFWVdPUkRfTElNSVQsIHRydWVdLFxuICAgIHZlcnNpb246IHRydWUsXG4gICAgYWdlbnQ6IHtcbiAgICAgIHZlcnNpb246IFtLRVlXT1JEX0xJTUlULCB0cnVlXVxuICAgIH0sXG4gICAgZW52aXJvbm1lbnQ6IHRydWVcbiAgfSxcbiAgbGFiZWxzOiB7XG4gICAgJyonOiB0cnVlXG4gIH1cbn07XG52YXIgUkVTUE9OU0VfTU9ERUwgPSB7XG4gICcqJzogdHJ1ZSxcbiAgaGVhZGVyczoge1xuICAgICcqJzogdHJ1ZVxuICB9XG59O1xudmFyIERFU1RJTkFUSU9OX01PREVMID0ge1xuICBhZGRyZXNzOiBbS0VZV09SRF9MSU1JVF0sXG4gIHNlcnZpY2U6IHtcbiAgICAnKic6IFtLRVlXT1JEX0xJTUlULCB0cnVlXVxuICB9XG59O1xudmFyIENPTlRFWFRfTU9ERUwgPSB7XG4gIHVzZXI6IHtcbiAgICBpZDogdHJ1ZSxcbiAgICBlbWFpbDogdHJ1ZSxcbiAgICB1c2VybmFtZTogdHJ1ZVxuICB9LFxuICB0YWdzOiB7XG4gICAgJyonOiB0cnVlXG4gIH0sXG4gIGh0dHA6IHtcbiAgICByZXNwb25zZTogUkVTUE9OU0VfTU9ERUxcbiAgfSxcbiAgZGVzdGluYXRpb246IERFU1RJTkFUSU9OX01PREVMLFxuICByZXNwb25zZTogUkVTUE9OU0VfTU9ERUxcbn07XG52YXIgU1BBTl9NT0RFTCA9IHtcbiAgbmFtZTogW0tFWVdPUkRfTElNSVQsIHRydWVdLFxuICB0eXBlOiBbS0VZV09SRF9MSU1JVCwgdHJ1ZV0sXG4gIGlkOiBbS0VZV09SRF9MSU1JVCwgdHJ1ZV0sXG4gIHRyYWNlX2lkOiBbS0VZV09SRF9MSU1JVCwgdHJ1ZV0sXG4gIHBhcmVudF9pZDogW0tFWVdPUkRfTElNSVQsIHRydWVdLFxuICB0cmFuc2FjdGlvbl9pZDogW0tFWVdPUkRfTElNSVQsIHRydWVdLFxuICBzdWJ0eXBlOiB0cnVlLFxuICBhY3Rpb246IHRydWUsXG4gIGNvbnRleHQ6IENPTlRFWFRfTU9ERUxcbn07XG52YXIgVFJBTlNBQ1RJT05fTU9ERUwgPSB7XG4gIG5hbWU6IHRydWUsXG4gIHBhcmVudF9pZDogdHJ1ZSxcbiAgdHlwZTogW0tFWVdPUkRfTElNSVQsIHRydWVdLFxuICBpZDogW0tFWVdPUkRfTElNSVQsIHRydWVdLFxuICB0cmFjZV9pZDogW0tFWVdPUkRfTElNSVQsIHRydWVdLFxuICBzcGFuX2NvdW50OiB7XG4gICAgc3RhcnRlZDogW0tFWVdPUkRfTElNSVQsIHRydWVdXG4gIH0sXG4gIGNvbnRleHQ6IENPTlRFWFRfTU9ERUxcbn07XG52YXIgRVJST1JfTU9ERUwgPSB7XG4gIGlkOiBbS0VZV09SRF9MSU1JVCwgdHJ1ZV0sXG4gIHRyYWNlX2lkOiB0cnVlLFxuICB0cmFuc2FjdGlvbl9pZDogdHJ1ZSxcbiAgcGFyZW50X2lkOiB0cnVlLFxuICBjdWxwcml0OiB0cnVlLFxuICBleGNlcHRpb246IHtcbiAgICB0eXBlOiB0cnVlXG4gIH0sXG4gIHRyYW5zYWN0aW9uOiB7XG4gICAgdHlwZTogdHJ1ZVxuICB9LFxuICBjb250ZXh0OiBDT05URVhUX01PREVMXG59O1xuXG5mdW5jdGlvbiB0cnVuY2F0ZSh2YWx1ZSwgbGltaXQsIHJlcXVpcmVkLCBwbGFjZWhvbGRlcikge1xuICBpZiAobGltaXQgPT09IHZvaWQgMCkge1xuICAgIGxpbWl0ID0gS0VZV09SRF9MSU1JVDtcbiAgfVxuXG4gIGlmIChyZXF1aXJlZCA9PT0gdm9pZCAwKSB7XG4gICAgcmVxdWlyZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChwbGFjZWhvbGRlciA9PT0gdm9pZCAwKSB7XG4gICAgcGxhY2Vob2xkZXIgPSAnTi9BJztcbiAgfVxuXG4gIGlmIChyZXF1aXJlZCAmJiBpc0VtcHR5KHZhbHVlKSkge1xuICAgIHZhbHVlID0gcGxhY2Vob2xkZXI7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZS5zdWJzdHJpbmcoMCwgbGltaXQpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJyB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlVmFsdWUodGFyZ2V0LCBrZXksIGN1cnJNb2RlbCkge1xuICB2YXIgdmFsdWUgPSB0cnVuY2F0ZSh0YXJnZXRba2V5XSwgY3Vyck1vZGVsWzBdLCBjdXJyTW9kZWxbMV0pO1xuXG4gIGlmIChpc0VtcHR5KHZhbHVlKSkge1xuICAgIGRlbGV0ZSB0YXJnZXRba2V5XTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0YXJnZXRba2V5XSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0cnVuY2F0ZU1vZGVsKG1vZGVsLCB0YXJnZXQsIGNoaWxkVGFyZ2V0KSB7XG4gIGlmIChtb2RlbCA9PT0gdm9pZCAwKSB7XG4gICAgbW9kZWwgPSB7fTtcbiAgfVxuXG4gIGlmIChjaGlsZFRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgY2hpbGRUYXJnZXQgPSB0YXJnZXQ7XG4gIH1cblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgdmFyIGVtcHR5QXJyID0gW107XG5cbiAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xuICAgIHZhciBjdXJyS2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgY3Vyck1vZGVsID0gbW9kZWxbY3VycktleV0gPT09IHRydWUgPyBlbXB0eUFyciA6IG1vZGVsW2N1cnJLZXldO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJNb2RlbCkpIHtcbiAgICAgIHRydW5jYXRlTW9kZWwoY3Vyck1vZGVsLCB0YXJnZXQsIGNoaWxkVGFyZ2V0W2N1cnJLZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1cnJLZXkgPT09ICcqJykge1xuICAgICAgICBPYmplY3Qua2V5cyhjaGlsZFRhcmdldCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VWYWx1ZShjaGlsZFRhcmdldCwga2V5LCBjdXJyTW9kZWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGxhY2VWYWx1ZShjaGlsZFRhcmdldCwgY3VycktleSwgY3Vyck1vZGVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgX2xvb3AoaSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgeyB0cnVuY2F0ZSwgdHJ1bmNhdGVNb2RlbCwgU1BBTl9NT0RFTCwgVFJBTlNBQ1RJT05fTU9ERUwsIEVSUk9SX01PREVMLCBNRVRBREFUQV9NT0RFTCwgUkVTUE9OU0VfTU9ERUwgfTsiLCJpbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gaXNEZWZhdWx0UG9ydChwb3J0LCBwcm90b2NvbCkge1xuICBzd2l0Y2ggKHByb3RvY29sKSB7XG4gICAgY2FzZSAnaHR0cDonOlxuICAgICAgcmV0dXJuIHBvcnQgPT09ICc4MCc7XG5cbiAgICBjYXNlICdodHRwczonOlxuICAgICAgcmV0dXJuIHBvcnQgPT09ICc0NDMnO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBSVUxFUyA9IFtbJyMnLCAnaGFzaCddLCBbJz8nLCAncXVlcnknXSwgWycvJywgJ3BhdGgnXSwgWydAJywgJ2F1dGgnLCAxXSwgW05hTiwgJ2hvc3QnLCB1bmRlZmluZWQsIDFdXTtcbnZhciBQUk9UT0NPTF9SRUdFWCA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFNcXHNdKikvaTtcbmV4cG9ydCB2YXIgVXJsID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBVcmwodXJsKSB7XG4gICAgdmFyIF90aGlzJGV4dHJhY3RQcm90b2NvbCA9IHRoaXMuZXh0cmFjdFByb3RvY29sKHVybCB8fCAnJyksXG4gICAgICAgIHByb3RvY29sID0gX3RoaXMkZXh0cmFjdFByb3RvY29sLnByb3RvY29sLFxuICAgICAgICBhZGRyZXNzID0gX3RoaXMkZXh0cmFjdFByb3RvY29sLmFkZHJlc3MsXG4gICAgICAgIHNsYXNoZXMgPSBfdGhpcyRleHRyYWN0UHJvdG9jb2wuc2xhc2hlcztcblxuICAgIHZhciByZWxhdGl2ZSA9ICFwcm90b2NvbCAmJiAhc2xhc2hlcztcbiAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgdmFyIGluc3RydWN0aW9ucyA9IFJVTEVTLnNsaWNlKCk7XG4gICAgYWRkcmVzcyA9IGFkZHJlc3MucmVwbGFjZSgnXFxcXCcsICcvJyk7XG5cbiAgICBpZiAoIXNsYXNoZXMpIHtcbiAgICAgIGluc3RydWN0aW9uc1syXSA9IFtOYU4sICdwYXRoJ107XG4gICAgfVxuXG4gICAgdmFyIGluZGV4O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXTtcbiAgICAgIHZhciBwYXJzZSA9IGluc3RydWN0aW9uWzBdO1xuICAgICAgdmFyIGtleSA9IGluc3RydWN0aW9uWzFdO1xuXG4gICAgICBpZiAodHlwZW9mIHBhcnNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbmRleCA9IGFkZHJlc3MuaW5kZXhPZihwYXJzZSk7XG5cbiAgICAgICAgaWYgKH5pbmRleCkge1xuICAgICAgICAgIHZhciBpbnN0TGVuZ3RoID0gaW5zdHJ1Y3Rpb25bMl07XG5cbiAgICAgICAgICBpZiAoaW5zdExlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG5ld0luZGV4ID0gYWRkcmVzcy5sYXN0SW5kZXhPZihwYXJzZSk7XG4gICAgICAgICAgICBpbmRleCA9IE1hdGgubWF4KGluZGV4LCBuZXdJbmRleCk7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKGluZGV4ICsgaW5zdExlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IGFkZHJlc3Muc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1trZXldID0gYWRkcmVzcztcbiAgICAgICAgYWRkcmVzcyA9ICcnO1xuICAgICAgfVxuXG4gICAgICB0aGlzW2tleV0gPSB0aGlzW2tleV0gfHwgKHJlbGF0aXZlICYmIGluc3RydWN0aW9uWzNdID8gbG9jYXRpb25ba2V5XSB8fCAnJyA6ICcnKTtcbiAgICAgIGlmIChpbnN0cnVjdGlvblszXSkgdGhpc1trZXldID0gdGhpc1trZXldLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKHJlbGF0aXZlICYmIHRoaXMucGF0aC5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgICAgdGhpcy5wYXRoID0gJy8nICsgdGhpcy5wYXRoO1xuICAgIH1cblxuICAgIHRoaXMucmVsYXRpdmUgPSByZWxhdGl2ZTtcbiAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2wgfHwgbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdDtcbiAgICB0aGlzLnBvcnQgPSAnJztcblxuICAgIGlmICgvOlxcZCskLy50ZXN0KHRoaXMuaG9zdCkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuaG9zdC5zcGxpdCgnOicpO1xuICAgICAgdmFyIHBvcnQgPSB2YWx1ZS5wb3AoKTtcbiAgICAgIHZhciBob3N0bmFtZSA9IHZhbHVlLmpvaW4oJzonKTtcblxuICAgICAgaWYgKGlzRGVmYXVsdFBvcnQocG9ydCwgdGhpcy5wcm90b2NvbCkpIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdG5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gaG9zdG5hbWU7XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnaW4gPSB0aGlzLnByb3RvY29sICYmIHRoaXMuaG9zdCAmJiB0aGlzLnByb3RvY29sICE9PSAnZmlsZTonID8gdGhpcy5wcm90b2NvbCArICcvLycgKyB0aGlzLmhvc3QgOiAnbnVsbCc7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFVybC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMucHJvdG9jb2w7XG4gICAgcmVzdWx0ICs9ICcvLyc7XG5cbiAgICBpZiAodGhpcy5hdXRoKSB7XG4gICAgICB2YXIgUkVEQUNURUQgPSAnW1JFREFDVEVEXSc7XG4gICAgICB2YXIgdXNlcnBhc3MgPSB0aGlzLmF1dGguc3BsaXQoJzonKTtcbiAgICAgIHZhciB1c2VybmFtZSA9IHVzZXJwYXNzWzBdID8gUkVEQUNURUQgOiAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IHVzZXJwYXNzWzFdID8gJzonICsgUkVEQUNURUQgOiAnJztcbiAgICAgIHJlc3VsdCArPSB1c2VybmFtZSArIHBhc3N3b3JkICsgJ0AnO1xuICAgIH1cblxuICAgIHJlc3VsdCArPSB0aGlzLmhvc3Q7XG4gICAgcmVzdWx0ICs9IHRoaXMucGF0aDtcbiAgICByZXN1bHQgKz0gdGhpcy5xdWVyeTtcbiAgICByZXN1bHQgKz0gdGhpcy5oYXNoO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgX3Byb3RvLmdldExvY2F0aW9uID0gZnVuY3Rpb24gZ2V0TG9jYXRpb24oKSB7XG4gICAgdmFyIGdsb2JhbFZhciA9IHt9O1xuXG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgZ2xvYmFsVmFyID0gd2luZG93O1xuICAgIH1cblxuICAgIHJldHVybiBnbG9iYWxWYXIubG9jYXRpb247XG4gIH07XG5cbiAgX3Byb3RvLmV4dHJhY3RQcm90b2NvbCA9IGZ1bmN0aW9uIGV4dHJhY3RQcm90b2NvbCh1cmwpIHtcbiAgICB2YXIgbWF0Y2ggPSBQUk9UT0NPTF9SRUdFWC5leGVjKHVybCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3RvY29sOiBtYXRjaFsxXSA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiAnJyxcbiAgICAgIHNsYXNoZXM6ICEhbWF0Y2hbMl0sXG4gICAgICBhZGRyZXNzOiBtYXRjaFszXVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIFVybDtcbn0oKTtcbmV4cG9ydCBmdW5jdGlvbiBzbHVnaWZ5VXJsKHVybFN0ciwgZGVwdGgpIHtcbiAgaWYgKGRlcHRoID09PSB2b2lkIDApIHtcbiAgICBkZXB0aCA9IDI7XG4gIH1cblxuICB2YXIgcGFyc2VkVXJsID0gbmV3IFVybCh1cmxTdHIpO1xuICB2YXIgcXVlcnkgPSBwYXJzZWRVcmwucXVlcnksXG4gICAgICBwYXRoID0gcGFyc2VkVXJsLnBhdGg7XG4gIHZhciBwYXRoUGFydHMgPSBwYXRoLnN1YnN0cmluZygxKS5zcGxpdCgnLycpO1xuICB2YXIgcmVkYWN0U3RyaW5nID0gJzppZCc7XG4gIHZhciB3aWxkY2FyZCA9ICcqJztcbiAgdmFyIHNwZWNpYWxDaGFyc1JlZ2V4ID0gL1xcV3xfL2c7XG4gIHZhciBkaWdpdHNSZWdleCA9IC9bMC05XS9nO1xuICB2YXIgbG93ZXJDYXNlUmVnZXggPSAvW2Etel0vZztcbiAgdmFyIHVwcGVyQ2FzZVJlZ2V4ID0gL1tBLVpdL2c7XG4gIHZhciByZWRhY3RlZFBhcnRzID0gW107XG4gIHZhciByZWRhY3RlZEJlZm9yZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBwYXRoUGFydHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIHBhcnQgPSBwYXRoUGFydHNbaW5kZXhdO1xuXG4gICAgaWYgKHJlZGFjdGVkQmVmb3JlIHx8IGluZGV4ID4gZGVwdGggLSAxKSB7XG4gICAgICBpZiAocGFydCkge1xuICAgICAgICByZWRhY3RlZFBhcnRzLnB1c2god2lsZGNhcmQpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgbnVtYmVyT2ZTcGVjaWFsQ2hhcnMgPSAocGFydC5tYXRjaChzcGVjaWFsQ2hhcnNSZWdleCkgfHwgW10pLmxlbmd0aDtcblxuICAgIGlmIChudW1iZXJPZlNwZWNpYWxDaGFycyA+PSAyKSB7XG4gICAgICByZWRhY3RlZFBhcnRzLnB1c2gocmVkYWN0U3RyaW5nKTtcbiAgICAgIHJlZGFjdGVkQmVmb3JlID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBudW1iZXJPZkRpZ2l0cyA9IChwYXJ0Lm1hdGNoKGRpZ2l0c1JlZ2V4KSB8fCBbXSkubGVuZ3RoO1xuXG4gICAgaWYgKG51bWJlck9mRGlnaXRzID4gMyB8fCBwYXJ0Lmxlbmd0aCA+IDMgJiYgbnVtYmVyT2ZEaWdpdHMgLyBwYXJ0Lmxlbmd0aCA+PSAwLjMpIHtcbiAgICAgIHJlZGFjdGVkUGFydHMucHVzaChyZWRhY3RTdHJpbmcpO1xuICAgICAgcmVkYWN0ZWRCZWZvcmUgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIG51bWJlcm9mVXBwZXJDYXNlID0gKHBhcnQubWF0Y2godXBwZXJDYXNlUmVnZXgpIHx8IFtdKS5sZW5ndGg7XG4gICAgdmFyIG51bWJlcm9mTG93ZXJDYXNlID0gKHBhcnQubWF0Y2gobG93ZXJDYXNlUmVnZXgpIHx8IFtdKS5sZW5ndGg7XG4gICAgdmFyIGxvd2VyQ2FzZVJhdGUgPSBudW1iZXJvZkxvd2VyQ2FzZSAvIHBhcnQubGVuZ3RoO1xuICAgIHZhciB1cHBlckNhc2VSYXRlID0gbnVtYmVyb2ZVcHBlckNhc2UgLyBwYXJ0Lmxlbmd0aDtcblxuICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDUgJiYgKHVwcGVyQ2FzZVJhdGUgPiAwLjMgJiYgdXBwZXJDYXNlUmF0ZSA8IDAuNiB8fCBsb3dlckNhc2VSYXRlID4gMC4zICYmIGxvd2VyQ2FzZVJhdGUgPCAwLjYpKSB7XG4gICAgICByZWRhY3RlZFBhcnRzLnB1c2gocmVkYWN0U3RyaW5nKTtcbiAgICAgIHJlZGFjdGVkQmVmb3JlID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHBhcnQgJiYgcmVkYWN0ZWRQYXJ0cy5wdXNoKHBhcnQpO1xuICB9XG5cbiAgdmFyIHJlZGFjdGVkID0gJy8nICsgKHJlZGFjdGVkUGFydHMubGVuZ3RoID49IDIgPyByZWRhY3RlZFBhcnRzLmpvaW4oJy8nKSA6IHJlZGFjdGVkUGFydHMuam9pbignJykpICsgKHF1ZXJ5ID8gJz97cXVlcnl9JyA6ICcnKTtcbiAgcmV0dXJuIHJlZGFjdGVkO1xufSIsImltcG9ydCB7IFByb21pc2UgfSBmcm9tICcuL3BvbHlmaWxscyc7XG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbnZhciBQRVJGID0gaXNCcm93c2VyICYmIHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gJ3VuZGVmaW5lZCcgPyBwZXJmb3JtYW5jZSA6IHt9O1xuXG5mdW5jdGlvbiBpc0NPUlNTdXBwb3J0ZWQoKSB7XG4gIHZhciB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gIHJldHVybiAnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHI7XG59XG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvSGV4KGJ1ZmZlcikge1xuICB2YXIgaGV4T2N0ZXRzID0gW107XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGJ1ZmZlci5sZW5ndGg7IF9pKyspIHtcbiAgICBoZXhPY3RldHMucHVzaChieXRlVG9IZXhbYnVmZmVyW19pXV0pO1xuICB9XG5cbiAgcmV0dXJuIGhleE9jdGV0cy5qb2luKCcnKTtcbn1cblxudmFyIGRlc3RpbmF0aW9uID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuXG5mdW5jdGlvbiBybmcoKSB7XG4gIGlmICh0eXBlb2YgY3J5cHRvICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhkZXN0aW5hdGlvbik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG1zQ3J5cHRvICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbUlkKGxlbmd0aCkge1xuICB2YXIgaWQgPSBieXRlc1RvSGV4KHJuZygpKTtcbiAgcmV0dXJuIGlkLnN1YnN0cigwLCBsZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBnZXREdEhlYWRlclZhbHVlKHNwYW4pIHtcbiAgdmFyIGR0VmVyc2lvbiA9ICcwMCc7XG4gIHZhciBkdFVuU2FtcGxlZEZsYWdzID0gJzAwJztcbiAgdmFyIGR0U2FtcGxlZEZsYWdzID0gJzAxJztcblxuICBpZiAoc3BhbiAmJiBzcGFuLnRyYWNlSWQgJiYgc3Bhbi5pZCAmJiBzcGFuLnBhcmVudElkKSB7XG4gICAgdmFyIGZsYWdzID0gc3Bhbi5zYW1wbGVkID8gZHRTYW1wbGVkRmxhZ3MgOiBkdFVuU2FtcGxlZEZsYWdzO1xuICAgIHZhciBpZCA9IHNwYW4uc2FtcGxlZCA/IHNwYW4uaWQgOiBzcGFuLnBhcmVudElkO1xuICAgIHJldHVybiBkdFZlcnNpb24gKyAnLScgKyBzcGFuLnRyYWNlSWQgKyAnLScgKyBpZCArICctJyArIGZsYWdzO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRHRIZWFkZXJWYWx1ZSh2YWx1ZSkge1xuICB2YXIgcGFyc2VkID0gL14oW1xcZGEtZl17Mn0pLShbXFxkYS1mXXszMn0pLShbXFxkYS1mXXsxNn0pLShbXFxkYS1mXXsyfSkkLy5leGVjKHZhbHVlKTtcblxuICBpZiAocGFyc2VkKSB7XG4gICAgdmFyIGZsYWdzID0gcGFyc2VkWzRdO1xuICAgIHZhciBzYW1wbGVkID0gZmxhZ3MgIT09ICcwMCc7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYWNlSWQ6IHBhcnNlZFsyXSxcbiAgICAgIGlkOiBwYXJzZWRbM10sXG4gICAgICBzYW1wbGVkOiBzYW1wbGVkXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0R0SGVhZGVyVmFsaWQoaGVhZGVyKSB7XG4gIHJldHVybiAvXltcXGRhLWZdezJ9LVtcXGRhLWZdezMyfS1bXFxkYS1mXXsxNn0tW1xcZGEtZl17Mn0kLy50ZXN0KGhlYWRlcikgJiYgaGVhZGVyLnNsaWNlKDMsIDM1KSAhPT0gJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyAmJiBoZWFkZXIuc2xpY2UoMzYsIDUyKSAhPT0gJzAwMDAwMDAwMDAwMDAwMDAnO1xufVxuXG5mdW5jdGlvbiBnZXRUU0hlYWRlclZhbHVlKF9yZWYpIHtcbiAgdmFyIHNhbXBsZVJhdGUgPSBfcmVmLnNhbXBsZVJhdGU7XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGVSYXRlICE9PSAnbnVtYmVyJyB8fCBTdHJpbmcoc2FtcGxlUmF0ZSkubGVuZ3RoID4gMjU2KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIE5BTUVTUEFDRSA9ICdlcyc7XG4gIHZhciBTRVBBUkFUT1IgPSAnPSc7XG4gIHJldHVybiBcIlwiICsgTkFNRVNQQUNFICsgU0VQQVJBVE9SICsgXCJzOlwiICsgc2FtcGxlUmF0ZTtcbn1cblxuZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdGFyZ2V0LnNldFJlcXVlc3RIZWFkZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0YXJnZXQuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodGFyZ2V0LmhlYWRlcnMgJiYgdHlwZW9mIHRhcmdldC5oZWFkZXJzLmFwcGVuZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRhcmdldC5oZWFkZXJzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tTYW1lT3JpZ2luKHNvdXJjZSwgdGFyZ2V0KSB7XG4gIHZhciBpc1NhbWUgPSBmYWxzZTtcblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICBpc1NhbWUgPSBzb3VyY2UgPT09IHRhcmdldDtcbiAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldC50ZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaXNTYW1lID0gdGFyZ2V0LnRlc3Qoc291cmNlKTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICB0YXJnZXQuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgaWYgKCFpc1NhbWUpIHtcbiAgICAgICAgaXNTYW1lID0gY2hlY2tTYW1lT3JpZ2luKHNvdXJjZSwgdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gaXNTYW1lO1xufVxuXG5mdW5jdGlvbiBpc1BsYXRmb3JtU3VwcG9ydGVkKCkge1xuICByZXR1cm4gaXNCcm93c2VyICYmIHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIEpTT04uc3RyaW5naWZ5ID09PSAnZnVuY3Rpb24nICYmIFBFUkYgJiYgdHlwZW9mIFBFUkYubm93ID09PSAnZnVuY3Rpb24nICYmIGlzQ09SU1N1cHBvcnRlZCgpO1xufVxuXG5mdW5jdGlvbiBzZXRMYWJlbChrZXksIHZhbHVlLCBvYmopIHtcbiAgaWYgKCFvYmogfHwgIWtleSkgcmV0dXJuO1xuICB2YXIgc2tleSA9IHJlbW92ZUludmFsaWRDaGFycyhrZXkpO1xuICB2YXIgdmFsdWVUeXBlID0gdHlwZW9mIHZhbHVlO1xuXG4gIGlmICh2YWx1ZSAhPSB1bmRlZmluZWQgJiYgdmFsdWVUeXBlICE9PSAnYm9vbGVhbicgJiYgdmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIG9ialtza2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBnZXRTZXJ2ZXJUaW1pbmdJbmZvKHNlcnZlclRpbWluZ0VudHJpZXMpIHtcbiAgaWYgKHNlcnZlclRpbWluZ0VudHJpZXMgPT09IHZvaWQgMCkge1xuICAgIHNlcnZlclRpbWluZ0VudHJpZXMgPSBbXTtcbiAgfVxuXG4gIHZhciBzZXJ2ZXJUaW1pbmdJbmZvID0gW107XG4gIHZhciBlbnRyeVNlcGFyYXRvciA9ICcsICc7XG4gIHZhciB2YWx1ZVNlcGFyYXRvciA9ICc7JztcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBzZXJ2ZXJUaW1pbmdFbnRyaWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICB2YXIgX3NlcnZlclRpbWluZ0VudHJpZXMkID0gc2VydmVyVGltaW5nRW50cmllc1tfaTJdLFxuICAgICAgICBuYW1lID0gX3NlcnZlclRpbWluZ0VudHJpZXMkLm5hbWUsXG4gICAgICAgIGR1cmF0aW9uID0gX3NlcnZlclRpbWluZ0VudHJpZXMkLmR1cmF0aW9uLFxuICAgICAgICBkZXNjcmlwdGlvbiA9IF9zZXJ2ZXJUaW1pbmdFbnRyaWVzJC5kZXNjcmlwdGlvbjtcbiAgICB2YXIgdGltaW5nVmFsdWUgPSBuYW1lO1xuXG4gICAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgICB0aW1pbmdWYWx1ZSArPSB2YWx1ZVNlcGFyYXRvciArICdkZXNjPScgKyBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgIHRpbWluZ1ZhbHVlICs9IHZhbHVlU2VwYXJhdG9yICsgJ2R1cj0nICsgZHVyYXRpb247XG4gICAgfVxuXG4gICAgc2VydmVyVGltaW5nSW5mby5wdXNoKHRpbWluZ1ZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBzZXJ2ZXJUaW1pbmdJbmZvLmpvaW4oZW50cnlTZXBhcmF0b3IpO1xufVxuXG5mdW5jdGlvbiBnZXRUaW1lT3JpZ2luKCkge1xuICByZXR1cm4gUEVSRi50aW1pbmcuZmV0Y2hTdGFydDtcbn1cblxuZnVuY3Rpb24gc3RyaXBRdWVyeVN0cmluZ0Zyb21VcmwodXJsKSB7XG4gIHJldHVybiB1cmwgJiYgdXJsLnNwbGl0KCc/JylbMF07XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGJhc2VFeHRlbmQoZHN0LCBvYmpzLCBkZWVwKSB7XG4gIGZvciAodmFyIGkgPSAwLCBpaSA9IG9ianMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xuICAgIHZhciBvYmogPSBvYmpzW2ldO1xuICAgIGlmICghaXNPYmplY3Qob2JqKSAmJiAhaXNGdW5jdGlvbihvYmopKSBjb250aW51ZTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgICBmb3IgKHZhciBqID0gMCwgamogPSBrZXlzLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgdmFyIHNyYyA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoZGVlcCAmJiBpc09iamVjdChzcmMpKSB7XG4gICAgICAgIGlmICghaXNPYmplY3QoZHN0W2tleV0pKSBkc3Rba2V5XSA9IEFycmF5LmlzQXJyYXkoc3JjKSA/IFtdIDoge307XG4gICAgICAgIGJhc2VFeHRlbmQoZHN0W2tleV0sIFtzcmNdLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkc3Rba2V5XSA9IHNyYztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZHN0O1xufVxuXG5mdW5jdGlvbiBnZXRFbGFzdGljU2NyaXB0KCkge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzY3JpcHRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIHNjID0gc2NyaXB0c1tpXTtcblxuICAgICAgaWYgKHNjLnNyYy5pbmRleE9mKCdlbGFzdGljJykgPiAwKSB7XG4gICAgICAgIHJldHVybiBzYztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdCgpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgY3VycmVudFNjcmlwdCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG5cbiAgICBpZiAoIWN1cnJlbnRTY3JpcHQpIHtcbiAgICAgIHJldHVybiBnZXRFbGFzdGljU2NyaXB0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICByZXR1cm4gYmFzZUV4dGVuZChPYmplY3QuY3JlYXRlKG51bGwpLCBzbGljZS5jYWxsKGFyZ3VtZW50cyksIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gIHJldHVybiBiYXNlRXh0ZW5kKE9iamVjdC5jcmVhdGUobnVsbCksIHNsaWNlLmNhbGwoYXJndW1lbnRzKSwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgaWYgKGFycmF5ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcnJheSBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgbyA9IE9iamVjdChhcnJheSk7XG4gIHZhciBsZW4gPSBvLmxlbmd0aCA+Pj4gMDtcblxuICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBrID0gMDtcblxuICB3aGlsZSAoayA8IGxlbikge1xuICAgIHZhciBrVmFsdWUgPSBvW2tdO1xuXG4gICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIGtWYWx1ZSwgaywgbykpIHtcbiAgICAgIHJldHVybiBrVmFsdWU7XG4gICAgfVxuXG4gICAgaysrO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSW52YWxpZENoYXJzKGtleSkge1xuICByZXR1cm4ga2V5LnJlcGxhY2UoL1suKlwiXS9nLCAnXycpO1xufVxuXG5mdW5jdGlvbiBnZXRMYXRlc3RTcGFuKHNwYW5zLCB0eXBlRmlsdGVyKSB7XG4gIHZhciBsYXRlc3RTcGFuID0gbnVsbDtcblxuICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBzcGFucy5sZW5ndGg7IF9pMysrKSB7XG4gICAgdmFyIHNwYW4gPSBzcGFuc1tfaTNdO1xuXG4gICAgaWYgKHR5cGVGaWx0ZXIgJiYgdHlwZUZpbHRlcihzcGFuLnR5cGUpICYmICghbGF0ZXN0U3BhbiB8fCBsYXRlc3RTcGFuLl9lbmQgPCBzcGFuLl9lbmQpKSB7XG4gICAgICBsYXRlc3RTcGFuID0gc3BhbjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGF0ZXN0U3Bhbjtcbn1cblxuZnVuY3Rpb24gZ2V0TGF0ZXN0Tm9uWEhSU3BhbihzcGFucykge1xuICByZXR1cm4gZ2V0TGF0ZXN0U3BhbihzcGFucywgZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4gU3RyaW5nKHR5cGUpLmluZGV4T2YoJ2V4dGVybmFsJykgPT09IC0xO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGF0ZXN0WEhSU3BhbihzcGFucykge1xuICByZXR1cm4gZ2V0TGF0ZXN0U3BhbihzcGFucywgZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4gU3RyaW5nKHR5cGUpLmluZGV4T2YoJ2V4dGVybmFsJykgIT09IC0xO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0RWFybGllc3RTcGFuKHNwYW5zKSB7XG4gIHZhciBlYXJsaWVzdFNwYW4gPSBzcGFuc1swXTtcblxuICBmb3IgKHZhciBfaTQgPSAxOyBfaTQgPCBzcGFucy5sZW5ndGg7IF9pNCsrKSB7XG4gICAgdmFyIHNwYW4gPSBzcGFuc1tfaTRdO1xuXG4gICAgaWYgKGVhcmxpZXN0U3Bhbi5fc3RhcnQgPiBzcGFuLl9zdGFydCkge1xuICAgICAgZWFybGllc3RTcGFuID0gc3BhbjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWFybGllc3RTcGFuO1xufVxuXG5mdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBQRVJGLm5vdygpO1xufVxuXG5mdW5jdGlvbiBnZXRUaW1lKHRpbWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aW1lID09PSAnbnVtYmVyJyAmJiB0aW1lID49IDAgPyB0aW1lIDogbm93KCk7XG59XG5cbmZ1bmN0aW9uIGdldER1cmF0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGVuZCkgfHwgaXNVbmRlZmluZWQoc3RhcnQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcGFyc2VJbnQoZW5kIC0gc3RhcnQpO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZU1hY3JvVGFzayhjYWxsYmFjaykge1xuICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVNaWNyb1Rhc2soY2FsbGJhY2spIHtcbiAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIGlzUGVyZlRpbWVsaW5lU3VwcG9ydGVkKCkge1xuICByZXR1cm4gdHlwZW9mIFBFUkYuZ2V0RW50cmllc0J5VHlwZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNQZXJmVHlwZVN1cHBvcnRlZCh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgUGVyZm9ybWFuY2VPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgUGVyZm9ybWFuY2VPYnNlcnZlci5zdXBwb3J0ZWRFbnRyeVR5cGVzICYmIFBlcmZvcm1hbmNlT2JzZXJ2ZXIuc3VwcG9ydGVkRW50cnlUeXBlcy5pbmRleE9mKHR5cGUpID49IDA7XG59XG5cbmZ1bmN0aW9uIGlzUGVyZkludGVyYWN0aW9uQ291bnRTdXBwb3J0ZWQoKSB7XG4gIHJldHVybiAnaW50ZXJhY3Rpb25Db3VudCcgaW4gcGVyZm9ybWFuY2U7XG59XG5cbmZ1bmN0aW9uIGlzQmVhY29uSW5zcGVjdGlvbkVuYWJsZWQoKSB7XG4gIHZhciBmbGFnTmFtZSA9ICdfZWxhc3RpY19pbnNwZWN0X2JlYWNvbl8nO1xuXG4gIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGZsYWdOYW1lKSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoIXdpbmRvdy5VUkwgfHwgIXdpbmRvdy5VUkxTZWFyY2hQYXJhbXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIHZhciBwYXJzZWRVcmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB2YXIgaXNGbGFnU2V0ID0gcGFyc2VkVXJsLnNlYXJjaFBhcmFtcy5oYXMoZmxhZ05hbWUpO1xuXG4gICAgaWYgKGlzRmxhZ1NldCkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShmbGFnTmFtZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzRmxhZ1NldDtcbiAgfSBjYXRjaCAoZSkge31cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzUmVkaXJlY3RJbmZvQXZhaWxhYmxlKHRpbWluZykge1xuICByZXR1cm4gdGltaW5nLnJlZGlyZWN0U3RhcnQgPiAwO1xufVxuXG5leHBvcnQgeyBleHRlbmQsIG1lcmdlLCBpc1VuZGVmaW5lZCwgbm9vcCwgYmFzZUV4dGVuZCwgYnl0ZXNUb0hleCwgaXNDT1JTU3VwcG9ydGVkLCBpc09iamVjdCwgaXNGdW5jdGlvbiwgaXNQbGF0Zm9ybVN1cHBvcnRlZCwgaXNEdEhlYWRlclZhbGlkLCBwYXJzZUR0SGVhZGVyVmFsdWUsIGdldFNlcnZlclRpbWluZ0luZm8sIGdldER0SGVhZGVyVmFsdWUsIGdldFRTSGVhZGVyVmFsdWUsIGdldEN1cnJlbnRTY3JpcHQsIGdldEVsYXN0aWNTY3JpcHQsIGdldFRpbWVPcmlnaW4sIGdlbmVyYXRlUmFuZG9tSWQsIGdldEVhcmxpZXN0U3BhbiwgZ2V0TGF0ZXN0Tm9uWEhSU3BhbiwgZ2V0TGF0ZXN0WEhSU3BhbiwgZ2V0RHVyYXRpb24sIGdldFRpbWUsIG5vdywgcm5nLCBjaGVja1NhbWVPcmlnaW4sIHNjaGVkdWxlTWFjcm9UYXNrLCBzY2hlZHVsZU1pY3JvVGFzaywgc2V0TGFiZWwsIHNldFJlcXVlc3RIZWFkZXIsIHN0cmlwUXVlcnlTdHJpbmdGcm9tVXJsLCBmaW5kLCByZW1vdmVJbnZhbGlkQ2hhcnMsIFBFUkYsIGlzUGVyZlRpbWVsaW5lU3VwcG9ydGVkLCBpc0Jyb3dzZXIsIGlzUGVyZlR5cGVTdXBwb3J0ZWQsIGlzUGVyZkludGVyYWN0aW9uQ291bnRTdXBwb3J0ZWQsIGlzQmVhY29uSW5zcGVjdGlvbkVuYWJsZWQsIGlzUmVkaXJlY3RJbmZvQXZhaWxhYmxlIH07IiwidmFyIF9leGNsdWRlZCA9IFtcInRhZ3NcIl07XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHsgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307IHZhciB0YXJnZXQgPSB7fTsgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyB2YXIga2V5LCBpOyBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykgeyBrZXkgPSBzb3VyY2VLZXlzW2ldOyBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlOyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuaW1wb3J0IHsgY3JlYXRlU3RhY2tUcmFjZXMsIGZpbHRlckludmFsaWRGcmFtZXMgfSBmcm9tICcuL3N0YWNrLXRyYWNlJztcbmltcG9ydCB7IGdlbmVyYXRlUmFuZG9tSWQsIG1lcmdlLCBleHRlbmQsIHNldExhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IGdldFBhZ2VDb250ZXh0IH0gZnJvbSAnLi4vY29tbW9uL2NvbnRleHQnO1xuaW1wb3J0IHsgdHJ1bmNhdGVNb2RlbCwgRVJST1JfTU9ERUwgfSBmcm9tICcuLi9jb21tb24vdHJ1bmNhdGUnO1xuaW1wb3J0IHN0YWNrUGFyc2VyIGZyb20gJ2Vycm9yLXN0YWNrLXBhcnNlcic7XG52YXIgSUdOT1JFX0tFWVMgPSBbJ3N0YWNrJywgJ21lc3NhZ2UnXTtcbnZhciBQUk9NSVNFX1JFSkVDVElPTl9QUkVGSVggPSAnVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uOiAnO1xuXG5mdW5jdGlvbiBnZXRFcnJvclByb3BlcnRpZXMoZXJyb3IpIHtcbiAgdmFyIHByb3BlcnR5Rm91bmQgPSBmYWxzZTtcbiAgdmFyIHByb3BlcnRpZXMgPSB7fTtcbiAgT2JqZWN0LmtleXMoZXJyb3IpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChJR05PUkVfS0VZUy5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB2YWwgPSBlcnJvcltrZXldO1xuXG4gICAgaWYgKHZhbCA9PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsLnRvSVNPU3RyaW5nICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XG4gICAgICB2YWwgPSB2YWwudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0aWVzW2tleV0gPSB2YWw7XG4gICAgcHJvcGVydHlGb3VuZCA9IHRydWU7XG4gIH0pO1xuXG4gIGlmIChwcm9wZXJ0eUZvdW5kKSB7XG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gIH1cbn1cblxudmFyIEVycm9yTG9nZ2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXJyb3JMb2dnaW5nKGFwbVNlcnZlciwgY29uZmlnU2VydmljZSwgdHJhbnNhY3Rpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5fYXBtU2VydmVyID0gYXBtU2VydmVyO1xuICAgIHRoaXMuX2NvbmZpZ1NlcnZpY2UgPSBjb25maWdTZXJ2aWNlO1xuICAgIHRoaXMuX3RyYW5zYWN0aW9uU2VydmljZSA9IHRyYW5zYWN0aW9uU2VydmljZTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBFcnJvckxvZ2dpbmcucHJvdG90eXBlO1xuXG4gIF9wcm90by5jcmVhdGVFcnJvckRhdGFNb2RlbCA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yRGF0YU1vZGVsKGVycm9yRXZlbnQsIG9wdHMpIHtcbiAgICB2YXIgZnJhbWVzID0gY3JlYXRlU3RhY2tUcmFjZXMoc3RhY2tQYXJzZXIsIGVycm9yRXZlbnQpO1xuICAgIHZhciBmaWx0ZXJlZEZyYW1lcyA9IGZpbHRlckludmFsaWRGcmFtZXMoZnJhbWVzKTtcbiAgICB2YXIgY3VscHJpdCA9ICcoaW5saW5lIHNjcmlwdCknO1xuICAgIHZhciBsYXN0RnJhbWUgPSBmaWx0ZXJlZEZyYW1lc1tmaWx0ZXJlZEZyYW1lcy5sZW5ndGggLSAxXTtcblxuICAgIGlmIChsYXN0RnJhbWUgJiYgbGFzdEZyYW1lLmZpbGVuYW1lKSB7XG4gICAgICBjdWxwcml0ID0gbGFzdEZyYW1lLmZpbGVuYW1lO1xuICAgIH1cblxuICAgIHZhciBtZXNzYWdlID0gZXJyb3JFdmVudC5tZXNzYWdlLFxuICAgICAgICBlcnJvciA9IGVycm9yRXZlbnQuZXJyb3I7XG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdmFyIGVycm9yVHlwZSA9ICcnO1xuICAgIHZhciBlcnJvckNvbnRleHQgPSB7fTtcblxuICAgIGlmIChlcnJvciAmJiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgZXJyb3IubWVzc2FnZTtcbiAgICAgIGVycm9yVHlwZSA9IGVycm9yLm5hbWU7XG4gICAgICB2YXIgY3VzdG9tUHJvcGVydGllcyA9IGdldEVycm9yUHJvcGVydGllcyhlcnJvcik7XG5cbiAgICAgIGlmIChjdXN0b21Qcm9wZXJ0aWVzKSB7XG4gICAgICAgIGVycm9yQ29udGV4dC5jdXN0b20gPSBjdXN0b21Qcm9wZXJ0aWVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRzICYmIG9wdHMubGFiZWxzKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdHMubGFiZWxzKTtcbiAgICAgIGVycm9yQ29udGV4dC50YWdzID0ge307XG4gICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuIHNldExhYmVsKGssIG9wdHMubGFiZWxzW2tdLCBlcnJvckNvbnRleHQudGFncyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWVycm9yVHlwZSkge1xuICAgICAgaWYgKGVycm9yTWVzc2FnZSAmJiBlcnJvck1lc3NhZ2UuaW5kZXhPZignOicpID4gLTEpIHtcbiAgICAgICAgZXJyb3JUeXBlID0gZXJyb3JNZXNzYWdlLnNwbGl0KCc6JylbMF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRUcmFuc2FjdGlvbiA9IHRoaXMuX3RyYW5zYWN0aW9uU2VydmljZS5nZXRDdXJyZW50VHJhbnNhY3Rpb24oKTtcblxuICAgIHZhciB0cmFuc2FjdGlvbkNvbnRleHQgPSBjdXJyZW50VHJhbnNhY3Rpb24gPyBjdXJyZW50VHJhbnNhY3Rpb24uY29udGV4dCA6IHt9O1xuXG4gICAgdmFyIF90aGlzJF9jb25maWdTZXJ2aWNlJCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0KCdjb250ZXh0JyksXG4gICAgICAgIHRhZ3MgPSBfdGhpcyRfY29uZmlnU2VydmljZSQudGFncyxcbiAgICAgICAgY29uZmlnQ29udGV4dCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF90aGlzJF9jb25maWdTZXJ2aWNlJCwgX2V4Y2x1ZGVkKTtcblxuICAgIHZhciBwYWdlQ29udGV4dCA9IGdldFBhZ2VDb250ZXh0KCk7XG4gICAgdmFyIGNvbnRleHQgPSBtZXJnZSh7fSwgcGFnZUNvbnRleHQsIHRyYW5zYWN0aW9uQ29udGV4dCwgY29uZmlnQ29udGV4dCwgZXJyb3JDb250ZXh0KTtcbiAgICB2YXIgZXJyb3JPYmplY3QgPSB7XG4gICAgICBpZDogZ2VuZXJhdGVSYW5kb21JZCgpLFxuICAgICAgY3VscHJpdDogY3VscHJpdCxcbiAgICAgIGV4Y2VwdGlvbjoge1xuICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgIHN0YWNrdHJhY2U6IGZpbHRlcmVkRnJhbWVzLFxuICAgICAgICB0eXBlOiBlcnJvclR5cGVcbiAgICAgIH0sXG4gICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgfTtcblxuICAgIGlmIChjdXJyZW50VHJhbnNhY3Rpb24pIHtcbiAgICAgIGVycm9yT2JqZWN0ID0gZXh0ZW5kKGVycm9yT2JqZWN0LCB7XG4gICAgICAgIHRyYWNlX2lkOiBjdXJyZW50VHJhbnNhY3Rpb24udHJhY2VJZCxcbiAgICAgICAgcGFyZW50X2lkOiBjdXJyZW50VHJhbnNhY3Rpb24uaWQsXG4gICAgICAgIHRyYW5zYWN0aW9uX2lkOiBjdXJyZW50VHJhbnNhY3Rpb24uaWQsXG4gICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgdHlwZTogY3VycmVudFRyYW5zYWN0aW9uLnR5cGUsXG4gICAgICAgICAgc2FtcGxlZDogY3VycmVudFRyYW5zYWN0aW9uLnNhbXBsZWRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydW5jYXRlTW9kZWwoRVJST1JfTU9ERUwsIGVycm9yT2JqZWN0KTtcbiAgfTtcblxuICBfcHJvdG8ubG9nRXJyb3JFdmVudCA9IGZ1bmN0aW9uIGxvZ0Vycm9yRXZlbnQoZXJyb3JFdmVudCwgb3B0cykge1xuICAgIGlmICh0eXBlb2YgZXJyb3JFdmVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZXJyb3JPYmplY3QgPSB0aGlzLmNyZWF0ZUVycm9yRGF0YU1vZGVsKGVycm9yRXZlbnQsIG9wdHMpO1xuXG4gICAgaWYgKHR5cGVvZiBlcnJvck9iamVjdC5leGNlcHRpb24ubWVzc2FnZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9hcG1TZXJ2ZXIuYWRkRXJyb3IoZXJyb3JPYmplY3QpO1xuICB9O1xuXG4gIF9wcm90by5yZWdpc3Rlckxpc3RlbmVycyA9IGZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXJzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoZXJyb3JFdmVudCkge1xuICAgICAgcmV0dXJuIF90aGlzLmxvZ0Vycm9yRXZlbnQoZXJyb3JFdmVudCk7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIGZ1bmN0aW9uIChwcm9taXNlUmVqZWN0aW9uRXZlbnQpIHtcbiAgICAgIHJldHVybiBfdGhpcy5sb2dQcm9taXNlRXZlbnQocHJvbWlzZVJlamVjdGlvbkV2ZW50KTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8ubG9nUHJvbWlzZUV2ZW50ID0gZnVuY3Rpb24gbG9nUHJvbWlzZUV2ZW50KHByb21pc2VSZWplY3Rpb25FdmVudCkge1xuICAgIHZhciByZWFzb24gPSBwcm9taXNlUmVqZWN0aW9uRXZlbnQucmVhc29uO1xuXG4gICAgaWYgKHJlYXNvbiA9PSBudWxsKSB7XG4gICAgICByZWFzb24gPSAnPG5vIHJlYXNvbiBzcGVjaWZpZWQ+JztcbiAgICB9XG5cbiAgICB2YXIgZXJyb3JFdmVudDtcblxuICAgIGlmICh0eXBlb2YgcmVhc29uLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgbmFtZSA9IHJlYXNvbi5uYW1lID8gcmVhc29uLm5hbWUgKyAnOiAnIDogJyc7XG4gICAgICBlcnJvckV2ZW50ID0ge1xuICAgICAgICBlcnJvcjogcmVhc29uLFxuICAgICAgICBtZXNzYWdlOiBQUk9NSVNFX1JFSkVDVElPTl9QUkVGSVggKyBuYW1lICsgcmVhc29uLm1lc3NhZ2VcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yRXZlbnQgPSB0aGlzLl9wYXJzZVJlamVjdFJlYXNvbihyZWFzb24pO1xuICAgIH1cblxuICAgIHRoaXMubG9nRXJyb3JFdmVudChlcnJvckV2ZW50KTtcbiAgfTtcblxuICBfcHJvdG8ubG9nRXJyb3IgPSBmdW5jdGlvbiBsb2dFcnJvcihtZXNzYWdlT3JFcnJvciwgb3B0cykge1xuICAgIHZhciBlcnJvckV2ZW50ID0ge307XG5cbiAgICBpZiAodHlwZW9mIG1lc3NhZ2VPckVycm9yID09PSAnc3RyaW5nJykge1xuICAgICAgZXJyb3JFdmVudC5tZXNzYWdlID0gbWVzc2FnZU9yRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yRXZlbnQuZXJyb3IgPSBtZXNzYWdlT3JFcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sb2dFcnJvckV2ZW50KGVycm9yRXZlbnQsIG9wdHMpO1xuICB9O1xuXG4gIF9wcm90by5fcGFyc2VSZWplY3RSZWFzb24gPSBmdW5jdGlvbiBfcGFyc2VSZWplY3RSZWFzb24ocmVhc29uKSB7XG4gICAgdmFyIGVycm9yRXZlbnQgPSB7XG4gICAgICBtZXNzYWdlOiBQUk9NSVNFX1JFSkVDVElPTl9QUkVGSVhcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVhc29uKSkge1xuICAgICAgZXJyb3JFdmVudC5tZXNzYWdlICs9ICc8b2JqZWN0Pic7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVhc29uID09PSAnb2JqZWN0Jykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXJyb3JFdmVudC5tZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KHJlYXNvbik7XG4gICAgICAgIGVycm9yRXZlbnQuZXJyb3IgPSByZWFzb247XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBlcnJvckV2ZW50Lm1lc3NhZ2UgKz0gJzxvYmplY3Q+JztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWFzb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVycm9yRXZlbnQubWVzc2FnZSArPSAnPGZ1bmN0aW9uPic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yRXZlbnQubWVzc2FnZSArPSByZWFzb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yRXZlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIEVycm9yTG9nZ2luZztcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JMb2dnaW5nOyIsImltcG9ydCBFcnJvckxvZ2dpbmcgZnJvbSAnLi9lcnJvci1sb2dnaW5nJztcbmltcG9ydCB7IENPTkZJR19TRVJWSUNFLCBUUkFOU0FDVElPTl9TRVJWSUNFLCBFUlJPUl9MT0dHSU5HLCBBUE1fU0VSVkVSIH0gZnJvbSAnLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBzZXJ2aWNlQ3JlYXRvcnMgfSBmcm9tICcuLi9jb21tb24vc2VydmljZS1mYWN0b3J5JztcblxuZnVuY3Rpb24gcmVnaXN0ZXJTZXJ2aWNlcygpIHtcbiAgc2VydmljZUNyZWF0b3JzW0VSUk9SX0xPR0dJTkddID0gZnVuY3Rpb24gKHNlcnZpY2VGYWN0b3J5KSB7XG4gICAgdmFyIF9zZXJ2aWNlRmFjdG9yeSRnZXRTZSA9IHNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoW0FQTV9TRVJWRVIsIENPTkZJR19TRVJWSUNFLCBUUkFOU0FDVElPTl9TRVJWSUNFXSksXG4gICAgICAgIGFwbVNlcnZlciA9IF9zZXJ2aWNlRmFjdG9yeSRnZXRTZVswXSxcbiAgICAgICAgY29uZmlnU2VydmljZSA9IF9zZXJ2aWNlRmFjdG9yeSRnZXRTZVsxXSxcbiAgICAgICAgdHJhbnNhY3Rpb25TZXJ2aWNlID0gX3NlcnZpY2VGYWN0b3J5JGdldFNlWzJdO1xuXG4gICAgcmV0dXJuIG5ldyBFcnJvckxvZ2dpbmcoYXBtU2VydmVyLCBjb25maWdTZXJ2aWNlLCB0cmFuc2FjdGlvblNlcnZpY2UpO1xuICB9O1xufVxuXG5leHBvcnQgeyByZWdpc3RlclNlcnZpY2VzIH07IiwiZnVuY3Rpb24gZmlsZVBhdGhUb0ZpbGVOYW1lKGZpbGVVcmwpIHtcbiAgdmFyIG9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArICh3aW5kb3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHdpbmRvdy5sb2NhdGlvbi5wb3J0IDogJycpO1xuXG4gIGlmIChmaWxlVXJsLmluZGV4T2Yob3JpZ2luKSA+IC0xKSB7XG4gICAgZmlsZVVybCA9IGZpbGVVcmwucmVwbGFjZShvcmlnaW4gKyAnLycsICcnKTtcbiAgfVxuXG4gIHJldHVybiBmaWxlVXJsO1xufVxuXG5mdW5jdGlvbiBjbGVhbkZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gIGlmIChmaWxlUGF0aCA9PT0gdm9pZCAwKSB7XG4gICAgZmlsZVBhdGggPSAnJztcbiAgfVxuXG4gIGlmIChmaWxlUGF0aCA9PT0gJzxhbm9ueW1vdXM+Jykge1xuICAgIGZpbGVQYXRoID0gJyc7XG4gIH1cblxuICByZXR1cm4gZmlsZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGlzRmlsZUlubGluZShmaWxlVXJsKSB7XG4gIGlmIChmaWxlVXJsKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoZmlsZVVybCkgPT09IDA7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0YWNrRnJhbWVzKHN0YWNrRnJhbWVzKSB7XG4gIHJldHVybiBzdGFja0ZyYW1lcy5tYXAoZnVuY3Rpb24gKGZyYW1lKSB7XG4gICAgaWYgKGZyYW1lLmZ1bmN0aW9uTmFtZSkge1xuICAgICAgZnJhbWUuZnVuY3Rpb25OYW1lID0gbm9ybWFsaXplRnVuY3Rpb25OYW1lKGZyYW1lLmZ1bmN0aW9uTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZyYW1lO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRnVuY3Rpb25OYW1lKGZuTmFtZSkge1xuICB2YXIgcGFydHMgPSBmbk5hbWUuc3BsaXQoJy8nKTtcblxuICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgIGZuTmFtZSA9IFsnT2JqZWN0JywgcGFydHNbcGFydHMubGVuZ3RoIC0gMV1dLmpvaW4oJy4nKTtcbiAgfSBlbHNlIHtcbiAgICBmbk5hbWUgPSBwYXJ0c1swXTtcbiAgfVxuXG4gIGZuTmFtZSA9IGZuTmFtZS5yZXBsYWNlKC8uPCQvZ2ksICcuPGFub255bW91cz4nKTtcbiAgZm5OYW1lID0gZm5OYW1lLnJlcGxhY2UoL15Bbm9ueW1vdXMgZnVuY3Rpb24kLywgJzxhbm9ueW1vdXM+Jyk7XG4gIHBhcnRzID0gZm5OYW1lLnNwbGl0KCcuJyk7XG5cbiAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICBmbk5hbWUgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcbiAgfSBlbHNlIHtcbiAgICBmbk5hbWUgPSBwYXJ0c1swXTtcbiAgfVxuXG4gIHJldHVybiBmbk5hbWU7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRTdGFja1RyYWNlKHN0YWNrVHJhY2VzKSB7XG4gIGlmIChzdGFja1RyYWNlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc3RhY2tUcmFjZXMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIHN0YWNrVHJhY2UgPSBzdGFja1RyYWNlc1swXTtcbiAgICByZXR1cm4gJ2xpbmVOdW1iZXInIGluIHN0YWNrVHJhY2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YWNrVHJhY2VzKHN0YWNrUGFyc2VyLCBlcnJvckV2ZW50KSB7XG4gIHZhciBlcnJvciA9IGVycm9yRXZlbnQuZXJyb3IsXG4gICAgICBmaWxlbmFtZSA9IGVycm9yRXZlbnQuZmlsZW5hbWUsXG4gICAgICBsaW5lbm8gPSBlcnJvckV2ZW50LmxpbmVubyxcbiAgICAgIGNvbG5vID0gZXJyb3JFdmVudC5jb2xubztcbiAgdmFyIHN0YWNrVHJhY2VzID0gW107XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN0YWNrVHJhY2VzID0gc3RhY2tQYXJzZXIucGFyc2UoZXJyb3IpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBpZiAoIWlzVmFsaWRTdGFja1RyYWNlKHN0YWNrVHJhY2VzKSkge1xuICAgIHN0YWNrVHJhY2VzID0gW3tcbiAgICAgIGZpbGVOYW1lOiBmaWxlbmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IGxpbmVubyxcbiAgICAgIGNvbHVtbk51bWJlcjogY29sbm9cbiAgICB9XTtcbiAgfVxuXG4gIHZhciBub3JtYWxpemVkU3RhY2tUcmFjZXMgPSBub3JtYWxpemVTdGFja0ZyYW1lcyhzdGFja1RyYWNlcyk7XG4gIHJldHVybiBub3JtYWxpemVkU3RhY2tUcmFjZXMubWFwKGZ1bmN0aW9uIChzdGFjaykge1xuICAgIHZhciBmaWxlTmFtZSA9IHN0YWNrLmZpbGVOYW1lLFxuICAgICAgICBsaW5lTnVtYmVyID0gc3RhY2subGluZU51bWJlcixcbiAgICAgICAgY29sdW1uTnVtYmVyID0gc3RhY2suY29sdW1uTnVtYmVyLFxuICAgICAgICBfc3RhY2skZnVuY3Rpb25OYW1lID0gc3RhY2suZnVuY3Rpb25OYW1lLFxuICAgICAgICBmdW5jdGlvbk5hbWUgPSBfc3RhY2skZnVuY3Rpb25OYW1lID09PSB2b2lkIDAgPyAnPGFub255bW91cz4nIDogX3N0YWNrJGZ1bmN0aW9uTmFtZTtcblxuICAgIGlmICghZmlsZU5hbWUgJiYgIWxpbmVOdW1iZXIpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbHVtbk51bWJlciAmJiAhbGluZU51bWJlcikge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHZhciBmaWxlUGF0aCA9IGNsZWFuRmlsZVBhdGgoZmlsZU5hbWUpO1xuICAgIHZhciBjbGVhbmVkRmlsZU5hbWUgPSBmaWxlUGF0aFRvRmlsZU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGlzRmlsZUlubGluZShmaWxlUGF0aCkpIHtcbiAgICAgIGNsZWFuZWRGaWxlTmFtZSA9ICcoaW5saW5lIHNjcmlwdCknO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhYnNfcGF0aDogZmlsZU5hbWUsXG4gICAgICBmaWxlbmFtZTogY2xlYW5lZEZpbGVOYW1lLFxuICAgICAgZnVuY3Rpb246IGZ1bmN0aW9uTmFtZSxcbiAgICAgIGxpbmVubzogbGluZU51bWJlcixcbiAgICAgIGNvbG5vOiBjb2x1bW5OdW1iZXJcbiAgICB9O1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJJbnZhbGlkRnJhbWVzKGZyYW1lcykge1xuICByZXR1cm4gZnJhbWVzLmZpbHRlcihmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBmaWxlbmFtZSA9IF9yZWYuZmlsZW5hbWUsXG4gICAgICAgIGxpbmVubyA9IF9yZWYubGluZW5vO1xuICAgIHJldHVybiB0eXBlb2YgZmlsZW5hbWUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBsaW5lbm8gIT09ICd1bmRlZmluZWQnO1xuICB9KTtcbn0iLCJpbXBvcnQgeyByZWdpc3RlclNlcnZpY2VzIGFzIHJlZ2lzdGVyRXJyb3JTZXJ2aWNlcyB9IGZyb20gJy4vZXJyb3ItbG9nZ2luZyc7XG5pbXBvcnQgeyByZWdpc3RlclNlcnZpY2VzIGFzIHJlZ2lzdGVyUGVyZlNlcnZpY2VzLCBvYnNlcnZlVXNlckludGVyYWN0aW9ucyB9IGZyb20gJy4vcGVyZm9ybWFuY2UtbW9uaXRvcmluZyc7XG5pbXBvcnQgeyBTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vY29tbW9uL3NlcnZpY2UtZmFjdG9yeSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU3VwcG9ydGVkLCBzY2hlZHVsZU1pY3JvVGFzaywgc2NoZWR1bGVNYWNyb1Rhc2ssIGlzQnJvd3NlciB9IGZyb20gJy4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IHBhdGNoQWxsLCBwYXRjaEV2ZW50SGFuZGxlciB9IGZyb20gJy4vY29tbW9uL3BhdGNoaW5nJztcbmltcG9ydCB7IG9ic2VydmVQYWdlVmlzaWJpbGl0eSwgb2JzZXJ2ZVBhZ2VDbGlja3MgfSBmcm9tICcuL2NvbW1vbi9vYnNlcnZlcnMnO1xuaW1wb3J0IHsgUEFHRV9MT0FEX0RFTEFZLCBQQUdFX0xPQUQsIEVSUk9SLCBDT05GSUdfU0VSVklDRSwgTE9HR0lOR19TRVJWSUNFLCBUUkFOU0FDVElPTl9TRVJWSUNFLCBBUE1fU0VSVkVSLCBQRVJGT1JNQU5DRV9NT05JVE9SSU5HLCBFUlJPUl9MT0dHSU5HLCBFVkVOVF9UQVJHRVQsIENMSUNLIH0gZnJvbSAnLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEluc3RydW1lbnRhdGlvbkZsYWdzIH0gZnJvbSAnLi9jb21tb24vaW5zdHJ1bWVudCc7XG5pbXBvcnQgYWZ0ZXJGcmFtZSBmcm9tICcuL2NvbW1vbi9hZnRlci1mcmFtZSc7XG5pbXBvcnQgeyBib290c3RyYXAgfSBmcm9tICcuL2Jvb3RzdHJhcCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFjZXIgfSBmcm9tICcuL29wZW50cmFjaW5nJztcblxuZnVuY3Rpb24gY3JlYXRlU2VydmljZUZhY3RvcnkoKSB7XG4gIHJlZ2lzdGVyUGVyZlNlcnZpY2VzKCk7XG4gIHJlZ2lzdGVyRXJyb3JTZXJ2aWNlcygpO1xuICB2YXIgc2VydmljZUZhY3RvcnkgPSBuZXcgU2VydmljZUZhY3RvcnkoKTtcbiAgcmV0dXJuIHNlcnZpY2VGYWN0b3J5O1xufVxuXG5leHBvcnQgeyBjcmVhdGVTZXJ2aWNlRmFjdG9yeSwgU2VydmljZUZhY3RvcnksIHBhdGNoQWxsLCBwYXRjaEV2ZW50SGFuZGxlciwgaXNQbGF0Zm9ybVN1cHBvcnRlZCwgaXNCcm93c2VyLCBnZXRJbnN0cnVtZW50YXRpb25GbGFncywgY3JlYXRlVHJhY2VyLCBzY2hlZHVsZU1pY3JvVGFzaywgc2NoZWR1bGVNYWNyb1Rhc2ssIGFmdGVyRnJhbWUsIEVSUk9SLCBQQUdFX0xPQURfREVMQVksIFBBR0VfTE9BRCwgQ09ORklHX1NFUlZJQ0UsIExPR0dJTkdfU0VSVklDRSwgVFJBTlNBQ1RJT05fU0VSVklDRSwgQVBNX1NFUlZFUiwgUEVSRk9STUFOQ0VfTU9OSVRPUklORywgRVJST1JfTE9HR0lORywgRVZFTlRfVEFSR0VULCBDTElDSywgb2JzZXJ2ZVVzZXJJbnRlcmFjdGlvbnMsIGJvb3RzdHJhcCwgb2JzZXJ2ZVBhZ2VWaXNpYmlsaXR5LCBvYnNlcnZlUGFnZUNsaWNrcyB9OyIsImltcG9ydCBUcmFjZXIgZnJvbSAnLi90cmFjZXInO1xuaW1wb3J0IFNwYW4gZnJvbSAnLi9zcGFuJztcbmltcG9ydCB7IFRSQU5TQUNUSU9OX1NFUlZJQ0UsIExPR0dJTkdfU0VSVklDRSwgUEVSRk9STUFOQ0VfTU9OSVRPUklORywgRVJST1JfTE9HR0lORyB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuXG5mdW5jdGlvbiBjcmVhdGVUcmFjZXIoc2VydmljZUZhY3RvcnkpIHtcbiAgdmFyIHBlcmZvcm1hbmNlTW9uaXRvcmluZyA9IHNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoUEVSRk9STUFOQ0VfTU9OSVRPUklORyk7XG4gIHZhciB0cmFuc2FjdGlvblNlcnZpY2UgPSBzZXJ2aWNlRmFjdG9yeS5nZXRTZXJ2aWNlKFRSQU5TQUNUSU9OX1NFUlZJQ0UpO1xuICB2YXIgZXJyb3JMb2dnaW5nID0gc2VydmljZUZhY3RvcnkuZ2V0U2VydmljZShFUlJPUl9MT0dHSU5HKTtcbiAgdmFyIGxvZ2dpbmdTZXJ2aWNlID0gc2VydmljZUZhY3RvcnkuZ2V0U2VydmljZShMT0dHSU5HX1NFUlZJQ0UpO1xuICByZXR1cm4gbmV3IFRyYWNlcihwZXJmb3JtYW5jZU1vbml0b3JpbmcsIHRyYW5zYWN0aW9uU2VydmljZSwgbG9nZ2luZ1NlcnZpY2UsIGVycm9yTG9nZ2luZyk7XG59XG5cbmV4cG9ydCB7IFNwYW4sIFRyYWNlciwgY3JlYXRlVHJhY2VyIH07IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmltcG9ydCB7IFNwYW4gYXMgb3RTcGFuIH0gZnJvbSAnb3BlbnRyYWNpbmcvbGliL3NwYW4nO1xuaW1wb3J0IHsgZXh0ZW5kLCBnZXRUaW1lT3JpZ2luIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCBUcmFuc2FjdGlvbiBmcm9tICcuLi9wZXJmb3JtYW5jZS1tb25pdG9yaW5nL3RyYW5zYWN0aW9uJztcblxudmFyIFNwYW4gPSBmdW5jdGlvbiAoX290U3Bhbikge1xuICBfaW5oZXJpdHNMb29zZShTcGFuLCBfb3RTcGFuKTtcblxuICBmdW5jdGlvbiBTcGFuKHRyYWNlciwgc3Bhbikge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX290U3Bhbi5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMuX190cmFjZXIgPSB0cmFjZXI7XG4gICAgX3RoaXMuc3BhbiA9IHNwYW47XG4gICAgX3RoaXMuaXNUcmFuc2FjdGlvbiA9IHNwYW4gaW5zdGFuY2VvZiBUcmFuc2FjdGlvbjtcbiAgICBfdGhpcy5zcGFuQ29udGV4dCA9IHtcbiAgICAgIGlkOiBzcGFuLmlkLFxuICAgICAgdHJhY2VJZDogc3Bhbi50cmFjZUlkLFxuICAgICAgc2FtcGxlZDogc3Bhbi5zYW1wbGVkXG4gICAgfTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3Bhbi5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLl9jb250ZXh0ID0gZnVuY3Rpb24gX2NvbnRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BhbkNvbnRleHQ7XG4gIH07XG5cbiAgX3Byb3RvLl90cmFjZXIgPSBmdW5jdGlvbiBfdHJhY2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9fdHJhY2VyO1xuICB9O1xuXG4gIF9wcm90by5fc2V0T3BlcmF0aW9uTmFtZSA9IGZ1bmN0aW9uIF9zZXRPcGVyYXRpb25OYW1lKG5hbWUpIHtcbiAgICB0aGlzLnNwYW4ubmFtZSA9IG5hbWU7XG4gIH07XG5cbiAgX3Byb3RvLl9hZGRUYWdzID0gZnVuY3Rpb24gX2FkZFRhZ3Moa2V5VmFsdWVQYWlycykge1xuICAgIHZhciB0YWdzID0gZXh0ZW5kKHt9LCBrZXlWYWx1ZVBhaXJzKTtcblxuICAgIGlmICh0YWdzLnR5cGUpIHtcbiAgICAgIHRoaXMuc3Bhbi50eXBlID0gdGFncy50eXBlO1xuICAgICAgZGVsZXRlIHRhZ3MudHlwZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1RyYW5zYWN0aW9uKSB7XG4gICAgICB2YXIgdXNlcklkID0gdGFnc1sndXNlci5pZCddO1xuICAgICAgdmFyIHVzZXJuYW1lID0gdGFnc1sndXNlci51c2VybmFtZSddO1xuICAgICAgdmFyIGVtYWlsID0gdGFnc1sndXNlci5lbWFpbCddO1xuXG4gICAgICBpZiAodXNlcklkIHx8IHVzZXJuYW1lIHx8IGVtYWlsKSB7XG4gICAgICAgIHRoaXMuc3Bhbi5hZGRDb250ZXh0KHtcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGVsZXRlIHRhZ3NbJ3VzZXIuaWQnXTtcbiAgICAgICAgZGVsZXRlIHRhZ3NbJ3VzZXIudXNlcm5hbWUnXTtcbiAgICAgICAgZGVsZXRlIHRhZ3NbJ3VzZXIuZW1haWwnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNwYW4uYWRkTGFiZWxzKHRhZ3MpO1xuICB9O1xuXG4gIF9wcm90by5fbG9nID0gZnVuY3Rpb24gX2xvZyhsb2csIHRpbWVzdGFtcCkge1xuICAgIGlmIChsb2cuZXZlbnQgPT09ICdlcnJvcicpIHtcbiAgICAgIGlmIChsb2dbJ2Vycm9yLm9iamVjdCddKSB7XG4gICAgICAgIHRoaXMuX190cmFjZXIuZXJyb3JMb2dnaW5nLmxvZ0Vycm9yKGxvZ1snZXJyb3Iub2JqZWN0J10pO1xuICAgICAgfSBlbHNlIGlmIChsb2cubWVzc2FnZSkge1xuICAgICAgICB0aGlzLl9fdHJhY2VyLmVycm9yTG9nZ2luZy5sb2dFcnJvcihsb2cubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5fZmluaXNoID0gZnVuY3Rpb24gX2ZpbmlzaChmaW5pc2hUaW1lKSB7XG4gICAgdGhpcy5zcGFuLmVuZCgpO1xuXG4gICAgaWYgKGZpbmlzaFRpbWUpIHtcbiAgICAgIHRoaXMuc3Bhbi5fZW5kID0gZmluaXNoVGltZSAtIGdldFRpbWVPcmlnaW4oKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNwYW47XG59KG90U3Bhbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNwYW47IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmltcG9ydCB7IFRyYWNlciBhcyBvdFRyYWNlciB9IGZyb20gJ29wZW50cmFjaW5nL2xpYi90cmFjZXInO1xuaW1wb3J0IHsgUkVGRVJFTkNFX0NISUxEX09GLCBGT1JNQVRfVEVYVF9NQVAsIEZPUk1BVF9IVFRQX0hFQURFUlMsIEZPUk1BVF9CSU5BUlkgfSBmcm9tICdvcGVudHJhY2luZy9saWIvY29uc3RhbnRzJztcbmltcG9ydCB7IFNwYW4gYXMgTm9vcFNwYW4gfSBmcm9tICdvcGVudHJhY2luZy9saWIvc3Bhbic7XG5pbXBvcnQgeyBnZXRUaW1lT3JpZ2luLCBmaW5kIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IF9fREVWX18gfSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQgU3BhbiBmcm9tICcuL3NwYW4nO1xuXG52YXIgVHJhY2VyID0gZnVuY3Rpb24gKF9vdFRyYWNlcikge1xuICBfaW5oZXJpdHNMb29zZShUcmFjZXIsIF9vdFRyYWNlcik7XG5cbiAgZnVuY3Rpb24gVHJhY2VyKHBlcmZvcm1hbmNlTW9uaXRvcmluZywgdHJhbnNhY3Rpb25TZXJ2aWNlLCBsb2dnaW5nU2VydmljZSwgZXJyb3JMb2dnaW5nKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfb3RUcmFjZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLnBlcmZvcm1hbmNlTW9uaXRvcmluZyA9IHBlcmZvcm1hbmNlTW9uaXRvcmluZztcbiAgICBfdGhpcy50cmFuc2FjdGlvblNlcnZpY2UgPSB0cmFuc2FjdGlvblNlcnZpY2U7XG4gICAgX3RoaXMubG9nZ2luZ1NlcnZpY2UgPSBsb2dnaW5nU2VydmljZTtcbiAgICBfdGhpcy5lcnJvckxvZ2dpbmcgPSBlcnJvckxvZ2dpbmc7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFRyYWNlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLl9zdGFydFNwYW4gPSBmdW5jdGlvbiBfc3RhcnRTcGFuKG5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgc3Bhbk9wdGlvbnMgPSB7XG4gICAgICBtYW5hZ2VkOiB0cnVlXG4gICAgfTtcblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBzcGFuT3B0aW9ucy50aW1lc3RhbXAgPSBvcHRpb25zLnN0YXJ0VGltZTtcblxuICAgICAgaWYgKG9wdGlvbnMuY2hpbGRPZikge1xuICAgICAgICBzcGFuT3B0aW9ucy5wYXJlbnRJZCA9IG9wdGlvbnMuY2hpbGRPZi5pZDtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZWZlcmVuY2VzICYmIG9wdGlvbnMucmVmZXJlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKCdFbGFzdGljIEFQTSBPcGVuVHJhY2luZzogVW5zdXBwb3J0ZWQgbnVtYmVyIG9mIHJlZmVyZW5jZXMsIG9ubHkgdGhlIGZpcnN0IGNoaWxkT2YgcmVmZXJlbmNlIHdpbGwgYmUgcmVjb3JkZWQuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoaWxkUmVmID0gZmluZChvcHRpb25zLnJlZmVyZW5jZXMsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICByZXR1cm4gcmVmLnR5cGUoKSA9PT0gUkVGRVJFTkNFX0NISUxEX09GO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2hpbGRSZWYpIHtcbiAgICAgICAgICBzcGFuT3B0aW9ucy5wYXJlbnRJZCA9IGNoaWxkUmVmLnJlZmVyZW5jZWRDb250ZXh0KCkuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3BhbjtcbiAgICB2YXIgY3VycmVudFRyYW5zYWN0aW9uID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZ2V0Q3VycmVudFRyYW5zYWN0aW9uKCk7XG5cbiAgICBpZiAoY3VycmVudFRyYW5zYWN0aW9uKSB7XG4gICAgICBzcGFuID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2Uuc3RhcnRTcGFuKG5hbWUsIHVuZGVmaW5lZCwgc3Bhbk9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGFuID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2Uuc3RhcnRUcmFuc2FjdGlvbihuYW1lLCB1bmRlZmluZWQsIHNwYW5PcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoIXNwYW4pIHtcbiAgICAgIHJldHVybiBuZXcgTm9vcFNwYW4oKTtcbiAgICB9XG5cbiAgICBpZiAoc3Bhbk9wdGlvbnMudGltZXN0YW1wKSB7XG4gICAgICBzcGFuLl9zdGFydCA9IHNwYW5PcHRpb25zLnRpbWVzdGFtcCAtIGdldFRpbWVPcmlnaW4oKTtcbiAgICB9XG5cbiAgICB2YXIgb3RTcGFuID0gbmV3IFNwYW4odGhpcywgc3Bhbik7XG5cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnRhZ3MpIHtcbiAgICAgIG90U3Bhbi5hZGRUYWdzKG9wdGlvbnMudGFncyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG90U3BhbjtcbiAgfTtcblxuICBfcHJvdG8uX2luamVjdCA9IGZ1bmN0aW9uIF9pbmplY3Qoc3BhbkNvbnRleHQsIGZvcm1hdCwgY2Fycmllcikge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICBjYXNlIEZPUk1BVF9URVhUX01BUDpcbiAgICAgIGNhc2UgRk9STUFUX0hUVFBfSEVBREVSUzpcbiAgICAgICAgdGhpcy5wZXJmb3JtYW5jZU1vbml0b3JpbmcuaW5qZWN0RHRIZWFkZXIoc3BhbkNvbnRleHQsIGNhcnJpZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBGT1JNQVRfQklOQVJZOlxuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ0VsYXN0aWMgQVBNIE9wZW5UcmFjaW5nOiBiaW5hcnkgY2FycmllciBmb3JtYXQgaXMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3QgPSBmdW5jdGlvbiBfZXh0cmFjdChmb3JtYXQsIGNhcnJpZXIpIHtcbiAgICB2YXIgY3R4O1xuXG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgRk9STUFUX1RFWFRfTUFQOlxuICAgICAgY2FzZSBGT1JNQVRfSFRUUF9IRUFERVJTOlxuICAgICAgICBjdHggPSB0aGlzLnBlcmZvcm1hbmNlTW9uaXRvcmluZy5leHRyYWN0RHRIZWFkZXIoY2Fycmllcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEZPUk1BVF9CSU5BUlk6XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnRWxhc3RpYyBBUE0gT3BlblRyYWNpbmc6IGJpbmFyeSBjYXJyaWVyIGZvcm1hdCBpcyBub3Qgc3VwcG9ydGVkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCFjdHgpIHtcbiAgICAgIGN0eCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN0eDtcbiAgfTtcblxuICByZXR1cm4gVHJhY2VyO1xufShvdFRyYWNlcik7XG5cbmV4cG9ydCBkZWZhdWx0IFRyYWNlcjsiLCJpbXBvcnQgeyBnZXREdXJhdGlvbiwgUEVSRiB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBQQUdFX0xPQUQsIFRSVU5DQVRFRF9UWVBFIH0gZnJvbSAnLi4vY29tbW9uL2NvbnN0YW50cyc7XG52YXIgcGFnZUxvYWRCcmVha2Rvd25zID0gW1snZG9tYWluTG9va3VwU3RhcnQnLCAnZG9tYWluTG9va3VwRW5kJywgJ0ROUyddLCBbJ2Nvbm5lY3RTdGFydCcsICdjb25uZWN0RW5kJywgJ1RDUCddLCBbJ3JlcXVlc3RTdGFydCcsICdyZXNwb25zZVN0YXJ0JywgJ1JlcXVlc3QnXSwgWydyZXNwb25zZVN0YXJ0JywgJ3Jlc3BvbnNlRW5kJywgJ1Jlc3BvbnNlJ10sIFsnZG9tTG9hZGluZycsICdkb21Db21wbGV0ZScsICdQcm9jZXNzaW5nJ10sIFsnbG9hZEV2ZW50U3RhcnQnLCAnbG9hZEV2ZW50RW5kJywgJ0xvYWQnXV07XG5cbmZ1bmN0aW9uIGdldFZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNlbGZUaW1lKHRyYW5zYWN0aW9uKSB7XG4gIHZhciBzcGFucyA9IHRyYW5zYWN0aW9uLnNwYW5zLFxuICAgICAgX3N0YXJ0ID0gdHJhbnNhY3Rpb24uX3N0YXJ0LFxuICAgICAgX2VuZCA9IHRyYW5zYWN0aW9uLl9lbmQ7XG5cbiAgaWYgKHNwYW5zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cmFuc2FjdGlvbi5kdXJhdGlvbigpO1xuICB9XG5cbiAgc3BhbnMuc29ydChmdW5jdGlvbiAoc3BhbjEsIHNwYW4yKSB7XG4gICAgcmV0dXJuIHNwYW4xLl9zdGFydCAtIHNwYW4yLl9zdGFydDtcbiAgfSk7XG4gIHZhciBzcGFuID0gc3BhbnNbMF07XG4gIHZhciBzcGFuRW5kID0gc3Bhbi5fZW5kO1xuICB2YXIgc3BhblN0YXJ0ID0gc3Bhbi5fc3RhcnQ7XG4gIHZhciBsYXN0Q29udGludW91c0VuZCA9IHNwYW5FbmQ7XG4gIHZhciBzZWxmVGltZSA9IHNwYW5TdGFydCAtIF9zdGFydDtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IHNwYW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgc3BhbiA9IHNwYW5zW2ldO1xuICAgIHNwYW5TdGFydCA9IHNwYW4uX3N0YXJ0O1xuICAgIHNwYW5FbmQgPSBzcGFuLl9lbmQ7XG5cbiAgICBpZiAoc3BhblN0YXJ0ID4gbGFzdENvbnRpbnVvdXNFbmQpIHtcbiAgICAgIHNlbGZUaW1lICs9IHNwYW5TdGFydCAtIGxhc3RDb250aW51b3VzRW5kO1xuICAgICAgbGFzdENvbnRpbnVvdXNFbmQgPSBzcGFuRW5kO1xuICAgIH0gZWxzZSBpZiAoc3BhbkVuZCA+IGxhc3RDb250aW51b3VzRW5kKSB7XG4gICAgICBsYXN0Q29udGludW91c0VuZCA9IHNwYW5FbmQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxhc3RDb250aW51b3VzRW5kIDwgX2VuZCkge1xuICAgIHNlbGZUaW1lICs9IF9lbmQgLSBsYXN0Q29udGludW91c0VuZDtcbiAgfVxuXG4gIHJldHVybiBzZWxmVGltZTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBTcGFucyh0cmFuc2FjdGlvbikge1xuICB2YXIgc3Bhbk1hcCA9IHt9O1xuICB2YXIgdHJhbnNhY3Rpb25TZWxmVGltZSA9IGNhbGN1bGF0ZVNlbGZUaW1lKHRyYW5zYWN0aW9uKTtcbiAgc3Bhbk1hcFsnYXBwJ10gPSB7XG4gICAgY291bnQ6IDEsXG4gICAgZHVyYXRpb246IHRyYW5zYWN0aW9uU2VsZlRpbWVcbiAgfTtcbiAgdmFyIHNwYW5zID0gdHJhbnNhY3Rpb24uc3BhbnM7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGFucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzcGFuID0gc3BhbnNbaV07XG4gICAgdmFyIGR1cmF0aW9uID0gc3Bhbi5kdXJhdGlvbigpO1xuXG4gICAgaWYgKGR1cmF0aW9uID09PSAwIHx8IGR1cmF0aW9uID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gc3Bhbi50eXBlLFxuICAgICAgICBzdWJ0eXBlID0gc3Bhbi5zdWJ0eXBlO1xuICAgIHZhciBrZXkgPSB0eXBlLnJlcGxhY2UoVFJVTkNBVEVEX1RZUEUsICcnKTtcblxuICAgIGlmIChzdWJ0eXBlKSB7XG4gICAgICBrZXkgKz0gJy4nICsgc3VidHlwZTtcbiAgICB9XG5cbiAgICBpZiAoIXNwYW5NYXBba2V5XSkge1xuICAgICAgc3Bhbk1hcFtrZXldID0ge1xuICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgY291bnQ6IDBcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3Bhbk1hcFtrZXldLmNvdW50Kys7XG4gICAgc3Bhbk1hcFtrZXldLmR1cmF0aW9uICs9IGR1cmF0aW9uO1xuICB9XG5cbiAgcmV0dXJuIHNwYW5NYXA7XG59XG5cbmZ1bmN0aW9uIGdldFNwYW5CcmVha2Rvd24odHJhbnNhY3Rpb25EZXRhaWxzLCBfcmVmKSB7XG4gIHZhciBkZXRhaWxzID0gX3JlZi5kZXRhaWxzLFxuICAgICAgX3JlZiRjb3VudCA9IF9yZWYuY291bnQsXG4gICAgICBjb3VudCA9IF9yZWYkY291bnQgPT09IHZvaWQgMCA/IDEgOiBfcmVmJGNvdW50LFxuICAgICAgZHVyYXRpb24gPSBfcmVmLmR1cmF0aW9uO1xuICByZXR1cm4ge1xuICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvbkRldGFpbHMsXG4gICAgc3BhbjogZGV0YWlscyxcbiAgICBzYW1wbGVzOiB7XG4gICAgICAnc3Bhbi5zZWxmX3RpbWUuY291bnQnOiBnZXRWYWx1ZShjb3VudCksXG4gICAgICAnc3Bhbi5zZWxmX3RpbWUuc3VtLnVzJzogZ2V0VmFsdWUoZHVyYXRpb24gKiAxMDAwKVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVCcmVha2Rvd24odHJhbnNhY3Rpb24sIHRpbWluZ3MpIHtcbiAgaWYgKHRpbWluZ3MgPT09IHZvaWQgMCkge1xuICAgIHRpbWluZ3MgPSBQRVJGLnRpbWluZztcbiAgfVxuXG4gIHZhciBicmVha2Rvd25zID0gW107XG4gIHZhciBuYW1lID0gdHJhbnNhY3Rpb24ubmFtZSxcbiAgICAgIHR5cGUgPSB0cmFuc2FjdGlvbi50eXBlLFxuICAgICAgc2FtcGxlZCA9IHRyYW5zYWN0aW9uLnNhbXBsZWQ7XG4gIHZhciB0cmFuc2FjdGlvbkRldGFpbHMgPSB7XG4gICAgbmFtZTogbmFtZSxcbiAgICB0eXBlOiB0eXBlXG4gIH07XG5cbiAgaWYgKCFzYW1wbGVkKSB7XG4gICAgcmV0dXJuIGJyZWFrZG93bnM7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gUEFHRV9MT0FEICYmIHRpbWluZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZ2VMb2FkQnJlYWtkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBwYWdlTG9hZEJyZWFrZG93bnNbaV07XG4gICAgICB2YXIgc3RhcnQgPSB0aW1pbmdzW2N1cnJlbnRbMF1dO1xuICAgICAgdmFyIGVuZCA9IHRpbWluZ3NbY3VycmVudFsxXV07XG4gICAgICB2YXIgZHVyYXRpb24gPSBnZXREdXJhdGlvbihzdGFydCwgZW5kKTtcblxuICAgICAgaWYgKGR1cmF0aW9uID09PSAwIHx8IGR1cmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrZG93bnMucHVzaChnZXRTcGFuQnJlYWtkb3duKHRyYW5zYWN0aW9uRGV0YWlscywge1xuICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgdHlwZTogY3VycmVudFsyXVxuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgIH0pKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNwYW5NYXAgPSBncm91cFNwYW5zKHRyYW5zYWN0aW9uKTtcbiAgICBPYmplY3Qua2V5cyhzcGFuTWFwKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBfa2V5JHNwbGl0ID0ga2V5LnNwbGl0KCcuJyksXG4gICAgICAgICAgdHlwZSA9IF9rZXkkc3BsaXRbMF0sXG4gICAgICAgICAgc3VidHlwZSA9IF9rZXkkc3BsaXRbMV07XG5cbiAgICAgIHZhciBfc3Bhbk1hcCRrZXkgPSBzcGFuTWFwW2tleV0sXG4gICAgICAgICAgZHVyYXRpb24gPSBfc3Bhbk1hcCRrZXkuZHVyYXRpb24sXG4gICAgICAgICAgY291bnQgPSBfc3Bhbk1hcCRrZXkuY291bnQ7XG4gICAgICBicmVha2Rvd25zLnB1c2goZ2V0U3BhbkJyZWFrZG93bih0cmFuc2FjdGlvbkRldGFpbHMsIHtcbiAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgc3VidHlwZTogc3VidHlwZVxuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIGNvdW50OiBjb3VudFxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGJyZWFrZG93bnM7XG59IiwiaW1wb3J0IFBlcmZvcm1hbmNlTW9uaXRvcmluZyBmcm9tICcuL3BlcmZvcm1hbmNlLW1vbml0b3JpbmcnO1xuaW1wb3J0IFRyYW5zYWN0aW9uU2VydmljZSBmcm9tICcuL3RyYW5zYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgQVBNX1NFUlZFUiwgQ09ORklHX1NFUlZJQ0UsIExPR0dJTkdfU0VSVklDRSwgVFJBTlNBQ1RJT05fU0VSVklDRSwgUEVSRk9STUFOQ0VfTU9OSVRPUklORyB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgc2VydmljZUNyZWF0b3JzIH0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2UtZmFjdG9yeSc7XG5pbXBvcnQgeyBvYnNlcnZlVXNlckludGVyYWN0aW9ucyB9IGZyb20gJy4vbWV0cmljcy9pbnAvcHJvY2Vzcyc7XG5pbXBvcnQgeyByZXBvcnRJbnAgfSBmcm9tICcuL21ldHJpY3MvaW5wL3JlcG9ydCc7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyU2VydmljZXMoKSB7XG4gIHNlcnZpY2VDcmVhdG9yc1tUUkFOU0FDVElPTl9TRVJWSUNFXSA9IGZ1bmN0aW9uIChzZXJ2aWNlRmFjdG9yeSkge1xuICAgIHZhciBfc2VydmljZUZhY3RvcnkkZ2V0U2UgPSBzZXJ2aWNlRmFjdG9yeS5nZXRTZXJ2aWNlKFtMT0dHSU5HX1NFUlZJQ0UsIENPTkZJR19TRVJWSUNFXSksXG4gICAgICAgIGxvZ2dpbmdTZXJ2aWNlID0gX3NlcnZpY2VGYWN0b3J5JGdldFNlWzBdLFxuICAgICAgICBjb25maWdTZXJ2aWNlID0gX3NlcnZpY2VGYWN0b3J5JGdldFNlWzFdO1xuXG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvblNlcnZpY2UobG9nZ2luZ1NlcnZpY2UsIGNvbmZpZ1NlcnZpY2UpO1xuICB9O1xuXG4gIHNlcnZpY2VDcmVhdG9yc1tQRVJGT1JNQU5DRV9NT05JVE9SSU5HXSA9IGZ1bmN0aW9uIChzZXJ2aWNlRmFjdG9yeSkge1xuICAgIHZhciBfc2VydmljZUZhY3RvcnkkZ2V0U2UyID0gc2VydmljZUZhY3RvcnkuZ2V0U2VydmljZShbQVBNX1NFUlZFUiwgQ09ORklHX1NFUlZJQ0UsIExPR0dJTkdfU0VSVklDRSwgVFJBTlNBQ1RJT05fU0VSVklDRV0pLFxuICAgICAgICBhcG1TZXJ2ZXIgPSBfc2VydmljZUZhY3RvcnkkZ2V0U2UyWzBdLFxuICAgICAgICBjb25maWdTZXJ2aWNlID0gX3NlcnZpY2VGYWN0b3J5JGdldFNlMlsxXSxcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2UgPSBfc2VydmljZUZhY3RvcnkkZ2V0U2UyWzJdLFxuICAgICAgICB0cmFuc2FjdGlvblNlcnZpY2UgPSBfc2VydmljZUZhY3RvcnkkZ2V0U2UyWzNdO1xuXG4gICAgcmV0dXJuIG5ldyBQZXJmb3JtYW5jZU1vbml0b3JpbmcoYXBtU2VydmVyLCBjb25maWdTZXJ2aWNlLCBsb2dnaW5nU2VydmljZSwgdHJhbnNhY3Rpb25TZXJ2aWNlKTtcbiAgfTtcbn1cblxuZXhwb3J0IHsgcmVnaXN0ZXJTZXJ2aWNlcywgb2JzZXJ2ZVVzZXJJbnRlcmFjdGlvbnMsIHJlcG9ydElucCB9OyIsImltcG9ydCB7IEVWRU5ULCBGSVJTVF9JTlBVVCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgaXNQZXJmSW50ZXJhY3Rpb25Db3VudFN1cHBvcnRlZCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBQZXJmRW50cnlSZWNvcmRlciB9IGZyb20gJy4uL21ldHJpY3MnO1xudmFyIElOUF9USFJFU0hPTEQgPSA0MDtcbnZhciBNQVhfSU5URVJBQ1RJT05TX1RPX0NPTlNJREVSID0gMTA7XG5leHBvcnQgdmFyIGlucFN0YXRlID0ge1xuICBtaW5JbnRlcmFjdGlvbklkOiBJbmZpbml0eSxcbiAgbWF4SW50ZXJhY3Rpb25JZDogMCxcbiAgaW50ZXJhY3Rpb25Db3VudDogMCxcbiAgbG9uZ2VzdEludGVyYWN0aW9uczogW11cbn07XG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZVVzZXJJbnRlcmFjdGlvbnMocmVjb3JkZXIpIHtcbiAgaWYgKHJlY29yZGVyID09PSB2b2lkIDApIHtcbiAgICByZWNvcmRlciA9IG5ldyBQZXJmRW50cnlSZWNvcmRlcihwcm9jZXNzVXNlckludGVyYWN0aW9ucyk7XG4gIH1cblxuICB2YXIgaXNQZXJmQ291bnRTdXBwb3J0ZWQgPSBpc1BlcmZJbnRlcmFjdGlvbkNvdW50U3VwcG9ydGVkKCk7XG4gIHZhciBkdXJhdGlvblRocmVzaG9sZCA9IGlzUGVyZkNvdW50U3VwcG9ydGVkID8gSU5QX1RIUkVTSE9MRCA6IDE2O1xuICByZWNvcmRlci5zdGFydChFVkVOVCwge1xuICAgIGJ1ZmZlcmVkOiB0cnVlLFxuICAgIGR1cmF0aW9uVGhyZXNob2xkOiBkdXJhdGlvblRocmVzaG9sZFxuICB9KTtcblxuICBpZiAoIWlzUGVyZkNvdW50U3VwcG9ydGVkKSB7XG4gICAgcmVjb3JkZXIuc3RhcnQoRklSU1RfSU5QVVQpO1xuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1VzZXJJbnRlcmFjdGlvbnMobGlzdCkge1xuICB2YXIgZW50cmllcyA9IGxpc3QuZ2V0RW50cmllcygpO1xuICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgaWYgKCFlbnRyeS5pbnRlcmFjdGlvbklkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdXBkYXRlSW50ZXJhY3Rpb25Db3VudChlbnRyeSk7XG5cbiAgICBpZiAoZW50cnkuZHVyYXRpb24gPCBJTlBfVEhSRVNIT0xEKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RvcmVVc2VySW50ZXJhY3Rpb24oZW50cnkpO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVJbnAoKSB7XG4gIGlmIChpbnBTdGF0ZS5sb25nZXN0SW50ZXJhY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpbnRlcmFjdGlvbkNvdW50KCkgPiAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaW50ZXJhY3Rpb25JbmRleCA9IE1hdGgubWluKGlucFN0YXRlLmxvbmdlc3RJbnRlcmFjdGlvbnMubGVuZ3RoIC0gMSwgTWF0aC5mbG9vcihpbnRlcmFjdGlvbkNvdW50KCkgLyA1MCkpO1xuICB2YXIgaW5wID0gaW5wU3RhdGUubG9uZ2VzdEludGVyYWN0aW9uc1tpbnRlcmFjdGlvbkluZGV4XS5kdXJhdGlvbjtcbiAgcmV0dXJuIGlucDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcmFjdGlvbkNvdW50KCkge1xuICByZXR1cm4gcGVyZm9ybWFuY2UuaW50ZXJhY3Rpb25Db3VudCB8fCBpbnBTdGF0ZS5pbnRlcmFjdGlvbkNvdW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVJTlBTdGF0ZSgpIHtcbiAgaW5wU3RhdGUubWluSW50ZXJhY3Rpb25JZCA9IEluZmluaXR5O1xuICBpbnBTdGF0ZS5tYXhJbnRlcmFjdGlvbklkID0gMDtcbiAgaW5wU3RhdGUuaW50ZXJhY3Rpb25Db3VudCA9IDA7XG4gIGlucFN0YXRlLmxvbmdlc3RJbnRlcmFjdGlvbnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gc3RvcmVVc2VySW50ZXJhY3Rpb24oZW50cnkpIHtcbiAgdmFyIGxlYXN0U2xvdyA9IGlucFN0YXRlLmxvbmdlc3RJbnRlcmFjdGlvbnNbaW5wU3RhdGUubG9uZ2VzdEludGVyYWN0aW9ucy5sZW5ndGggLSAxXTtcblxuICBpZiAodHlwZW9mIGxlYXN0U2xvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgZW50cnkuZHVyYXRpb24gPD0gbGVhc3RTbG93LmR1cmF0aW9uICYmIGVudHJ5LmludGVyYWN0aW9uSWQgIT0gbGVhc3RTbG93LmlkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGZpbHRlcmVkSW50ZXJhY3Rpb24gPSBpbnBTdGF0ZS5sb25nZXN0SW50ZXJhY3Rpb25zLmZpbHRlcihmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICByZXR1cm4gaW50ZXJhY3Rpb24uaWQgPT09IGVudHJ5LmludGVyYWN0aW9uSWQ7XG4gIH0pO1xuXG4gIGlmIChmaWx0ZXJlZEludGVyYWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgZm91bmRJbnRlcmFjdGlvbiA9IGZpbHRlcmVkSW50ZXJhY3Rpb25bMF07XG4gICAgZm91bmRJbnRlcmFjdGlvbi5kdXJhdGlvbiA9IE1hdGgubWF4KGZvdW5kSW50ZXJhY3Rpb24uZHVyYXRpb24sIGVudHJ5LmR1cmF0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICBpbnBTdGF0ZS5sb25nZXN0SW50ZXJhY3Rpb25zLnB1c2goe1xuICAgICAgaWQ6IGVudHJ5LmludGVyYWN0aW9uSWQsXG4gICAgICBkdXJhdGlvbjogZW50cnkuZHVyYXRpb25cbiAgICB9KTtcbiAgfVxuXG4gIGlucFN0YXRlLmxvbmdlc3RJbnRlcmFjdGlvbnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBiLmR1cmF0aW9uIC0gYS5kdXJhdGlvbjtcbiAgfSk7XG4gIGlucFN0YXRlLmxvbmdlc3RJbnRlcmFjdGlvbnMuc3BsaWNlKE1BWF9JTlRFUkFDVElPTlNfVE9fQ09OU0lERVIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbnRlcmFjdGlvbkNvdW50KGVudHJ5KSB7XG4gIGlmIChpc1BlcmZJbnRlcmFjdGlvbkNvdW50U3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpbnBTdGF0ZS5taW5JbnRlcmFjdGlvbklkID0gTWF0aC5taW4oaW5wU3RhdGUubWluSW50ZXJhY3Rpb25JZCwgZW50cnkuaW50ZXJhY3Rpb25JZCk7XG4gIGlucFN0YXRlLm1heEludGVyYWN0aW9uSWQgPSBNYXRoLm1heChpbnBTdGF0ZS5tYXhJbnRlcmFjdGlvbklkLCBlbnRyeS5pbnRlcmFjdGlvbklkKTtcbiAgaW5wU3RhdGUuaW50ZXJhY3Rpb25Db3VudCA9IChpbnBTdGF0ZS5tYXhJbnRlcmFjdGlvbklkIC0gaW5wU3RhdGUubWluSW50ZXJhY3Rpb25JZCkgLyA3ICsgMTtcbn0iLCJpbXBvcnQgeyBjYWxjdWxhdGVJbnAsIHJlc3RvcmVJTlBTdGF0ZSB9IGZyb20gJy4vcHJvY2Vzcyc7XG5pbXBvcnQgeyBub3cgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgUEFHRV9FWElUIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbnN0YW50cyc7XG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0SW5wKHRyYW5zYWN0aW9uU2VydmljZSkge1xuICB2YXIgaW5wID0gY2FsY3VsYXRlSW5wKCk7XG5cbiAgaWYgKGlucCA+PSAwKSB7XG4gICAgdmFyIHN0YXJ0VGltZSA9IG5vdygpO1xuICAgIHZhciBpbnBUciA9IHRyYW5zYWN0aW9uU2VydmljZS5zdGFydFRyYW5zYWN0aW9uKFBBR0VfRVhJVCwgUEFHRV9FWElULCB7XG4gICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZVxuICAgIH0pO1xuICAgIHZhciBuYXZpZ2F0aW9ucyA9IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoJ25hdmlnYXRpb24nKTtcblxuICAgIGlmIChuYXZpZ2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgaGFyZE5hdmlnYXRpb25VcmwgPSBuYXZpZ2F0aW9uc1swXS5uYW1lO1xuICAgICAgaW5wVHIuYWRkQ29udGV4dCh7XG4gICAgICAgIHBhZ2U6IHtcbiAgICAgICAgICB1cmw6IGhhcmROYXZpZ2F0aW9uVXJsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlucFRyLmFkZExhYmVscyh7XG4gICAgICBpbnBfdmFsdWU6IGlucFxuICAgIH0pO1xuICAgIHZhciBlbmRUaW1lID0gc3RhcnRUaW1lICsgaW5wICsgMTtcbiAgICBpbnBUci5lbmQoZW5kVGltZSk7XG4gICAgcmVzdG9yZUlOUFN0YXRlKCk7XG4gICAgcmV0dXJuIGlucFRyO1xuICB9XG59IiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cblxuaW1wb3J0IHsgTE9OR19UQVNLLCBMQVJHRVNUX0NPTlRFTlRGVUxfUEFJTlQsIEZJUlNUX0NPTlRFTlRGVUxfUEFJTlQsIEZJUlNUX0lOUFVULCBMQVlPVVRfU0hJRlQgfSBmcm9tICcuLi8uLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCB7IG5vb3AsIFBFUkYsIGlzUGVyZlR5cGVTdXBwb3J0ZWQsIGlzUmVkaXJlY3RJbmZvQXZhaWxhYmxlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCBTcGFuIGZyb20gJy4uL3NwYW4nO1xuZXhwb3J0IHZhciBtZXRyaWNzID0ge1xuICBmaWQ6IDAsXG4gIGZjcDogMCxcbiAgdGJ0OiB7XG4gICAgc3RhcnQ6IEluZmluaXR5LFxuICAgIGR1cmF0aW9uOiAwXG4gIH0sXG4gIGNsczoge1xuICAgIHNjb3JlOiAwLFxuICAgIGZpcnN0RW50cnlUaW1lOiBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFksXG4gICAgcHJldkVudHJ5VGltZTogTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZLFxuICAgIGN1cnJlbnRTZXNzaW9uU2NvcmU6IDBcbiAgfSxcbiAgbG9uZ3Rhc2s6IHtcbiAgICBjb3VudDogMCxcbiAgICBkdXJhdGlvbjogMCxcbiAgICBtYXg6IDBcbiAgfVxufTtcbnZhciBMT05HX1RBU0tfVEhSRVNIT0xEID0gNTA7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9uZ1Rhc2tTcGFucyhsb25ndGFza3MsIGFnZykge1xuICB2YXIgc3BhbnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxvbmd0YXNrcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfbG9uZ3Rhc2tzJGkgPSBsb25ndGFza3NbaV0sXG4gICAgICAgIG5hbWUgPSBfbG9uZ3Rhc2tzJGkubmFtZSxcbiAgICAgICAgc3RhcnRUaW1lID0gX2xvbmd0YXNrcyRpLnN0YXJ0VGltZSxcbiAgICAgICAgZHVyYXRpb24gPSBfbG9uZ3Rhc2tzJGkuZHVyYXRpb24sXG4gICAgICAgIGF0dHJpYnV0aW9uID0gX2xvbmd0YXNrcyRpLmF0dHJpYnV0aW9uO1xuICAgIHZhciBlbmQgPSBzdGFydFRpbWUgKyBkdXJhdGlvbjtcbiAgICB2YXIgc3BhbiA9IG5ldyBTcGFuKFwiTG9uZ3Rhc2soXCIgKyBuYW1lICsgXCIpXCIsIExPTkdfVEFTSywge1xuICAgICAgc3RhcnRUaW1lOiBzdGFydFRpbWVcbiAgICB9KTtcbiAgICBhZ2cuY291bnQrKztcbiAgICBhZ2cuZHVyYXRpb24gKz0gZHVyYXRpb247XG4gICAgYWdnLm1heCA9IE1hdGgubWF4KGR1cmF0aW9uLCBhZ2cubWF4KTtcblxuICAgIGlmIChhdHRyaWJ1dGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgX2F0dHJpYnV0aW9uJCA9IGF0dHJpYnV0aW9uWzBdLFxuICAgICAgICAgIF9uYW1lID0gX2F0dHJpYnV0aW9uJC5uYW1lLFxuICAgICAgICAgIGNvbnRhaW5lclR5cGUgPSBfYXR0cmlidXRpb24kLmNvbnRhaW5lclR5cGUsXG4gICAgICAgICAgY29udGFpbmVyTmFtZSA9IF9hdHRyaWJ1dGlvbiQuY29udGFpbmVyTmFtZSxcbiAgICAgICAgICBjb250YWluZXJJZCA9IF9hdHRyaWJ1dGlvbiQuY29udGFpbmVySWQ7XG4gICAgICB2YXIgY3VzdG9tQ29udGV4dCA9IHtcbiAgICAgICAgYXR0cmlidXRpb246IF9uYW1lLFxuICAgICAgICB0eXBlOiBjb250YWluZXJUeXBlXG4gICAgICB9O1xuXG4gICAgICBpZiAoY29udGFpbmVyTmFtZSkge1xuICAgICAgICBjdXN0b21Db250ZXh0Lm5hbWUgPSBjb250YWluZXJOYW1lO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udGFpbmVySWQpIHtcbiAgICAgICAgY3VzdG9tQ29udGV4dC5pZCA9IGNvbnRhaW5lcklkO1xuICAgICAgfVxuXG4gICAgICBzcGFuLmFkZENvbnRleHQoe1xuICAgICAgICBjdXN0b206IGN1c3RvbUNvbnRleHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNwYW4uZW5kKGVuZCk7XG4gICAgc3BhbnMucHVzaChzcGFuKTtcbiAgfVxuXG4gIHJldHVybiBzcGFucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaXJzdElucHV0RGVsYXlTcGFuKGZpZEVudHJpZXMpIHtcbiAgdmFyIGZpcnN0SW5wdXQgPSBmaWRFbnRyaWVzWzBdO1xuXG4gIGlmIChmaXJzdElucHV0KSB7XG4gICAgdmFyIHN0YXJ0VGltZSA9IGZpcnN0SW5wdXQuc3RhcnRUaW1lLFxuICAgICAgICBwcm9jZXNzaW5nU3RhcnQgPSBmaXJzdElucHV0LnByb2Nlc3NpbmdTdGFydDtcbiAgICB2YXIgc3BhbiA9IG5ldyBTcGFuKCdGaXJzdCBJbnB1dCBEZWxheScsIEZJUlNUX0lOUFVULCB7XG4gICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZVxuICAgIH0pO1xuICAgIHNwYW4uZW5kKHByb2Nlc3NpbmdTdGFydCk7XG4gICAgcmV0dXJuIHNwYW47XG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUb3RhbEJsb2NraW5nVGltZVNwYW4odGJ0T2JqZWN0KSB7XG4gIHZhciBzdGFydCA9IHRidE9iamVjdC5zdGFydCxcbiAgICAgIGR1cmF0aW9uID0gdGJ0T2JqZWN0LmR1cmF0aW9uO1xuICB2YXIgdGJ0U3BhbiA9IG5ldyBTcGFuKCdUb3RhbCBCbG9ja2luZyBUaW1lJywgTE9OR19UQVNLLCB7XG4gICAgc3RhcnRUaW1lOiBzdGFydFxuICB9KTtcbiAgdGJ0U3Bhbi5lbmQoc3RhcnQgKyBkdXJhdGlvbik7XG4gIHJldHVybiB0YnRTcGFuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRvdGFsQmxvY2tpbmdUaW1lKGxvbmd0YXNrRW50cmllcykge1xuICBsb25ndGFza0VudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICB2YXIgbmFtZSA9IGVudHJ5Lm5hbWUsXG4gICAgICAgIHN0YXJ0VGltZSA9IGVudHJ5LnN0YXJ0VGltZSxcbiAgICAgICAgZHVyYXRpb24gPSBlbnRyeS5kdXJhdGlvbjtcblxuICAgIGlmIChzdGFydFRpbWUgPCBtZXRyaWNzLmZjcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChuYW1lICE9PSAnc2VsZicgJiYgbmFtZS5pbmRleE9mKCdzYW1lLW9yaWdpbicpID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG1ldHJpY3MudGJ0LnN0YXJ0ID0gTWF0aC5taW4obWV0cmljcy50YnQuc3RhcnQsIHN0YXJ0VGltZSk7XG4gICAgdmFyIGJsb2NraW5nVGltZSA9IGR1cmF0aW9uIC0gTE9OR19UQVNLX1RIUkVTSE9MRDtcblxuICAgIGlmIChibG9ja2luZ1RpbWUgPiAwKSB7XG4gICAgICBtZXRyaWNzLnRidC5kdXJhdGlvbiArPSBibG9ja2luZ1RpbWU7XG4gICAgfVxuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVDdW11bGF0aXZlTGF5b3V0U2hpZnQoY2xzRW50cmllcykge1xuICBjbHNFbnRyaWVzLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgaWYgKCFlbnRyeS5oYWRSZWNlbnRJbnB1dCAmJiBlbnRyeS52YWx1ZSkge1xuICAgICAgdmFyIHNob3VsZENyZWF0ZU5ld1Nlc3Npb24gPSBlbnRyeS5zdGFydFRpbWUgLSBtZXRyaWNzLmNscy5maXJzdEVudHJ5VGltZSA+IDUwMDAgfHwgZW50cnkuc3RhcnRUaW1lIC0gbWV0cmljcy5jbHMucHJldkVudHJ5VGltZSA+IDEwMDA7XG5cbiAgICAgIGlmIChzaG91bGRDcmVhdGVOZXdTZXNzaW9uKSB7XG4gICAgICAgIG1ldHJpY3MuY2xzLmZpcnN0RW50cnlUaW1lID0gZW50cnkuc3RhcnRUaW1lO1xuICAgICAgICBtZXRyaWNzLmNscy5jdXJyZW50U2Vzc2lvblNjb3JlID0gMDtcbiAgICAgIH1cblxuICAgICAgbWV0cmljcy5jbHMucHJldkVudHJ5VGltZSA9IGVudHJ5LnN0YXJ0VGltZTtcbiAgICAgIG1ldHJpY3MuY2xzLmN1cnJlbnRTZXNzaW9uU2NvcmUgKz0gZW50cnkudmFsdWU7XG4gICAgICBtZXRyaWNzLmNscy5zY29yZSA9IE1hdGgubWF4KG1ldHJpY3MuY2xzLnNjb3JlLCBtZXRyaWNzLmNscy5jdXJyZW50U2Vzc2lvblNjb3JlKTtcbiAgICB9XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVPYnNlcnZlckVudHJpZXMobGlzdCwgX3JlZikge1xuICB2YXIgaXNIYXJkTmF2aWdhdGlvbiA9IF9yZWYuaXNIYXJkTmF2aWdhdGlvbixcbiAgICAgIHRyU3RhcnQgPSBfcmVmLnRyU3RhcnQ7XG4gIHZhciBsb25ndGFza0VudHJpZXMgPSBsaXN0LmdldEVudHJpZXNCeVR5cGUoTE9OR19UQVNLKS5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgcmV0dXJuIGVudHJ5LnN0YXJ0VGltZSA+PSB0clN0YXJ0O1xuICB9KTtcbiAgdmFyIGxvbmdUYXNrU3BhbnMgPSBjcmVhdGVMb25nVGFza1NwYW5zKGxvbmd0YXNrRW50cmllcywgbWV0cmljcy5sb25ndGFzayk7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgc3BhbnM6IGxvbmdUYXNrU3BhbnMsXG4gICAgbWFya3M6IHt9XG4gIH07XG5cbiAgaWYgKCFpc0hhcmROYXZpZ2F0aW9uKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhciBsY3BFbnRyaWVzID0gbGlzdC5nZXRFbnRyaWVzQnlUeXBlKExBUkdFU1RfQ09OVEVOVEZVTF9QQUlOVCk7XG4gIHZhciBsYXN0TGNwRW50cnkgPSBsY3BFbnRyaWVzW2xjcEVudHJpZXMubGVuZ3RoIC0gMV07XG5cbiAgaWYgKGxhc3RMY3BFbnRyeSkge1xuICAgIHZhciBsY3AgPSBwYXJzZUludChsYXN0TGNwRW50cnkuc3RhcnRUaW1lKTtcbiAgICBtZXRyaWNzLmxjcCA9IGxjcDtcbiAgICByZXN1bHQubWFya3MubGFyZ2VzdENvbnRlbnRmdWxQYWludCA9IGxjcDtcbiAgfVxuXG4gIHZhciB0aW1pbmcgPSBQRVJGLnRpbWluZztcbiAgdmFyIHVubG9hZERpZmYgPSB0aW1pbmcuZmV0Y2hTdGFydCAtIHRpbWluZy5uYXZpZ2F0aW9uU3RhcnQ7XG5cbiAgaWYgKGlzUmVkaXJlY3RJbmZvQXZhaWxhYmxlKHRpbWluZykpIHtcbiAgICB1bmxvYWREaWZmID0gMDtcbiAgfVxuXG4gIHZhciBmY3BFbnRyeSA9IGxpc3QuZ2V0RW50cmllc0J5TmFtZShGSVJTVF9DT05URU5URlVMX1BBSU5UKVswXTtcblxuICBpZiAoZmNwRW50cnkpIHtcbiAgICB2YXIgZmNwID0gcGFyc2VJbnQodW5sb2FkRGlmZiA+PSAwID8gZmNwRW50cnkuc3RhcnRUaW1lIC0gdW5sb2FkRGlmZiA6IGZjcEVudHJ5LnN0YXJ0VGltZSk7XG4gICAgbWV0cmljcy5mY3AgPSBmY3A7XG4gICAgcmVzdWx0Lm1hcmtzLmZpcnN0Q29udGVudGZ1bFBhaW50ID0gZmNwO1xuICB9XG5cbiAgdmFyIGZpZEVudHJpZXMgPSBsaXN0LmdldEVudHJpZXNCeVR5cGUoRklSU1RfSU5QVVQpO1xuICB2YXIgZmlkU3BhbiA9IGNyZWF0ZUZpcnN0SW5wdXREZWxheVNwYW4oZmlkRW50cmllcyk7XG5cbiAgaWYgKGZpZFNwYW4pIHtcbiAgICBtZXRyaWNzLmZpZCA9IGZpZFNwYW4uZHVyYXRpb24oKTtcbiAgICByZXN1bHQuc3BhbnMucHVzaChmaWRTcGFuKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRvdGFsQmxvY2tpbmdUaW1lKGxvbmd0YXNrRW50cmllcyk7XG4gIHZhciBjbHNFbnRyaWVzID0gbGlzdC5nZXRFbnRyaWVzQnlUeXBlKExBWU9VVF9TSElGVCk7XG4gIGNhbGN1bGF0ZUN1bXVsYXRpdmVMYXlvdXRTaGlmdChjbHNFbnRyaWVzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCB2YXIgUGVyZkVudHJ5UmVjb3JkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFBlcmZFbnRyeVJlY29yZGVyKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wbyA9IHtcbiAgICAgIG9ic2VydmU6IG5vb3AsXG4gICAgICBkaXNjb25uZWN0OiBub29wXG4gICAgfTtcblxuICAgIGlmICh3aW5kb3cuUGVyZm9ybWFuY2VPYnNlcnZlcikge1xuICAgICAgdGhpcy5wbyA9IG5ldyBQZXJmb3JtYW5jZU9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUGVyZkVudHJ5UmVjb3JkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5zdGFydCA9IGZ1bmN0aW9uIHN0YXJ0KHR5cGUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBidWZmZXJlZDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCFpc1BlcmZUeXBlU3VwcG9ydGVkKHR5cGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wby5vYnNlcnZlKF9leHRlbmRzKHtcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgfSwgb3B0aW9ucykpO1xuICAgIH0gY2F0Y2ggKF8pIHt9XG4gIH07XG5cbiAgX3Byb3RvLnN0b3AgPSBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHRoaXMucG8uZGlzY29ubmVjdCgpO1xuICB9O1xuXG4gIHJldHVybiBQZXJmRW50cnlSZWNvcmRlcjtcbn0oKTsiLCJpbXBvcnQgeyBQRVJGLCBpc1BlcmZUaW1lbGluZVN1cHBvcnRlZCwgaXNSZWRpcmVjdEluZm9BdmFpbGFibGUgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgUEFHRV9MT0FELCBSRVNPVVJDRSwgTUVBU1VSRSB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgc3RhdGUgfSBmcm9tICcuLi8uLi9zdGF0ZSc7XG5pbXBvcnQgeyBjcmVhdGVOYXZpZ2F0aW9uVGltaW5nU3BhbnMgfSBmcm9tICcuL25hdmlnYXRpb24tdGltaW5nJztcbmltcG9ydCB7IGNyZWF0ZVVzZXJUaW1pbmdTcGFucyB9IGZyb20gJy4vdXNlci10aW1pbmcnO1xuaW1wb3J0IHsgY3JlYXRlUmVzb3VyY2VUaW1pbmdTcGFucyB9IGZyb20gJy4vcmVzb3VyY2UtdGltaW5nJztcbmltcG9ydCB7IGdldFBhZ2VMb2FkTWFya3MgfSBmcm9tICcuL21hcmtzJztcblxuZnVuY3Rpb24gY2FwdHVyZU5hdmlnYXRpb24odHJhbnNhY3Rpb24pIHtcbiAgaWYgKCF0cmFuc2FjdGlvbi5jYXB0dXJlVGltaW5ncykge1xuICAgIGlmICh0cmFuc2FjdGlvbi50eXBlID09PSBQQUdFX0xPQUQpIHtcbiAgICAgIHRyYW5zYWN0aW9uLl9zdGFydCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRyRW5kID0gdHJhbnNhY3Rpb24uX2VuZDtcblxuICBpZiAodHJhbnNhY3Rpb24udHlwZSA9PT0gUEFHRV9MT0FEKSB7XG4gICAgaWYgKHRyYW5zYWN0aW9uLm1hcmtzICYmIHRyYW5zYWN0aW9uLm1hcmtzLmN1c3RvbSkge1xuICAgICAgdmFyIGN1c3RvbU1hcmtzID0gdHJhbnNhY3Rpb24ubWFya3MuY3VzdG9tO1xuICAgICAgT2JqZWN0LmtleXMoY3VzdG9tTWFya3MpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBjdXN0b21NYXJrc1trZXldICs9IHRyYW5zYWN0aW9uLl9zdGFydDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciB0clN0YXJ0ID0gMDtcbiAgICB0cmFuc2FjdGlvbi5fc3RhcnQgPSB0clN0YXJ0O1xuICAgIHZhciB0aW1pbmdzID0gUEVSRi50aW1pbmc7XG4gICAgdmFyIGJhc2VUaW1lID0gaXNSZWRpcmVjdEluZm9BdmFpbGFibGUodGltaW5ncykgPyB0aW1pbmdzLnJlZGlyZWN0U3RhcnQgOiB0aW1pbmdzLmZldGNoU3RhcnQ7XG4gICAgY3JlYXRlTmF2aWdhdGlvblRpbWluZ1NwYW5zKHRpbWluZ3MsIGJhc2VUaW1lLCB0clN0YXJ0LCB0ckVuZCkuZm9yRWFjaChmdW5jdGlvbiAoc3Bhbikge1xuICAgICAgc3Bhbi50cmFjZUlkID0gdHJhbnNhY3Rpb24udHJhY2VJZDtcbiAgICAgIHNwYW4uc2FtcGxlZCA9IHRyYW5zYWN0aW9uLnNhbXBsZWQ7XG5cbiAgICAgIGlmIChzcGFuLnBhZ2VSZXNwb25zZSAmJiB0cmFuc2FjdGlvbi5vcHRpb25zLnBhZ2VMb2FkU3BhbklkKSB7XG4gICAgICAgIHNwYW4uaWQgPSB0cmFuc2FjdGlvbi5vcHRpb25zLnBhZ2VMb2FkU3BhbklkO1xuICAgICAgfVxuXG4gICAgICB0cmFuc2FjdGlvbi5zcGFucy5wdXNoKHNwYW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRyYW5zYWN0aW9uLm9wdGlvbnMucGFnZUxvYWRQYXJlbnRJZCkge1xuICAgICAgdHJhbnNhY3Rpb24ucGFyZW50SWQgPSB0cmFuc2FjdGlvbi5vcHRpb25zLnBhZ2VMb2FkUGFyZW50SWQ7XG4gICAgfVxuXG4gICAgdHJhbnNhY3Rpb24uYWRkTWFya3MoZ2V0UGFnZUxvYWRNYXJrcyh0aW1pbmdzKSk7XG4gIH1cblxuICBpZiAoaXNQZXJmVGltZWxpbmVTdXBwb3J0ZWQoKSkge1xuICAgIHZhciBfdHJTdGFydCA9IHRyYW5zYWN0aW9uLl9zdGFydDtcbiAgICB2YXIgcmVzb3VyY2VFbnRyaWVzID0gUEVSRi5nZXRFbnRyaWVzQnlUeXBlKFJFU09VUkNFKTtcbiAgICBjcmVhdGVSZXNvdXJjZVRpbWluZ1NwYW5zKHJlc291cmNlRW50cmllcywgc3RhdGUuYm9vdHN0cmFwVGltZSwgX3RyU3RhcnQsIHRyRW5kKS5mb3JFYWNoKGZ1bmN0aW9uIChzcGFuKSB7XG4gICAgICByZXR1cm4gdHJhbnNhY3Rpb24uc3BhbnMucHVzaChzcGFuKTtcbiAgICB9KTtcbiAgICB2YXIgdXNlckVudHJpZXMgPSBQRVJGLmdldEVudHJpZXNCeVR5cGUoTUVBU1VSRSk7XG4gICAgY3JlYXRlVXNlclRpbWluZ1NwYW5zKHVzZXJFbnRyaWVzLCBfdHJTdGFydCwgdHJFbmQpLmZvckVhY2goZnVuY3Rpb24gKHNwYW4pIHtcbiAgICAgIHJldHVybiB0cmFuc2FjdGlvbi5zcGFucy5wdXNoKHNwYW4pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IGNhcHR1cmVOYXZpZ2F0aW9uLCBjcmVhdGVOYXZpZ2F0aW9uVGltaW5nU3BhbnMsIGNyZWF0ZVJlc291cmNlVGltaW5nU3BhbnMsIGNyZWF0ZVVzZXJUaW1pbmdTcGFucywgZ2V0UGFnZUxvYWRNYXJrcyB9OyIsImltcG9ydCB7IGlzUmVkaXJlY3RJbmZvQXZhaWxhYmxlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJztcbnZhciBOQVZJR0FUSU9OX1RJTUlOR19NQVJLUyA9IFsnZmV0Y2hTdGFydCcsICdkb21haW5Mb29rdXBTdGFydCcsICdkb21haW5Mb29rdXBFbmQnLCAnY29ubmVjdFN0YXJ0JywgJ2Nvbm5lY3RFbmQnLCAncmVxdWVzdFN0YXJ0JywgJ3Jlc3BvbnNlU3RhcnQnLCAncmVzcG9uc2VFbmQnLCAnZG9tTG9hZGluZycsICdkb21JbnRlcmFjdGl2ZScsICdkb21Db250ZW50TG9hZGVkRXZlbnRTdGFydCcsICdkb21Db250ZW50TG9hZGVkRXZlbnRFbmQnLCAnZG9tQ29tcGxldGUnLCAnbG9hZEV2ZW50U3RhcnQnLCAnbG9hZEV2ZW50RW5kJ107XG52YXIgQ09NUFJFU1NFRF9OQVZfVElNSU5HX01BUktTID0gWydmcycsICdscycsICdsZScsICdjcycsICdjZScsICdxcycsICdycycsICdyZScsICdkbCcsICdkaScsICdkcycsICdkZScsICdkYycsICdlcycsICdlZSddO1xuXG5mdW5jdGlvbiBnZXRQYWdlTG9hZE1hcmtzKHRpbWluZykge1xuICB2YXIgbWFya3MgPSBnZXROYXZpZ2F0aW9uVGltaW5nTWFya3ModGltaW5nKTtcblxuICBpZiAobWFya3MgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYXZpZ2F0aW9uVGltaW5nOiBtYXJrcyxcbiAgICBhZ2VudDoge1xuICAgICAgdGltZVRvRmlyc3RCeXRlOiBtYXJrcy5yZXNwb25zZVN0YXJ0LFxuICAgICAgZG9tSW50ZXJhY3RpdmU6IG1hcmtzLmRvbUludGVyYWN0aXZlLFxuICAgICAgZG9tQ29tcGxldGU6IG1hcmtzLmRvbUNvbXBsZXRlXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXROYXZpZ2F0aW9uVGltaW5nTWFya3ModGltaW5nKSB7XG4gIHZhciByZWRpcmVjdFN0YXJ0ID0gdGltaW5nLnJlZGlyZWN0U3RhcnQsXG4gICAgICBmZXRjaFN0YXJ0ID0gdGltaW5nLmZldGNoU3RhcnQsXG4gICAgICBuYXZpZ2F0aW9uU3RhcnQgPSB0aW1pbmcubmF2aWdhdGlvblN0YXJ0LFxuICAgICAgcmVzcG9uc2VTdGFydCA9IHRpbWluZy5yZXNwb25zZVN0YXJ0LFxuICAgICAgcmVzcG9uc2VFbmQgPSB0aW1pbmcucmVzcG9uc2VFbmQ7XG5cbiAgaWYgKGZldGNoU3RhcnQgPj0gbmF2aWdhdGlvblN0YXJ0ICYmIHJlc3BvbnNlU3RhcnQgPj0gZmV0Y2hTdGFydCAmJiByZXNwb25zZUVuZCA+PSByZXNwb25zZVN0YXJ0KSB7XG4gICAgdmFyIG1hcmtzID0ge307XG4gICAgTkFWSUdBVElPTl9USU1JTkdfTUFSS1MuZm9yRWFjaChmdW5jdGlvbiAodGltaW5nS2V5KSB7XG4gICAgICB2YXIgbSA9IHRpbWluZ1t0aW1pbmdLZXldO1xuXG4gICAgICBpZiAobSAmJiBtID49IGZldGNoU3RhcnQpIHtcbiAgICAgICAgaWYgKGlzUmVkaXJlY3RJbmZvQXZhaWxhYmxlKHRpbWluZykpIHtcbiAgICAgICAgICBtYXJrc1t0aW1pbmdLZXldID0gcGFyc2VJbnQobSAtIHJlZGlyZWN0U3RhcnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcmtzW3RpbWluZ0tleV0gPSBwYXJzZUludChtIC0gZmV0Y2hTdGFydCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWFya3M7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IHsgZ2V0UGFnZUxvYWRNYXJrcywgTkFWSUdBVElPTl9USU1JTkdfTUFSS1MsIENPTVBSRVNTRURfTkFWX1RJTUlOR19NQVJLUyB9OyIsImltcG9ydCB7IHNob3VsZENyZWF0ZVNwYW4gfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBTcGFuIGZyb20gJy4uL3NwYW4nO1xudmFyIGV2ZW50UGFpcnMgPSBbWydyZWRpcmVjdFN0YXJ0JywgJ3JlZGlyZWN0RW5kJywgJ1JlZGlyZWN0J10sIFsnZG9tYWluTG9va3VwU3RhcnQnLCAnZG9tYWluTG9va3VwRW5kJywgJ0RvbWFpbiBsb29rdXAnXSwgWydjb25uZWN0U3RhcnQnLCAnY29ubmVjdEVuZCcsICdNYWtpbmcgYSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXInXSwgWydyZXF1ZXN0U3RhcnQnLCAncmVzcG9uc2VFbmQnLCAnUmVxdWVzdGluZyBhbmQgcmVjZWl2aW5nIHRoZSBkb2N1bWVudCddLCBbJ2RvbUxvYWRpbmcnLCAnZG9tSW50ZXJhY3RpdmUnLCAnUGFyc2luZyB0aGUgZG9jdW1lbnQsIGV4ZWN1dGluZyBzeW5jLiBzY3JpcHRzJ10sIFsnZG9tQ29udGVudExvYWRlZEV2ZW50U3RhcnQnLCAnZG9tQ29udGVudExvYWRlZEV2ZW50RW5kJywgJ0ZpcmUgXCJET01Db250ZW50TG9hZGVkXCIgZXZlbnQnXSwgWydsb2FkRXZlbnRTdGFydCcsICdsb2FkRXZlbnRFbmQnLCAnRmlyZSBcImxvYWRcIiBldmVudCddXTtcblxuZnVuY3Rpb24gY3JlYXRlTmF2aWdhdGlvblRpbWluZ1NwYW5zKHRpbWluZ3MsIGJhc2VUaW1lLCB0clN0YXJ0LCB0ckVuZCkge1xuICB2YXIgc3BhbnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50UGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc3RhcnQgPSB0aW1pbmdzW2V2ZW50UGFpcnNbaV1bMF1dO1xuICAgIHZhciBlbmQgPSB0aW1pbmdzW2V2ZW50UGFpcnNbaV1bMV1dO1xuXG4gICAgaWYgKCFzaG91bGRDcmVhdGVTcGFuKHN0YXJ0LCBlbmQsIHRyU3RhcnQsIHRyRW5kLCBiYXNlVGltZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBzcGFuID0gbmV3IFNwYW4oZXZlbnRQYWlyc1tpXVsyXSwgJ2hhcmQtbmF2aWdhdGlvbi5icm93c2VyLXRpbWluZycpO1xuICAgIHZhciBkYXRhID0gbnVsbDtcblxuICAgIGlmIChldmVudFBhaXJzW2ldWzBdID09PSAncmVxdWVzdFN0YXJ0Jykge1xuICAgICAgc3Bhbi5wYWdlUmVzcG9uc2UgPSB0cnVlO1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgdXJsOiBsb2NhdGlvbi5vcmlnaW5cbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3Bhbi5fc3RhcnQgPSBzdGFydCAtIGJhc2VUaW1lO1xuICAgIHNwYW4uZW5kKGVuZCAtIGJhc2VUaW1lLCBkYXRhKTtcbiAgICBzcGFucy5wdXNoKHNwYW4pO1xuICB9XG5cbiAgcmV0dXJuIHNwYW5zO1xufVxuXG5leHBvcnQgeyBjcmVhdGVOYXZpZ2F0aW9uVGltaW5nU3BhbnMgfTsiLCJpbXBvcnQgeyBzdHJpcFF1ZXJ5U3RyaW5nRnJvbVVybCB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBzaG91bGRDcmVhdGVTcGFuIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBSRVNPVVJDRV9JTklUSUFUT1JfVFlQRVMgfSBmcm9tICcuLi8uLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCBTcGFuIGZyb20gJy4uL3NwYW4nO1xuXG5mdW5jdGlvbiBjcmVhdGVSZXNvdXJjZVRpbWluZ1NwYW4ocmVzb3VyY2VUaW1pbmdFbnRyeSkge1xuICB2YXIgbmFtZSA9IHJlc291cmNlVGltaW5nRW50cnkubmFtZSxcbiAgICAgIGluaXRpYXRvclR5cGUgPSByZXNvdXJjZVRpbWluZ0VudHJ5LmluaXRpYXRvclR5cGUsXG4gICAgICBzdGFydFRpbWUgPSByZXNvdXJjZVRpbWluZ0VudHJ5LnN0YXJ0VGltZSxcbiAgICAgIHJlc3BvbnNlRW5kID0gcmVzb3VyY2VUaW1pbmdFbnRyeS5yZXNwb25zZUVuZDtcbiAgdmFyIGtpbmQgPSAncmVzb3VyY2UnO1xuXG4gIGlmIChpbml0aWF0b3JUeXBlKSB7XG4gICAga2luZCArPSAnLicgKyBpbml0aWF0b3JUeXBlO1xuICB9XG5cbiAgdmFyIHNwYW5OYW1lID0gc3RyaXBRdWVyeVN0cmluZ0Zyb21VcmwobmFtZSk7XG4gIHZhciBzcGFuID0gbmV3IFNwYW4oc3Bhbk5hbWUsIGtpbmQpO1xuICBzcGFuLl9zdGFydCA9IHN0YXJ0VGltZTtcbiAgc3Bhbi5lbmQocmVzcG9uc2VFbmQsIHtcbiAgICB1cmw6IG5hbWUsXG4gICAgZW50cnk6IHJlc291cmNlVGltaW5nRW50cnlcbiAgfSk7XG4gIHJldHVybiBzcGFuO1xufVxuXG5mdW5jdGlvbiBpc0NhcHR1cmVkQnlQYXRjaGluZyhyZXNvdXJjZVN0YXJ0VGltZSwgcmVxdWVzdFBhdGNoVGltZSkge1xuICByZXR1cm4gcmVxdWVzdFBhdGNoVGltZSAhPSBudWxsICYmIHJlc291cmNlU3RhcnRUaW1lID4gcmVxdWVzdFBhdGNoVGltZTtcbn1cblxuZnVuY3Rpb24gaXNJbnRha2VBUElFbmRwb2ludCh1cmwpIHtcbiAgcmV0dXJuIC9pbnRha2VcXC92XFxkK1xcL3J1bVxcL2V2ZW50cy8udGVzdCh1cmwpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXNvdXJjZVRpbWluZ1NwYW5zKGVudHJpZXMsIHJlcXVlc3RQYXRjaFRpbWUsIHRyU3RhcnQsIHRyRW5kKSB7XG4gIHZhciBzcGFucyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfZW50cmllcyRpID0gZW50cmllc1tpXSxcbiAgICAgICAgaW5pdGlhdG9yVHlwZSA9IF9lbnRyaWVzJGkuaW5pdGlhdG9yVHlwZSxcbiAgICAgICAgbmFtZSA9IF9lbnRyaWVzJGkubmFtZSxcbiAgICAgICAgc3RhcnRUaW1lID0gX2VudHJpZXMkaS5zdGFydFRpbWUsXG4gICAgICAgIHJlc3BvbnNlRW5kID0gX2VudHJpZXMkaS5yZXNwb25zZUVuZDtcblxuICAgIGlmIChSRVNPVVJDRV9JTklUSUFUT1JfVFlQRVMuaW5kZXhPZihpbml0aWF0b3JUeXBlKSA9PT0gLTEgfHwgbmFtZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoKGluaXRpYXRvclR5cGUgPT09ICd4bWxodHRwcmVxdWVzdCcgfHwgaW5pdGlhdG9yVHlwZSA9PT0gJ2ZldGNoJykgJiYgKGlzSW50YWtlQVBJRW5kcG9pbnQobmFtZSkgfHwgaXNDYXB0dXJlZEJ5UGF0Y2hpbmcoc3RhcnRUaW1lLCByZXF1ZXN0UGF0Y2hUaW1lKSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRDcmVhdGVTcGFuKHN0YXJ0VGltZSwgcmVzcG9uc2VFbmQsIHRyU3RhcnQsIHRyRW5kKSkge1xuICAgICAgc3BhbnMucHVzaChjcmVhdGVSZXNvdXJjZVRpbWluZ1NwYW4oZW50cmllc1tpXSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzcGFucztcbn1cblxuZXhwb3J0IHsgY3JlYXRlUmVzb3VyY2VUaW1pbmdTcGFucyB9OyIsImltcG9ydCB7IFVTRVJfVElNSU5HX1RIUkVTSE9MRCB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgc2hvdWxkQ3JlYXRlU3BhbiB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFNwYW4gZnJvbSAnLi4vc3Bhbic7XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZXJUaW1pbmdTcGFucyhlbnRyaWVzLCB0clN0YXJ0LCB0ckVuZCkge1xuICB2YXIgdXNlclRpbWluZ1NwYW5zID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9lbnRyaWVzJGkgPSBlbnRyaWVzW2ldLFxuICAgICAgICBuYW1lID0gX2VudHJpZXMkaS5uYW1lLFxuICAgICAgICBzdGFydFRpbWUgPSBfZW50cmllcyRpLnN0YXJ0VGltZSxcbiAgICAgICAgZHVyYXRpb24gPSBfZW50cmllcyRpLmR1cmF0aW9uO1xuICAgIHZhciBlbmQgPSBzdGFydFRpbWUgKyBkdXJhdGlvbjtcblxuICAgIGlmIChkdXJhdGlvbiA8PSBVU0VSX1RJTUlOR19USFJFU0hPTEQgfHwgIXNob3VsZENyZWF0ZVNwYW4oc3RhcnRUaW1lLCBlbmQsIHRyU3RhcnQsIHRyRW5kKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGtpbmQgPSAnYXBwJztcbiAgICB2YXIgc3BhbiA9IG5ldyBTcGFuKG5hbWUsIGtpbmQpO1xuICAgIHNwYW4uX3N0YXJ0ID0gc3RhcnRUaW1lO1xuICAgIHNwYW4uZW5kKGVuZCk7XG4gICAgdXNlclRpbWluZ1NwYW5zLnB1c2goc3Bhbik7XG4gIH1cblxuICByZXR1cm4gdXNlclRpbWluZ1NwYW5zO1xufVxuXG5leHBvcnQgeyBjcmVhdGVVc2VyVGltaW5nU3BhbnMgfTsiLCJpbXBvcnQgeyBNQVhfU1BBTl9EVVJBVElPTiB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuXG5mdW5jdGlvbiBzaG91bGRDcmVhdGVTcGFuKHN0YXJ0LCBlbmQsIHRyU3RhcnQsIHRyRW5kLCBiYXNlVGltZSkge1xuICBpZiAoYmFzZVRpbWUgPT09IHZvaWQgMCkge1xuICAgIGJhc2VUaW1lID0gMDtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygc3RhcnQgPT09ICdudW1iZXInICYmIHR5cGVvZiBlbmQgPT09ICdudW1iZXInICYmIHN0YXJ0ID49IGJhc2VUaW1lICYmIGVuZCA+IHN0YXJ0ICYmIHN0YXJ0IC0gYmFzZVRpbWUgPj0gdHJTdGFydCAmJiBlbmQgLSBiYXNlVGltZSA8PSB0ckVuZCAmJiBlbmQgLSBzdGFydCA8IE1BWF9TUEFOX0RVUkFUSU9OICYmIHN0YXJ0IC0gYmFzZVRpbWUgPCBNQVhfU1BBTl9EVVJBVElPTiAmJiBlbmQgLSBiYXNlVGltZSA8IE1BWF9TUEFOX0RVUkFUSU9OO1xufVxuXG5leHBvcnQgeyBzaG91bGRDcmVhdGVTcGFuIH07IiwiaW1wb3J0IHsgY2hlY2tTYW1lT3JpZ2luLCBpc0R0SGVhZGVyVmFsaWQsIHBhcnNlRHRIZWFkZXJWYWx1ZSwgZ2V0RHRIZWFkZXJWYWx1ZSwgZ2V0VFNIZWFkZXJWYWx1ZSwgc3RyaXBRdWVyeVN0cmluZ0Zyb21VcmwsIHNldFJlcXVlc3RIZWFkZXIgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgVXJsIH0gZnJvbSAnLi4vY29tbW9uL3VybCc7XG5pbXBvcnQgeyBwYXRjaEV2ZW50SGFuZGxlciB9IGZyb20gJy4uL2NvbW1vbi9wYXRjaGluZyc7XG5pbXBvcnQgeyBnbG9iYWxTdGF0ZSB9IGZyb20gJy4uL2NvbW1vbi9wYXRjaGluZy9wYXRjaC11dGlscyc7XG5pbXBvcnQgeyBTQ0hFRFVMRSwgSU5WT0tFLCBUUkFOU0FDVElPTl9FTkQsIEFGVEVSX0VWRU5ULCBGRVRDSCwgSElTVE9SWSwgWE1MSFRUUFJFUVVFU1QsIEhUVFBfUkVRVUVTVF9UWVBFLCBPVVRDT01FX0ZBSUxVUkUsIE9VVENPTUVfU1VDQ0VTUywgT1VUQ09NRV9VTktOT1dOLCBRVUVVRV9BRERfVFJBTlNBQ1RJT04sIFRSQU5TQUNUSU9OX0lHTk9SRSB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgdHJ1bmNhdGVNb2RlbCwgU1BBTl9NT0RFTCwgVFJBTlNBQ1RJT05fTU9ERUwgfSBmcm9tICcuLi9jb21tb24vdHJ1bmNhdGUnO1xuaW1wb3J0IHsgX19ERVZfXyB9IGZyb20gJy4uL3N0YXRlJztcbnZhciBTSU1JTEFSX1NQQU5fVE9fVFJBTlNBQ1RJT05fUkFUSU8gPSAwLjA1O1xudmFyIFRSQU5TQUNUSU9OX0RVUkFUSU9OX1RIUkVTSE9MRCA9IDYwMDAwO1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwU21hbGxDb250aW51b3VzbHlTaW1pbGFyU3BhbnMob3JpZ2luYWxTcGFucywgdHJhbnNEdXJhdGlvbiwgdGhyZXNob2xkKSB7XG4gIG9yaWdpbmFsU3BhbnMuc29ydChmdW5jdGlvbiAoc3BhbkEsIHNwYW5CKSB7XG4gICAgcmV0dXJuIHNwYW5BLl9zdGFydCAtIHNwYW5CLl9zdGFydDtcbiAgfSk7XG4gIHZhciBzcGFucyA9IFtdO1xuICB2YXIgbGFzdENvdW50ID0gMTtcbiAgb3JpZ2luYWxTcGFucy5mb3JFYWNoKGZ1bmN0aW9uIChzcGFuLCBpbmRleCkge1xuICAgIGlmIChzcGFucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHNwYW5zLnB1c2goc3Bhbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsYXN0U3BhbiA9IHNwYW5zW3NwYW5zLmxlbmd0aCAtIDFdO1xuICAgICAgdmFyIGlzQ29udGludW91c2x5U2ltaWxhciA9IGxhc3RTcGFuLnR5cGUgPT09IHNwYW4udHlwZSAmJiBsYXN0U3Bhbi5zdWJ0eXBlID09PSBzcGFuLnN1YnR5cGUgJiYgbGFzdFNwYW4uYWN0aW9uID09PSBzcGFuLmFjdGlvbiAmJiBsYXN0U3Bhbi5uYW1lID09PSBzcGFuLm5hbWUgJiYgc3Bhbi5kdXJhdGlvbigpIC8gdHJhbnNEdXJhdGlvbiA8IHRocmVzaG9sZCAmJiAoc3Bhbi5fc3RhcnQgLSBsYXN0U3Bhbi5fZW5kKSAvIHRyYW5zRHVyYXRpb24gPCB0aHJlc2hvbGQ7XG4gICAgICB2YXIgaXNMYXN0U3BhbiA9IG9yaWdpbmFsU3BhbnMubGVuZ3RoID09PSBpbmRleCArIDE7XG5cbiAgICAgIGlmIChpc0NvbnRpbnVvdXNseVNpbWlsYXIpIHtcbiAgICAgICAgbGFzdENvdW50Kys7XG4gICAgICAgIGxhc3RTcGFuLl9lbmQgPSBzcGFuLl9lbmQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChsYXN0Q291bnQgPiAxICYmICghaXNDb250aW51b3VzbHlTaW1pbGFyIHx8IGlzTGFzdFNwYW4pKSB7XG4gICAgICAgIGxhc3RTcGFuLm5hbWUgPSBsYXN0Q291bnQgKyAneCAnICsgbGFzdFNwYW4ubmFtZTtcbiAgICAgICAgbGFzdENvdW50ID0gMTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0NvbnRpbnVvdXNseVNpbWlsYXIpIHtcbiAgICAgICAgc3BhbnMucHVzaChzcGFuKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3BhbnM7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0VHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pIHtcbiAgaWYgKHRyYW5zYWN0aW9uLnNhbXBsZWQpIHtcbiAgICB2YXIgZmlsdGVyZFNwYW5zID0gdHJhbnNhY3Rpb24uc3BhbnMuZmlsdGVyKGZ1bmN0aW9uIChzcGFuKSB7XG4gICAgICByZXR1cm4gc3Bhbi5kdXJhdGlvbigpID4gMCAmJiBzcGFuLl9zdGFydCA+PSB0cmFuc2FjdGlvbi5fc3RhcnQgJiYgc3Bhbi5fZW5kIDw9IHRyYW5zYWN0aW9uLl9lbmQ7XG4gICAgfSk7XG5cbiAgICBpZiAodHJhbnNhY3Rpb24uaXNNYW5hZ2VkKCkpIHtcbiAgICAgIHZhciBkdXJhdGlvbiA9IHRyYW5zYWN0aW9uLmR1cmF0aW9uKCk7XG4gICAgICB2YXIgc2ltaWxhclNwYW5zID0gZ3JvdXBTbWFsbENvbnRpbnVvdXNseVNpbWlsYXJTcGFucyhmaWx0ZXJkU3BhbnMsIGR1cmF0aW9uLCBTSU1JTEFSX1NQQU5fVE9fVFJBTlNBQ1RJT05fUkFUSU8pO1xuICAgICAgdHJhbnNhY3Rpb24uc3BhbnMgPSBzaW1pbGFyU3BhbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zYWN0aW9uLnNwYW5zID0gZmlsdGVyZFNwYW5zO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0cmFuc2FjdGlvbi5yZXNldEZpZWxkcygpO1xuICB9XG5cbiAgcmV0dXJuIHRyYW5zYWN0aW9uO1xufVxuXG52YXIgUGVyZm9ybWFuY2VNb25pdG9yaW5nID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQZXJmb3JtYW5jZU1vbml0b3JpbmcoYXBtU2VydmVyLCBjb25maWdTZXJ2aWNlLCBsb2dnaW5nU2VydmljZSwgdHJhbnNhY3Rpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5fYXBtU2VydmVyID0gYXBtU2VydmVyO1xuICAgIHRoaXMuX2NvbmZpZ1NlcnZpY2UgPSBjb25maWdTZXJ2aWNlO1xuICAgIHRoaXMuX2xvZ2dpblNlcnZpY2UgPSBsb2dnaW5nU2VydmljZTtcbiAgICB0aGlzLl90cmFuc2FjdGlvblNlcnZpY2UgPSB0cmFuc2FjdGlvblNlcnZpY2U7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUGVyZm9ybWFuY2VNb25pdG9yaW5nLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQoZmxhZ3MpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnU2VydmljZS5ldmVudHMub2JzZXJ2ZShUUkFOU0FDVElPTl9FTkQgKyBBRlRFUl9FVkVOVCwgZnVuY3Rpb24gKHRyKSB7XG4gICAgICB2YXIgcGF5bG9hZCA9IF90aGlzLmNyZWF0ZVRyYW5zYWN0aW9uUGF5bG9hZCh0cik7XG5cbiAgICAgIGlmIChwYXlsb2FkKSB7XG4gICAgICAgIF90aGlzLl9hcG1TZXJ2ZXIuYWRkVHJhbnNhY3Rpb24ocGF5bG9hZCk7XG5cbiAgICAgICAgX3RoaXMuX2NvbmZpZ1NlcnZpY2UuZGlzcGF0Y2hFdmVudChRVUVVRV9BRERfVFJBTlNBQ1RJT04pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGZsYWdzW0hJU1RPUlldKSB7XG4gICAgICBwYXRjaEV2ZW50SGFuZGxlci5vYnNlcnZlKEhJU1RPUlksIHRoaXMuZ2V0SGlzdG9yeVN1YigpKTtcbiAgICB9XG5cbiAgICBpZiAoZmxhZ3NbWE1MSFRUUFJFUVVFU1RdKSB7XG4gICAgICBwYXRjaEV2ZW50SGFuZGxlci5vYnNlcnZlKFhNTEhUVFBSRVFVRVNULCB0aGlzLmdldFhIUlN1YigpKTtcbiAgICB9XG5cbiAgICBpZiAoZmxhZ3NbRkVUQ0hdKSB7XG4gICAgICBwYXRjaEV2ZW50SGFuZGxlci5vYnNlcnZlKEZFVENILCB0aGlzLmdldEZldGNoU3ViKCkpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uZ2V0SGlzdG9yeVN1YiA9IGZ1bmN0aW9uIGdldEhpc3RvcnlTdWIoKSB7XG4gICAgdmFyIHRyYW5zYWN0aW9uU2VydmljZSA9IHRoaXMuX3RyYW5zYWN0aW9uU2VydmljZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50LCB0YXNrKSB7XG4gICAgICBpZiAodGFzay5zb3VyY2UgPT09IEhJU1RPUlkgJiYgZXZlbnQgPT09IElOVk9LRSkge1xuICAgICAgICB0cmFuc2FjdGlvblNlcnZpY2Uuc3RhcnRUcmFuc2FjdGlvbih0YXNrLmRhdGEudGl0bGUsICdyb3V0ZS1jaGFuZ2UnLCB7XG4gICAgICAgICAgbWFuYWdlZDogdHJ1ZSxcbiAgICAgICAgICBjYW5SZXVzZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIF9wcm90by5nZXRYSFJTdWIgPSBmdW5jdGlvbiBnZXRYSFJTdWIoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50LCB0YXNrKSB7XG4gICAgICBpZiAodGFzay5zb3VyY2UgPT09IFhNTEhUVFBSRVFVRVNUICYmICFnbG9iYWxTdGF0ZS5mZXRjaEluUHJvZ3Jlc3MpIHtcbiAgICAgICAgX3RoaXMyLnByb2Nlc3NBUElDYWxscyhldmVudCwgdGFzayk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0RmV0Y2hTdWIgPSBmdW5jdGlvbiBnZXRGZXRjaFN1YigpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQsIHRhc2spIHtcbiAgICAgIGlmICh0YXNrLnNvdXJjZSA9PT0gRkVUQ0gpIHtcbiAgICAgICAgX3RoaXMzLnByb2Nlc3NBUElDYWxscyhldmVudCwgdGFzayk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBfcHJvdG8ucHJvY2Vzc0FQSUNhbGxzID0gZnVuY3Rpb24gcHJvY2Vzc0FQSUNhbGxzKGV2ZW50LCB0YXNrKSB7XG4gICAgdmFyIGNvbmZpZ1NlcnZpY2UgPSB0aGlzLl9jb25maWdTZXJ2aWNlO1xuICAgIHZhciB0cmFuc2FjdGlvblNlcnZpY2UgPSB0aGlzLl90cmFuc2FjdGlvblNlcnZpY2U7XG5cbiAgICBpZiAodGFzay5kYXRhICYmIHRhc2suZGF0YS51cmwpIHtcbiAgICAgIHZhciBlbmRwb2ludHMgPSB0aGlzLl9hcG1TZXJ2ZXIuZ2V0RW5kcG9pbnRzKCk7XG5cbiAgICAgIHZhciBpc093bkVuZHBvaW50ID0gT2JqZWN0LmtleXMoZW5kcG9pbnRzKS5zb21lKGZ1bmN0aW9uIChlbmRwb2ludCkge1xuICAgICAgICByZXR1cm4gdGFzay5kYXRhLnVybC5pbmRleE9mKGVuZHBvaW50c1tlbmRwb2ludF0pICE9PSAtMTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaXNPd25FbmRwb2ludCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50ID09PSBTQ0hFRFVMRSAmJiB0YXNrLmRhdGEpIHtcbiAgICAgIHZhciBkYXRhID0gdGFzay5kYXRhO1xuICAgICAgdmFyIHJlcXVlc3RVcmwgPSBuZXcgVXJsKGRhdGEudXJsKTtcbiAgICAgIHZhciBzcGFuTmFtZSA9IGRhdGEubWV0aG9kICsgJyAnICsgKHJlcXVlc3RVcmwucmVsYXRpdmUgPyByZXF1ZXN0VXJsLnBhdGggOiBzdHJpcFF1ZXJ5U3RyaW5nRnJvbVVybChyZXF1ZXN0VXJsLmhyZWYpKTtcblxuICAgICAgaWYgKCF0cmFuc2FjdGlvblNlcnZpY2UuZ2V0Q3VycmVudFRyYW5zYWN0aW9uKCkpIHtcbiAgICAgICAgdHJhbnNhY3Rpb25TZXJ2aWNlLnN0YXJ0VHJhbnNhY3Rpb24oc3Bhbk5hbWUsIEhUVFBfUkVRVUVTVF9UWVBFLCB7XG4gICAgICAgICAgbWFuYWdlZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNwYW4gPSB0cmFuc2FjdGlvblNlcnZpY2Uuc3RhcnRTcGFuKHNwYW5OYW1lLCAnZXh0ZXJuYWwuaHR0cCcsIHtcbiAgICAgICAgYmxvY2tpbmc6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXNwYW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXNEdEVuYWJsZWQgPSBjb25maWdTZXJ2aWNlLmdldCgnZGlzdHJpYnV0ZWRUcmFjaW5nJyk7XG4gICAgICB2YXIgZHRPcmlnaW5zID0gY29uZmlnU2VydmljZS5nZXQoJ2Rpc3RyaWJ1dGVkVHJhY2luZ09yaWdpbnMnKTtcbiAgICAgIHZhciBjdXJyZW50VXJsID0gbmV3IFVybCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICB2YXIgaXNTYW1lT3JpZ2luID0gY2hlY2tTYW1lT3JpZ2luKHJlcXVlc3RVcmwub3JpZ2luLCBjdXJyZW50VXJsLm9yaWdpbikgfHwgY2hlY2tTYW1lT3JpZ2luKHJlcXVlc3RVcmwub3JpZ2luLCBkdE9yaWdpbnMpO1xuICAgICAgdmFyIHRhcmdldCA9IGRhdGEudGFyZ2V0O1xuXG4gICAgICBpZiAoaXNEdEVuYWJsZWQgJiYgaXNTYW1lT3JpZ2luICYmIHRhcmdldCkge1xuICAgICAgICB0aGlzLmluamVjdER0SGVhZGVyKHNwYW4sIHRhcmdldCk7XG4gICAgICAgIHZhciBwcm9wYWdhdGVUcmFjZXN0YXRlID0gY29uZmlnU2VydmljZS5nZXQoJ3Byb3BhZ2F0ZVRyYWNlc3RhdGUnKTtcblxuICAgICAgICBpZiAocHJvcGFnYXRlVHJhY2VzdGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5qZWN0VFNIZWFkZXIoc3BhbiwgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dpblNlcnZpY2UuZGVidWcoXCJDb3VsZCBub3QgaW5qZWN0IGRpc3RyaWJ1dGVkIHRyYWNpbmcgaGVhZGVyIHRvIHRoZSByZXF1ZXN0IG9yaWdpbiAoJ1wiICsgcmVxdWVzdFVybC5vcmlnaW4gKyBcIicpIGZyb20gdGhlIGN1cnJlbnQgb3JpZ2luICgnXCIgKyBjdXJyZW50VXJsLm9yaWdpbiArIFwiJylcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLnN5bmMpIHtcbiAgICAgICAgc3Bhbi5zeW5jID0gZGF0YS5zeW5jO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnNwYW4gPSBzcGFuO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IElOVk9LRSkge1xuICAgICAgdmFyIF9kYXRhID0gdGFzay5kYXRhO1xuXG4gICAgICBpZiAoX2RhdGEgJiYgX2RhdGEuc3Bhbikge1xuICAgICAgICB2YXIgX3NwYW4gPSBfZGF0YS5zcGFuLFxuICAgICAgICAgICAgcmVzcG9uc2UgPSBfZGF0YS5yZXNwb25zZSxcbiAgICAgICAgICAgIF90YXJnZXQgPSBfZGF0YS50YXJnZXQ7XG4gICAgICAgIHZhciBzdGF0dXM7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXR1cyA9IF90YXJnZXQuc3RhdHVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG91dGNvbWU7XG5cbiAgICAgICAgaWYgKF9kYXRhLnN0YXR1cyAhPSAnYWJvcnQnICYmICFfZGF0YS5hYm9ydGVkKSB7XG4gICAgICAgICAgaWYgKHN0YXR1cyA+PSA0MDAgfHwgc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIG91dGNvbWUgPSBPVVRDT01FX0ZBSUxVUkU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dGNvbWUgPSBPVVRDT01FX1NVQ0NFU1M7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dGNvbWUgPSBPVVRDT01FX1VOS05PV047XG4gICAgICAgIH1cblxuICAgICAgICBfc3Bhbi5vdXRjb21lID0gb3V0Y29tZTtcbiAgICAgICAgdmFyIHRyID0gdHJhbnNhY3Rpb25TZXJ2aWNlLmdldEN1cnJlbnRUcmFuc2FjdGlvbigpO1xuXG4gICAgICAgIGlmICh0ciAmJiB0ci50eXBlID09PSBIVFRQX1JFUVVFU1RfVFlQRSkge1xuICAgICAgICAgIHRyLm91dGNvbWUgPSBvdXRjb21lO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNhY3Rpb25TZXJ2aWNlLmVuZFNwYW4oX3NwYW4sIF9kYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmluamVjdER0SGVhZGVyID0gZnVuY3Rpb24gaW5qZWN0RHRIZWFkZXIoc3BhbiwgdGFyZ2V0KSB7XG4gICAgdmFyIGhlYWRlck5hbWUgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldCgnZGlzdHJpYnV0ZWRUcmFjaW5nSGVhZGVyTmFtZScpO1xuXG4gICAgdmFyIGhlYWRlclZhbHVlID0gZ2V0RHRIZWFkZXJWYWx1ZShzcGFuKTtcbiAgICB2YXIgaXNIZWFkZXJWYWxpZCA9IGlzRHRIZWFkZXJWYWxpZChoZWFkZXJWYWx1ZSk7XG5cbiAgICBpZiAoaXNIZWFkZXJWYWxpZCAmJiBoZWFkZXJWYWx1ZSAmJiBoZWFkZXJOYW1lKSB7XG4gICAgICBzZXRSZXF1ZXN0SGVhZGVyKHRhcmdldCwgaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaW5qZWN0VFNIZWFkZXIgPSBmdW5jdGlvbiBpbmplY3RUU0hlYWRlcihzcGFuLCB0YXJnZXQpIHtcbiAgICB2YXIgaGVhZGVyVmFsdWUgPSBnZXRUU0hlYWRlclZhbHVlKHNwYW4pO1xuXG4gICAgaWYgKGhlYWRlclZhbHVlKSB7XG4gICAgICBzZXRSZXF1ZXN0SGVhZGVyKHRhcmdldCwgJ3RyYWNlc3RhdGUnLCBoZWFkZXJWYWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5leHRyYWN0RHRIZWFkZXIgPSBmdW5jdGlvbiBleHRyYWN0RHRIZWFkZXIodGFyZ2V0KSB7XG4gICAgdmFyIGNvbmZpZ1NlcnZpY2UgPSB0aGlzLl9jb25maWdTZXJ2aWNlO1xuICAgIHZhciBoZWFkZXJOYW1lID0gY29uZmlnU2VydmljZS5nZXQoJ2Rpc3RyaWJ1dGVkVHJhY2luZ0hlYWRlck5hbWUnKTtcblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBwYXJzZUR0SGVhZGVyVmFsdWUodGFyZ2V0W2hlYWRlck5hbWVdKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmZpbHRlclRyYW5zYWN0aW9uID0gZnVuY3Rpb24gZmlsdGVyVHJhbnNhY3Rpb24odHIpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0ci5kdXJhdGlvbigpO1xuXG4gICAgaWYgKCFkdXJhdGlvbikge1xuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcInRyYW5zYWN0aW9uKFwiICsgdHIuaWQgKyBcIiwgXCIgKyB0ci5uYW1lICsgXCIpIHdhcyBkaXNjYXJkZWQhIFwiO1xuXG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gMCkge1xuICAgICAgICAgIG1lc3NhZ2UgKz0gXCJUcmFuc2FjdGlvbiBkdXJhdGlvbiBpcyAwXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVzc2FnZSArPSBcIlRyYW5zYWN0aW9uIHdhc24ndCBlbmRlZFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9nZ2luU2VydmljZS5kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0ci5pc01hbmFnZWQoKSkge1xuICAgICAgaWYgKGR1cmF0aW9uID4gVFJBTlNBQ1RJT05fRFVSQVRJT05fVEhSRVNIT0xEKSB7XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgdGhpcy5fbG9nZ2luU2VydmljZS5kZWJ1ZyhcInRyYW5zYWN0aW9uKFwiICsgdHIuaWQgKyBcIiwgXCIgKyB0ci5uYW1lICsgXCIpIHdhcyBkaXNjYXJkZWQhIFRyYW5zYWN0aW9uIGR1cmF0aW9uIChcIiArIGR1cmF0aW9uICsgXCIpIGlzIGdyZWF0ZXIgdGhhbiBtYW5hZ2VkIHRyYW5zYWN0aW9uIHRocmVzaG9sZCAoXCIgKyBUUkFOU0FDVElPTl9EVVJBVElPTl9USFJFU0hPTEQgKyBcIilcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ci5zYW1wbGVkICYmIHRyLnNwYW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgIHRoaXMuX2xvZ2dpblNlcnZpY2UuZGVidWcoXCJ0cmFuc2FjdGlvbihcIiArIHRyLmlkICsgXCIsIFwiICsgdHIubmFtZSArIFwiKSB3YXMgZGlzY2FyZGVkISBUcmFuc2FjdGlvbiBkb2VzIG5vdCBoYXZlIGFueSBzcGFuc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlVHJhbnNhY3Rpb25EYXRhTW9kZWwgPSBmdW5jdGlvbiBjcmVhdGVUcmFuc2FjdGlvbkRhdGFNb2RlbCh0cmFuc2FjdGlvbikge1xuICAgIHZhciB0cmFuc2FjdGlvblN0YXJ0ID0gdHJhbnNhY3Rpb24uX3N0YXJ0O1xuICAgIHZhciBzcGFucyA9IHRyYW5zYWN0aW9uLnNwYW5zLm1hcChmdW5jdGlvbiAoc3Bhbikge1xuICAgICAgdmFyIHNwYW5EYXRhID0ge1xuICAgICAgICBpZDogc3Bhbi5pZCxcbiAgICAgICAgdHJhbnNhY3Rpb25faWQ6IHRyYW5zYWN0aW9uLmlkLFxuICAgICAgICBwYXJlbnRfaWQ6IHNwYW4ucGFyZW50SWQgfHwgdHJhbnNhY3Rpb24uaWQsXG4gICAgICAgIHRyYWNlX2lkOiB0cmFuc2FjdGlvbi50cmFjZUlkLFxuICAgICAgICBuYW1lOiBzcGFuLm5hbWUsXG4gICAgICAgIHR5cGU6IHNwYW4udHlwZSxcbiAgICAgICAgc3VidHlwZTogc3Bhbi5zdWJ0eXBlLFxuICAgICAgICBhY3Rpb246IHNwYW4uYWN0aW9uLFxuICAgICAgICBzeW5jOiBzcGFuLnN5bmMsXG4gICAgICAgIHN0YXJ0OiBwYXJzZUludChzcGFuLl9zdGFydCAtIHRyYW5zYWN0aW9uU3RhcnQpLFxuICAgICAgICBkdXJhdGlvbjogc3Bhbi5kdXJhdGlvbigpLFxuICAgICAgICBjb250ZXh0OiBzcGFuLmNvbnRleHQsXG4gICAgICAgIG91dGNvbWU6IHNwYW4ub3V0Y29tZSxcbiAgICAgICAgc2FtcGxlX3JhdGU6IHNwYW4uc2FtcGxlUmF0ZVxuICAgICAgfTtcbiAgICAgIHJldHVybiB0cnVuY2F0ZU1vZGVsKFNQQU5fTU9ERUwsIHNwYW5EYXRhKTtcbiAgICB9KTtcbiAgICB2YXIgdHJhbnNhY3Rpb25EYXRhID0ge1xuICAgICAgaWQ6IHRyYW5zYWN0aW9uLmlkLFxuICAgICAgcGFyZW50X2lkOiB0cmFuc2FjdGlvbi5wYXJlbnRJZCxcbiAgICAgIHRyYWNlX2lkOiB0cmFuc2FjdGlvbi50cmFjZUlkLFxuICAgICAgc2Vzc2lvbjogdHJhbnNhY3Rpb24uc2Vzc2lvbixcbiAgICAgIG5hbWU6IHRyYW5zYWN0aW9uLm5hbWUsXG4gICAgICB0eXBlOiB0cmFuc2FjdGlvbi50eXBlLFxuICAgICAgZHVyYXRpb246IHRyYW5zYWN0aW9uLmR1cmF0aW9uKCksXG4gICAgICBzcGFuczogc3BhbnMsXG4gICAgICBjb250ZXh0OiB0cmFuc2FjdGlvbi5jb250ZXh0LFxuICAgICAgbWFya3M6IHRyYW5zYWN0aW9uLm1hcmtzLFxuICAgICAgYnJlYWtkb3duOiB0cmFuc2FjdGlvbi5icmVha2Rvd25UaW1pbmdzLFxuICAgICAgc3Bhbl9jb3VudDoge1xuICAgICAgICBzdGFydGVkOiBzcGFucy5sZW5ndGhcbiAgICAgIH0sXG4gICAgICBzYW1wbGVkOiB0cmFuc2FjdGlvbi5zYW1wbGVkLFxuICAgICAgc2FtcGxlX3JhdGU6IHRyYW5zYWN0aW9uLnNhbXBsZVJhdGUsXG4gICAgICBleHBlcmllbmNlOiB0cmFuc2FjdGlvbi5leHBlcmllbmNlLFxuICAgICAgb3V0Y29tZTogdHJhbnNhY3Rpb24ub3V0Y29tZVxuICAgIH07XG4gICAgcmV0dXJuIHRydW5jYXRlTW9kZWwoVFJBTlNBQ1RJT05fTU9ERUwsIHRyYW5zYWN0aW9uRGF0YSk7XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZVRyYW5zYWN0aW9uUGF5bG9hZCA9IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zYWN0aW9uUGF5bG9hZCh0cmFuc2FjdGlvbikge1xuICAgIHZhciBhZGp1c3RlZFRyYW5zYWN0aW9uID0gYWRqdXN0VHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xuICAgIHZhciBmaWx0ZXJlZCA9IHRoaXMuZmlsdGVyVHJhbnNhY3Rpb24oYWRqdXN0ZWRUcmFuc2FjdGlvbik7XG5cbiAgICBpZiAoZmlsdGVyZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRyYW5zYWN0aW9uRGF0YU1vZGVsKHRyYW5zYWN0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25maWdTZXJ2aWNlLmRpc3BhdGNoRXZlbnQoVFJBTlNBQ1RJT05fSUdOT1JFKTtcbiAgfTtcblxuICByZXR1cm4gUGVyZm9ybWFuY2VNb25pdG9yaW5nO1xufSgpO1xuXG5leHBvcnQgeyBQZXJmb3JtYW5jZU1vbml0b3JpbmcgYXMgZGVmYXVsdCB9OyIsImltcG9ydCB7IGdlbmVyYXRlUmFuZG9tSWQsIHNldExhYmVsLCBtZXJnZSwgZ2V0RHVyYXRpb24sIGdldFRpbWUgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgTkFNRV9VTktOT1dOLCBUWVBFX0NVU1RPTSB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuXG52YXIgU3BhbkJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNwYW5CYXNlKG5hbWUsIHR5cGUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICBuYW1lID0gTkFNRV9VTktOT1dOO1xuICAgIH1cblxuICAgIGlmICghdHlwZSkge1xuICAgICAgdHlwZSA9IFRZUEVfQ1VTVE9NO1xuICAgIH1cblxuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkIHx8IGdlbmVyYXRlUmFuZG9tSWQoMTYpO1xuICAgIHRoaXMudHJhY2VJZCA9IG9wdGlvbnMudHJhY2VJZDtcbiAgICB0aGlzLnNhbXBsZWQgPSBvcHRpb25zLnNhbXBsZWQ7XG4gICAgdGhpcy5zYW1wbGVSYXRlID0gb3B0aW9ucy5zYW1wbGVSYXRlO1xuICAgIHRoaXMudGltZXN0YW1wID0gb3B0aW9ucy50aW1lc3RhbXA7XG4gICAgdGhpcy5fc3RhcnQgPSBnZXRUaW1lKG9wdGlvbnMuc3RhcnRUaW1lKTtcbiAgICB0aGlzLl9lbmQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMub3V0Y29tZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uRW5kID0gb3B0aW9ucy5vbkVuZDtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTcGFuQmFzZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmVuc3VyZUNvbnRleHQgPSBmdW5jdGlvbiBlbnN1cmVDb250ZXh0KCkge1xuICAgIGlmICghdGhpcy5jb250ZXh0KSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSB7fTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmFkZExhYmVscyA9IGZ1bmN0aW9uIGFkZExhYmVscyh0YWdzKSB7XG4gICAgdGhpcy5lbnN1cmVDb250ZXh0KCk7XG4gICAgdmFyIGN0eCA9IHRoaXMuY29udGV4dDtcblxuICAgIGlmICghY3R4LnRhZ3MpIHtcbiAgICAgIGN0eC50YWdzID0ge307XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0YWdzKTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBzZXRMYWJlbChrLCB0YWdzW2tdLCBjdHgudGFncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZENvbnRleHQgPSBmdW5jdGlvbiBhZGRDb250ZXh0KCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjb250ZXh0ID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgY29udGV4dFtfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB0aGlzLmVuc3VyZUNvbnRleHQoKTtcbiAgICB0aGlzLmNvbnRleHQgPSBtZXJnZS5hcHBseSh2b2lkIDAsIFt0aGlzLmNvbnRleHRdLmNvbmNhdChjb250ZXh0KSk7XG4gIH07XG5cbiAgX3Byb3RvLmVuZCA9IGZ1bmN0aW9uIGVuZChlbmRUaW1lKSB7XG4gICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9lbmQgPSBnZXRUaW1lKGVuZFRpbWUpO1xuICAgIHRoaXMuY2FsbE9uRW5kKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNhbGxPbkVuZCA9IGZ1bmN0aW9uIGNhbGxPbkVuZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25FbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub25FbmQodGhpcyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5kdXJhdGlvbiA9IGZ1bmN0aW9uIGR1cmF0aW9uKCkge1xuICAgIHJldHVybiBnZXREdXJhdGlvbih0aGlzLl9zdGFydCwgdGhpcy5fZW5kKTtcbiAgfTtcblxuICByZXR1cm4gU3BhbkJhc2U7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNwYW5CYXNlOyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5pbXBvcnQgU3BhbkJhc2UgZnJvbSAnLi9zcGFuLWJhc2UnO1xuaW1wb3J0IHsgYWRkU3BhbkNvbnRleHQgfSBmcm9tICcuLi9jb21tb24vY29udGV4dCc7XG5cbnZhciBTcGFuID0gZnVuY3Rpb24gKF9TcGFuQmFzZSkge1xuICBfaW5oZXJpdHNMb29zZShTcGFuLCBfU3BhbkJhc2UpO1xuXG4gIGZ1bmN0aW9uIFNwYW4obmFtZSwgdHlwZSwgb3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX1NwYW5CYXNlLmNhbGwodGhpcywgbmFtZSwgdHlwZSwgb3B0aW9ucykgfHwgdGhpcztcbiAgICBfdGhpcy5wYXJlbnRJZCA9IF90aGlzLm9wdGlvbnMucGFyZW50SWQ7XG4gICAgX3RoaXMuc3VidHlwZSA9IHVuZGVmaW5lZDtcbiAgICBfdGhpcy5hY3Rpb24gPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAoX3RoaXMudHlwZS5pbmRleE9mKCcuJykgIT09IC0xKSB7XG4gICAgICB2YXIgZmllbGRzID0gX3RoaXMudHlwZS5zcGxpdCgnLicsIDMpO1xuXG4gICAgICBfdGhpcy50eXBlID0gZmllbGRzWzBdO1xuICAgICAgX3RoaXMuc3VidHlwZSA9IGZpZWxkc1sxXTtcbiAgICAgIF90aGlzLmFjdGlvbiA9IGZpZWxkc1syXTtcbiAgICB9XG5cbiAgICBfdGhpcy5zeW5jID0gX3RoaXMub3B0aW9ucy5zeW5jO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTcGFuLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZW5kID0gZnVuY3Rpb24gZW5kKGVuZFRpbWUsIGRhdGEpIHtcbiAgICBfU3BhbkJhc2UucHJvdG90eXBlLmVuZC5jYWxsKHRoaXMsIGVuZFRpbWUpO1xuXG4gICAgYWRkU3BhbkNvbnRleHQodGhpcywgZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIFNwYW47XG59KFNwYW5CYXNlKTtcblxuZXhwb3J0IGRlZmF1bHQgU3BhbjsiLCJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnLi4vY29tbW9uL3BvbHlmaWxscyc7XG5pbXBvcnQgVHJhbnNhY3Rpb24gZnJvbSAnLi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBQZXJmRW50cnlSZWNvcmRlciwgY2FwdHVyZU9ic2VydmVyRW50cmllcywgbWV0cmljcywgY3JlYXRlVG90YWxCbG9ja2luZ1RpbWVTcGFuIH0gZnJvbSAnLi9tZXRyaWNzL21ldHJpY3MnO1xuaW1wb3J0IHsgZXh0ZW5kLCBnZXRFYXJsaWVzdFNwYW4sIGdldExhdGVzdE5vblhIUlNwYW4sIGdldExhdGVzdFhIUlNwYW4sIGlzUGVyZlR5cGVTdXBwb3J0ZWQsIGdlbmVyYXRlUmFuZG9tSWQgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuaW1wb3J0IHsgY2FwdHVyZU5hdmlnYXRpb24gfSBmcm9tICcuL25hdmlnYXRpb24vY2FwdHVyZS1uYXZpZ2F0aW9uJztcbmltcG9ydCB7IFBBR0VfTE9BRCwgTkFNRV9VTktOT1dOLCBUUkFOU0FDVElPTl9TVEFSVCwgVFJBTlNBQ1RJT05fRU5ELCBUUkFOU0FDVElPTl9JR05PUkUsIFRFTVBPUkFSWV9UWVBFLCBUUkFOU0FDVElPTl9UWVBFX09SREVSLCBMQVJHRVNUX0NPTlRFTlRGVUxfUEFJTlQsIExPTkdfVEFTSywgUEFJTlQsIFRSVU5DQVRFRF9UWVBFLCBGSVJTVF9JTlBVVCwgTEFZT1VUX1NISUZULCBTRVNTSU9OX1RJTUVPVVQsIFBBR0VfTE9BRF9ERUxBWSB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgYWRkVHJhbnNhY3Rpb25Db250ZXh0IH0gZnJvbSAnLi4vY29tbW9uL2NvbnRleHQnO1xuaW1wb3J0IHsgX19ERVZfXywgc3RhdGUgfSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQgeyBzbHVnaWZ5VXJsIH0gZnJvbSAnLi4vY29tbW9uL3VybCc7XG5cbnZhciBUcmFuc2FjdGlvblNlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRyYW5zYWN0aW9uU2VydmljZShsb2dnZXIsIGNvbmZpZykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMuY3VycmVudFRyYW5zYWN0aW9uID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmVzcEludGVydmFsSWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWNvcmRlciA9IG5ldyBQZXJmRW50cnlSZWNvcmRlcihmdW5jdGlvbiAobGlzdCkge1xuICAgICAgdmFyIHRyID0gX3RoaXMuZ2V0Q3VycmVudFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgIGlmICh0ciAmJiB0ci5jYXB0dXJlVGltaW5ncykge1xuICAgICAgICB2YXIgX3RyJHNwYW5zO1xuXG4gICAgICAgIHZhciBpc0hhcmROYXZpZ2F0aW9uID0gdHIudHlwZSA9PT0gUEFHRV9MT0FEO1xuXG4gICAgICAgIHZhciBfY2FwdHVyZU9ic2VydmVyRW50cmkgPSBjYXB0dXJlT2JzZXJ2ZXJFbnRyaWVzKGxpc3QsIHtcbiAgICAgICAgICBpc0hhcmROYXZpZ2F0aW9uOiBpc0hhcmROYXZpZ2F0aW9uLFxuICAgICAgICAgIHRyU3RhcnQ6IGlzSGFyZE5hdmlnYXRpb24gPyAwIDogdHIuX3N0YXJ0XG4gICAgICAgIH0pLFxuICAgICAgICAgICAgc3BhbnMgPSBfY2FwdHVyZU9ic2VydmVyRW50cmkuc3BhbnMsXG4gICAgICAgICAgICBtYXJrcyA9IF9jYXB0dXJlT2JzZXJ2ZXJFbnRyaS5tYXJrcztcblxuICAgICAgICAoX3RyJHNwYW5zID0gdHIuc3BhbnMpLnB1c2guYXBwbHkoX3RyJHNwYW5zLCBzcGFucyk7XG5cbiAgICAgICAgdHIuYWRkTWFya3Moe1xuICAgICAgICAgIGFnZW50OiBtYXJrc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBUcmFuc2FjdGlvblNlcnZpY2UucHJvdG90eXBlO1xuXG4gIF9wcm90by5jcmVhdGVDdXJyZW50VHJhbnNhY3Rpb24gPSBmdW5jdGlvbiBjcmVhdGVDdXJyZW50VHJhbnNhY3Rpb24obmFtZSwgdHlwZSwgb3B0aW9ucykge1xuICAgIHZhciB0ciA9IG5ldyBUcmFuc2FjdGlvbihuYW1lLCB0eXBlLCBvcHRpb25zKTtcbiAgICB0aGlzLmN1cnJlbnRUcmFuc2FjdGlvbiA9IHRyO1xuICAgIHJldHVybiB0cjtcbiAgfTtcblxuICBfcHJvdG8uZ2V0Q3VycmVudFRyYW5zYWN0aW9uID0gZnVuY3Rpb24gZ2V0Q3VycmVudFRyYW5zYWN0aW9uKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRUcmFuc2FjdGlvbiAmJiAhdGhpcy5jdXJyZW50VHJhbnNhY3Rpb24uZW5kZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRUcmFuc2FjdGlvbjtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZU9wdGlvbnMgPSBmdW5jdGlvbiBjcmVhdGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB2YXIgY29uZmlnID0gdGhpcy5fY29uZmlnLmNvbmZpZztcbiAgICB2YXIgcHJlc2V0T3B0aW9ucyA9IHtcbiAgICAgIHRyYW5zYWN0aW9uU2FtcGxlUmF0ZTogY29uZmlnLnRyYW5zYWN0aW9uU2FtcGxlUmF0ZVxuICAgIH07XG4gICAgdmFyIHBlcmZPcHRpb25zID0gZXh0ZW5kKHByZXNldE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHBlcmZPcHRpb25zLm1hbmFnZWQpIHtcbiAgICAgIHBlcmZPcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgICAgcGFnZUxvYWRUcmFjZUlkOiBjb25maWcucGFnZUxvYWRUcmFjZUlkLFxuICAgICAgICBwYWdlTG9hZFNhbXBsZWQ6IGNvbmZpZy5wYWdlTG9hZFNhbXBsZWQsXG4gICAgICAgIHBhZ2VMb2FkU3BhbklkOiBjb25maWcucGFnZUxvYWRTcGFuSWQsXG4gICAgICAgIHBhZ2VMb2FkVHJhbnNhY3Rpb25OYW1lOiBjb25maWcucGFnZUxvYWRUcmFuc2FjdGlvbk5hbWUsXG4gICAgICAgIHBhZ2VMb2FkUGFyZW50SWQ6IGNvbmZpZy5wYWdlTG9hZFBhcmVudElkXG4gICAgICB9LCBwZXJmT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlcmZPcHRpb25zO1xuICB9O1xuXG4gIF9wcm90by5zdGFydE1hbmFnZWRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIHN0YXJ0TWFuYWdlZFRyYW5zYWN0aW9uKG5hbWUsIHR5cGUsIHBlcmZPcHRpb25zKSB7XG4gICAgdmFyIHRyID0gdGhpcy5nZXRDdXJyZW50VHJhbnNhY3Rpb24oKTtcbiAgICB2YXIgaXNSZWRlZmluZWQgPSBmYWxzZTtcblxuICAgIGlmICghdHIpIHtcbiAgICAgIHRyID0gdGhpcy5jcmVhdGVDdXJyZW50VHJhbnNhY3Rpb24obmFtZSwgdHlwZSwgcGVyZk9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHIuY2FuUmV1c2UoKSAmJiBwZXJmT3B0aW9ucy5jYW5SZXVzZSkge1xuICAgICAgdmFyIHJlZGVmaW5lVHlwZSA9IHRyLnR5cGU7XG4gICAgICB2YXIgY3VycmVudFR5cGVPcmRlciA9IFRSQU5TQUNUSU9OX1RZUEVfT1JERVIuaW5kZXhPZih0ci50eXBlKTtcbiAgICAgIHZhciByZWRlZmluZVR5cGVPcmRlciA9IFRSQU5TQUNUSU9OX1RZUEVfT1JERVIuaW5kZXhPZih0eXBlKTtcblxuICAgICAgaWYgKGN1cnJlbnRUeXBlT3JkZXIgPj0gMCAmJiByZWRlZmluZVR5cGVPcmRlciA8IGN1cnJlbnRUeXBlT3JkZXIpIHtcbiAgICAgICAgcmVkZWZpbmVUeXBlID0gdHlwZTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmRlYnVnKFwicmVkZWZpbmluZyB0cmFuc2FjdGlvbihcIiArIHRyLmlkICsgXCIsIFwiICsgdHIubmFtZSArIFwiLCBcIiArIHRyLnR5cGUgKyBcIilcIiwgJ3RvJywgXCIoXCIgKyAobmFtZSB8fCB0ci5uYW1lKSArIFwiLCBcIiArIHJlZGVmaW5lVHlwZSArIFwiKVwiLCB0cik7XG4gICAgICB9XG5cbiAgICAgIHRyLnJlZGVmaW5lKG5hbWUsIHJlZGVmaW5lVHlwZSwgcGVyZk9wdGlvbnMpO1xuICAgICAgaXNSZWRlZmluZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICB0aGlzLl9sb2dnZXIuZGVidWcoXCJlbmRpbmcgcHJldmlvdXMgdHJhbnNhY3Rpb24oXCIgKyB0ci5pZCArIFwiLCBcIiArIHRyLm5hbWUgKyBcIilcIiwgdHIpO1xuICAgICAgfVxuXG4gICAgICB0ci5lbmQoKTtcbiAgICAgIHRyID0gdGhpcy5jcmVhdGVDdXJyZW50VHJhbnNhY3Rpb24obmFtZSwgdHlwZSwgcGVyZk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0ci50eXBlID09PSBQQUdFX0xPQUQpIHtcbiAgICAgIGlmICghaXNSZWRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydChMQVJHRVNUX0NPTlRFTlRGVUxfUEFJTlQpO1xuICAgICAgICB0aGlzLnJlY29yZGVyLnN0YXJ0KFBBSU5UKTtcbiAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydChGSVJTVF9JTlBVVCk7XG4gICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoTEFZT1VUX1NISUZUKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBlcmZPcHRpb25zLnBhZ2VMb2FkVHJhY2VJZCkge1xuICAgICAgICB0ci50cmFjZUlkID0gcGVyZk9wdGlvbnMucGFnZUxvYWRUcmFjZUlkO1xuICAgICAgfVxuXG4gICAgICBpZiAocGVyZk9wdGlvbnMucGFnZUxvYWRTYW1wbGVkKSB7XG4gICAgICAgIHRyLnNhbXBsZWQgPSBwZXJmT3B0aW9ucy5wYWdlTG9hZFNhbXBsZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ci5uYW1lID09PSBOQU1FX1VOS05PV04gJiYgcGVyZk9wdGlvbnMucGFnZUxvYWRUcmFuc2FjdGlvbk5hbWUpIHtcbiAgICAgICAgdHIubmFtZSA9IHBlcmZPcHRpb25zLnBhZ2VMb2FkVHJhbnNhY3Rpb25OYW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaXNSZWRlZmluZWQgJiYgdGhpcy5fY29uZmlnLmdldCgnbW9uaXRvckxvbmd0YXNrcycpKSB7XG4gICAgICB0aGlzLnJlY29yZGVyLnN0YXJ0KExPTkdfVEFTSyk7XG4gICAgfVxuXG4gICAgaWYgKHRyLnNhbXBsZWQpIHtcbiAgICAgIHRyLmNhcHR1cmVUaW1pbmdzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHI7XG4gIH07XG5cbiAgX3Byb3RvLnN0YXJ0VHJhbnNhY3Rpb24gPSBmdW5jdGlvbiBzdGFydFRyYW5zYWN0aW9uKG5hbWUsIHR5cGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBwZXJmT3B0aW9ucyA9IHRoaXMuY3JlYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICB2YXIgdHI7XG4gICAgdmFyIGZpcmVPbnN0YXJ0SG9vayA9IHRydWU7XG5cbiAgICBpZiAocGVyZk9wdGlvbnMubWFuYWdlZCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnRUcmFuc2FjdGlvbjtcbiAgICAgIHRyID0gdGhpcy5zdGFydE1hbmFnZWRUcmFuc2FjdGlvbihuYW1lLCB0eXBlLCBwZXJmT3B0aW9ucyk7XG5cbiAgICAgIGlmIChjdXJyZW50ID09PSB0cikge1xuICAgICAgICBmaXJlT25zdGFydEhvb2sgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHIgPSBuZXcgVHJhbnNhY3Rpb24obmFtZSwgdHlwZSwgcGVyZk9wdGlvbnMpO1xuICAgIH1cblxuICAgIHRyLm9uRW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzMi5oYW5kbGVUcmFuc2FjdGlvbkVuZCh0cik7XG4gICAgfTtcblxuICAgIGlmIChmaXJlT25zdGFydEhvb2spIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5kZWJ1ZyhcInN0YXJ0VHJhbnNhY3Rpb24oXCIgKyB0ci5pZCArIFwiLCBcIiArIHRyLm5hbWUgKyBcIiwgXCIgKyB0ci50eXBlICsgXCIpXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jb25maWcuZXZlbnRzLnNlbmQoVFJBTlNBQ1RJT05fU1RBUlQsIFt0cl0pO1xuICAgIH1cblxuICAgIHJldHVybiB0cjtcbiAgfTtcblxuICBfcHJvdG8uaGFuZGxlVHJhbnNhY3Rpb25FbmQgPSBmdW5jdGlvbiBoYW5kbGVUcmFuc2FjdGlvbkVuZCh0cikge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5yZWNvcmRlci5zdG9wKCk7XG4gICAgdmFyIGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbmFtZSA9IHRyLm5hbWUsXG4gICAgICAgICAgdHlwZSA9IHRyLnR5cGU7XG4gICAgICB2YXIgbGFzdEhpZGRlblN0YXJ0ID0gc3RhdGUubGFzdEhpZGRlblN0YXJ0O1xuXG4gICAgICBpZiAobGFzdEhpZGRlblN0YXJ0ID49IHRyLl9zdGFydCkge1xuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgIF90aGlzMy5fbG9nZ2VyLmRlYnVnKFwidHJhbnNhY3Rpb24oXCIgKyB0ci5pZCArIFwiLCBcIiArIG5hbWUgKyBcIiwgXCIgKyB0eXBlICsgXCIpIHdhcyBkaXNjYXJkZWQhIFRoZSBwYWdlIHdhcyBoaWRkZW4gZHVyaW5nIHRoZSB0cmFuc2FjdGlvbiFcIik7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczMuX2NvbmZpZy5kaXNwYXRjaEV2ZW50KFRSQU5TQUNUSU9OX0lHTk9SRSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMzLnNob3VsZElnbm9yZVRyYW5zYWN0aW9uKG5hbWUpIHx8IHR5cGUgPT09IFRFTVBPUkFSWV9UWVBFKSB7XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgX3RoaXMzLl9sb2dnZXIuZGVidWcoXCJ0cmFuc2FjdGlvbihcIiArIHRyLmlkICsgXCIsIFwiICsgbmFtZSArIFwiLCBcIiArIHR5cGUgKyBcIikgaXMgaWdub3JlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMy5fY29uZmlnLmRpc3BhdGNoRXZlbnQoVFJBTlNBQ1RJT05fSUdOT1JFKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSBQQUdFX0xPQUQpIHtcbiAgICAgICAgdmFyIHBhZ2VMb2FkVHJhbnNhY3Rpb25OYW1lID0gX3RoaXMzLl9jb25maWcuZ2V0KCdwYWdlTG9hZFRyYW5zYWN0aW9uTmFtZScpO1xuXG4gICAgICAgIGlmIChuYW1lID09PSBOQU1FX1VOS05PV04gJiYgcGFnZUxvYWRUcmFuc2FjdGlvbk5hbWUpIHtcbiAgICAgICAgICB0ci5uYW1lID0gcGFnZUxvYWRUcmFuc2FjdGlvbk5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHIuY2FwdHVyZVRpbWluZ3MpIHtcbiAgICAgICAgICB2YXIgY2xzID0gbWV0cmljcy5jbHMsXG4gICAgICAgICAgICAgIGZpZCA9IG1ldHJpY3MuZmlkLFxuICAgICAgICAgICAgICB0YnQgPSBtZXRyaWNzLnRidCxcbiAgICAgICAgICAgICAgbG9uZ3Rhc2sgPSBtZXRyaWNzLmxvbmd0YXNrO1xuXG4gICAgICAgICAgaWYgKHRidC5kdXJhdGlvbiA+IDApIHtcbiAgICAgICAgICAgIHRyLnNwYW5zLnB1c2goY3JlYXRlVG90YWxCbG9ja2luZ1RpbWVTcGFuKHRidCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyLmV4cGVyaWVuY2UgPSB7fTtcblxuICAgICAgICAgIGlmIChpc1BlcmZUeXBlU3VwcG9ydGVkKExPTkdfVEFTSykpIHtcbiAgICAgICAgICAgIHRyLmV4cGVyaWVuY2UudGJ0ID0gdGJ0LmR1cmF0aW9uO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc1BlcmZUeXBlU3VwcG9ydGVkKExBWU9VVF9TSElGVCkpIHtcbiAgICAgICAgICAgIHRyLmV4cGVyaWVuY2UuY2xzID0gY2xzLnNjb3JlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmaWQgPiAwKSB7XG4gICAgICAgICAgICB0ci5leHBlcmllbmNlLmZpZCA9IGZpZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobG9uZ3Rhc2suY291bnQgPiAwKSB7XG4gICAgICAgICAgICB0ci5leHBlcmllbmNlLmxvbmd0YXNrID0ge1xuICAgICAgICAgICAgICBjb3VudDogbG9uZ3Rhc2suY291bnQsXG4gICAgICAgICAgICAgIHN1bTogbG9uZ3Rhc2suZHVyYXRpb24sXG4gICAgICAgICAgICAgIG1heDogbG9uZ3Rhc2subWF4XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMy5zZXRTZXNzaW9uKHRyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRyLm5hbWUgPT09IE5BTUVfVU5LTk9XTikge1xuICAgICAgICB0ci5uYW1lID0gc2x1Z2lmeVVybChjdXJyZW50VXJsKTtcbiAgICAgIH1cblxuICAgICAgY2FwdHVyZU5hdmlnYXRpb24odHIpO1xuXG4gICAgICBfdGhpczMuYWRqdXN0VHJhbnNhY3Rpb25UaW1lKHRyKTtcblxuICAgICAgdmFyIGJyZWFrZG93bk1ldHJpY3MgPSBfdGhpczMuX2NvbmZpZy5nZXQoJ2JyZWFrZG93bk1ldHJpY3MnKTtcblxuICAgICAgaWYgKGJyZWFrZG93bk1ldHJpY3MpIHtcbiAgICAgICAgdHIuY2FwdHVyZUJyZWFrZG93bigpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29uZmlnQ29udGV4dCA9IF90aGlzMy5fY29uZmlnLmdldCgnY29udGV4dCcpO1xuXG4gICAgICBhZGRUcmFuc2FjdGlvbkNvbnRleHQodHIsIGNvbmZpZ0NvbnRleHQpO1xuXG4gICAgICBfdGhpczMuX2NvbmZpZy5ldmVudHMuc2VuZChUUkFOU0FDVElPTl9FTkQsIFt0cl0pO1xuXG4gICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICBfdGhpczMuX2xvZ2dlci5kZWJ1ZyhcImVuZCB0cmFuc2FjdGlvbihcIiArIHRyLmlkICsgXCIsIFwiICsgdHIubmFtZSArIFwiLCBcIiArIHRyLnR5cGUgKyBcIilcIiwgdHIpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIF90aGlzMy5fbG9nZ2VyLmRlYnVnKFwiZXJyb3IgZW5kaW5nIHRyYW5zYWN0aW9uKFwiICsgdHIuaWQgKyBcIiwgXCIgKyB0ci5uYW1lICsgXCIpXCIsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLnNldFNlc3Npb24gPSBmdW5jdGlvbiBzZXRTZXNzaW9uKHRyKSB7XG4gICAgdmFyIHNlc3Npb24gPSB0aGlzLl9jb25maWcuZ2V0KCdzZXNzaW9uJyk7XG5cbiAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgaWYgKHR5cGVvZiBzZXNzaW9uID09ICdib29sZWFuJykge1xuICAgICAgICB0ci5zZXNzaW9uID0ge1xuICAgICAgICAgIGlkOiBnZW5lcmF0ZVJhbmRvbUlkKDE2KSxcbiAgICAgICAgICBzZXF1ZW5jZTogMVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNlc3Npb24udGltZXN0YW1wICYmIERhdGUubm93KCkgLSBzZXNzaW9uLnRpbWVzdGFtcCA+IFNFU1NJT05fVElNRU9VVCkge1xuICAgICAgICAgIHRyLnNlc3Npb24gPSB7XG4gICAgICAgICAgICBpZDogZ2VuZXJhdGVSYW5kb21JZCgxNiksXG4gICAgICAgICAgICBzZXF1ZW5jZTogMVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHIuc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgIGlkOiBzZXNzaW9uLmlkLFxuICAgICAgICAgICAgc2VxdWVuY2U6IHNlc3Npb24uc2VxdWVuY2UgPyBzZXNzaW9uLnNlcXVlbmNlICsgMSA6IDFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBzZXNzaW9uQ29uZmlnID0ge1xuICAgICAgICBzZXNzaW9uOiB7XG4gICAgICAgICAgaWQ6IHRyLnNlc3Npb24uaWQsXG4gICAgICAgICAgc2VxdWVuY2U6IHRyLnNlc3Npb24uc2VxdWVuY2UsXG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2NvbmZpZy5zZXRDb25maWcoc2Vzc2lvbkNvbmZpZyk7XG5cbiAgICAgIHRoaXMuX2NvbmZpZy5zZXRMb2NhbENvbmZpZyhzZXNzaW9uQ29uZmlnLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmFkanVzdFRyYW5zYWN0aW9uVGltZSA9IGZ1bmN0aW9uIGFkanVzdFRyYW5zYWN0aW9uVGltZSh0cmFuc2FjdGlvbikge1xuICAgIHZhciBzcGFucyA9IHRyYW5zYWN0aW9uLnNwYW5zO1xuICAgIHZhciBlYXJsaWVzdFNwYW4gPSBnZXRFYXJsaWVzdFNwYW4oc3BhbnMpO1xuXG4gICAgaWYgKGVhcmxpZXN0U3BhbiAmJiBlYXJsaWVzdFNwYW4uX3N0YXJ0IDwgdHJhbnNhY3Rpb24uX3N0YXJ0KSB7XG4gICAgICB0cmFuc2FjdGlvbi5fc3RhcnQgPSBlYXJsaWVzdFNwYW4uX3N0YXJ0O1xuICAgIH1cblxuICAgIHZhciBsYXRlc3RTcGFuID0gZ2V0TGF0ZXN0Tm9uWEhSU3BhbihzcGFucykgfHwge307XG4gICAgdmFyIGxhdGVzdFNwYW5FbmQgPSBsYXRlc3RTcGFuLl9lbmQgfHwgMDtcblxuICAgIGlmICh0cmFuc2FjdGlvbi50eXBlID09PSBQQUdFX0xPQUQpIHtcbiAgICAgIHZhciB0cmFuc2FjdGlvbkVuZFdpdGhvdXREZWxheSA9IHRyYW5zYWN0aW9uLl9lbmQgLSBQQUdFX0xPQURfREVMQVk7XG4gICAgICB2YXIgbGNwID0gbWV0cmljcy5sY3AgfHwgMDtcbiAgICAgIHZhciBsYXRlc3RYSFJTcGFuID0gZ2V0TGF0ZXN0WEhSU3BhbihzcGFucykgfHwge307XG4gICAgICB2YXIgbGF0ZXN0WEhSU3BhbkVuZCA9IGxhdGVzdFhIUlNwYW4uX2VuZCB8fCAwO1xuICAgICAgdHJhbnNhY3Rpb24uX2VuZCA9IE1hdGgubWF4KGxhdGVzdFNwYW5FbmQsIGxhdGVzdFhIUlNwYW5FbmQsIGxjcCwgdHJhbnNhY3Rpb25FbmRXaXRob3V0RGVsYXkpO1xuICAgIH0gZWxzZSBpZiAobGF0ZXN0U3BhbkVuZCA+IHRyYW5zYWN0aW9uLl9lbmQpIHtcbiAgICAgIHRyYW5zYWN0aW9uLl9lbmQgPSBsYXRlc3RTcGFuRW5kO1xuICAgIH1cblxuICAgIHRoaXMudHJ1bmNhdGVTcGFucyhzcGFucywgdHJhbnNhY3Rpb24uX2VuZCk7XG4gIH07XG5cbiAgX3Byb3RvLnRydW5jYXRlU3BhbnMgPSBmdW5jdGlvbiB0cnVuY2F0ZVNwYW5zKHNwYW5zLCB0cmFuc2FjdGlvbkVuZCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzcGFuID0gc3BhbnNbaV07XG5cbiAgICAgIGlmIChzcGFuLl9lbmQgPiB0cmFuc2FjdGlvbkVuZCkge1xuICAgICAgICBzcGFuLl9lbmQgPSB0cmFuc2FjdGlvbkVuZDtcbiAgICAgICAgc3Bhbi50eXBlICs9IFRSVU5DQVRFRF9UWVBFO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3Bhbi5fc3RhcnQgPiB0cmFuc2FjdGlvbkVuZCkge1xuICAgICAgICBzcGFuLl9zdGFydCA9IHRyYW5zYWN0aW9uRW5kO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uc2hvdWxkSWdub3JlVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiBzaG91bGRJZ25vcmVUcmFuc2FjdGlvbih0cmFuc2FjdGlvbk5hbWUpIHtcbiAgICB2YXIgaWdub3JlTGlzdCA9IHRoaXMuX2NvbmZpZy5nZXQoJ2lnbm9yZVRyYW5zYWN0aW9ucycpO1xuXG4gICAgaWYgKGlnbm9yZUxpc3QgJiYgaWdub3JlTGlzdC5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWdub3JlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGlnbm9yZUxpc3RbaV07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50LnRlc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC50ZXN0KHRyYW5zYWN0aW9uTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSB0cmFuc2FjdGlvbk5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBfcHJvdG8uc3RhcnRTcGFuID0gZnVuY3Rpb24gc3RhcnRTcGFuKG5hbWUsIHR5cGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgdHIgPSB0aGlzLmdldEN1cnJlbnRUcmFuc2FjdGlvbigpO1xuXG4gICAgaWYgKCF0cikge1xuICAgICAgdHIgPSB0aGlzLmNyZWF0ZUN1cnJlbnRUcmFuc2FjdGlvbih1bmRlZmluZWQsIFRFTVBPUkFSWV9UWVBFLCB0aGlzLmNyZWF0ZU9wdGlvbnMoe1xuICAgICAgICBjYW5SZXVzZTogdHJ1ZSxcbiAgICAgICAgbWFuYWdlZDogdHJ1ZVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHZhciBzcGFuID0gdHIuc3RhcnRTcGFuKG5hbWUsIHR5cGUsIG9wdGlvbnMpO1xuXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIHRoaXMuX2xvZ2dlci5kZWJ1ZyhcInN0YXJ0U3BhbihcIiArIG5hbWUgKyBcIiwgXCIgKyBzcGFuLnR5cGUgKyBcIilcIiwgXCJvbiB0cmFuc2FjdGlvbihcIiArIHRyLmlkICsgXCIsIFwiICsgdHIubmFtZSArIFwiKVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BhbjtcbiAgfTtcblxuICBfcHJvdG8uZW5kU3BhbiA9IGZ1bmN0aW9uIGVuZFNwYW4oc3BhbiwgY29udGV4dCkge1xuICAgIGlmICghc3Bhbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICB2YXIgdHIgPSB0aGlzLmdldEN1cnJlbnRUcmFuc2FjdGlvbigpO1xuICAgICAgdHIgJiYgdGhpcy5fbG9nZ2VyLmRlYnVnKFwiZW5kU3BhbihcIiArIHNwYW4ubmFtZSArIFwiLCBcIiArIHNwYW4udHlwZSArIFwiKVwiLCBcIm9uIHRyYW5zYWN0aW9uKFwiICsgdHIuaWQgKyBcIiwgXCIgKyB0ci5uYW1lICsgXCIpXCIpO1xuICAgIH1cblxuICAgIHNwYW4uZW5kKG51bGwsIGNvbnRleHQpO1xuICB9O1xuXG4gIHJldHVybiBUcmFuc2FjdGlvblNlcnZpY2U7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRyYW5zYWN0aW9uU2VydmljZTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuaW1wb3J0IFNwYW4gZnJvbSAnLi9zcGFuJztcbmltcG9ydCBTcGFuQmFzZSBmcm9tICcuL3NwYW4tYmFzZSc7XG5pbXBvcnQgeyBnZW5lcmF0ZVJhbmRvbUlkLCBtZXJnZSwgbm93LCBnZXRUaW1lLCBleHRlbmQsIHJlbW92ZUludmFsaWRDaGFycyB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBSRVVTQUJJTElUWV9USFJFU0hPTEQsIFRSVU5DQVRFRF9UWVBFIH0gZnJvbSAnLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBjYXB0dXJlQnJlYWtkb3duIGFzIF9jYXB0dXJlQnJlYWtkb3duIH0gZnJvbSAnLi9icmVha2Rvd24nO1xuXG52YXIgVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoX1NwYW5CYXNlKSB7XG4gIF9pbmhlcml0c0xvb3NlKFRyYW5zYWN0aW9uLCBfU3BhbkJhc2UpO1xuXG4gIGZ1bmN0aW9uIFRyYW5zYWN0aW9uKG5hbWUsIHR5cGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9TcGFuQmFzZS5jYWxsKHRoaXMsIG5hbWUsIHR5cGUsIG9wdGlvbnMpIHx8IHRoaXM7XG4gICAgX3RoaXMudHJhY2VJZCA9IGdlbmVyYXRlUmFuZG9tSWQoKTtcbiAgICBfdGhpcy5tYXJrcyA9IHVuZGVmaW5lZDtcbiAgICBfdGhpcy5zcGFucyA9IFtdO1xuICAgIF90aGlzLl9hY3RpdmVTcGFucyA9IHt9O1xuICAgIF90aGlzLl9hY3RpdmVUYXNrcyA9IG5ldyBTZXQoKTtcbiAgICBfdGhpcy5ibG9ja2VkID0gZmFsc2U7XG4gICAgX3RoaXMuY2FwdHVyZVRpbWluZ3MgPSBmYWxzZTtcbiAgICBfdGhpcy5icmVha2Rvd25UaW1pbmdzID0gW107XG4gICAgX3RoaXMuc2FtcGxlUmF0ZSA9IF90aGlzLm9wdGlvbnMudHJhbnNhY3Rpb25TYW1wbGVSYXRlO1xuICAgIF90aGlzLnNhbXBsZWQgPSBNYXRoLnJhbmRvbSgpIDw9IF90aGlzLnNhbXBsZVJhdGU7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFRyYW5zYWN0aW9uLnByb3RvdHlwZTtcblxuICBfcHJvdG8uYWRkTWFya3MgPSBmdW5jdGlvbiBhZGRNYXJrcyhvYmopIHtcbiAgICB0aGlzLm1hcmtzID0gbWVyZ2UodGhpcy5tYXJrcyB8fCB7fSwgb2JqKTtcbiAgfTtcblxuICBfcHJvdG8ubWFyayA9IGZ1bmN0aW9uIG1hcmsoa2V5KSB7XG4gICAgdmFyIHNrZXkgPSByZW1vdmVJbnZhbGlkQ2hhcnMoa2V5KTtcblxuICAgIHZhciBtYXJrVGltZSA9IG5vdygpIC0gdGhpcy5fc3RhcnQ7XG5cbiAgICB2YXIgY3VzdG9tID0ge307XG4gICAgY3VzdG9tW3NrZXldID0gbWFya1RpbWU7XG4gICAgdGhpcy5hZGRNYXJrcyh7XG4gICAgICBjdXN0b206IGN1c3RvbVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jYW5SZXVzZSA9IGZ1bmN0aW9uIGNhblJldXNlKCkge1xuICAgIHZhciB0aHJlc2hvbGQgPSB0aGlzLm9wdGlvbnMucmV1c2VUaHJlc2hvbGQgfHwgUkVVU0FCSUxJVFlfVEhSRVNIT0xEO1xuICAgIHJldHVybiAhIXRoaXMub3B0aW9ucy5jYW5SZXVzZSAmJiAhdGhpcy5lbmRlZCAmJiBub3coKSAtIHRoaXMuX3N0YXJ0IDwgdGhyZXNob2xkO1xuICB9O1xuXG4gIF9wcm90by5yZWRlZmluZSA9IGZ1bmN0aW9uIHJlZGVmaW5lKG5hbWUsIHR5cGUsIG9wdGlvbnMpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSkge1xuICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5vcHRpb25zLnJldXNlVGhyZXNob2xkID0gb3B0aW9ucy5yZXVzZVRocmVzaG9sZDtcbiAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZCh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uc3RhcnRTcGFuID0gZnVuY3Rpb24gc3RhcnRTcGFuKG5hbWUsIHR5cGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG9wdHMgPSBleHRlbmQoe30sIG9wdGlvbnMpO1xuXG4gICAgb3B0cy5vbkVuZCA9IGZ1bmN0aW9uICh0cmMpIHtcbiAgICAgIF90aGlzMi5fb25TcGFuRW5kKHRyYyk7XG4gICAgfTtcblxuICAgIG9wdHMudHJhY2VJZCA9IHRoaXMudHJhY2VJZDtcbiAgICBvcHRzLnNhbXBsZWQgPSB0aGlzLnNhbXBsZWQ7XG4gICAgb3B0cy5zYW1wbGVSYXRlID0gdGhpcy5zYW1wbGVSYXRlO1xuXG4gICAgaWYgKCFvcHRzLnBhcmVudElkKSB7XG4gICAgICBvcHRzLnBhcmVudElkID0gdGhpcy5pZDtcbiAgICB9XG5cbiAgICB2YXIgc3BhbiA9IG5ldyBTcGFuKG5hbWUsIHR5cGUsIG9wdHMpO1xuICAgIHRoaXMuX2FjdGl2ZVNwYW5zW3NwYW4uaWRdID0gc3BhbjtcblxuICAgIGlmIChvcHRzLmJsb2NraW5nKSB7XG4gICAgICB0aGlzLmFkZFRhc2soc3Bhbi5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwYW47XG4gIH07XG5cbiAgX3Byb3RvLmlzRmluaXNoZWQgPSBmdW5jdGlvbiBpc0ZpbmlzaGVkKCkge1xuICAgIHJldHVybiAhdGhpcy5ibG9ja2VkICYmIHRoaXMuX2FjdGl2ZVRhc2tzLnNpemUgPT09IDA7XG4gIH07XG5cbiAgX3Byb3RvLmRldGVjdEZpbmlzaCA9IGZ1bmN0aW9uIGRldGVjdEZpbmlzaCgpIHtcbiAgICBpZiAodGhpcy5pc0ZpbmlzaGVkKCkpIHRoaXMuZW5kKCk7XG4gIH07XG5cbiAgX3Byb3RvLmVuZCA9IGZ1bmN0aW9uIGVuZChlbmRUaW1lKSB7XG4gICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9lbmQgPSBnZXRUaW1lKGVuZFRpbWUpO1xuXG4gICAgZm9yICh2YXIgc2lkIGluIHRoaXMuX2FjdGl2ZVNwYW5zKSB7XG4gICAgICB2YXIgc3BhbiA9IHRoaXMuX2FjdGl2ZVNwYW5zW3NpZF07XG4gICAgICBzcGFuLnR5cGUgPSBzcGFuLnR5cGUgKyBUUlVOQ0FURURfVFlQRTtcbiAgICAgIHNwYW4uZW5kKGVuZFRpbWUpO1xuICAgIH1cblxuICAgIHRoaXMuY2FsbE9uRW5kKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNhcHR1cmVCcmVha2Rvd24gPSBmdW5jdGlvbiBjYXB0dXJlQnJlYWtkb3duKCkge1xuICAgIHRoaXMuYnJlYWtkb3duVGltaW5ncyA9IF9jYXB0dXJlQnJlYWtkb3duKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5ibG9jayA9IGZ1bmN0aW9uIGJsb2NrKGZsYWcpIHtcbiAgICB0aGlzLmJsb2NrZWQgPSBmbGFnO1xuXG4gICAgaWYgKCF0aGlzLmJsb2NrZWQpIHtcbiAgICAgIHRoaXMuZGV0ZWN0RmluaXNoKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5hZGRUYXNrID0gZnVuY3Rpb24gYWRkVGFzayh0YXNrSWQpIHtcbiAgICBpZiAoIXRhc2tJZCkge1xuICAgICAgdGFza0lkID0gJ3Rhc2stJyArIGdlbmVyYXRlUmFuZG9tSWQoMTYpO1xuICAgIH1cblxuICAgIHRoaXMuX2FjdGl2ZVRhc2tzLmFkZCh0YXNrSWQpO1xuXG4gICAgcmV0dXJuIHRhc2tJZDtcbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlVGFzayA9IGZ1bmN0aW9uIHJlbW92ZVRhc2sodGFza0lkKSB7XG4gICAgdmFyIGRlbGV0ZWQgPSB0aGlzLl9hY3RpdmVUYXNrcy5kZWxldGUodGFza0lkKTtcblxuICAgIGRlbGV0ZWQgJiYgdGhpcy5kZXRlY3RGaW5pc2goKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzZXRGaWVsZHMgPSBmdW5jdGlvbiByZXNldEZpZWxkcygpIHtcbiAgICB0aGlzLnNwYW5zID0gW107XG4gICAgdGhpcy5zYW1wbGVSYXRlID0gMDtcbiAgfTtcblxuICBfcHJvdG8uX29uU3BhbkVuZCA9IGZ1bmN0aW9uIF9vblNwYW5FbmQoc3Bhbikge1xuICAgIHRoaXMuc3BhbnMucHVzaChzcGFuKTtcbiAgICBkZWxldGUgdGhpcy5fYWN0aXZlU3BhbnNbc3Bhbi5pZF07XG4gICAgdGhpcy5yZW1vdmVUYXNrKHNwYW4uaWQpO1xuICB9O1xuXG4gIF9wcm90by5pc01hbmFnZWQgPSBmdW5jdGlvbiBpc01hbmFnZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5vcHRpb25zLm1hbmFnZWQ7XG4gIH07XG5cbiAgcmV0dXJuIFRyYW5zYWN0aW9uO1xufShTcGFuQmFzZSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRyYW5zYWN0aW9uOyIsInZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHN0YXRlID0ge1xuICBib290c3RyYXBUaW1lOiBudWxsLFxuICBsYXN0SGlkZGVuU3RhcnQ6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSXG59O1xuZXhwb3J0IHsgX19ERVZfXywgc3RhdGUgfTsiLCIvKipcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3LXByZXNlbnQsIEVsYXN0aWNzZWFyY2ggQlZcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBnZXRJbnN0cnVtZW50YXRpb25GbGFncyxcbiAgUEFHRV9MT0FEX0RFTEFZLFxuICBQQUdFX0xPQUQsXG4gIEVSUk9SLFxuICBDT05GSUdfU0VSVklDRSxcbiAgTE9HR0lOR19TRVJWSUNFLFxuICBUUkFOU0FDVElPTl9TRVJWSUNFLFxuICBQRVJGT1JNQU5DRV9NT05JVE9SSU5HLFxuICBFUlJPUl9MT0dHSU5HLFxuICBBUE1fU0VSVkVSLFxuICBFVkVOVF9UQVJHRVQsXG4gIENMSUNLLFxuICBvYnNlcnZlUGFnZVZpc2liaWxpdHksXG4gIG9ic2VydmVQYWdlQ2xpY2tzLFxuICBvYnNlcnZlVXNlckludGVyYWN0aW9uc1xufSBmcm9tICdAZWxhc3RpYy9hcG0tcnVtLWNvcmUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwbUJhc2Uge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlRmFjdG9yeSwgZGlzYWJsZSkge1xuICAgIHRoaXMuX2Rpc2FibGUgPSBkaXNhYmxlXG4gICAgdGhpcy5zZXJ2aWNlRmFjdG9yeSA9IHNlcnZpY2VGYWN0b3J5XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZVxuICB9XG5cbiAgaXNFbmFibGVkKCkge1xuICAgIHJldHVybiAhdGhpcy5fZGlzYWJsZVxuICB9XG5cbiAgaXNBY3RpdmUoKSB7XG4gICAgY29uc3QgY29uZmlnU2VydmljZSA9IHRoaXMuc2VydmljZUZhY3RvcnkuZ2V0U2VydmljZShDT05GSUdfU0VSVklDRSlcbiAgICByZXR1cm4gdGhpcy5pc0VuYWJsZWQoKSAmJiB0aGlzLl9pbml0aWFsaXplZCAmJiBjb25maWdTZXJ2aWNlLmdldCgnYWN0aXZlJylcbiAgfVxuXG4gIGluaXQoY29uZmlnKSB7XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWVcbiAgICAgIGNvbnN0IFtcbiAgICAgICAgY29uZmlnU2VydmljZSxcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2UsXG4gICAgICAgIHRyYW5zYWN0aW9uU2VydmljZVxuICAgICAgXSA9IHRoaXMuc2VydmljZUZhY3RvcnkuZ2V0U2VydmljZShbXG4gICAgICAgIENPTkZJR19TRVJWSUNFLFxuICAgICAgICBMT0dHSU5HX1NFUlZJQ0UsXG4gICAgICAgIFRSQU5TQUNUSU9OX1NFUlZJQ0VcbiAgICAgIF0pXG4gICAgICAvKipcbiAgICAgICAqIFNldCBBZ2VudCB2ZXJzaW9uIHRvIGJlIHNlbnQgYXMgcGFydCBvZiBtZXRhZGF0YSB0byB0aGUgQVBNIFNlcnZlclxuICAgICAgICovXG4gICAgICBjb25maWdTZXJ2aWNlLnNldFZlcnNpb24oJzUuMTcuMCcpXG4gICAgICB0aGlzLmNvbmZpZyhjb25maWcpXG4gICAgICAvKipcbiAgICAgICAqIFNldCBsZXZlbCBoZXJlIHRvIGFjY291bnQgZm9yIGJvdGggYWN0aXZlIGFuZCBpbmFjdGl2ZSBjYXNlc1xuICAgICAgICovXG4gICAgICBjb25zdCBsb2dMZXZlbCA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdsb2dMZXZlbCcpXG4gICAgICBsb2dnaW5nU2VydmljZS5zZXRMZXZlbChsb2dMZXZlbClcbiAgICAgIC8qKlxuICAgICAgICogRGVhY3RpdmUgYWdlbnQgd2hlbiB0aGUgYWN0aXZlIGNvbmZpZyBmbGFnIGlzIHNldCB0byBmYWxzZVxuICAgICAgICovXG4gICAgICBjb25zdCBpc0NvbmZpZ0FjdGl2ZSA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdhY3RpdmUnKVxuICAgICAgaWYgKGlzQ29uZmlnQWN0aXZlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZUZhY3RvcnkuaW5pdCgpXG5cbiAgICAgICAgY29uc3QgZmxhZ3MgPSBnZXRJbnN0cnVtZW50YXRpb25GbGFncyhcbiAgICAgICAgICBjb25maWdTZXJ2aWNlLmdldCgnaW5zdHJ1bWVudCcpLFxuICAgICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0KCdkaXNhYmxlSW5zdHJ1bWVudGF0aW9ucycpXG4gICAgICAgIClcblxuICAgICAgICBjb25zdCBwZXJmb3JtYW5jZU1vbml0b3JpbmcgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoXG4gICAgICAgICAgUEVSRk9STUFOQ0VfTU9OSVRPUklOR1xuICAgICAgICApXG4gICAgICAgIHBlcmZvcm1hbmNlTW9uaXRvcmluZy5pbml0KGZsYWdzKVxuXG4gICAgICAgIGlmIChmbGFnc1tFUlJPUl0pIHtcbiAgICAgICAgICBjb25zdCBlcnJvckxvZ2dpbmcgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoRVJST1JfTE9HR0lORylcbiAgICAgICAgICBlcnJvckxvZ2dpbmcucmVnaXN0ZXJMaXN0ZW5lcnMoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZ1NlcnZpY2UuZ2V0KCdzZXNzaW9uJykpIHtcbiAgICAgICAgICBsZXQgbG9jYWxDb25maWcgPSBjb25maWdTZXJ2aWNlLmdldExvY2FsQ29uZmlnKClcbiAgICAgICAgICBpZiAobG9jYWxDb25maWcgJiYgbG9jYWxDb25maWcuc2Vzc2lvbikge1xuICAgICAgICAgICAgY29uZmlnU2VydmljZS5zZXRDb25maWcoe1xuICAgICAgICAgICAgICBzZXNzaW9uOiBsb2NhbENvbmZpZy5zZXNzaW9uXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlbmRQYWdlTG9hZCA9ICgpID0+XG4gICAgICAgICAgZmxhZ3NbUEFHRV9MT0FEXSAmJiB0aGlzLl9zZW5kUGFnZUxvYWRNZXRyaWNzKClcblxuICAgICAgICBpZiAoY29uZmlnU2VydmljZS5nZXQoJ2NlbnRyYWxDb25maWcnKSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFdhaXRpbmcgZm9yIHRoZSByZW1vdGUgY29uZmlnIGJlZm9yZSBzZW5kaW5nIHRoZSBwYWdlIGxvYWQgdHJhbnNhY3Rpb25cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB0aGlzLmZldGNoQ2VudHJhbENvbmZpZygpLnRoZW4oc2VuZFBhZ2VMb2FkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbmRQYWdlTG9hZCgpXG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlUGFnZVZpc2liaWxpdHkoY29uZmlnU2VydmljZSwgdHJhbnNhY3Rpb25TZXJ2aWNlKVxuICAgICAgICBpZiAoZmxhZ3NbRVZFTlRfVEFSR0VUXSAmJiBmbGFnc1tDTElDS10pIHtcbiAgICAgICAgICBvYnNlcnZlUGFnZUNsaWNrcyh0cmFuc2FjdGlvblNlcnZpY2UpXG4gICAgICAgIH1cbiAgICAgICAgb2JzZXJ2ZVVzZXJJbnRlcmFjdGlvbnMoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZSA9IHRydWVcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2Uud2FybignUlVNIGFnZW50IGlzIGluYWN0aXZlJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBgZmV0Y2hDZW50cmFsQ29uZmlnYCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYWx3YXlzIHJlc29sdmVcbiAgICogaWYgdGhlIGludGVybmFsIGNvbmZpZyBmZXRjaCBmYWlscyB0aGUgdGhlIHByb21pc2UgcmVzb2x2ZXMgdG8gYHVuZGVmaW5lZGAgb3RoZXJ3aXNlXG4gICAqIGl0IHJlc29sdmVzIHRvIHRoZSBmZXRjaGVkIGNvbmZpZy5cbiAgICovXG4gIGZldGNoQ2VudHJhbENvbmZpZygpIHtcbiAgICBjb25zdCBbXG4gICAgICBhcG1TZXJ2ZXIsXG4gICAgICBsb2dnaW5nU2VydmljZSxcbiAgICAgIGNvbmZpZ1NlcnZpY2VcbiAgICBdID0gdGhpcy5zZXJ2aWNlRmFjdG9yeS5nZXRTZXJ2aWNlKFtcbiAgICAgIEFQTV9TRVJWRVIsXG4gICAgICBMT0dHSU5HX1NFUlZJQ0UsXG4gICAgICBDT05GSUdfU0VSVklDRVxuICAgIF0pXG5cbiAgICByZXR1cm4gYXBtU2VydmVyXG4gICAgICAuZmV0Y2hDb25maWcoXG4gICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0KCdzZXJ2aWNlTmFtZScpLFxuICAgICAgICBjb25maWdTZXJ2aWNlLmdldCgnZW52aXJvbm1lbnQnKVxuICAgICAgKVxuICAgICAgLnRoZW4oY29uZmlnID0+IHtcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uU2FtcGxlUmF0ZSA9IGNvbmZpZ1sndHJhbnNhY3Rpb25fc2FtcGxlX3JhdGUnXVxuICAgICAgICBpZiAodHJhbnNhY3Rpb25TYW1wbGVSYXRlKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb25TYW1wbGVSYXRlID0gTnVtYmVyKHRyYW5zYWN0aW9uU2FtcGxlUmF0ZSlcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB7IHRyYW5zYWN0aW9uU2FtcGxlUmF0ZSB9XG4gICAgICAgICAgY29uc3QgeyBpbnZhbGlkIH0gPSBjb25maWdTZXJ2aWNlLnZhbGlkYXRlKGNvbmZpZylcbiAgICAgICAgICBpZiAoaW52YWxpZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2Uuc2V0Q29uZmlnKGNvbmZpZylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBrZXksIHZhbHVlLCBhbGxvd2VkIH0gPSBpbnZhbGlkWzBdXG4gICAgICAgICAgICBsb2dnaW5nU2VydmljZS53YXJuKFxuICAgICAgICAgICAgICBgaW52YWxpZCB2YWx1ZSBcIiR7dmFsdWV9XCIgZm9yICR7a2V5fS4gQWxsb3dlZDogJHthbGxvd2VkfS5gXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25maWdcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnaW5nU2VydmljZS53YXJuKCdmYWlsZWQgZmV0Y2hpbmcgY29uZmlnOicsIGVycm9yKVxuICAgICAgfSlcbiAgfVxuXG4gIF9zZW5kUGFnZUxvYWRNZXRyaWNzKCkge1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIHRyYW5zYWN0aW9uIGlzIHNldCBpbiB0cmFuc2FjdGlvbiBzZXJ2aWNlIHRvXG4gICAgICogYXZvaWQgZHVwbGljYXRpbmcgdGhlIGxvZ2ljIGF0IG11bHRpcGxlIHBsYWNlc1xuICAgICAqL1xuICAgIGNvbnN0IHRyID0gdGhpcy5zdGFydFRyYW5zYWN0aW9uKHVuZGVmaW5lZCwgUEFHRV9MT0FELCB7XG4gICAgICBtYW5hZ2VkOiB0cnVlLFxuICAgICAgY2FuUmV1c2U6IHRydWVcbiAgICB9KVxuXG4gICAgaWYgKCF0cikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdHIuYWRkVGFzayhQQUdFX0xPQUQpXG4gICAgY29uc3Qgc2VuZFBhZ2VMb2FkTWV0cmljcyA9ICgpID0+IHtcbiAgICAgIC8vIFRoZSByZWFzb25zIG9mIHRoaXMgdGltZW91dCBhcmU6XG4gICAgICAvLyAxLiB0byBtYWtlIHN1cmUgUGVyZm9ybWFuY2VUaW1pbmcubG9hZEV2ZW50RW5kIGhhcyBhIHZhbHVlLlxuICAgICAgLy8gMi4gdG8gbWFrZSBzdXJlIHRoZSBhZ2VudCBpbnRlcmNlcHRzIGFsbCB0aGUgTENQIGVudHJpZXMgdHJpZ2dlcmVkIGJ5IHRoZSBicm93c2VyIChhZGRpbmcgYSBkZWxheSBpbiB0aGUgdGltZW91dCkuXG4gICAgICAvLyBUaGUgYnJvd3NlciBtaWdodCBuZWVkIG1vcmUgdGltZSBhZnRlciB0aGUgcGFnZWxvYWQgZXZlbnQgdG8gcmVuZGVyIG90aGVyIGVsZW1lbnRzIChlLmcuIGltYWdlcykuXG4gICAgICAvLyBUaGF0J3MgaW1wb3J0YW50IGJlY2F1c2UgYSBMQ1AgaXMgb25seSB0cmlnZ2VyZWQgd2hlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGNvbXBsZXRlbHkgcmVuZGVyZWQuXG4gICAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vbGFyZ2VzdC1jb250ZW50ZnVsLXBhaW50LyNzZWMtYWRkLWxjcC1lbnRyeVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0ci5yZW1vdmVUYXNrKFBBR0VfTE9BRCksIFBBR0VfTE9BRF9ERUxBWSlcbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgc2VuZFBhZ2VMb2FkTWV0cmljcygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2VuZFBhZ2VMb2FkTWV0cmljcylcbiAgICB9XG4gIH1cblxuICBvYnNlcnZlKG5hbWUsIGZuKSB7XG4gICAgY29uc3QgY29uZmlnU2VydmljZSA9IHRoaXMuc2VydmljZUZhY3RvcnkuZ2V0U2VydmljZShDT05GSUdfU0VSVklDRSlcbiAgICBjb25maWdTZXJ2aWNlLmV2ZW50cy5vYnNlcnZlKG5hbWUsIGZuKVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIHJlcXVpcmVkIGNvbmZpZyBrZXlzIGFyZSBpbnZhbGlkLCB0aGUgYWdlbnQgaXMgZGVhY3RpdmF0ZWQgd2l0aFxuICAgKiBsb2dnaW5nIGVycm9yIHRvIHRoZSBjb25zb2xlXG4gICAqXG4gICAqIHZhbGlkYXRpb24gZXJyb3IgZm9ybWF0XG4gICAqIHtcbiAgICogIG1pc3Npbmc6IFsgJ2tleTEnLCAna2V5MiddLFxuICAgKiAgaW52YWxpZDogW3tcbiAgICogICAga2V5OiAnYScsXG4gICAqICAgIHZhbHVlOiAnYWJjZCcsXG4gICAqICAgIGFsbG93ZWQ6ICdzdHJpbmcnXG4gICAqICB9XSxcbiAgICogIHVua25vd246IFsna2V5MycsICdrZXk0J11cbiAgICogfVxuICAgKi9cbiAgY29uZmlnKGNvbmZpZykge1xuICAgIGNvbnN0IFtjb25maWdTZXJ2aWNlLCBsb2dnaW5nU2VydmljZV0gPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoW1xuICAgICAgQ09ORklHX1NFUlZJQ0UsXG4gICAgICBMT0dHSU5HX1NFUlZJQ0VcbiAgICBdKVxuICAgIGNvbnN0IHsgbWlzc2luZywgaW52YWxpZCwgdW5rbm93biB9ID0gY29uZmlnU2VydmljZS52YWxpZGF0ZShjb25maWcpXG4gICAgaWYgKHVua25vd24ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICdVbmtub3duIGNvbmZpZyBvcHRpb25zIGFyZSBzcGVjaWZpZWQgZm9yIFJVTSBhZ2VudDogJyArXG4gICAgICAgIHVua25vd24uam9pbignLCAnKVxuICAgICAgbG9nZ2luZ1NlcnZpY2Uud2FybihtZXNzYWdlKVxuICAgIH1cblxuICAgIGlmIChtaXNzaW5nLmxlbmd0aCA9PT0gMCAmJiBpbnZhbGlkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uZmlnU2VydmljZS5zZXRDb25maWcoY29uZmlnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZXBhcmF0b3IgPSAnLCAnXG4gICAgICBsZXQgbWVzc2FnZSA9IFwiUlVNIGFnZW50IGlzbid0IGNvcnJlY3RseSBjb25maWd1cmVkLiBcIlxuXG4gICAgICBpZiAobWlzc2luZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gbWlzc2luZy5qb2luKHNlcGFyYXRvcikgKyAnIGlzIG1pc3NpbmcnXG4gICAgICAgIGlmIChpbnZhbGlkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBtZXNzYWdlICs9IHNlcGFyYXRvclxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGludmFsaWQuZm9yRWFjaCgoeyBrZXksIHZhbHVlLCBhbGxvd2VkIH0sIGluZGV4KSA9PiB7XG4gICAgICAgIG1lc3NhZ2UgKz1cbiAgICAgICAgICBgJHtrZXl9IFwiJHt2YWx1ZX1cIiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMhIChhbGxvd2VkOiAke2FsbG93ZWR9KWAgK1xuICAgICAgICAgIChpbmRleCAhPT0gaW52YWxpZC5sZW5ndGggLSAxID8gc2VwYXJhdG9yIDogJycpXG4gICAgICB9KVxuICAgICAgbG9nZ2luZ1NlcnZpY2UuZXJyb3IobWVzc2FnZSlcbiAgICAgIGNvbmZpZ1NlcnZpY2Uuc2V0Q29uZmlnKHsgYWN0aXZlOiBmYWxzZSB9KVxuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJDb250ZXh0KHVzZXJDb250ZXh0KSB7XG4gICAgdmFyIGNvbmZpZ1NlcnZpY2UgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoQ09ORklHX1NFUlZJQ0UpXG4gICAgY29uZmlnU2VydmljZS5zZXRVc2VyQ29udGV4dCh1c2VyQ29udGV4dClcbiAgfVxuXG4gIHNldEN1c3RvbUNvbnRleHQoY3VzdG9tQ29udGV4dCkge1xuICAgIHZhciBjb25maWdTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlRmFjdG9yeS5nZXRTZXJ2aWNlKENPTkZJR19TRVJWSUNFKVxuICAgIGNvbmZpZ1NlcnZpY2Uuc2V0Q3VzdG9tQ29udGV4dChjdXN0b21Db250ZXh0KVxuICB9XG5cbiAgYWRkTGFiZWxzKGxhYmVscykge1xuICAgIHZhciBjb25maWdTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlRmFjdG9yeS5nZXRTZXJ2aWNlKENPTkZJR19TRVJWSUNFKVxuICAgIGNvbmZpZ1NlcnZpY2UuYWRkTGFiZWxzKGxhYmVscylcbiAgfVxuXG4gIC8vIFNob3VsZCBjYWxsIHRoaXMgbWV0aG9kIGJlZm9yZSAnbG9hZCcgZXZlbnQgb24gd2luZG93IGlzIGZpcmVkXG4gIHNldEluaXRpYWxQYWdlTG9hZE5hbWUobmFtZSkge1xuICAgIGNvbnN0IGNvbmZpZ1NlcnZpY2UgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoQ09ORklHX1NFUlZJQ0UpXG4gICAgY29uZmlnU2VydmljZS5zZXRDb25maWcoe1xuICAgICAgcGFnZUxvYWRUcmFuc2FjdGlvbk5hbWU6IG5hbWVcbiAgICB9KVxuICB9XG5cbiAgc3RhcnRUcmFuc2FjdGlvbihuYW1lLCB0eXBlLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHZhciB0cmFuc2FjdGlvblNlcnZpY2UgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoXG4gICAgICAgIFRSQU5TQUNUSU9OX1NFUlZJQ0VcbiAgICAgIClcbiAgICAgIHJldHVybiB0cmFuc2FjdGlvblNlcnZpY2Uuc3RhcnRUcmFuc2FjdGlvbihuYW1lLCB0eXBlLCBvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0U3BhbihuYW1lLCB0eXBlLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHZhciB0cmFuc2FjdGlvblNlcnZpY2UgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoXG4gICAgICAgIFRSQU5TQUNUSU9OX1NFUlZJQ0VcbiAgICAgIClcbiAgICAgIHJldHVybiB0cmFuc2FjdGlvblNlcnZpY2Uuc3RhcnRTcGFuKG5hbWUsIHR5cGUsIG9wdGlvbnMpXG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudFRyYW5zYWN0aW9uKCkge1xuICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICB2YXIgdHJhbnNhY3Rpb25TZXJ2aWNlID0gdGhpcy5zZXJ2aWNlRmFjdG9yeS5nZXRTZXJ2aWNlKFxuICAgICAgICBUUkFOU0FDVElPTl9TRVJWSUNFXG4gICAgICApXG4gICAgICByZXR1cm4gdHJhbnNhY3Rpb25TZXJ2aWNlLmdldEN1cnJlbnRUcmFuc2FjdGlvbigpXG4gICAgfVxuICB9XG5cbiAgY2FwdHVyZUVycm9yKGVycm9yLCBvcHRzKSB7XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHZhciBlcnJvckxvZ2dpbmcgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoRVJST1JfTE9HR0lORylcbiAgICAgIHJldHVybiBlcnJvckxvZ2dpbmcubG9nRXJyb3IoZXJyb3IsIG9wdHMpXG4gICAgfVxuICB9XG5cbiAgYWRkRmlsdGVyKGZuKSB7XG4gICAgdmFyIGNvbmZpZ1NlcnZpY2UgPSB0aGlzLnNlcnZpY2VGYWN0b3J5LmdldFNlcnZpY2UoQ09ORklHX1NFUlZJQ0UpXG4gICAgY29uZmlnU2VydmljZS5hZGRGaWx0ZXIoZm4pXG4gIH1cbn1cbiIsIi8qKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCwgRWxhc3RpY3NlYXJjaCBCVlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIGNyZWF0ZVNlcnZpY2VGYWN0b3J5LFxuICBib290c3RyYXAsXG4gIGlzQnJvd3NlclxufSBmcm9tICdAZWxhc3RpYy9hcG0tcnVtLWNvcmUnXG5pbXBvcnQgQXBtQmFzZSBmcm9tICcuL2FwbS1iYXNlJ1xuXG4vKipcbiAqIFVzZSBhIHNpbmdsZSBpbnN0YW5jZSBvZiBBcG1CYXNlIGFjcm9zcyBhbGwgaW5zdGFuY2Ugb2YgdGhlIGFnZW50XG4gKiBpbmNsdWRpbmcgdGhlIGluc3RhbmNlcyB1c2VkIGluIGZyYW1ld29yayBzcGVjaWZpYyBpbnRlZ3JhdGlvbnNcbiAqL1xuZnVuY3Rpb24gZ2V0QXBtQmFzZSgpIHtcbiAgaWYgKGlzQnJvd3NlciAmJiB3aW5kb3cuZWxhc3RpY0FwbSkge1xuICAgIHJldHVybiB3aW5kb3cuZWxhc3RpY0FwbVxuICB9XG4gIGNvbnN0IGVuYWJsZWQgPSBib290c3RyYXAoKVxuICBjb25zdCBzZXJ2aWNlRmFjdG9yeSA9IGNyZWF0ZVNlcnZpY2VGYWN0b3J5KClcbiAgY29uc3QgYXBtQmFzZSA9IG5ldyBBcG1CYXNlKHNlcnZpY2VGYWN0b3J5LCAhZW5hYmxlZClcblxuICBpZiAoaXNCcm93c2VyKSB7XG4gICAgd2luZG93LmVsYXN0aWNBcG0gPSBhcG1CYXNlXG4gIH1cblxuICByZXR1cm4gYXBtQmFzZVxufVxuXG5jb25zdCBhcG1CYXNlID0gZ2V0QXBtQmFzZSgpXG5cbmNvbnN0IGluaXQgPSBhcG1CYXNlLmluaXQuYmluZChhcG1CYXNlKVxuXG5leHBvcnQgZGVmYXVsdCBpbml0XG5leHBvcnQgeyBpbml0LCBhcG1CYXNlLCBBcG1CYXNlLCBhcG1CYXNlIGFzIGFwbSB9XG4iLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAvLyBVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24gKFVNRCkgdG8gc3VwcG9ydCBBTUQsIENvbW1vbkpTL05vZGUuanMsIFJoaW5vLCBhbmQgYnJvd3NlcnMuXG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKCdlcnJvci1zdGFjay1wYXJzZXInLCBbJ3N0YWNrZnJhbWUnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ3N0YWNrZnJhbWUnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5FcnJvclN0YWNrUGFyc2VyID0gZmFjdG9yeShyb290LlN0YWNrRnJhbWUpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gRXJyb3JTdGFja1BhcnNlcihTdGFja0ZyYW1lKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIEZJUkVGT1hfU0FGQVJJX1NUQUNLX1JFR0VYUCA9IC8oXnxAKVxcUytcXDpcXGQrLztcbiAgICB2YXIgQ0hST01FX0lFX1NUQUNLX1JFR0VYUCA9IC9eXFxzKmF0IC4qKFxcUytcXDpcXGQrfFxcKG5hdGl2ZVxcKSkvbTtcbiAgICB2YXIgU0FGQVJJX05BVElWRV9DT0RFX1JFR0VYUCA9IC9eKGV2YWxAKT8oXFxbbmF0aXZlIGNvZGVcXF0pPyQvO1xuXG4gICAgZnVuY3Rpb24gX21hcChhcnJheSwgZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGUubWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXkubWFwKGZuLCB0aGlzQXJnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBuZXcgQXJyYXkoYXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbaV0gPSBmbi5jYWxsKHRoaXNBcmcsIGFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZmlsdGVyKGFycmF5LCBmbiwgdGhpc0FyZykge1xuICAgICAgICBpZiAodHlwZW9mIEFycmF5LnByb3RvdHlwZS5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoZm4sIHRoaXNBcmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChmbi5jYWxsKHRoaXNBcmcsIGFycmF5W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pbmRleE9mKGFycmF5LCB0YXJnZXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YodGFyZ2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0gPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2l2ZW4gYW4gRXJyb3Igb2JqZWN0LCBleHRyYWN0IHRoZSBtb3N0IGluZm9ybWF0aW9uIGZyb20gaXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gb2YgU3RhY2tGcmFtZXNcbiAgICAgICAgICovXG4gICAgICAgIHBhcnNlOiBmdW5jdGlvbiBFcnJvclN0YWNrUGFyc2VyJCRwYXJzZShlcnJvcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5zdGFja3RyYWNlICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZXJyb3JbJ29wZXJhI3NvdXJjZWxvYyddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlT3BlcmEoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5zdGFjayAmJiBlcnJvci5zdGFjay5tYXRjaChDSFJPTUVfSUVfU1RBQ0tfUkVHRVhQKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlVjhPcklFKGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3Iuc3RhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUZGT3JTYWZhcmkoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBwYXJzZSBnaXZlbiBFcnJvciBvYmplY3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBTZXBhcmF0ZSBsaW5lIGFuZCBjb2x1bW4gbnVtYmVycyBmcm9tIGEgc3RyaW5nIG9mIHRoZSBmb3JtOiAoVVJJOkxpbmU6Q29sdW1uKVxuICAgICAgICBleHRyYWN0TG9jYXRpb246IGZ1bmN0aW9uIEVycm9yU3RhY2tQYXJzZXIkJGV4dHJhY3RMb2NhdGlvbih1cmxMaWtlKSB7XG4gICAgICAgICAgICAvLyBGYWlsLWZhc3QgYnV0IHJldHVybiBsb2NhdGlvbnMgbGlrZSBcIihuYXRpdmUpXCJcbiAgICAgICAgICAgIGlmICh1cmxMaWtlLmluZGV4T2YoJzonKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3VybExpa2VdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVnRXhwID0gLyguKz8pKD86XFw6KFxcZCspKT8oPzpcXDooXFxkKykpPyQvO1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gcmVnRXhwLmV4ZWModXJsTGlrZS5yZXBsYWNlKC9bXFwoXFwpXS9nLCAnJykpO1xuICAgICAgICAgICAgcmV0dXJuIFtwYXJ0c1sxXSwgcGFydHNbMl0gfHwgdW5kZWZpbmVkLCBwYXJ0c1szXSB8fCB1bmRlZmluZWRdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhcnNlVjhPcklFOiBmdW5jdGlvbiBFcnJvclN0YWNrUGFyc2VyJCRwYXJzZVY4T3JJRShlcnJvcikge1xuICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gX2ZpbHRlcihlcnJvci5zdGFjay5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFsaW5lLm1hdGNoKENIUk9NRV9JRV9TVEFDS19SRUdFWFApO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBfbWFwKGZpbHRlcmVkLCBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmUuaW5kZXhPZignKGV2YWwgJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaHJvdyBhd2F5IGV2YWwgaW5mb3JtYXRpb24gdW50aWwgd2UgaW1wbGVtZW50IHN0YWNrdHJhY2UuanMvc3RhY2tmcmFtZSM4XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoL2V2YWwgY29kZS9nLCAnZXZhbCcpLnJlcGxhY2UoLyhcXChldmFsIGF0IFteXFwoKV0qKXwoXFwpXFwsLiokKS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBsaW5lLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xcKGV2YWwgY29kZS9nLCAnKCcpLnNwbGl0KC9cXHMrLykuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uUGFydHMgPSB0aGlzLmV4dHJhY3RMb2NhdGlvbih0b2tlbnMucG9wKCkpO1xuICAgICAgICAgICAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSB0b2tlbnMuam9pbignICcpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBfaW5kZXhPZihbJ2V2YWwnLCAnPGFub255bW91cz4nXSwgbG9jYXRpb25QYXJ0c1swXSkgPiAtMSA/IHVuZGVmaW5lZCA6IGxvY2F0aW9uUGFydHNbMF07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFN0YWNrRnJhbWUoZnVuY3Rpb25OYW1lLCB1bmRlZmluZWQsIGZpbGVOYW1lLCBsb2NhdGlvblBhcnRzWzFdLCBsb2NhdGlvblBhcnRzWzJdLCBsaW5lKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhcnNlRkZPclNhZmFyaTogZnVuY3Rpb24gRXJyb3JTdGFja1BhcnNlciQkcGFyc2VGRk9yU2FmYXJpKGVycm9yKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBfZmlsdGVyKGVycm9yLnN0YWNrLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhbGluZS5tYXRjaChTQUZBUklfTkFUSVZFX0NPREVfUkVHRVhQKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gX21hcChmaWx0ZXJlZCwgZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgICAgIC8vIFRocm93IGF3YXkgZXZhbCBpbmZvcm1hdGlvbiB1bnRpbCB3ZSBpbXBsZW1lbnQgc3RhY2t0cmFjZS5qcy9zdGFja2ZyYW1lIzhcbiAgICAgICAgICAgICAgICBpZiAobGluZS5pbmRleE9mKCcgPiBldmFsJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC8gbGluZSAoXFxkKykoPzogPiBldmFsIGxpbmUgXFxkKykqID4gZXZhbFxcOlxcZCtcXDpcXGQrL2csICc6JDEnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGluZS5pbmRleE9mKCdAJykgPT09IC0xICYmIGxpbmUuaW5kZXhPZignOicpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgZXZhbCBmcmFtZXMgb25seSBoYXZlIGZ1bmN0aW9uIG5hbWVzIGFuZCBub3RoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGFja0ZyYW1lKGxpbmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBsaW5lLnNwbGl0KCdAJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvblBhcnRzID0gdGhpcy5leHRyYWN0TG9jYXRpb24odG9rZW5zLnBvcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bmN0aW9uTmFtZSA9IHRva2Vucy5qb2luKCdAJykgfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFN0YWNrRnJhbWUoZnVuY3Rpb25OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25QYXJ0c1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uUGFydHNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvblBhcnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFyc2VPcGVyYTogZnVuY3Rpb24gRXJyb3JTdGFja1BhcnNlciQkcGFyc2VPcGVyYShlKSB7XG4gICAgICAgICAgICBpZiAoIWUuc3RhY2t0cmFjZSB8fCAoZS5tZXNzYWdlLmluZGV4T2YoJ1xcbicpID4gLTEgJiZcbiAgICAgICAgICAgICAgICBlLm1lc3NhZ2Uuc3BsaXQoJ1xcbicpLmxlbmd0aCA+IGUuc3RhY2t0cmFjZS5zcGxpdCgnXFxuJykubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlT3BlcmE5KGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghZS5zdGFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlT3BlcmExMChlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VPcGVyYTExKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBhcnNlT3BlcmE5OiBmdW5jdGlvbiBFcnJvclN0YWNrUGFyc2VyJCRwYXJzZU9wZXJhOShlKSB7XG4gICAgICAgICAgICB2YXIgbGluZVJFID0gL0xpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykvaTtcbiAgICAgICAgICAgIHZhciBsaW5lcyA9IGUubWVzc2FnZS5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAyLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmVSRS5leGVjKGxpbmVzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFN0YWNrRnJhbWUodW5kZWZpbmVkLCB1bmRlZmluZWQsIG1hdGNoWzJdLCBtYXRjaFsxXSwgdW5kZWZpbmVkLCBsaW5lc1tpXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBwYXJzZU9wZXJhMTA6IGZ1bmN0aW9uIEVycm9yU3RhY2tQYXJzZXIkJHBhcnNlT3BlcmExMChlKSB7XG4gICAgICAgICAgICB2YXIgbGluZVJFID0gL0xpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykoPzo6IEluIGZ1bmN0aW9uIChcXFMrKSk/JC9pO1xuICAgICAgICAgICAgdmFyIGxpbmVzID0gZS5zdGFja3RyYWNlLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZVJFLmV4ZWMobGluZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTdGFja0ZyYW1lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzNdIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE9wZXJhIDEwLjY1KyBFcnJvci5zdGFjayB2ZXJ5IHNpbWlsYXIgdG8gRkYvU2FmYXJpXG4gICAgICAgIHBhcnNlT3BlcmExMTogZnVuY3Rpb24gRXJyb3JTdGFja1BhcnNlciQkcGFyc2VPcGVyYTExKGVycm9yKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBfZmlsdGVyKGVycm9yLnN0YWNrLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWxpbmUubWF0Y2goRklSRUZPWF9TQUZBUklfU1RBQ0tfUkVHRVhQKSAmJiAhbGluZS5tYXRjaCgvXkVycm9yIGNyZWF0ZWQgYXQvKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gX21hcChmaWx0ZXJlZCwgZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBsaW5lLnNwbGl0KCdAJyk7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uUGFydHMgPSB0aGlzLmV4dHJhY3RMb2NhdGlvbih0b2tlbnMucG9wKCkpO1xuICAgICAgICAgICAgICAgIHZhciBmdW5jdGlvbkNhbGwgPSAodG9rZW5zLnNoaWZ0KCkgfHwgJycpO1xuICAgICAgICAgICAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSBmdW5jdGlvbkNhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC88YW5vbnltb3VzIGZ1bmN0aW9uKDogKFxcdyspKT8+LywgJyQyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXChbXlxcKV0qXFwpL2csICcnKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3NSYXc7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bmN0aW9uQ2FsbC5tYXRjaCgvXFwoKFteXFwpXSopXFwpLykpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnc1JhdyA9IGZ1bmN0aW9uQ2FsbC5yZXBsYWNlKC9eW15cXChdK1xcKChbXlxcKV0qKVxcKSQvLCAnJDEnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSAoYXJnc1JhdyA9PT0gdW5kZWZpbmVkIHx8IGFyZ3NSYXcgPT09ICdbYXJndW1lbnRzIG5vdCBhdmFpbGFibGVdJykgP1xuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQgOiBhcmdzUmF3LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGFja0ZyYW1lKFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uUGFydHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uUGFydHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uUGFydHNbMl0sXG4gICAgICAgICAgICAgICAgICAgIGxpbmUpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xufSkpO1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIEZPUk1BVF9CSU5BUlkgZm9ybWF0IHJlcHJlc2VudHMgU3BhbkNvbnRleHRzIGluIGFuIG9wYXF1ZSBiaW5hcnlcbiAqIGNhcnJpZXIuXG4gKlxuICogVHJhY2VyLmluamVjdCgpIHdpbGwgc2V0IHRoZSBidWZmZXIgZmllbGQgdG8gYW4gQXJyYXktbGlrZSAoQXJyYXksXG4gKiBBcnJheUJ1ZmZlciwgb3IgVHlwZWRCdWZmZXIpIG9iamVjdCBjb250YWluaW5nIHRoZSBpbmplY3RlZCBiaW5hcnkgZGF0YS5cbiAqIEFueSB2YWxpZCBPYmplY3QgY2FuIGJlIHVzZWQgYXMgbG9uZyBhcyB0aGUgYnVmZmVyIGZpZWxkIG9mIHRoZSBvYmplY3RcbiAqIGNhbiBiZSBzZXQuXG4gKlxuICogVHJhY2VyLmV4dHJhY3QoKSB3aWxsIGxvb2sgZm9yIGBjYXJyaWVyLmJ1ZmZlcmAsIGFuZCB0aGF0IGZpZWxkIGlzXG4gKiBleHBlY3RlZCB0byBiZSBhbiBBcnJheS1saWtlIG9iamVjdCAoQXJyYXksIEFycmF5QnVmZmVyLCBvclxuICogVHlwZWRCdWZmZXIpLlxuICovXG5leHBvcnRzLkZPUk1BVF9CSU5BUlkgPSAnYmluYXJ5Jztcbi8qKlxuICogVGhlIEZPUk1BVF9URVhUX01BUCBmb3JtYXQgcmVwcmVzZW50cyBTcGFuQ29udGV4dHMgdXNpbmcgYVxuICogc3RyaW5nLT5zdHJpbmcgbWFwIChiYWNrZWQgYnkgYSBKYXZhc2NyaXB0IE9iamVjdCkgYXMgYSBjYXJyaWVyLlxuICpcbiAqIE5PVEU6IFVubGlrZSBGT1JNQVRfSFRUUF9IRUFERVJTLCBGT1JNQVRfVEVYVF9NQVAgcGxhY2VzIG5vIHJlc3RyaWN0aW9uc1xuICogb24gdGhlIGNoYXJhY3RlcnMgdXNlZCBpbiBlaXRoZXIgdGhlIGtleXMgb3IgdGhlIHZhbHVlcyBvZiB0aGUgbWFwXG4gKiBlbnRyaWVzLlxuICpcbiAqIFRoZSBGT1JNQVRfVEVYVF9NQVAgY2FycmllciBtYXAgbWF5IGNvbnRhaW4gdW5yZWxhdGVkIGRhdGEgKGUuZy4sXG4gKiBhcmJpdHJhcnkgZ1JQQyBtZXRhZGF0YSk7IGFzIHN1Y2gsIHRoZSBUcmFjZXIgaW1wbGVtZW50YXRpb24gc2hvdWxkIHVzZVxuICogYSBwcmVmaXggb3Igb3RoZXIgY29udmVudGlvbiB0byBkaXN0aW5ndWlzaCBUcmFjZXItc3BlY2lmaWMga2V5OnZhbHVlXG4gKiBwYWlycy5cbiAqL1xuZXhwb3J0cy5GT1JNQVRfVEVYVF9NQVAgPSAndGV4dF9tYXAnO1xuLyoqXG4gKiBUaGUgRk9STUFUX0hUVFBfSEVBREVSUyBmb3JtYXQgcmVwcmVzZW50cyBTcGFuQ29udGV4dHMgdXNpbmcgYVxuICogY2hhcmFjdGVyLXJlc3RyaWN0ZWQgc3RyaW5nLT5zdHJpbmcgbWFwIChiYWNrZWQgYnkgYSBKYXZhc2NyaXB0IE9iamVjdClcbiAqIGFzIGEgY2Fycmllci5cbiAqXG4gKiBLZXlzIGFuZCB2YWx1ZXMgaW4gdGhlIEZPUk1BVF9IVFRQX0hFQURFUlMgY2FycmllciBtdXN0IGJlIHN1aXRhYmxlIGZvclxuICogdXNlIGFzIEhUVFAgaGVhZGVycyAod2l0aG91dCBtb2RpZmljYXRpb24gb3IgZnVydGhlciBlc2NhcGluZykuIFRoYXQgaXMsXG4gKiB0aGUga2V5cyBoYXZlIGEgZ3JlYXRseSByZXN0cmljdGVkIGNoYXJhY3RlciBzZXQsIGNhc2luZyBmb3IgdGhlIGtleXNcbiAqIG1heSBub3QgYmUgcHJlc2VydmVkIGJ5IHZhcmlvdXMgaW50ZXJtZWRpYXJpZXMsIGFuZCB0aGUgdmFsdWVzIHNob3VsZCBiZVxuICogVVJMLWVzY2FwZWQuXG4gKlxuICogVGhlIEZPUk1BVF9IVFRQX0hFQURFUlMgY2FycmllciBtYXAgbWF5IGNvbnRhaW4gdW5yZWxhdGVkIGRhdGEgKGUuZy4sXG4gKiBhcmJpdHJhcnkgSFRUUCBoZWFkZXJzKTsgYXMgc3VjaCwgdGhlIFRyYWNlciBpbXBsZW1lbnRhdGlvbiBzaG91bGQgdXNlIGFcbiAqIHByZWZpeCBvciBvdGhlciBjb252ZW50aW9uIHRvIGRpc3Rpbmd1aXNoIFRyYWNlci1zcGVjaWZpYyBrZXk6dmFsdWVcbiAqIHBhaXJzLlxuICovXG5leHBvcnRzLkZPUk1BVF9IVFRQX0hFQURFUlMgPSAnaHR0cF9oZWFkZXJzJztcbi8qKlxuICogQSBTcGFuIG1heSBiZSB0aGUgXCJjaGlsZCBvZlwiIGEgcGFyZW50IFNwYW4uIEluIGEg4oCcY2hpbGQgb2bigJ0gcmVmZXJlbmNlLFxuICogdGhlIHBhcmVudCBTcGFuIGRlcGVuZHMgb24gdGhlIGNoaWxkIFNwYW4gaW4gc29tZSBjYXBhY2l0eS5cbiAqXG4gKiBTZWUgbW9yZSBhYm91dCByZWZlcmVuY2UgdHlwZXMgYXQgaHR0cHM6Ly9naXRodWIuY29tL29wZW50cmFjaW5nL3NwZWNpZmljYXRpb25cbiAqL1xuZXhwb3J0cy5SRUZFUkVOQ0VfQ0hJTERfT0YgPSAnY2hpbGRfb2YnO1xuLyoqXG4gKiBTb21lIHBhcmVudCBTcGFucyBkbyBub3QgZGVwZW5kIGluIGFueSB3YXkgb24gdGhlIHJlc3VsdCBvZiB0aGVpciBjaGlsZFxuICogU3BhbnMuIEluIHRoZXNlIGNhc2VzLCB3ZSBzYXkgbWVyZWx5IHRoYXQgdGhlIGNoaWxkIFNwYW4g4oCcZm9sbG93cyBmcm9t4oCdXG4gKiB0aGUgcGFyZW50IFNwYW4gaW4gYSBjYXVzYWwgc2Vuc2UuXG4gKlxuICogU2VlIG1vcmUgYWJvdXQgcmVmZXJlbmNlIHR5cGVzIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVudHJhY2luZy9zcGVjaWZpY2F0aW9uXG4gKi9cbmV4cG9ydHMuUkVGRVJFTkNFX0ZPTExPV1NfRlJPTSA9ICdmb2xsb3dzX2Zyb20nO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENvbnN0YW50cyA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcbnZhciByZWZlcmVuY2VfMSA9IHJlcXVpcmUoXCIuL3JlZmVyZW5jZVwiKTtcbnZhciBzcGFuXzEgPSByZXF1aXJlKFwiLi9zcGFuXCIpO1xuLyoqXG4gKiBSZXR1cm4gYSBuZXcgUkVGRVJFTkNFX0NISUxEX09GIHJlZmVyZW5jZS5cbiAqXG4gKiBAcGFyYW0ge1NwYW5Db250ZXh0fSBzcGFuQ29udGV4dCAtIHRoZSBwYXJlbnQgU3BhbkNvbnRleHQgaW5zdGFuY2UgdG9cbiAqICAgICAgICByZWZlcmVuY2UuXG4gKiBAcmV0dXJuIGEgUkVGRVJFTkNFX0NISUxEX09GIHJlZmVyZW5jZSBwb2ludGluZyB0byBgc3BhbkNvbnRleHRgXG4gKi9cbmZ1bmN0aW9uIGNoaWxkT2Yoc3BhbkNvbnRleHQpIHtcbiAgICAvLyBBbGxvdyB0aGUgdXNlciB0byBwYXNzIGEgU3BhbiBpbnN0ZWFkIG9mIGEgU3BhbkNvbnRleHRcbiAgICBpZiAoc3BhbkNvbnRleHQgaW5zdGFuY2VvZiBzcGFuXzEuZGVmYXVsdCkge1xuICAgICAgICBzcGFuQ29udGV4dCA9IHNwYW5Db250ZXh0LmNvbnRleHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyByZWZlcmVuY2VfMS5kZWZhdWx0KENvbnN0YW50cy5SRUZFUkVOQ0VfQ0hJTERfT0YsIHNwYW5Db250ZXh0KTtcbn1cbmV4cG9ydHMuY2hpbGRPZiA9IGNoaWxkT2Y7XG4vKipcbiAqIFJldHVybiBhIG5ldyBSRUZFUkVOQ0VfRk9MTE9XU19GUk9NIHJlZmVyZW5jZS5cbiAqXG4gKiBAcGFyYW0ge1NwYW5Db250ZXh0fSBzcGFuQ29udGV4dCAtIHRoZSBwYXJlbnQgU3BhbkNvbnRleHQgaW5zdGFuY2UgdG9cbiAqICAgICAgICByZWZlcmVuY2UuXG4gKiBAcmV0dXJuIGEgUkVGRVJFTkNFX0ZPTExPV1NfRlJPTSByZWZlcmVuY2UgcG9pbnRpbmcgdG8gYHNwYW5Db250ZXh0YFxuICovXG5mdW5jdGlvbiBmb2xsb3dzRnJvbShzcGFuQ29udGV4dCkge1xuICAgIC8vIEFsbG93IHRoZSB1c2VyIHRvIHBhc3MgYSBTcGFuIGluc3RlYWQgb2YgYSBTcGFuQ29udGV4dFxuICAgIGlmIChzcGFuQ29udGV4dCBpbnN0YW5jZW9mIHNwYW5fMS5kZWZhdWx0KSB7XG4gICAgICAgIHNwYW5Db250ZXh0ID0gc3BhbkNvbnRleHQuY29udGV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHJlZmVyZW5jZV8xLmRlZmF1bHQoQ29uc3RhbnRzLlJFRkVSRU5DRV9GT0xMT1dTX0ZST00sIHNwYW5Db250ZXh0KTtcbn1cbmV4cG9ydHMuZm9sbG93c0Zyb20gPSBmb2xsb3dzRnJvbTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0aW9ucy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzcGFuXzEgPSByZXF1aXJlKFwiLi9zcGFuXCIpO1xudmFyIHNwYW5fY29udGV4dF8xID0gcmVxdWlyZShcIi4vc3Bhbl9jb250ZXh0XCIpO1xudmFyIHRyYWNlcl8xID0gcmVxdWlyZShcIi4vdHJhY2VyXCIpO1xuZXhwb3J0cy50cmFjZXIgPSBudWxsO1xuZXhwb3J0cy5zcGFuQ29udGV4dCA9IG51bGw7XG5leHBvcnRzLnNwYW4gPSBudWxsO1xuLy8gRGVmZXJyZWQgaW5pdGlhbGl6YXRpb24gdG8gYXZvaWQgYSBkZXBlbmRlbmN5IGN5Y2xlIHdoZXJlIFRyYWNlciBkZXBlbmRzIG9uXG4vLyBTcGFuIHdoaWNoIGRlcGVuZHMgb24gdGhlIG5vb3AgdHJhY2VyLlxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBleHBvcnRzLnRyYWNlciA9IG5ldyB0cmFjZXJfMS5kZWZhdWx0KCk7XG4gICAgZXhwb3J0cy5zcGFuID0gbmV3IHNwYW5fMS5kZWZhdWx0KCk7XG4gICAgZXhwb3J0cy5zcGFuQ29udGV4dCA9IG5ldyBzcGFuX2NvbnRleHRfMS5kZWZhdWx0KCk7XG59XG5leHBvcnRzLmluaXRpYWxpemUgPSBpbml0aWFsaXplO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzcGFuXzEgPSByZXF1aXJlKFwiLi9zcGFuXCIpO1xuLyoqXG4gKiBSZWZlcmVuY2UgcGFpcnMgYSByZWZlcmVuY2UgdHlwZSBjb25zdGFudCAoZS5nLiwgUkVGRVJFTkNFX0NISUxEX09GIG9yXG4gKiBSRUZFUkVOQ0VfRk9MTE9XU19GUk9NKSB3aXRoIHRoZSBTcGFuQ29udGV4dCBpdCBwb2ludHMgdG8uXG4gKlxuICogU2VlIHRoZSBleHBvcnRlZCBjaGlsZE9mKCkgYW5kIGZvbGxvd3NGcm9tKCkgZnVuY3Rpb25zIGF0IHRoZSBwYWNrYWdlIGxldmVsLlxuICovXG52YXIgUmVmZXJlbmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgYSBuZXcgUmVmZXJlbmNlIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB0aGUgUmVmZXJlbmNlIHR5cGUgY29uc3RhbnQgKGUuZy4sXG4gICAgICogICAgICAgIFJFRkVSRU5DRV9DSElMRF9PRiBvciBSRUZFUkVOQ0VfRk9MTE9XU19GUk9NKS5cbiAgICAgKiBAcGFyYW0ge1NwYW5Db250ZXh0fSByZWZlcmVuY2VkQ29udGV4dCAtIHRoZSBTcGFuQ29udGV4dCBiZWluZyByZWZlcnJlZFxuICAgICAqICAgICAgICB0by4gQXMgYSBjb252ZW5pZW5jZSwgYSBTcGFuIGluc3RhbmNlIG1heSBiZSBwYXNzZWQgaW4gaW5zdGVhZFxuICAgICAqICAgICAgICAoaW4gd2hpY2ggY2FzZSBpdHMgLmNvbnRleHQoKSBpcyB1c2VkIGhlcmUpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlZmVyZW5jZSh0eXBlLCByZWZlcmVuY2VkQ29udGV4dCkge1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5fcmVmZXJlbmNlZENvbnRleHQgPSAocmVmZXJlbmNlZENvbnRleHQgaW5zdGFuY2VvZiBzcGFuXzEuZGVmYXVsdCA/XG4gICAgICAgICAgICByZWZlcmVuY2VkQ29udGV4dC5jb250ZXh0KCkgOlxuICAgICAgICAgICAgcmVmZXJlbmNlZENvbnRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBSZWZlcmVuY2UgdHlwZSAoZS5nLiwgUkVGRVJFTkNFX0NISUxEX09GIG9yXG4gICAgICogICAgICAgICBSRUZFUkVOQ0VfRk9MTE9XU19GUk9NKS5cbiAgICAgKi9cbiAgICBSZWZlcmVuY2UucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7U3BhbkNvbnRleHR9IFRoZSBTcGFuQ29udGV4dCBiZWluZyByZWZlcnJlZCB0byAoZS5nLiwgdGhlXG4gICAgICogICAgICAgICBwYXJlbnQgaW4gYSBSRUZFUkVOQ0VfQ0hJTERfT0YgUmVmZXJlbmNlKS5cbiAgICAgKi9cbiAgICBSZWZlcmVuY2UucHJvdG90eXBlLnJlZmVyZW5jZWRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlZENvbnRleHQ7XG4gICAgfTtcbiAgICByZXR1cm4gUmVmZXJlbmNlO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFJlZmVyZW5jZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZmVyZW5jZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBub29wID0gcmVxdWlyZShcIi4vbm9vcFwiKTtcbi8qKlxuICogU3BhbiByZXByZXNlbnRzIGEgbG9naWNhbCB1bml0IG9mIHdvcmsgYXMgcGFydCBvZiBhIGJyb2FkZXIgVHJhY2UuIEV4YW1wbGVzXG4gKiBvZiBzcGFuIG1pZ2h0IGluY2x1ZGUgcmVtb3RlIHByb2NlZHVyZSBjYWxscyBvciBhIGluLXByb2Nlc3MgZnVuY3Rpb24gY2FsbHNcbiAqIHRvIHN1Yi1jb21wb25lbnRzLiBBIFRyYWNlIGhhcyBhIHNpbmdsZSwgdG9wLWxldmVsIFwicm9vdFwiIFNwYW4gdGhhdCBpbiB0dXJuXG4gKiBtYXkgaGF2ZSB6ZXJvIG9yIG1vcmUgY2hpbGQgU3BhbnMsIHdoaWNoIGluIHR1cm4gbWF5IGhhdmUgY2hpbGRyZW4uXG4gKi9cbnZhciBTcGFuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwYW4oKSB7XG4gICAgfVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAgICAvLyBPcGVuVHJhY2luZyBBUEkgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBTcGFuQ29udGV4dCBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgU3Bhbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NwYW5Db250ZXh0fVxuICAgICAqL1xuICAgIFNwYW4ucHJvdG90eXBlLmNvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0KCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBUcmFjZXIgb2JqZWN0IHVzZWQgdG8gY3JlYXRlIHRoaXMgU3Bhbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1RyYWNlcn1cbiAgICAgKi9cbiAgICBTcGFuLnByb3RvdHlwZS50cmFjZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFjZXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHN0cmluZyBuYW1lIGZvciB0aGUgbG9naWNhbCBvcGVyYXRpb24gdGhpcyBzcGFuIHJlcHJlc2VudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqL1xuICAgIFNwYW4ucHJvdG90eXBlLnNldE9wZXJhdGlvbk5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9zZXRPcGVyYXRpb25OYW1lKG5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgYSBrZXk6dmFsdWUgcGFpciBvbiB0aGlzIFNwYW4gdGhhdCBhbHNvIHByb3BhZ2F0ZXMgdG8gZnV0dXJlXG4gICAgICogY2hpbGRyZW4gb2YgdGhlIGFzc29jaWF0ZWQgU3Bhbi5cbiAgICAgKlxuICAgICAqIHNldEJhZ2dhZ2VJdGVtKCkgZW5hYmxlcyBwb3dlcmZ1bCBmdW5jdGlvbmFsaXR5IGdpdmVuIGEgZnVsbC1zdGFja1xuICAgICAqIG9wZW50cmFjaW5nIGludGVncmF0aW9uIChlLmcuLCBhcmJpdHJhcnkgYXBwbGljYXRpb24gZGF0YSBmcm9tIGEgd2ViXG4gICAgICogY2xpZW50IGNhbiBtYWtlIGl0LCB0cmFuc3BhcmVudGx5LCBhbGwgdGhlIHdheSBpbnRvIHRoZSBkZXB0aHMgb2YgYVxuICAgICAqIHN0b3JhZ2Ugc3lzdGVtKSwgYW5kIHdpdGggaXQgc29tZSBwb3dlcmZ1bCBjb3N0czogdXNlIHRoaXMgZmVhdHVyZSB3aXRoXG4gICAgICogY2FyZS5cbiAgICAgKlxuICAgICAqIElNUE9SVEFOVCBOT1RFICMxOiBzZXRCYWdnYWdlSXRlbSgpIHdpbGwgb25seSBwcm9wYWdhdGUgYmFnZ2FnZSBpdGVtcyB0b1xuICAgICAqICpmdXR1cmUqIGNhdXNhbCBkZXNjZW5kYW50cyBvZiB0aGUgYXNzb2NpYXRlZCBTcGFuLlxuICAgICAqXG4gICAgICogSU1QT1JUQU5UIE5PVEUgIzI6IFVzZSB0aGlzIHRob3VnaHRmdWxseSBhbmQgd2l0aCBjYXJlLiBFdmVyeSBrZXkgYW5kXG4gICAgICogdmFsdWUgaXMgY29waWVkIGludG8gZXZlcnkgbG9jYWwgKmFuZCByZW1vdGUqIGNoaWxkIG9mIHRoZSBhc3NvY2lhdGVkXG4gICAgICogU3BhbiwgYW5kIHRoYXQgY2FuIGFkZCB1cCB0byBhIGxvdCBvZiBuZXR3b3JrIGFuZCBjcHUgb3ZlcmhlYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgU3Bhbi5wcm90b3R5cGUuc2V0QmFnZ2FnZUl0ZW0gPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zZXRCYWdnYWdlSXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgYSBiYWdnYWdlIGl0ZW0gZ2l2ZW4gaXRzIGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5XG4gICAgICogICAgICAgICBUaGUga2V5IGZvciB0aGUgZ2l2ZW4gdHJhY2UgYXR0cmlidXRlLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKiAgICAgICAgIFN0cmluZyB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleSwgb3IgdW5kZWZpbmVkIGlmIHRoZSBrZXkgZG9lcyBub3RcbiAgICAgKiAgICAgICAgIGNvcnJlc3BvbmQgdG8gYSBzZXQgdHJhY2UgYXR0cmlidXRlLlxuICAgICAqL1xuICAgIFNwYW4ucHJvdG90eXBlLmdldEJhZ2dhZ2VJdGVtID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QmFnZ2FnZUl0ZW0oa2V5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgYSBzaW5nbGUgdGFnIHRvIHRoZSBzcGFuLiAgU2VlIGBhZGRUYWdzKClgIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICAgICAqL1xuICAgIFNwYW4ucHJvdG90eXBlLnNldFRhZyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIC8vIE5PVEU6IHRoZSBjYWxsIGlzIG5vcm1hbGl6ZWQgdG8gYSBjYWxsIHRvIF9hZGRUYWdzKClcbiAgICAgICAgdGhpcy5fYWRkVGFncygoX2EgPSB7fSwgX2Fba2V5XSA9IHZhbHVlLCBfYSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIF9hO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4ga2V5IHZhbHVlIHBhaXJzIHRvIHRoZSBzZXQgb2Ygc3BhbiB0YWdzLlxuICAgICAqXG4gICAgICogTXVsdGlwbGUgY2FsbHMgdG8gYWRkVGFncygpIHJlc3VsdHMgaW4gdGhlIHRhZ3MgYmVpbmcgdGhlIHN1cGVyc2V0IG9mXG4gICAgICogYWxsIGNhbGxzLlxuICAgICAqXG4gICAgICogVGhlIGJlaGF2aW9yIG9mIHNldHRpbmcgdGhlIHNhbWUga2V5IG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lIHNwYW5cbiAgICAgKiBpcyB1bmRlZmluZWQuXG4gICAgICpcbiAgICAgKiBUaGUgc3VwcG9ydGVkIHR5cGUgb2YgdGhlIHZhbHVlcyBpcyBpbXBsZW1lbnRhdGlvbi1kZXBlbmRlbnQuXG4gICAgICogSW1wbGVtZW50YXRpb25zIGFyZSBleHBlY3RlZCB0byBzYWZlbHkgaGFuZGxlIGFsbCB0eXBlcyBvZiB2YWx1ZXMgYnV0XG4gICAgICogbWF5IGNob29zZSB0byBpZ25vcmUgdW5yZWNvZ25pemVkIC8gdW5oYW5kbGUtYWJsZSB2YWx1ZXMgKGUuZy4gb2JqZWN0c1xuICAgICAqIHdpdGggY3ljbGljIHJlZmVyZW5jZXMsIGZ1bmN0aW9uIG9iamVjdHMpLlxuICAgICAqXG4gICAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgU3Bhbi5wcm90b3R5cGUuYWRkVGFncyA9IGZ1bmN0aW9uIChrZXlWYWx1ZU1hcCkge1xuICAgICAgICB0aGlzLl9hZGRUYWdzKGtleVZhbHVlTWFwKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBsb2cgcmVjb3JkIHRvIHRoaXMgU3Bhbiwgb3B0aW9uYWxseSBhdCBhIHVzZXItcHJvdmlkZWQgdGltZXN0YW1wLlxuICAgICAqXG4gICAgICogRm9yIGV4YW1wbGU6XG4gICAgICpcbiAgICAgKiAgICAgc3Bhbi5sb2coe1xuICAgICAqICAgICAgICAgc2l6ZTogcnBjLnNpemUoKSwgIC8vIG51bWVyaWMgdmFsdWVcbiAgICAgKiAgICAgICAgIFVSSTogcnBjLlVSSSgpLCAgLy8gc3RyaW5nIHZhbHVlXG4gICAgICogICAgICAgICBwYXlsb2FkOiBycGMucGF5bG9hZCgpLCAgLy8gT2JqZWN0IHZhbHVlXG4gICAgICogICAgICAgICBcImtleXMgY2FuIGJlIGFyYml0cmFyeSBzdHJpbmdzXCI6IHJwYy5mb28oKSxcbiAgICAgKiAgICAgfSk7XG4gICAgICpcbiAgICAgKiAgICAgc3Bhbi5sb2coe1xuICAgICAqICAgICAgICAgXCJlcnJvci5kZXNjcmlwdGlvblwiOiBzb21lRXJyb3IuZGVzY3JpcHRpb24oKSxcbiAgICAgKiAgICAgfSwgc29tZUVycm9yLnRpbWVzdGFtcE1pbGxpcygpKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBrZXlWYWx1ZVBhaXJzXG4gICAgICogICAgICAgIEFuIG9iamVjdCBtYXBwaW5nIHN0cmluZyBrZXlzIHRvIGFyYml0cmFyeSB2YWx1ZSB0eXBlcy4gQWxsXG4gICAgICogICAgICAgIFRyYWNlciBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIHN1cHBvcnQgYm9vbCwgc3RyaW5nLCBhbmQgbnVtZXJpY1xuICAgICAqICAgICAgICB2YWx1ZSB0eXBlcywgYW5kIHNvbWUgbWF5IGFsc28gc3VwcG9ydCBPYmplY3QgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXBcbiAgICAgKiAgICAgICAgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHNwZWNpZnlpbmcgdGhlIHRpbWVzdGFtcCBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiAgICAgICAgc2luY2UgdGhlIFVuaXggZXBvY2guIEZyYWN0aW9uYWwgdmFsdWVzIGFyZSBhbGxvd2VkIHNvIHRoYXRcbiAgICAgKiAgICAgICAgdGltZXN0YW1wcyB3aXRoIHN1Yi1taWxsaXNlY29uZCBhY2N1cmFjeSBjYW4gYmUgcmVwcmVzZW50ZWQuIElmXG4gICAgICogICAgICAgIG5vdCBzcGVjaWZpZWQsIHRoZSBpbXBsZW1lbnRhdGlvbiBpcyBleHBlY3RlZCB0byB1c2UgaXRzIG5vdGlvblxuICAgICAqICAgICAgICBvZiB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSBjYWxsLlxuICAgICAqL1xuICAgIFNwYW4ucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uIChrZXlWYWx1ZVBhaXJzLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5fbG9nKGtleVZhbHVlUGFpcnMsIHRpbWVzdGFtcCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogREVQUkVDQVRFRFxuICAgICAqL1xuICAgIFNwYW4ucHJvdG90eXBlLmxvZ0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgcGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9nKHsgZXZlbnQ6IGV2ZW50TmFtZSwgcGF5bG9hZDogcGF5bG9hZCB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGVuZCB0aW1lc3RhbXAgYW5kIGZpbmFsaXplcyBTcGFuIHN0YXRlLlxuICAgICAqXG4gICAgICogV2l0aCB0aGUgZXhjZXB0aW9uIG9mIGNhbGxzIHRvIFNwYW4uY29udGV4dCgpICh3aGljaCBhcmUgYWx3YXlzIGFsbG93ZWQpLFxuICAgICAqIGZpbmlzaCgpIG11c3QgYmUgdGhlIGxhc3QgY2FsbCBtYWRlIHRvIGFueSBzcGFuIGluc3RhbmNlLCBhbmQgdG8gZG9cbiAgICAgKiBvdGhlcndpc2UgbGVhZHMgdG8gdW5kZWZpbmVkIGJlaGF2aW9yLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSBmaW5pc2hUaW1lXG4gICAgICogICAgICAgICBPcHRpb25hbCBmaW5pc2ggdGltZSBpbiBtaWxsaXNlY29uZHMgYXMgYSBVbml4IHRpbWVzdGFtcC4gRGVjaW1hbFxuICAgICAqICAgICAgICAgdmFsdWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHRpbWVzdGFtcHMgd2l0aCBzdWItbWlsbGlzZWNvbmQgYWNjdXJhY3kuXG4gICAgICogICAgICAgICBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgY3VycmVudCB0aW1lIChhcyBkZWZpbmVkIGJ5IHRoZVxuICAgICAqICAgICAgICAgaW1wbGVtZW50YXRpb24pIHdpbGwgYmUgdXNlZC5cbiAgICAgKi9cbiAgICBTcGFuLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoZmluaXNoVGltZSkge1xuICAgICAgICB0aGlzLl9maW5pc2goZmluaXNoVGltZSk7XG4gICAgICAgIC8vIERvIG5vdCByZXR1cm4gYHRoaXNgLiBUaGUgU3BhbiBnZW5lcmFsbHkgc2hvdWxkIG5vdCBiZSB1c2VkIGFmdGVyIGl0XG4gICAgICAgIC8vIGlzIGZpbmlzaGVkIHNvIGNoYWluaW5nIGlzIG5vdCBkZXNpcmVkIGluIHRoaXMgY29udGV4dC5cbiAgICB9O1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAgICAvLyBEZXJpdmVkIGNsYXNzZXMgY2FuIGNob29zZSB0byBpbXBsZW1lbnQgdGhlIGJlbG93XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuICAgIC8vIEJ5IGRlZmF1bHQgcmV0dXJucyBhIG5vLW9wIFNwYW5Db250ZXh0LlxuICAgIFNwYW4ucHJvdG90eXBlLl9jb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbm9vcC5zcGFuQ29udGV4dDtcbiAgICB9O1xuICAgIC8vIEJ5IGRlZmF1bHQgcmV0dXJucyBhIG5vLW9wIHRyYWNlci5cbiAgICAvL1xuICAgIC8vIFRoZSBiYXNlIGNsYXNzIGNvdWxkIHN0b3JlIHRoZSB0cmFjZXIgdGhhdCBjcmVhdGVkIGl0LCBidXQgaXQgZG9lcyBub3RcbiAgICAvLyBpbiBvcmRlciB0byBlbnN1cmUgdGhlIG5vLW9wIHNwYW4gaW1wbGVtZW50YXRpb24gaGFzIHplcm8gbWVtYmVycyxcbiAgICAvLyB3aGljaCBhbGxvd3MgVjggdG8gYWdncmVzc2l2ZWx5IG9wdGltaXplIGNhbGxzIHRvIHN1Y2ggb2JqZWN0cy5cbiAgICBTcGFuLnByb3RvdHlwZS5fdHJhY2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbm9vcC50cmFjZXI7XG4gICAgfTtcbiAgICAvLyBCeSBkZWZhdWx0IGRvZXMgbm90aGluZ1xuICAgIFNwYW4ucHJvdG90eXBlLl9zZXRPcGVyYXRpb25OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB9O1xuICAgIC8vIEJ5IGRlZmF1bHQgZG9lcyBub3RoaW5nXG4gICAgU3Bhbi5wcm90b3R5cGUuX3NldEJhZ2dhZ2VJdGVtID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICB9O1xuICAgIC8vIEJ5IGRlZmF1bHQgZG9lcyBub3RoaW5nXG4gICAgU3Bhbi5wcm90b3R5cGUuX2dldEJhZ2dhZ2VJdGVtID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLy8gQnkgZGVmYXVsdCBkb2VzIG5vdGhpbmdcbiAgICAvL1xuICAgIC8vIE5PVEU6IGJvdGggc2V0VGFnKCkgYW5kIGFkZFRhZ3MoKSBtYXAgdG8gdGhpcyBmdW5jdGlvbi4ga2V5VmFsdWVQYWlyc1xuICAgIC8vIHdpbGwgYWx3YXlzIGJlIGFuIGFzc29jaWF0aXZlIGFycmF5LlxuICAgIFNwYW4ucHJvdG90eXBlLl9hZGRUYWdzID0gZnVuY3Rpb24gKGtleVZhbHVlUGFpcnMpIHtcbiAgICB9O1xuICAgIC8vIEJ5IGRlZmF1bHQgZG9lcyBub3RoaW5nXG4gICAgU3Bhbi5wcm90b3R5cGUuX2xvZyA9IGZ1bmN0aW9uIChrZXlWYWx1ZVBhaXJzLCB0aW1lc3RhbXApIHtcbiAgICB9O1xuICAgIC8vIEJ5IGRlZmF1bHQgZG9lcyBub3RoaW5nXG4gICAgLy9cbiAgICAvLyBmaW5pc2hUaW1lIGlzIGV4cGVjdGVkIHRvIGJlIGVpdGhlciBhIG51bWJlciBvciB1bmRlZmluZWQuXG4gICAgU3Bhbi5wcm90b3R5cGUuX2ZpbmlzaCA9IGZ1bmN0aW9uIChmaW5pc2hUaW1lKSB7XG4gICAgfTtcbiAgICByZXR1cm4gU3Bhbjtcbn0oKSk7XG5leHBvcnRzLlNwYW4gPSBTcGFuO1xuZXhwb3J0cy5kZWZhdWx0ID0gU3Bhbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNwYW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFNwYW5Db250ZXh0IHJlcHJlc2VudHMgU3BhbiBzdGF0ZSB0aGF0IG11c3QgcHJvcGFnYXRlIHRvIGRlc2NlbmRhbnQgU3BhbnNcbiAqIGFuZCBhY3Jvc3MgcHJvY2VzcyBib3VuZGFyaWVzLlxuICpcbiAqIFNwYW5Db250ZXh0IGlzIGxvZ2ljYWxseSBkaXZpZGVkIGludG8gdHdvIHBpZWNlczogdGhlIHVzZXItbGV2ZWwgXCJCYWdnYWdlXCJcbiAqIChzZWUgc2V0QmFnZ2FnZUl0ZW0gYW5kIGdldEJhZ2dhZ2VJdGVtKSB0aGF0IHByb3BhZ2F0ZXMgYWNyb3NzIFNwYW5cbiAqIGJvdW5kYXJpZXMgYW5kIGFueSBUcmFjZXItaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgZmllbGRzIHRoYXQgYXJlIG5lZWRlZCB0b1xuICogaWRlbnRpZnkgb3Igb3RoZXJ3aXNlIGNvbnRleHR1YWxpemUgdGhlIGFzc29jaWF0ZWQgU3BhbiBpbnN0YW5jZSAoZS5nLiwgYVxuICogPHRyYWNlX2lkLCBzcGFuX2lkLCBzYW1wbGVkPiB0dXBsZSkuXG4gKi9cbnZhciBTcGFuQ29udGV4dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGFuQ29udGV4dCgpIHtcbiAgICB9XG4gICAgcmV0dXJuIFNwYW5Db250ZXh0O1xufSgpKTtcbmV4cG9ydHMuU3BhbkNvbnRleHQgPSBTcGFuQ29udGV4dDtcbmV4cG9ydHMuZGVmYXVsdCA9IFNwYW5Db250ZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Bhbl9jb250ZXh0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEZ1bmN0aW9ucyA9IHJlcXVpcmUoXCIuL2Z1bmN0aW9uc1wiKTtcbnZhciBOb29wID0gcmVxdWlyZShcIi4vbm9vcFwiKTtcbnZhciBzcGFuXzEgPSByZXF1aXJlKFwiLi9zcGFuXCIpO1xuLyoqXG4gKiBUcmFjZXIgaXMgdGhlIGVudHJ5LXBvaW50IGJldHdlZW4gdGhlIGluc3RydW1lbnRhdGlvbiBBUEkgYW5kIHRoZSB0cmFjaW5nXG4gKiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBUaGUgZGVmYXVsdCBvYmplY3QgYWN0cyBhcyBhIG5vLW9wIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIE5vdGUgdG8gaW1wbGVtZW50YXRvcnM6IGRlcml2ZWQgY2xhc3NlcyBjYW4gY2hvb3NlIHRvIGRpcmVjdGx5IGltcGxlbWVudCB0aGVcbiAqIG1ldGhvZHMgaW4gdGhlIFwiT3BlblRyYWNpbmcgQVBJIG1ldGhvZHNcIiBzZWN0aW9uLCBvciBvcHRpb25hbGx5IHRoZSBzdWJzZXQgb2ZcbiAqIHVuZGVyc2NvcmUtcHJlZml4ZWQgbWV0aG9kcyB0byBwaWNrIHVwIHRoZSBhcmd1bWVudCBjaGVja2luZyBhbmQgaGFuZGxpbmdcbiAqIGF1dG9tYXRpY2FsbHkgZnJvbSB0aGUgYmFzZSBjbGFzcy5cbiAqL1xudmFyIFRyYWNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUcmFjZXIoKSB7XG4gICAgfVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAgICAvLyBPcGVuVHJhY2luZyBBUEkgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYW5kIHJldHVybnMgYSBuZXcgU3BhbiByZXByZXNlbnRpbmcgYSBsb2dpY2FsIHVuaXQgb2Ygd29yay5cbiAgICAgKlxuICAgICAqIEZvciBleGFtcGxlOlxuICAgICAqXG4gICAgICogICAgIC8vIFN0YXJ0IGEgbmV3IChwYXJlbnRsZXNzKSByb290IFNwYW46XG4gICAgICogICAgIHZhciBwYXJlbnQgPSBUcmFjZXIuc3RhcnRTcGFuKCdEb1dvcmsnKTtcbiAgICAgKlxuICAgICAqICAgICAvLyBTdGFydCBhIG5ldyAoY2hpbGQpIFNwYW46XG4gICAgICogICAgIHZhciBjaGlsZCA9IFRyYWNlci5zdGFydFNwYW4oJ2xvYWQtZnJvbS1kYicsIHtcbiAgICAgKiAgICAgICAgIGNoaWxkT2Y6IHBhcmVudC5jb250ZXh0KCksXG4gICAgICogICAgIH0pO1xuICAgICAqXG4gICAgICogICAgIC8vIFN0YXJ0IGEgbmV3IGFzeW5jIChGb2xsb3dzRnJvbSkgU3BhbjpcbiAgICAgKiAgICAgdmFyIGNoaWxkID0gVHJhY2VyLnN0YXJ0U3BhbignYXN5bmMtY2FjaGUtd3JpdGUnLCB7XG4gICAgICogICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICogICAgICAgICAgICAgb3BlbnRyYWNpbmcuZm9sbG93c0Zyb20ocGFyZW50LmNvbnRleHQoKSlcbiAgICAgKiAgICAgICAgIF0sXG4gICAgICogICAgIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgb3BlcmF0aW9uIChSRVFVSVJFRCkuXG4gICAgICogQHBhcmFtIHtTcGFuT3B0aW9uc30gW29wdGlvbnNdIC0gb3B0aW9ucyBmb3IgdGhlIG5ld2x5IGNyZWF0ZWQgc3Bhbi5cbiAgICAgKiBAcmV0dXJuIHtTcGFufSAtIGEgbmV3IFNwYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIFRyYWNlci5wcm90b3R5cGUuc3RhcnRTcGFuID0gZnVuY3Rpb24gKG5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgLy8gQ29udmVydCBvcHRpb25zLmNoaWxkT2YgdG8gZmllbGRzLnJlZmVyZW5jZXMgYXMgbmVlZGVkLlxuICAgICAgICBpZiAob3B0aW9ucy5jaGlsZE9mKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IGZyb20gYSBTcGFuIG9yIGEgU3BhbkNvbnRleHQgaW50byBhIFJlZmVyZW5jZS5cbiAgICAgICAgICAgIHZhciBjaGlsZE9mID0gRnVuY3Rpb25zLmNoaWxkT2Yob3B0aW9ucy5jaGlsZE9mKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJlZmVyZW5jZXMucHVzaChjaGlsZE9mKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucmVmZXJlbmNlcyA9IFtjaGlsZE9mXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSAob3B0aW9ucy5jaGlsZE9mKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRTcGFuKG5hbWUsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5qZWN0cyB0aGUgZ2l2ZW4gU3BhbkNvbnRleHQgaW5zdGFuY2UgZm9yIGNyb3NzLXByb2Nlc3MgcHJvcGFnYXRpb25cbiAgICAgKiB3aXRoaW4gYGNhcnJpZXJgLiBUaGUgZXhwZWN0ZWQgdHlwZSBvZiBgY2FycmllcmAgZGVwZW5kcyBvbiB0aGUgdmFsdWUgb2ZcbiAgICAgKiBgZm9ybWF0LlxuICAgICAqXG4gICAgICogT3BlblRyYWNpbmcgZGVmaW5lcyBhIGNvbW1vbiBzZXQgb2YgYGZvcm1hdGAgdmFsdWVzIChzZWVcbiAgICAgKiBGT1JNQVRfVEVYVF9NQVAsIEZPUk1BVF9IVFRQX0hFQURFUlMsIGFuZCBGT1JNQVRfQklOQVJZKSwgYW5kIGVhY2ggaGFzXG4gICAgICogYW4gZXhwZWN0ZWQgY2FycmllciB0eXBlLlxuICAgICAqXG4gICAgICogQ29uc2lkZXIgdGhpcyBwc2V1ZG9jb2RlIGV4YW1wbGU6XG4gICAgICpcbiAgICAgKiAgICAgdmFyIGNsaWVudFNwYW4gPSAuLi47XG4gICAgICogICAgIC4uLlxuICAgICAqICAgICAvLyBJbmplY3QgY2xpZW50U3BhbiBpbnRvIGEgdGV4dCBjYXJyaWVyLlxuICAgICAqICAgICB2YXIgaGVhZGVyc0NhcnJpZXIgPSB7fTtcbiAgICAgKiAgICAgVHJhY2VyLmluamVjdChjbGllbnRTcGFuLmNvbnRleHQoKSwgVHJhY2VyLkZPUk1BVF9IVFRQX0hFQURFUlMsIGhlYWRlcnNDYXJyaWVyKTtcbiAgICAgKiAgICAgLy8gSW5jb3Jwb3JhdGUgdGhlIHRleHRDYXJyaWVyIGludG8gdGhlIG91dGJvdW5kIEhUVFAgcmVxdWVzdCBoZWFkZXJcbiAgICAgKiAgICAgLy8gbWFwLlxuICAgICAqICAgICBPYmplY3QuYXNzaWduKG91dGJvdW5kSFRUUFJlcS5oZWFkZXJzLCBoZWFkZXJzQ2Fycmllcik7XG4gICAgICogICAgIC8vIC4uLiBzZW5kIHRoZSBodHRwUmVxXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTcGFuQ29udGV4dH0gc3BhbkNvbnRleHQgLSB0aGUgU3BhbkNvbnRleHQgdG8gaW5qZWN0IGludG8gdGhlXG4gICAgICogICAgICAgICBjYXJyaWVyIG9iamVjdC4gQXMgYSBjb252ZW5pZW5jZSwgYSBTcGFuIGluc3RhbmNlIG1heSBiZSBwYXNzZWRcbiAgICAgKiAgICAgICAgIGluIGluc3RlYWQgKGluIHdoaWNoIGNhc2UgaXRzIC5jb250ZXh0KCkgaXMgdXNlZCBmb3IgdGhlXG4gICAgICogICAgICAgICBpbmplY3QoKSkuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBmb3JtYXQgLSB0aGUgZm9ybWF0IG9mIHRoZSBjYXJyaWVyLlxuICAgICAqIEBwYXJhbSAge2FueX0gY2FycmllciAtIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGNob3NlbiBgZm9ybWF0YFxuICAgICAqICAgICAgICAgZm9yIGEgZGVzY3JpcHRpb24gb2YgdGhlIGNhcnJpZXIgb2JqZWN0LlxuICAgICAqL1xuICAgIFRyYWNlci5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gKHNwYW5Db250ZXh0LCBmb3JtYXQsIGNhcnJpZXIpIHtcbiAgICAgICAgLy8gQWxsb3cgdGhlIHVzZXIgdG8gcGFzcyBhIFNwYW4gaW5zdGVhZCBvZiBhIFNwYW5Db250ZXh0XG4gICAgICAgIGlmIChzcGFuQ29udGV4dCBpbnN0YW5jZW9mIHNwYW5fMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBzcGFuQ29udGV4dCA9IHNwYW5Db250ZXh0LmNvbnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNwYW5Db250ZXh0LCBmb3JtYXQsIGNhcnJpZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFNwYW5Db250ZXh0IGluc3RhbmNlIGV4dHJhY3RlZCBmcm9tIGBjYXJyaWVyYCBpbiB0aGUgZ2l2ZW5cbiAgICAgKiBgZm9ybWF0YC5cbiAgICAgKlxuICAgICAqIE9wZW5UcmFjaW5nIGRlZmluZXMgYSBjb21tb24gc2V0IG9mIGBmb3JtYXRgIHZhbHVlcyAoc2VlXG4gICAgICogRk9STUFUX1RFWFRfTUFQLCBGT1JNQVRfSFRUUF9IRUFERVJTLCBhbmQgRk9STUFUX0JJTkFSWSksIGFuZCBlYWNoIGhhc1xuICAgICAqIGFuIGV4cGVjdGVkIGNhcnJpZXIgdHlwZS5cbiAgICAgKlxuICAgICAqIENvbnNpZGVyIHRoaXMgcHNldWRvY29kZSBleGFtcGxlOlxuICAgICAqXG4gICAgICogICAgIC8vIFVzZSB0aGUgaW5ib3VuZCBIVFRQIHJlcXVlc3QncyBoZWFkZXJzIGFzIGEgdGV4dCBtYXAgY2Fycmllci5cbiAgICAgKiAgICAgdmFyIGhlYWRlcnNDYXJyaWVyID0gaW5ib3VuZEhUVFBSZXEuaGVhZGVycztcbiAgICAgKiAgICAgdmFyIHdpcmVDdHggPSBUcmFjZXIuZXh0cmFjdChUcmFjZXIuRk9STUFUX0hUVFBfSEVBREVSUywgaGVhZGVyc0NhcnJpZXIpO1xuICAgICAqICAgICB2YXIgc2VydmVyU3BhbiA9IFRyYWNlci5zdGFydFNwYW4oJy4uLicsIHsgY2hpbGRPZiA6IHdpcmVDdHggfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGZvcm1hdCAtIHRoZSBmb3JtYXQgb2YgdGhlIGNhcnJpZXIuXG4gICAgICogQHBhcmFtICB7YW55fSBjYXJyaWVyIC0gdGhlIHR5cGUgb2YgdGhlIGNhcnJpZXIgb2JqZWN0IGlzIGRldGVybWluZWQgYnlcbiAgICAgKiAgICAgICAgIHRoZSBmb3JtYXQuXG4gICAgICogQHJldHVybiB7U3BhbkNvbnRleHR9XG4gICAgICogICAgICAgICBUaGUgZXh0cmFjdGVkIFNwYW5Db250ZXh0LCBvciBudWxsIGlmIG5vIHN1Y2ggU3BhbkNvbnRleHQgY291bGRcbiAgICAgKiAgICAgICAgIGJlIGZvdW5kIGluIGBjYXJyaWVyYFxuICAgICAqL1xuICAgIFRyYWNlci5wcm90b3R5cGUuZXh0cmFjdCA9IGZ1bmN0aW9uIChmb3JtYXQsIGNhcnJpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dHJhY3QoZm9ybWF0LCBjYXJyaWVyKTtcbiAgICB9O1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cbiAgICAvLyBEZXJpdmVkIGNsYXNzZXMgY2FuIGNob29zZSB0byBpbXBsZW1lbnQgdGhlIGJlbG93XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuICAgIC8vIE5PVEU6IHRoZSBpbnB1dCB0byB0aGlzIG1ldGhvZCBpcyAqYWx3YXlzKiBhbiBhc3NvY2lhdGl2ZSBhcnJheS4gVGhlXG4gICAgLy8gcHVibGljLWZhY2luZyBzdGFydFNwYW4oKSBtZXRob2Qgbm9ybWFsaXplcyB0aGUgYXJndW1lbnRzIHNvIHRoYXRcbiAgICAvLyBhbGwgTiBpbXBsZW1lbnRhdGlvbnMgZG8gbm90IG5lZWQgdG8gd29ycnkgYWJvdXQgdmFyaWF0aW9ucyBpbiB0aGUgY2FsbFxuICAgIC8vIHNpZ25hdHVyZS5cbiAgICAvL1xuICAgIC8vIFRoZSBkZWZhdWx0IGJlaGF2aW9yIHJldHVybnMgYSBuby1vcCBzcGFuLlxuICAgIFRyYWNlci5wcm90b3R5cGUuX3N0YXJ0U3BhbiA9IGZ1bmN0aW9uIChuYW1lLCBmaWVsZHMpIHtcbiAgICAgICAgcmV0dXJuIE5vb3Auc3BhbjtcbiAgICB9O1xuICAgIC8vIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIGEgbm8tb3AuXG4gICAgVHJhY2VyLnByb3RvdHlwZS5faW5qZWN0ID0gZnVuY3Rpb24gKHNwYW5Db250ZXh0LCBmb3JtYXQsIGNhcnJpZXIpIHtcbiAgICB9O1xuICAgIC8vIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHJldHVybiBhIG5vLW9wIFNwYW5Db250ZXh0LlxuICAgIFRyYWNlci5wcm90b3R5cGUuX2V4dHJhY3QgPSBmdW5jdGlvbiAoZm9ybWF0LCBjYXJyaWVyKSB7XG4gICAgICAgIHJldHVybiBOb29wLnNwYW5Db250ZXh0O1xuICAgIH07XG4gICAgcmV0dXJuIFRyYWNlcjtcbn0oKSk7XG5leHBvcnRzLlRyYWNlciA9IFRyYWNlcjtcbmV4cG9ydHMuZGVmYXVsdCA9IFRyYWNlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYWNlci5qcy5tYXAiLCIvKipcbiAqIEB0aGlzIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBmaW5hbGx5Q29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlamVjdChyZWFzb24pO1xuICAgICAgfSk7XG4gICAgfVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmaW5hbGx5Q29uc3RydWN0b3I7XG4iLCJpbXBvcnQgcHJvbWlzZUZpbmFsbHkgZnJvbSAnLi9maW5hbGx5JztcblxuLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbi8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxudmFyIHNldFRpbWVvdXRGdW5jID0gc2V0VGltZW91dDtcblxuZnVuY3Rpb24gaXNBcnJheSh4KSB7XG4gIHJldHVybiBCb29sZWFuKHggJiYgdHlwZW9mIHgubGVuZ3RoICE9PSAndW5kZWZpbmVkJyk7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyBQb2x5ZmlsbCBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBQcm9taXNlKGZuKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgLyoqIEB0eXBlIHshbnVtYmVyfSAqL1xuICB0aGlzLl9zdGF0ZSA9IDA7XG4gIC8qKiBAdHlwZSB7IWJvb2xlYW59ICovXG4gIHRoaXMuX2hhbmRsZWQgPSBmYWxzZTtcbiAgLyoqIEB0eXBlIHtQcm9taXNlfHVuZGVmaW5lZH0gKi9cbiAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gIC8qKiBAdHlwZSB7IUFycmF5PCFGdW5jdGlvbj59ICovXG4gIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gIGRvUmVzb2x2ZShmbiwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuICB3aGlsZSAoc2VsZi5fc3RhdGUgPT09IDMpIHtcbiAgICBzZWxmID0gc2VsZi5fdmFsdWU7XG4gIH1cbiAgaWYgKHNlbGYuX3N0YXRlID09PSAwKSB7XG4gICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcbiAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgICAoc2VsZi5fc3RhdGUgPT09IDEgPyByZXNvbHZlIDogcmVqZWN0KShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl92YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciByZXQ7XG4gICAgdHJ5IHtcbiAgICAgIHJldCA9IGNiKHNlbGYuX3ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUoc2VsZiwgbmV3VmFsdWUpIHtcbiAgdHJ5IHtcbiAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZilcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgaWYgKFxuICAgICAgbmV3VmFsdWUgJiZcbiAgICAgICh0eXBlb2YgbmV3VmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICApIHtcbiAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgc2VsZi5fc3RhdGUgPSAzO1xuICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZG9SZXNvbHZlKGJpbmQodGhlbiwgbmV3VmFsdWUpLCBzZWxmKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLl9zdGF0ZSA9IDE7XG4gICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBmaW5hbGUoc2VsZik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZWplY3Qoc2VsZiwgZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVqZWN0KHNlbGYsIG5ld1ZhbHVlKSB7XG4gIHNlbGYuX3N0YXRlID0gMjtcbiAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgZmluYWxlKHNlbGYpO1xufVxuXG5mdW5jdGlvbiBmaW5hbGUoc2VsZikge1xuICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFzZWxmLl9oYW5kbGVkKSB7XG4gICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcbiAgfVxuICBzZWxmLl9kZWZlcnJlZHMgPSBudWxsO1xufVxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG4gIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG4gIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG59XG5cbi8qKlxuICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAqIG9uRnVsZmlsbGVkIGFuZCBvblJlamVjdGVkIGFyZSBvbmx5IGNhbGxlZCBvbmNlLlxuICpcbiAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAqL1xuZnVuY3Rpb24gZG9SZXNvbHZlKGZuLCBzZWxmKSB7XG4gIHZhciBkb25lID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgZm4oXG4gICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgIH1cbiAgICApO1xuICB9IGNhdGNoIChleCkge1xuICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgZG9uZSA9IHRydWU7XG4gICAgcmVqZWN0KHNlbGYsIGV4KTtcbiAgfVxufVxuXG5Qcm9taXNlLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAvLyBAdHMtaWdub3JlXG4gIHZhciBwcm9tID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9tKSk7XG4gIHJldHVybiBwcm9tO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IHByb21pc2VGaW5hbGx5O1xuXG5Qcm9taXNlLmFsbCA9IGZ1bmN0aW9uKGFycikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IFR5cGVFcnJvcignUHJvbWlzZS5hbGwgYWNjZXB0cyBhbiBhcnJheScpKTtcbiAgICB9XG5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgdmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuXG4gICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhlbi5jYWxsKFxuICAgICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHJlcyhpLCB2YWwpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFyZ3NbaV0gPSB2YWw7XG4gICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHJlamVjdChleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXMoaSwgYXJnc1tpXSk7XG4gICAgfVxuICB9KTtcbn07XG5cblByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSk7XG59O1xuXG5Qcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZWplY3QodmFsdWUpO1xuICB9KTtcbn07XG5cblByb21pc2UucmFjZSA9IGZ1bmN0aW9uKGFycikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IFR5cGVFcnJvcignUHJvbWlzZS5yYWNlIGFjY2VwdHMgYW4gYXJyYXknKSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKGFycltpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBVc2UgcG9seWZpbGwgZm9yIHNldEltbWVkaWF0ZSBmb3IgcGVyZm9ybWFuY2UgZ2FpbnNcblByb21pc2UuX2ltbWVkaWF0ZUZuID1cbiAgLy8gQHRzLWlnbm9yZVxuICAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBzZXRJbW1lZGlhdGUoZm4pO1xuICAgIH0pIHx8XG4gIGZ1bmN0aW9uKGZuKSB7XG4gICAgc2V0VGltZW91dEZ1bmMoZm4sIDApO1xuICB9O1xuXG5Qcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF91bmhhbmRsZWRSZWplY3Rpb25GbihlcnIpIHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XG4gICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb21pc2U7XG4iLCIoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgLy8gVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uIChVTUQpIHRvIHN1cHBvcnQgQU1ELCBDb21tb25KUy9Ob2RlLmpzLCBSaGlubywgYW5kIGJyb3dzZXJzLlxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZSgnc3RhY2tmcmFtZScsIFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LlN0YWNrRnJhbWUgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGZ1bmN0aW9uIF9pc051bWJlcihuKSB7XG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gU3RhY2tGcmFtZShmdW5jdGlvbk5hbWUsIGFyZ3MsIGZpbGVOYW1lLCBsaW5lTnVtYmVyLCBjb2x1bW5OdW1iZXIsIHNvdXJjZSkge1xuICAgICAgICBpZiAoZnVuY3Rpb25OYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RnVuY3Rpb25OYW1lKGZ1bmN0aW9uTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBcmdzKGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxlTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZpbGVOYW1lKGZpbGVOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZU51bWJlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldExpbmVOdW1iZXIobGluZU51bWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbk51bWJlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbHVtbk51bWJlcihjb2x1bW5OdW1iZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFN0YWNrRnJhbWUucHJvdG90eXBlID0ge1xuICAgICAgICBnZXRGdW5jdGlvbk5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uTmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RnVuY3Rpb25OYW1lOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5mdW5jdGlvbk5hbWUgPSBTdHJpbmcodik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0QXJnczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJncztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0QXJnczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodikgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmdzIG11c3QgYmUgYW4gQXJyYXknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXJncyA9IHY7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTk9URTogUHJvcGVydHkgbmFtZSBtYXkgYmUgbWlzbGVhZGluZyBhcyBpdCBpbmNsdWRlcyB0aGUgcGF0aCxcbiAgICAgICAgLy8gYnV0IGl0IHNvbWV3aGF0IG1pcnJvcnMgVjgncyBKYXZhU2NyaXB0U3RhY2tUcmFjZUFwaVxuICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L3dpa2kvSmF2YVNjcmlwdFN0YWNrVHJhY2VBcGkgYW5kIEdlY2tvJ3NcbiAgICAgICAgLy8gaHR0cDovL214ci5tb3ppbGxhLm9yZy9tb3ppbGxhLWNlbnRyYWwvc291cmNlL3hwY29tL2Jhc2UvbnNJRXhjZXB0aW9uLmlkbCMxNFxuICAgICAgICBnZXRGaWxlTmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZU5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEZpbGVOYW1lOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5maWxlTmFtZSA9IFN0cmluZyh2KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRMaW5lTnVtYmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saW5lTnVtYmVyO1xuICAgICAgICB9LFxuICAgICAgICBzZXRMaW5lTnVtYmVyOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKCFfaXNOdW1iZXIodikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdMaW5lIE51bWJlciBtdXN0IGJlIGEgTnVtYmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpbmVOdW1iZXIgPSBOdW1iZXIodik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0Q29sdW1uTnVtYmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5OdW1iZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldENvbHVtbk51bWJlcjogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmICghX2lzTnVtYmVyKHYpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ29sdW1uIE51bWJlciBtdXN0IGJlIGEgTnVtYmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbHVtbk51bWJlciA9IE51bWJlcih2KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRTb3VyY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvdXJjZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0U291cmNlOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBTdHJpbmcodik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZ1bmN0aW9uTmFtZSA9IHRoaXMuZ2V0RnVuY3Rpb25OYW1lKCkgfHwgJ3thbm9ueW1vdXN9JztcbiAgICAgICAgICAgIHZhciBhcmdzID0gJygnICsgKHRoaXMuZ2V0QXJncygpIHx8IFtdKS5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSB0aGlzLmdldEZpbGVOYW1lKCkgPyAoJ0AnICsgdGhpcy5nZXRGaWxlTmFtZSgpKSA6ICcnO1xuICAgICAgICAgICAgdmFyIGxpbmVOdW1iZXIgPSBfaXNOdW1iZXIodGhpcy5nZXRMaW5lTnVtYmVyKCkpID8gKCc6JyArIHRoaXMuZ2V0TGluZU51bWJlcigpKSA6ICcnO1xuICAgICAgICAgICAgdmFyIGNvbHVtbk51bWJlciA9IF9pc051bWJlcih0aGlzLmdldENvbHVtbk51bWJlcigpKSA/ICgnOicgKyB0aGlzLmdldENvbHVtbk51bWJlcigpKSA6ICcnO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uTmFtZSArIGFyZ3MgKyBmaWxlTmFtZSArIGxpbmVOdW1iZXIgKyBjb2x1bW5OdW1iZXI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFN0YWNrRnJhbWU7XG59KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNy1wcmVzZW50LCBFbGFzdGljc2VhcmNoIEJWXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgaW5pdCwgYXBtLCBhcG1CYXNlLCBBcG1CYXNlIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCB7IFRyYWNlciB9IGZyb20gJ29wZW50cmFjaW5nL2xpYi90cmFjZXInXG5pbXBvcnQgeyBjcmVhdGVUcmFjZXIgYXMgY3JlYXRlRWxhc3RpY1RyYWNlciB9IGZyb20gJ0BlbGFzdGljL2FwbS1ydW0tY29yZSdcblxuZnVuY3Rpb24gY3JlYXRlVHJhY2VyKGFwbUJhc2UpIHtcbiAgLyoqXG4gICAqIElmIHRoZSBwbGF0Zm9ybSBpcyBub3Qgc3VwcG9ydGVkLCByZXR1cm5cbiAgICogdGhlIGRlZmF1bHQgdHJhY2VyIGZyb20gT1RcbiAgICovXG4gIGlmIChhcG1CYXNlLl9kaXNhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBUcmFjZXIoKVxuICB9XG4gIHJldHVybiBjcmVhdGVFbGFzdGljVHJhY2VyKGFwbUJhc2Uuc2VydmljZUZhY3RvcnkpXG59XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZWxhc3RpY0FwbSkge1xuICB3aW5kb3cuZWxhc3RpY0FwbS5jcmVhdGVUcmFjZXIgPSBjcmVhdGVUcmFjZXIuYmluZChcbiAgICB3aW5kb3cuZWxhc3RpY0FwbSxcbiAgICB3aW5kb3cuZWxhc3RpY0FwbVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVRyYWNlclxuZXhwb3J0IHsgY3JlYXRlVHJhY2VyLCBpbml0LCBhcG0sIGFwbUJhc2UsIEFwbUJhc2UgfVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9