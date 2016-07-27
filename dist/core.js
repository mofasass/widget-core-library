'use strict';

/**
 * Main module that holds formaters, binders and all widget related configurations
 * @module CoreLibrary
 */

window.CoreLibrary = function () {
   'use strict';

   /**
    * Check if v1 and v2 are "strict" equal.
    * @example
    * <div>{v1 | === v2}</div>
    * @mixin formatter "==="
    * @param v1
    * @param v2
    * @returns {boolean}
    */

   rivets.formatters['==='] = function (v1, v2) {
      return v1 === v2;
   };

   /**
    * Check if v1 and v2 are equal.
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
    *
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

   /**
    * Checks the HTTP status of a response.
    * @memberOf module:CoreLibrary
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

   /**
    * Parses the response as json.
    * @memberOf module:CoreLibrary
    * @private
    * @param response
    * @returns {*}
    */
   function parseJSON(response) {
      return response.json();
   }

   /**
    * Assign adapters.
    */
   sightglass.adapters = rivets.adapters;

   /**
    * Set Sightglass root adapter.
    * @type {string}
    */
   sightglass.root = '.';

   /* adding classes to body based on browser and browser version,
    code inspired by the Bowser library:
    https://github.com/ded/bowser
    */
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

   return {
      /**
       * Expected api version is replaced with the API version number during the compilation step.
       * @memberOf module:CoreLibrary
       */
      browser: browser,
      /**
       * Browser version.
       * @memberOf module:CoreLibrary
       */
      browserVersion: browserVersion,
      expectedApiVersion: '1.0.0.13', // this value is replaced with the API version number during the compilation step
      /**
       * Development flag.
       * @memberOf module:CoreLibrary
       */
      development: false,
      /**
       * utilModule.
       * @memberOf module:CoreLibrary
       */
      utilModule: null,
      /**
       * widgetModule.
       * @memberOf module:CoreLibrary
       */
      widgetModule: null,
      /**
       * offeringModule.
       * @memberOf module:CoreLibrary
       */
      offeringModule: null,
      /**
       * statisticsModule.
       * @memberOf module:CoreLibrary
       */
      statisticsModule: null,
      /**
       * Api ready flag.
       * This value is set to true once the kambi API has finished loaded
       * @memberOf module:CoreLibrary
       */
      apiReady: false, // this value is set to true once the kambi API has finished loaded

      /**
       * Config object.
       * @type {{
            apiBaseUrl: string,
            auth: false,
            channelId: 1,
            currency: string,
            customer: string,
            device: 'desktop',
            locale: 'en_GB',
            market: 'GB',
            oddsFormat: 'decimal',
            offering: string,
            routeRoot: string,
            streamingAllowedForPlayer: true,
            client_id: 2,
            version: 'v2'
         }}
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
       * @memberOf module:CoreLibrary
       */
      height: 450,

      /**
       * Page info.
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
       * @memberOf module:CoreLibrary
       */
      apiVersions: {
         client: '',
         libs: '',
         wapi: ''
      },

      /**
       * widget tracking name is null by default.
       * @memberOf module:CoreLibrary
       */
      widgetTrackingName: null,

      /**
       * args object for each component.
       * @memberOf module:CoreLibrary
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
       */
      setArgs: function setArgs(args) {
         this.args = args;
      },


      /**
       * Requests setup data from widgetModule.
       * @memberOf module:CoreLibrary
       * @param {function} callback
       */
      requestSetup: function requestSetup(callback) {
         this.widgetModule.requestSetup(callback);
      },


      /**
       * Logs the response.
       * @memberOf module:CoreLibrary
       * @param {Object} response
       */
      receiveRespone: function receiveRespone(response) {
         void 0;
      },


      /**
       * Sets odds format.
       * @memberOf module:CoreLibrary
       * @param {*} oddsFormat
       */
      setOddsFormat: function setOddsFormat(oddsFormat) {
         this.config.oddsFormat = oddsFormat;
      },


      /**
       * Sets widget height.
       * @memberOf module:CoreLibrary
       * @param {Number} height
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
}();
//# sourceMappingURL=coreLibrary.js.map

'use strict';

/**
 * @module Component
 * @memberOf CoreLibrary
 */
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

   CoreLibrary.Component = Stapes.subclass({

      /**
       * Object with default values from args if they are not present in
       * the Kambi API provided ones.
       */
      defaultArgs: {},

      /**
       * If string, this value is appended to rootElement with the innerHTML DOM call
       * essentially parsing the the text as HTML.
       */
      htmlTemplate: null,

      /**
       * Stapes Constructor method
       * @param {object} options
       * @returns {Promise}
       */
      constructor: function constructor(options) {
         var _this = this;

         /**
          * object to be used in the HTML templates for data binding.
          * @type {Object}
          */
         this.scope = {};

         /**
          * Rivets view object, binds this.scope to this.rootElement.
          */
         this.view = null;

         /**
          * HTML element to in which rivets.bind will be called,
          * if string uses document.querySelector to get the element
          */
         this.rootElement = null;

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
         if (CoreLibrary.apiReady === true) {
            coreLibraryPromise = new Promise(function (resolve, reject) {
               resolve();
            });
         } else {
            coreLibraryPromise = new Promise(function (resolve, reject) {
               CoreLibrary.init().then(function (widgetArgs) {
                  if (widgetArgs == null) {
                     widgetArgs = {};
                  }
                  var apiVersion = CoreLibrary.widgetModule.api.VERSION;
                  if (apiVersion == null) {
                     apiVersion = '1.0.0.13';
                  }
                  _this.scope.widgetCss = '//c3-static.kambi.com/sb-mobileclient/widget-api/' + apiVersion + '/resources/css/' + CoreLibrary.config.customer + '/' + CoreLibrary.config.offering + '/widgets.css';

                  var externalArgsUrl = widgetArgs.externalArgsUrl || _this.defaultArgs.externalArgsUrl;
                  if (externalArgsUrl != null) {
                     CoreLibrary.getData(externalArgsUrl).then(function (externalArgs) {
                        args = mergeObjs(_this.defaultArgs, widgetArgs, externalArgs);
                        resolve();
                     }).catch(function (err) {
                        void 0;
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

            _this.view = rivets.bind(_this.rootElement, _this.scope);

            _this.init();
         });
      }
   });
})();
//# sourceMappingURL=Component.js.map

'use strict';

/**
 * @module offeringModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.offeringModule = function () {
   'use strict';

   return {

      /**
       * Get group events.
       * @param {number|string} groupId Group id
       * @returns {*|Promise}
       */

      getGroupEvents: function getGroupEvents(groupId) {
         var requesPath = '/event/group/' + groupId + '.json';
         return this.doRequest(requesPath);
      },


      /**
       * Get events by filter.
       * @param {string} filter Filter string, eg: football
       * @param {object} params Request relevant parameters
       * @returns {Promise}
       */
      getEventsByFilter: function getEventsByFilter(filter, params) {
         // Todo: Update this method once documentation is available
         var requestPath = '/listView/' + filter;
         return this.doRequest(requestPath, params, 'v3');
      },


      /**
       * Normalizes v2 api betoffers.
       * @param {object} betOffer Betoffer object we get from api
       */
      adaptV2BetOffer: function adaptV2BetOffer(betOffer) {
         if (betOffer.suspended === true) {
            betOffer.open = false;
         }
      },


      /**
       * Normalizes the v2 api response.
       * @param {object} liveData Livedata object we get from api
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
      adaptV2Event: function adaptV2Event(event) {
         // v3 and v2 event objects are almost the same
         // only a few attributes we don't are different
      },


      /**
       * Get live event data only, eg: match statistics, score, macthClock.
       * @param {number|string} eventId The event id we need to fetch
       * @returns {Promise}
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
       * Get all live events.
       * @returns {Promise}
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
       * Returns a live event.
       * @param {number|string} eventId The event id we need to fetch
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
       * Get live events by filter.
       * @param {string} filter Filter string
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
       * Requests and event from api.
       * @param {string} eventId The event id we need to fetch
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
       * @deprecated
       * @param {number|string} eventId The event id we need to fetch
       * @returns {*}
       */
      getEventBetoffers: function getEventBetoffers(eventId) {
         void 0;
         return this.getEvent.apply(this, arguments);
      },


      /**
       * Makes a request to provided path.
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
 * @module statisticsModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.statisticsModule = function () {
   'use strict';

   return {

      /**
       * Configuration.
       * @type {Object} config
       * @type {String} config.baseApiUrl
       */
      config: {
         baseApiUrl: 'https://api.kambi.com/statistics/api/'
      },

      /**
       * Requests statistics data from api.
       * @param {String} type
       * @param {string} filter
       * @returns {*|Promise}
       */
      getStatistics: function getStatistics(type, filter) {
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
 * @module translationModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.translationModule = function () {
   'use strict';

   /**
    * Formatter that translates current value in binder.
    * @example
    * <span>{'key' | translate}</span>
    * @mixin translate
    * @param args
    * @returns {*|String}
    */

   rivets.formatters.translate = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
         args[_key] = arguments[_key];
      }

      return CoreLibrary.translationModule.getTranslation.apply(CoreLibrary.translationModule, args);
   };

   return {
      /**
       * @type {object}
       */
      i18nStrings: {},

      /**
       * Makes a request to fetch all locales strings.
       * The locale json file resides in CoreLibrary/i18n folder; it is populated with locales during build process
       * @param {String} locale Locale string, eg: sv_SE
       * @returns {Promise}
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
       * @param {Array} args other arguments that are passed to this method
       * @returns {String}
       */
      getTranslation: function getTranslation(key) {
         if (this.i18nStrings[key] != null) {
            var str = this.i18nStrings[key];

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
               args[_key2 - 1] = arguments[_key2];
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
       * @param {number} odds Odds number
       * @returns {number}
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
       * @param {Object} outcome Outcome object
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
 * @module widgetModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.widgetModule = function () {
   'use strict';

   var Module = Stapes.subclass();

   return {

      /**
       * @type {object}
       */
      api: { // placeholders for when not running inside iframe

         requestSetup: function requestSetup() {},
         request: function request() {},
         set: function set() {},
         remove: function remove() {},
         createUrl: function createUrl() {},
         createFilterUrl: function createFilterUrl() {}
      },

      /**
       * Instantiates a new Stapes subclass
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
            case 'Setup':
               this.events.emit('Setup response', response.data);
               break;
            default:
               // Unhandled response
               void 0;
               void 0;
               break;
         }
      },


      /**
       * Creates url from given path and optionalRoot.
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
       * Get page type.
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
       * Makes widget api request for setupdata.
       * @param {fn} callback Callback
       */
      requestSetup: function requestSetup(callback) {
         this.api.requestSetup(callback);
      },


      /**
       * Requests widget height from widget api.
       */
      requestWidgetHeight: function requestWidgetHeight() {
         this.api.request(this.api.WIDGET_HEIGHT);
      },


      /**
       * Set widget api widget height.
       * @param {Number} height
       */
      setWidgetHeight: function setWidgetHeight(height) {
         this.api.set(this.api.WIDGET_HEIGHT, height);
      },


      /**
       * tries to adapt the widget iframe height to match the content.
       */
      adaptWidgetHeight: function adaptWidgetHeight() {
         // tries to adapt the widget iframe height to match the content
         var body = document.body,
             html = document.documentElement;
         var height = Math.max(body.offsetHeight, html.scrollHeight, html.offsetHeight);
         this.api.set(this.api.WIDGET_HEIGHT, height);
      },


      /**
       * Sets widget api widget transition state.
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
       * Call api to remove widget.
       */
      removeWidget: function removeWidget() {
         this.api.remove();
      },


      /**
       * Widget api method for navigating to a live event.
       * @param {number} eventId
       */
      navigateToLiveEvent: function navigateToLiveEvent(eventId) {
         this.navigateClient('event/live/' + eventId);
      },


      /**
       * Widget api method for navigating to a prelive event.
       * @param {number} eventId
       */
      navigateToEvent: function navigateToEvent(eventId) {
         this.navigateClient('event/' + eventId);
      },


      /**
       * Widget api method for navigating to a filter.
       * @param {String} filterParams
       */
      navigateToFilter: function navigateToFilter(filterParams) {
         if (typeof filterParams === 'string' && filterParams.indexOf('filter/') === -1) {
            filterParams = 'filter/' + filterParams;
         }
         this.navigateClient(filterParams);
      },


      /**
       * Widget api method for navigating to a live events.
       */
      navigateToLiveEvents: function navigateToLiveEvents() {
         this.navigateClient(['in-play']);
      },


      /**
       * Uses widget api to add outcomes to betslip.
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
       * Removes outcomes from betslip via widget api.
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
       * Widget api method for requesting betslip outcome.
       */
      requestBetslipOutcomes: function requestBetslipOutcomes() {
         this.api.request(this.api.BETSLIP_OUTCOMES);
      },


      /**
       * Widget api method for requesting page info.
       */
      requestPageInfo: function requestPageInfo() {
         this.api.request(this.api.PAGE_INFO);
      },


      /**
       * Widget api method for requesting widget args.
       */
      requestWidgetArgs: function requestWidgetArgs() {
         this.api.request(this.api.WIDGET_ARGS);
      },


      /**
       * Widget api method for requesting client config.
       */
      requestClientConfig: function requestClientConfig() {
         this.api.request(this.api.CLIENT_CONFIG);
      },


      /**
       * Widget api method for requesting odds format.
       */
      requestOddsFormat: function requestOddsFormat() {
         this.api.request(this.api.CLIENT_ODDS_FORMAT);
      },


      /**
       * Widget api method for requesting american odds.
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
       * Widget api method for requesting fractional odds.
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
       * Widget api method for navigating client to hash path.
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

/**
 * header-component dom attribute
 * @module HeaderComponent
 * @type {{static: string[], template: (function()), initialize: (function(*, *))}}
 */
(function () {
   'use strict';

   /**
    * Header Controller
    * @param title
    * @param cssClasses
    * @param scope
    * @param collapsible
    * @param startCollapsed
    * @constructor
    */

   var HeaderController = function HeaderController(title, cssClasses, scope, collapsible, startCollapsed) {
      var headerHeight = 36;
      undefined.title = title;
      undefined.cssClasses = cssClasses + ' KambiWidget-font kw-header l-flexbox l-align-center l-pl-16';

      if (collapsible) {
         scope.collapsed = startCollapsed;
         if (scope.collapsed) {
            CoreLibrary.widgetModule.enableWidgetTransition(false);
            CoreLibrary.widgetModule.setWidgetHeight(headerHeight);
            CoreLibrary.widgetModule.enableWidgetTransition(true);
         }

         undefined.cssClasses += ' KambiWidget-header';
         undefined.style = 'cursor: pointer;';

         undefined.click = function (ev, controller) {
            scope.collapsed = !scope.collapsed;
            if (scope.collapsed) {
               CoreLibrary.widgetModule.setWidgetHeight(headerHeight);
            } else {
               CoreLibrary.widgetModule.adaptWidgetHeight();
            }
         };
      }
   };

   /**
    * @mixin header-component
    * @example
    * <div header-component>
    * @type {{static: string[], template: (function(): string), initialize: (function(*, *): HeaderController)}}
    */
   rivets.components['header-component'] = {
      static: ['collapsable', 'collapsed', 'css-classes'],

      /**
       * Returns header template.
       * @memberOf module:HeaderComponent#
       * @returns {string}
       */
      template: function template() {
         return '\n            <header rv-class="cssClasses" rv-style="style" rv-on-click="click">{title | translate}</header>\n         ';
      },


      /**
       * Initializes the rivets component.
       * @memberOf module:HeaderComponent#
       * @param {element} el DOM element to be binded
       * @param {object} attributes DOM attributes
       * @returns {HeaderController}
       */
      initialize: function initialize(el, attributes) {
         var cssClasses = attributes['css-classes'];
         if (cssClasses == null) {
            cssClasses = '';
         }

         var collapsible = false;
         if (attributes.collapsible === 'true') {
            collapsible = true;
         }

         var startCollapsed = false;
         if (attributes.collapsed === 'true') {
            startCollapsed = true;
         }

         return new HeaderController(attributes.title, cssClasses, this.view.models, collapsible, startCollapsed);
      }
   };
})();
//# sourceMappingURL=HeaderComponent.js.map

'use strict';

/**
 * @module OutcomeComponent
 */
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
    * @mixin outcome-suspended
    * @param {element} el
    * @param {boolean} property
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
    * @mixin outcome-selected
    * @param {element} el
    * @param {boolean} property
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
    * Outcome component.
    * @example
    * <outcome-component
    *    rv-each-outcome="betoffer.outcomes"
    *    outcome-attr="outcome"
    *    event-attr="event">
    * </outcome-component>
    * @mixin outcome-component
    * @type {{template: (function()), initialize: (function(*, *=))}}
    */
   rivets.components['outcome-component'] = {

      /**
       * Returns the template.
       * @returns {string}
       */

      template: function template() {
         return '\n            <button\n                  rv-on-click="toggleOutcome"\n                  rv-disabled="betOffer.suspended | == true"\n                  rv-outcome-selected="selected"\n                  rv-outcome-suspended="betOffer.suspended"\n                  type="button"\n                  role="button"\n                  class="KambiWidget-outcome kw-link l-flex-1">\n               <div class="KambiWidget-outcome__flexwrap">\n                  <div class="KambiWidget-outcome__label-wrapper">\n                     <span\n                           class="KambiWidget-outcome__label"\n                           rv-text="getLabel < data.outcomeAttr.odds data.eventAttr">\n                     </span>\n                     <span class="KambiWidget-outcome__line"></span>\n                  </div>\n               <div class="KambiWidget-outcome__odds-wrapper">\n                  <span\n                        class="KambiWidget-outcome__odds"\n                        rv-text="getOddsFormat < data.outcomeAttr.odds coreLibraryConfig.oddsFormat">\n                  </span>\n               </div>\n            </button>\n         ';
      },


      /**
       * Initialize.
       * @param el
       * @param attributes
       * @returns {*}
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
    * <outcome-component-no-label
    *     outcome-attr="outcome" event-attr="event">
    * </outcome-component-no-label>
    * @mixin outcome-component-no-label
    * @type {{template: (function()), initialize: (function(*, *=))}}
    */
   rivets.components['outcome-component-no-label'] = {

      /**
       * Template outcome-component-no-label.
       * @returns {string}
       */

      template: function template() {
         return '\n            <button\n                  rv-on-click="toggleOutcome"\n                  rv-disabled="betOffer.suspended | == true"\n                  rv-outcome-selected="selected"\n                  rv-outcome-suspended="betOffer.suspended"\n                  type="button"\n                  role="button"\n                  class="KambiWidget-outcome kw-link">\n               <div class="l-flexbox l-pack-center">\n                  <div class="KambiWidget-outcome__odds-wrapper">\n                     <span class="KambiWidget-outcome__odds" rv-text="getOddsFormat < data.outcomeAttr.odds coreLibraryConfig.oddsFormat" ></span>\n                  </div>\n               </div>\n            </button>\n         ';
      },


      /**
       * Initialize outcome-component-no-label.
       * @param el
       * @param attributes
       * @returns {OutcomeViewController}
       */
      initialize: function initialize(el, attributes) {
         return new OutcomeViewController(attributes);
      }
   };
})();
//# sourceMappingURL=OutcomeComponent.js.map

'use strict';

/**
 * @module PaginationComponent
 */
(function () {
   'use strict';

   CoreLibrary.PaginationComponent = CoreLibrary.Component.subclass({
      htmlTemplate: '<div class="kw-pagination l-flexbox l-pack-center l-align-center">' + '<span rv-on-click="previousPage" rv-class-disabled="firstPage"' + 'class="kw-page-link kw-pagination-arrow">' + '<i class="icon-angle-left"></i>' + '</span>' + '<span rv-each-page="pages" rv-on-click="page.clickEvent" rv-class-kw-active-page="page.selected"' + 'class="kw-page-link l-pack-center l-align-center" >' + '{page.text}' + '</span>' + '<span rv-on-click="nextPage" rv-class-disabled="lastPage"' + 'class="kw-page-link kw-pagination-arrow">' + '<i class="icon-angle-right"></i>' + '</span>' + '</div>',

      /**
       * Constructor method.
       * @param {string} htmlElement Html element to be attached to
       * @param {object} mainComponentScope The scope object of the widget
       * @param {string} scopeKey scope key - will be used to create a copy
       * @param {number} pageSize Pagination page size
       * @param {number} maxVisiblePages Max visible pages
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
       */
      clearArray: function clearArray() {
         this.currentPageArray.splice(0, this.currentPageArray.length);
      },


      /**
       * Get current page.
       * @returns {*|number}
       */
      getCurrentPage: function getCurrentPage() {
         return this.scope.currentPage;
      },


      /**
       * Sets currentPage variable.
       * @param {number} pageNumber Set a certain page as current one
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
       */
      getNumberOfPages: function getNumberOfPages() {
         return Math.ceil(this.originalArray.length / this.pageSize);
      },


      /**
       * Method for displaying next page.
       * @returns {*|number}
       */
      nextPage: function nextPage() {
         if (this.getCurrentPage() < this.getNumberOfPages() - 1) {
            this.setCurrentPage(this.getCurrentPage() + 1);
         }
         return this.getCurrentPage();
      },


      /**
       * Method for displaying previous page.
       * @returns {*|number}
       */
      previousPage: function previousPage() {
         if (this.getCurrentPage() > 0) {
            this.setCurrentPage(this.getCurrentPage() - 1);
         }
         return this.getCurrentPage();
      },


      /**
       * Changes the _scopeKey array to match the current page elements.
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
       */
      init: function init() {
         this.render();
      },


      /**
       * Updates the scope.pages value which is used to render the page numbers and arrows.
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
