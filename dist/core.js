/******/ (function(modules) { // webpackBootstrap
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
	
	var _coreLibrary = __webpack_require__(2);
	
	var _coreLibrary2 = _interopRequireDefault(_coreLibrary);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _coreLibrary2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _Component = __webpack_require__(3);
	
	var _Component2 = _interopRequireDefault(_Component);
	
	var _PaginationComponent = __webpack_require__(8);
	
	var _PaginationComponent2 = _interopRequireDefault(_PaginationComponent);
	
	var _offeringModule = __webpack_require__(9);
	
	var _offeringModule2 = _interopRequireDefault(_offeringModule);
	
	var _statisticsModule = __webpack_require__(10);
	
	var _statisticsModule2 = _interopRequireDefault(_statisticsModule);
	
	var _translationModule = __webpack_require__(11);
	
	var _translationModule2 = _interopRequireDefault(_translationModule);
	
	var _utilModule = __webpack_require__(12);
	
	var _utilModule2 = _interopRequireDefault(_utilModule);
	
	var _widgetModule = __webpack_require__(13);
	
	var _widgetModule2 = _interopRequireDefault(_widgetModule);
	
	var _sightglass = __webpack_require__(7);
	
	var _sightglass2 = _interopRequireDefault(_sightglass);
	
	var _rivets = __webpack_require__(5);
	
	var _rivets2 = _interopRequireDefault(_rivets);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main module that holds the other modules as well as widget
	 * related configurations
	 * @module CoreLibrary
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
	
	function parseJSON(response) {
	   return response.json();
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
	
	initRivets();
	
	function initRivets() {
	   _sightglass2.default.adapters = _rivets2.default.adapters;
	   _sightglass2.default.root = '.';
	
	   /**
	    * Rivets custom binders and formatters
	    * @namespace rivets
	    */
	
	   /**
	    * Formatter that translates current value in binder.
	    * @memberof rivets
	    * @example
	    * <span>{'key' | translate}</span>
	    * <span>{'someTextWithArgs' | translate 'arg1' 'arg2'}
	    * @mixin formatter "translate"
	    * @param ...args {String} arguments to pass to the translationModule.getTranslation
	    * @returns {String}
	    */
	   _rivets2.default.formatters.translate = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	         args[_key] = arguments[_key];
	      }
	
	      return _translationModule2.default.getTranslation.apply(_translationModule2.default, args);
	   };
	
	   /**
	    * Check if v1 and v2 are "strict" equal.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | === v2}</div>
	    * @static
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['==='] = function (v1, v2) {
	      return v1 === v2;
	   };
	
	   /**
	    * Check if v1 and v2 are equal.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | == v2}</div>
	    * @mixin formatter "=="
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['=='] = function (v1, v2) {
	      return v1 == v2; // jshint ignore:line
	   };
	
	   /**
	    * Check if v1 is greater or equal than v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | >= v2}</div>
	    * @mixin formatter ">="
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['>='] = function (v1, v2) {
	      return v1 >= v2;
	   };
	
	   /**
	    * Check if v1 is greater than v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | > v2}</div>
	    * @mixin formatter ">"
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['>'] = function (v1, v2) {
	      return v1 > v2;
	   };
	
	   /**
	    * Check if v1 is less or equal than v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | =< v2}</div>
	    * @mixin formatter "<="
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['<='] = function (v1, v2) {
	      return v1 <= v2;
	   };
	
	   /**
	    * Check if v1 is less than v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | < v2}</div>
	    * @mixin formatter "<"
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['<'] = function (v1, v2) {
	      return v1 < v2;
	   };
	
	   /**
	    * Check if v1 is not equal to v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | != v2}</div>
	    * @mixin formatter "!="
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['!='] = function (v1, v2) {
	      return v1 != v2; // jshint ignore:line
	   };
	
	   /**
	    * Check if v1 is not equal value/type to v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | !== v2}</div>
	    * @mixin formatter "!=="
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['!=='] = function (v1, v2) {
	      return v1 !== v2;
	   };
	
	   /**
	    * Check if v1 and v2 are valid.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | and v2}</div>
	    * @mixin formatter "and"
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['and'] = function (v1, v2) {
	      return v1 && v2;
	   };
	
	   /**
	    * Check if v1 or v2 are valid.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | or v2}</div>
	    * @mixin formatter "or"
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['or'] = function (v1, v2) {
	      return v1 || v2;
	   };
	
	   /**
	    * Check if v1 is not false.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | not}</div>
	    * @mixin formatter "not"
	    * @param v1
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['not'] = function (v1) {
	      return !v1;
	   };
	
	   /**
	    * Subtract v2 from v1.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | - v2}</div>
	    * @mixin formatter "-"
	    * @param v1
	    * @param v2
	    * @returns {Number}
	    */
	   _rivets2.default.formatters['-'] = function (v1, v2) {
	      return v1 - v2;
	   };
	
	   /**
	    * Sum of v1 and v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | + v2}</div>
	    * @mixin formatter "+"
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['+'] = function (v1, v2) {
	      return v1 + v2;
	   };
	
	   /**
	    * Multiply v1 by v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | * v2}</div>
	    * @mixin formatter "*"
	    * @param v1
	    * @param v2
	    * @returns {Number}
	    */
	   _rivets2.default.formatters['*'] = function (v1, v2) {
	      return v1 * v2;
	   };
	
	   /**
	    * Divide v1 by v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | / v2}</div>
	    * @mixin formatter "/"
	    * @param v1
	    * @param v2
	    * @returns {Number}
	    */
	   _rivets2.default.formatters['/'] = function (v1, v2) {
	      return v1 / v2;
	   };
	
	   /**
	    * Check if v1 is valid, otherwise use v2.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | > v2}</div>
	    * @mixin formatter ">"
	    * @param v1
	    * @param v2
	    * @returns {boolean}
	    */
	   _rivets2.default.formatters['?'] = function (v1, v2) {
	      return v1 ? v1 : v2;
	   };
	
	   /**
	    * Returns specified object at specified key for specified array index.
	    * @memberof rivets
	    * @example
	    * <div>{arr | array_at index key}</div>
	    * @mixin formatter "array_at"
	    * @param arr The source array
	    * @param index The desired index from given array
	    * @param key The desired key of the object to be returned
	    * @returns {*}
	    */
	   _rivets2.default.formatters['array_at'] = function (arr, index, key) {
	      return arr == null || arr.length === 0 ? [] : arr[index][key];
	   };
	
	   /**
	    * Returns an array of objects where each objects contains key and value properties based on the passed array.
	    * @memberof rivets
	    * @example
	    * <div>{v1 | property_list}</div>
	    * @mixin formatter "property_list"
	    * @param {Object} obj The source object
	    * @returns {Array}
	    */
	   _rivets2.default.formatters['property_list'] = function (obj) {
	      return function () {
	         var properties = [];
	         for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	               properties.push({ key: key, value: obj[key] });
	            }
	         }
	         return properties;
	      }();
	   };
	
	   /**
	    * Custom style binder.
	    * @memberof rivets
	    * @example
	    * <div rv-style-opacity="1">
	    * @mixin binder "style-*"
	    * @param el
	    * @param value
	    */
	   _rivets2.default.binders['style-*'] = function (el, value) {
	      el.style.setProperty(this.args[0], value);
	   };
	
	   /**
	    * Cloaking waits for element to bind and then sets it visible with a slight delay.
	    *
	    * Can listen to a value and apply the opacity after that value has changed
	    * Usage: rv-cloak or rv-cloak="value"
	    * In promise resolution, add something like this.scope.loaded = true
	    * @example
	    * <div rv-cloak> or <div rv-cloak="value">
	    * @memberof rivets
	    * @mixin binder "cloak"
	    * @type {{priority: number, bind: rivets.binders.cloak.bind}}
	    */
	   _rivets2.default.binders['cloak'] = {
	      priority: -1000,
	      bind: function bind(el) {
	         el.style.opacity = 0;
	      },
	      routine: function routine(el, value) {
	         if (value !== undefined && value !== false) {
	            setTimeout(function () {
	               el.style.opacity = 1;
	            }, 100);
	         }
	      }
	   };
	
	   /**
	    * Binder that adds animation class.
	    * @memberof rivets
	    * @example <div rv-anim-stagger="index"></div>
	    * @mixin binder "anim-stagger"
	    * @param el DOM element to apply classes
	    * @param index List item index
	    */
	   _rivets2.default.binders['anim-stagger'] = function (el, index) {
	      if (index < 0) {
	         return false;
	      }
	      var animationDisable = el.getAttribute('data-anim-disable');
	      if (animationDisable === 'true') {
	         return false;
	      } else {
	         var speed = 70;
	         el.classList.remove('anim-stagger');
	         el.classList.add('anim-stagger');
	         setTimeout(function () {
	            el.classList.add('anim-enter-active');
	            setTimeout(function () {
	               el.classList.remove('anim-stagger');
	               el.classList.remove('anim-enter-active');
	            }, 200);
	         }, speed * index);
	      }
	   };
	
	   /**
	    * Binder to temporarily disable the stagger animation.
	    * IMPORTANT: The rv-anim-disable attribute has to be placed before the binder that provides the animation for it to take effect in the animation binder
	    * @memberof rivets
	    * @example
	    * <div rv-anim-disable="event.disableAnimation" rv-anim-stagger="index">
	    * @mixin binder "anim-disable"
	    * @param el Dom element to disable the animation on
	    * @param animationDisable 'true' to disable animations
	    */
	   _rivets2.default.binders['anim-disable'] = function (el, animationDisable) {
	      el.setAttribute('data-anim-disable', animationDisable);
	   };
	
	   /**
	    * @description Binder to toggle a custom class based on the passed property, picks up the class name form the "rv-toggle-class" attribute.
	    * @memberof rivets
	    * @example <div rv-custom-class="myBoolean" rv-toggle-class="myCustomClass">
	    * @mixin binder "custom-class"
	    * @param el DOM element to apply class to
	    * @param property The property to check
	    */
	   _rivets2.default.binders['custom-class'] = function (el, property) {
	      var cssClass = el.getAttribute('rv-toggle-class');
	
	      if (property === true) {
	         el.classList.add(cssClass);
	      } else {
	         el.classList.remove(cssClass);
	      }
	   };
	}
	
	exports.default = {
	   /**
	    * Name of the browser that is running the widget
	    * @memberof module:CoreLibrary
	    * @type {String}
	    */
	   browser: checkBrowser().browser,
	
	   /**
	    * Browser version.
	    * @memberof module:CoreLibrary
	    * @type {String}
	    */
	   browserVersion: checkBrowser().browserVersion,
	
	   Component: _Component2.default,
	
	   /**
	    * Expected Kambi API version to use
	    * @type {String}
	    * @private
	    */
	   expectedApiVersion: '1.0.0.13', // this value is replaced with the API version number during the compilation step
	
	   /**
	    * Development flag
	    * @type {Boolean}
	    * @memberOf module:CoreLibrary
	    */
	   development: false,
	
	   /**
	    * utilModule
	    * @type {Object}
	    * @memberOf module:CoreLibrary
	    */
	   utilModule: _utilModule2.default,
	
	   /**
	    * widgetModule
	    * @type {Object}
	    * @memberOf module:CoreLibrary
	    */
	   widgetModule: _widgetModule2.default,
	
	   /**
	    * offeringModule
	    * @type {Object}
	    * @memberOf module:CoreLibrary
	    */
	   offeringModule: _offeringModule2.default,
	
	   /**
	    * statisticsModule
	    * @type {Object}
	    * @memberOf module:CoreLibrary
	    */
	   statisticsModule: _statisticsModule2.default,
	
	   /**
	    * Api ready flag
	    * This value is set to true once the kambi API has finished loaded
	    * @type Boolean
	    * @memberOf module:CoreLibrary
	    */
	   apiReady: false,
	
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
	    * @memberOf module:CoreLibrary
	    */
	   config: {
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
	
	   /**
	    * Default height: 450.
	    * @type {Number}
	    * @memberOf module:CoreLibrary
	    * @private
	    */
	   height: 450,
	
	   /**
	    * Page info.
	    * @type {Object}
	    * @property {Array(String)} leaguePaths
	    * @property {String} pageParam
	    * @property {String} pageTrackingPath
	    * @property {String} pageType
	    * @memberOf module:CoreLibrary
	    */
	   pageInfo: {
	      leaguePaths: [],
	      pageParam: '',
	      pageTrackingPath: '',
	      pageType: ''
	   },
	
	   PaginationComponent: _PaginationComponent2.default,
	
	   /**
	    * api versions object.
	    * @type {Object}
	    * @property {String} client
	    * @property {String} libs
	    * @property {String} wapi
	    * @memberOf module:CoreLibrary
	    */
	   apiVersions: {
	      client: '',
	      libs: '',
	      wapi: ''
	   },
	
	   /**
	    * The name sent to Kambi API for analytics data collection
	    * @memberOf module:CoreLibrary
	    * @private
	    */
	   widgetTrackingName: null,
	
	   /**
	    * args object for each component.
	    * @memberOf module:CoreLibrary
	    * @private
	    */
	   args: {},
	
	   /**
	    * Method that initializes on component construct, sets widget configurations.
	    * Can load mock data if not loaded in an iframe.
	    * @param setDefaultHeight
	    * @memberOf module:CoreLibrary
	    * @returns {Promise}
	    */
	   init: function init(setDefaultHeight) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	         if (window.KambiWidget) {
	            // For development purposes we might want to load a widget on it's own so we check if we are in an iframe, if not then load some fake data
	            if (window.self === window.top) {
	               console.warn(window.location.host + window.location.pathname + ' is being loaded as stand-alone');
	               // Load the mock config data
	               fetch('mockSetupData.json').then(checkStatus).then(parseJSON).then(function (mockSetupData) {
	                  // Output some debug info that could be helpful
	                  console.debug('Loaded mock setup data');
	                  console.debug(mockSetupData);
	                  // Apply the mock config data to the core
	                  _this.applySetupData(mockSetupData, setDefaultHeight);
	                  if (_this.translationModule != null) {
	                     _this.translationModule.fetchTranslations(mockSetupData.clientConfig.locale).then(function () {
	                        resolve(mockSetupData['arguments']);
	                     });
	                  } else {
	                     resolve(mockSetupData['arguments']);
	                  }
	               }).catch(function (error) {
	                  console.debug('Request failed');
	                  console.trace(error);
	                  reject();
	               });
	            } else {
	               window.KambiWidget.apiReady = function (api) {
	                  _this.widgetModule.api = api;
	                  if (api.VERSION !== _this.expectedApiVersion) {
	                     console.warn('Wrong Kambi API version loaded, expected: ' + _this.expectedApiVersion + ' got: ' + api.VERSION);
	                  }
	
	                  // Request the setup info from the widget api
	                  _this.requestSetup(function (setupData) {
	                     // Apply the config data to the core
	                     _this.applySetupData(setupData, setDefaultHeight);
	
	                     // TODO: Move this to widgets so we don't request them when not needed
	                     // Request the outcomes from the betslip so we can update our widget, also sets up a subscription for future betslip updates
	                     _this.widgetModule.requestBetslipOutcomes();
	                     // Request the odds format that is set in the sportsbook, this also sets up a subscription for future odds format changes
	                     _this.widgetModule.requestOddsFormat();
	
	                     if (_this.translationModule != null) {
	                        _this.translationModule.fetchTranslations(setupData.clientConfig.locale).then(function () {
	                           resolve(setupData['arguments']);
	                        });
	                     } else {
	                        resolve(setupData['arguments']);
	                     }
	                  });
	               };
	               // Setup the response handler for the widget api
	               window.KambiWidget.receiveResponse = function (dataObject) {
	                  _this.widgetModule.handleResponse(dataObject);
	               };
	            }
	         } else {
	            console.warn('Kambi widget API not loaded');
	            reject();
	         }
	      });
	   },
	
	
	   /**
	    * Applies setup data to current component.
	    * @memberOf module:CoreLibrary
	    * @param {Object} setupData Setup data object
	    * @param {boolean} setDefaultHeight Default height value
	    * @private
	    */
	   applySetupData: function applySetupData(setupData, setDefaultHeight) {
	
	      // Set the configuration
	      this.setConfig(setupData.clientConfig);
	
	      // Set page info
	      this.setPageInfo(setupData.pageInfo);
	
	      // Set versions
	      this.setVersions(setupData.versions);
	
	      // set default height
	      if (setDefaultHeight === true) {
	         this.setHeight(setupData.height);
	      }
	      // flag the api as ready
	      this.apiReady = true;
	   },
	
	
	   /**
	    * Set config object of CoreLibrary.
	    * @memberOf module:CoreLibrary
	    * @param {Object} config Config object to be set
	    * @private
	    */
	   setConfig: function setConfig(config) {
	      for (var i in config) {
	         if (config.hasOwnProperty(i) && this.config.hasOwnProperty(i)) {
	            this.config[i] = config[i];
	         }
	      }
	      // Make sure that the routeRoot is not null or undefined
	      if (this.config.routeRoot == null) {
	         this.config.routeRoot = '';
	      } else if (this.config.routeRoot.length > 0 && this.config.routeRoot.slice(-1) !== '/') {
	         // If the routeRoot is not empty we need to make sure it has a trailing slash
	         this.config.routeRoot += '/';
	      }
	   },
	
	
	   /**
	    * Sets page info.
	    * @memberOf module:CoreLibrary
	    * @param {Object} pageInfo pageinfo object we receive from api
	    * @private
	    */
	   setPageInfo: function setPageInfo(pageInfo) {
	      // Check if the last character in the pageParam property is a slash, if not add it so we can use this property in filter requests
	      if (pageInfo.pageType === 'filter' && pageInfo.pageParam.substr(-1) !== '/') {
	         pageInfo.pageParam += '/';
	      }
	      this.pageInfo = pageInfo;
	   },
	
	
	   /**
	    * Sets versions.
	    * @memberOf module:CoreLibrary
	    * @param {Object} versions
	    * @private
	    */
	   setVersions: function setVersions(versions) {
	      for (var i in versions) {
	         if (versions.hasOwnProperty(i) && this.apiVersions.hasOwnProperty(i)) {
	            this.apiVersions[i] = versions[i];
	         }
	      }
	   },
	
	
	   /**
	    * Set args object.
	    * @memberOf module:CoreLibrary
	    * @param {Object} args
	    * @private
	    */
	   setArgs: function setArgs(args) {
	      this.args = args;
	   },
	
	
	   /**
	    * Requests setup data from widgetModule.
	    * @memberOf module:CoreLibrary
	    * @param {function} callback
	    * @private
	    */
	   requestSetup: function requestSetup(callback) {
	      this.widgetModule.requestSetup(callback);
	   },
	
	
	   /**
	    * Logs the response.
	    * @memberOf module:CoreLibrary
	    * @param {Object} response
	    * @private
	    */
	   receiveRespone: function receiveRespone(response) {
	      console.debug(response);
	   },
	
	
	   /**
	    * Sets odds format.
	    * @memberOf module:CoreLibrary
	    * @param {String} oddsFormat
	    * @private
	    */
	   setOddsFormat: function setOddsFormat(oddsFormat) {
	      this.config.oddsFormat = oddsFormat;
	   },
	
	
	   /**
	    * Sets widget height.
	    * @memberOf module:CoreLibrary
	    * @param {Number} height
	    * @private
	    */
	   setHeight: function setHeight(height) {
	      this.height = height;
	      this.widgetModule.setHeight(height);
	   },
	
	
	   /**
	    * Makes an request using Fetch (polyfill) library.
	    * @memberOf module:CoreLibrary
	    * @param {String} url
	    * @returns {Promise}
	    */
	   getData: function getData(url) {
	      return fetch(url).then(checkStatus).then(parseJSON).catch(function (error) {
	         console.debug('Error fetching data');
	         console.trace(error);
	         throw error;
	      });
	   },
	
	
	   /**
	    * Makes an ajax request using Fetch (polyfill) library.
	    * @memberOf module:CoreLibrary
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
	    * @memberOf module:CoreLibrary
	    * @param {String} name Set a tracking name
	    */
	   setWidgetTrackingName: function setWidgetTrackingName(name) {
	      this.widgetTrackingName = name;
	   }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _stapes = __webpack_require__(4);
	
	var _stapes2 = _interopRequireDefault(_stapes);
	
	var _coreLibrary = __webpack_require__(2);
	
	var _coreLibrary2 = _interopRequireDefault(_coreLibrary);
	
	var _rivets = __webpack_require__(5);
	
	var _rivets2 = _interopRequireDefault(_rivets);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mergeObjs = function mergeObjs() {
	   for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
	      objs[_key] = arguments[_key];
	   }
	
	   var ret = {};
	   objs.forEach(function (obj) {
	      obj = obj || {};
	      Object.keys(obj).forEach(function (key) {
	         ret[key] = obj[key];
	      });
	   });
	   return ret;
	};
	
	exports.default = _stapes2.default.subclass({
	
	   /**
	    * Object with default values from args if they are not present in
	    * the Kambi API provided ones.
	    * @static
	    * @type {Object}
	    * @memberof Component
	    */
	   defaultArgs: {},
	   /**
	    * If present, this value is appended to rootElement with the innerHTML DOM call
	    * essentially parsing the the text as HTML.
	    * @static
	    * @type {String}
	    * @memberof Component
	    */
	   htmlTemplate: null,
	   /**
	    * Stapes Constructor method
	    * @param {object} options
	    * @param {HTMLElement|String} options.rootElement an HTML element or a
	    * CSS selector for the HTMLElement.
	    * This element will be the "root" of the rivets scope
	    * @returns {Promise}
	    * @memberof Component
	    */
	   constructor: function constructor(options) {
	      var _this = this;
	
	      /**
	       * object to be used in the HTML templates for data binding
	       * @type {Object}
	       */
	      this.scope = {};
	      /**
	       * Rivets view object, binds this.scope to this.rootElement.
	       * @type {Object}
	       */
	      this.view = null;
	      /**
	       * HTML element to in which rivets.bind will be called,
	       * if string uses document.querySelector to get the element
	       * @type {HTMLElement}
	       */
	      this.rootElement = null;
	      /**
	       * Method that should contain the widget initialization logic
	       * This method is only called after the API is ready
	       */
	      this.init; // jshint ignore:line
	
	      if (options == null) {
	         options = {};
	      }
	
	      // setting options that can be received in the constructor
	      var optionsKeys = ['defaultArgs', 'rootElement'];
	      optionsKeys.forEach(function (key) {
	         if (typeof options[key] !== 'undefined') {
	            _this[key] = options[key];
	         }
	      });
	
	      if (this.rootElement == null) {
	         throw new Error('options.rootElement not set, please pass a HTMLElement or a CSS selector');
	      }
	
	      var args = {};
	
	      var coreLibraryPromise;
	      if (_coreLibrary2.default.apiReady === true) {
	         coreLibraryPromise = new Promise(function (resolve, reject) {
	            resolve();
	         });
	      } else {
	         coreLibraryPromise = new Promise(function (resolve, reject) {
	            _coreLibrary2.default.init().then(function (widgetArgs) {
	               if (widgetArgs == null) {
	                  widgetArgs = {};
	               }
	               var apiVersion = _coreLibrary2.default.widgetModule.api.VERSION;
	               if (apiVersion == null) {
	                  apiVersion = '1.0.0.13';
	               }
	               _this.scope.widgetCss = '//c3-static.kambi.com/sb-mobileclient/widget-api/' + apiVersion + '/resources/css/' + _coreLibrary2.default.config.customer + '/' + _coreLibrary2.default.config.offering + '/widgets.css';
	
	               var externalArgsUrl = widgetArgs.externalArgsUrl || _this.defaultArgs.externalArgsUrl;
	               if (externalArgsUrl != null) {
	                  _coreLibrary2.default.getData(externalArgsUrl).then(function (externalArgs) {
	                     args = mergeObjs(_this.defaultArgs, widgetArgs, externalArgs);
	                     resolve();
	                  }).catch(function (err) {
	                     console.log('Unable to load or parse external args');
	                     args = mergeObjs(_this.defaultArgs, widgetArgs);
	                     resolve();
	                  });
	               } else {
	                  args = mergeObjs(_this.defaultArgs, widgetArgs);
	                  resolve();
	               }
	            });
	         });
	      }
	
	      return coreLibraryPromise.then(function () {
	         // applying conditionalArgs (see #KSBWI-653)
	         if (args.conditionalArgs != null) {
	            args.conditionalArgs.forEach(function (carg) {
	               var apply = true;
	               if (carg.clientConfig != null) {
	                  Object.keys(carg.clientConfig).forEach(function (key) {
	                     if (_coreLibrary2.default.config[key] !== carg.clientConfig[key]) {
	                        apply = false;
	                     }
	                  });
	               }
	
	               if (carg.pageInfo != null) {
	                  Object.keys(carg.pageInfo).forEach(function (key) {
	                     if (_coreLibrary2.default.pageInfo[key] !== carg.pageInfo[key]) {
	                        apply = false;
	                     }
	                  });
	               }
	
	               if (apply) {
	                  console.log('Applying conditional arguments:');
	                  console.log(carg.args);
	                  args = mergeObjs(args, carg.args);
	               }
	            });
	         }
	
	         _this.scope.args = args;
	
	         if (typeof _this.rootElement === 'string') {
	            _this.rootElement = document.querySelector(_this.rootElement);
	         }
	
	         for (var i = 0; i < _this.rootElement.attributes.length; ++i) {
	            var at = _this.rootElement.attributes[i];
	            if (at.name.indexOf('data-') === 0) {
	               var name = at.name.slice(5); // removes the 'data-' from the string
	               _this.scope[name] = at.value;
	            }
	         }
	
	         if (typeof _this.htmlTemplate === 'string') {
	            if (_this.htmlTemplate.length < 100 && window[_this.htmlTemplate] != null) {
	               _this.rootElement.innerHTML = window[_this.htmlTemplate];
	            } else {
	               _this.rootElement.innerHTML = _this.htmlTemplate;
	            }
	         }
	
	         _this.view = _rivets2.default.bind(_this.rootElement, _this.scope);
	         _this.init();
	      });
	   }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//
	//  ____  _                           _
	// / ___|| |_ __ _ _ __   ___  ___   (_)___  (*)
	// \___ \| __/ _` | '_ \ / _ \/ __|  | / __|
	//  ___) | || (_| | |_) |  __/\__ \_ | \__ \
	// |____/ \__\__,_| .__/ \___||___(_)/ |___/
	//              |_|              |__/
	//
	// (*) the Javascript MVC microframework that does just enough
	//
	// (c) Hay Kranen < hay@bykr.org >
	// Released under the terms of the MIT license
	// < http://en.wikipedia.org/wiki/MIT_License >
	//
	// Stapes.js : http://hay.github.com/stapes
	;(function() {
	    'use strict';
	
	    var VERSION = "1.0.0";
	
	    // Global counter for all events in all modules (including mixed in objects)
	    var guid = 1;
	
	    // Makes _.create() faster
	    if (!Object.create) {
	        var CachedFunction = function(){};
	    }
	
	    // So we can use slice.call for arguments later on
	    var slice = Array.prototype.slice;
	
	    // Private attributes and helper functions, stored in an object so they
	    // are overwritable by plugins
	    var _ = {
	        // Properties
	        attributes : {},
	
	        eventHandlers : {
	            "-1" : {} // '-1' is used for the global event handling
	        },
	
	        guid : -1,
	
	        // Methods
	        addEvent : function(event) {
	            // If we don't have any handlers for this type of event, add a new
	            // array we can use to push new handlers
	            if (!_.eventHandlers[event.guid][event.type]) {
	                _.eventHandlers[event.guid][event.type] = [];
	            }
	
	            // Push an event object
	            _.eventHandlers[event.guid][event.type].push({
	                "guid" : event.guid,
	                "handler" : event.handler,
	                "scope" : event.scope,
	                "type" : event.type
	            });
	        },
	
	        addEventHandler : function(argTypeOrMap, argHandlerOrScope, argScope) {
	            var eventMap = {},
	                scope;
	
	            if (typeof argTypeOrMap === "string") {
	                scope = argScope || false;
	                eventMap[ argTypeOrMap ] = argHandlerOrScope;
	            } else {
	                scope = argHandlerOrScope || false;
	                eventMap = argTypeOrMap;
	            }
	
	            for (var eventString in eventMap) {
	                var handler = eventMap[eventString];
	                var events = eventString.split(" ");
	
	                for (var i = 0, l = events.length; i < l; i++) {
	                    var eventType = events[i];
	                    _.addEvent.call(this, {
	                        "guid" : this._guid || this._.guid,
	                        "handler" : handler,
	                        "scope" : scope,
	                        "type" : eventType
	                    });
	                }
	            }
	        },
	
	        addGuid : function(object, forceGuid) {
	            if (object._guid && !forceGuid) return;
	
	            object._guid = guid++;
	
	            _.attributes[object._guid] = {};
	            _.eventHandlers[object._guid] = {};
	        },
	
	        // This is a really small utility function to save typing and produce
	        // better optimized code
	        attr : function(guid) {
	            return _.attributes[guid];
	        },
	
	        clone : function(obj) {
	            var type = _.typeOf(obj);
	
	            if (type === 'object') {
	                return _.extend({}, obj);
	            }
	
	            if (type === 'array') {
	                return obj.slice(0);
	            }
	        },
	
	        create : function(proto) {
	            if (Object.create) {
	                return Object.create(proto);
	            } else {
	                CachedFunction.prototype = proto;
	                return new CachedFunction();
	            }
	        },
	
	        createSubclass : function(props, includeEvents) {
	            props = props || {};
	            includeEvents = includeEvents || false;
	
	            var superclass = props.superclass.prototype;
	
	            // Objects always have a constructor, so we need to be sure this is
	            // a property instead of something from the prototype
	            var realConstructor = props.hasOwnProperty('constructor') ? props.constructor : function(){};
	
	            function constructor() {
	                // Be kind to people forgetting new
	                if (!(this instanceof constructor)) {
	                    throw new Error("Please use 'new' when initializing Stapes classes");
	                }
	
	                // If this class has events add a GUID as well
	                if (this.on) {
	                    _.addGuid( this, true );
	                }
	
	                realConstructor.apply(this, arguments);
	            }
	
	            if (includeEvents) {
	                _.extend(superclass, Events);
	            }
	
	            constructor.prototype = _.create(superclass);
	            constructor.prototype.constructor = constructor;
	
	            _.extend(constructor, {
	                extend : function() {
	                    return _.extendThis.apply(this, arguments);
	                },
	
	                // We can't call this 'super' because that's a reserved keyword
	                // and fails in IE8
	                'parent' : superclass,
	
	                proto : function() {
	                    return _.extendThis.apply(this.prototype, arguments);
	                },
	
	                subclass : function(obj) {
	                    obj = obj || {};
	                    obj.superclass = this;
	                    return _.createSubclass(obj);
	                }
	            });
	
	            // Copy all props given in the definition to the prototype
	            for (var key in props) {
	                if (key !== 'constructor' && key !== 'superclass') {
	                    constructor.prototype[key] = props[key];
	                }
	            }
	
	            return constructor;
	        },
	
	        emitEvents : function(type, data, explicitType, explicitGuid) {
	            explicitType = explicitType || false;
	            explicitGuid = explicitGuid || this._guid;
	
	            // #30: make a local copy of handlers to prevent problems with
	            // unbinding the event while unwinding the loop
	            var handlers = slice.call(_.eventHandlers[explicitGuid][type]);
	
	            for (var i = 0, l = handlers.length; i < l; i++) {
	                // Clone the event to prevent issue #19
	                var event = _.extend({}, handlers[i]);
	                var scope = (event.scope) ? event.scope : this;
	
	                if (explicitType) {
	                    event.type = explicitType;
	                }
	
	                event.scope = scope;
	                event.handler.call(event.scope, data, event);
	            }
	        },
	
	        // Extend an object with more objects
	        extend : function() {
	            var args = slice.call(arguments);
	            var object = args.shift();
	
	            for (var i = 0, l = args.length; i < l; i++) {
	                var props = args[i];
	                for (var key in props) {
	                    object[key] = props[key];
	                }
	            }
	
	            return object;
	        },
	
	        // The same as extend, but uses the this value as the scope
	        extendThis : function() {
	            var args = slice.call(arguments);
	            args.unshift(this);
	            return _.extend.apply(this, args);
	        },
	
	        // from http://stackoverflow.com/a/2117523/152809
	        makeUuid : function() {
	            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	                return v.toString(16);
	            });
	        },
	
	        removeAttribute : function(keys, silent) {
	            silent = silent || false;
	
	            // Split the key, maybe we want to remove more than one item
	            var attributes = _.trim(keys).split(" ")
	                ,mutateData = {}
	                ;
	
	            // Actually delete the item
	            for (var i = 0, l = attributes.length; i < l; i++) {
	                var key = _.trim(attributes[i]);
	
	                if (key) {
	                    // Store data for mutate event
	                    mutateData.key = key;
	                    mutateData.oldValue = _.attr(this._guid)[key];
	
	                    delete _.attr(this._guid)[key];
	
	                    // If 'silent' is set, do not throw any events
	                    if (!silent) {
	                        this.emit('change', key);
	                        this.emit('change:' + key);
	                        this.emit('mutate', mutateData);
	                        this.emit('mutate:' + key, mutateData);
	                        this.emit('remove', key);
	                        this.emit('remove:' + key);
	                    }
	
	                    // clean up
	                    delete mutateData.oldValue;
	                }
	            }
	        },
	
	        removeEventHandler : function(type, handler) {
	            var handlers = _.eventHandlers[this._guid];
	
	            if (type && handler) {
	                // Remove a specific handler
	                handlers = handlers[type];
	                if (!handlers) return;
	
	                for (var i = 0, l = handlers.length, h; i < l; i++) {
	                    h = handlers[i].handler;
	                    if (h && h === handler) {
	                        handlers.splice(i--, 1);
	                        l--;
	                    }
	                }
	            } else if (type) {
	                // Remove all handlers for a specific type
	                delete handlers[type];
	            } else {
	                // Remove all handlers for this module
	                _.eventHandlers[this._guid] = {};
	            }
	        },
	
	        setAttribute : function(key, value, silent) {
	            silent = silent || false;
	
	            // We need to do this before we actually add the item :)
	            var itemExists = this.has(key);
	            var oldValue = _.attr(this._guid)[key];
	
	            // Is the value different than the oldValue? If not, ignore this call
	            if (value === oldValue) {
	                return;
	            }
	
	            // Actually add the item to the attributes
	            _.attr(this._guid)[key] = value;
	
	            // If 'silent' flag is set, do not throw any events
	            if (silent) {
	                return;
	            }
	
	            // Throw a generic event
	            this.emit('change', key);
	
	            // And a namespaced event as well, NOTE that we pass value instead of
	            // key here!
	            this.emit('change:' + key, value);
	
	            // Throw namespaced and non-namespaced 'mutate' events as well with
	            // the old value data as well and some extra metadata such as the key
	            var mutateData = {
	                "key" : key,
	                "newValue" : value,
	                "oldValue" : (typeof oldValue !== 'undefined') ? oldValue : null
	            };
	
	            this.emit('mutate', mutateData);
	            this.emit('mutate:' + key, mutateData);
	
	            // Also throw a specific event for this type of set
	            var specificEvent = itemExists ? 'update' : 'create';
	
	            this.emit(specificEvent, key);
	
	            // And a namespaced event as well, NOTE that we pass value instead of key
	            this.emit(specificEvent + ':' + key, value);
	        },
	
	        trim : function(str) {
	            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	        },
	
	        typeOf : function(val) {
	            if (val === null || typeof val === "undefined") {
	                // This is a special exception for IE, in other browsers the
	                // method below works all the time
	                return String(val);
	            } else {
	                return Object.prototype.toString.call(val).replace(/\[object |\]/g, '').toLowerCase();
	            }
	        },
	
	        updateAttribute : function(key, fn, silent) {
	            var item = this.get(key);
	
	            // In previous versions of Stapes we didn't have the check for object,
	            // but still this worked. In 0.7.0 it suddenly doesn't work anymore and
	            // we need the check. Why? I have no clue.
	            var type = _.typeOf(item);
	
	            if (type === 'object' || type === 'array') {
	                item = _.clone(item);
	            }
	
	            var newValue = fn.call(this, item, key);
	            _.setAttribute.call(this, key, newValue, silent || false);
	        }
	    };
	
	    // Can be mixed in later using Stapes.mixinEvents(object);
	    var Events = {
	        emit : function(types, data) {
	            data = (typeof data === "undefined") ? null : data;
	
	            var splittedTypes = types.split(" ");
	
	            for (var i = 0, l = splittedTypes.length; i < l; i++) {
	                var type = splittedTypes[i];
	
	                // First 'all' type events: is there an 'all' handler in the
	                // global stack?
	                if (_.eventHandlers[-1].all) {
	                    _.emitEvents.call(this, "all", data, type, -1);
	                }
	
	                // Catch all events for this type?
	                if (_.eventHandlers[-1][type]) {
	                    _.emitEvents.call(this, type, data, type, -1);
	                }
	
	                if (typeof this._guid === 'number') {
	                    // 'all' event for this specific module?
	                    if (_.eventHandlers[this._guid].all) {
	                        _.emitEvents.call(this, "all", data, type);
	                    }
	
	                    // Finally, normal events :)
	                    if (_.eventHandlers[this._guid][type]) {
	                        _.emitEvents.call(this, type, data);
	                    }
	                }
	            }
	        },
	
	        off : function() {
	            _.removeEventHandler.apply(this, arguments);
	        },
	
	        on : function() {
	            _.addEventHandler.apply(this, arguments);
	        }
	    };
	
	    _.Module = function() {
	
	    };
	
	    _.Module.prototype = {
	        each : function(fn, ctx) {
	            var attr = _.attr(this._guid);
	            for (var key in attr) {
	                var value = attr[key];
	                fn.call(ctx || this, value, key);
	            }
	        },
	
	        extend : function() {
	            return _.extendThis.apply(this, arguments);
	        },
	
	        filter : function(fn) {
	            var filtered = [];
	            var attributes = _.attr(this._guid);
	
	            for (var key in attributes) {
	                if ( fn.call(this, attributes[key], key)) {
	                    filtered.push( attributes[key] );
	                }
	            }
	
	            return filtered;
	        },
	
	        get : function(input) {
	            if (typeof input === "string") {
	                // If there is more than one argument, give back an object,
	                // like Underscore's pick()
	                if (arguments.length > 1) {
	                    var results = {};
	
	                    for (var i = 0, l = arguments.length; i < l; i++) {
	                        var key = arguments[i];
	                        results[key] = this.get(key);
	                    }
	
	                    return results;
	                } else {
	                    return this.has(input) ? _.attr(this._guid)[input] : null;
	                }
	            } else if (typeof input === "function") {
	                var items = this.filter(input);
	                return (items.length) ? items[0] : null;
	            }
	        },
	
	        getAll : function() {
	            return _.clone( _.attr(this._guid) );
	        },
	
	        getAllAsArray : function() {
	            var arr = [];
	            var attributes = _.attr(this._guid);
	
	            for (var key in attributes) {
	                var value = attributes[key];
	
	                if (_.typeOf(value) === "object" && !value.id) {
	                    value.id = key;
	                }
	
	                arr.push(value);
	            }
	
	            return arr;
	        },
	
	        has : function(key) {
	            return (typeof _.attr(this._guid)[key] !== "undefined");
	        },
	
	        map : function(fn, ctx) {
	            var mapped = [];
	            this.each(function(value, key) {
	                mapped.push( fn.call(ctx || this, value, key) );
	            }, ctx || this);
	            return mapped;
	        },
	
	        // Akin to set(), but makes a unique id
	        push : function(input, silent) {
	            if (_.typeOf(input) === "array") {
	                for (var i = 0, l = input.length; i < l; i++) {
	                    _.setAttribute.call(this, _.makeUuid(), input[i], silent || false);
	                }
	            } else {
	                _.setAttribute.call(this, _.makeUuid(), input, silent || false);
	            }
	
	            return this;
	        },
	
	        remove : function(input, silent) {
	            if (typeof input === 'undefined') {
	                // With no arguments, remove deletes all attributes
	                _.attributes[this._guid] = {};
	                this.emit('change remove');
	            } else if (typeof input === "function") {
	                this.each(function(item, key) {
	                    if (input(item)) {
	                        _.removeAttribute.call(this, key, silent);
	                    }
	                });
	            } else {
	                // nb: checking for exists happens in removeAttribute
	                _.removeAttribute.call(this, input, silent || false);
	            }
	
	            return this;
	        },
	
	        set : function(objOrKey, valueOrSilent, silent) {
	            if (typeof objOrKey === "object") {
	                for (var key in objOrKey) {
	                    _.setAttribute.call(this, key, objOrKey[key], valueOrSilent || false);
	                }
	            } else {
	                _.setAttribute.call(this, objOrKey, valueOrSilent, silent || false);
	            }
	
	            return this;
	        },
	
	        size : function() {
	            var size = 0;
	            var attr = _.attr(this._guid);
	
	            for (var key in attr) {
	                size++;
	            }
	
	            return size;
	        },
	
	        update : function(keyOrFn, fn, silent) {
	            if (typeof keyOrFn === "string") {
	                _.updateAttribute.call(this, keyOrFn, fn, silent || false);
	            } else if (typeof keyOrFn === "function") {
	                this.each(function(value, key) {
	                    _.updateAttribute.call(this, key, keyOrFn);
	                });
	            }
	
	            return this;
	        }
	    };
	
	    var Stapes = {
	        "_" : _, // private helper functions and properties
	
	        "extend" : function() {
	            return _.extendThis.apply(_.Module.prototype, arguments);
	        },
	
	        "mixinEvents" : function(obj) {
	            obj = obj || {};
	
	            _.addGuid(obj);
	
	            return _.extend(obj, Events);
	        },
	
	        "on" : function() {
	            _.addEventHandler.apply(this, arguments);
	        },
	
	        "subclass" : function(obj, classOnly) {
	            classOnly = classOnly || false;
	            obj = obj || {};
	            obj.superclass = classOnly ? function(){} : _.Module;
	            return _.createSubclass(obj, !classOnly);
	        },
	
	        "version" : VERSION
	    };
	
	    // This library can be used as an AMD module, a Node.js module, or an
	    // old fashioned global
	    if (true) {
	        // Server
	        if (typeof module !== "undefined" && module.exports) {
	            exports = module.exports = Stapes;
	        }
	        exports.Stapes = Stapes;
	    } else if (typeof define === "function" && define.amd) {
	        // AMD
	        define(function() {
	            return Stapes;
	        });
	    } else {
	        // Global scope
	        window.Stapes = Stapes;
	    }
	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// Rivets.js
	// version: 0.9.3
	// author: Michael Richards
	// license: MIT
	(function() {
	  var Rivets, bindMethod, unbindMethod, _ref,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    __slice = [].slice,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
	
	  Rivets = {
	    options: ['prefix', 'templateDelimiters', 'rootInterface', 'preloadData', 'handler', 'executeFunctions'],
	    extensions: ['binders', 'formatters', 'components', 'adapters'],
	    "public": {
	      binders: {},
	      components: {},
	      formatters: {},
	      adapters: {},
	      prefix: 'rv',
	      templateDelimiters: ['{', '}'],
	      rootInterface: '.',
	      preloadData: true,
	      executeFunctions: false,
	      iterationAlias: function(modelName) {
	        return '%' + modelName + '%';
	      },
	      handler: function(context, ev, binding) {
	        return this.call(context, ev, binding.view.models);
	      },
	      configure: function(options) {
	        var descriptor, key, option, value;
	        if (options == null) {
	          options = {};
	        }
	        for (option in options) {
	          value = options[option];
	          if (option === 'binders' || option === 'components' || option === 'formatters' || option === 'adapters') {
	            for (key in value) {
	              descriptor = value[key];
	              Rivets[option][key] = descriptor;
	            }
	          } else {
	            Rivets["public"][option] = value;
	          }
	        }
	      },
	      bind: function(el, models, options) {
	        var view;
	        if (models == null) {
	          models = {};
	        }
	        if (options == null) {
	          options = {};
	        }
	        view = new Rivets.View(el, models, options);
	        view.bind();
	        return view;
	      },
	      init: function(component, el, data) {
	        var scope, template, view;
	        if (data == null) {
	          data = {};
	        }
	        if (el == null) {
	          el = document.createElement('div');
	        }
	        component = Rivets["public"].components[component];
	        template = component.template.call(this, el);
	        if (template instanceof HTMLElement) {
	          while (el.firstChild) {
	            el.removeChild(el.firstChild);
	          }
	          el.appendChild(template);
	        } else {
	          el.innerHTML = template;
	        }
	        scope = component.initialize.call(this, el, data);
	        view = new Rivets.View(el, scope);
	        view.bind();
	        return view;
	      }
	    }
	  };
	
	  if (window['jQuery'] || window['$']) {
	    _ref = 'on' in jQuery.prototype ? ['on', 'off'] : ['bind', 'unbind'], bindMethod = _ref[0], unbindMethod = _ref[1];
	    Rivets.Util = {
	      bindEvent: function(el, event, handler) {
	        return jQuery(el)[bindMethod](event, handler);
	      },
	      unbindEvent: function(el, event, handler) {
	        return jQuery(el)[unbindMethod](event, handler);
	      },
	      getInputValue: function(el) {
	        var $el;
	        $el = jQuery(el);
	        if ($el.attr('type') === 'checkbox') {
	          return $el.is(':checked');
	        } else {
	          return $el.val();
	        }
	      }
	    };
	  } else {
	    Rivets.Util = {
	      bindEvent: (function() {
	        if ('addEventListener' in window) {
	          return function(el, event, handler) {
	            return el.addEventListener(event, handler, false);
	          };
	        }
	        return function(el, event, handler) {
	          return el.attachEvent('on' + event, handler);
	        };
	      })(),
	      unbindEvent: (function() {
	        if ('removeEventListener' in window) {
	          return function(el, event, handler) {
	            return el.removeEventListener(event, handler, false);
	          };
	        }
	        return function(el, event, handler) {
	          return el.detachEvent('on' + event, handler);
	        };
	      })(),
	      getInputValue: function(el) {
	        var o, _i, _len, _results;
	        if (el.type === 'checkbox') {
	          return el.checked;
	        } else if (el.type === 'select-multiple') {
	          _results = [];
	          for (_i = 0, _len = el.length; _i < _len; _i++) {
	            o = el[_i];
	            if (o.selected) {
	              _results.push(o.value);
	            }
	          }
	          return _results;
	        } else {
	          return el.value;
	        }
	      }
	    };
	  }
	
	  Rivets.TypeParser = (function() {
	    function TypeParser() {}
	
	    TypeParser.types = {
	      primitive: 0,
	      keypath: 1
	    };
	
	    TypeParser.parse = function(string) {
	      if (/^'.*'$|^".*"$/.test(string)) {
	        return {
	          type: this.types.primitive,
	          value: string.slice(1, -1)
	        };
	      } else if (string === 'true') {
	        return {
	          type: this.types.primitive,
	          value: true
	        };
	      } else if (string === 'false') {
	        return {
	          type: this.types.primitive,
	          value: false
	        };
	      } else if (string === 'null') {
	        return {
	          type: this.types.primitive,
	          value: null
	        };
	      } else if (string === 'undefined') {
	        return {
	          type: this.types.primitive,
	          value: void 0
	        };
	      } else if (string === '') {
	        return {
	          type: this.types.primitive,
	          value: void 0
	        };
	      } else if (isNaN(Number(string)) === false) {
	        return {
	          type: this.types.primitive,
	          value: Number(string)
	        };
	      } else {
	        return {
	          type: this.types.keypath,
	          value: string
	        };
	      }
	    };
	
	    return TypeParser;
	
	  })();
	
	  Rivets.TextTemplateParser = (function() {
	    function TextTemplateParser() {}
	
	    TextTemplateParser.types = {
	      text: 0,
	      binding: 1
	    };
	
	    TextTemplateParser.parse = function(template, delimiters) {
	      var index, lastIndex, lastToken, length, substring, tokens, value;
	      tokens = [];
	      length = template.length;
	      index = 0;
	      lastIndex = 0;
	      while (lastIndex < length) {
	        index = template.indexOf(delimiters[0], lastIndex);
	        if (index < 0) {
	          tokens.push({
	            type: this.types.text,
	            value: template.slice(lastIndex)
	          });
	          break;
	        } else {
	          if (index > 0 && lastIndex < index) {
	            tokens.push({
	              type: this.types.text,
	              value: template.slice(lastIndex, index)
	            });
	          }
	          lastIndex = index + delimiters[0].length;
	          index = template.indexOf(delimiters[1], lastIndex);
	          if (index < 0) {
	            substring = template.slice(lastIndex - delimiters[1].length);
	            lastToken = tokens[tokens.length - 1];
	            if ((lastToken != null ? lastToken.type : void 0) === this.types.text) {
	              lastToken.value += substring;
	            } else {
	              tokens.push({
	                type: this.types.text,
	                value: substring
	              });
	            }
	            break;
	          }
	          value = template.slice(lastIndex, index).trim();
	          tokens.push({
	            type: this.types.binding,
	            value: value
	          });
	          lastIndex = index + delimiters[1].length;
	        }
	      }
	      return tokens;
	    };
	
	    return TextTemplateParser;
	
	  })();
	
	  Rivets.View = (function() {
	    function View(els, models, options) {
	      var k, option, v, _base, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5;
	      this.els = els;
	      this.models = models;
	      if (options == null) {
	        options = {};
	      }
	      this.update = __bind(this.update, this);
	      this.publish = __bind(this.publish, this);
	      this.sync = __bind(this.sync, this);
	      this.unbind = __bind(this.unbind, this);
	      this.bind = __bind(this.bind, this);
	      this.select = __bind(this.select, this);
	      this.traverse = __bind(this.traverse, this);
	      this.build = __bind(this.build, this);
	      this.buildBinding = __bind(this.buildBinding, this);
	      this.bindingRegExp = __bind(this.bindingRegExp, this);
	      this.options = __bind(this.options, this);
	      if (!(this.els.jquery || this.els instanceof Array)) {
	        this.els = [this.els];
	      }
	      _ref1 = Rivets.extensions;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        option = _ref1[_i];
	        this[option] = {};
	        if (options[option]) {
	          _ref2 = options[option];
	          for (k in _ref2) {
	            v = _ref2[k];
	            this[option][k] = v;
	          }
	        }
	        _ref3 = Rivets["public"][option];
	        for (k in _ref3) {
	          v = _ref3[k];
	          if ((_base = this[option])[k] == null) {
	            _base[k] = v;
	          }
	        }
	      }
	      _ref4 = Rivets.options;
	      for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
	        option = _ref4[_j];
	        this[option] = (_ref5 = options[option]) != null ? _ref5 : Rivets["public"][option];
	      }
	      this.build();
	    }
	
	    View.prototype.options = function() {
	      var option, options, _i, _len, _ref1;
	      options = {};
	      _ref1 = Rivets.extensions.concat(Rivets.options);
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        option = _ref1[_i];
	        options[option] = this[option];
	      }
	      return options;
	    };
	
	    View.prototype.bindingRegExp = function() {
	      return new RegExp("^" + this.prefix + "-");
	    };
	
	    View.prototype.buildBinding = function(binding, node, type, declaration) {
	      var context, ctx, dependencies, keypath, options, pipe, pipes;
	      options = {};
	      pipes = (function() {
	        var _i, _len, _ref1, _results;
	        _ref1 = declaration.match(/((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g);
	        _results = [];
	        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	          pipe = _ref1[_i];
	          _results.push(pipe.trim());
	        }
	        return _results;
	      })();
	      context = (function() {
	        var _i, _len, _ref1, _results;
	        _ref1 = pipes.shift().split('<');
	        _results = [];
	        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	          ctx = _ref1[_i];
	          _results.push(ctx.trim());
	        }
	        return _results;
	      })();
	      keypath = context.shift();
	      options.formatters = pipes;
	      if (dependencies = context.shift()) {
	        options.dependencies = dependencies.split(/\s+/);
	      }
	      return this.bindings.push(new Rivets[binding](this, node, type, keypath, options));
	    };
	
	    View.prototype.build = function() {
	      var el, parse, _i, _len, _ref1;
	      this.bindings = [];
	      parse = (function(_this) {
	        return function(node) {
	          var block, childNode, delimiters, n, parser, text, token, tokens, _i, _j, _len, _len1, _ref1;
	          if (node.nodeType === 3) {
	            parser = Rivets.TextTemplateParser;
	            if (delimiters = _this.templateDelimiters) {
	              if ((tokens = parser.parse(node.data, delimiters)).length) {
	                if (!(tokens.length === 1 && tokens[0].type === parser.types.text)) {
	                  for (_i = 0, _len = tokens.length; _i < _len; _i++) {
	                    token = tokens[_i];
	                    text = document.createTextNode(token.value);
	                    node.parentNode.insertBefore(text, node);
	                    if (token.type === 1) {
	                      _this.buildBinding('TextBinding', text, null, token.value);
	                    }
	                  }
	                  node.parentNode.removeChild(node);
	                }
	              }
	            }
	          } else if (node.nodeType === 1) {
	            block = _this.traverse(node);
	          }
	          if (!block) {
	            _ref1 = (function() {
	              var _k, _len1, _ref1, _results;
	              _ref1 = node.childNodes;
	              _results = [];
	              for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
	                n = _ref1[_k];
	                _results.push(n);
	              }
	              return _results;
	            })();
	            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	              childNode = _ref1[_j];
	              parse(childNode);
	            }
	          }
	        };
	      })(this);
	      _ref1 = this.els;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        el = _ref1[_i];
	        parse(el);
	      }
	      this.bindings.sort(function(a, b) {
	        var _ref2, _ref3;
	        return (((_ref2 = b.binder) != null ? _ref2.priority : void 0) || 0) - (((_ref3 = a.binder) != null ? _ref3.priority : void 0) || 0);
	      });
	    };
	
	    View.prototype.traverse = function(node) {
	      var attribute, attributes, binder, bindingRegExp, block, identifier, regexp, type, value, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
	      bindingRegExp = this.bindingRegExp();
	      block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
	      _ref1 = node.attributes;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        attribute = _ref1[_i];
	        if (bindingRegExp.test(attribute.name)) {
	          type = attribute.name.replace(bindingRegExp, '');
	          if (!(binder = this.binders[type])) {
	            _ref2 = this.binders;
	            for (identifier in _ref2) {
	              value = _ref2[identifier];
	              if (identifier !== '*' && identifier.indexOf('*') !== -1) {
	                regexp = new RegExp("^" + (identifier.replace(/\*/g, '.+')) + "$");
	                if (regexp.test(type)) {
	                  binder = value;
	                }
	              }
	            }
	          }
	          binder || (binder = this.binders['*']);
	          if (binder.block) {
	            block = true;
	            attributes = [attribute];
	          }
	        }
	      }
	      _ref3 = attributes || node.attributes;
	      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
	        attribute = _ref3[_j];
	        if (bindingRegExp.test(attribute.name)) {
	          type = attribute.name.replace(bindingRegExp, '');
	          this.buildBinding('Binding', node, type, attribute.value);
	        }
	      }
	      if (!block) {
	        type = node.nodeName.toLowerCase();
	        if (this.components[type] && !node._bound) {
	          this.bindings.push(new Rivets.ComponentBinding(this, node, type));
	          block = true;
	        }
	      }
	      return block;
	    };
	
	    View.prototype.select = function(fn) {
	      var binding, _i, _len, _ref1, _results;
	      _ref1 = this.bindings;
	      _results = [];
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        binding = _ref1[_i];
	        if (fn(binding)) {
	          _results.push(binding);
	        }
	      }
	      return _results;
	    };
	
	    View.prototype.bind = function() {
	      var binding, _i, _len, _ref1;
	      _ref1 = this.bindings;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        binding = _ref1[_i];
	        binding.bind();
	      }
	    };
	
	    View.prototype.unbind = function() {
	      var binding, _i, _len, _ref1;
	      _ref1 = this.bindings;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        binding = _ref1[_i];
	        binding.unbind();
	      }
	    };
	
	    View.prototype.sync = function() {
	      var binding, _i, _len, _ref1;
	      _ref1 = this.bindings;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        binding = _ref1[_i];
	        if (typeof binding.sync === "function") {
	          binding.sync();
	        }
	      }
	    };
	
	    View.prototype.publish = function() {
	      var binding, _i, _len, _ref1;
	      _ref1 = this.select(function(b) {
	        var _ref1;
	        return (_ref1 = b.binder) != null ? _ref1.publishes : void 0;
	      });
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        binding = _ref1[_i];
	        binding.publish();
	      }
	    };
	
	    View.prototype.update = function(models) {
	      var binding, key, model, _i, _len, _ref1;
	      if (models == null) {
	        models = {};
	      }
	      for (key in models) {
	        model = models[key];
	        this.models[key] = model;
	      }
	      _ref1 = this.bindings;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        binding = _ref1[_i];
	        if (typeof binding.update === "function") {
	          binding.update(models);
	        }
	      }
	    };
	
	    return View;
	
	  })();
	
	  Rivets.Binding = (function() {
	    function Binding(view, el, type, keypath, options) {
	      this.view = view;
	      this.el = el;
	      this.type = type;
	      this.keypath = keypath;
	      this.options = options != null ? options : {};
	      this.getValue = __bind(this.getValue, this);
	      this.update = __bind(this.update, this);
	      this.unbind = __bind(this.unbind, this);
	      this.bind = __bind(this.bind, this);
	      this.publish = __bind(this.publish, this);
	      this.sync = __bind(this.sync, this);
	      this.set = __bind(this.set, this);
	      this.eventHandler = __bind(this.eventHandler, this);
	      this.formattedValue = __bind(this.formattedValue, this);
	      this.parseFormatterArguments = __bind(this.parseFormatterArguments, this);
	      this.parseTarget = __bind(this.parseTarget, this);
	      this.observe = __bind(this.observe, this);
	      this.setBinder = __bind(this.setBinder, this);
	      this.formatters = this.options.formatters || [];
	      this.dependencies = [];
	      this.formatterObservers = {};
	      this.model = void 0;
	      this.setBinder();
	    }
	
	    Binding.prototype.setBinder = function() {
	      var identifier, regexp, value, _ref1;
	      if (!(this.binder = this.view.binders[this.type])) {
	        _ref1 = this.view.binders;
	        for (identifier in _ref1) {
	          value = _ref1[identifier];
	          if (identifier !== '*' && identifier.indexOf('*') !== -1) {
	            regexp = new RegExp("^" + (identifier.replace(/\*/g, '.+')) + "$");
	            if (regexp.test(this.type)) {
	              this.binder = value;
	              this.args = new RegExp("^" + (identifier.replace(/\*/g, '(.+)')) + "$").exec(this.type);
	              this.args.shift();
	            }
	          }
	        }
	      }
	      this.binder || (this.binder = this.view.binders['*']);
	      if (this.binder instanceof Function) {
	        return this.binder = {
	          routine: this.binder
	        };
	      }
	    };
	
	    Binding.prototype.observe = function(obj, keypath, callback) {
	      return Rivets.sightglass(obj, keypath, callback, {
	        root: this.view.rootInterface,
	        adapters: this.view.adapters
	      });
	    };
	
	    Binding.prototype.parseTarget = function() {
	      var token;
	      token = Rivets.TypeParser.parse(this.keypath);
	      if (token.type === Rivets.TypeParser.types.primitive) {
	        return this.value = token.value;
	      } else {
	        this.observer = this.observe(this.view.models, this.keypath, this.sync);
	        return this.model = this.observer.target;
	      }
	    };
	
	    Binding.prototype.parseFormatterArguments = function(args, formatterIndex) {
	      var ai, arg, observer, processedArgs, _base, _i, _len;
	      args = (function() {
	        var _i, _len, _results;
	        _results = [];
	        for (_i = 0, _len = args.length; _i < _len; _i++) {
	          arg = args[_i];
	          _results.push(Rivets.TypeParser.parse(arg));
	        }
	        return _results;
	      })();
	      processedArgs = [];
	      for (ai = _i = 0, _len = args.length; _i < _len; ai = ++_i) {
	        arg = args[ai];
	        processedArgs.push(arg.type === Rivets.TypeParser.types.primitive ? arg.value : ((_base = this.formatterObservers)[formatterIndex] || (_base[formatterIndex] = {}), !(observer = this.formatterObservers[formatterIndex][ai]) ? (observer = this.observe(this.view.models, arg.value, this.sync), this.formatterObservers[formatterIndex][ai] = observer) : void 0, observer.value()));
	      }
	      return processedArgs;
	    };
	
	    Binding.prototype.formattedValue = function(value) {
	      var args, fi, formatter, id, processedArgs, _i, _len, _ref1, _ref2;
	      _ref1 = this.formatters;
	      for (fi = _i = 0, _len = _ref1.length; _i < _len; fi = ++_i) {
	        formatter = _ref1[fi];
	        args = formatter.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g);
	        id = args.shift();
	        formatter = this.view.formatters[id];
	        processedArgs = this.parseFormatterArguments(args, fi);
	        if ((formatter != null ? formatter.read : void 0) instanceof Function) {
	          value = (_ref2 = formatter.read).call.apply(_ref2, [this.model, value].concat(__slice.call(processedArgs)));
	        } else if (formatter instanceof Function) {
	          value = formatter.call.apply(formatter, [this.model, value].concat(__slice.call(processedArgs)));
	        }
	      }
	      return value;
	    };
	
	    Binding.prototype.eventHandler = function(fn) {
	      var binding, handler;
	      handler = (binding = this).view.handler;
	      return function(ev) {
	        return handler.call(fn, this, ev, binding);
	      };
	    };
	
	    Binding.prototype.set = function(value) {
	      var _ref1;
	      value = value instanceof Function && !this.binder["function"] && Rivets["public"].executeFunctions ? this.formattedValue(value.call(this.model)) : this.formattedValue(value);
	      return (_ref1 = this.binder.routine) != null ? _ref1.call(this, this.el, value) : void 0;
	    };
	
	    Binding.prototype.sync = function() {
	      var dependency, observer;
	      return this.set((function() {
	        var _i, _j, _len, _len1, _ref1, _ref2, _ref3;
	        if (this.observer) {
	          if (this.model !== this.observer.target) {
	            _ref1 = this.dependencies;
	            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	              observer = _ref1[_i];
	              observer.unobserve();
	            }
	            this.dependencies = [];
	            if (((this.model = this.observer.target) != null) && ((_ref2 = this.options.dependencies) != null ? _ref2.length : void 0)) {
	              _ref3 = this.options.dependencies;
	              for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
	                dependency = _ref3[_j];
	                observer = this.observe(this.model, dependency, this.sync);
	                this.dependencies.push(observer);
	              }
	            }
	          }
	          return this.observer.value();
	        } else {
	          return this.value;
	        }
	      }).call(this));
	    };
	
	    Binding.prototype.publish = function() {
	      var args, fi, fiReversed, formatter, id, lastformatterIndex, processedArgs, value, _i, _len, _ref1, _ref2, _ref3;
	      if (this.observer) {
	        value = this.getValue(this.el);
	        lastformatterIndex = this.formatters.length - 1;
	        _ref1 = this.formatters.slice(0).reverse();
	        for (fiReversed = _i = 0, _len = _ref1.length; _i < _len; fiReversed = ++_i) {
	          formatter = _ref1[fiReversed];
	          fi = lastformatterIndex - fiReversed;
	          args = formatter.split(/\s+/);
	          id = args.shift();
	          processedArgs = this.parseFormatterArguments(args, fi);
	          if ((_ref2 = this.view.formatters[id]) != null ? _ref2.publish : void 0) {
	            value = (_ref3 = this.view.formatters[id]).publish.apply(_ref3, [value].concat(__slice.call(processedArgs)));
	          }
	        }
	        return this.observer.setValue(value);
	      }
	    };
	
	    Binding.prototype.bind = function() {
	      var dependency, observer, _i, _len, _ref1, _ref2, _ref3;
	      this.parseTarget();
	      if ((_ref1 = this.binder.bind) != null) {
	        _ref1.call(this, this.el);
	      }
	      if ((this.model != null) && ((_ref2 = this.options.dependencies) != null ? _ref2.length : void 0)) {
	        _ref3 = this.options.dependencies;
	        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
	          dependency = _ref3[_i];
	          observer = this.observe(this.model, dependency, this.sync);
	          this.dependencies.push(observer);
	        }
	      }
	      if (this.view.preloadData) {
	        return this.sync();
	      }
	    };
	
	    Binding.prototype.unbind = function() {
	      var ai, args, fi, observer, _i, _len, _ref1, _ref2, _ref3, _ref4;
	      if ((_ref1 = this.binder.unbind) != null) {
	        _ref1.call(this, this.el);
	      }
	      if ((_ref2 = this.observer) != null) {
	        _ref2.unobserve();
	      }
	      _ref3 = this.dependencies;
	      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
	        observer = _ref3[_i];
	        observer.unobserve();
	      }
	      this.dependencies = [];
	      _ref4 = this.formatterObservers;
	      for (fi in _ref4) {
	        args = _ref4[fi];
	        for (ai in args) {
	          observer = args[ai];
	          observer.unobserve();
	        }
	      }
	      return this.formatterObservers = {};
	    };
	
	    Binding.prototype.update = function(models) {
	      var _ref1, _ref2;
	      if (models == null) {
	        models = {};
	      }
	      this.model = (_ref1 = this.observer) != null ? _ref1.target : void 0;
	      return (_ref2 = this.binder.update) != null ? _ref2.call(this, models) : void 0;
	    };
	
	    Binding.prototype.getValue = function(el) {
	      if (this.binder && (this.binder.getValue != null)) {
	        return this.binder.getValue.call(this, el);
	      } else {
	        return Rivets.Util.getInputValue(el);
	      }
	    };
	
	    return Binding;
	
	  })();
	
	  Rivets.ComponentBinding = (function(_super) {
	    __extends(ComponentBinding, _super);
	
	    function ComponentBinding(view, el, type) {
	      var attribute, bindingRegExp, propertyName, token, _i, _len, _ref1, _ref2;
	      this.view = view;
	      this.el = el;
	      this.type = type;
	      this.unbind = __bind(this.unbind, this);
	      this.bind = __bind(this.bind, this);
	      this.locals = __bind(this.locals, this);
	      this.component = this.view.components[this.type];
	      this["static"] = {};
	      this.observers = {};
	      this.upstreamObservers = {};
	      bindingRegExp = view.bindingRegExp();
	      _ref1 = this.el.attributes || [];
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        attribute = _ref1[_i];
	        if (!bindingRegExp.test(attribute.name)) {
	          propertyName = this.camelCase(attribute.name);
	          token = Rivets.TypeParser.parse(attribute.value);
	          if (__indexOf.call((_ref2 = this.component["static"]) != null ? _ref2 : [], propertyName) >= 0) {
	            this["static"][propertyName] = attribute.value;
	          } else if (token.type === Rivets.TypeParser.types.primitive) {
	            this["static"][propertyName] = token.value;
	          } else {
	            this.observers[propertyName] = attribute.value;
	          }
	        }
	      }
	    }
	
	    ComponentBinding.prototype.sync = function() {};
	
	    ComponentBinding.prototype.update = function() {};
	
	    ComponentBinding.prototype.publish = function() {};
	
	    ComponentBinding.prototype.locals = function() {
	      var key, observer, result, value, _ref1, _ref2;
	      result = {};
	      _ref1 = this["static"];
	      for (key in _ref1) {
	        value = _ref1[key];
	        result[key] = value;
	      }
	      _ref2 = this.observers;
	      for (key in _ref2) {
	        observer = _ref2[key];
	        result[key] = observer.value();
	      }
	      return result;
	    };
	
	    ComponentBinding.prototype.camelCase = function(string) {
	      return string.replace(/-([a-z])/g, function(grouped) {
	        return grouped[1].toUpperCase();
	      });
	    };
	
	    ComponentBinding.prototype.bind = function() {
	      var k, key, keypath, observer, option, options, scope, v, _base, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
	      if (!this.bound) {
	        _ref1 = this.observers;
	        for (key in _ref1) {
	          keypath = _ref1[key];
	          this.observers[key] = this.observe(this.view.models, keypath, ((function(_this) {
	            return function(key) {
	              return function() {
	                return _this.componentView.models[key] = _this.observers[key].value();
	              };
	            };
	          })(this)).call(this, key));
	        }
	        this.bound = true;
	      }
	      if (this.componentView != null) {
	        this.componentView.bind();
	      } else {
	        this.el.innerHTML = this.component.template.call(this);
	        scope = this.component.initialize.call(this, this.el, this.locals());
	        this.el._bound = true;
	        options = {};
	        _ref2 = Rivets.extensions;
	        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	          option = _ref2[_i];
	          options[option] = {};
	          if (this.component[option]) {
	            _ref3 = this.component[option];
	            for (k in _ref3) {
	              v = _ref3[k];
	              options[option][k] = v;
	            }
	          }
	          _ref4 = this.view[option];
	          for (k in _ref4) {
	            v = _ref4[k];
	            if ((_base = options[option])[k] == null) {
	              _base[k] = v;
	            }
	          }
	        }
	        _ref5 = Rivets.options;
	        for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
	          option = _ref5[_j];
	          options[option] = (_ref6 = this.component[option]) != null ? _ref6 : this.view[option];
	        }
	        this.componentView = new Rivets.View(Array.prototype.slice.call(this.el.childNodes), scope, options);
	        this.componentView.bind();
	        _ref7 = this.observers;
	        for (key in _ref7) {
	          observer = _ref7[key];
	          this.upstreamObservers[key] = this.observe(this.componentView.models, key, ((function(_this) {
	            return function(key, observer) {
	              return function() {
	                return observer.setValue(_this.componentView.models[key]);
	              };
	            };
	          })(this)).call(this, key, observer));
	        }
	      }
	    };
	
	    ComponentBinding.prototype.unbind = function() {
	      var key, observer, _ref1, _ref2, _ref3;
	      _ref1 = this.upstreamObservers;
	      for (key in _ref1) {
	        observer = _ref1[key];
	        observer.unobserve();
	      }
	      _ref2 = this.observers;
	      for (key in _ref2) {
	        observer = _ref2[key];
	        observer.unobserve();
	      }
	      return (_ref3 = this.componentView) != null ? _ref3.unbind.call(this) : void 0;
	    };
	
	    return ComponentBinding;
	
	  })(Rivets.Binding);
	
	  Rivets.TextBinding = (function(_super) {
	    __extends(TextBinding, _super);
	
	    function TextBinding(view, el, type, keypath, options) {
	      this.view = view;
	      this.el = el;
	      this.type = type;
	      this.keypath = keypath;
	      this.options = options != null ? options : {};
	      this.sync = __bind(this.sync, this);
	      this.formatters = this.options.formatters || [];
	      this.dependencies = [];
	      this.formatterObservers = {};
	    }
	
	    TextBinding.prototype.binder = {
	      routine: function(node, value) {
	        return node.data = value != null ? value : '';
	      }
	    };
	
	    TextBinding.prototype.sync = function() {
	      return TextBinding.__super__.sync.apply(this, arguments);
	    };
	
	    return TextBinding;
	
	  })(Rivets.Binding);
	
	  Rivets["public"].binders.text = function(el, value) {
	    if (el.textContent != null) {
	      return el.textContent = value != null ? value : '';
	    } else {
	      return el.innerText = value != null ? value : '';
	    }
	  };
	
	  Rivets["public"].binders.html = function(el, value) {
	    return el.innerHTML = value != null ? value : '';
	  };
	
	  Rivets["public"].binders.show = function(el, value) {
	    return el.style.display = value ? '' : 'none';
	  };
	
	  Rivets["public"].binders.hide = function(el, value) {
	    return el.style.display = value ? 'none' : '';
	  };
	
	  Rivets["public"].binders.enabled = function(el, value) {
	    return el.disabled = !value;
	  };
	
	  Rivets["public"].binders.disabled = function(el, value) {
	    return el.disabled = !!value;
	  };
	
	  Rivets["public"].binders.checked = {
	    publishes: true,
	    priority: 2000,
	    bind: function(el) {
	      return Rivets.Util.bindEvent(el, 'change', this.publish);
	    },
	    unbind: function(el) {
	      return Rivets.Util.unbindEvent(el, 'change', this.publish);
	    },
	    routine: function(el, value) {
	      var _ref1;
	      if (el.type === 'radio') {
	        return el.checked = ((_ref1 = el.value) != null ? _ref1.toString() : void 0) === (value != null ? value.toString() : void 0);
	      } else {
	        return el.checked = !!value;
	      }
	    }
	  };
	
	  Rivets["public"].binders.unchecked = {
	    publishes: true,
	    priority: 2000,
	    bind: function(el) {
	      return Rivets.Util.bindEvent(el, 'change', this.publish);
	    },
	    unbind: function(el) {
	      return Rivets.Util.unbindEvent(el, 'change', this.publish);
	    },
	    routine: function(el, value) {
	      var _ref1;
	      if (el.type === 'radio') {
	        return el.checked = ((_ref1 = el.value) != null ? _ref1.toString() : void 0) !== (value != null ? value.toString() : void 0);
	      } else {
	        return el.checked = !value;
	      }
	    }
	  };
	
	  Rivets["public"].binders.value = {
	    publishes: true,
	    priority: 3000,
	    bind: function(el) {
	      if (!(el.tagName === 'INPUT' && el.type === 'radio')) {
	        this.event = el.tagName === 'SELECT' ? 'change' : 'input';
	        return Rivets.Util.bindEvent(el, this.event, this.publish);
	      }
	    },
	    unbind: function(el) {
	      if (!(el.tagName === 'INPUT' && el.type === 'radio')) {
	        return Rivets.Util.unbindEvent(el, this.event, this.publish);
	      }
	    },
	    routine: function(el, value) {
	      var o, _i, _len, _ref1, _ref2, _ref3, _results;
	      if (el.tagName === 'INPUT' && el.type === 'radio') {
	        return el.setAttribute('value', value);
	      } else if (window.jQuery != null) {
	        el = jQuery(el);
	        if ((value != null ? value.toString() : void 0) !== ((_ref1 = el.val()) != null ? _ref1.toString() : void 0)) {
	          return el.val(value != null ? value : '');
	        }
	      } else {
	        if (el.type === 'select-multiple') {
	          if (value != null) {
	            _results = [];
	            for (_i = 0, _len = el.length; _i < _len; _i++) {
	              o = el[_i];
	              _results.push(o.selected = (_ref2 = o.value, __indexOf.call(value, _ref2) >= 0));
	            }
	            return _results;
	          }
	        } else if ((value != null ? value.toString() : void 0) !== ((_ref3 = el.value) != null ? _ref3.toString() : void 0)) {
	          return el.value = value != null ? value : '';
	        }
	      }
	    }
	  };
	
	  Rivets["public"].binders["if"] = {
	    block: true,
	    priority: 4000,
	    bind: function(el) {
	      var attr, declaration;
	      if (this.marker == null) {
	        attr = [this.view.prefix, this.type].join('-').replace('--', '-');
	        declaration = el.getAttribute(attr);
	        this.marker = document.createComment(" rivets: " + this.type + " " + declaration + " ");
	        this.bound = false;
	        el.removeAttribute(attr);
	        el.parentNode.insertBefore(this.marker, el);
	        return el.parentNode.removeChild(el);
	      }
	    },
	    unbind: function() {
	      if (this.nested) {
	        this.nested.unbind();
	        return this.bound = false;
	      }
	    },
	    routine: function(el, value) {
	      var key, model, models, _ref1;
	      if (!!value === !this.bound) {
	        if (value) {
	          models = {};
	          _ref1 = this.view.models;
	          for (key in _ref1) {
	            model = _ref1[key];
	            models[key] = model;
	          }
	          (this.nested || (this.nested = new Rivets.View(el, models, this.view.options()))).bind();
	          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
	          return this.bound = true;
	        } else {
	          el.parentNode.removeChild(el);
	          this.nested.unbind();
	          return this.bound = false;
	        }
	      }
	    },
	    update: function(models) {
	      var _ref1;
	      return (_ref1 = this.nested) != null ? _ref1.update(models) : void 0;
	    }
	  };
	
	  Rivets["public"].binders.unless = {
	    block: true,
	    priority: 4000,
	    bind: function(el) {
	      return Rivets["public"].binders["if"].bind.call(this, el);
	    },
	    unbind: function() {
	      return Rivets["public"].binders["if"].unbind.call(this);
	    },
	    routine: function(el, value) {
	      return Rivets["public"].binders["if"].routine.call(this, el, !value);
	    },
	    update: function(models) {
	      return Rivets["public"].binders["if"].update.call(this, models);
	    }
	  };
	
	  Rivets["public"].binders['on-*'] = {
	    "function": true,
	    priority: 1000,
	    unbind: function(el) {
	      if (this.handler) {
	        return Rivets.Util.unbindEvent(el, this.args[0], this.handler);
	      }
	    },
	    routine: function(el, value) {
	      if (this.handler) {
	        Rivets.Util.unbindEvent(el, this.args[0], this.handler);
	      }
	      return Rivets.Util.bindEvent(el, this.args[0], this.handler = this.eventHandler(value));
	    }
	  };
	
	  Rivets["public"].binders['each-*'] = {
	    block: true,
	    priority: 4000,
	    bind: function(el) {
	      var attr, view, _i, _len, _ref1;
	      if (this.marker == null) {
	        attr = [this.view.prefix, this.type].join('-').replace('--', '-');
	        this.marker = document.createComment(" rivets: " + this.type + " ");
	        this.iterated = [];
	        el.removeAttribute(attr);
	        el.parentNode.insertBefore(this.marker, el);
	        el.parentNode.removeChild(el);
	      } else {
	        _ref1 = this.iterated;
	        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	          view = _ref1[_i];
	          view.bind();
	        }
	      }
	    },
	    unbind: function(el) {
	      var view, _i, _len, _ref1;
	      if (this.iterated != null) {
	        _ref1 = this.iterated;
	        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	          view = _ref1[_i];
	          view.unbind();
	        }
	      }
	    },
	    routine: function(el, collection) {
	      var binding, data, i, index, key, model, modelName, options, previous, template, view, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3;
	      modelName = this.args[0];
	      collection = collection || [];
	      if (this.iterated.length > collection.length) {
	        _ref1 = Array(this.iterated.length - collection.length);
	        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	          i = _ref1[_i];
	          view = this.iterated.pop();
	          view.unbind();
	          this.marker.parentNode.removeChild(view.els[0]);
	        }
	      }
	      for (index = _j = 0, _len1 = collection.length; _j < _len1; index = ++_j) {
	        model = collection[index];
	        data = {
	          index: index
	        };
	        data[Rivets["public"].iterationAlias(modelName)] = index;
	        data[modelName] = model;
	        if (this.iterated[index] == null) {
	          _ref2 = this.view.models;
	          for (key in _ref2) {
	            model = _ref2[key];
	            if (data[key] == null) {
	              data[key] = model;
	            }
	          }
	          previous = this.iterated.length ? this.iterated[this.iterated.length - 1].els[0] : this.marker;
	          options = this.view.options();
	          options.preloadData = true;
	          template = el.cloneNode(true);
	          view = new Rivets.View(template, data, options);
	          view.bind();
	          this.iterated.push(view);
	          this.marker.parentNode.insertBefore(template, previous.nextSibling);
	        } else if (this.iterated[index].models[modelName] !== model) {
	          this.iterated[index].update(data);
	        }
	      }
	      if (el.nodeName === 'OPTION') {
	        _ref3 = this.view.bindings;
	        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
	          binding = _ref3[_k];
	          if (binding.el === this.marker.parentNode && binding.type === 'value') {
	            binding.sync();
	          }
	        }
	      }
	    },
	    update: function(models) {
	      var data, key, model, view, _i, _len, _ref1;
	      data = {};
	      for (key in models) {
	        model = models[key];
	        if (key !== this.args[0]) {
	          data[key] = model;
	        }
	      }
	      _ref1 = this.iterated;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        view = _ref1[_i];
	        view.update(data);
	      }
	    }
	  };
	
	  Rivets["public"].binders['class-*'] = function(el, value) {
	    var elClass;
	    elClass = " " + el.className + " ";
	    if (!value === (elClass.indexOf(" " + this.args[0] + " ") !== -1)) {
	      return el.className = value ? "" + el.className + " " + this.args[0] : elClass.replace(" " + this.args[0] + " ", ' ').trim();
	    }
	  };
	
	  Rivets["public"].binders['*'] = function(el, value) {
	    if (value != null) {
	      return el.setAttribute(this.type, value);
	    } else {
	      return el.removeAttribute(this.type);
	    }
	  };
	
	  Rivets["public"].formatters['call'] = function() {
	    var args, value;
	    value = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    return value.call.apply(value, [this].concat(__slice.call(args)));
	  };
	
	  Rivets["public"].adapters['.'] = {
	    id: '_rv',
	    counter: 0,
	    weakmap: {},
	    weakReference: function(obj) {
	      var id, _base, _name;
	      if (!obj.hasOwnProperty(this.id)) {
	        id = this.counter++;
	        Object.defineProperty(obj, this.id, {
	          value: id
	        });
	      }
	      return (_base = this.weakmap)[_name = obj[this.id]] || (_base[_name] = {
	        callbacks: {}
	      });
	    },
	    cleanupWeakReference: function(ref, id) {
	      if (!Object.keys(ref.callbacks).length) {
	        if (!(ref.pointers && Object.keys(ref.pointers).length)) {
	          return delete this.weakmap[id];
	        }
	      }
	    },
	    stubFunction: function(obj, fn) {
	      var map, original, weakmap;
	      original = obj[fn];
	      map = this.weakReference(obj);
	      weakmap = this.weakmap;
	      return obj[fn] = function() {
	        var callback, k, r, response, _i, _len, _ref1, _ref2, _ref3, _ref4;
	        response = original.apply(obj, arguments);
	        _ref1 = map.pointers;
	        for (r in _ref1) {
	          k = _ref1[r];
	          _ref4 = (_ref2 = (_ref3 = weakmap[r]) != null ? _ref3.callbacks[k] : void 0) != null ? _ref2 : [];
	          for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
	            callback = _ref4[_i];
	            callback();
	          }
	        }
	        return response;
	      };
	    },
	    observeMutations: function(obj, ref, keypath) {
	      var fn, functions, map, _base, _i, _len;
	      if (Array.isArray(obj)) {
	        map = this.weakReference(obj);
	        if (map.pointers == null) {
	          map.pointers = {};
	          functions = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
	          for (_i = 0, _len = functions.length; _i < _len; _i++) {
	            fn = functions[_i];
	            this.stubFunction(obj, fn);
	          }
	        }
	        if ((_base = map.pointers)[ref] == null) {
	          _base[ref] = [];
	        }
	        if (__indexOf.call(map.pointers[ref], keypath) < 0) {
	          return map.pointers[ref].push(keypath);
	        }
	      }
	    },
	    unobserveMutations: function(obj, ref, keypath) {
	      var idx, map, pointers;
	      if (Array.isArray(obj) && (obj[this.id] != null)) {
	        if (map = this.weakmap[obj[this.id]]) {
	          if (pointers = map.pointers[ref]) {
	            if ((idx = pointers.indexOf(keypath)) >= 0) {
	              pointers.splice(idx, 1);
	            }
	            if (!pointers.length) {
	              delete map.pointers[ref];
	            }
	            return this.cleanupWeakReference(map, obj[this.id]);
	          }
	        }
	      }
	    },
	    observe: function(obj, keypath, callback) {
	      var callbacks, desc, value;
	      callbacks = this.weakReference(obj).callbacks;
	      if (callbacks[keypath] == null) {
	        callbacks[keypath] = [];
	        desc = Object.getOwnPropertyDescriptor(obj, keypath);
	        if (!((desc != null ? desc.get : void 0) || (desc != null ? desc.set : void 0))) {
	          value = obj[keypath];
	          Object.defineProperty(obj, keypath, {
	            enumerable: true,
	            get: function() {
	              return value;
	            },
	            set: (function(_this) {
	              return function(newValue) {
	                var cb, map, _i, _len, _ref1;
	                if (newValue !== value) {
	                  _this.unobserveMutations(value, obj[_this.id], keypath);
	                  value = newValue;
	                  if (map = _this.weakmap[obj[_this.id]]) {
	                    callbacks = map.callbacks;
	                    if (callbacks[keypath]) {
	                      _ref1 = callbacks[keypath].slice();
	                      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	                        cb = _ref1[_i];
	                        if (__indexOf.call(callbacks[keypath], cb) >= 0) {
	                          cb();
	                        }
	                      }
	                    }
	                    return _this.observeMutations(newValue, obj[_this.id], keypath);
	                  }
	                }
	              };
	            })(this)
	          });
	        }
	      }
	      if (__indexOf.call(callbacks[keypath], callback) < 0) {
	        callbacks[keypath].push(callback);
	      }
	      return this.observeMutations(obj[keypath], obj[this.id], keypath);
	    },
	    unobserve: function(obj, keypath, callback) {
	      var callbacks, idx, map;
	      if (map = this.weakmap[obj[this.id]]) {
	        if (callbacks = map.callbacks[keypath]) {
	          if ((idx = callbacks.indexOf(callback)) >= 0) {
	            callbacks.splice(idx, 1);
	            if (!callbacks.length) {
	              delete map.callbacks[keypath];
	              this.unobserveMutations(obj[keypath], obj[this.id], keypath);
	            }
	          }
	          return this.cleanupWeakReference(map, obj[this.id]);
	        }
	      }
	    },
	    get: function(obj, keypath) {
	      return obj[keypath];
	    },
	    set: function(obj, keypath, value) {
	      return obj[keypath] = value;
	    }
	  };
	
	  Rivets.factory = function(sightglass) {
	    Rivets.sightglass = sightglass;
	    Rivets["public"]._ = Rivets;
	    return Rivets["public"];
	  };
	
	  if (typeof (typeof module !== "undefined" && module !== null ? module.exports : void 0) === 'object') {
	    module.exports = Rivets.factory(__webpack_require__(7));
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(sightglass) {
	      return this.rivets = Rivets.factory(sightglass);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    this.rivets = Rivets.factory(sightglass);
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
	  // Public sightglass interface.
	  function sightglass(obj, keypath, callback, options) {
	    return new Observer(obj, keypath, callback, options)
	  }
	
	  // Batteries not included.
	  sightglass.adapters = {}
	
	  // Constructs a new keypath observer and kicks things off.
	  function Observer(obj, keypath, callback, options) {
	    this.options = options || {}
	    this.options.adapters = this.options.adapters || {}
	    this.obj = obj
	    this.keypath = keypath
	    this.callback = callback
	    this.objectPath = []
	    this.update = this.update.bind(this)
	    this.parse()
	
	    if (isObject(this.target = this.realize())) {
	      this.set(true, this.key, this.target, this.callback)
	    }
	  }
	
	  // Tokenizes the provided keypath string into interface + path tokens for the
	  // observer to work with.
	  Observer.tokenize = function(keypath, interfaces, root) {
	    var tokens = []
	    var current = {i: root, path: ''}
	    var index, chr
	
	    for (index = 0; index < keypath.length; index++) {
	      chr = keypath.charAt(index)
	
	      if (!!~interfaces.indexOf(chr)) {
	        tokens.push(current)
	        current = {i: chr, path: ''}
	      } else {
	        current.path += chr
	      }
	    }
	
	    tokens.push(current)
	    return tokens
	  }
	
	  // Parses the keypath using the interfaces defined on the view. Sets variables
	  // for the tokenized keypath as well as the end key.
	  Observer.prototype.parse = function() {
	    var interfaces = this.interfaces()
	    var root, path
	
	    if (!interfaces.length) {
	      error('Must define at least one adapter interface.')
	    }
	
	    if (!!~interfaces.indexOf(this.keypath[0])) {
	      root = this.keypath[0]
	      path = this.keypath.substr(1)
	    } else {
	      if (typeof (root = this.options.root || sightglass.root) === 'undefined') {
	        error('Must define a default root adapter.')
	      }
	
	      path = this.keypath
	    }
	
	    this.tokens = Observer.tokenize(path, interfaces, root)
	    this.key = this.tokens.pop()
	  }
	
	  // Realizes the full keypath, attaching observers for every key and correcting
	  // old observers to any changed objects in the keypath.
	  Observer.prototype.realize = function() {
	    var current = this.obj
	    var unreached = false
	    var prev
	
	    this.tokens.forEach(function(token, index) {
	      if (isObject(current)) {
	        if (typeof this.objectPath[index] !== 'undefined') {
	          if (current !== (prev = this.objectPath[index])) {
	            this.set(false, token, prev, this.update)
	            this.set(true, token, current, this.update)
	            this.objectPath[index] = current
	          }
	        } else {
	          this.set(true, token, current, this.update)
	          this.objectPath[index] = current
	        }
	
	        current = this.get(token, current)
	      } else {
	        if (unreached === false) {
	          unreached = index
	        }
	
	        if (prev = this.objectPath[index]) {
	          this.set(false, token, prev, this.update)
	        }
	      }
	    }, this)
	
	    if (unreached !== false) {
	      this.objectPath.splice(unreached)
	    }
	
	    return current
	  }
	
	  // Updates the keypath. This is called when any intermediary key is changed.
	  Observer.prototype.update = function() {
	    var next, oldValue
	
	    if ((next = this.realize()) !== this.target) {
	      if (isObject(this.target)) {
	        this.set(false, this.key, this.target, this.callback)
	      }
	
	      if (isObject(next)) {
	        this.set(true, this.key, next, this.callback)
	      }
	
	      oldValue = this.value()
	      this.target = next
	
	      // Always call callback if value is a function. If not a function, call callback only if value changed
	      if (this.value() instanceof Function || this.value() !== oldValue) this.callback()
	    }
	  }
	
	  // Reads the current end value of the observed keypath. Returns undefined if
	  // the full keypath is unreachable.
	  Observer.prototype.value = function() {
	    if (isObject(this.target)) {
	      return this.get(this.key, this.target)
	    }
	  }
	
	  // Sets the current end value of the observed keypath. Calling setValue when
	  // the full keypath is unreachable is a no-op.
	  Observer.prototype.setValue = function(value) {
	    if (isObject(this.target)) {
	      this.adapter(this.key).set(this.target, this.key.path, value)
	    }
	  }
	
	  // Gets the provided key on an object.
	  Observer.prototype.get = function(key, obj) {
	    return this.adapter(key).get(obj, key.path)
	  }
	
	  // Observes or unobserves a callback on the object using the provided key.
	  Observer.prototype.set = function(active, key, obj, callback) {
	    var action = active ? 'observe' : 'unobserve'
	    this.adapter(key)[action](obj, key.path, callback)
	  }
	
	  // Returns an array of all unique adapter interfaces available.
	  Observer.prototype.interfaces = function() {
	    var interfaces = Object.keys(this.options.adapters)
	
	    Object.keys(sightglass.adapters).forEach(function(i) {
	      if (!~interfaces.indexOf(i)) {
	        interfaces.push(i)
	      }
	    })
	
	    return interfaces
	  }
	
	  // Convenience function to grab the adapter for a specific key.
	  Observer.prototype.adapter = function(key) {
	    return this.options.adapters[key.i] ||
	      sightglass.adapters[key.i]
	  }
	
	  // Unobserves the entire keypath.
	  Observer.prototype.unobserve = function() {
	    var obj
	
	    this.tokens.forEach(function(token, index) {
	      if (obj = this.objectPath[index]) {
	        this.set(false, token, obj, this.update)
	      }
	    }, this)
	
	    if (isObject(this.target)) {
	      this.set(false, this.key, this.target, this.callback)
	    }
	  }
	
	  // Check if a value is an object than can be observed.
	  function isObject(obj) {
	    return typeof obj === 'object' && obj !== null
	  }
	
	  // Error thrower.
	  function error(message) {
	    throw new Error('[sightglass] ' + message)
	  }
	
	  // Export module for Node and the browser.
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = sightglass
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return this.sightglass = sightglass
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  } else {
	    this.sightglass = sightglass
	  }
	}).call(this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _Component = __webpack_require__(3);
	
	var _Component2 = _interopRequireDefault(_Component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Component used for creating number-based pagination
	 * @example
	 HTML:
	 <body>
	 <!-- note that we need an _ in _events, scope.events is the original array,
	 _events is the array just with the elements of this page-->
	 <div rv-each-event="_events">
	 <span>{event.name}</span>
	 </div>
	 ...
	 <!--Footer-->
	 <footer class="kw-footer">
	 <div id="pagination" class="kw-pagination l-flexbox l-pack-center l-align-center"></div>
	 </footer>
	 </body>
	
	 init() {
	   ...
	   this.scope.events = [...];
	   this.pagination = new CoreLibrary.PaginationComponent('#pagination', this.scope, 'events', 5);
	}
	 * @class PaginationComponent
	 */
	
	exports.default = _Component2.default.subclass({
	   htmlTemplate: '\n      <div class="kw-pagination l-flexbox l-pack-center l-align-center">\n         <span\n               rv-on-click="previousPage"\n               rv-class-disabled="firstPage"\n               class="kw-page-link kw-pagination-arrow">\n            <i class="icon-angle-left"></i>\n         </span>\n         <span\n               rv-each-page="pages"\n               rv-on-click="page.clickEvent"\n               rv-class-kw-active-page="page.selected"\n               class="kw-page-link l-pack-center l-align-center">\n            {page.text}\n         </span>\n         <span\n               rv-on-click="nextPage"\n               rv-class-disabled="lastPage"\n               class="kw-page-link kw-pagination-arrow">\n               <i class="icon-angle-right"></i>\n         </span>\n      </div>\n      ',
	
	   /**
	    * Constructor method.
	    * @param {string} htmlElement HTML element to place the controller (pagination buttons) in
	    * @param {object} mainComponentScope The scope object of the widget
	    * @param {string} scopeKey scope key - they attribute name in the scope object to paginate on
	    * @param {number} pageSize Number of elements per page
	    * @param {number} maxVisiblePages Maximum visible pages in the controller
	    * @memberof PaginationComponent
	    */
	   constructor: function constructor(htmlElement, mainComponentScope, scopeKey, pageSize, maxVisiblePages) {
	      var _this = this;
	
	      _Component2.default.apply(this, [{
	         rootElement: htmlElement
	      }]);
	      this.scopeKey = scopeKey;
	      this.pageSize = pageSize ? pageSize : 3;
	      this.maxVisiblePages = maxVisiblePages ? maxVisiblePages : 5;
	      this.scope.currentPage = 0;
	      this.scope.firstPage = true;
	      this.scope.lastPage = false;
	
	      /*
	       creates a new array with name _scopeKey
	       the component should use this array when it wants only the data
	       of the currentPage
	       */
	      mainComponentScope['_' + scopeKey] = [];
	      this.originalArray = mainComponentScope[scopeKey];
	      this.currentPageArray = mainComponentScope['_' + scopeKey];
	
	      // watching for changes in the original array
	      sightglass(mainComponentScope, scopeKey, function () {
	         _this.originalArray = mainComponentScope[scopeKey];
	         _this.setCurrentPage(0);
	         _this.clearArray();
	         _this.adaptArray();
	      });
	
	      this.scope.nextPage = this.nextPage.bind(this);
	      this.scope.previousPage = this.previousPage.bind(this);
	
	      this.adaptArray();
	   },
	
	
	   /**
	    * Empties the currentPageArray.
	    * @memberof PaginationComponent
	    * @private
	    */
	   clearArray: function clearArray() {
	      this.currentPageArray.splice(0, this.currentPageArray.length);
	   },
	
	
	   /**
	    * Get current page.
	    * @returns {number}
	    * @memberof PaginationComponent
	    */
	   getCurrentPage: function getCurrentPage() {
	      return this.scope.currentPage;
	   },
	
	
	   /**
	    * Sets currentPage variable.
	    * @param {number} pageNumber Set a certain page as current one
	    * @memberof PaginationComponent
	    */
	   setCurrentPage: function setCurrentPage(pageNumber) {
	      if (pageNumber === this.getCurrentPage()) {
	         return;
	      }
	      if (pageNumber < 0 || pageNumber >= this.getNumberOfPages()) {
	         throw new Error('Invalid page number');
	      }
	      this.scope.currentPage = pageNumber;
	      this.adaptArray();
	   },
	
	
	   /**
	    * Returns the number of pages.
	    * @returns {number}
	    * @memberof PaginationComponent
	    */
	   getNumberOfPages: function getNumberOfPages() {
	      return Math.ceil(this.originalArray.length / this.pageSize);
	   },
	
	
	   /**
	    * Method for displaying next page.
	    * @returns {Number}
	    * @memberof PaginationComponent
	    */
	   nextPage: function nextPage() {
	      if (this.getCurrentPage() < this.getNumberOfPages() - 1) {
	         this.setCurrentPage(this.getCurrentPage() + 1);
	      }
	      return this.getCurrentPage();
	   },
	
	
	   /**
	    * Method for displaying previous page.
	    * @returns {Number}
	    * @memberof PaginationComponent
	    */
	   previousPage: function previousPage() {
	      if (this.getCurrentPage() > 0) {
	         this.setCurrentPage(this.getCurrentPage() - 1);
	      }
	      return this.getCurrentPage();
	   },
	
	
	   /**
	    * Changes the _scopeKey array to match the current page elements.
	    * @memberof PaginationComponent
	    * @private
	    */
	   adaptArray: function adaptArray() {
	      this.clearArray();
	      var startItem = this.getCurrentPage() * this.pageSize;
	      var endItem = startItem + this.pageSize;
	      if (endItem >= this.originalArray.length) {
	         endItem = this.originalArray.length;
	      }
	      for (var i = startItem; i < endItem; ++i) {
	         this.currentPageArray.push(this.originalArray[i]);
	      }
	
	      this.scope.firstPage = this.getCurrentPage() === 0;
	      this.scope.lastPage = this.getCurrentPage() === this.getNumberOfPages() - 1;
	
	      this.render();
	   },
	
	
	   /**
	    * Renders the component.
	    * @memberof PaginationComponent
	    * @private
	    */
	   init: function init() {
	      this.render();
	   },
	
	
	   /**
	    * Updates the scope.pages value which is used to render the page numbers and arrows.
	    * @memberof PaginationComponent
	    * @private
	    */
	   render: function render() {
	      this.scope.pages = [];
	      var startPage = this.getCurrentPage() - 2;
	      if (this.getCurrentPage() + 2 >= this.getNumberOfPages()) {
	         var startPage = this.getNumberOfPages() - 5;
	      }
	      if (startPage < 0) {
	         startPage = 0;
	      }
	      var i = startPage;
	      var numberOfPagesVisible = 0;
	      while (i < this.getNumberOfPages() && numberOfPagesVisible < 5) {
	         this.scope.pages.push({
	            text: i + 1 + '',
	            number: i,
	            selected: i === this.getCurrentPage(),
	            clickEvent: this.setCurrentPage.bind(this, i) // calls setCurrentPage with i as a parameter
	         });
	         ++i;
	         ++numberOfPagesVisible;
	      }
	   }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	/**
	 * Module with methods to request data from the offering API
	 * @module offeringModule
	 * @memberof CoreLibrary
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
	      if (CoreLibrary.config.offering == null) {
	         console.warn('The offering has not been set, is the right widget api version loaded?');
	      } else {
	         var apiUrl = CoreLibrary.config.apiBaseUrl.replace('{apiVersion}', version != null ? version : CoreLibrary.config.version);
	         var requestUrl = apiUrl + CoreLibrary.config.offering + requestPath;
	         var overrideParams = params || {};
	         var requestParams = {
	            lang: overrideParams.locale || CoreLibrary.config.locale,
	            market: overrideParams.market || CoreLibrary.config.market,
	            client_id: overrideParams.client_id || CoreLibrary.config.client_id,
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
	
	         return CoreLibrary.getData(requestUrl);
	      }
	   }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	/**
	 * Module to access statistics data
	 * @module statisticsModule
	 * @memberOf CoreLibrary
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
	
	      console.debug(this.config.baseApiUrl + CoreLibrary.config.offering + '/' + type + '/' + filter + '.json');
	      return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/' + type + '/' + filter + '.json');
	   }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	/**
	 * Module with internationalization methods
	 * @module translationModule
	 * @memberOf CoreLibrary
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
	    * The locale json file resides in CoreLibrary/i18n folder; it is populated with locales during build process
	    * @param {String} locale Locale string, eg: sv_SE
	    * @returns {Promise}
	    * @private
	    */
	   fetchTranslations: function fetchTranslations(locale) {
	      if (locale == null) {
	         locale = 'en_GB';
	      }
	      var self = this;
	      var path = 'i18n/';
	      if (CoreLibrary.development === true) {
	         path = 'transpiled/i18n/';
	      }
	      return new Promise(function (resolve, reject) {
	         window.CoreLibrary.getData(path + locale + '.json').then(function (response) {
	            CoreLibrary.translationModule.i18nStrings = response;
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _translationModule = __webpack_require__(11);
	
	var _translationModule2 = _interopRequireDefault(_translationModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module with utility functions
	 * @module utilModule
	 * @memberOf CoreLibrary
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _stapes = __webpack_require__(4);
	
	var _stapes2 = _interopRequireDefault(_stapes);
	
	var _utilModule = __webpack_require__(12);
	
	var _utilModule2 = _interopRequireDefault(_utilModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Module with methods to manipulate the widget and interact with the sportsbook
	 * @module widgetModule
	 * @memberOf CoreLibrary
	 */
	
	var Module = _stapes2.default.subclass();
	
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
	    * CoreLibrary.widgetModule.events
	    *    .on('OUTCOME:ADDED:' + outcome.id,
	    *       ( data, event ) => {
	       *          ...
	       *       });
	    *
	    * @type {Object}
	    */
	   events: new Module(),
	
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
	            CoreLibrary.setArgs(response.data);
	            this.events.emit('WIDGET:ARGS', response.data);
	            break;
	         case this.api.PAGE_INFO:
	            // Received page info response
	            CoreLibrary.setPageInfo(response.data);
	            this.events.emit('PAGE:INFO', response.data);
	            break;
	         case this.api.CLIENT_ODDS_FORMAT:
	            // Received odds format response
	            CoreLibrary.setOddsFormat(response.data);
	            this.events.emit('ODDS:FORMAT', response.data);
	            break;
	         case this.api.CLIENT_CONFIG:
	            CoreLibrary.setConfig(response.data);
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
	      return this.api.createFilterUrl(destination, CoreLibrary.config.routeRoot);
	   },
	
	
	   /**
	    * Get page type
	    * @returns {String}
	    */
	   getPageType: function getPageType() {
	      if (!CoreLibrary.pageInfo.pageType) {
	         return '';
	      }
	      var pageType = CoreLibrary.pageInfo.pageType;
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
	      if (CoreLibrary.widgetTrackingName != null) {
	         data.name = CoreLibrary.widgetTrackingName;
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
	      if (CoreLibrary.widgetTrackingName != null) {
	         data.name = CoreLibrary.widgetTrackingName;
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
	
	      return new Promise(function (resolve, reject) {
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
	
	      return new Promise(function (resolve, reject) {
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
	         finalTarget = '#' + CoreLibrary.config.routeRoot + destination;
	      } else if (Array.isArray(destination)) {
	         finalTarget = this.api.createFilterUrl(destination, CoreLibrary.config.routeRoot);
	      }
	
	      if (CoreLibrary.widgetTrackingName != null) {
	         this.api.navigateClient(finalTarget, CoreLibrary.widgetTrackingName);
	      } else {
	         this.api.navigateClient(finalTarget);
	      }
	   }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=core.js.map