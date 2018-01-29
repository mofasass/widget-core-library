import coreLibrary from '../coreLibrary'

/**
 * Module with internationalization methods
 * Provides a very simple internationalization mechanism
 * that is not relient in any library.
 * The loading of the right internationalization JSON file is handled automatically
 * @module translationModule
 */
export default {
  /**
   * Returns translated string based of a provided key.
   * @param {String} key Key to fetch translation for
   * @param {...String} args arguments to replace inside the translated string
   * @example
   * en_GB.json:
   * { "welcomeUserToPlace": "Welcome {0} to {1}" }
   * Javascript:
   * getTranslation('welcomeUserToPlace', 'Daniel', 'Stadium') => 'Welcome Daniel to Stadium'
   * @returns {String} the localized string
   */
  getTranslation: function(key, ...args) {
    const locale = coreLibrary.config.locale
    if (window.kambiI18n == null || window.kambiI18n == null) {
      return key
    }
    var str = window.kambiI18n[locale][key]
    if (str == null) {
      return key
    }
    for (var i = 0; i < args.length; i++) {
      var replacement = args[i] || ''
      str = str.replace('{' + i + '}', replacement)
    }
    return str
  },
}
