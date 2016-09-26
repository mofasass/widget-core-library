import rivets from 'rivets';
import widgetModule from '../../Module/widgetModule';
import CoreLibrary from '../../coreLibrary';

export default (() => {
   'use strict';

   /**
    * Outcome suspended binder.
    * Adds 'KambiWidget-outcome--suspended' class to attached element
    * @example
    * <outcome-component
    *     rv-outcome-suspended="suspended"
    *     outcome-attr="outcome"
    *     event-attr="event">
    * </outcome-component-no-label>
    * @memberof rivets
    * @mixin binder "outcome-suspended"
    * @param {element} el
    * @param {boolean} property
    * @private
    */
   rivets.binders['outcome-suspended'] = ( el, property ) => {
      var cssClass = 'KambiWidget-outcome--suspended';
      if ( property === true ) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   /**
    * Outcome selected binder.
    * Adds 'KambiWidget-outcome--selected' class to attached element
    * @example
    * <outcome-component
    *     rv-outcome-selected="selected"
    *     outcome-attr="outcome"
    *     event-attr="event">
    * </outcome-component-no-label>
    * @memberof rivets
    * @mixin binder "outcome-selected"
    * @param {element} el
    * @param {boolean} property
    * @private
    */
   rivets.binders['outcome-selected'] = ( el, property ) => {
      var cssClass = 'KambiWidget-outcome--selected';

      if ( property === true ) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   /**
    * Outcome view controller.
    * @param {object} attributes Attributes
    * @memberOf module:OutcomeComponent#
    * @private
    */
   var OutcomeViewController = function ( attributes ) {
      this.data = attributes;
      this.selected = false;
      this.label = '';
      this.coreLibraryConfig = CoreLibrary.config;

      if ( this.data.eventAttr != null && this.data.eventAttr.betOffers != null ) {
         this.betOffer = this.data.eventAttr.betOffers.filter(( betOffer ) => {
            if ( betOffer.id === this.data.outcomeAttr.betOfferId ) {
               return true;
            }
         })[0];
      }

      if ( this.data.outcomeAttr != null ) {
         if (widgetModule.betslipIds.indexOf(this.data.outcomeAttr.id) !== -1 ) {
            this.selected = true;
         }

         widgetModule.events.on('OUTCOME:ADDED:' + this.data.outcomeAttr.id, ( data, event ) => {
            this.selected = true;
         });

         widgetModule.events.on('OUTCOME:REMOVED:' + this.data.outcomeAttr.id, ( data, event ) => {
            this.selected = false;
         });
      }

      /**
       * Toggle outcomes.
       * @param event
       * @param scope
       * @private
       */
      this.toggleOutcome = ( event, scope ) => {
         if ( scope.selected === false ) {
            widgetModule.addOutcomeToBetslip(scope.data.outcomeAttr.id);
         } else {
            widgetModule.removeOutcomeFromBetslip(scope.data.outcomeAttr.id);
         }
      };

      /**
       * Returns label.
       * If data contains 'customLabel' it will return that custom value
       * @private
       */
      this.getLabel = () => {
         if ( this.data.customLabel ) {
            return this.data.customLabel;
         }

         if ( this.data.outcomeAttr != null ) {
            if ( this.data.eventAttr != null ) {
               return CoreLibrary.utilModule.getOutcomeLabel(this.data.outcomeAttr, this.data.eventAttr);
            } else {
               return this.data.outcomeAttr.label;
            }
         }
      };

      /**
       * Returns Odds format.
       * @returns {*}
       * @private
       */
      this.getOddsFormat = () => {
         switch ( this.coreLibraryConfig.oddsFormat ) {
            case 'fractional':
               return this.data.outcomeAttr.oddsFractional;
            case 'american':
               return this.data.outcomeAttr.oddsAmerican;
            default:
               return CoreLibrary.utilModule.getOddsDecimalValue(this.data.outcomeAttr.odds / 1000);
         }
      };
   };

   /**
    * Outcome component
    * @example
    * <outcome-component
    *    rv-each-outcome="betoffer.outcomes"
    *    outcome-attr="outcome"
    *    event-attr="event">
    * </outcome-component>
    * @memberof rivets
    * @mixin component "outcome-component"
    * @property {Object} outcome-attr An (single) outcome object
    * @property {Object} event-attr The event itself
    * @property {String} customLabel Optional, custom label to show
    */
   rivets.components['outcome-component'] = {
      /**
       * Returns the template.
       * @returns {string}
       * @private
       */
      template () {
         return `
            <button
                  rv-on-click="toggleOutcome"
                  rv-disabled="betOffer.suspended | == true"
                  rv-outcome-selected="selected"
                  rv-outcome-suspended="betOffer.suspended"
                  type="button"
                  role="button"
                  class="KambiWidget-outcome kw-link l-flex-1">
               <div class="KambiWidget-outcome__flexwrap">
                  <div class="KambiWidget-outcome__label-wrapper">
                     <span
                           class="KambiWidget-outcome__label"
                           rv-text="getLabel < data.outcomeAttr.odds data.eventAttr">
                     </span>
                     <span class="KambiWidget-outcome__line"></span>
                  </div>
               <div class="KambiWidget-outcome__odds-wrapper">
                  <span
                        class="KambiWidget-outcome__odds"
                        rv-text="getOddsFormat | call data.outcomeAttr.odds coreLibraryConfig.oddsFormat">
                  </span>
               </div>
            </button>
         `;
      },

      /**
       * Initialize.
       * @param el
       * @param attributes
       * @returns {*}
       * @private
       */
      initialize ( el, attributes ) {
         if ( attributes.outcomeAttr == null ) {
            return false;
         }
         el.classList.add('l-flexbox');
         el.classList.add('l-flex-1');
         return new OutcomeViewController(attributes);
      }
   };

   /**
    * Outcome component without label.
    * @example
    * <outcome-component
    *    rv-each-outcome="betoffer.outcomes"
    *    outcome-attr="outcome"
    *    event-attr="event">
    * </outcome-component>
    * @memberof rivets
    * @mixin component "outcome-component-no-label"
    * @property {Object} outcome-attr An (single) outcome object
    * @property {Object} event-attr The event itself
    */
   rivets.components['outcome-component-no-label'] = {
      /**
       * Template outcome-component-no-label
       * @returns {string}
       * @private
       */
      template () {
         return `
            <button
                  rv-on-click="toggleOutcome"
                  rv-disabled="betOffer.suspended | == true"
                  rv-outcome-selected="selected"
                  rv-outcome-suspended="betOffer.suspended"
                  type="button"
                  role="button"
                  class="KambiWidget-outcome kw-link l-flex-1">
               <div class="l-flexbox l-pack-center">
                  <div class="KambiWidget-outcome__odds-wrapper">
                     <span class="KambiWidget-outcome__odds" rv-text="getOddsFormat | call data.outcomeAttr.odds coreLibraryConfig.oddsFormat" ></span>
                  </div>
               </div>
            </button>
         `;
      },

      /**
       * Initialize outcome-component-no-label.
       * @param el
       * @param attributes
       * @returns {OutcomeViewController}
       * @private
       */
      initialize ( el, attributes ) {
         return new OutcomeViewController(attributes);
      }
   };
})();
