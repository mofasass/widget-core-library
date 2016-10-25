Fetching data is done through the Kambi's Offering API and the Kambi's Statistics API. The `kambi-widget-core-library` offers a wrapper around these API through the `offeringModule` and the `statisticsModule`. These modules take care of setting all the appropriate values in the request URLs as well as abstracting the endpoints of the APIs as functions that return `Promise`s.

Note that it is only possible to fetch data after the `coreLibrary.init()` call has been finished. That means inside its `.then()` callback.

### Using Promises

`Promise` is a way to deal with asynchronous (AJAX) requests, it allows for easier chaining and error handling of requests than callbacks. All asynchronous methods of the `kambi-widget-core-library` return `Promise`s.

`Promise`s are Javascript objects and as such they have methods, these methods are `then(fn)` and `catch(fn)`. Both receive a function as an argument:

 - `then(fn)`

 `fn` called when the `Promise` is resolved, ie the request has finished successfully. Returns a new `Promise`

 - `catch(fn)`

 `fn` called when the `Promise` is reject, ie the request has finished unsuccessfully. Returns a new `Promise`

Both these functions return a new `Promise` object in a way that allows chaining these methods together

Example

```javascript

import { offeringModule } from 'kambi-widget-core-library';

...

var promise = offeringModule.getEvent(someEventId);

promise = promise.then(function (response) {
   console.log('success!');
   console.log(response);
});

promise = promise.catch(function (error) {
   // only called if an error happened
   console.log('error!');
   console.log(error);
});


// same thing as above, but in a more concise way
offeringModule.getEvent(someEventId)
   .then(function (response) {
      console.log('success!');
      console.log(response);
   })
   .catch(function (error) {
      // only called if an error happened, for example event not found
      console.log('error!');
      console.log(error);
   });
```

 - Error Handling

 `catch(fn)` also catches errors that happen inside previous `then(fn)` blocks. It is a good practice for Kambi Widget development to make the widget remove itself when an error happens. That means it fails gracefully and does not show in a broken state in the Sportsbook.

 Example

```javascript
import { offeringModule, widgetModule } from 'kambi-widget-core-library';

offeringModule.getLiveEvents()
   .then(function (response) {
      if (response.liveEvents.length === 0) {
         throw new Error('No live events!');
      }
      console.log('success!');
      console.log(response);
   })
   .catch(function (error) {
      // only called if an error happened
      console.log('error!');
      console.log(error);
      widgetModule.removeWidget(); // widget is removed from the Sportsbook
   });
```

 - Chaining Promises

 It is possible to chain `Promise`s by returning a new `Promise` inside a `then(fn)` function, the subsequent `then(fn)` call will be invoked when this returned `Promise` is resolved.

 `catch(fn)` blocks in the chain will catch any errors that happen before it in the chain.


```javascript
import { offeringModule, widgetModule } from 'kambi-widget-core-library';

offeringModule.getLiveEvents()
   .then(function (response) {
      if (response.events.length === 0) {
         throw new Error('No live events!');
      }
      // getting the first event betOffers
      var id = response.events[0].event.id;
      return offeringModule.getLiveEvent(id); // this returns a Promise
   })
   .then(function (response) {
      console.log(response.betOffers);
   })
   .catch(function (error) {
      // only called if an error happened in ANY request of the chain
      console.log('error!');
      console.log(error);
      widgetModule.removeWidget(); // widget is removed from the Sportsbook
   });
```

 - Parallel Promises

 Sometimes we want to execute asynchronous calls in parallel for faster data-fetching, to do that we can use `Promise.all(promiseArray)`. It returns a new `Promise` that is resolved when all `Promise`s inside `promiseArray` resolve.

 Example
 ```javascript
 import { offeringModule, widgetModule } from 'kambi-widget-core-library';

 offeringModule.getLiveEvents()
    .then(function (response) {
       if (response.events.length === 0) {
          throw new Error('No live events!');
       }

       // getting the first event betOffers
       var promises = [];
       for (var i = 0; i < response.events; i++) {
          var id = response.events[i].event.id;
          var promise = offeringModule.getLiveEvent(id);
          promises.push(promise);
       }
       return Promise.all(promises);
    })
    .then(function (response) {
       // will have all the betoffers for all live events
       console.log(response);
    })
    .catch(function (error) {
       // only called if an error happened in ANY request of the chain
       console.log('error!');
       console.log(error);
       widgetModule.removeWidget(); // widget is removed from the Sportsbook
    });
 ```


More about [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)


### Offering Module

The `offeringModule` provides data about events, their statuses and their betOffers. It also provides information about the live data for live events.

 - Example getting all live events

```javascript
import { offeringModule } from 'kambi-widget-core-library';

...

offeringModule.getLiveEvents()
   .then(function(data) {
      console.log(data);
   });
```

 - Getting all betOffers of a single event

```javascript
import { offeringModule } from 'kambi-widget-core-library';

...

// if it is a pre-live event
offeringModule.getEvent(eventId)
    .then(function(data) {
       console.log(data);
    });

// if it is a live event
offeringModule.getLiveEvent(eventId)
   .then(function(data) {
    console.log(data);
   });
```

 - Making a filter request

 Filter request are a way to get all the events associated with a filter, filters are strings that define a subset of events. A few examples:

 `football`: all football events

 `football/england`: all football events from england

 `football/england/premier_league`: all football events from the english premier_league tournament

 `football/england/premier_league/arsenal`: all football events from the english premier_league in which the Arsenal team is playing

 `football/england/premier_league/all/competitions`: all events of type ET_COMPETITON from the premier_league. This excludes actual matches, returning only the overall competition data. For example "Premier League Group A", "Premier League Group B", "Premier League" (the overall tournament).

 `football/england/premier_league/all/matches`: all events of type ET_MATCH from the premier_league tournament. This excludes competitions and returns only actual matches. For example: "Sunderland - Arsenal", "Manchester United - Burnley".

 Filters also accept a wildcard called `all` that allows you to skip a certain part of the filter. For example `football/all/all` is the same as `football`.

 Examples

```javascript
import { offeringModule, widgetModule } from 'kambi-widget-core-library';

...

offeringModule.getEventsByFilter('football')
   .then(function(data) {
      console.log(data.events);
   })

offeringModule.getEventsByFilter('football/england/premier_league')
   .then(function(data) {
      console.log(data.events);
   })

// combining two filters
offeringModule.getEventsByFilter('football/england,germany')
   .then(function(data) {
      console.log(data.events);
   })
```

 - Notes

 All offering calls that return multiple events (`getEventsByFilter` for example) also return its main betOffer if it exists. To get ALL betOffers of an event you need to use `getEvent(eventId)` or `getLiveEvent(eventId)` depending if the event is live or not.

 `getEventsByFilter` returns both live and pre-live matches, it is possible to differentiate between them using `eventData.event.openForLiveBetting`. If it is true then it the match is live and to get all its betoffers one should use `getLiveEvent(eventId)` instead of `getEvent(eventId)`

 See the `offeringModule` documentation for a list of all the methods.
