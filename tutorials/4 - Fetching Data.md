# Fetching Data


Fetching data is done through the Kambi's Offering API and the Statistics API. The `widget-core-library` offers a wrapper around these API through the `offeringModule` and the `statisticsModule`. These modules take care of setting all the appropriate values in the request URLs as well as abstracting the endpoints of the APIs as functions that return `Promise`s.

Note that it is only possible to fetch data after the `coreLibrary.init()` call has been finished. That means inside its `.then()` callback.

### Using Promises
TODO

### Offering Module
The `offeringModule` provides data about events, their statuses and their betOffers. It also provides information about the live data for live events.

 - Example getting all live events

```javascript
import { offeringModule } from 'widget-core-library';

...

offeringModule.getLiveEvents()
   .then(function(data) {
      console.log(data);
   });
```

 - Getting all betOffers of a single event

 By default the
 ```javascript
 import { offeringModule } from 'widget-core-library';

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

// getting all betOffers of all live events
offeringModule.getLiveEvents()
   .then(function(data) {
      var promises = data.events.map(function(eventData) {
         return offeringModule.getLiveEvent(eventData.event.id)
            .catch(function(err) { // getLiveEvents() sometimes returns events that just finished and don't exists anymore
               console.log(err);
            })
      });

      return Promise.all(promises);
   }).then(function(data) {
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

 Filters also accept an wildcard called `all` that allows you to skip a certain part of the filter. For example `football/all/all/` is the same as `football/`.

 Examples

```javascript
import { offeringModule, widgetModule } from 'widget-core-library';

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

### Statistics Module

TODO
