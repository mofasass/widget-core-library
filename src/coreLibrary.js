import offeringModule from './Module/offeringModule';
import statisticsModule from './Module/statisticsModule';
import translationModule from './Module/translationModule';
import utilModule from './Module/utilModule';
import widgetModule from './Module/widgetModule';

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

export default {
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
   expectedApiVersion: '1.0.0.14',

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

   get config () {
      /* eslint-disable no-underscore-dangle */
      return this._config;
      /* eslint-enable no-underscore-dangle */
   },

   set config (config) {
      /* eslint-disable no-underscore-dangle */
      for (var i in config) {
         if (config.hasOwnProperty(i) && this._config.hasOwnProperty(i)) {
            this._config[i] = config[i];
         }
      }
      // Make sure that the routeRoot is not null or undefined
      if (this._config.routeRoot == null) {
         this._config.routeRoot = '';
      } else if (this._config.routeRoot.length > 0 &&
            this._config.routeRoot.slice(-1) !== '/') {
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
   setOddsFormat (oddsFormat) {
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

   get defaultArgs () {
      /* eslint-disable no-underscore-dangle */
      return this._defaultArgs;
      /* eslint-enable no-underscore-dangle */
   },

   set defaultArgs (defaultArgs) {
      /* eslint-disable no-underscore-dangle */
      this._defaultArgs = defaultArgs;
      /* eslint-enable no-underscore-dangle */
   },

   /**
    * args object for the widget, merged with defaultArgs when set
    * @memberOf module:coreLibrary
    * @private
    */
   _args: null,

   get args () {
      /* eslint-disable no-underscore-dangle */
      return this._args;
      /* eslint-enable no-underscore-dangle */
   },

   set args (args) {
      /* eslint-disable no-underscore-dangle */
      if (this._args != null) {
         throw Error('Do not override coreLibrary.args');
      }
      args = Object.assign({}, this.defaultArgs, args);

      // Handling conditionalArgs
      if (args.conditionalArgs != null) {
         args.conditionalArgs.forEach((carg) => {
            var apply = true;
            if (carg.clientConfig != null) {
               Object.keys(carg.clientConfig).forEach((key) => {
                  if (CoreLibrary.config[key] !== carg.clientConfig[key]) {
                     apply = false;
                  }
               });
            }

            if (carg.pageInfo != null) {
               Object.keys(carg.pageInfo).forEach((key) => {
                  if (CoreLibrary.pageInfo[key] !== carg.pageInfo[key]) {
                     apply = false;
                  }
               });
            }

            if (apply) {
               console.log('Applying conditional arguments:');
               console.log(carg.args);
               args = Object.assign(args, carg.args);
            }
         });
      }

      this._args = args
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

   get pageInfo () {
      /* eslint-disable no-underscore-dangle */
      return this._pageInfo;
      /* eslint-enable no-underscore-dangle */
   },

   set pageInfo (pageInfo) {
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

   get apiVersions () {
      /* eslint-disable no-underscore-dangle */
      return this._apiVersions;
      /* eslint-enable no-underscore-dangle */
   },

   set apiVersions (versions) {
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
    * Promise that is resolved when all the CSS has finished loading
    * @type Promise
    */
   cssLoadedPromise: null,

   /**
    * Method that initializes on component construct, sets widget configurations.
    * Can load mock data if not loaded in an iframe.
    * @param defaultArgs
    * @memberOf module:coreLibrary
    * @returns {Promise}
    */
   init (defaultArgs) {
      this.defaultArgs = defaultArgs;

      return new Promise((resolve, reject) => {
         // injecting widget=api in the page
         return this.getFile('https://c3-static.kambi.com/sb-mobileclient/widget-api/' + this.expectedApiVersion + '/kambi-widget-api.js')
            .then((content) => {
               const tag = document.createElement('script');
               tag.setAttribute('id', 'widget-api');
               tag.textContent = content;
               const head = document.getElementsByTagName('head')[0];
               // custom CSS should be the LAST CSS in the page
               head.insertBefore(tag, head.lastChild);
               return 'success';
            }).catch((err) => {
               console.error('Error loading widget api')
               console.error(err);
               reject();
            })
            .then(() => {
               var applySetupData = (setupData) => {
                  this.args = setupData.arguments;
                  this.config = setupData.clientConfig;
                  this.pageInfo = setupData.pageInfo;
                  this.apiVersions = setupData.versions;

                  const translationPromise = translationModule.fetchTranslations(setupData.clientConfig.locale);

                  const operatorCssPromise = this.injectOperatorCss(
                        this.apiVersions.wapi,
                        this.config.customer,
                        this.config.offering);

                  const customCssPromise = this.injectCustomCss(
                        this.args.customCssUrl,
                        this.args.customCssUrlFallback);

                  // most widgets don't need to wait for the CSS to be loaded
                  // so we keep a promise instead of waiting for it
                  this.cssLoadedPromise = Promise.all([operatorCssPromise, customCssPromise]);

                  translationPromise
                     .then(() => {
                        resolve();
                     })
                     .catch((err) => {
                        reject();
                     });
               };

               if (window.KambiWidget) {
                  // For development purposes we might want to load a widget on it's own so we check if we are in an iframe, if not then load some fake data
                  if (window.self === window.top) {
                     console.warn(window.location.host + window.location.pathname + ' is being loaded as stand-alone');
                     // Load the mock config data
                     this.getData('mockSetupData.json')
                        .then((mockSetupData) => {
                           // Output some debug info that could be helpful
                           console.debug('Loaded mock setup data');
                           console.debug(mockSetupData);
                           // Apply the mock config data to the core
                           applySetupData(mockSetupData);
                        })
                        .catch((error) => {
                           console.debug('Failed to fetch mockSetupData');
                           console.trace(error);
                           reject();
                        });
                  } else {
                     window.KambiWidget.apiReady = (api) => {
                        widgetModule.api = api;

                        // Request the setup info from the widget api
                        widgetModule.requestSetup((setupData) => {
                           // TODO: Move this to widgets so we don't request them when not needed
                           // Request the outcomes from the betslip so we can update our widget, also sets up a subscription for future betslip updates
                           widgetModule.requestBetslipOutcomes();
                           // Request the odds format that is set in the sportsbook, this also sets up a subscription for future odds format changes
                           widgetModule.requestOddsFormat();

                           // Apply the config data to the core
                           applySetupData(setupData);
                        });
                     };
                     // Setup the response handler for the widget api
                     window.KambiWidget.receiveResponse = (dataObject) => {
                        widgetModule.handleResponse(dataObject);
                     };
                  }
               } else {
                  console.warn('Kambi widget API not loaded');
                  reject();
               }
            });
      });
   },

   /**
    * Dynamically creates a style tag and returns it
    * @param id {String} the id to add to the tag
    * @param content {String} text content of the tag (the styles)
    * @returns HTMLElement the tag created
    * @private
    */
   createStyleTag (id, url) {
      const tag = document.createElement('link');
      tag.setAttribute('id', id);
      tag.setAttribute('rel', 'stylesheet');
      tag.setAttribute('type', 'text/css');
      tag.setAttribute('href', url);
      return tag;
   },

   /**
    * Injects operator specific CSS based on widget API version,
    * customer and offering
    * @param wApiVersion {String|Null} If null will use expectedApiVersion
    * @param customer {String}
    * @param offering {String}
    * @returns Promise when resolved the stylesheet has been successfully added to the page
    * @private
    */
   injectOperatorCss (wApiVersion, customer, offering) {
      if ( wApiVersion == null || wApiVersion === '') {
         wApiVersion = this.expectedApiVersion;
      }
      const url = '//c3-static.kambi.com/sb-mobileclient/widget-api/' +
         wApiVersion +
         '/resources/css/' +
         customer +
         '/' +
         offering +
         '/widgets.css';
      return this.getFile(url)
         .then((content) => {
            const tag = this.createStyleTag('operator-css', url);
            const head = document.getElementsByTagName('head')[0];
            // opereator CSS should be the FIRST CSS in the page
            head.insertBefore(tag, head.firstChild);
         })
         .catch((err) => {
            console.warn('Could not inject Operator CSS');
         });
   },

   /**
    * Injects stylesheet based on configuration parameters (coreLibrary.config)
    * Replaces expressions like "{customer}" in the strings provided
    * @param customCssUrl {String}
    * @param customCssUrlFallback {String} Fallback if the first URL fetch fails
    * @returns Promise when resolved the stylesheet has been successfully added to the page
    */
   injectCustomCss (customCssUrl, customCssUrlFallback) {
      if (customCssUrl == null) {
         return Promise.resolve('');
      }
      if (customCssUrlFallback == null) {
         customCssUrlFallback = '';
      }

      customCssUrl = utilModule.replaceConfigParameters(customCssUrl);
      customCssUrlFallback = utilModule.replaceConfigParameters(customCssUrlFallback);

      const appendToHead = (url) => {
         const tag = this.createStyleTag('custom-css', url);
         const head = document.getElementsByTagName('head')[0];
         // custom CSS should be the LAST CSS in the page
         head.insertBefore(tag, null);
      };

      return this.getFile(customCssUrl)
         .then(( response ) => {
            appendToHead(customCssUrl);
            return response;
         }).catch(( error ) => {
            if (customCssUrlFallback !== '') {
               console.debug('Error fetching custom css, trying fallback');
               return this.getFile(customCssUrlFallback)
                  .then(( response ) => {
                     appendToHead(customCssUrlFallback);
                     return response;
                  }).catch(( error ) => {
                     console.debug('Error fetching custom css fallback');
                     return error;
                  });
            } else {
               console.debug('Error fetching custom css, no fallback present');
               return error;
            }
         });
   },

   /**
    * Makes a request using Fetch (polyfill) library.
    * @memberOf module:coreLibrary
    * @param {String} url
    * @returns {Promise}
    */
   getData (url) {
      return fetch(url)
         .then(checkStatus)
         .then((response) => {
            return response.json();
         })
         .catch((error) => {
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
   getFile (url) {
      return fetch(url)
         .then(checkStatus)
         .then(content => content.text())
         .catch((error) => {
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
   setWidgetTrackingName (name) {
      this.widgetTrackingName = name;
   }
};
