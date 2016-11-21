/**
 * Module with methods to manipulate the widget and interact with the sportsbook
 * @module widgetModule
 */

import utilModule from './utilModule';
import coreLibrary from '../coreLibrary';

export default {

   /**
    * Widget API object
    * @type {object}
    * @private
    */
   api: { // placeholders for when running outside of the sportsbook
      requestSetup () {
      },
      request () {
      },
      set () {
      },
      remove () {
      },
      createUrl () {
      },
      createFilterUrl (terms, urlBase) {
         urlBase = urlBase || 'filter';

         var segments = terms.filter(term => term.indexOf('/') === 0)
            .reduce((segments, term) => {
               var coords = [];

               term.replace(/\/+$/, '').split('/').slice(1).forEach((termKey, i) => {
                  if (!(i in segments)) {
                     segments[i] = [];
                  }

                  var pointer = segments[i];

                  if (i > 0) {
                     coords.forEach((coord) => {
                        for (var j = 0; j <= coord; j++) {
                           if (pointer[j] == null) {
                              pointer.push(j === coord ? [] : 'all');
                           }
                        }
                        pointer = pointer[coord];
                     });
                  }

                  if (pointer.indexOf(termKey) === -1) {
                     pointer.push(termKey);
                  }

                  coords[i] = pointer.length - 1;

                  return coords[i];
               });

               return segments;
            }, []);

         var route = '#' + urlBase.replace(/.*?#/, '').replace(/^\//, '');
         route += segments.reduce((str, segment) => str + '/' + JSON.stringify(segment).slice(1, -1), '')
            .replace(/"/g, '')
            .replace(/(,all)+(\/|]|$)/g, '$2');

         for (var i = 0; i <= segments.length; i++) {
            route = route.replace(/\[([^,\]]*)]/g, '$1');
         }

         var attributes = terms.filter(term => term.indexOf('/') !== 0).join(',');

         if (attributes) {
            for (var j = 0; j < 4 - segments.length; j++) {
               route += '/all';
            }

            route += '/' + attributes;
         }

         return route.match(/filter$/) ? route + '/all' : route;
      }
   },

   /**
    * Object in which you can add event listeners for Kambi Widget API events
    * Valid events listeners:
    *
    * 'WIDGET:HEIGHT': Widget height changed
    *
    * 'OUTCOME:REMOVED:{outcomeId}': Outcome with {outcomeId} removed
    *
    * 'OUTCOME:ADDED:{outcomeId}': Outcome with {outcomeId} added
    *
    * 'OUTCOME:UPDATE:{outcomeId}': Outcome with {outcomeId} updated
    *
    * 'WIDGET:ARGS': Widget args changed
    *
    * 'PAGE:INFO':  Page info changed
    *
    * 'ODDS:FORMAT': Odds format changed
    *
    * 'CLIENT:CONFIG': Client config changed
    *
    * 'USER:LOGGED_IN': User logged in changed
    *
    * @example
    *
    * widgetModule.events
    *    .subscribe('OUTCOME:ADDED:' + outcome.id,
    *       ( data ) => {
    *          ...
    *       });
    *
    * @type {Object}
    * @property {Function} subscribe Parameters: (eventName, eventHandlerFn). Subscribes to the eventName, when that event happens eventHandlerFn is called
    * @property {Function} unsubscribe Parameters: (eventName, eventHandlerFn). Unsubscribes all handlers to the event or if an eventHandlerFn is passed, only unsubscribes that handler
    */
   events: (function() {
      /**
       * Map of events with handlers
       * @type {object<string, function[]>}
       */
      const handlers = {};

      /**
       * Subscribes a handler to given event.
       * @param {string} event Event name
       * @param {function} handler Handler function
       */
      const subscribe = function(event, handler) {
         if (handlers.hasOwnProperty(event)) {
            handlers[event].push(handler);
         } else {
            handlers[event] = [handler];
         }
      };

      /**
       * Unsubscribes handler/all handlers from given event.
       * @param {string} event Event name
       * @param {function?} handler Optional handler function pointer
       */
      const unsubscribe = function(event, handler) {
         if (handlers.hasOwnProperty(event)) {
            // remove all handlers for given event
            if (!handler) {
               handlers[event] = [];
               return;
            }

            // remove particular handler
            const handlerIdx = handlers[event].indexOf(handler);

            if (handlerIdx > -1) {
               handlers[event].splice(handlerIdx, 1);
            }
         }
      };

      /**
       * Emits an event with given arguments.
       * @param {string} event Event name
       * @param {...*} args Arguments for handlers
       * @private
       */
      const publish = function(event, ...args) {
         if (!handlers.hasOwnProperty(event)) {
            return;
         }

         handlers[event].forEach(handler => handler.apply(undefined, args));
      };

      // api
      return { subscribe, unsubscribe, publish };
   })(),

   /**
    * Stores all the betslip outcome ids we are watching
    * to trigger events
    * @type {array}
    * @private
    */
   betslipIds: [],

   /**
    * Handles widget api response.
    * Emits events for each response
    * @param {Object} response
    * @private
    */
   handleResponse (response) {
      switch (response.type) {
         case this.api.WIDGET_HEIGHT:
            // We've received a height response
            this.events.publish('WIDGET:HEIGHT', response.data);
            break;
         case this.api.BETSLIP_OUTCOMES:
            // We've received a response with the outcomes currently in the betslip

            var i = 0, len = response.data.outcomes.length;
            var updateIds = [];
            // Gather all the ids in the betslip in one array
            for (; i < len; ++i) {
               updateIds.push(response.data.outcomes[i].id);
            }
            // Diff against what the coreLibrary already has stored so we know what was added and what was removed
            var removedIds = utilModule.diffArray(this.betslipIds, updateIds);
            var addedIds = utilModule.diffArray(updateIds, this.betslipIds);
            // Save the updated ids
            this.betslipIds = updateIds;

            // Emit events for each removed id
            i = 0;
            len = removedIds.length;
            for (; i < len; ++i) {
               this.events.publish('OUTCOME:REMOVED:' + removedIds[i]);
            }

            // Emit events for each added id
            i = 0;
            len = addedIds.length;
            for (; i < len; ++i) {
               this.events.publish('OUTCOME:ADDED:' + addedIds[i]);
            }

            // Emit a generic update in case we want to use that
            this.events.publish('OUTCOMES:UPDATE', response.data);
            break;
         case this.api.WIDGET_ARGS:
            // We've received a response with the arguments set in the
            coreLibrary.args = response.data;
            this.events.publish('WIDGET:ARGS', response.data);
            break;
         case this.api.PAGE_INFO:
            // Received page info response
            coreLibrary.setPageInfo(response.data);
            this.events.publish('PAGE:INFO', response.data);
            break;
         case this.api.CLIENT_ODDS_FORMAT:
            // Received odds format response
            coreLibrary.setOddsFormat(response.data);
            this.events.publish('ODDS:FORMAT', response.data);
            break;
         case this.api.CLIENT_CONFIG:
            coreLibrary.setConfig(response.data);
            this.events.publish('CLIENT:CONFIG', response.data);
            break;
         case this.api.USER_LOGGED_IN:
            console.debug('User logged in', response.data);
            this.events.publish('USER:LOGGED_IN', response.data);
            break;
         case 'Setup':
            this.events.publish('Setup response', response.data);
            break;
         default:
            // Unhandled response
            console.info('Unhandled response type: ' + response.type);
            console.info(response);
            break;
      }
   },

   /**
    * Creates url from given path and optionalRoot
    * @param {String} path
    * @param {String} optionalRoot
    * @returns {String}
    */
   createUrl (path, optionalRoot) {
      return this.api.createUrl(path, optionalRoot);
   },

   /**
    * Creates a filter url from given array
    * @example
    * destination = ['/football/europa_league/', '/football/world_cup_qualifying_-_europe/'];
    * @param {Array} destination
    * @returns {string}
    */
   createFilterUrl (destination) {
      return this.api.createFilterUrl(destination, coreLibrary.config.routeRoot);
   },

   /**
    * Returns the page type page type
    * @returns {String}
    */
   getPageType () {
      if (!coreLibrary.pageInfo.pageType) {
         return '';
      }
      var pageType = coreLibrary.pageInfo.pageType;
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

   /**
    * Makes widget api request for setupdata
    * @param {fn} callback Callback
    */
   requestSetup (callback) {
      this.api.requestSetup(callback);
   },

   /**
    * Requests widget height from widget api
    */
   requestWidgetHeight () {
      this.api.request(this.api.WIDGET_HEIGHT);
   },

   /**
    * Set widget iframe height
    * @param {Number} height the height in pixels
    */
   setWidgetHeight (height) {
      this.api.set(this.api.WIDGET_HEIGHT, height);
   },

   /**
    * tries to adapt the widget iframe height to match the content
    *
    * Only works if the html and body tags don't have height: 100% styling rule
    */
   adaptWidgetHeight () {
      // tries to adapt the widget iframe height to match the content
      var body = document.body,
         html = document.documentElement;
      var heights = [body.offsetHeight, html.offsetHeight];
      // scrollHeight is the property used to get the size of the content of the page when it is bigger than the viewport
      if (coreLibrary.browser === 'internet-explorer' && parseInt(coreLibrary.browserVersion, 10) <= 11) {
         // on IE the html.scrollHeight does not reduce in size once it grows, so we use body.scrollHeight
         heights.push(body.scrollHeight);
      } else {
         heights.push(html.scrollHeight);
      }
      var height = Math.max(body.offsetHeight, html.scrollHeight, html.offsetHeight);
      this.api.set(this.api.WIDGET_HEIGHT, height);
   },

   /**
    * Enables/disables animations of changing the height of the iframe
    * @param {boolean} enableTransition new state to be
    */
   enableWidgetTransition (enableTransition) {
      if (enableTransition) {
         this.api.set(this.api.WIDGET_ENABLE_TRANSITION);
      } else {
         this.api.set(this.api.WIDGET_DISABLE_TRANSITION);
      }
   },

   /**
    * Call api to remove widget from the sportsbook
    */
   removeWidget () {
      this.api.remove();
   },

   /**
    * Method to navigate to a live event page
    * @param {number} eventId
    */
   navigateToLiveEvent (eventId) {
      this.navigateClient('event/live/' + eventId);
   },

   /**
    * Method to navigate to a pre-live event page
    * @param {number} eventId
    */
   navigateToEvent (eventId) {
      this.navigateClient('event/' + eventId);
   },

   /**
    * Method to navigate to a filter page
    * @param {String} filterParams
    */
   navigateToFilter (filterParams) {
      if (typeof filterParams === 'string' &&
         filterParams.indexOf('filter/') === -1) {
         filterParams = 'filter/' + filterParams;
      }
      this.navigateClient(filterParams);
   },

   /**
    * Navigates to the live events page
    */
   navigateToLiveEvents () {
      this.navigateClient(['in-play']);
   },

   /**
    * Adds an outcomes to the betslip
    * @param {Array<Number>|Number} outcomes ids of the outcomes to add
    * @param {Array<Number>|Number} stakes the value of the stakes to add (referencing the ids in the outcomes parameter)
    * @param {String} updateMode defaults to 'append', but also accepts 'replace'
    * @param {String} source
    */
   addOutcomeToBetslip (outcomes, stakes, updateMode, source) {
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
         if (Array.isArray(stakes)) {
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

      // Add tracking name if it's set
      if (coreLibrary.widgetTrackingName != null) {
         data.name = coreLibrary.widgetTrackingName;
      }

      // Send the data to the widget this.api
      this.api.set(this.api.BETSLIP_OUTCOMES, data);
   },

   /**
    * Removes outcomes from betslip
    * @param {Array<Number>|Number} outcomes ids of the outcomes to remove form the betslip
    */
   removeOutcomeFromBetslip (outcomes) {
      var arrOutcomes = [];
      if (Array.isArray(outcomes)) {
         arrOutcomes = outcomes;
      } else {
         arrOutcomes.push(outcomes);
      }
      var data = { outcomes: arrOutcomes };

      // Add tracking name if it's set
      if (coreLibrary.widgetTrackingName != null) {
         data.name = coreLibrary.widgetTrackingName;
      }

      this.api.set(this.api.BETSLIP_OUTCOMES_REMOVE, data);
   },

   /**
    * Requests betslip outcomes
    */
   requestBetslipOutcomes () {
      this.api.request(this.api.BETSLIP_OUTCOMES);
   },

   /**
    * Requests page info
    */
   requestPageInfo () {
      this.api.request(this.api.PAGE_INFO);
   },

   /**
    * Requests widget args
    */
   requestWidgetArgs () {
      this.api.request(this.api.WIDGET_ARGS);
   },

   /**
    * Requests client config
    */
   requestClientConfig () {
      this.api.request(this.api.CLIENT_CONFIG);
   },

   /**
    * Requests odds format
    */
   requestOddsFormat () {
      this.api.request(this.api.CLIENT_ODDS_FORMAT);
   },

   /**
    * Requests american odds
    * @param {Number} odds
    * @returns {Promise}
    */
   requestOddsAsAmerican (odds) {
      return new Promise((resolve) => {
         this.api.requestOddsAsAmerican(odds, (americanOdds) => {
            resolve(americanOdds);
         });
      });
   },

   /**
    * Requests fractional odds
    * @param {Number} odds
    * @returns {Promise}
    */
   requestOddsAsFractional (odds) {
      return new Promise((resolve) => {
         this.api.requestOddsAsFractional(odds, (fractionalOdds) => {
            resolve(fractionalOdds);
         });
      });
   },

   /**
    * Navigates to a page in the sportsbook
    * @param {String|Array} destination fragment part of the URL to navigate to (the part after the # in the URL)
    */
   navigateClient (destination) {
      var finalTarget = '';
      if (typeof destination === 'string') {
         finalTarget = '#' + coreLibrary.config.routeRoot + destination;
      } else if (Array.isArray(destination)) {
         finalTarget = this.api.createFilterUrl(destination, coreLibrary.config.routeRoot);
      }

      if (coreLibrary.widgetTrackingName != null) {
         this.api.navigateClient(finalTarget, coreLibrary.widgetTrackingName);
      } else {
         this.api.navigateClient(finalTarget);
      }
   }
};
