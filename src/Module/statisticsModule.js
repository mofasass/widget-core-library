import coreLibrary from '../coreLibrary';

/**
 * Module to access statistics API
 * The statistics API has information concerning historical data of events (matches, competitions)
 * All methods in this module return Promises that are resolved when the data is ready and throws errors (that can be handled with .catch()) on failure
 * @module statisticsModule
 */

export default {

   /**
    * Configuration
    * @type {Object}
    * @property {String} baseApiUrl the baseURL for statistics API requests
    */
   config: {
      baseApiUrl: 'https://api.kambi.com/statistics/api/'
   },

   /**
    * Requests league table statistics data from api.
    * @param {String} filter a filter string to a competition. Example 'football/england/premier_league'
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
      return coreLibrary.getData(this.config.baseApiUrl + coreLibrary.config.offering + '/leaguetable/' + filter + '.json');
   },

   /**
    * Requests H2H statistics data from api.
    * @param {String|Number} eventId id of a match
    * @returns {Promise}
    */
   getHeadToHeadStatistics (eventId) {
      return coreLibrary.getData(this.config.baseApiUrl + coreLibrary.config.offering + '/h2h/event/' + eventId + '.json');
   },

   /**
    * Requests TPI statistics data from api.
    * @param {String|Number} eventId id of a match
    * @returns {Promise}
    */
   getTeamPerformanceStatistics (eventId) {
      return coreLibrary.getData(this.config.baseApiUrl + coreLibrary.config.offering + '/tpi/event/' + eventId + '.json');
   }
};
