const customTypeSeparator = '-'

/**
 * Module with methods to set up subscription for different kinds of updates (betoffer data, odds format change and so on)
 * @module updatesModule
 */
const updatesModule = {
  api: {
    request() {},
    EVENT_INFO: 'EventInfo',
    EVENT_INFO_UNSUBSCRIBE: 'EventInfoUnSubscribe',
    EVENT_INFO_TYPES: {
      BASIC: 'BASIC',
      SCORE: 'SCORE',
      BET_OFFERS: 'BET_OFFERS',
    },
    EVENT_INFO_CONTEXT: {
      LIVE: 'LIVE',
      PRE_MATCH: 'PRE-MATCH',
    },
    BETSLIP_OUTCOMES: 'BetslipOutcomes',
  },

  /* The final callbacks object structure should look like this:
{
  BetslipOutcomes: [cb1, cb2, cb3, ...]
  ODDS_FORMAT: [cb1, cb2, cb3, ...]
  BASIC: {
    [eventId]: [cb1, cb2, cb3, ...],
    ...
  },
  SCORE: {
    [eventId]: [cb1, cb2, cb3, ...],
    ...
  },
  BET_OFFERS-LIVE-ALL: {
    [eventId]: [cb1, cb2, cb3, ...]
    }
  },
  BET_OFFERS-PRE_MATCH-ALL: {
    [eventId]: [cb1, cb2, cb3, ...]
  },
  BET_OFFERS-LIVE-MAIN: {
    [eventId]: [cb1, cb2, cb3, ...]
    }
  },
  BET_OFFERS-PRE_MATCH-MAIN: {
    [eventId]: [cb1, cb2, cb3, ...]
  },
}
*/

  callbacks: {},

  _getCallbackType(type, context, mainOnly) {
    if (type === this.api.EVENT_INFO_TYPES.BET_OFFERS) {
      return (
        type +
        customTypeSeparator +
        context +
        customTypeSeparator +
        (mainOnly ? 'MAIN' : 'ALL')
      )
    } else {
      return type
    }
  },

  /* 
   * Handles responses from the Widget API and calls the correct callbacks
   */
  handleResponse(response) {
    const data = response.data
    if (response.type === this.api.BETSLIP_OUTCOMES) {
      if (this.callbacks[this.api.BETSLIP_OUTCOMES] == null) {
        this.callbacks[this.api.BETSLIP_OUTCOMES] = []
      }
      this.callbacks[this.api.BETSLIP_OUTCOMES].forEach(cb => {
        cb(data)
      })
      return
    } else if (response.type === this.api.CLIENT_ODDS_FORMAT) {
      if (this.callbacks[this.api.CLIENT_ODDS_FORMAT] == null) {
        this.callbacks[this.api.CLIENT_ODDS_FORMAT] = []
      }
      this.callbacks[this.api.CLIENT_ODDS_FORMAT].forEach(cb => {
        cb(data)
      })
      return
    } else if (response.type === this.api.EVENT_INFO) {
      let cbs = this.callbacks[
        this._getCallbackType(data.info, data.context, data.mainOnly)
      ]
      if (cbs != null && cbs[data.id] != null) {
        cbs[data.id].forEach(cb => {
          cb(data)
        })
      }
    }
  },

  /*
   * Adds a callback to the callbacks object
   */
  _addCallback(type, eventId, cb, context, mainOnly = false) {
    const cbs = updatesModule.callbacks
    if (cb == null || eventId == null || type == null) {
      console.error('Missing argument for subscription')
      return
    }
    if (
      context != null &&
      context !== this.api.EVENT_INFO_CONTEXT.LIVE &&
      context !== this.api.EVENT_INFO_CONTEXT.PRE_MATCH
    ) {
      console.error('eventUpdatesModule invalid context value')
      return
    }
    type = this._getCallbackType(type, context, mainOnly)
    if (cbs[type] == null) {
      cbs[type] = {}
    }
    if (cbs[type][eventId] == null) {
      cbs[type][eventId] = []
    }
    cbs[type][eventId].push(cb)
  },

  subscribe: {
    get api() {
      return updatesModule.api
    },

    /* IE11 is throwing erros when subscribing to EVENT_INFO in the widget api. This returns false for Edge */
    _isIE11() {
      return navigator.appName.indexOf('Trident') !== -1
    },

    /**
     * Subscription that is triggered when there is any change to the betslip
     * @param {Function} callback Callback to be called when receiving new data
     */
    betslipOutcomes(callback) {
      const cbs = updatesModule.callbacks
      if (cbs[this.api.BETSLIP_OUTCOMES] == null) {
        cbs[this.api.BETSLIP_OUTCOMES] = []
      }
      cbs[this.api.BETSLIP_OUTCOMES].push(callback)
      this.api.request(this.api.BETSLIP_OUTCOMES)
    },

    oddsFormatSubscribedTo: false,
    /**
     * Subscription that is triggered when the odds format (decimal, fractional, american) changes
     * @param {Function} callback Callback to be called when receiving new data
     */
    oddsFormat(callback) {
      const cbs = updatesModule.callbacks
      if (cbs[this.api.CLIENT_ODDS_FORMAT] == null) {
        cbs[this.api.CLIENT_ODDS_FORMAT] = []
      }
      cbs[this.api.CLIENT_ODDS_FORMAT].push(callback)
      // we can only subscribe to odds format once as each subscription triggers one more call to handleResponse
      if (this.oddsFormatSubscribedTo === false) {
        this.api.request(this.api.CLIENT_ODDS_FORMAT)
      }
      this.oddsFormatSubscribedTo = true
    },

    /**
     * Subscription that is triggered when the basic information about an event changes
     * @param {Number} eventId the id of the event to listen for updates
     * @param {Function} callback Callback to be called when receiving new data
     */
    basicInfo(eventId, callback) {
      if (this._isIE11()) {
        return
      }
      const info = this.api.EVENT_INFO_TYPES.BASIC
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
      })
      updatesModule._addCallback(info, eventId, callback)
    },

    /**
     * Subscription that is triggered when the scoreboard information about an event changes
     * @param {Number} eventId the id of the event to listen for updates
     * @param {Function} callback Callback to be called when receiving new data
     */
    score(eventId, callback) {
      if (this._isIE11()) {
        return
      }
      const info = this.api.EVENT_INFO_TYPES.SCORE
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
      })
      updatesModule._addCallback(info, eventId, callback)
    },

    /**
     * Subscription that is triggered when the any of the prematch betoffers of an event change. This can be triggered several times per second
     * @param {Number} eventId the id of the event to listen for updates
     * @param {Function} callback Callback to be called when receiving new data
     */
    allPreMatchBetoffers(eventId, callback) {
      if (this._isIE11()) {
        return
      }
      const info = this.api.EVENT_INFO_TYPES.BET_OFFERS
      const context = this.api.EVENT_INFO_CONTEXT.PRE_MATCH
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
        context,
      })
      updatesModule._addCallback(info, eventId, callback, context, false)
    },

    /**
     * Subscription that is triggered when the any of the prematch live of an event change. This can be triggered several times per second
     * @param {Number} eventId the id of the event to listen for updates
     * @param {Function} callback Callback to be called when receiving new data
     */
    allLiveBetoffers(eventId, callback) {
      if (this._isIE11()) {
        return
      }
      const info = this.api.EVENT_INFO_TYPES.BET_OFFERS
      const context = this.api.EVENT_INFO_CONTEXT.LIVE
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
        context,
      })
      updatesModule._addCallback(info, eventId, callback, context, false)
    },

    /**
     * Subscription that is triggered when the any of the main (betoffer.main === true) prematch betoffers of an event change. This can be triggered several times per second
     * @param {Number} eventId the id of the event to listen for updates
     * @param {Function} callback Callback to be called when receiving new data
     */
    mainPreMatchBetoffers(eventId, callback) {
      if (this._isIE11()) {
        return
      }
      const info = this.api.EVENT_INFO_TYPES.BET_OFFERS
      const context = this.api.EVENT_INFO_CONTEXT.PRE_MATCH
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
        context,
        mainOnly: true,
      })
      updatesModule._addCallback(info, eventId, callback, context, true)
    },

    /**
     * Subscription that is triggered when the any of the main (betoffer.main === true) live betoffers of an event change. This can be triggered several times per second
     * @param {Number} eventId the id of the event to listen for updates
     * @param {Function} callback Callback to be called when receiving new data
     */
    mainLiveBetoffers(eventId, callback) {
      if (this._isIE11()) {
        return
      }
      const info = this.api.EVENT_INFO_TYPES.BET_OFFERS
      const context = this.api.EVENT_INFO_CONTEXT.LIVE
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
        context,
        mainOnly: true,
      })
      updatesModule._addCallback(info, eventId, callback, context, true)
    },
  },

  /**
   * Unsubscribes the callback passed. The function will be unsubscribed from all its subscriptions in case the same callback was passed to more than one subscribe call
   * @param {Function} callback callback to be unsubscribed
   * @returns {Boolean} returns true if the function was unsubscribed from at least one subscription
   */
  unsubscribe(callback) {
    let unsubscribed = false
    const cbs = updatesModule.callbacks
    Object.keys(cbs).forEach(type => {
      if (Array.isArray(cbs[type])) {
        const idx = cbs[type].indexOf(callback)
        if (idx !== -1) {
          cbs[type].splice(idx, 1)
          unsubscribed = true
        }
      } else {
        Object.keys(cbs[type]).forEach(eventId => {
          const idx = cbs[type][eventId].indexOf(callback)
          if (idx !== -1) {
            cbs[type][eventId].splice(idx, 1)
            unsubscribed = true
          }
          if (cbs[type][eventId].length === 0) {
            const [realType, context, main] = type.split(customTypeSeparator)
            const mainOnly = main === 'MAIN'
            const unsubObj = {
              id: eventId,
              info: type,
            }
            if (context != null) {
              unsubObj.context = context
            }
            if (mainOnly) {
              unsubObj.mainOnly = true
            }
            this.api.request(this.api.EVENT_INFO_UNSUBSCRIBE, unsubObj)
            delete cbs[type][eventId]
          }
        })
      }
    })
    return unsubscribed
  },
}

export default updatesModule

//  code to test this module

// coreLibrary.init({}).then(() => {
//   widgetModule.setWidgetHeight(300)
//   const eventId = 1004530932
//   eventUpdatesModule.subscribe.mainLiveBetoffers(eventId, data => {
//     console.log('mainLiveBetoffers')
//     console.log(data)
//   })
//   eventUpdatesModule.subscribe.allLiveBetoffers(eventId, data => {
//     console.log('allLiveBetoffers')
//     console.log(data)
//   })
//   eventUpdatesModule.subscribe.mainPreMatchBetoffers(eventId, data => {
//     console.log('mainPreMatchBetoffers')
//     console.log(data)
//   })
//   eventUpdatesModule.subscribe.allPreMatchBetoffers(eventId, data => {
//     console.log('allPreMatchBetoffers')
//     console.log(data)
//   })
//   eventUpdatesModule.subscribe.score(eventId, data => {
//     console.log('score')
//     console.log(data)
//   })
//   eventUpdatesModule.subscribe.basicInfo(eventId, data => {
//     console.log('basicInfo')
//     console.log(data)
//   })
//   offeringModule
//     .getLiveEvent(eventId)
//     .catch(() => {
//       return offeringModule.getEvent(eventId)
//     })
//     .then(data => {
//       let ev = data.event
//       let bo = data.betOffers.find(bo => bo.main)
//       ReactDOM.render(
//         <div>
//           <OutcomeButton outcome={bo.outcomes[0]} event={ev} />
//           {/* <OutcomeButton outcome={bo.outcomes[1]} event={ev} /> */}
//           </div>,
//           document.getElementById('root')
//         )
//       })
//   })
