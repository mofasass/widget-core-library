(() => {
   'use strict';

   // shallow merges objects together into a new object, right-most parameters have precedence
   var mergeObjs = (...objs) => {
      var ret = {};
      objs.forEach((obj) => {
         obj = obj || {};
         Object.keys(obj).forEach((key) => {
            ret[key] = obj[key];
         });
      });
      return ret;
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
      constructor ( options ) {

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

         if ( options == null ) {
            options = {};
         }

         // setting options that can be received in the constructor
         var optionsKeys = ['defaultArgs', 'rootElement'];
         optionsKeys.forEach(( key ) => {
            if ( typeof options[key] !== 'undefined' ) {
               this[key] = options[key];
            }
         });

         if ( this.rootElement == null ) {
            throw new Error('options.rootElement not set, please pass a HTMLElement or a CSS selector');
         }

         var args = {};

         var getSelfFulfillingPromise = () => {
            return new Promise((resolve) => {
               resolve();
            });
         };

         // promise that waits for the core library to be ready
         var coreLibraryPromise = () => {
            if ( CoreLibrary.apiReady === true ) {
               return getSelfFulfillingPromise();
            }
            return CoreLibrary.init();
         };

         // setts scope.widgetCss to load the operator-specific stylesheets
         var handleWidgetCss = () => {
            var apiVersion = CoreLibrary.widgetModule.api.VERSION;
            if ( apiVersion == null ) {
               apiVersion = CoreLibrary.expectedApiVersion;
            }
            this.scope.widgetCss = '//c3-static.kambi.com/sb-mobileclient/widget-api/' +
               apiVersion +
               '/resources/css/' +
               CoreLibrary.config.customer +
               '/' +
               CoreLibrary.config.offering +
               '/widgets.css';
         };

         // loads the external arguments provided in args.externalArgsUrl
         var externalArgsPromise = (widgetArgs) => {
            var externalArgsUrl = widgetArgs.externalArgsUrl || this.defaultArgs.externalArgsUrl;
            if (externalArgsUrl != null) {
               return CoreLibrary.getData(externalArgsUrl)
                  .then((externalArgs) => {
                     args = mergeObjs(this.defaultArgs, widgetArgs, externalArgs);
                  }).catch((err) => {
                     console.log('Unable to load or parse external args');
                     args = mergeObjs(this.defaultArgs, widgetArgs);
                  });
            } else {
               args = mergeObjs(this.defaultArgs, widgetArgs);
               return getSelfFulfillingPromise();
            }
         };

         // applying conditionalArgs as specified by args.conditionalArgs (see #KSBWI-653)
         var handleConditionalArgs = () => {
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
                     args = mergeObjs(args, carg.args);
                  }
               });
            }
         };

         // handles custom CSS stylesheet as specified by args.customCssUrl and args.customCssUrlFallback
         var customCssPromise = (customCssUrl, customCssUrlFallback) => {
            if (customCssUrl == null) {
               return;
            }
            if (customCssUrlFallback == null) {
               customCssUrlFallback = '';
            }

            Object.keys(CoreLibrary.config).forEach((key) => {
               var regex = new RegExp('{' + key + '}', 'g');
               var value = CoreLibrary.config[key];
               customCssUrl = customCssUrl.replace(regex, value);
               customCssUrlFallback = customCssUrlFallback.replace(regex, value);
            });

            var fetchFallback = () => {
               return fetch(customCssUrlFallback)
                  .then(( response ) => {
                     if ( response.status >= 200 && response.status < 300 ) {
                        this.scope.customCss = customCssUrlFallback;
                     } else {
                        console.debug('Error fetching custom css fallback');
                     }
                     return response;
                  }).catch(( error ) => {
                     console.debug('Error fetching custom css fallback');
                     return error;
                  });
            };

            return fetch(customCssUrl)
               .then(( response ) => {
                  // file actually exists
                  if ( response.status >= 200 && response.status < 300 ) {
                     this.scope.customCss = customCssUrl;
                  } else {
                     if (customCssUrlFallback !== '') {
                        console.debug('Error fetching custom css, trying fallback');
                        return fetchFallback();
                     } else {
                        console.debug('Error fetching custom css, no fallback present');
                        return response;
                     }
                  }
                  return response;
               }).catch(( error ) => {
                  if (customCssUrlFallback !== '') {
                     console.debug('Error fetching custom css, trying fallback');
                     return fetchFallback();
                  }
                  console.debug('Error fetching custom css, no fallback present');
                  return error;
               });
         };

         return coreLibraryPromise()
            .then(( widgetArgs ) => {
               if ( widgetArgs == null ) {
                  widgetArgs = {};
               }
               handleWidgetCss();
               return externalArgsPromise(widgetArgs);
            }).then(() => {
               handleConditionalArgs();

               // we don't need to wait for this promise (like we do
               // with externalArgsPromise) to call
               // the widget init() function because it just adds
               // a stylesheet to the page
               this.customCssPromise = customCssPromise(args.customCssUrl, args.customCssUrlFallback);

               this.scope.args = args;

               if ( typeof this.rootElement === 'string' ) {
                  this.rootElement = document.querySelector(this.rootElement);
               }

               // if htmlTemplate is defined place that as HTML inside rootElement
               if ( typeof this.htmlTemplate === 'string' ) {
                  if ( this.htmlTemplate.length < 100 && window[this.htmlTemplate] != null ) {
                     this.rootElement.innerHTML = window[this.htmlTemplate];
                  } else {
                     this.rootElement.innerHTML = this.htmlTemplate;
                  }
               }

               this.view = rivets.bind(this.rootElement, this.scope);

               this.init();
            });
      }
   });
})();
