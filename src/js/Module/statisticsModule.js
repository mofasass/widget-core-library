import CoreLibrary from '../coreLibrary';

/**
 * Module to access statistics data
 * @module statisticsModule
 * @memberOf CoreLibrary
 */

export default {

   /**
    * Configuration.
    * @type {Object}
    * @property {String} baseApiUrl
    */
   config: {
      baseApiUrl: 'https://api.kambi.com/statistics/api/'
   },

   /**
    * Requests league table statistics data from api.
    * @param {String} filter a league filter
    * @returns {Promise}
    */
   getLeagueTableStatistics (filter) {
      // Remove url parameters from filter
      filter = filter.match(/[^?]*/)[0];

      // Removing trailing and starting slashes if present
      if ( filter[filter.length - 1] === '/' ) {
         filter = filter.slice(0, -1);
      }
      if ( filter[0] === '/' ) {
         filter = filter.slice(1);
      }
      return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/leaguetable/' + filter + '.json');
   },

   /**
    * Requests H2H statistics data from api.
    * @param {String|Number} eventId
    * @returns {Promise}
    */
   getHeadToHeadStatistics (eventId) {
      return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/h2h/event/' + eventId + '.json');
   },

   /**
    * Requests TPI statistics data from api.
    * @param {String|Number} eventId
    * @returns {Promise}
    */
   getTeamPerformanceStatistics (eventId) {
      return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/tpi/event/' + eventId + '.json');
   },

   /**
    * Requests statistics data from api.
    * @param {String} type
    * @param {String} filter
    * @returns {Promise}
    * @deprecated
    */
   getStatistics ( type, filter ) {
      console.warn('getStatistics is deprecated, please use one of the specific statistics methods');
      // Remove url parameters from filter
      filter = filter.match(/[^?]*/)[0];

      // Remove trailing slash if present
      if (filter[filter.length - 1] === '/') {
         filter = filter.slice(0, -1);
      }

      console.debug(this.config.baseApiUrl + CoreLibrary.config.offering + '/' + type + '/' + filter + '.json');
      return CoreLibrary.getData(this.config.baseApiUrl + CoreLibrary.config.offering + '/' + type + '/' + filter + '.json');
   }
};
