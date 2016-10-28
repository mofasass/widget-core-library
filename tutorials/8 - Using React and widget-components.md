Widget-components is a collection of reusable components written with [React](https://facebook.github.io/react/) framework. The use of React and these widget-components is completely optional, but they help a lot in the development and with keeping the style of the widget consistent with the style of the Sportsbook. Currently the list involves following components: OutcomeButton

### Pre-requisites

You can start using widget-components by installing it as a dependency to the project by running:

`npm install kambi-widget-components`

JSX syntax works only in `.jsx` files, so `index.js` should import a `.jsx` file like this:

```javascript
import { ComponentName } from 'kambi-widget-components';
import React from 'react';
import ReactDOM from 'react-dom';

...

ReactDOM.render(
   <ComponentName
      componentProp1="someValue"
      componentProp2={coreLibrary.args.someArgument}
   />,
   document.getElementById('root')
);
```

ReactDOM.render should only be called after `coreLibrary.init()` is resolved.

`kambi-widget-components` also includes `react` and `react-dom` dependencies and as such they don't need to be installed in the project. You can also make your own components and have the whole widget be a React component if desired.


### OutcomeButton

For example OutcomeButton accepts the following props:

 - outcome (required): a outcome object from the `offeringModule`

 - event: a event object from the `offeringModule`

 - withLabel: a Boolean that defines if a label should be shown in the button or not

 - customLabel: overrides the default label with this value

Example:

```javascript
   render() {
      return (
         <OutcomeButton
            outcome={ this.props.outcome }
         ></OutcomeButton>
      );
   }
```


### useRealReact flag

By default the project uses [react-lite](https://github.com/Lucifier129/react-lite) in production build which is a light-weight version of react with focus on small file-size instead of the normal react. While in development mode though (`npm run start`) the project uses the real react because it provides more debug functionalities. This is handled by the `kambi-widget-build-tools` automatically.

React Lite is an alternative implementation of React and as such it can have incompatibilities, although so far we haven't encountered any. If you want to override the default behavior of the build you can force the use of a specific React version by placing a `useRealReact` object in package.json. You can define different values for development and production environment.

package.json:

```javascript
{
   ...
   "useRealReact": {
      "development": [Boolean],
      "production": [Boolean]
   }
}
```

By default `development` is `true` and `production` is `false`
