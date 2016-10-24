# Fetching Data


Fetching data is done through the Kambi's Offering API and the Statistics API. The `widget-core-library` offers a wrapper around these API through the `offeringModule` and the `statisticsModule`. These modules take care of setting all the appropriate values in the request URLs as well as abstracting the endpoints of the APIs as functions that return `Promise`s.

Note that it is only possible to fetch data after the `coreLibrary.init()` call has been finished. That means inside its `.then()` callback/

### Using Promises
TODO

### Offering Module
The `offeringModule` provides data about events, their status and their betoffers. It also provides information about the live data for live events.

 - Example getting all live events

```javascript
import { offeringModule } from 'widget-core-library';

...

offeringModule.getLiveEvents()
   .then(function(data) {
      console.log(data);
   });
```

See the `offerModule` documentation for a list of all the methods.

 - Getting all betoffers of a single event

 By default the
 ```javascript
 import { offeringModule } from 'widget-core-library';

 ...

 offeringModule.getEvent(eventId)
    .then(function(data) {
       console.log(data);
    });
 ```

 - Making a filter request

 Filter request are a way to get all the events associated with a filter, filters are strings that define a subset of events. A few examples:

 `football/`

 `football/england/`

 `football/england/premier_league`

 `football/england/premier_league/all/all/competition`

 `football/england/premier_league/all/all/match`

 Filters also accept an wildcard called `all` that allows you to skip a certain part of the filter. For example `football/all/all/` is the same as `football/`


### Statistics Module

The statistics
