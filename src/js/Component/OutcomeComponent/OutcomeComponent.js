(function () {

   var OutcomeViewController = function ( attributes ) {
      this.data = attributes;
      this.selected = false;
      this.label = '';

      if ( this.data.outcomeAttr != null ) {
         if ( this.data.eventAttr != null ) {
            this.label = CoreLibrary.utilModule.getOutcomeLabel(this.data.outcomeAttr, this.data.eventAttr);
         } else {
            this.label = this.data.outcomeAttr.label;
         }

         if ( CoreLibrary.widgetModule.betslipIds.indexOf(this.data.outcomeAttr.id) !== -1 ) {
            this.selected = true;
         }

         CoreLibrary.widgetModule.events.on('OUTCOME:ADDED:' + this.data.outcomeAttr.id, ( data, event ) => {
            this.selected = true;
         });

         Stapes.on('OUTCOME:REMOVED:' + this.data.outcomeAttr.id, ( data, event ) => {
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
   };

   rivets.components['outcome-component'] = {
      template: function () {
         return '<button rv-on-click="toggleOutcome" type="button" role="button" class="KambiWidget-outcome kw-link l-flex-1 l-ml-6" ' +
            'rv-custom-class="selected" rv-toggle-class="KambiWidget-outcome--selected" >' +
            '<div class="KambiWidget-outcome__flexwrap">' +
            '<div class="KambiWidget-outcome__label-wrapper">' +
            '<span class="KambiWidget-outcome__label">{label}</span>' +
            '<span class="KambiWidget-outcome__line"></span>' +
            '</div>' +
            '<div class="KambiWidget-outcome__odds-wrapper">' +
            '<span class="KambiWidget-outcome__odds">{data.outcomeAttr.odds | / 1000}</span>' +
            '</div>' +
            '</div>' +
            '</button>';
      },

      initialize: function ( el, attributes ) {
         el.classList.add('l-flexbox');
         el.classList.add('l-flex-1');
         return new OutcomeViewController(attributes);
      }
   };

   rivets.components['outcome-component-no-label'] = {
      template: function () {
         return '<button rv-on-click="toggleOutcome" rv-disabled="betOffer.suspended | == true"' +
            'rv-custom-class="selected" rv-toggle-class="KambiWidget-outcome--selected" ' +
            'type="button" role="button" class="KambiWidget-outcome kw-link l-ml-6">' +
            '<div class="l-flexbox l-pack-center">' +
            '<div class="KambiWidget-outcome__odds-wrapper">' +
            '<span class="KambiWidget-outcome__odds">{data.outcomeAttr.odds | / 1000 }</span>' +
            '</div>' +
            '</div>' +
            '</button>';
      },

      initialize: function ( el, attributes ) {
         return new OutcomeViewController(attributes);
      }
   };
})();