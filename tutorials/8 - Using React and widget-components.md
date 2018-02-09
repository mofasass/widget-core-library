Widget-components is a collection of reusable components written with [React](https://facebook.github.io/react/) framework. The use of React and these widget-components is completely optional, but they help a lot in the development and with keeping the style of the widget consistent with the style of the Sportsbook.

### Pre-requisites

You can start using widget-components by installing it as a dependency to the project by running:

`npm install kambi-widget-components`

```javascript
import { ComponentName } from 'kambi-widget-components';
import React from 'react';
import ReactDOM from 'react-dom';

...

ReactDOM.render(reactElement, document.getElementById('root'));
```

ReactDOM.render should only be called after `coreLibrary.init()` is resolved.

You can also make your own components and have the whole widget be a React component if desired, but the components can also be used without using React for the main part of the application.

### Creating React Elements

To render one of the reusable components from `kambi-widget-components`

```javascript
import { Header } from 'kambi-widget-components'
import React from 'react'
import ReactDOM from 'react-dom'

var header = React.createElement(
  Header,
  { collapsable: false },
  'This is the Header title'
)

ReactDOM.render(header, document.getElementById('root'))
```

### Creating React Elements with JSX

JSX is an extension of the normal JavaScript programming language, it adds syntatic sugar to transform HTML code into calls to React.createElement. The following example is equivalent to the previous example:

```javascript
import { Header } from 'kambi-widget-components'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <Header collapsable={false}>This is the Header title</Header>,
  document.getElementById('header')
)
```

Note: JSX syntax works only in `.jsx` files, so `index.js` should import a `.jsx` for this syntax to work. The whole widget (except `index.js`) can be written in `.jsx` file if so desired.

### Using React

It is possible to use only the pre-made components available in `kambi-widget-components`, but that is not really recommended. Due to the fact that the widgets live inside iframes it is highly recommended to avoid big dependencies like software frameworks (there will be multiple copies, one for each iframe). It is recommend to either not use any frameworks/libraries (even jQuery is quite big) or use our React solution. Behind the scenes if (and only if) you use React components your project [preact](https://preactjs.com/) will be bundled with the widgets code. This is a very small implementation of the React API (~3 kilobytes vs React ~32kb) and as such its performance impact is minimal.

The widget can use React even without including `kambi-widget-components`, widgets can be written completely as React components if desired, or they can only use the components from `kambi-widget-components` or not use React at all.

### useRealReact flag

By default the project replaces the normal version of React with [preact](https://github.com/Lucifier129/react-lite) in production builds only (`npm run build`). While in development mode though (`npm run start`) the project uses the real React because it provides more debug functionalities. This is handled by the `kambi-widget-build-tools` automatically.

Preact is an alternative implementation of React and as such it can have incompatibilities, although so far we haven't encountered any. If you want to override the default behavior of the build you can force the use of a specific React version by placing a `useRealReact` object in package.json. You can define different values for development and production environment.

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
