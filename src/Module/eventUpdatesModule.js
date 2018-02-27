const customTypeSeparator = '-'

const eventUpdatesModule = {
  api: {
    request() {},
    EVENT_INFO_TYPES: {
      BASIC: 'BASIC',
      SCORE: 'SCORE',
      BET_OFFERS: 'BET_OFFERS',
    },
    EVENT_INFO_CONTEXT: {
      LIVE: 'LIVE',
      PRE_MATCH: 'PRE-MATCH',
    },
  },

  /* The final callbacks object structure should look like this:
{
  BASIC: {
    [eventId]: [cb1, cb2, cb3, ...],
    ...
  },
  SCORE: {
    [eventId]: [cb1, cb2, cb3, ...],
    ...
  },
  BET_OFFERS-LIVE: {
    [eventId]: {
      [betofferId]: [cb1, cb2, cb3, ...],
      ...
      all: [cb1, cb2, cb3, ...]
    }
  },
  BET_OFFERS-PRE_MATCH: {
    [eventId]: {
      [betofferId]: [cb1, cb2, cb3, ...],
      ...
      all: [cb1, cb2, cb3, ...]
    }
  },
}
*/
  callbacks: {},

  handleResponse(response) {
    switch (response.type) {
      case this.api.EVENT_INFO:
        const data = response.data
        console.log(data)
        if (
          this.callbacks[data.info] != null &&
          this.callbacks[data.info][data.id] != null
        ) {
          this.callbacks[data.info][data.id].forEach(cb => {
            cb(data)
          })
        }
        break
    }
  },

  subscribe: {
    get api() {
      return eventUpdatesModule.api
    },

    _addCallback(type, eventId, cb, context, betofferId) {
      const cbs = eventUpdatesModule.callbacks
      if (cb == null || eventId == null || type == null) {
        console.error('Missing argument for subscription')
        return
      }
      if (
        context != null &&
        context !== this.api.EVENT_INFO_TYPES.LIVE &&
        context !== this.api.EVENT_INFO_TYPES.PRE_MATCH
      ) {
        console.error('eventUpdatesModule invalid context value')
        return
      }
      if (context != null) {
        if (betofferId == null) {
          console.error('need a betofferId or "all" to create subscription')
          return
        }
        type += customTypeSeparator + context
      }
      if (cbs[type] == null) {
        cbs[type] = {}
      }
      if (cbs[type][eventId] == null) {
        if (context != null) {
          cbs[type][eventId] = {}
        } else {
          cbs[type][eventId] = []
        }
      }
      if (context != null) {
        if (cbs[type][eventId][betofferId] == null) {
          cbs[type][eventId][betofferId] = []
        }
        cbs[type][eventId][betofferId].push(cb)
      } else {
        cbs[type][eventId].push(cb)
      }
    },

    basicInfo(eventId, callback) {
      const info = this.api.EVENT_INFO_TYPES.BASIC
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
      })
      this._addCallback(info, eventId, callback)
    },

    score(eventId, callback) {
      const info = this.api.EVENT_INFO_TYPES.SCORE
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
      })
      this._addCallback(info, eventId, callback)
    },

    preMatchBetOffers(eventId, betofferId, callback) {
      const info = this.api.EVENT_INFO_TYPES.BET_OFFERS
      const context = this.api.EVENT_INFO_CONTEXT.PRE_MATCH
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
        context,
      })
      this._addCallback(type, eventId, callback, context, betofferId)
    },

    liveBetoffers(eventId, betofferId, callback) {
      const info = this.api.EVENT_INFO_TYPES.BET_OFFERS
      const context = this.api.EVENT_INFO_CONTEXT.LIVE
      this.api.request(this.api.EVENT_INFO, {
        id: eventId,
        info,
        context,
      })
      this._addCallback(info, eventId, callback, context, betofferId)
    },
  },

  unsubscribe(callback) {
    const cbs = eventUpdatesModule.callbacks
    Object.keys(cbs).forEach(type => {
      Object.keys(cbs[type]).forEach(eventId => {
        const idx = cbs[type][eventId].indexOf(callback)
        if (idx !== -1) {
          cbs[type][eventId].splice(idx, 1)
        }
        if (cbs[type][eventId].length === 0) {
          const [realType, context] = type.split(customTypeSeparator)

          // TODO unsbscribe to kambi
          // remember to split BET_OFFERS_LIVE and BET_OFFERS_PRE_MATCH into context values
        }
      })
    })
  },
}

export default eventUpdatesModule
