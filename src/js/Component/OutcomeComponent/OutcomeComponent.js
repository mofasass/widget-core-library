(function () {

   rivets.binders['outcome-suspended'] = function ( el, property ) {
      var cssClass = 'KambiWidget-outcome--suspended';
      if ( property === true ) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   rivets.binders['outcome-selected'] = function ( el, property ) {
      var cssClass = 'KambiWidget-outcome--selected';

      if ( property === true ) {
         el.classList.add(cssClass);
      } else {
         el.classList.remove(cssClass);
      }
   };

   var OutcomeViewController = function ( attributes ) {
      this.data = attributes;
      this.selected = false;
      this.label = '';
      this.coreLibraryConfig = CoreLibrary.config;

      if ( this.data.eventAttr != null && this.data.eventAttr.betOffers != null) {
         this.betOffer = this.data.eventAttr.betOffers.find(( betOffer ) => {
            if ( betOffer.id === this.data.outcomeAttr.betOfferId ) {
               return true;
            }
         });
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

      this.toggleOutcome = function ( event, scope ) {
         if ( scope.selected === false ) {
            CoreLibrary.widgetModule.addOutcomeToBetslip(scope.data.outcomeAttr.id);
         } else {
            CoreLibrary.widgetModule.removeOutcomeFromBetslip(scope.data.outcomeAttr.id);
         }
      };

      this.getLabel = function () {
         if ( this.data.outcomeAttr != null ) {
            if ( this.data.eventAttr != null ) {
               return CoreLibrary.utilModule.getOutcomeLabel(this.data.outcomeAttr, this.data.eventAttr);
            } else {
               return this.data.outcomeAttr.label;
            }
         }
      };

      this.getOddsFormat = function () {
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

   rivets.components['outcome-component'] = {
      template: function () {
         return `
<button
      rv-on-click="toggleOutcome"
      rv-disabled="betOffer.suspended | == true"
      rv-outcome-selected="selected"
      rv-outcome-suspended="betOffer.suspended"
      type="button"
      role="button"
      class="KambiWidget-outcome kw-link l-flex-1 l-ml-6">
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

      initialize: function ( el, attributes ) {
         if ( attributes.outcomeAttr == null ) {
            return false;
         }
         el.classList.add('l-flexbox');
         el.classList.add('l-flex-1');
         return new OutcomeViewController(attributes);
      }
   };

   rivets.components['outcome-component-no-label'] = {
      template: function () {
         return `
<button
      rv-on-click="toggleOutcome"
      rv-disabled="betOffer.suspended | == true"
      rv-outcome-selected="selected"
      rv-outcome-suspended="betOffer.suspended"
      type="button"
      role="button"
      class="KambiWidget-outcome kw-link l-ml-6">
   <div class="l-flexbox l-pack-center">
      <div class="KambiWidget-outcome__odds-wrapper">
         <span class="KambiWidget-outcome__odds" rv-text="getOddsFormat < data.outcomeAttr.odds coreLibraryConfig.oddsFormat" ></span>
      </div>
   </div>
</button>
         `;
      },

      initialize: function ( el, attributes ) {
         return new OutcomeViewController(attributes);
      }
   };
})();