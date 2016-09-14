import sightglass from 'sightglass';
import rivets from 'rivets';
import Component from './Component/Component';
import PaginationComponent from './Component/PaginationComponent/PaginationComponent';
import offeringModule from './Module/offeringModule';
import statisticsModule from './Module/statisticsModule';
import translationModule from './Module/translationModule';
import utilModule from './Module/utilModule';
import widgetModule from './Module/widgetModule';

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

   var getFirstMatch = function (regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
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

function initRivets() {
   sightglass.adapters = rivets.adapters;
   sightglass.root = '.';

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
   rivets.formatters.translate = (...args) => {
      return translationModule
         .getTranslation
         .apply(translationModule, args);
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
   rivets.formatters['==='] = (v1, v2) => {
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
   rivets.formatters['=='] = (v1, v2) => {
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
   rivets.formatters['>='] = (v1, v2) => {
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
   rivets.formatters['>'] = (v1, v2) => {
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
   rivets.formatters['<='] = (v1, v2) => {
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
   rivets.formatters['<'] = (v1, v2) => {
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
   rivets.formatters['!='] = (v1, v2) => {
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
   rivets.formatters['!=='] = (v1, v2) => {
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
   rivets.formatters['and'] = (v1, v2) => {
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
   rivets.formatters['or'] = (v1, v2) => {
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
   rivets.formatters['not'] = (v1)=> {
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
   rivets.formatters['-'] = (v1, v2) => {
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
   rivets.formatters['+'] = (v1, v2) => {
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
   rivets.formatters['*'] = (v1, v2) => {
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
   rivets.formatters['/'] = (v1, v2) => {
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
   rivets.formatters['?'] = (v1, v2) => {
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
   rivets.formatters['array_at'] = (arr, index, key) => {
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
   rivets.formatters['property_list'] = (obj) => {
      return (() => {
         var properties = [];
         for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
               properties.push({ key: key, value: obj[key] });
            }
         }
         return properties;
      })();
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
      bind (el) {
         el.style.opacity = 0;
      },
      routine (el, value) {
         if (value !== undefined && value !== false) {
            setTimeout(() => {
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
   rivets.binders['anim-stagger'] = (el, index) => {
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
         setTimeout(() => {
            el.classList.add('anim-enter-active');
            setTimeout(() => {
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
   rivets.binders['anim-disable'] = (el, animationDisable) => {
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
   rivets.binders['custom-class'] = (el, property) => {
      var cssClass = el.getAttribute('rv-toggle-class');

      if (property === true) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };
}

initRivets();

export default {
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

   Component: Component,

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
   utilModule: utilModule,

   /**
    * widgetModule
    * @type {Object}
    * @memberOf module:CoreLibrary
    */
   widgetModule: widgetModule,

   /**
    * offeringModule
    * @type {Object}
    * @memberOf module:CoreLibrary
    */
   offeringModule: offeringModule,

   /**
    * statisticsModule
    * @type {Object}
    * @memberOf module:CoreLibrary
    */
   statisticsModule: statisticsModule,

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

   PaginationComponent: PaginationComponent,

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
   init (setDefaultHeight) {
      return new Promise((resolve, reject) => {
         if (window.KambiWidget) {
            // For development purposes we might want to load a widget on it's own so we check if we are in an iframe, if not then load some fake data
            if (window.self === window.top) {
               console.warn(window.location.host + window.location.pathname + ' is being loaded as stand-alone');
               // Load the mock config data
               fetch('mockSetupData.json')
                  .then(checkStatus)
                  .then(parseJSON)
                  .then((mockSetupData) => {
                     // Output some debug info that could be helpful
                     console.debug('Loaded mock setup data');
                     console.debug(mockSetupData);
                     // Apply the mock config data to the core
                     this.applySetupData(mockSetupData, setDefaultHeight);
                     if (this.translationModule != null) {
                        this.translationModule
                           .fetchTranslations(mockSetupData.clientConfig.locale)
                           .then(() => {
                              resolve(mockSetupData['arguments']);
                           });
                     } else {
                        resolve(mockSetupData['arguments']);
                     }
                  })
                  .catch((error) => {
                     console.debug('Request failed');
                     console.trace(error);
                     reject();
                  });
            } else {
               window.KambiWidget.apiReady = (api) => {
                  this.widgetModule.api = api;
                  if (api.VERSION !== this.expectedApiVersion) {
                     console.warn('Wrong Kambi API version loaded, expected: ' + this.expectedApiVersion + ' got: ' + api.VERSION);
                  }

                  // Request the setup info from the widget api
                  this.requestSetup((setupData) => {
                     // Apply the config data to the core
                     this.applySetupData(setupData, setDefaultHeight);

                     // TODO: Move this to widgets so we don't request them when not needed
                     // Request the outcomes from the betslip so we can update our widget, also sets up a subscription for future betslip updates
                     this.widgetModule.requestBetslipOutcomes();
                     // Request the odds format that is set in the sportsbook, this also sets up a subscription for future odds format changes
                     this.widgetModule.requestOddsFormat();

                     if (this.translationModule != null) {
                        this.translationModule
                           .fetchTranslations(setupData.clientConfig.locale)
                           .then(() => {
                              resolve(setupData['arguments']);
                           });
                     } else {
                        resolve(setupData['arguments']);
                     }
                  });
               };
               // Setup the response handler for the widget api
               window.KambiWidget.receiveResponse = (dataObject) => {
                  this.widgetModule.handleResponse(dataObject);
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
   applySetupData (setupData, setDefaultHeight) {

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
   setConfig (config) {
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
   setPageInfo (pageInfo) {
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
   setVersions (versions) {
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
   setArgs (args) {
      this.args = args;
   },

   /**
    * Requests setup data from widgetModule.
    * @memberOf module:CoreLibrary
    * @param {function} callback
    * @private
    */
   requestSetup (callback) {
      this.widgetModule.requestSetup(callback);
   },

   /**
    * Logs the response.
    * @memberOf module:CoreLibrary
    * @param {Object} response
    * @private
    */
   receiveRespone (response) {
      console.debug(response);
   },

   /**
    * Sets odds format.
    * @memberOf module:CoreLibrary
    * @param {String} oddsFormat
    * @private
    */
   setOddsFormat (oddsFormat) {
      this.config.oddsFormat = oddsFormat;
   },

   /**
    * Sets widget height.
    * @memberOf module:CoreLibrary
    * @param {Number} height
    * @private
    */
   setHeight (height) {
      this.height = height;
      this.widgetModule.setHeight(height);
   },

   /**
    * Makes an request using Fetch (polyfill) library.
    * @memberOf module:CoreLibrary
    * @param {String} url
    * @returns {Promise}
    */
   getData (url) {
      return fetch(url)
         .then(checkStatus)
         .then(parseJSON)
         .catch((error) => {
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
   getFile (url) {
      return fetch(url)
         .then(checkStatus)
         .catch((error) => {
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
   setWidgetTrackingName (name) {
      this.widgetTrackingName = name;
   }
};
