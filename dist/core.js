(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("widget-core-library", [], factory);
	else if(typeof exports === 'object')
		exports["widget-core-library"] = factory();
	else
		root["widget-core-library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.widgetModule = exports.utilModule = exports.translationModule = exports.statisticsModule = exports.offeringModule = exports.coreLibrary = undefined;
	
	__webpack_require__(2);
	
	var _coreLibrary = __webpack_require__(7);
	
	var _coreLibrary2 = _interopRequireDefault(_coreLibrary);
	
	var _offeringModule = __webpack_require__(8);
	
	var _offeringModule2 = _interopRequireDefault(_offeringModule);
	
	var _statisticsModule = __webpack_require__(9);
	
	var _statisticsModule2 = _interopRequireDefault(_statisticsModule);
	
	var _translationModule = __webpack_require__(10);
	
	var _translationModule2 = _interopRequireDefault(_translationModule);
	
	var _utilModule = __webpack_require__(11);
	
	var _utilModule2 = _interopRequireDefault(_utilModule);
	
	var _widgetModule = __webpack_require__(12);
	
	var _widgetModule2 = _interopRequireDefault(_widgetModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.coreLibrary = _coreLibrary2.default;
	exports.offeringModule = _offeringModule2.default;
	exports.statisticsModule = _statisticsModule2.default;
	exports.translationModule = _translationModule2.default;
	exports.utilModule = _utilModule2.default;
	exports.widgetModule = _widgetModule2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _es6Promise = __webpack_require__(3);
	
	var _es6Promise2 = _interopRequireDefault(_es6Promise);
	
	__webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// ES6 Fetch API polyfill
	
	_es6Promise2.default.polyfill();
	
	// Object.assign polyfill
	// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	// ES6 Promise polyfill
	if (typeof Object.assign != 'function') {
	   (function () {
	      Object.assign = function (target) {
	         'use strict';
	         // We must check against these specific cases.
	
	         if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	         }
	
	         var output = Object(target);
	         for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	               for (var nextKey in source) {
	                  if (source.hasOwnProperty(nextKey)) {
	                     output[nextKey] = source[nextKey];
	                  }
	               }
	            }
	         }
	         return output;
	      };
	   })();
	}
	
	// Array.find polyfill
	// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
	if (!Array.prototype.find) {
	   // eslint-disable-next-line
	   Array.prototype.find = function (predicate) {
	      'use strict';
	
	      if (this == null) {
	         throw new TypeError('Array.prototype.find called on null or undefined');
	      }
	      if (typeof predicate !== 'function') {
	         throw new TypeError('predicate must be a function');
	      }
	      var list = Object(this);
	      // eslint-disable-next-line
	      var length = list.length >>> 0;
	      var thisArg = arguments[1];
	      var value;
	
	      for (var i = 0; i < length; i++) {
	         value = list[i];
	         if (predicate.call(thisArg, value, i, list)) {
	            return value;
	         }
	      }
	      return undefined;
	   };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  return function () {
	    vertxNext(flush);
	  };
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(5);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;
	
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(16);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var GET_THEN_ERROR = new ErrorObject();
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}
	
	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function ErrorObject() {
	  this.error = null;
	}
	
	var TRY_CATCH_ERROR = new ErrorObject();
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);
	
	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }
	
	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;
	
	    this._result = new Array(this.length);
	
	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};
	
	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;
	
	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};
	
	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;
	
	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);
	
	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};
	
	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;
	
	  if (promise._state === PENDING) {
	    this._remaining--;
	
	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }
	
	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};
	
	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;
	
	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.
	
	  Terminology
	  -----------
	
	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.
	
	  A promise can be in one of three states: pending, fulfilled, or rejected.
	
	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.
	
	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.
	
	
	  Basic Usage:
	  ------------
	
	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);
	
	    // on failure
	    reject(reason);
	  });
	
	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Advanced Usage:
	  ---------------
	
	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.
	
	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();
	
	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();
	
	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }
	
	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Unlike callbacks, promises are great composable primitives.
	
	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON
	
	    return values;
	  });
	  ```
	
	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];
	
	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;
	
	Promise.prototype = {
	  constructor: Promise,
	
	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,
	
	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	function polyfill() {
	    var local = undefined;
	
	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }
	
	    var P = local.Promise;
	
	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }
	
	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }
	
	    local.Promise = Promise;
	}
	
	polyfill();
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;
	
	return Promise;
	
	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _offeringModule = __webpack_require__(8);
	
	var _offeringModule2 = _interopRequireDefault(_offeringModule);
	
	var _statisticsModule = __webpack_require__(9);
	
	var _statisticsModule2 = _interopRequireDefault(_statisticsModule);
	
	var _translationModule = __webpack_require__(10);
	
	var _translationModule2 = _interopRequireDefault(_translationModule);
	
	var _utilModule = __webpack_require__(11);
	
	var _utilModule2 = _interopRequireDefault(_utilModule);
	
	var _widgetModule = __webpack_require__(12);
	
	var _widgetModule2 = _interopRequireDefault(_widgetModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main module that holds the other modules as well as widget
	 * related configurations
	 * @module coreLibrary
	 */
	
	function checkStatus(response) {
	   if (response.status >= 200 && response.status < 300) {
	      return response;
	   } else {
	      var error = new Error(response.statusText);
	      error.response = response;
	      throw error;
	   }
	}
	
	function checkBrowser() {
	
	   var ua = window.navigator.userAgent;
	
	   var getFirstMatch = function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return match && match.length > 1 && match[1] || '';
	   };
	
	   var versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i);
	
	   if (/android/i.test(ua)) {
	      return {
	         browser: 'android',
	         browserVersion: versionIdentifier
	      };
	   } else if (/(ipod|iphone|ipad)/i.test(ua)) {
	      return {
	         browser: 'ios',
	         browserVersion: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	   } else if (/msie|trident/i.test(ua)) {
	      return {
	         browser: 'internet-explorer',
	         browserVersion: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      };
	   } else if (/chrome|crios|crmo/i.test(ua)) {
	      return {
	         browser: 'chrome',
	         browserVersion: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	   } else if (/safari|applewebkit/i.test(ua)) {
	      return {
	         browser: 'safari',
	         browserVersion: versionIdentifier
	      };
	   } else if (/chrome.+? edge/i.test(ua)) {
	      return {
	         browser: 'microsoft-edge',
	         browserVersion: getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
	      };
	   } else if (/firefox|iceweasel|fxios/i.test(ua)) {
	      return {
	         browser: 'firefox',
	         browserVersion: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
	      };
	   }
	}
	
	exports.default = {
	   /**
	    * Name of the browser that is running the widget
	    * @memberof module:coreLibrary
	    * @type {String}
	    */
	   browser: checkBrowser().browser,
	
	   /**
	    * Browser version.
	    * @memberof module:coreLibrary
	    * @type {String}
	    */
	   browserVersion: checkBrowser().browserVersion,
	
	   /**
	    * Expected Kambi API version to use
	    * @type {String}
	    * @private
	    */
	   expectedApiVersion: '1.0.0.13',
	
	   /**
	    * Development flag
	    * @type {Boolean}
	    * @memberOf module:coreLibrary
	    */
	   development: false,
	
	   /**
	    * Config object
	    * @type {Object}
	    * @property {String} apiBaseUrl
	    * @property {String} apiBaseUrl
	    * @property {Boolean} auth
	    * @property {Number} channelId
	    * @property {String} currency
	    * @property {String} customer
	    * @property {String} device
	    * @property {String} locale
	    * @property {String} market
	    * @property {String} oddsFormat
	    * @property {String} offering
	    * @property {String} routeRoot
	    * @property {Boolean} streamingAllowedForPlayer
	    * @property {Number} client_id
	    * @property {String} version
	    * @memberOf module:coreLibrary
	    */
	   _config: {
	      apiBaseUrl: '',
	      auth: false,
	      channelId: 1,
	      currency: '',
	      customer: '',
	      device: 'desktop',
	      locale: 'en_GB',
	      market: 'GB',
	      oddsFormat: 'decimal',
	      offering: '',
	      routeRoot: '',
	      streamingAllowedForPlayer: true,
	      client_id: 2,
	      version: 'v2'
	   },
	
	   get config() {
	      /* eslint-disable no-underscore-dangle */
	      return this._config;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   set config(config) {
	      /* eslint-disable no-underscore-dangle */
	      for (var i in config) {
	         if (config.hasOwnProperty(i) && this._config.hasOwnProperty(i)) {
	            this._config[i] = config[i];
	         }
	      }
	      // Make sure that the routeRoot is not null or undefined
	      if (this._config.routeRoot == null) {
	         this._config.routeRoot = '';
	      } else if (this._config.routeRoot.length > 0 && this._config.routeRoot.slice(-1) !== '/') {
	         // If the routeRoot is not empty we need to make sure it has a trailing slash
	         this._config.routeRoot += '/';
	      }
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   /**
	    * Sets odds format.
	    * @memberOf module:coreLibrary
	    * @param {String} oddsFormat
	    * @private
	    */
	   setOddsFormat: function setOddsFormat(oddsFormat) {
	      /* eslint-disable no-underscore-dangle */
	      this._config.oddsFormat = oddsFormat;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	
	   /**
	    * default args object
	    * @memberOf module:coreLibrary
	    * @private
	    */
	   _defaultArgs: {},
	
	   set defaultArgs(defaultArgs) {
	      /* eslint-disable no-underscore-dangle */
	      this._defaultArgs = defaultArgs;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   get defaultArgs() {
	      /* eslint-disable no-underscore-dangle */
	      return this._defaultArgs;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   /**
	    * args object for the widget, merged with defaultArgs when set
	    * @memberOf module:coreLibrary
	    * @private
	    */
	   _args: {},
	
	   set args(args) {
	      /* eslint-disable no-underscore-dangle */
	      this._args = Object.assign({}, this._defaultArgs, args);
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   get args() {
	      /* eslint-disable no-underscore-dangle */
	      return this._args;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   /**
	    * Page info.
	    * @type {Object}
	    * @property {Array(String)} leaguePaths
	    * @property {String} pageParam
	    * @property {String} pageTrackingPath
	    * @property {String} pageType
	    * @memberOf module:coreLibrary
	    */
	   _pageInfo: {
	      leaguePaths: [],
	      pageParam: '',
	      pageTrackingPath: '',
	      pageType: ''
	   },
	
	   get pageInfo() {
	      /* eslint-disable no-underscore-dangle */
	      return this._pageInfo;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   set pageInfo(pageInfo) {
	      /* eslint-disable no-underscore-dangle */
	      // Check if the last character in the pageParam property is a slash, if not add it so we can use this property in filter requests
	      if (pageInfo.pageType === 'filter' && pageInfo.pageParam.substr(-1) !== '/') {
	         pageInfo.pageParam += '/';
	      }
	      this._pageInfo = pageInfo;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   /**
	    * api versions object.
	    * @type {Object}
	    * @property {String} client
	    * @property {String} libs
	    * @property {String} wapi
	    * @memberOf module:coreLibrary
	    */
	   _apiVersions: {
	      client: '',
	      libs: '',
	      wapi: ''
	   },
	
	   get apiVersions() {
	      /* eslint-disable no-underscore-dangle */
	      return this._apiVersions;
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   set apiVersions(versions) {
	      /* eslint-disable no-underscore-dangle */
	      for (var i in versions) {
	         if (versions.hasOwnProperty(i) && this._apiVersions.hasOwnProperty(i)) {
	            this._apiVersions[i] = versions[i];
	         }
	      }
	      /* eslint-enable no-underscore-dangle */
	   },
	
	   /**
	    * The name sent to Kambi API for analytics data collection
	    * @memberOf module:coreLibrary
	    * @private
	    */
	   widgetTrackingName: null,
	
	   /**
	    * Method that initializes on component construct, sets widget configurations.
	    * Can load mock data if not loaded in an iframe.
	    * @param defaultArgs
	    * @memberOf module:coreLibrary
	    * @returns {Promise}
	    */
	   init: function init(defaultArgs) {
	      var _this = this;
	
	      this.defaultArgs = defaultArgs;
	      var applySetupData = function applySetupData(setupData) {
	         _this.args = setupData.arguments;
	         _this.config = setupData.clientConfig;
	         _this.pageInfo = setupData.pageInfo;
	         _this.apiVersions = setupData.versions;
	      };
	
	      return new Promise(function (resolve, reject) {
	         if (window.KambiWidget) {
	            // For development purposes we might want to load a widget on it's own so we check if we are in an iframe, if not then load some fake data
	            if (window.self === window.top) {
	               console.warn(window.location.host + window.location.pathname + ' is being loaded as stand-alone');
	               // Load the mock config data
	               fetch('mockSetupData.json').then(checkStatus).then(function (response) {
	                  return response.json();
	               }).then(function (mockSetupData) {
	                  // Output some debug info that could be helpful
	                  console.debug('Loaded mock setup data');
	                  console.debug(mockSetupData);
	                  // Apply the mock config data to the core
	                  applySetupData(mockSetupData);
	                  _translationModule2.default.fetchTranslations(mockSetupData.clientConfig.locale).then(function () {
	                     resolve(mockSetupData['arguments']);
	                  });
	               }).catch(function (error) {
	                  console.debug('Failed to fetch mockSetupData');
	                  console.trace(error);
	                  reject();
	               });
	            } else {
	               window.KambiWidget.apiReady = function (api) {
	                  _widgetModule2.default.api = api;
	                  if (api.VERSION !== _this.expectedApiVersion) {
	                     console.warn('Wrong Kambi API version loaded, expected: ' + _this.expectedApiVersion + ' got: ' + api.VERSION);
	                  }
	
	                  // Request the setup info from the widget api
	                  _widgetModule2.default.requestSetup(function (setupData) {
	                     // Apply the config data to the core
	                     applySetupData(setupData);
	
	                     // TODO: Move this to widgets so we don't request them when not needed
	                     // Request the outcomes from the betslip so we can update our widget, also sets up a subscription for future betslip updates
	                     _widgetModule2.default.requestBetslipOutcomes();
	                     // Request the odds format that is set in the sportsbook, this also sets up a subscription for future odds format changes
	                     _widgetModule2.default.requestOddsFormat();
	
	                     _translationModule2.default.fetchTranslations(setupData.clientConfig.locale).then(function () {
	                        resolve(setupData['arguments']);
	                     });
	                  });
	               };
	               // Setup the response handler for the widget api
	               window.KambiWidget.receiveResponse = function (dataObject) {
	                  _widgetModule2.default.handleResponse(dataObject);
	               };
	            }
	         } else {
	            console.warn('Kambi widget API not loaded');
	            reject();
	         }
	      });
	   },
	
	
	   /**
	    * Makes an request using Fetch (polyfill) library.
	    * @memberOf module:coreLibrary
	    * @param {String} url
	    * @returns {Promise}
	    */
	   getData: function getData(url) {
	      return fetch(url).then(checkStatus).then(function (response) {
	         return response.json();
	      }).catch(function (error) {
	         console.debug('Error fetching data');
	         console.trace(error);
	         throw error;
	      });
	   },
	
	
	   /**
	    * Makes an ajax request using Fetch (polyfill) library.
	    * @memberOf module:coreLibrary
	    * @param {String} url
	    * @returns {Promise}
	    */
	   getFile: function getFile(url) {
	      return fetch(url).then(checkStatus).catch(function (error) {
	         console.debug('Error fetching file');
	         console.trace(error);
	         throw error;
	      });
	   },
	
	
	   /**
	    * Sets widget tracking name variable.
	    * @memberOf module:coreLibrary
	    * @param {String} name Set a tracking name
	    */
	   setWidgetTrackingName: function setWidgetTrackingName(name) {
	      this.widgetTrackingName = name;
	   }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _coreLibrary = __webpack_require__(7);
	
	var _coreLibrary2 = _interopRequireDefault(_coreLibrary);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module with methods to request data from the offering API
	 * @module offeringModule
	 * @memberof coreLibrary
	 */
	
	exports.default = {
	
	   /**
	    * Get group events
	    * @param {number|string} groupId Group id
	    * @returns {Promise}
	    */
	   getGroupEvents: function getGroupEvents(groupId) {
	      var requesPath = '/event/group/' + groupId + '.json';
	      return this.doRequest(requesPath);
	   },
	
	
	   /**
	    * Get group information.
	    * @param {Number|String} groupId Group id
	    * @returns {Promise}
	    */
	   getGroup: function getGroup(groupId) {
	      var requesPath = '/group/' + groupId + '.json';
	      return this.doRequest(requesPath);
	   },
	
	
	   /**
	    * Get events by filter
	    * @param {String} filter Filter string, eg: football
	    * @param {Object} params Request relevant parameters
	    * @returns {Promise}
	    */
	   getEventsByFilter: function getEventsByFilter(filter, params) {
	      // Todo: Update this method once documentation is available
	      var requestPath = '/listView/' + filter;
	      return this.doRequest(requestPath, params, 'v3');
	   },
	
	
	   /**
	    * Normalizes v2 api betoffers
	    * @param {Object} betOffer Betoffer object we get from api
	    * @private
	    */
	   adaptV2BetOffer: function adaptV2BetOffer(betOffer) {
	      if (betOffer.suspended === true) {
	         betOffer.open = false;
	      }
	   },
	
	
	   /**
	    * Normalizes the v2 api response
	    * @param {Object} liveData Livedata object we get from api
	    * @private
	    */
	   adaptV2LiveData: function adaptV2LiveData(liveData) {
	      if (liveData != null && liveData.statistics != null) {
	         var statistics = liveData.statistics;
	         if (statistics.sets != null) {
	            statistics.setBasedStats = statistics.sets;
	            delete statistics.sets;
	         }
	
	         if (statistics.football != null) {
	            statistics.footballStats = statistics.football;
	            delete statistics.football;
	         }
	      }
	   },
	
	
	   /**
	    * Normalizes the v2 event object
	    * @private
	    */
	   adaptV2Event: function adaptV2Event(event) {
	      // v3 and v2 event objects are almost the same
	      // only a few attributes we don't are different
	   },
	
	
	   /**
	    * Get live event data only, eg: match statistics, score, macthClock
	    * @param {Number|String} eventId The event id we need to fetch
	    * @returns {Promise}
	    * @private
	    */
	   getLiveEventData: function getLiveEventData(eventId) {
	      var _this = this;
	
	      var requestPath = '/event/' + eventId + '/livedata.json';
	      return this.doRequest(requestPath, null, null, true).then(function (res) {
	         _this.adaptV2LiveData(res);
	         return res;
	      });
	   },
	
	
	   /**
	    * Get all live events
	    * @returns {Promise}
	    * @private
	    */
	   getLiveEvents: function getLiveEvents() {
	      var _this2 = this;
	
	      var requestPath = '/event/live/open.json';
	      return this.doRequest(requestPath, null, null, true).then(function (res) {
	         if (res.error != null) {
	            return res;
	         }
	         var events = res.liveEvents;
	         res.events = events;
	         res.events.forEach(_this2.adaptV2Event);
	         delete res.liveEvents;
	         delete res.group;
	         events.forEach(function (e) {
	            e.betOffers = [];
	            if (e.mainBetOffer != null) {
	               _this2.adaptV2BetOffer(e.mainBetOffer);
	               e.betOffers.push(e.mainBetOffer);
	               delete e.mainBetOffer;
	            }
	            _this2.adaptV2LiveData(e.liveData);
	         });
	         return res;
	      });
	   },
	
	
	   /**
	    * Returns a live event
	    * @param {Number|String} eventId The event id we need to fetch
	    * @returns {Promise}
	    */
	   getLiveEvent: function getLiveEvent(eventId) {
	      var _this3 = this;
	
	      var requestPath = '/betoffer/live/event/' + eventId + '.json';
	      return this.doRequest(requestPath, null, null, true).then(function (res) {
	         res.betOffers = res.betoffers;
	         delete res.betoffers;
	         res.betOffers.forEach(_this3.adaptV2BetOffer);
	         res.event = res.events[0];
	         _this3.adaptV2Event(res.event);
	         delete res.events;
	         return res;
	      });
	   },
	
	
	   /**
	    * Get live events by filter
	    * @param {String} filter Filter string
	    * @returns {Promise}
	    */
	   getLiveEventsByFilter: function getLiveEventsByFilter(filter) {
	      var _this4 = this;
	
	      // Todo: implement a filter request when the offering API supports it
	      filter = filter.replace(/\/$/, '');
	
	      var filterTerms = filter.split('/');
	      filterTerms = filterTerms.slice(0, 3);
	
	      var requestPath = '/listView/all/all/all/all/in-play/';
	
	      return new Promise(function (resolve, reject) {
	         _this4.doRequest(requestPath, null, 'v3').then(function (response) {
	            var result = {
	               events: []
	            },
	                i = 0,
	                len = response.events.length;
	            for (; i < len; ++i) {
	               var j = 0,
	                   termLen = response.events[i].event.path.length,
	                   addEvent = true;
	               if (termLen > filterTerms.length) {
	                  termLen = filterTerms.length;
	               }
	               for (; j < termLen; ++j) {
	                  if (filterTerms[j] !== 'all' && response.events[i].event.path[j].termKey !== filterTerms[j]) {
	                     addEvent = false;
	                  }
	               }
	               if (addEvent) {
	                  result.events.push(response.events[i]);
	               }
	            }
	            resolve(result);
	         });
	      });
	   },
	
	
	   /**
	    * Requests and event from api
	    * @param {String} eventId The event id we need to fetch
	    * @returns {Promise}
	    */
	   getEvent: function getEvent(eventId) {
	      var _this5 = this;
	
	      return this.doRequest('/betoffer/event/' + eventId + '.json').then(function (res) {
	         res.betOffers = res.betoffers;
	         delete res.betoffers;
	         res.betOffers.forEach(_this5.adaptV2BetOffer);
	         res.event = res.events[0];
	         _this5.adaptV2Event(res.event);
	         delete res.events;
	         return res;
	      });
	   },
	
	
	   /**
	    * Request the highlight resource which is what is shown under "Popular" in the Sportsbook
	    * @returns {Promise}
	    */
	   getHighlight: function getHighlight() {
	      return this.doRequest('/group/highlight.json');
	   },
	
	
	   /**
	    * @deprecated
	    * @param {number|string} eventId The event id we need to fetch
	    * @returns {*}
	    */
	   getEventBetoffers: function getEventBetoffers(eventId) {
	      console.warn('getEventBetoffers is deprecated, use getEvent instead');
	      return this.getEvent.apply(this, arguments);
	   },
	
	
	   /**
	    * Makes a request to provided path
	    * @param {string} requestPath
	    * @param {object} params
	    * @param {number|string} version
	    * @param {boolean} noCache
	    * @returns {Promise}
	    */
	   doRequest: function doRequest(requestPath, params, version, noCache) {
	      var config = _coreLibrary2.default.config;
	      if (config.offering == null) {
	         console.warn('The offering has not been set, is the right widget api version loaded?');
	      } else {
	         var apiUrl = config.apiBaseUrl.replace('{apiVersion}', version != null ? version : config.version);
	         var requestUrl = apiUrl + config.offering + requestPath;
	         var overrideParams = params || {};
	         var requestParams = {
	            lang: overrideParams.locale || config.locale,
	            market: overrideParams.market || config.market,
	            client_id: overrideParams.client_id || config.client_id,
	            include: overrideParams.include || '',
	            betOffers: overrideParams.betOffers || 'COMBINED',
	            categoryGroup: overrideParams.categoryGroup || 'COMBINED',
	            displayDefault: overrideParams.displayDefault || true
	         };
	         if (noCache === true) {
	            requestParams.nocache = Date.now();
	         }
	         requestUrl += '?' + Object.keys(requestParams).map(function (k) {
	            return encodeURIComponent(k) + '=' + encodeURIComponent(requestParams[k]);
	         }).join('&');
	
	         return _coreLibrary2.default.getData(requestUrl);
	      }
	   }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _coreLibrary = __webpack_require__(7);
	
	var _coreLibrary2 = _interopRequireDefault(_coreLibrary);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module to access statistics data
	 * @module statisticsModule
	 * @memberOf coreLibrary
	 */
	
	exports.default = {
	
	   /**
	    * Configuration.
	    * @type {Object}
	    * @property {String} baseApiUrl
	    */
	   config: {
	      baseApiUrl: 'https://api.kambi.com/statistics/api/'
	   },
	
	   /**
	    * Requests statistics data from api.
	    * @param {String} type
	    * @param {String} filter
	    * @returns {Promise}
	    */
	   getStatistics: function getStatistics(type, filter) {
	      // Remove url parameters from filter
	      filter = filter.match(/[^?]*/)[0];
	
	      // Remove trailing slash if present
	      if (filter[filter.length - 1] === '/') {
	         filter = filter.slice(0, -1);
	      }
	
	      console.debug(this.config.baseApiUrl + _coreLibrary2.default.config.offering + '/' + type + '/' + filter + '.json');
	      return _coreLibrary2.default.getData(this.config.baseApiUrl + _coreLibrary2.default.config.offering + '/' + type + '/' + filter + '.json');
	   }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _coreLibrary = __webpack_require__(7);
	
	var _coreLibrary2 = _interopRequireDefault(_coreLibrary);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module with internationalization methods
	 * @module translationModule
	 * @memberOf coreLibrary
	 */
	exports.default = {
	   /**
	    * fetched from the i18n folder JSON files. Only the current
	    * locale strings are fetched
	    * @type {Object}
	    */
	   i18nStrings: {},
	
	   /**
	    * Makes a request to fetch all locales strings.
	    * The locale json file resides in coreLibrary/i18n folder; it is populated with locales during build process
	    * @param {String} locale Locale string, eg: sv_SE
	    * @returns {Promise}
	    * @private
	    */
	   fetchTranslations: function fetchTranslations(locale) {
	      var _this = this;
	
	      if (locale == null) {
	         locale = 'en_GB';
	      }
	      var self = this;
	      var path = 'i18n/';
	      if (_coreLibrary2.default.development === true) {
	         path = 'transpiled/i18n/';
	      }
	      return new Promise(function (resolve, reject) {
	         _coreLibrary2.default.getData(path + locale + '.json').then(function (response) {
	            _this.i18nStrings = response;
	            resolve();
	         }).catch(function (error) {
	            if (locale !== 'en_GB') {
	               console.debug('Could not load translations for ' + locale + ' falling back to en_GB');
	               self.fetchTranslations('en_GB').then(resolve);
	            } else {
	               console.debug('Could not load translations for en_GB');
	               console.trace(error);
	               resolve();
	            }
	         });
	      });
	   },
	
	
	   /**
	    * Returns translated string based of a provided key.
	    * @param {String} key Key to fetch translation for
	    * @param {...String} args arguments to replace inside the translated string
	    * @example
	    * en_GB.json:
	    * { "welcomeUserToPlace": "Welcome {0} to {1}" }
	    * Javascriot:
	    * getTranslation('welcomeUserToPlace', 'Daniel', 'Stadium') => 'Welcome Daniel to Stadium'
	    * @returns {String}
	    */
	   getTranslation: function getTranslation(key) {
	      if (this.i18nStrings[key] != null) {
	         var str = this.i18nStrings[key];
	
	         for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	         }
	
	         for (var i = 0; i < args.length; i++) {
	            var replacement = args[i] || '';
	            str = str.replace('{' + i + '}', replacement);
	         }
	         return str;
	      }
	      return key;
	   }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _translationModule = __webpack_require__(10);
	
	var _translationModule2 = _interopRequireDefault(_translationModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module with utility functions
	 * @module utilModule
	 * @memberOf coreLibrary
	 */
	exports.default = {
	
	   /**
	    * Util method for return unique items.
	    * @param {Array} A First array
	    * @param {Array} B Second array
	    * @returns {Array}
	    */
	   diffArray: function diffArray(A, B) {
	      var map = {},
	          C = [];
	
	      for (var i = B.length; i--;) {
	         map[B[i]] = null;
	      } // any other value would do
	
	      for (var i = A.length; i--;) {
	         if (!map.hasOwnProperty(A[i])) {
	            C.push(A[i]);
	         }
	      }
	      return C;
	   },
	
	
	   /**
	    * Get decimal formatted odds.
	    * @param {Number} odds Odds number
	    * @returns {Number}
	    */
	   getOddsDecimalValue: function getOddsDecimalValue(odds) {
	      if (odds < 100) {
	         return odds.toFixed(2);
	      } else if (odds < 1000) {
	         return odds.toFixed(1);
	      } else {
	         return odds.toFixed(0);
	      }
	   },
	
	
	   /**
	    * Returns the outcome label translated.
	    * @param {Object} outcome A betoffer outcome object
	    * @param {Object} event Event object
	    * @returns {string}
	    */
	   getOutcomeLabel: function getOutcomeLabel(outcome, event) {
	      switch (outcome.type) {
	         case 'OT_ONE':
	            // Outcome has label 1. Applies to Threeway bet offers.
	            return event.homeLabelCustom && event.homeLabelCustom !== '' ? event.homeLabelCustom : event.homeName;
	         case 'OT_CROSS':
	            // Outcome has label X. Applies to Threeway bet offers.
	            return _translationModule2.default.getTranslation('draw');
	         case 'OT_TWO':
	            // Outcome has label 2. Applies to Threeway bet offers.
	            return event.awayLabelCustom && event.awayLabelCustom !== '' ? event.awayLabelCustom : event.awayName;
	         case 'OT_OVER':
	            // The “Over” outcome in Over/Under bet offer.
	            return outcome.label + ' ' + outcome.line / 1000;
	         case 'OT_UNDER':
	            // The “Under” outcome in Over/Under bet offer.
	            return outcome.label + ' ' + outcome.line / 1000;
	         // Todo: Impelement these responses with translations
	         // case 'OT_ODD': //The “Odd” outcome in Odd/Even bet offer.
	         // break;
	         // case 'OT_EVEN': //The “Even” outcome in Odd/Even bet offer.
	         // break;
	         // case 'OT_ONE_ONE': //1-1 outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_ONE_TWO': //1-2 outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_ONE_CROSS': //1-X outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_TWO_ONE': //2-1 outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_TWO_TWO': //2-2 outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_TWO_CROSS': //2-X outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_CROSS_ONE': //X-1 outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_CROSS_TWO': //X-2 outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_CROSS_CROSS': //X-X outcome in Halftime/fulltime bet offer.
	         // break;
	         // case 'OT_ONE_OR_TWO': //1 or 2 outcome in Double Chance bet offer.
	         // break;
	         // case 'OT_ONE_OR_CROSS': //1 or X outcome in Double Chance bet offer.
	         // break;
	         // case 'OT_CROSS_OR_TWO': //X or 2 outcome in Double Chance bet offer.
	         // break;
	         // case 'OT_YES': //“Yes” outcome in Head To Head and Yes/No bet offer.
	         // break;
	         // case 'OT_NO': //“No” outcome in Head To Head and Yes/No bet offer.
	         // break;
	         // case 'OT_OTHER': //“Other results” outcome in Result bet offer.
	         // break;
	         // case 'OT_UNTYPED': //Outcome does not have type.
	         // break;
	         // case 'OT_WC_HOME': //Outcome has label Home Win. Applies to WinCast bet offers.
	         // break;
	         // case 'OT_WC_DRAW': //Outcome has label Draw. Applies to WinCast bet offers.
	         // break;
	         // case 'OT_WC_AWAY': //Outcome has label Away Win. Applies to WinCast bet offers.
	         // break;
	
	         default:
	            console.warn('Unhandled outcome type: ' + outcome.type, outcome);
	            return outcome.label;
	      }
	   }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _utilModule = __webpack_require__(11);
	
	var _utilModule2 = _interopRequireDefault(_utilModule);
	
	var _coreLibrary = __webpack_require__(7);
	
	var _coreLibrary2 = _interopRequireDefault(_coreLibrary);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module with methods to manipulate the widget and interact with the sportsbook
	 * @module widgetModule
	 * @memberOf coreLibrary
	 */
	
	exports.default = {
	
	   /**
	    * @type {object}
	    * @private
	    */
	   api: {
	      // placeholders for when not running inside iframe
	      requestSetup: function requestSetup() {},
	      request: function request() {},
	      set: function set() {},
	      remove: function remove() {},
	      createUrl: function createUrl() {},
	      createFilterUrl: function createFilterUrl() {}
	   },
	
	   /**
	    * Object in which you can add event listeners for Kambi API events
	    * Valid events listeners:
	    *
	    * 'WIDGET:HEIGHT': Widget height changed
	    *
	    * 'OUTCOME:REMOVED:{outcomeId}': Outcome with {outcomeId} removed
	    *
	    * 'OUTCOME:ADDED:{outcomeId}': Outcome with {outcomeId} added
	    *
	    * 'OUTCOME:UPDATE:{outcomeId}': Outcome with {outcomeId} updated
	    *
	    * 'WIDGET:ARGS': Widget args changed
	    *
	    * 'PAGE:INFO':  Page info changed
	    *
	    * 'ODDS:FORMAT': Odds format changed
	    *
	    * 'CLIENT:CONFIG': Client config changed
	    *
	    * 'USER:LOGGED_IN': User logged in changed
	    *
	    * @example
	    *
	    * coreLibrary.widgetModule.events
	    *    .on('OUTCOME:ADDED:' + outcome.id,
	    *       ( data, event ) => {
	    *          ...
	    *       });
	    *
	    * @type {Object}
	    */
	   events: null, // new Stapes.subclass(); TODO replace Stapes
	
	   /**
	    * @type {array}
	    */
	   betslipIds: [],
	
	   /**
	    * Handles widget api response.
	    * Emits events for each response
	    * @param {Object} response
	    * @private
	    */
	   handleResponse: function handleResponse(response) {
	      switch (response.type) {
	         case this.api.WIDGET_HEIGHT:
	            // We've received a height response
	            this.events.emit('WIDGET:HEIGHT', response.data);
	            break;
	         case this.api.BETSLIP_OUTCOMES:
	            // We've received a response with the outcomes currently in the betslip
	
	            var i = 0,
	                len = response.data.outcomes.length;
	            var updateIds = [];
	            // Gather all the ids in the betslip in one array
	            for (; i < len; ++i) {
	               updateIds.push(response.data.outcomes[i].id);
	            }
	            // Diff against what the coreLibrary already has stored so we know what was added and what was removed
	            var removedIds = _utilModule2.default.diffArray(this.betslipIds, updateIds);
	            var addedIds = _utilModule2.default.diffArray(updateIds, this.betslipIds);
	            // Save the updated ids
	            this.betslipIds = updateIds;
	
	            // Emit events for each removed id
	            i = 0;
	            len = removedIds.length;
	            for (; i < len; ++i) {
	               this.events.emit('OUTCOME:REMOVED:' + removedIds[i]);
	            }
	
	            // Emit events for each added id
	            i = 0;
	            len = addedIds.length;
	            for (; i < len; ++i) {
	               this.events.emit('OUTCOME:ADDED:' + addedIds[i]);
	            }
	
	            // Emit a generic update in case we want to use that
	            this.events.emit('OUTCOMES:UPDATE', response.data);
	            break;
	         case this.api.WIDGET_ARGS:
	            // We've received a response with the arguments set in the
	            _coreLibrary2.default.args = response.data;
	            this.events.emit('WIDGET:ARGS', response.data);
	            break;
	         case this.api.PAGE_INFO:
	            // Received page info response
	            _coreLibrary2.default.setPageInfo(response.data);
	            this.events.emit('PAGE:INFO', response.data);
	            break;
	         case this.api.CLIENT_ODDS_FORMAT:
	            // Received odds format response
	            _coreLibrary2.default.setOddsFormat(response.data);
	            this.events.emit('ODDS:FORMAT', response.data);
	            break;
	         case this.api.CLIENT_CONFIG:
	            _coreLibrary2.default.setConfig(response.data);
	            this.events.emit('CLIENT:CONFIG', response.data);
	            break;
	         case this.api.USER_LOGGED_IN:
	            console.debug('User logged in', response.data);
	            this.events.emit('USER:LOGGED_IN', response.data);
	            break;
	         case 'Setup':
	            this.events.emit('Setup response', response.data);
	            break;
	         default:
	            // Unhandled response
	            console.info('Unhandled response type: ' + response.type);
	            console.info(response);
	            break;
	      }
	   },
	
	
	   /**
	    * Creates url from given path and optionalRoot
	    * @param {String} path
	    * @param {String} optionalRoot
	    * @returns {String}
	    */
	   createUrl: function createUrl(path, optionalRoot) {
	      return this.api.createUrl(path, optionalRoot);
	   },
	
	
	   /**
	    * Creates a filter url from given array
	    * @example
	    * destination = ['/football/europa_league/', '/football/world_cup_qualifying_-_europe/'];
	    * @param {Array} destination
	    * @returns {string}
	    */
	   createFilterUrl: function createFilterUrl(destination) {
	      return this.api.createFilterUrl(destination, _coreLibrary2.default.config.routeRoot);
	   },
	
	
	   /**
	    * Get page type
	    * @returns {String}
	    */
	   getPageType: function getPageType() {
	      if (!_coreLibrary2.default.pageInfo.pageType) {
	         return '';
	      }
	      var pageType = _coreLibrary2.default.pageInfo.pageType;
	      switch (pageType) {
	         case 'event':
	            return '';
	         case 'event-live':
	            return 'live/';
	         default:
	            console.info('Unknown page type: ' + pageType);
	            break;
	      }
	   },
	
	
	   /**
	    * Makes widget api request for setupdata
	    * @param {fn} callback Callback
	    */
	   requestSetup: function requestSetup(callback) {
	      this.api.requestSetup(callback);
	   },
	
	
	   /**
	    * Requests widget height from widget api
	    */
	   requestWidgetHeight: function requestWidgetHeight() {
	      this.api.request(this.api.WIDGET_HEIGHT);
	   },
	
	
	   /**
	    * Set widget api widget height
	    * @param {Number} height the height in pixels
	    */
	   setWidgetHeight: function setWidgetHeight(height) {
	      this.api.set(this.api.WIDGET_HEIGHT, height);
	   },
	
	
	   /**
	    * tries to adapt the widget iframe height to match the content
	    *
	    * Only works if the html and body tags don't have height: 100%
	    * styling rule
	    */
	   adaptWidgetHeight: function adaptWidgetHeight() {
	      // tries to adapt the widget iframe height to match the content
	      var body = document.body,
	          html = document.documentElement;
	      var height = Math.max(body.offsetHeight, html.scrollHeight, html.offsetHeight);
	      this.api.set(this.api.WIDGET_HEIGHT, height);
	   },
	
	
	   /**
	    * Sets widget api widget transition state
	    * @param {boolean} enableTransition
	    */
	   enableWidgetTransition: function enableWidgetTransition(enableTransition) {
	      if (enableTransition) {
	         this.api.set(this.api.WIDGET_ENABLE_TRANSITION);
	      } else {
	         this.api.set(this.api.WIDGET_DISABLE_TRANSITION);
	      }
	   },
	
	
	   /**
	    * Call api to remove widget from the sportsbook
	    */
	   removeWidget: function removeWidget() {
	      this.api.remove();
	   },
	
	
	   /**
	    * Widget api method for navigating to a live event
	    * @param {number} eventId
	    */
	   navigateToLiveEvent: function navigateToLiveEvent(eventId) {
	      this.navigateClient('event/live/' + eventId);
	   },
	
	
	   /**
	    * Widget api method for navigating to a prelive event
	    * @param {number} eventId
	    */
	   navigateToEvent: function navigateToEvent(eventId) {
	      this.navigateClient('event/' + eventId);
	   },
	
	
	   /**
	    * Widget api method for navigating to a filter
	    * @param {String} filterParams
	    */
	   navigateToFilter: function navigateToFilter(filterParams) {
	      if (typeof filterParams === 'string' && filterParams.indexOf('filter/') === -1) {
	         filterParams = 'filter/' + filterParams;
	      }
	      this.navigateClient(filterParams);
	   },
	
	
	   /**
	    * Widget api method for navigating to a live events
	    */
	   navigateToLiveEvents: function navigateToLiveEvents() {
	      this.navigateClient(['in-play']);
	   },
	
	
	   /**
	    * Uses widget api to add outcomes to betslip
	    * @param {Array|Object} outcomes
	    * @param {Array|Object} stakes
	    * @param {String} updateMode
	    * @param {String} source
	    */
	   addOutcomeToBetslip: function addOutcomeToBetslip(outcomes, stakes, updateMode, source) {
	      var arrOutcomes = [];
	      // Check if the outcomes parameter is an array and add it, otherwise add the the single value as an array
	      if (Array.isArray(outcomes)) {
	         arrOutcomes = outcomes;
	      } else {
	         arrOutcomes.push(outcomes);
	      }
	
	      // Setup the data object to be sent to the widget API
	      var data = {
	         outcomes: arrOutcomes
	      };
	
	      // Check if we got any stakes passed to use, add them to the data object if so
	      if (stakes != null) {
	         if (stakes.isArray()) {
	            data.stakes = stakes;
	         } else {
	            data.stakes = [stakes];
	         }
	      }
	
	      // Set the coupon type, defaults to TYPE_SINGLE
	      data.couponType = arrOutcomes.length === 1 ? this.api.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE : this.api.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION;
	
	      // Set the update mode, defaults to UPDATE_APPEND
	      data.updateMode = updateMode !== 'replace' ? this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND : this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_REPLACE;
	      if (source != null) {
	         data.source = source;
	      }
	
	      // Add tracking name if it's set
	      if (_coreLibrary2.default.widgetTrackingName != null) {
	         data.name = _coreLibrary2.default.widgetTrackingName;
	      }
	
	      // Send the data to the widget this.api
	      this.api.set(this.api.BETSLIP_OUTCOMES, data);
	   },
	
	
	   /**
	    * Removes outcomes from betslip via widget api
	    * @param {Array|Object} outcomes
	    */
	   removeOutcomeFromBetslip: function removeOutcomeFromBetslip(outcomes) {
	      var arrOutcomes = [];
	      if (Array.isArray(outcomes)) {
	         arrOutcomes = outcomes;
	      } else {
	         arrOutcomes.push(outcomes);
	      }
	      var data = { outcomes: arrOutcomes };
	
	      // Add tracking name if it's set
	      if (_coreLibrary2.default.widgetTrackingName != null) {
	         data.name = _coreLibrary2.default.widgetTrackingName;
	      }
	
	      this.api.set(this.api.BETSLIP_OUTCOMES_REMOVE, data);
	   },
	
	
	   /**
	    * Widget api method for requesting betslip outcome
	    */
	   requestBetslipOutcomes: function requestBetslipOutcomes() {
	      this.api.request(this.api.BETSLIP_OUTCOMES);
	   },
	
	
	   /**
	    * Widget api method for requesting page info
	    */
	   requestPageInfo: function requestPageInfo() {
	      this.api.request(this.api.PAGE_INFO);
	   },
	
	
	   /**
	    * Widget api method for requesting widget args
	    */
	   requestWidgetArgs: function requestWidgetArgs() {
	      this.api.request(this.api.WIDGET_ARGS);
	   },
	
	
	   /**
	    * Widget api method for requesting client config
	    */
	   requestClientConfig: function requestClientConfig() {
	      this.api.request(this.api.CLIENT_CONFIG);
	   },
	
	
	   /**
	    * Widget api method for requesting odds format
	    */
	   requestOddsFormat: function requestOddsFormat() {
	      this.api.request(this.api.CLIENT_ODDS_FORMAT);
	   },
	
	
	   /**
	    * Widget api method for requesting american odds
	    * @param  {Number}odds
	    * @returns {Promise}
	    */
	   requestOddsAsAmerican: function requestOddsAsAmerican(odds) {
	      var _this = this;
	
	      return new Promise(function (resolve) {
	         _this.api.requestOddsAsAmerican(odds, function (americanOdds) {
	            resolve(americanOdds);
	         });
	      });
	   },
	
	
	   /**
	    * Widget api method for requesting fractional odds
	    * @param {Number} odds
	    * @returns {Promise}
	    */
	   requestOddsAsFractional: function requestOddsAsFractional(odds) {
	      var _this2 = this;
	
	      return new Promise(function (resolve) {
	         _this2.api.requestOddsAsFractional(odds, function (fractionalOdds) {
	            resolve(fractionalOdds);
	         });
	      });
	   },
	
	
	   /**
	    * Widget api method for navigating client to hash path
	    * @param {String|Array} destination
	    */
	   navigateClient: function navigateClient(destination) {
	      var finalTarget = '';
	      if (typeof destination === 'string') {
	         finalTarget = '#' + _coreLibrary2.default.config.routeRoot + destination;
	      } else if (Array.isArray(destination)) {
	         finalTarget = this.api.createFilterUrl(destination, _coreLibrary2.default.config.routeRoot);
	      }
	
	      if (_coreLibrary2.default.widgetTrackingName != null) {
	         this.api.navigateClient(finalTarget, _coreLibrary2.default.widgetTrackingName);
	      } else {
	         this.api.navigateClient(finalTarget);
	      }
	   }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=core.js.map