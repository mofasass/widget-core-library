import coreLibrary from '../coreLibrary';

/* we are not using the translationModule.getTranslation
because the translations files are set in the widgets, we don't want to force the widgets to include static labels for outcomes. If we need more labels than "draw" we might want to consider doing some build-time magic to not include all the locales values */
const labelsTranslations = {
   draw: {
      cs_CZ: 'Remíza',
      da_DK: 'Uafgjort',
      de_AT: 'Unentschieden',
      de_CH: 'Unentschieden',
      de_DE: 'Unentschieden',
      el_GR: 'Ισοπαλία',
      en_AU: 'Draw',
      en_GB: 'Draw',
      es_ES: 'Empate',
      et_EE: 'Viik',
      fi_FI: 'Tasapeli',
      fr_BE: 'Nul',
      fr_CH: 'Nul',
      fr_FR: 'Nul',
      hu_HU: 'Döntetlen',
      it_IT: 'Pareggio',
      lt_LT: 'Lygiosios',
      lv_LV: 'Neizšķirts',
      nl_BE: 'Gelijkspel',
      nl_NL: 'Gelijkspel',
      no_NO: 'Uavgjort',
      pl_PL: 'Remis',
      pt_BR: 'Empate',
      pt_PT: 'Empate',
      ro_RO: 'Egalitate',
      ru_RU: 'Ничья',
      sv_SE: 'Oavgjort',
      tr_TR: 'Draw',
   }
};

/**
 * Module with utility functions
 * @module utilModule
 */
export default {

   /**
    * Util method for return unique items between arrays
    * @param {Array} A First array
    * @param {Array} B Second array
    * @returns {Array}
    * @private
    */
   diffArray (A, B) {
      var map = {}, C = [];

      for (var i = B.length; i--;) {
         map[B[i]] = null;
      } // any other value would do

      for (var i = A.length; i--;) {
         if (!map.hasOwnProperty(A[i])) {
            C.push(A[i]);
         }
      }
      return C;
   },

   /**
    * Checks deep equality of two object.
    * @param {object} x First object
    * @param {object} y Second object
    * @returns {boolean}
    */
   equals (x, y) {
      if (x === y) return true;
      if ( !(x instanceof Object) || !(y instanceof Object)) return false;
      if (x.constructor !== y.constructor) return false;
      /* eslint-disable no-continue */
      for (var p in x) {
         if (!x.hasOwnProperty(p)) continue;
         if (!y.hasOwnProperty(p)) return false;
         if (x[p] === y[p]) continue;
         if (typeof x[p] !== 'object') return false;
         if (!this.equals(x[p], y[p])) return false;
      }
      /* eslint-enable no-continue */

      for (p in y) {
         if (y.hasOwnProperty(p) && !x.hasOwnProperty(p) ) return false;
      }

      return true;
   },

   /**
    * Returns deep copy of given object.
    * @param {object} x Object to be cloned
    */
   clone (x) {
      return JSON.parse(JSON.stringify(x));
   },

   /* Replaces expressions like "{customer}" from the provided string
    * to the value the have in the coreLibrary.config object
    * @param {String} str the string to replace the expressions in
    */
   replaceConfigParameters (str) {
      if (str == null) {
         return str;
      }
      const config = coreLibrary.config;
      Object.keys(config).forEach((key) => {
         var regex = new RegExp('{' + key + '}', 'g');
         var value = config[key];
         str = str.replace(regex, value);
      });
      return str;
   },

   /**
    * Get decimal formatted odds.
    * @param {Number} odds Odds number
    * @returns {Number}
    */
   getOddsDecimalValue (odds) {
      if (odds < 100) {
         return odds.toFixed(2);
      } else if (odds < 1000) {
         return odds.toFixed(1);
      } else {
         return odds.toFixed(0);
      }
   },

   /**
    * Returns the outcome label translated.
    * @param {Object} outcome A betoffer outcome object
    * @param {Object} event Event object
    * @returns {string}
    */
   getOutcomeLabel (outcome, event) {
      switch (outcome.type) {
         case 'OT_ONE': // Outcome has label 1. Applies to Threeway bet offers.
            return event.homeName;
         case 'OT_CROSS': // Outcome has label X. Applies to Threeway bet offers.
            return labelsTranslations.draw[coreLibrary.config.locale];
         case 'OT_TWO': // Outcome has label 2. Applies to Threeway bet offers.
            return event.awayName;
         case 'OT_OVER': // The “Over” outcome in Over/Under bet offer.
            return outcome.label + ' ' + (outcome.line / 1000);
         case 'OT_UNDER': // The “Under” outcome in Over/Under bet offer.
            return outcome.label + ' ' + (outcome.line / 1000);
         // Todo: Impelement these responses with translations
         // case 'OT_ODD': //The “Odd” outcome in Odd/Even bet offer.
         // break;
         // case 'OT_EVEN': //The “Even” outcome in Odd/Even bet offer.
         // break;
         // case 'OT_ONE_ONE': //1-1 outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_ONE_TWO': //1-2 outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_ONE_CROSS': //1-X outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_TWO_ONE': //2-1 outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_TWO_TWO': //2-2 outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_TWO_CROSS': //2-X outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_CROSS_ONE': //X-1 outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_CROSS_TWO': //X-2 outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_CROSS_CROSS': //X-X outcome in Halftime/fulltime bet offer.
         // break;
         // case 'OT_ONE_OR_TWO': //1 or 2 outcome in Double Chance bet offer.
         // break;
         // case 'OT_ONE_OR_CROSS': //1 or X outcome in Double Chance bet offer.
         // break;
         // case 'OT_CROSS_OR_TWO': //X or 2 outcome in Double Chance bet offer.
         // break;
         // case 'OT_YES': //“Yes” outcome in Head To Head and Yes/No bet offer.
         // break;
         // case 'OT_NO': //“No” outcome in Head To Head and Yes/No bet offer.
         // break;
         // case 'OT_OTHER': //“Other results” outcome in Result bet offer.
         // break;
         // case 'OT_UNTYPED': //Outcome does not have type.
         // break;
         // case 'OT_WC_HOME': //Outcome has label Home Win. Applies to WinCast bet offers.
         // break;
         // case 'OT_WC_DRAW': //Outcome has label Draw. Applies to WinCast bet offers.
         // break;
         // case 'OT_WC_AWAY': //Outcome has label Away Win. Applies to WinCast bet offers.
         // break;

         default:
            console.warn('Unhandled outcome type: ' + outcome.type, outcome);
            return outcome.label;
      }
   }
};
