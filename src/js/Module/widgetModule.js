CoreLibrary.widgetModule = (function () {

   var Module = Stapes.subclass();

   return {
      api: { // placeholders for when not running inside iframe
         requestSetup: function () {
         },
         request: function () {
         },
         set: function () {
         },
         remove: function () {
         },
         createUrl: function () {
         }
      },
      events: new Module(),
      betslipIds: [],
      handleResponse: function ( response ) {
         switch ( response.type ) {
            case this.api.WIDGET_HEIGHT:
               // We've received a height response
               this.events.emit('WIDGET:HEIGHT', response.data);
               break;
            case this.api.BETSLIP_OUTCOMES:
               // We've received a response with the outcomes currently in the betslip

               var i = 0, len = response.data.outcomes.length;
               var updateIds = [];
               // Gather all the ids in the betslip in one array
               for ( ; i < len; ++i ) {
                  updateIds.push(response.data.outcomes[i].id);
               }
               // Diff against what the coreLibrary already has stored so we know what was added and what was removed
               var removedIds = CoreLibrary.utilModule.diffArray(this.betslipIds, updateIds);
               var addedIds = CoreLibrary.utilModule.diffArray(updateIds, this.betslipIds);
               // Save the updated ids
               this.betslipIds = updateIds;

               // Emit events for each removed id
               i = 0;
               len = removedIds.length;
               for ( ; i < len; ++i ) {
                  this.events.emit('OUTCOME:REMOVED:' + removedIds[i]);
               }

               // Emit events for each added id
               i = 0;
               len = addedIds.length;
               for ( ; i < len; ++i ) {
                  this.events.emit('OUTCOME:ADDED:' + addedIds[i]);
               }

               // Emit a generic update in case we want to use that
               this.events.emit('OUTCOMES:UPDATE', response.data);
               break;
            case this.api.WIDGET_ARGS:
               // We've received a response with the arguments set in the
               CoreLibrary.setArgs(response.data);
               this.events.emit('WIDGET:ARGS', response.data);
               break;
            case this.api.PAGE_INFO:
               // Received page info response
               CoreLibrary.setPageInfo(response.data);
               this.events.emit('PAGE:INFO', response.data);
               break;
            case this.api.CLIENT_ODDS_FORMAT:
               // Received odds format response
               CoreLibrary.setOddsFormat(response.data);
               this.events.emit('ODDS:FORMAT', response.data);
               break;
            case this.api.CLIENT_CONFIG:
               CoreLibrary.setConfig(response.data);
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

      createUrl: function ( path, optionalRoot ) {
         return this.api.createUrl(path, optionalRoot);
      },

      getPageType: function () {
         if ( !CoreLibrary.pageInfo.pageType ) {
            return '';
         }
         var pageType = CoreLibrary.pageInfo.pageType;
         switch ( pageType ) {
            case 'event':
               return '';
            case 'event-live':
               return 'live/';
            default:
               console.info('Unknown page type: ' + pageType);
               break;
         }
      },

      requestSetup: function ( callback ) {
         this.api.requestSetup(callback);
      },

      requestWidgetHeight: function () {
         this.api.request(this.api.WIDGET_HEIGHT);
      },

      setWidgetHeight: function ( height ) {
         this.api.set(this.api.WIDGET_HEIGHT, height);
      },

      adaptWidgetHeight: function () {
         // tries to adapt the widget iframe height to match the content
         var body = document.body,
            html = document.documentElement;
         var height = Math.max(body.offsetHeight, html.scrollHeight, html.offsetHeight);
         this.api.set(this.api.WIDGET_HEIGHT, height);
      },

      enableWidgetTransition: function ( enableTransition ) {
         if ( enableTransition ) {
            this.api.set(this.api.WIDGET_ENABLE_TRANSITION);
         } else {
            this.api.set(this.api.WIDGET_DISABLE_TRANSITION);
         }
      },

      removeWidget: function () {
         this.api.remove();
      },

      navigateToLiveEvent: function ( eventId ) {
         this.navigateClient('event/live/' + eventId);
      },

      navigateToEvent: function ( eventId ) {
         this.navigateClient('event/' + eventId);
      },

      navigateToFilter: function ( filterParams ) {
         this.navigateClient(filterParams);
      },

      navigateToLiveEvents: function () {
         this.navigateClient(['in-play']);
      },

      addOutcomeToBetslip: function ( outcomes, stakes, updateMode, source ) {
         var arrOutcomes = [];
         // Check if the outcomes parameter is an array and add it, otherwise add the the single value as an array
         if ( Array.isArray(outcomes) ) {
            arrOutcomes = outcomes;
         } else {
            arrOutcomes.push(outcomes);
         }

         // Setup the data object to be sent to the widget API
         var data = {
            outcomes: arrOutcomes
         };

         // Check if we got any stakes passed to use, add them to the data object if so
         if ( stakes != null ) {
            if ( stakes.isArray() ) {
               data.stakes = stakes;
            } else {
               data.stakes = [stakes];
            }
         }

         // Set the coupon type, defaults to TYPE_SINGLE
         data.couponType = arrOutcomes.length === 1 ? this.api.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE : this.api.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION;

         // Set the update mode, defaults to UPDATE_APPEND
         data.updateMode = updateMode !== 'replace' ? this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND : this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_REPLACE;
         if ( source != null ) {
            data.source = source;
         }

         // Add tracking name if it's set
         if ( CoreLibrary.widgetTrackingName != null ) {
            data.name = CoreLibrary.widgetTrackingName;
         }

         // Send the data to the widget this.api
         this.api.set(this.api.BETSLIP_OUTCOMES, data);
      },

      removeOutcomeFromBetslip: function ( outcomes ) {
         var arrOutcomes = [];
         if ( Array.isArray(outcomes) ) {
            arrOutcomes = outcomes;
         } else {
            arrOutcomes.push(outcomes);
         }
         var data = { outcomes: arrOutcomes };

         // Add tracking name if it's set
         if ( CoreLibrary.widgetTrackingName != null ) {
            data.name = CoreLibrary.widgetTrackingName;
         }

         this.api.set(this.api.BETSLIP_OUTCOMES_REMOVE, data);
      },

      requestBetslipOutcomes: function () {
         this.api.request(this.api.BETSLIP_OUTCOMES);
      },

      requestPageInfo: function () {
         this.api.request(this.api.PAGE_INFO);
      },

      requestWidgetArgs: function () {
         this.api.request(this.api.WIDGET_ARGS);
      },

      requestClientConfig: function () {
         this.api.request(this.api.CLIENT_CONFIG);
      },

      requestOddsFormat: function () {
         this.api.request(this.api.CLIENT_ODDS_FORMAT);
      },

      requestOddsAsAmerican: function ( odds ) {
         return new Promise(function ( resolve, reject ) {
            this.api.requestOddsAsAmerican(odds, function ( americanOdds ) {
               resolve(americanOdds);
            });
         }.bind(this));
      },

      requestOddsAsFractional: function ( odds ) {
         return new Promise(function ( resolve, reject ) {
            this.api.requestOddsAsFractional(odds, function ( fractionalOdds ) {
               resolve(fractionalOdds);
            });
         });
      },

      navigateClient: function ( destination ) {
         var finalTarget = '';
         if ( typeof destination === 'string' ) {
            finalTarget = '#' + CoreLibrary.config.routeRoot + destination;
         } else if ( destination.isArray() ) {
            finalTarget = this.api.createFilterUrl(destination, CoreLibrary.config.routeRoot);
         }

         if ( CoreLibrary.widgetTrackingName != null ) {
            this.api.navigateClient(finalTarget, CoreLibrary.widgetTrackingName);
         } else {
            this.api.navigateClient(finalTarget);
         }
      }
   };
})();
