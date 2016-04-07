CoreLibrary.statisticsModule = (function () {
   'use strict';

   return {
      config: {
         baseApiUrl: 'https://api.kambi.com/statistics/api/',
         offering: null
      },
      setConfig: function ( config ) {
         this.config.offering = config.offering;
      },
      getStatistics: function ( type, filter ) {
         // Remove url parameters from filter
         filter = filter.match(/[^?]*/)[0];

         // Remove trailing slash if present
         if (filter[filter.length - 1] === '/') {
            filter = filter.slice(0, -1);
         }

         console.debug(this.config.baseApiUrl + this.config.offering + '/' + type + '/' + filter + '.json');
         return CoreLibrary.getData(this.config.baseApiUrl + this.config.offering + '/' + type + '/' + filter + '.json');
      }
   };
})();
