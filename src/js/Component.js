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

      constructor: function (options) {
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

         if (options == null) {
            options = {};
         }
         // setting options that can be received in the constructor
         var optionsKeys = ['defaultArgs', 'rootElement'];
         optionsKeys.forEach(function (key) {
            if (typeof options[key] !== 'undefined') {
               this[key] = options[key];
            }
         }.bind(this));

         if (typeof this.htmlTemplate === 'string' && typeof this.htmlTemplateFile === 'string') {
            throw new Error('Widget can not have htmlTemplate and htmlTemplateFile set at the same time');
         }
         if (this.rootElement == null) {
            throw new Error('options.rootElement not set, please pass a HTMLElement or a CSS selector');
         }

         this.scope.args = this.defaultArgs;

         var fetchHtmlPromise;
         if (typeof this.htmlTemplateFile === 'string') {
            fetchHtmlPromise = CoreLibrary.getFile(this.htmlTemplateFile)
               .then(function (response) {
                  return response.text();
               })
               .then(function (html) {
                  this.htmlTemplate = html;
                  return this.htmlTemplate;
               }.bind(this));
         } else {
            // just resolve the promise
            fetchHtmlPromise = new Promise ( function ( resolve ) {
               resolve();
            });
         }

         var coreLibraryPromise;
         if (CoreLibrary.apiReady === true) {
            coreLibraryPromise = new Promise(function ( resolve, reject ) {
               resolve();
            });
         } else {
            coreLibraryPromise = new Promise(function ( resolve, reject ) {
               CoreLibrary.init()
                  .then(function ( widgetArgs ) {
                     Object.keys(widgetArgs).forEach(function ( key ) {
                        this.scope.args[key] = widgetArgs[key];
                     }.bind(this));
                     v
                     var baseWidgetCSS = '//c3-static.kambi.com/sb-mobileclient/widget-api/1.0.0.10/resources/css/';
                     this.scope.widgetCss = '//c3-static.kambi.com/sb-mobileclient/widget-api/'
                        + this.widgetModule.api.VERSION
                        + '/resources/css/'
                        + CoreLibrary.config.clientConfig.customer
                        + '/'
                        + CoreLibrary.config.clientConfig.offering
                        + '/widgets.css';
                     resolve();
                  }.bind(this));
            }.bind(this));
         }

         // fetches the component HTML in parallel with the Kambi API setup request
         // decreasing load time
         Promise.all([coreLibraryPromise, fetchHtmlPromise])
            .then(function () {
               if (typeof this.rootElement === 'string') {
                  this.rootElement = document.querySelector(this.rootElement);
               }

               for (var i = 0; i < this.rootElement.attributes.length; ++i) {
                  var at = this.rootElement.attributes[i];
                  if (at.name.indexOf('data-') === 0) {
                     var name = at.name.slice(5); // removes the 'data-' from the string
                     this.scope[name] = at.value;
                  }
               }

               if (typeof this.htmlTemplate === 'string') {
                  this.rootElement.innerHTML = this.htmlTemplate;
               }

               this.view = rivets.bind(this.rootElement, this.scope);

               this.init(CoreLibrary.config.arguments);
            }.bind(this))
         .catch(function ( error ) {
            console.debug('init error');
            console.trace(error);
         });
      }
   });
})();
