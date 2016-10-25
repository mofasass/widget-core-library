Interaction with the sportsbook is done through the `widgetModule`. A few examples of interactions are: changing the widget height, remove the widget from the Sportsbook, adding bets to the betslip. For full documentation please check the `widgetModule` API documentation.

Note: Most of the methods inside the `widgetModule` only work when the widget is running inside the Sportsbook, when opening the widget as stand-alone these methods don't do anything.

### Widget Height

Since the widgets run inside iframes in the Sportsbook the widget needs to manually control its own height (iframes don't grow in size based in their contents height). The `widgetModule` provides two ways of changing the widget's height, every time the widget needs to change its height (for example when receiveing new data) one of these methods should be used

 - `widgetModule.adaptWidgetHeight()`

 Tries to make the widget the same height as the `<body>` tag of the page, essentially making the iframe the same size of the widget. This approach doesn't always work, first the `<body>` tag can not have a 100% height styling rule, secondly this method needs to be called AFTER animations that dynamically change the `<body>` height end (both CSS animations and Javascript animations have this limitation), which basically means that animations that change the widget's height are unusable.

 - `widgetModule.setHeight(value)`

 Sets the height to a specific value in pixels, this method has no gotchas like the `adaptWidgetHeight()`, but it can be very cumbersome to keep track of the widgets height manually.


### Removing the Widget

The widget can choose to remove itself from the Sportsbook, this is useful to handle unexpected states in the data (like no events to show) and to prevent the widget from being in a broken state in cases of unexpected errors:

```javascript
// same thing as above in a more concise manner
offeringModule.getEvent(someEventId)
   .then(function (response) {
      console.log('success!');
      console.log(response);
   })
   .catch(function (error) {
      console.log(error);
      console.log('Error, maybe the event with the provided id does not exists? Widget removing itself');
      widgetModule.removeWidget();
   });
```

### Navigating to Other Pages

The `widgetModule` allows the user to navigate to other parts of the Sportsbook. Example:

```javascript
widgetModule.navigateToFilter('football/england/premier_league');
```

### Adding Bets to Betslip

BetOffers returned from the `offeringModule` have two or more outcomes (the possible choices in the bet). The `widgetModule` offers a way to add those outcomes to the betslip.

```javascript
widgetModule.addOutcomeToBetslip(outcome.id);
```

### Events

The `widgetModule` offers a publish/subscribe system to listen for a few specific events. For example

```javascript
widgetModule.events.subscribe('ODDS:FORMAT', function() {
   console.log('odds format changed!');
});
```
