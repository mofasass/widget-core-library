window.CoreLibrary = (() => {
   'use strict';

   /**
    * Rivets "===" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['==='] = ( v1, v2 ) => {
      return v1 === v2;
   };

   /**
    * Rivets "==" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['=='] = ( v1, v2 ) => {
      return v1 == v2; // jshint ignore:line
   };

   /**
    * Rivets ">=" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['>='] = ( v1, v2 ) => {
      return v1 >= v2;
   };

   /**
    * Rivets ">" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['>'] = ( v1, v2 ) => {
      return v1 > v2;
   };

   /**
    * Rivets "<=" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['<='] = ( v1, v2 ) => {
      return v1 <= v2;
   };

   /**
    * Rivets "<" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['<'] = ( v1, v2 ) => {
      return v1 < v2;
   };

   /**
    * Rivets "!=" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['!='] = ( v1, v2 ) => {
      return v1 != v2; // jshint ignore:line
   };

   /**
    * Rivets "!==" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['!=='] = ( v1, v2 ) => {
      return v1 !== v2;
   };

   /**
    * Rivets "and" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['and'] = ( v1, v2 ) => {
      return v1 && v2;
   };

   /**
    * Rivets "or" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['or'] = ( v1, v2 ) => {
      return v1 || v2;
   };

   /**
    * Rivets "not" formatter
    * @param v1
    * @returns {boolean}
    */
   rivets.formatters['not'] = ( v1 )=> {
      return !v1;
   };

   /**
    * Rivets "-" formatter
    * @param v1
    * @param v2
    * @returns {Number}
    */
   rivets.formatters['-'] = ( v1, v2 ) => {
      return v1 - v2;
   };

   /**
    * Rivets "+" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['+'] = ( v1, v2 ) => {
      return v1 + v2;
   };

   /**
    * Rivets "*" formatter
    * @param v1
    * @param v2
    * @returns {Number}
    */
   rivets.formatters['*'] = ( v1, v2 ) => {
      return v1 * v2;
   };

   /**
    * Rivets "/" formatter
    * @param v1
    * @param v2
    * @returns {Number}
    */
   rivets.formatters['/'] = ( v1, v2 ) => {
      return v1 / v2;
   };

   /**
    * Rivets "?" formatter
    * @param v1
    * @param v2
    * @returns {boolean}
    */
   rivets.formatters['?'] = ( v1, v2 ) => {
      return v1 ? v1 : v2;
   };

   /**
    * Returns specified object at specified key for specified array index
    * @param arr The source array
    * @param index The desired index from given array
    * @param key The desired key of the object to be returned
    * @returns {*}
    */
   rivets.formatters['array_at'] = ( arr, index, key ) => {
      return arr == null || arr.length === 0 ? [] : arr[index][key];
   };

   /**
    * Returns an array of objects where each objects contains key and value properties based on the passed array
    * @param {Object} obj The source object
    * @returns {Array}
    */
   rivets.formatters['property_list'] = ( obj ) => {
      return (() => {
         var properties = [];
         for ( var key in obj ) {
            if ( obj.hasOwnProperty(key) ) {
               properties.push({ key: key, value: obj[key] });
            }
         }
         return properties;
      })();
   };

   /**
    * Custom style binder
    * @param el
    * @param value
    */
   rivets.binders['style-*'] = ( el, value ) => {
      el.style.setProperty(this.args[0], value);
   };

   /**
    * Cloaking waits for element to bind and then sets it visible with a slight delay.
    * Can listen to a value and apply the opacity after that value has changed
    * Usage: rv-cloak or rv-cloak="value"
    * In promise resolution, add something like this.scope.loaded = true
    * @type {{priority: number, bind: rivets.binders.cloak.bind}}
    */
   rivets.binders['cloak'] = {
      priority: -1000,
      bind ( el ) {
         el.style.opacity = 0;
      },
      routine ( el, value ) {
         if ( value !== undefined && value !== false ) {
            setTimeout(() => {
               el.style.opacity = 1;
            }, 100);
         }
      }
   };

   /**
    * Binder that adds animation class
    *
    * Used in DOM as <div rv-anim-stagger="index"></div>
    *
    * @param el DOM element to apply classes
    * @param index List item index
    */
   rivets.binders['anim-stagger'] = ( el, index ) => {
      if ( index < 0 ) {
         return false;
      }
      var animationDisable = el.getAttribute('data-anim-disable');
      if ( animationDisable === 'true' ) {
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
    * Binder to temporarily disable the stagger animation
    *
    * Used in DOM as <div rv-anim-disable="event.disableAnimation" rv-anim-stagger="index" ></div>
    * IMPORTANT: The rv-anim-disable attribute has to be placed before the binder that provides the animation for it to take effect in the animation binder
    *
    * @param el Dom element to disable the animation on
    * @param animationDisable 'true' to disable animations
    */
   rivets.binders['anim-disable'] = ( el, animationDisable ) => {
      el.setAttribute('data-anim-disable', animationDisable);
   };

   /**
    * Binder to toggle a custom class based on the passed property, picks up the class name form the "rv-toggle-class" attribute
    *
    * Used in DOM as <div rv-custom-class="myBoolean" rv-toggle-class="myCustomClass" ></div>
    *
    * @param el DOM element to apply class to
    * @param property The property to check
    */
   rivets.binders['custom-class'] = ( el, property ) => {
      var cssClass = el.getAttribute('rv-toggle-class');

      if ( property === true ) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   /**
    * Checks the HTTP status of a response
    */
   function checkStatus ( response ) {
      if ( response.status >= 200 && response.status < 300 ) {
         return response;
      } else {
         var error = new Error(response.statusText);
         error.response = response;
         throw error;
      }
   }

   /**
    * Parses the response as json
    */
   function parseJSON ( response ) {
      return response.json();
   }

   /**
    * Assign adapters
    */
   sightglass.adapters = rivets.adapters;

   /**
    * Set Sightglass root adapter
    * @type {string}
    */
   sightglass.root = '.';

   /* adding classes to body based on browser and browser version,
   code inspired by the Bowser library:
   https://github.com/ded/bowser
   */
   var ua = window.navigator.userAgent;
   var getFirstMatch = function (regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
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

   document.body.classList.add('kw-' + browser);

   return {
      /**
       * Expected api version is replaced with the API version number during the compilation step
       */
      browser: browser,
      browserVersion: browserVersion,
      expectedApiVersion: '{{expectedApiVersion}}', // this value is replaced with the API version number during the compilation step
      development: false,
      utilModule: null,
      widgetModule: null,
      offeringModule: null,
      statisticsModule: null,
      apiReady: false, // this value is set to true once the kambi API has finished loaded
      /**
       * config object
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
       * Default height: 450
       */
      height: 450,
      /**
       * Page info
       */
      pageInfo: {
         leaguePaths: [],
         pageParam: '',
         pageTrackingPath: '',
         pageType: ''
      },
      /**
       * api versions object
       */
      apiVersions: {
         client: '',
         libs: '',
         wapi: ''
      },
      /**
       * widget tracking name is null by default
       */
      widgetTrackingName: null,
      /**
       * args object for each component
       */
      args: {},

      /**
       * Method that initializes on component construct, sets widget configurations
       * Can load mock data if not loaded in an iframe.
       * @param setDefaultHeight
       * @returns {Promise}
       */
      init ( setDefaultHeight ) {
         return new Promise(( resolve, reject ) => {
               if ( window.KambiWidget ) {
                  // For development purposes we might want to load a widget on it's own so we check if we are in an iframe, if not then load some fake data
                  if ( window.self === window.top ) {
                     console.warn(window.location.host + window.location.pathname + ' is being loaded as stand-alone');
                     // Load the mock config data
                     fetch('mockSetupData.json')
                        .then(checkStatus)
                        .then(parseJSON)
                        .then(( mockSetupData ) => {
                              // Output some debug info that could be helpful
                              console.debug('Loaded mock setup data');
                              console.debug(mockSetupData);
                              // Apply the mock config data to the core
                              this.applySetupData(mockSetupData, setDefaultHeight);
                              if ( this.translationModule != null ) {
                                 this.translationModule.fetchTranslations(mockSetupData.clientConfig.locale).then(() => {
                                       resolve(mockSetupData['arguments']);
                                    }
                                 );
                              } else {
                                 resolve(mockSetupData['arguments']);
                              }
                           }
                        )
                        .catch(( error ) => {
                           console.debug('Request failed');
                           console.trace(error);
                           reject();
                        });
                  } else {
                     window.KambiWidget.apiReady = ( api ) => {
                        this.widgetModule.api = api;
                        if ( api.VERSION !== this.expectedApiVersion ) {
                           console.warn('Wrong Kambi API version loaded, expected: ' + this.expectedApiVersion + ' got: ' + api.VERSION);
                        }

                        // Request the setup info from the widget api
                        this.requestSetup(( setupData ) => {
                           // Apply the config data to the core
                           this.applySetupData(setupData, setDefaultHeight);

                           // TODO: Move this to widgets so we don't request them when not needed
                           // Request the outcomes from the betslip so we can update our widget, also sets up a subscription for future betslip updates
                           this.widgetModule.requestBetslipOutcomes();
                           // Request the odds format that is set in the sportsbook, this also sets up a subscription for future odds format changes
                           this.widgetModule.requestOddsFormat();

                           if ( this.translationModule != null ) {
                              this.translationModule.fetchTranslations(setupData.clientConfig.locale).then(() => {
                                    resolve(setupData['arguments']);
                                 }
                              );
                           } else {
                              resolve(setupData['arguments']);
                           }
                        });
                     };
                     // Setup the response handler for the widget api
                     window.KambiWidget.receiveResponse = ( dataObject ) => {
                        this.widgetModule.handleResponse(dataObject);
                     };
                  }
               } else {
                  console.warn('Kambi widget API not loaded');
                  reject();
               }
            }
         );
      },

      /**
       * Applies setup data to current component
       * @param setupData
       * @param setDefaultHeight
       */
      applySetupData ( setupData, setDefaultHeight ) {

         // Set the configuration
         this.setConfig(setupData.clientConfig);

         // Set page info
         this.setPageInfo(setupData.pageInfo);

         // Set versions
         this.setVersions(setupData.versions);

         // set default height
         if ( setDefaultHeight === true ) {
            this.setHeight(setupData.height);
         }
         // flag the api as ready
         this.apiReady = true;
      },

      /**
       * Set config object of CoreLibrary
       * @param {Object} config
       */
      setConfig ( config ) {
         for ( var i in config ) {
            if ( config.hasOwnProperty(i) && this.config.hasOwnProperty(i) ) {
               this.config[i] = config[i];
            }
         }
         // Make sure that the routeRoot is not null or undefined
         if ( this.config.routeRoot == null ) {
            this.config.routeRoot = '';
         } else if ( this.config.routeRoot.length > 0 && this.config.routeRoot.slice(-1) !== '/' ) {
            // If the routeRoot is not empty we need to make sure it has a trailing slash
            this.config.routeRoot += '/';
         }
      },

      /**
       * Sets page info
       * @param {Object} pageInfo
       */
      setPageInfo ( pageInfo ) {
         // Check if the last character in the pageParam property is a slash, if not add it so we can use this property in filter requests
         if ( pageInfo.pageType === 'filter' && pageInfo.pageParam.substr(-1) !== '/' ) {
            pageInfo.pageParam += '/';
         }
         this.pageInfo = pageInfo;
      },

      /**
       * Sets versions
       * @param {Object} versions
       */
      setVersions ( versions ) {
         for ( var i in versions ) {
            if ( versions.hasOwnProperty(i) && this.apiVersions.hasOwnProperty(i) ) {
               this.apiVersions[i] = versions[i];
            }
         }
      },

      /**
       * Set args object
       * @param {Object} args
       */
      setArgs ( args ) {
         this.args = args;
      },

      /**
       * Requests setup data from widgetModule
       * @param callback
       */
      requestSetup ( callback ) {
         this.widgetModule.requestSetup(callback);
      },

      /**
       * Logs the response
       * @param response
       */
      receiveRespone ( response ) {
         console.debug(response);
      },

      /**
       * Sets odds format
       * @param oddsFormat
       */
      setOddsFormat ( oddsFormat ) {
         this.config.oddsFormat = oddsFormat;
      },

      /**
       * Sets widget height
       * @param {Number} height
       */
      setHeight ( height ) {
         this.height = height;
         this.widgetModule.setHeight(height);
      },

      /**
       * Makes an request using Fetch (polyfill) library
       * @param {String} url
       * @returns {Promise}
       */
      getData ( url ) {
         return fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch(( error ) => {
               console.debug('Error fetching data');
               console.trace(error);
               throw error;
            });
      },

      /**
       * Makes an ajax request using Fetch (polyfill) library
       * @param {String} url
       * @returns {Promise}
       */
      getFile ( url ) {
         return fetch(url)
            .then(checkStatus)
            .catch(( error ) => {
               console.debug('Error fetching file');
               console.trace(error);
               throw error;
            });
      },

      /**
       * Sets widget tracking name variable
       * @param name
       */
      setWidgetTrackingName ( name ) {
         this.widgetTrackingName = name;
      }
   };

})();
