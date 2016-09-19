'use strict';

(function () {
   'use strict';
   // Set Sightglass root adapter.

   sightglass.adapters = rivets.adapters;
   sightglass.root = '.';

   /**
    * Rivets custom binders and formatters
    * @namespace rivets
    */
   rivets; // jshint ignore:line

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
   rivets.formatters.translate = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return CoreLibrary.translationModule.getTranslation.apply(CoreLibrary.translationModule, args);
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
   rivets.formatters['==='] = function (v1, v2) {
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
   rivets.formatters['=='] = function (v1, v2) {
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
   rivets.formatters['>='] = function (v1, v2) {
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
   rivets.formatters['>'] = function (v1, v2) {
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
   rivets.formatters['<='] = function (v1, v2) {
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
   rivets.formatters['<'] = function (v1, v2) {
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
   rivets.formatters['!='] = function (v1, v2) {
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
   rivets.formatters['!=='] = function (v1, v2) {
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
   rivets.formatters['and'] = function (v1, v2) {
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
   rivets.formatters['or'] = function (v1, v2) {
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
   rivets.formatters['not'] = function (v1) {
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
   rivets.formatters['-'] = function (v1, v2) {
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
   rivets.formatters['+'] = function (v1, v2) {
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
   rivets.formatters['*'] = function (v1, v2) {
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
   rivets.formatters['/'] = function (v1, v2) {
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
   rivets.formatters['?'] = function (v1, v2) {
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
   rivets.formatters['array_at'] = function (arr, index, key) {
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
   rivets.formatters['property_list'] = function (obj) {
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
   rivets.binders['style-*'] = function (el, value) {
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
   rivets.binders['cloak'] = {
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
   rivets.binders['anim-stagger'] = function (el, index) {
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
   rivets.binders['anim-disable'] = function (el, animationDisable) {
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
   rivets.binders['custom-class'] = function (el, property) {
      var cssClass = el.getAttribute('rv-toggle-class');

      if (property === true) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   /*
    * Checks the HTTP status of a response
    * @private
    * @param {Object} response
    * @returns {*}
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

   // adding classes to body based on browser and browser version,
   // code inspired by the Bowser library:
   // https://github.com/ded/bowser
   var ua = window.navigator.userAgent;
   var getFirstMatch = function getFirstMatch(regex) {
      var match = ua.match(regex);
      return match && match.length > 1 && match[1] || '';
   };

   var browser = null;
   var browserVersion = null;
   var versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i);

   if (/android/i.test(ua)) {
      browser = 'android';
      browserVersion = versionIdentifier;
   } else if (/(ipod|iphone|ipad)/i.test(ua)) {
      browser = 'ios';
      browserVersion = getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i);
   } else if (/msie|trident/i.test(ua)) {
      browser = 'internet-explorer';
      browserVersion = getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i);
   } else if (/chrome|crios|crmo/i.test(ua)) {
      browser = 'chrome';
      browserVersion = getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i);
   } else if (/safari|applewebkit/i.test(ua)) {
      browser = 'safari';
      browserVersion = versionIdentifier;
   } else if (/chrome.+? edge/i.test(ua)) {
      browser = 'microsoft-edge';
      browserVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i);
   } else if (/firefox|iceweasel|fxios/i.test(ua)) {
      browser = 'firefox';
      browserVersion = getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i);
   }

   if (browser == null) {
      document.documentElement.classList.add('kw-browser-other');
   } else {
      document.documentElement.classList.add('kw-browser-' + browser);
   }

   /**
    * Main module that holds the other modules as well as widget
    * related configurations
    * @module CoreLibrary
    */
   window.CoreLibrary = {
      /**
       * Name of the browser that is running the widget
       * @memberof module:CoreLibrary
       * @type {String}
       */
      browser: browser,

      /**
       * Browser version.
       * @memberof module:CoreLibrary
       * @type {String}
       */
      browserVersion: browserVersion,

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
      utilModule: null,

      /**
       * widgetModule
       * @type {Object}
       * @memberOf module:CoreLibrary
       */
      widgetModule: null,

      /**
       * offeringModule
       * @type {Object}
       * @memberOf module:CoreLibrary
       */
      offeringModule: null,

      /**
       * statisticsModule
       * @type {Object}
       * @memberOf module:CoreLibrary
       */
      statisticsModule: null,

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
                  void 0;
                  // Load the mock config data
                  fetch('mockSetupData.json').then(checkStatus).then(parseJSON).then(function (mockSetupData) {
                     // Output some debug info that could be helpful
                     void 0;
                     void 0;
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
                     void 0;
                     void 0;
                     reject();
                  });
               } else {
                  window.KambiWidget.apiReady = function (api) {
                     _this.widgetModule.api = api;
                     if (api.VERSION !== _this.expectedApiVersion) {
                        void 0;
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
               void 0;
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
         void 0;
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
            void 0;
            void 0;
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
            void 0;
            void 0;
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
})();
//# sourceMappingURL=coreLibrary.js.map

'use strict';

/**
 * Module with methods to request data from the offering API
 * @module offeringModule
 * @memberof CoreLibrary
 */
window.CoreLibrary.offeringModule = function () {
   'use strict';

   return {
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
         // only a few attributes we don't use are different
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
         return this.doRequest('/group/highlight.json').then(function (highlights) {
            // sorting based on sortOrder
            if (Array.isArray(highlights.groups)) {
               highlights.groups.sort(function (a, b) {
                  if (parseInt(a.sortOrder, 10) > parseInt(b.sortOrder, 10)) {
                     return 1;
                  }
                  if (parseInt(a.sortOrder, 10) < parseInt(b.sortOrder, 10)) {
                     return -1;
                  }
                  return 0;
               });
            }
            return highlights;
         });
      },


      /**
       * @deprecated
       * @param {number|string} eventId The event id we need to fetch
       * @returns {*}
       */
      getEventBetoffers: function getEventBetoffers(eventId) {
         void 0;
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
            void 0;
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
}();
//# sourceMappingURL=offeringModule.js.map

'use strict';

/**
 * Module to access statistics data
 * @module statisticsModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.statisticsModule = function () {
   'use strict';

   return {

      /**
       * Configuration.
       * @type {Object}
       * @property {String} baseApiUrl
       */
      config: {
         baseApiUrl: 'https://api.kambi.com/statistics/api/'
      },

      /**
       * Requests league table statistics data from api.
       * @param {String} filter a league filter
       * @returns {Promise}
       */
      getLeagueTableStatistics: function getLeagueTableStatistics(filter) {
         // Remove url parameters from filter
         filter = filter.match(/[^?]*/)[0];

         // Removing trailing and starting slashes if present
         if (filter[filter.length - 1] === '/') {
            filter = filter.slice(0, -1);
         }
         if (filter[0] === '/') {
            filter = filter.slice(1);
         }
         return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/leaguetable/' + filter + '.json');
      },


      /**
       * Requests H2H statistics data from api.
       * @param {String|Number} eventId
       * @returns {Promise}
       */
      getHeadToHeadStatistics: function getHeadToHeadStatistics(eventId) {
         return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/h2h/event/' + eventId + '.json');
      },


      /**
       * Requests TPI statistics data from api.
       * @param {String|Number} eventId
       * @returns {Promise}
       */
      getTeamPerformanceStatistics: function getTeamPerformanceStatistics(eventId) {
         return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/tpi/event/' + eventId + '.json');
      },


      /**
       * Requests statistics data from api.
       * @param {String} type
       * @param {String} filter
       * @returns {Promise}
       * @deprecated
       */
      getStatistics: function getStatistics(type, filter) {
         void 0;
         // Remove url parameters from filter
         filter = filter.match(/[^?]*/)[0];

         // Remove trailing slash if present
         if (filter[filter.length - 1] === '/') {
            filter = filter.slice(0, -1);
         }

         void 0;
         return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/' + type + '/' + filter + '.json');
      }
   };
}();
//# sourceMappingURL=statisticsModule.js.map

'use strict';

/**
 * Module with internationalization methods
 * @module translationModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.translationModule = function () {
   'use strict';

   return {
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
                  void 0;
                  self.fetchTranslations('en_GB').then(resolve);
               } else {
                  void 0;
                  void 0;
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
}();
//# sourceMappingURL=translationModule.js.map

'use strict';

/**
 * Module with utility functions
 * @module utilModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.utilModule = function () {
   'use strict';

   return {

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
               return CoreLibrary.translationModule.getTranslation('draw');
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
               void 0;
               return outcome.label;
         }
      }
   };
}();
//# sourceMappingURL=utilModule.js.map

'use strict';

/**
 * Module with methods to manipulate the widget and interact with the sportsbook
 * @module widgetModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.widgetModule = function () {
   'use strict';

   var Module = Stapes.subclass();

   return {

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
         createFilterUrl: function createFilterUrl(terms, urlBase) {
            urlBase = urlBase || 'filter';

            var segments = terms.filter(function (term) {
               return term.indexOf('/') === 0;
            }).reduce(function (segments, term) {
               var coords = [];

               term.replace(/\/+$/, '').split('/').slice(1).forEach(function (termKey, i) {
                  if (!(i in segments)) {
                     segments[i] = [];
                  }

                  var pointer = segments[i];

                  if (i > 0) {
                     coords.forEach(function (coord) {
                        for (var j = 0; j <= coord; j++) {
                           if (pointer[j] == null) {
                              pointer.push(j === coord ? [] : 'all');
                           }
                        }
                        pointer = pointer[coord];
                     });
                  }

                  if (pointer.indexOf(termKey) === -1) {
                     pointer.push(termKey);
                  }

                  coords[i] = pointer.length - 1;

                  return coords[i];
               });

               return segments;
            }, []);

            var route = '#' + urlBase.replace(/.*?#/, '').replace(/^\//, '');
            route += segments.reduce(function (str, segment) {
               return str + '/' + JSON.stringify(segment).slice(1, -1);
            }, '').replace(/"/g, '').replace(/(,all)+(\/|\]|$)/g, '$2');

            for (var i = 0; i <= segments.length; i++) {
               route = route.replace(/\[([^,\]]*)\]/g, '$1');
            }

            var attributes = terms.filter(function (term) {
               return term.indexOf('/') !== 0;
            }).join(',');

            if (attributes) {
               for (var j = 0; j < 4 - segments.length; j++) {
                  route += '/all';
               }

               route += '/' + attributes;
            }

            return route.match(/filter$/) ? route + '/all' : route;
         }
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
               var removedIds = CoreLibrary.utilModule.diffArray(this.betslipIds, updateIds);
               var addedIds = CoreLibrary.utilModule.diffArray(updateIds, this.betslipIds);
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
               void 0;
               this.events.emit('USER:LOGGED_IN', response.data);
               break;
            default:
               // Unhandled response
               void 0;
               void 0;
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
               void 0;
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
}();
//# sourceMappingURL=widgetModule.js.map

'use strict';

(function () {
   'use strict';

   // shallow merges objects together into a new object, right-most parameters have precedence

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

   // replaces expressions like "{customer}" from the provided string
   // to the value the have in the CoreLibrary.config object
   var replaceConfigParameters = function replaceConfigParameters(str) {
      if (str == null) {
         return str;
      }
      Object.keys(CoreLibrary.config).forEach(function (key) {
         var regex = new RegExp('{' + key + '}', 'g');
         var value = CoreLibrary.config[key];
         str = str.replace(regex, value);
      });
      return str;
   };

   /**
    * Component base class that should be inherited to create widgets
    * @class Component
    * @abstract
    * @example
   HTML:
   <html>
   <head>
      ...
   </head>
   <body>
      <span>{args.title}</span>
      <br />
      <span>{date}</span>
      ...
   </body>
   </html>
   var Widget = CoreLibrary.Component.subclass({
    defaultArgs: {
      title: 'Title!'
   },
    constructor () {
      CoreLibrary.Component.apply(this, arguments);
   },
    init () {
      this.scope.date = (new Date()).toString();
   }
   });
   var widget = new Widget({
   rootElement: 'html'
   });
    */
   CoreLibrary.Component = Stapes.subclass({

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

         var getSelfFulfillingPromise = function getSelfFulfillingPromise() {
            return new Promise(function (resolve) {
               resolve();
            });
         };

         // promise that waits for the core library to be ready
         var coreLibraryPromise = function coreLibraryPromise() {
            if (CoreLibrary.apiReady === true) {
               return getSelfFulfillingPromise();
            }
            return CoreLibrary.init();
         };

         // setts scope.widgetCss to load the operator-specific stylesheets
         var handleWidgetCss = function handleWidgetCss() {
            var apiVersion = CoreLibrary.widgetModule.api.VERSION;
            if (apiVersion == null) {
               apiVersion = CoreLibrary.expectedApiVersion;
            }
            _this.scope.widgetCss = '//c3-static.kambi.com/sb-mobileclient/widget-api/' + apiVersion + '/resources/css/' + CoreLibrary.config.customer + '/' + CoreLibrary.config.offering + '/widgets.css';
         };

         // loads the external arguments provided in args.externalArgsUrl or externalArgsUrlFallback
         var externalArgsPromise = function externalArgsPromise(widgetArgs) {
            var externalArgsUrl = widgetArgs.externalArgsUrl || _this.defaultArgs.externalArgsUrl;
            var externalArgsUrlFallback = widgetArgs.externalArgsUrlFallback || _this.defaultArgs.externalArgsUrlFallback;
            externalArgsUrl = replaceConfigParameters(externalArgsUrl);
            externalArgsUrlFallback = replaceConfigParameters(externalArgsUrlFallback);
            if (externalArgsUrl != null) {
               return CoreLibrary.getData(externalArgsUrl).then(function (externalArgs) {
                  args = mergeObjs(_this.defaultArgs, widgetArgs, externalArgs);
               }).catch(function (err) {
                  void 0;
                  args = mergeObjs(_this.defaultArgs, widgetArgs);
               });
            } else {
               args = mergeObjs(_this.defaultArgs, widgetArgs);
               return getSelfFulfillingPromise();
            }
         };

         // applying conditionalArgs as specified by args.conditionalArgs (see #KSBWI-653)
         var handleConditionalArgs = function handleConditionalArgs() {
            if (args.conditionalArgs != null) {
               args.conditionalArgs.forEach(function (carg) {
                  var apply = true;
                  if (carg.clientConfig != null) {
                     Object.keys(carg.clientConfig).forEach(function (key) {
                        if (CoreLibrary.config[key] !== carg.clientConfig[key]) {
                           apply = false;
                        }
                     });
                  }

                  if (carg.pageInfo != null) {
                     Object.keys(carg.pageInfo).forEach(function (key) {
                        if (CoreLibrary.pageInfo[key] !== carg.pageInfo[key]) {
                           apply = false;
                        }
                     });
                  }

                  if (apply) {
                     void 0;
                     void 0;
                     args = mergeObjs(args, carg.args);
                  }
               });
            }
         };

         // handles custom CSS stylesheet as specified by args.customCssUrl and args.customCssUrlFallback
         var customCssPromise = function customCssPromise(customCssUrl, customCssUrlFallback) {
            if (customCssUrl == null) {
               return;
            }
            if (customCssUrlFallback == null) {
               customCssUrlFallback = '';
            }

            customCssUrl = replaceConfigParameters(customCssUrl);
            customCssUrlFallback = replaceConfigParameters(customCssUrlFallback);

            var fetchFallback = function fetchFallback() {
               return CoreLibrary.getFile(customCssUrlFallback).then(function (response) {
                  _this.scope.customCss = customCssUrlFallback;
                  return response;
               }).catch(function (error) {
                  void 0;
                  return error;
               });
            };

            return CoreLibrary.getFile(customCssUrl).then(function (response) {
               _this.scope.customCss = customCssUrl;
               return response;
            }).catch(function (error) {
               if (customCssUrlFallback !== '') {
                  void 0;
                  return fetchFallback();
               }
               void 0;
               return error;
            });
         };

         return coreLibraryPromise().then(function (widgetArgs) {
            if (widgetArgs == null) {
               widgetArgs = {};
            }
            handleWidgetCss();
            return externalArgsPromise(widgetArgs);
         }).then(function () {
            handleConditionalArgs();

            // we don't need to wait for this promise (like we do
            // with externalArgsPromise) to call
            // the widget init() function because it just adds
            // a stylesheet to the page
            _this.customCssPromise = customCssPromise(args.customCssUrl, args.customCssUrlFallback);

            _this.scope.args = args;

            if (typeof _this.rootElement === 'string') {
               _this.rootElement = document.querySelector(_this.rootElement);
            }

            // if htmlTemplate is defined place that as HTML inside rootElement
            if (typeof _this.htmlTemplate === 'string') {
               if (_this.htmlTemplate.length < 100 && window[_this.htmlTemplate] != null) {
                  _this.rootElement.innerHTML = window[_this.htmlTemplate];
               } else {
                  _this.rootElement.innerHTML = _this.htmlTemplate;
               }
            }

            _this.view = rivets.bind(_this.rootElement, _this.scope);

            _this.init();
         });
      }
   });
})();
//# sourceMappingURL=Component.js.map

'use strict';

(function () {
   'use strict';

   /**
    * Header Controller
    *
    * @param {String} leftText Left aligned text
    * @param {String} rightText Right aligned text
    * @param {String} leftTextCssClass CSS class(es) to add to left text
    * @param {String} rightTextCssClass CSS class(es) to add to right text
    * @constructor
    * @private
    */

   var HeaderController = function HeaderController(leftText, rightText, leftTextCssClass, rightTextCssClass) {
      this.leftText = leftText;
      this.rightText = rightText;
      this.leftTextCssClass = 'kw-header-left-text' + (leftTextCssClass ? ' ' + leftTextCssClass : '');
      this.rightTextCssClass = 'kw-header-right-text' + (rightTextCssClass ? ' ' + rightTextCssClass : '');
   };

   /**
    * Component that creates a header with left and/or right aligned text.
    *
    * @memberof rivets
    * @mixin component "header-component"
    * @example
    * <header-component left-text="Left title" right-text="Right title" left-text-css-class="left-txt" right-text-css-class="right-txt">
    * @property {String} left-text Left aligned text
    * @property {String} right-text Right aligned text
    * @property {String} left-text-css-class CSS class(es) to add to left text
    * @property {String} right-text-css-class CSS class(es) to add to right text
    */
   rivets.components['header-component'] = {
      /**
       * Defines static properties.
       */
      static: ['leftTextCssClass', 'rightTextCssClass'],

      /**
       * Returns header template.
       * @returns {String}
       * @private
       */
      template: function template() {
         return '\n            <header class="kw-header l-pl-16 l-pr-16">\n               <div rv-show="leftText" rv-class="leftTextCssClass" rv-text="leftText"></div>\n               <div rv-show="rightText" rv-class="rightTextCssClass" rv-text="rightText"></div>\n            </header>\n         ';
      },

      /**
       * Initializes the rivets component.
       * @param {element} el DOM element to be binded
       * @param {object} attributes DOM attributes
       * @returns {HeaderController}
       * @private
       */
      initialize: function initialize(el, attributes) {
         return new HeaderController(attributes.leftText, attributes.rightText, attributes.leftTextCssClass, attributes.rightTextCssClass);
      }
   };
})();
//# sourceMappingURL=HeaderComponent.js.map

'use strict';

(function () {
   'use strict';

   /**
    * Icon Header Controller
    *
    * @param {String} title Title to be displayed on header
    * @param {String} subtitle Subtitle to be displayed on header
    * @param {String} iconCssClass Header icon CSS class
    * @constructor
    * @private
    */

   var IconHeaderController = function IconHeaderController(title, subtitle, iconCssClass) {
      this.title = title;
      this.subtitle = subtitle;
      this.iconCssClass = iconCssClass ? 'kw-icon-header-logo ' + iconCssClass : null;
   };

   /**
    * Component that creates a header for the widget that can optionally have a subtitle and an icon.
    *
    * @memberof rivets
    * @mixin component "icon-header-component"
    * @example
    * <icon-header-component title='Title' subtitle='Subtitle' icon-css-class='icon-class'>
    * @property {String} title Title to be displayed on header
    * @property {String} subtitle Subtitle to be displayed on header
    * @property {String} icon-css-class Header icon CSS class
    */
   rivets.components['icon-header-component'] = {
      /**
       * Defines static properties.
       */
      static: ['iconCssClass'],

      /**
       * Returns header template.
       * @returns {String}
       * @private
       */
      template: function template() {
         return '\n            <header class="KambiWidget-card-border-color KambiWidget-font kw-icon-header l-flexbox l-align-center l-pl-16">\n               <div rv-if="iconCssClass" rv-class="iconCssClass"></div>\n               <div class="kw-icon-header-text-container">\n                  <div class="kw-icon-header-title text-truncate" rv-text="title"></div>\n                  <div rv-if="subtitle" class="kw-icon-header-subtitle text-truncate" rv-text="subtitle"></div>\n               </div>\n            </header>\n         ';
      },

      /**
       * Initializes the rivets component.
       * @param {element} el DOM element to be binded
       * @param {object} attributes DOM attributes
       * @returns {IconHeaderController}
       * @private
       */
      initialize: function initialize(el, attributes) {
         return new IconHeaderController(attributes.title, attributes.subtitle, attributes.iconCssClass);
      }
   };
})();
//# sourceMappingURL=IconHeaderComponent.js.map

'use strict';

(function () {
   'use strict';

   /**
    * Outcome suspended binder.
    * Adds 'KambiWidget-outcome--suspended' class to attached element
    * @example
    * <outcome-component
    *     rv-outcome-suspended="suspended"
    *     outcome-attr="outcome"
    *     event-attr="event">
    * </outcome-component-no-label>
    * @memberof rivets
    * @mixin binder "outcome-suspended"
    * @param {element} el
    * @param {boolean} property
    * @private
    */

   rivets.binders['outcome-suspended'] = function (el, property) {
      var cssClass = 'KambiWidget-outcome--suspended';
      if (property === true) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   /**
    * Outcome selected binder.
    * Adds 'KambiWidget-outcome--selected' class to attached element
    * @example
    * <outcome-component
    *     rv-outcome-selected="selected"
    *     outcome-attr="outcome"
    *     event-attr="event">
    * </outcome-component-no-label>
    * @memberof rivets
    * @mixin binder "outcome-selected"
    * @param {element} el
    * @param {boolean} property
    * @private
    */
   rivets.binders['outcome-selected'] = function (el, property) {
      var cssClass = 'KambiWidget-outcome--selected';

      if (property === true) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   /**
    * Outcome view controller.
    * @param {object} attributes Attributes
    * @memberOf module:OutcomeComponent#
    * @private
    */
   var OutcomeViewController = function OutcomeViewController(attributes) {
      var _this = this;

      this.data = attributes;
      this.selected = false;
      this.label = '';
      this.coreLibraryConfig = CoreLibrary.config;

      if (this.data.eventAttr != null && this.data.eventAttr.betOffers != null) {
         this.betOffer = this.data.eventAttr.betOffers.filter(function (betOffer) {
            if (betOffer.id === _this.data.outcomeAttr.betOfferId) {
               return true;
            }
         })[0];
      }

      if (this.data.outcomeAttr != null) {
         if (CoreLibrary.widgetModule.betslipIds.indexOf(this.data.outcomeAttr.id) !== -1) {
            this.selected = true;
         }

         CoreLibrary.widgetModule.events.on('OUTCOME:ADDED:' + this.data.outcomeAttr.id, function (data, event) {
            _this.selected = true;
         });

         CoreLibrary.widgetModule.events.on('OUTCOME:REMOVED:' + this.data.outcomeAttr.id, function (data, event) {
            _this.selected = false;
         });
      }

      /**
       * Toggle outcomes.
       * @param event
       * @param scope
       * @private
       */
      this.toggleOutcome = function (event, scope) {
         if (scope.selected === false) {
            CoreLibrary.widgetModule.addOutcomeToBetslip(scope.data.outcomeAttr.id);
         } else {
            CoreLibrary.widgetModule.removeOutcomeFromBetslip(scope.data.outcomeAttr.id);
         }
      };

      /**
       * Returns label.
       * If data contains 'customLabel' it will return that custom value
       * @private
       */
      this.getLabel = function () {
         if (_this.data.customLabel) {
            return _this.data.customLabel;
         }

         if (_this.data.outcomeAttr != null) {
            if (_this.data.eventAttr != null) {
               return CoreLibrary.utilModule.getOutcomeLabel(_this.data.outcomeAttr, _this.data.eventAttr);
            } else {
               return _this.data.outcomeAttr.label;
            }
         }
      };

      /**
       * Returns Odds format.
       * @returns {*}
       * @private
       */
      this.getOddsFormat = function () {
         switch (_this.coreLibraryConfig.oddsFormat) {
            case 'fractional':
               return _this.data.outcomeAttr.oddsFractional;
            case 'american':
               return _this.data.outcomeAttr.oddsAmerican;
            default:
               return CoreLibrary.utilModule.getOddsDecimalValue(_this.data.outcomeAttr.odds / 1000);
         }
      };
   };

   /**
    * Outcome component
    * @example
    * <outcome-component
    *    rv-each-outcome="betoffer.outcomes"
    *    outcome-attr="outcome"
    *    event-attr="event">
    * </outcome-component>
    * @memberof rivets
    * @mixin component "outcome-component"
    * @property {Object} outcome-attr An (single) outcome object
    * @property {Object} event-attr The event itself
    * @property {String} customLabel Optional, custom label to show
    */
   rivets.components['outcome-component'] = {
      /**
       * Returns the template.
       * @returns {string}
       * @private
       */
      template: function template() {
         return '\n            <button\n                  rv-on-click="toggleOutcome"\n                  rv-disabled="betOffer.suspended | == true"\n                  rv-outcome-selected="selected"\n                  rv-outcome-suspended="betOffer.suspended"\n                  type="button"\n                  role="button"\n                  class="KambiWidget-outcome kw-link l-flex-1">\n               <div class="KambiWidget-outcome__flexwrap">\n                  <div class="KambiWidget-outcome__label-wrapper">\n                     <span\n                           class="KambiWidget-outcome__label"\n                           rv-text="getLabel < data.outcomeAttr.odds data.eventAttr">\n                     </span>\n                     <span class="KambiWidget-outcome__line"></span>\n                  </div>\n               <div class="KambiWidget-outcome__odds-wrapper">\n                  <span\n                        class="KambiWidget-outcome__odds"\n                        rv-text="getOddsFormat < data.outcomeAttr.odds coreLibraryConfig.oddsFormat">\n                  </span>\n               </div>\n            </button>\n         ';
      },


      /**
       * Initialize.
       * @param el
       * @param attributes
       * @returns {*}
       * @private
       */
      initialize: function initialize(el, attributes) {
         if (attributes.outcomeAttr == null) {
            return false;
         }
         el.classList.add('l-flexbox');
         el.classList.add('l-flex-1');
         return new OutcomeViewController(attributes);
      }
   };

   /**
    * Outcome component without label.
    * @example
    * <outcome-component
    *    rv-each-outcome="betoffer.outcomes"
    *    outcome-attr="outcome"
    *    event-attr="event">
    * </outcome-component>
    * @memberof rivets
    * @mixin component "outcome-component-no-label"
    * @property {Object} outcome-attr An (single) outcome object
    * @property {Object} event-attr The event itself
    */
   rivets.components['outcome-component-no-label'] = {
      /**
       * Template outcome-component-no-label
       * @returns {string}
       * @private
       */
      template: function template() {
         return '\n            <button\n                  rv-on-click="toggleOutcome"\n                  rv-disabled="betOffer.suspended | == true"\n                  rv-outcome-selected="selected"\n                  rv-outcome-suspended="betOffer.suspended"\n                  type="button"\n                  role="button"\n                  class="KambiWidget-outcome kw-link l-flex-1">\n               <div class="l-flexbox l-pack-center">\n                  <div class="KambiWidget-outcome__odds-wrapper">\n                     <span class="KambiWidget-outcome__odds" rv-text="getOddsFormat < data.outcomeAttr.odds coreLibraryConfig.oddsFormat" ></span>\n                  </div>\n               </div>\n            </button>\n         ';
      },


      /**
       * Initialize outcome-component-no-label.
       * @param el
       * @param attributes
       * @returns {OutcomeViewController}
       * @private
       */
      initialize: function initialize(el, attributes) {
         return new OutcomeViewController(attributes);
      }
   };
})();
//# sourceMappingURL=OutcomeComponent.js.map

'use strict';

(function () {
   'use strict';

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

   CoreLibrary.PaginationComponent = CoreLibrary.Component.subclass({
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

         CoreLibrary.Component.apply(this, [{
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
})();
//# sourceMappingURL=PaginationComponent.js.map

'use strict';

(function () {
   'use strict';

   /**
    *
    * @param element
    * @param attributes
    * @param parentScope
    * @constructor
    */

   var PaginationComponent = function PaginationComponent(element, attributes, parentScope) {
      var _this = this;

      this.data = attributes;
      this.scrollerParent = element;
      this.scrollerParent.className += 'kw-pagination l-flexbox';
      this.showLeftNav = false;
      this.showRightNav = false;
      this.scrollStart = 0;
      this.maxItemsPerPage = 1;
      this.pageItemClass = '.kw-page-link';

      this.currentPage = this.data.currentPage || 0;
      this.maxVisibleTabs = this.data.maxVisibleTabs ? this.data.maxVisibleTabs : 5;
      this.paginationScrollable = this.data.type && this.data.type === 'scrollable';
      this.includeIcons = this.data.includeIcons != null ? this.data.includeIcons : false;
      this.tabTextKey = this.data.tabTextKey != null ? this.data.tabTextKey : false;
      this.minTabWidth = this.data.minTabWidth != null ? this.data.minTabWidth : '17.85%';

      parentScope['_' + this.data.scopeKey] = [];
      this.originalArray = parentScope[this.data.scopeKey] || [];
      this.currentPageArray = parentScope['_' + this.data.scopeKey];

      this.getScroller = function () {
         _this.scroller = document.getElementById('kw-scroll-component');
         if (_this.scroller) {
            _this.scrollerParentWidth = _this.scrollerParent.offsetWidth;
            _this.scrollerItems = _this.scroller.querySelectorAll(_this.pageItemClass);
            _this.scrollerItemWidth = _this.scrollerItems.length ? _this.scrollerItems[0].offsetWidth : 0;
            _this.scrollerWidth = _this.scrollerItemWidth * _this.scrollerItems.length + 16 * 2;
            _this.enabled = _this.scrollerWidth > _this.scrollerParentWidth;
         }
      };

      this.getCurrentPage = function () {
         return _this.currentPage;
      };

      this.getNumberOfPages = function () {
         return Math.ceil(_this.originalArray.length / _this.maxItemsPerPage);
      };

      this.nextPage = function () {
         _this.doScroll('right');
         return _this.getCurrentPage();
      };

      this.previousPage = function () {
         _this.doScroll('left');
         return _this.getCurrentPage();
      };

      this.handleClass = function (dir, end) {
         _this.showLeftNav = _this.showRightNav = _this.enabled;
         if (_this.enabled && dir === 'right' && end) {
            _this.showLeftNav = true;
            _this.showRightNav = !_this.showLeftNav;
         } else if (_this.enabled && dir === 'left' && end) {
            _this.showLeftNav = false;
            _this.showRightNav = !_this.showLeftNav;
         }
      };

      this.onClick = function (pageNumber) {
         _this.adaptArray();
         _this.setCurrentPage(pageNumber);
         _this.doScroll(null, pageNumber);
      };

      this.doScroll = function (dir, index) {
         _this.getScroller();
         _this.handleClass();
         _this.scroller.scrollLeft = _this.scrollerWidth * ((index + 1) / _this.scrollerItems.length) - _this.scrollerItemWidth;
         if (!_this.enabled) {
            return false;
         }
         if (dir === 'left') {
            _this.scrollStart += _this.scrollerItemWidth * 2;
         } else if (index >= 0) {
            _this.scrollStart = index * -1 * _this.scrollerItemWidth + (_this.scrollerParentWidth / 2 - _this.scrollerItemWidth / 2);
         } else {
            _this.scrollStart -= _this.scrollerItemWidth * 2;
         }

         if (_this.scrollStart >= 0) {
            _this.scrollStart = 0;
            _this.handleClass('left', true);
         } else if (_this.scrollStart * -1 >= _this.scrollerWidth - _this.scrollerParentWidth) {
            _this.scrollStart = (_this.scrollerWidth - _this.scrollerParentWidth) * -1;
            _this.handleClass('right', true);
         }

         _this.doTranslate();
      };

      this.doTranslate = function (coordX) {
         _this.scrollStart = coordX >= 0 ? coordX : _this.scrollStart;
         var translate = 'translate3d(' + _this.scrollStart + 'px, 0, 0)';
         _this.scroller.style.transform = translate;
         _this.scroller.style.webkitTransform = translate;
         _this.scroller.style.MozTransform = translate;
      };

      this.setCurrentPage = function (pageNumber) {
         if (pageNumber === _this.getCurrentPage()) {
            return;
         }
         if (pageNumber < 0 || pageNumber >= _this.getNumberOfPages()) {
            throw new Error('Invalid page number');
         }
         _this.currentPage = pageNumber;
      };

      this.clearArray = function () {
         if (_this.currentPageArray) {
            _this.currentPageArray.splice(0, _this.currentPageArray.length);
         }
      };

      this.adaptArray = function () {
         _this.clearArray();
         var startItem = _this.getCurrentPage() * _this.maxItemsPerPage;
         var endItem = startItem + _this.maxItemsPerPage;
         if (endItem >= _this.originalArray.length) {
            endItem = _this.originalArray.length;
         }
         for (var i = startItem; i < endItem; ++i) {
            _this.currentPageArray.push(_this.originalArray[i]);
         }
         _this.render();
      };

      this.render = function () {
         _this.pages = [];
         var maxVisibleTabs = _this.maxVisibleTabs,
             currentPage = _this.getCurrentPage(),
             pageCount = _this.getNumberOfPages(),
             startPage = 0,
             endPage = pageCount;

         // if ( maxVisibleTabs < pageCount ) {
         //    // Keep active page in middle by adjusting start and end
         //    startPage = Math.max(currentPage - Math.ceil(maxVisibleTabs / 3), 0);
         //    endPage = startPage + maxVisibleTabs;
         //    // Shift the list start and end
         //    if ( endPage > pageCount ) {
         //       endPage = pageCount;
         //       startPage = endPage - maxVisibleTabs;
         //    }
         // }

         for (var i = startPage; i <= endPage - 1; i++) {
            var page = {
               text: _this.originalArray[i].event.sport,
               number: i,
               selected: i === _this.getCurrentPage(),
               clickEvent: _this.onClick.bind(_this, i) // calls setCurrentPage with i as a parameter
            };
            if (_this.tabTextKey && _this.originalArray[i].hasOwnProperty(_this.tabTextKey)) {
               page.text = _this.originalArray[i][_this.tabTextKey];
            }
            if (_this.includeIcons) {
               page.iconClass = 'kw-custom-logo-' + _this.composeObject(_this.originalArray[i], _this.includeIcons).toLowerCase();
            }
            _this.pages.push(page);
         }
      };

      this.composeObject = function (object, path) {
         var i = 0,
             strPath = path.split('.'),
             len = strPath.length;
         for (; i < len; i++) {
            object = object[strPath[i]];
         }
         return object;
      };

      sightglass(this, 'currentPage', function () {
         _this.setCurrentPage(_this.currentPage);
         _this.adaptArray();
         if (_this.paginationScrollable) {
            _this.onClick(_this.currentPage);
         }
      });

      sightglass(parentScope, this.data.scopeKey, function () {
         _this.originalArray = parentScope[_this.data.scopeKey];
      });
   };

   rivets.components['pagination-component'] = {

      static: ['scopeKey', 'maxItemsPerPage', 'type', 'includeIcons', 'tabTextKey', 'minTabWidth'],

      /**
       * Template pagination
       * @returns {string}
       * @private
       */
      template: function template() {
         return '\n            <div rv-show="showLeftNav" class="kw-scroll-left l-flexbox l-align-center" rv-on-click="previousPage">\n               <i class="icon-angle-left"></i>\n            </div>\n            <div class="kw-scroll-container KambiWidget-font"\n               rv-class-l-ml-16="paginationScrollable"\n               rv-class-l-mr-16="paginationScrollable">\n               <div id="kw-scroll-component" class="kw-scroll-inner l-flexbox l-pack-justify l-flex-1 l-align-stretch"\n               rv-class-kw-pagination-scrollable="paginationScrollable">\n                        <span rv-each-page="pages" rv-on-click="page.clickEvent" rv-class-kw-active-page="page.selected"\n                           rv-style-min-width="minTabWidth"\n                              class="KambiWidget-card-border-color kw-page-link l-flexbox l-vertical l-pack-center l-align-center l-flex-1">\n                           <span rv-show="includeIcons" rv-class="\'kw-sports-logo \' | + page.iconClass"></span>\n                           <span rv-class-kw-sports-text="includeIcons" rv-text="page.text"></span>\n                           <span class="KambiWidget-primary-background-color kw-custom-border"></span>\n                        </span>\n               </div>\n            </div>\n            <div rv-show="showRightNav" class="kw-scroll-right l-flexbox l-align-center l-pack-end" rv-on-click="nextPage">\n               <i class="icon-angle-right"></i>\n            </div>\n         ';
      },


      /**
       * Initialize outcome-component-no-label.
       * @param el
       * @param attributes
       * @returns {PaginationComponent}
       * @private
       */
      initialize: function initialize(el, attributes) {
         return new PaginationComponent(el, attributes, this.view.models);
      }
   };
})();
//# sourceMappingURL=PaginationComponentNew.js.map
