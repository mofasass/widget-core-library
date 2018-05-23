import coreLibrary from '../coreLibrary'

/**
 * Module with methods to request data from the offering API
 * The offering API has information concerning events (matches, competations) and their respective betoffers as well as live data if available
 * All methods in this module return Promises that are resolved when the data is ready and throws errors (that can be handled with .catch()) on failure
 * @module offeringModule
 */

export default {
  /**
   * Get group events
   * @param {number|string} groupId Group id
   * @returns {Promise}
   */
  getGroupEvents(groupId) {
    var requesPath = '/event/group/' + groupId + '.json'
    return this.doRequest(requesPath)
  },

  /**
   * Get group information.
   * @param {Number|String} groupId Group id
   * @returns {Promise}
   */
  getGroup(groupId) {
    var requesPath = '/group/' + groupId + '.json'
    return this.doRequest(requesPath)
  },

  /**
   * Get events by filter, only returns the main betoffer for the event. To get all betoffers use getEvent() or getLiveEvent()
   * @param {String} filter Filter string, eg: football
   * @param {Object} params Request relevant parameters
   * @returns {Promise}
   */
  getEventsByFilter(filter, params) {
    // Todo: Update this method once documentation is available
    filter = filter.replace(/^#?\/?/, '') // removes #/ at the start of the string if present
    var requestPath = '/listView/' + filter
    return this.doRequest(requestPath, params, 'v3')
  },

  /**
   * Normalizes v2 api betoffers
   * @param {Object} betOffer Betoffer object we get from api
   * @private
   */
  adaptV2BetOffer(betOffer) {
    if (betOffer.suspended === true) {
      betOffer.open = false
    }
  },

  /**
   * Normalizes the v2 api response
   * @param {Object} liveData Livedata object we get from api
   * @private
   */
  adaptV2LiveData(liveData) {
    if (liveData != null && liveData.statistics != null) {
      var statistics = liveData.statistics
      if (statistics.sets != null) {
        statistics.setBasedStats = statistics.sets
        delete statistics.sets
      }

      if (statistics.football != null) {
        statistics.footballStats = statistics.football
        delete statistics.football
      }
    }
  },

  /**
   * Normalizes the v2 event object
   * @private
   */
  adaptV2Event(event) {
    // v3 and v2 event objects are almost the same
    // only a few attributes we don't use are different
  },

  /**
   * Get live event data only, eg: match statistics, score, macthClock
   * @param {Number|String} eventId The event id we need to fetch
   * @returns {Promise}
   * @private
   */
  getLiveEventData(eventId) {
    var requestPath = '/event/' + eventId + '/livedata.json'
    return this.doRequest(requestPath, null, null, true).then(res => {
      this.adaptV2LiveData(res)
      return res
    })
  },

  /**
   * Get all live events, only returns the main betoffer for the event. To get all betoffers use getEvent() or getLiveEvent()
   * @returns {Promise}
   */
  getLiveEvents() {
    var requestPath = '/event/live/open.json'
    return this.doRequest(requestPath, null, null, true).then(res => {
      if (res.error != null) {
        return res
      }
      var events = res.liveEvents
      res.events = events
      res.events.forEach(this.adaptV2Event)
      delete res.liveEvents
      delete res.group
      events.forEach(e => {
        e.betOffers = []
        if (e.mainBetOffer != null) {
          this.adaptV2BetOffer(e.mainBetOffer)
          e.betOffers.push(e.mainBetOffer)
          delete e.mainBetOffer
        }
        this.adaptV2LiveData(e.liveData)
      })
      return res
    })
  },

  /**
   * Returns a live event
   * @param {Number|String} eventId The event id we need to fetch
   * @returns {Promise}
   */
  getLiveEvent(eventId) {
    var requestPath = '/betoffer/live/event/' + eventId + '.json'
    return this.doRequest(requestPath, null, null, true).then(res => {
      res.betOffers = res.betoffers
      delete res.betoffers
      res.betOffers.forEach(this.adaptV2BetOffer)
      res.event = res.events[0]
      this.adaptV2Event(res.event)
      delete res.events
      return res
    })
  },

  /**
   * Get live events by filter, only returns the main betoffer for the event. To get all betoffers use getEvent() or getLiveEvent()
   * @param {String} filter Filter string
   * @returns {Promise}
   */
  getLiveEventsByFilter(filter) {
    // Todo: implement a filter request when the offering API supports it
    filter = filter.replace(/\/$/, '')

    var filterTerms = filter.split('/')
    filterTerms = filterTerms.slice(0, 3)

    var requestPath = '/listView/all/all/all/all/in-play/'

    return this.doRequest(requestPath, null, 'v3').then(response => {
      var result = {
          events: [],
        },
        i = 0,
        len = response.events.length
      for (; i < len; ++i) {
        var j = 0,
          termLen = response.events[i].event.path.length,
          addEvent = true
        if (termLen > filterTerms.length) {
          termLen = filterTerms.length
        }
        for (; j < termLen; ++j) {
          if (
            filterTerms[j] !== 'all' &&
            response.events[i].event.path[j].termKey !== filterTerms[j]
          ) {
            addEvent = false
          }
        }
        if (addEvent) {
          result.events.push(response.events[i])
        }
      }
      return result
    })
  },

  /**
   * Requests and event from api
   * @param {String} eventId The event id we need to fetch
   * @returns {Promise}
   */
  getEvent(eventId) {
    return this.doRequest('/betoffer/event/' + eventId + '.json').then(res => {
      res.betOffers = res.betoffers
      delete res.betoffers
      res.betOffers.forEach(this.adaptV2BetOffer)
      res.event = res.events[0]
      this.adaptV2Event(res.event)
      delete res.events
      return res
    })
  },

  /**
   * Request the highlight resource which is what is shown under the "Popular" section in the Sportsbook
   * @returns {Promise}
   */
  getHighlight() {
    return this.doRequest('/group/highlight.json').then(highlights => {
      // sorting based on sortOrder
      if (Array.isArray(highlights.groups)) {
        highlights.groups.sort((a, b) => {
          if (parseInt(a.sortOrder, 10) > parseInt(b.sortOrder, 10)) {
            return 1
          }
          if (parseInt(a.sortOrder, 10) < parseInt(b.sortOrder, 10)) {
            return -1
          }
          return 0
        })
      }
      return highlights
    })
  },

  /**
    * Makes a request to provided path setting the appropriated URL parameters. Usually this method should not be called directly, unless you want to access an endpoint that is not available in the other methods
    The final url looks like:
    coreLibrary.config.apiBaseUrl + version + coreLibrary.config.offering + requestPath
    Example (same as calling offeringModule.getLiveEvents() but forcing to use Portugal Portuguese locale)
    doRequest('/event/live/open.json' { lang: 'pt_PT' });
    this call would fetch this url:

    https://api.kambi.com/offering/api/v2/kambi/event/live/open.json?lang=pt_PT&market=kambi&client_id=2&include=&betOffers=COMBINED&categoryGroup=COMBINED&displayDefault=true&nocache=1476973932524

    * @param {string} requestPath the path to the request
    * @param {object} params params to use, can override the parameters this method usually sets
    * @param {number|string} version which version of the API to use. Some endpoints are 'v2' and some are 'v3'
    * @param {boolean} noCache if true will add a cache-busting URL parameter. Defaults to true
    * @returns {Promise}
    */
  doRequest(requestPath, params, version, noCache) {
    var config = coreLibrary.config
    if (config.offering == null) {
      return Promise.reject(
        new Error(
          'The offering has not been set, is the right widget api version loaded?'
        )
      )
    } else {
      var apiUrl = config.apiBaseUrl.replace(
        '{apiVersion}',
        version != null ? version : config.version
      )
      var requestUrl = apiUrl + config.offering + requestPath
      var overrideParams = params || {}
      var requestParams = {
        lang: overrideParams.locale || config.locale,
        market: overrideParams.market || config.market,
        client_id: overrideParams.client_id || config.client_id,
        include: overrideParams.include || '',
        betOffers: overrideParams.betOffers || 'COMBINED',
        categoryGroup: overrideParams.categoryGroup || 'COMBINED',
        displayDefault: overrideParams.displayDefault || true,
      }
      if (noCache === true) {
        requestParams.nocache = Date.now()
      }
      requestUrl +=
        '?' +
        Object.keys(requestParams)
          .map(function(k) {
            return (
              encodeURIComponent(k) + '=' + encodeURIComponent(requestParams[k])
            )
          })
          .join('&')

      return coreLibrary.getData(requestUrl)
    }
  },
}
