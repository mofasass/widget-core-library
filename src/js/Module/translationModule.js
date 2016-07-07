/**
 * @module translationModule
 * @memberOf CoreLibrary
 */
window.CoreLibrary.translationModule = (() => {
   'use strict';

   rivets.formatters.translate = ( ...args ) => {
      return CoreLibrary.translationModule.getTranslation.apply(CoreLibrary.translationModule, args);
   };

   return {
      i18nStrings: {},

      /**
       * Makes a request to fetch all locales strings.
       * The locale json file resides in CoreLibrary/i18n folder; it is populated with locales during build process
       * @param {String} locale Locale string, eg: sv_SE
       * @returns {Promise}
       */
      fetchTranslations ( locale ) {
         if ( locale == null ) {
            locale = 'en_GB';
         }
         var self = this;
         var path = 'i18n/';
         if ( CoreLibrary.development === true ) {
            path = 'transpiled/i18n/';
         }
         return new Promise(( resolve, reject ) => {
            window.CoreLibrary.getData(path + locale + '.json')
               .then(( response ) => {
                  CoreLibrary.translationModule.i18nStrings = response;
                  resolve();
               })
               .catch(( error ) => {
                  if ( locale !== 'en_GB' ) {
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
       * Returns translated string based of a provided key
       * @param {String} key
       * @param args
       * @returns {*}
       */
      getTranslation: function ( key, ...args ) {
         if ( this.i18nStrings[key] != null ) {
            var str = this.i18nStrings[key];
            for ( var i = 1; i < args.length; i++ ) {
               var replacement = args[i] || '';
               str = str.replace('{' + (i - 1) + '}', replacement);
            }
            return str;
         }
         return key;
      }
   };

})();
