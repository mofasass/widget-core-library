import offeringModule from '../offeringModule'
import schedule from './schedule'

/**
 * Default interval for polling live events
 * @type {number}
 * @memberof module:eventsModule
 */
const DEFAULT_POLLING_INTERVAL = 30000

/**
 * Starts polling given live event.
 * @param {number} eventId Event identifier
 * @param {function(string, ...args)} publishFunc Used for publishing event updates
 * @memberof module:eventsModule
 */
const pollLiveEvent = function(eventId, publishFunc) {
  const event = `LIVE:EVENT:${eventId}`

  schedule.periodically(
    event,
    () =>
      offeringModule.getLiveEvent(eventId).catch(error => {
        publishFunc(`LIVE:EVENT:${eventId}:REMOVED`)
        schedule.stop(event)
        throw error
      }),
    publishFunc.bind(null, event),
    { interval: this.pollingInterval, checkEquality: true }
  )
}

/**
 * Starts pooling given live event statistics.
 * @param {number} eventId Event identifier
 * @param {function(string, ...args)} publishFunc Used for publishing event statistics updates
 * @memberof module:eventsModule
 */
const pollLiveEventData = function(eventId, publishFunc) {
  const event = `LIVE:EVENTDATA:${eventId}`

  schedule.periodically(
    event,
    () =>
      offeringModule.getLiveEventData(eventId).catch(error => {
        publishFunc(`LIVE:EVENTDATA:${eventId}:REMOVED`)
        schedule.stop(event)
        throw error
      }),
    publishFunc.bind(null, event),
    { interval: this.pollingInterval, checkEquality: true }
  )
}

/**
 * Starts polling live events list.
 * @param {function(string, ...args)} publishFunc Used for publishing live event list updates
 * @memberof module:eventsModule
 */
const pollLiveEvents = function(publishFunc) {
  const event = 'LIVE:EVENTS'

  schedule.periodically(
    event,
    () => offeringModule.getLiveEvents(),
    publishFunc.bind(null, event),
    {
      interval: this.pollingInterval,
      checkEquality: false, // there are timers inside each event so we are almost sure that it will differ than previous request
    }
  )
}

/**
 * Starts polling when event becomes live event.
 * @param {number} eventId Event identifier
 * @param {function(string, ...args)} publishFunc Used for publishing live event start
 * @memberof module:eventsModule
 */
const pollLiveEventStart = function(eventId, publishFunc) {
  const event = `LIVE:EVENT:${eventId}:ADDED`

  schedule.periodically(
    event,
    () =>
      offeringModule.getLiveEvent(eventId).then(result => {
        // became live event, no need for further checks
        schedule.stop(event)
        return result
      }),
    publishFunc.bind(null, event),
    {
      interval: this.pollingInterval,
      checkEquality: false, // no need, it will have sth to compare only once, when event appears
    }
  )
}

export default {
  /**
   * Current polling interval
   * @type number
   */
  pollingInterval: DEFAULT_POLLING_INTERVAL,

  /**
   * Starts internal polling services on given event (once it's supported).
   * @param {string} event Event name
   * @param {function(string, ...args)} publishFunc Used for publishing events
   */
  subscribe: function(event, publishFunc) {
    let matches

    if ((matches = event.match(/^LIVE:EVENT:([0-9]+)$/))) {
      pollLiveEvent.call(this, matches[1], publishFunc)
    } else if ((matches = event.match(/^LIVE:EVENTDATA:([0-9]+)$/))) {
      pollLiveEventData.call(this, matches[1], publishFunc)
    } else if (event === 'LIVE:EVENTS') {
      pollLiveEvents.call(this, publishFunc)
    } else if ((matches = event.match(/^LIVE:EVENT:([0-9]+):ADDED$/))) {
      pollLiveEventStart.call(this, matches[1], publishFunc)
    }
  },

  /**
   * Stops polling on given event (once it's supported).
   * @param {string} event Event name
   */
  unsubscribe: function(event) {
    if (/^LIVE:EVENT:[0-9]+$/.test(event)) {
      schedule.stop(event)
    } else if (/^LIVE:EVENTDATA:[0-9]+$/.test(event)) {
      schedule.stop(event)
    } else if (event === 'LIVE:EVENTS') {
      schedule.stop(event)
    } else if (/^LIVE:EVENT:([0-9]+):ADDED$/.test(event)) {
      schedule.stop(event)
    }
  },
}
