window.CoreLibrary.translationModule = (function () {
   'use strict';

   var translationModule = {
      i18nStrings: {},

      fetchTranslations: function ( locale ) {
         if ( locale == null ) {
            locale = 'en_GB';
         }
         var self = this;
         var path = 'i18n/';
         if (CoreLibrary.development === true) {
            path = 'transpiled/i18n/';
         }
         return new Promise(function ( resolve, reject ) {
            window.CoreLibrary.getData(path + locale + '.json')
               .then(function ( response ) {
                  translationModule.i18nStrings = response;
                  resolve();
               })
               .catch(function ( error ) {
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
      getTranslation: function ( key ) {
         if ( this.i18nStrings[key] != null ) {
            return this.i18nStrings[key];
         }
         return key;
      }
   };

   rivets.formatters.translate = function ( value ) {
      return translationModule.getTranslation(value);
   };

   return translationModule;
})();
