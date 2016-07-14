/**
 * @module OutcomeComponent
 */
(() => {
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
    * @mixin outcome-suspended
    * @param {element} el
    * @param {boolean} property
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
    * @mixin outcome-selected
    * @param {element} el
    * @param {boolean} property
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
         if ( CoreLibrary.widgetModule.betslipIds.indexOf(this.data.outcomeAttr.id) !== -1 ) {
            this.selected = true;
         }

         CoreLibrary.widgetModule.events.on('OUTCOME:ADDED:' + this.data.outcomeAttr.id, ( data, event ) => {
            this.selected = true;
         });

         CoreLibrary.widgetModule.events.on('OUTCOME:REMOVED:' + this.data.outcomeAttr.id, ( data, event ) => {
            this.selected = false;
         });
      }

      /**
       * Toggle outcomes.
       * @param event
       * @param scope
       */
      this.toggleOutcome = ( event, scope ) => {
         if ( scope.selected === false ) {
            CoreLibrary.widgetModule.addOutcomeToBetslip(scope.data.outcomeAttr.id);
         } else {
            CoreLibrary.widgetModule.removeOutcomeFromBetslip(scope.data.outcomeAttr.id);
         }
      };

      /**
       * Returns label.
       * If data contains 'customLabel' it will return that custom value
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
    * Outcome component.
    * @example
    * <outcome-component
    *    rv-each-outcome="betoffer.outcomes"
    *    outcome-attr="outcome"
    *    event-attr="event">
    * </outcome-component>
    * @mixin outcome-component
    * @type {{template: (function()), initialize: (function(*, *=))}}
    */
   rivets.components['outcome-component'] = {

      /**
       * Returns the template.
       * @returns {string}
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
                        rv-text="getOddsFormat < data.outcomeAttr.odds coreLibraryConfig.oddsFormat">
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
    * <outcome-component-no-label
    *     outcome-attr="outcome" event-attr="event">
    * </outcome-component-no-label>
    * @mixin outcome-component-no-label
    * @type {{template: (function()), initialize: (function(*, *=))}}
    */
   rivets.components['outcome-component-no-label'] = {

      /**
       * Template outcome-component-no-label.
       * @returns {string}
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
                  class="KambiWidget-outcome kw-link">
               <div class="l-flexbox l-pack-center">
                  <div class="KambiWidget-outcome__odds-wrapper">
                     <span class="KambiWidget-outcome__odds" rv-text="getOddsFormat < data.outcomeAttr.odds coreLibraryConfig.oddsFormat" ></span>
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
       */
      initialize ( el, attributes ) {
         return new OutcomeViewController(attributes);
      }
   };
})();
