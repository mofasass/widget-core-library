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
    const kambiI18n = window.kambiI18n
    if (kambiI18n == null || locale == null || locale.length != 5) {
      return key
    }
    let strings = null
    if (kambiI18n[locale] == null) {
      // falling back to another locale, trying one that matches the first language name, then falling back to en_GB
      const language = locale.split('_')[0]
      if (language.length !== 2) {
        return key
      }
      if (language === 'en' && kambiI18n.en_GB != null) {
        strings = kambiI18n.en_GB
      } else {
        const locales = Object.keys(kambiI18n).sort()
        for (let i = 0; i < locales.length; i++) {
          if (locales[i].split('_')[0] === language) {
            strings = kambiI18n[locales[i]]
            break
          }
        }
      }
    } else {
      strings = kambiI18n[locale]
    }

    if (strings == null) {
      if (kambiI18n.en_GB != null) {
        strings = kambiI18n.en_GB
      } else {
        return key
      }
    }
    var str = strings[key]
    if (str == null) {
      return key
    }
    for (let i = 0; i < args.length; i++) {
      var replacement = args[i] || ''
      str = str.replace('{' + i + '}', replacement)
    }
    return str
  },
}
