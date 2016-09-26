import coreLibrary from '../coreLibrary';
/**
 * Module with internationalization methods
 * @module translationModule
 * @memberOf coreLibrary
 */
export default {
   /**
    * fetched from the i18n folder JSON files. Only the current
    * locale strings are fetched
    * @type {Object}
    */
   i18nStrings: {},

   /**
    * Makes a request to fetch all locales strings.
    * The locale json file resides in coreLibrary/i18n folder; it is populated with locales during build process
    * @param {String} locale Locale string, eg: sv_SE
    * @returns {Promise}
    * @private
    */
   fetchTranslations (locale) {
      if (locale == null) {
         locale = 'en_GB';
      }
      var self = this;
      var path = 'i18n/';
      if (coreLibrary.development === true) {
         path = 'transpiled/i18n/';
      }
      return new Promise((resolve, reject) => {
         coreLibrary.getData(path + locale + '.json')
            .then((response) => {
               this.i18nStrings = response;
               resolve();
            })
            .catch((error) => {
               if (locale !== 'en_GB') {
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
    * Returns translated string based of a provided key.
    * @param {String} key Key to fetch translation for
    * @param {...String} args arguments to replace inside the translated string
    * @example
    * en_GB.json:
    * { "welcomeUserToPlace": "Welcome {0} to {1}" }
    * Javascriot:
    * getTranslation('welcomeUserToPlace', 'Daniel', 'Stadium') => 'Welcome Daniel to Stadium'
    * @returns {String}
    */
   getTranslation: function (key, ...args) {
      if (this.i18nStrings[key] != null) {
         var str = this.i18nStrings[key];
         for (var i = 0; i < args.length; i++) {
            var replacement = args[i] || '';
            str = str.replace('{' + i + '}', replacement);
         }
         return str;
      }
      return key;
   }
};
