require('./HeaderComponent/HeaderComponent');
require('./OutcomeComponent/OutcomeComponent');
require('./PaginationComponent/PaginationComponent');

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

         var coreLibraryPromise;
         if ( CoreLibrary.apiReady === true ) {
            coreLibraryPromise = new Promise(( resolve, reject ) => {
               resolve();
            });
         } else {
            coreLibraryPromise = new Promise(( resolve, reject ) => {
               CoreLibrary.init()
                  .then(( widgetArgs ) => {
                     if ( widgetArgs == null ) {
                        widgetArgs = {};
                     }
                     var apiVersion = CoreLibrary.widgetModule.api.VERSION;
                     if ( apiVersion == null ) {
                        apiVersion = '1.0.0.13';
                     }
                     this.scope.widgetCss = '//c3-static.kambi.com/sb-mobileclient/widget-api/' +
                        apiVersion +
                        '/resources/css/' +
                        CoreLibrary.config.customer +
                        '/' +
                        CoreLibrary.config.offering +
                        '/widgets.css';

                     var externalArgsUrl = widgetArgs.externalArgsUrl || this.defaultArgs.externalArgsUrl;
                     if (externalArgsUrl != null) {
                        CoreLibrary.getData(externalArgsUrl)
                           .then((externalArgs) => {
                              args = mergeObjs(this.defaultArgs, widgetArgs, externalArgs);
                              resolve();
                           }).catch((err) => {
                              console.log('Unable to load or parse external args');
                              args = mergeObjs(this.defaultArgs, widgetArgs);
                              resolve();
                           });
                     } else {
                        args = mergeObjs(this.defaultArgs, widgetArgs);
                        resolve();
                     }
                  });
            });
         }

         return coreLibraryPromise
            .then(() => {
               // applying conditionalArgs (see #KSBWI-653)
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

               this.scope.args = args;

               if ( typeof this.rootElement === 'string' ) {
                  this.rootElement = document.querySelector(this.rootElement);
               }

               for ( var i = 0; i < this.rootElement.attributes.length; ++i ) {
                  var at = this.rootElement.attributes[i];
                  if ( at.name.indexOf('data-') === 0 ) {
                     var name = at.name.slice(5); // removes the 'data-' from the string
                     this.scope[name] = at.value;
                  }
               }

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

