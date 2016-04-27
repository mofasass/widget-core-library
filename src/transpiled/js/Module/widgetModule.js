'use strict';

CoreLibrary.widgetModule = function () {
   'use strict';

   var Module = Stapes.subclass();

   return {
      api: { // placeholders for when not running inside iframe
         requestSetup: function requestSetup() {},
         request: function request() {},
         set: function set() {},
         remove: function remove() {},
         createUrl: function createUrl() {}
      },
      events: new Module(),
      config: {
         routeRoot: '',
         auth: false,
         device: null
      },
      setConfig: function setConfig(config) {
         for (var i in config) {
            if (config.hasOwnProperty(i) && this.config.hasOwnProperty(i)) {
               this.config[i] = config[i];
            }
         }
         // Make sure that the routeRoot is not null or undefined
         if (this.config.routeRoot == null) {
            this.config.routeRoot = '';
         } else if (this.config.routeRoot.length > 0 && this.config.routeRoot.slice(-1) !== '/') {
            // If the routeRoot is not empty we need to make sure it has a trailing slash
            this.config.routeRoot += '/';
         }
      },
      handleResponse: function handleResponse(response) {
         switch (response.type) {
            case this.api.WIDGET_HEIGHT:
               // We've received a height response
               this.events.emit('WIDGET:HEIGHT', response.data);
               break;
            case this.api.BETSLIP_OUTCOMES:
               // We've received a response with the outcomes currently in the betslip
               this.events.emit('OUTCOMES:UPDATE', response.data);
               break;
            case this.api.WIDGET_ARGS:
               // We've received a response with the arguments set in the
               this.events.emit('WIDGET:ARGS', response.data);
               break;
            case this.api.PAGE_INFO:
               // Received page info response
               this.events.emit('PAGE:INFO', response.data);
               break;
            case this.api.CLIENT_ODDS_FORMAT:
               // Received odds format response
               this.events.emit('ODDS:FORMAT', response.data);
               break;
            case this.api.CLIENT_CONFIG:
               this.events.emit('CLIENT:CONFIG', response.data);
               break;
            case this.api.USER_LOGGED_IN:
               console.debug('User logged in', response.data);
               this.events.emit('USER:LOGGED_IN', response.data);
               break;
            case 'Setup':
               this.events.emit('Setup response', response.data);
               break;
            default:
               // Unhandled response
               console.info('Unhandled response type: ' + response.type);
               console.info(response);
               break;
         }
      },

      createUrl: function createUrl(path, optionalRoot) {
         return this.api.createUrl(path, optionalRoot);
      },

      getPageType: function getPageType() {
         if (!CoreLibrary.config.pageInfo.pageType) {
            return '';
         }
         var pageType = CoreLibrary.config.pageInfo.pageType;
         switch (pageType) {
            case 'event':
               return '';
            case 'event-live':
               return 'live/';
            default:
               console.info('Unknown page type: ' + pageType);
               break;
         }
      },

      requestSetup: function requestSetup(callback) {
         this.api.requestSetup(callback);
      },

      requestWidgetHeight: function requestWidgetHeight() {
         this.api.request(this.api.WIDGET_HEIGHT);
      },

      setWidgetHeight: function setWidgetHeight(height) {
         this.api.set(this.api.WIDGET_HEIGHT, height);
      },

      enableWidgetTransition: function enableWidgetTransition(enableTransition) {
         if (enableTransition) {
            this.api.set(this.api.WIDGET_ENABLE_TRANSITION);
         } else {
            this.api.set(this.api.WIDGET_DISABLE_TRANSITION);
         }
      },

      removeWidget: function removeWidget() {
         this.api.remove();
      },

      navigateToLiveEvent: function navigateToLiveEvent(eventId) {
         this.navigateClient('event/live/' + eventId);
      },

      navigateToEvent: function navigateToEvent(eventId) {
         this.navigateClient('event/' + eventId);
      },

      navigateToFilter: function navigateToFilter(filterParams) {
         this.navigateClient(filterParams);
      },

      navigateToLiveEvents: function navigateToLiveEvents() {
         this.navigateClient(['in-play']);
      },

      addOutcomeToBetslip: function addOutcomeToBetslip(outcomes, stakes, updateMode, source) {
         var arrOutcomes = [];
         // Check if the outcomes parameter is an array and add it, otherwise add the the single value as an array
         if (Array.isArray(outcomes)) {
            arrOutcomes = outcomes;
         } else {
            arrOutcomes.push(outcomes);
         }

         // Setup the data object to be sent to the widget API
         var data = {
            outcomes: arrOutcomes
         };

         // Check if we got any stakes passed to use, add them to the data object if so
         if (stakes != null) {
            if (stakes.isArray()) {
               data.stakes = stakes;
            } else {
               data.stakes = [stakes];
            }
         }

         // Set the coupon type, defaults to TYPE_SINGLE
         data.couponType = arrOutcomes.length === 1 ? this.api.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE : this.api.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION;

         // Set the update mode, defaults to UPDATE_APPEND
         data.updateMode = updateMode !== 'replace' ? this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND : this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_REPLACE;
         if (source != null) {
            data.source = source;
         }

         // Send the data to the widget this.api
         this.api.set(this.api.BETSLIP_OUTCOMES, data);
      },

      removeOutcomeFromBetslip: function removeOutcomeFromBetslip(outcomes) {
         var arrOutcomes = [];
         if (outcomes.isArray()) {
            arrOutcomes = outcomes;
         } else {
            arrOutcomes.push(outcomes);
         }
         this.api.set(this.api.BETSLIP_OUTCOMES_REMOVE, { outcomes: arrOutcomes });
      },

      requestBetslipOutcomes: function requestBetslipOutcomes() {
         this.api.request(this.api.BETSLIP_OUTCOMES);
      },

      requestPageInfo: function requestPageInfo() {
         this.api.request(this.api.PAGE_INFO);
      },

      requestWidgetArgs: function requestWidgetArgs() {
         this.api.request(this.api.WIDGET_ARGS);
      },

      requestClientConfig: function requestClientConfig() {
         this.api.request(this.api.CLIENT_CONFIG);
      },

      requestOddsFormat: function requestOddsFormat() {
         this.api.request(this.api.CLIENT_ODDS_FORMAT);
      },

      requestOddsAsAmerican: function requestOddsAsAmerican(odds) {
         return new Promise(function (resolve, reject) {
            this.api.requestOddsAsAmerican(odds, function (americanOdds) {
               resolve(americanOdds);
            });
         }.bind(this));
      },

      requestOddsAsFractional: function requestOddsAsFractional(odds) {
         return new Promise(function (resolve, reject) {
            this.api.requestOddsAsFractional(odds, function (fractionalOdds) {
               resolve(fractionalOdds);
            });
         });
      },

      navigateClient: function navigateClient(destination) {
         if (typeof destination === 'string') {
            this.api.navigateClient('#' + this.config.routeRoot + destination);
         } else if (destination.isArray()) {
            var filter = this.api.createFilterUrl(destination, this.config.routeRoot);
            this.api.navigateClient(filter);
         }
      }
   };
}();
//# sourceMappingURL=widgetModule.js.map
