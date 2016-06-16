(function () {
   CoreLibrary.Component = Stapes.subclass({
      /** object with default values from args if they are not present in
       * the Kambi API provided ones
       */
      defaultArgs: {},

      /**
       * If string this value is appended to rootElement with the innerHTML DOM call
       * essentially parsing the the text as HTML
       */
      htmlTemplate: null,

      /**
       * Same as htmlTemplate, but uses this value as a path to fetch an HTML file
       * Do not use at the same time as htmlTemplate
       */
      htmlTemplateFile: null,

      constructor ( options ) {
         /** object to be used in the HTML templates for data binding */
         this.scope = {};

         /**
          * Rivets view object, binds this.scope to this.rootElement
          */
         this.view = null;

         /**
          * HTML element to in which rivets.bind will be called,
          * if string uses document.querySelector to get the element
          */
         this.rootElement = null;

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

         if ( typeof this.htmlTemplate === 'string' && typeof this.htmlTemplateFile === 'string' ) {
            throw new Error('Widget can not have htmlTemplate and htmlTemplateFile set at the same time');
         }
         if ( this.rootElement == null ) {
            throw new Error('options.rootElement not set, please pass a HTMLElement or a CSS selector');
         }

         this.scope.args = this.defaultArgs;

         var fetchHtmlPromise;
         if ( typeof this.htmlTemplateFile === 'string' ) {
            fetchHtmlPromise = CoreLibrary.getFile(this.htmlTemplateFile)
               .then(( response ) => {
                  return response.text();
               })
               .then(( html ) => {
                  this.htmlTemplate = html;
                  return this.htmlTemplate;
               });
         } else {
            // just resolve the promise
            fetchHtmlPromise = new Promise(( resolve ) => {
               resolve();
            });
         }

         var coreLibraryPromise;
         if ( CoreLibrary.apiReady === true ) {
            coreLibraryPromise = new Promise(( resolve, reject ) => {
               resolve();
            });
         } else {
            coreLibraryPromise = new Promise(( resolve, reject ) => {
               CoreLibrary.init()
                  .then(( widgetArgs ) => {
                     if ( widgetArgs != null ) {
                        Object.keys(widgetArgs).forEach(( key ) => {
                           this.scope.args[key] = widgetArgs[key];
                        });
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
                     resolve();
                  });
            });
         }

         // fetches the component HTML in parallel with the Kambi API setup request
         // decreasing load time
         return Promise.all([coreLibraryPromise, fetchHtmlPromise])
            .then(() => {
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
                  this.rootElement.innerHTML = this.htmlTemplate;
               }

               this.view = rivets.bind(this.rootElement, this.scope);

               this.init();
            });
      }
   });
})();
