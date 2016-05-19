CoreLibrary.offeringModule = (function () {
   'use strict';

   return {
      getGroupEvents: function ( groupId ) {
         var requesPath = '/event/group/' + groupId + '.json';
         return this.doRequest(requesPath);
      },
      getEventsByFilter: function ( filter, params ) {
         // Todo: Update this method once documentation is available
         var requestPath = '/listView/' + filter;
         return this.doRequest(requestPath, params, 'v3');
      },
      getLiveEvents: function () {
         var requestPath = '/event/live/open.json';
         return this.doRequest(requestPath);
      },
      getLiveEventsByFilter: function ( filter ) {
         // Todo: implement a filter request when the offering API supports it
         filter = filter.replace(/\/$/, '');

         var filterTerms = filter.split('/');
         filterTerms = filterTerms.slice(0, 3);

         var requestPath = '/listView/all/all/all/all/in-play/';

         var liveEventsPromise = new Promise(( resolve, reject ) => {
            this.doRequest(requestPath, null, 'v3')
               .then(( response ) => {
                  var result = {
                        events: []
                     },
                     i = 0, len = response.events.length;
                  for ( ; i < len; ++i ) {
                     var j = 0, termLen = response.events[i].event.path.length, addEvent = true;
                     if ( termLen > filterTerms.length ) {
                        termLen = filterTerms.length;
                     }
                     for ( ; j < termLen; ++j ) {
                        if ( filterTerms[j] !== 'all' && response.events[i].event.path[j].termKey !== filterTerms[j] ) {
                           addEvent = false;
                        }
                     }
                     if ( addEvent ) {
                        result.events.push(response.events[i]);
                     }
                  }
                  resolve(result);
               });
         });

         return liveEventsPromise;
      },
      getEventBetoffers: function ( eventId ) {
         return this.doRequest('/betoffer/event/' + eventId + '.json');
      },
      doRequest: function ( requestPath, params, version ) {
         if ( CoreLibrary.config.offering == null ) {
            console.warn('The offering has not been set, is the right widget api version loaded?');
         } else {
            var apiUrl = CoreLibrary.config.apiBaseUrl.replace('{apiVersion}',
               (version != null ? version : CoreLibrary.config.version));
            var requestUrl = apiUrl + CoreLibrary.config.offering + requestPath;
            var overrideParams = params || {};
            var requestParams = {
               lang: overrideParams.locale || CoreLibrary.config.locale,
               market: overrideParams.market || CoreLibrary.config.market,
               client_id: overrideParams.client_id || CoreLibrary.config.client_id,
               include: overrideParams.include || '',
               betOffers: overrideParams.betOffers || 'COMBINED',
               categoryGroup: overrideParams.categoryGroup || 'COMBINED',
               displayDefault: overrideParams.displayDefault || true
            };
            requestUrl += '?' + Object.keys(requestParams).map(function ( k ) {
                  return encodeURIComponent(k) + '=' + encodeURIComponent(requestParams[k]);
               }).join('&');

            return CoreLibrary.getData(requestUrl);
         }
      }
   };
})();
