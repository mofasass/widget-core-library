import liveEventsAdapter from './liveEventsAdapter'

/**
 *
 * @type {object.<string, function[]>}
 * @memberof module:eventsModule
 */
const handlers = {}

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
 * 'PAGE:INFO': Page info changed
 *
 * 'ODDS:FORMAT': Odds format changed
 *
 * 'CLIENT:CONFIG': Client config changed
 *
 * 'USER:LOGGED_IN': User logged in changed
 *
 * 'LIVE:EVENT:{eventId}': Live event statistics changed
 *
 * 'LIVE:EVENT:{eventId}:REMOVED': Not a live event anymore
 *
 * 'LIVE:EVENTDATA:{eventId}': Live event's statistics changed
 *
 * 'LIVE:EVENTDATA:{eventId}:REMOVED': Not a live event anymore
 *
 * 'LIVE:EVENTS': Live events list changed
 *
 * @example
 *
 * eventsModule
 *    .subscribe('OUTCOME:ADDED:' + outcome.id,
 *       ( data ) => {
 *          ...
 *       });
 *
 @module eventsModule
 */
const EventsModule = {
  /**
   * Live services polling interval (in milliseconds)
   */
  set liveEventPollingInterval(value) {
    if (typeof value !== 'number') {
      throw new Error(`Invalid number: ${value}`)
    }

    liveEventsAdapter.pollingInterval = value
  },

  /**
   * Subscribes a handler to given event.
   * @param {string} event Event name
   * @param {function} handler Handler function
   */
  subscribe(event, handler) {
    if (handlers.hasOwnProperty(event)) {
      handlers[event].push(handler)
    } else {
      handlers[event] = [handler]

      // start proper polling service when first listener of given LIVE:* event subscribes
      liveEventsAdapter.subscribe(event, this.publish.bind(this))
    }
  },

  /**
   * Unsubscribes handler/all handlers from given event.
   * @param {string} event Event name
   * @param {function?} handler Optional handler function pointer
   */
  unsubscribe(event, handler) {
    if (!handlers.hasOwnProperty(event)) {
      return
    }

    if (handler) {
      // remove particular handler
      const handlerIdx = handlers[event].indexOf(handler)

      if (handlerIdx > -1) {
        handlers[event].splice(handlerIdx, 1)
      }
    } else {
      // remove all handlers for given event
      handlers[event] = []
    }

    if (handlers[event].length == 0) {
      delete handlers[event]

      // stop additional polling services on given event
      liveEventsAdapter.unsubscribe(event)
    }
  },

  /**
   * Emits an event with given arguments.
   * @param {string} event Event name
   * @param {...*} args Arguments for handlers
   */
  publish(event, ...args) {
    if (!handlers.hasOwnProperty(event)) {
      return
    }

    handlers[event].forEach(handler => handler.apply(undefined, args))
  },
}

export default EventsModule
