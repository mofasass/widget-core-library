import coreLibrary from '../coreLibrary'

/**
 * Module to access statistics API
 * The statistics API has information concerning historical data of events (matches, competitions)
 * All methods in this module return Promises that are resolved when the data is ready and throws errors (that can be handled with .catch()) on failure
 * @module statisticsModule
 */

export default {
  /**
   * Requests league table statistics data from api.
   * @param {String} filter a filter string to a competition. Example 'football/england/premier_league'
   * @returns {Promise}
   */
  getLeagueTableStatistics(filter) {
    // Remove url parameters from filter
    filter = filter.match(/[^?]*/)[0]

    // Removing trailing and starting slashes if present
    if (filter[filter.length - 1] === '/') {
      filter = filter.slice(0, -1)
    }
    if (filter[0] === '/') {
      filter = filter.slice(1)
    }
    return this.doRequest('/leaguetable/' + filter + '.json')
  },

  /**
   * Requests H2H statistics data from api.
   * @param {String|Number} eventId id of a match
   * @returns {Promise}
   */
  getHeadToHeadStatistics(eventId) {
    return this.doRequest('/h2h/event/' + eventId + '.json')
  },

  /**
   * Requests TPI statistics data from api.
   * @param {String|Number} eventId id of a match
   * @returns {Promise}
   */
  getTeamPerformanceStatistics(eventId) {
    return this.doRequest('/tpi/event/' + eventId + '.json')
  },

  /**
   * Performs the statistics API requests
   * @param {String} path path of the desired resource, for example /leaguetable/football/england/premier_league.json'
   * @returns {Promise}
   */
  doRequest(path) {
    if (path.charAt(0) !== '/') {
      path += '/'
    }
    return coreLibrary.getData(
      coreLibrary.config.apiStatisticsBaseUrl +
        coreLibrary.config.offering +
        path +
        `?lang=${coreLibrary.config.locale}&market=${coreLibrary.config.market}`
    )
  },
}
