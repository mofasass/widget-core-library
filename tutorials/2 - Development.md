### Running the widget

 - Inside the project folder run:

`npm run start`

 - If the build was successful the widget will be running under `https://localhost:8080` after a few seconds. The server that hosts the widgets code runs under port 8080

 - To open the widget inside the Sportsbook while in development configure the `widgetSettings` to point to to `https://localhost:8080/` The server runs under the HTTPS protocol, so in order to see the widget inside the sportsbook it is required to trust the self-signed certificate that the development server uses. See next section for more information.


### HTTPS certificate

`npm run start` starts a built-in webserver (called WebpackDevServer) that hosts the widgets code for development mode. This servers runs under the HTTPS protocol because that is required by the Kambi Sportsbook, as such it has a self-signed certificate which needs to be manually trusted in order to be able to open the widget.

In Chrome and Firefox you can trust the certificate by visiting `https://localhost:8080` and hitting advance to accept the certificate.

For Microsoft Edge and Internet explorer you need to add the certificate on Windows:

- Open control panel
- Open Internet options
- Select content tab
- Click on Certificates
- Select Trusted Root Certification Authorities
- Clici import
- Select the certificate from `project-folder\node_modules\webpack-dev-server\ssl\server.crt`

### Project file structure

```
project
   README.md
   .eslintrc
   .gitignore
   .editorconfig
   LICENSE
   package.json
   dist
   node_modules
   src
      app.scss
      index.html
      index.js
      mockSetupData.json
      i18n
         en_GB.json
```

 - README.md

 Readme for the project

 - .eslintrc, .gitignore, .editorconfig

 Configuration files for the project. These files are overwritten everytime the widget is built to make sure that all the widgets have the same files

 - LICENSE

 License file of the project

 - package.json

  NPM configuration file. This file lists metadata about the project as well as all external dependencies it uses

 - dist

 When building the project for production with `npm run build` the files to be deployed are placed inside this folder

 - node_modules

 All NPM dependencies used in the project are stored in this folder, if the project seems to be missing or using outdated dependencies delete this folder and run `npm install` to download fresh versions of all the dependencies

 - src

 This folder holds the source code for the widget

 - src/app.scss

 SCSS file with styling rules for this widget, this file is converted to regular CSS which is then included in the page during the build process. SCSS is a superset of CSS and as such all CSS is also valid SCSS, so normal CSS can be placed in this file. More information on SCSS [here](http://sass-lang.com/)

 - src/index.html

 The markup of the widget, ideally the widget should only change the `<body>` section of this file. Additional files/libraries should not be included in as `<script>` tags in the page, instead they should be included by `import`ing them inside index.js, although it is still possible to do so. See the following sections on how to add dependencies to the project

 - src/index.js

 This is the main javascript file of the project, see the following sections on how to use it

 - src/mockSetupData.json

 This file is used ONLY when opening the widget OUTSIDE of the Kambi Sportsbook (that means accessing https://localhost:8080/ directly), it mocks values that would normally be passed by the Sportsbook to the widget. By changing values in this file you can test how the widget will look like and behave in different configurations, for example in another language.

 For more information check the API documentation for `coreLibrary.config`, `coreLibrary.args` and `coreLibrary.pageInfo`

 - src/i18n
 This folder holds all the internationalization JSON files of the widget, these are used by the `translationModule`, the use of these files are optional if no internationalization is required. If the user locale is not found in this folder it will fallback to `en_GB.json`. These are all the currently supported locales in the Sportsbook, although they can vary by operator:

 cs_CZ.json, de_DE.json, es_ES.json, fr_CH.json, lt_LT.json, no_NO.json, ro_RO.json, da_DK.json, el_GR.json, et_EE.json, fr_FR.json, lv_LV.json, pl_PL.json, ru_RU.json, de_AT.json, en_AU.json, fi_FI.json, hu_HU.json, nl_BE.json, pt_BR.json, sv_SE.json, de_CH.json, en_GB.json, fr_BE.json, it_IT.json, nl_NL.json, pt_PT.json, tr_TR.json

### Core Library and Build Tools

By default the a widget project uses these two dependencies:

 - `kambi-widget-core-library`

 Has API methods for interacting with the Sportsbook and fetching data as well as methods for internationalization.

 - `kambi-widget-build-tools`

 Defines the build process of the widget as well as the built-in development server. Only used at build time.

These dependencies are external to the project and as such have their own specific versions, you can check their versions inside the `package.json` file.

### Importing and Exporting Files

The widget uses [webpack](https://webpack.github.io/) to transpile, minify, concatenate, bundle all the files and their dependencies together. This is all done automatically by the scripts `npm run start` (which also starts a webserver for development) and `npm run build`. All the webpack configuration is already done by those scripts and as such no configuration is required by the user. However the way that the files are bundled together requires them to be referenced in order for them to be included in the final bundle.

The `entry` point of the application is `src/index.js`, this file needs to reference (import) directly or indirectly all other files used, this means even HTML and CSS files. The template project that is generated by `kambi-widgets-cli init` shows this:

```javascript
import {
   coreLibrary,
   widgetModule,
   offeringModule
} from 'kambi-widget-core-library';
import './index.html';
import './app.scss';

...

```

As can be seen here, that file imports `coreLibrary`, `widgetModule` and `offeringModule` from `kambi-widget-core-library` as well as importing the `./index.html` and `./app.scss`. If those files were not imported they would not be included in the final bundled version (`index.html` would be missing in the `dist` folder for example).

Imports that start with `./` mean that they are importing other files in the same project, while those without `./` are importing files that are dependencies of the project (see next few sections for more information). So it is possible to split the widgets code in multiple javascript files.

More information about exports and imports can be seen [here](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/import) and [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

### Basic Code Setup

All widgets need to start by calling `coreLibrary.init()` and passing it the default arguments that the widget receives. These arguments can be overwritten by the Sportsbook (or inside `src/mockSetupData.json` arguments attribute when running the widget outside the sportsbook). `coreLibrary.init()` returns a `Promise` object which is a way to deal with asynchronous requests (all calls to fetch data in `kambi-widget-core-library` return `Promise`s).

You can learn more about `Promise`s [here](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise). Examples about `Promise`s can also be seen in section `4 - Fetching Data`.

```javascript
coreLibrary.init({
   // default arguments
   title: 'Hello World'
}).then(function () {
   // retrieved arguments
   var args = coreLibrary.args;

   // receiving the title through this widget arguments
   document.getElementById('title').innerText = args.title;
});
```

The above code simply sets the header text of the widget to be `"Hello World"` unless it was defined by the Sportsbook (through the args passed to the widget) to be something else.

### Adding an external Dependency

With the basic setup you only have access to the `kambi-widget-core-library` in the project, which can make it hard to do complex widgets using plain Javascript. If we wanted to add a library to make our jobs easier we could do so by adding a `<script>` tag in the `<head>` section of the page and using it by accessing the global values it defines, but that is not the recommended way of doing this because it can be hard to keep track of all the dependencies the project will need. As an alternative you can also add dependencies using `npm`. For example to add jquery to the project all we need to do is run this in the command line:

`npm install --save jquery`

and start using it by `import`ing it in the javascript:

```javascript
import {
   coreLibrary
} from 'kambi-widget-core-library';
import './index.html';
import './app.scss';
import $ from 'jquery';

coreLibrary.init({
   // default arguments
   title: 'Hello World'
}).then(function () {
   // retrieved arguments
   var args = coreLibrary.args;

   // receiving the title through this widget arguments
   $('#title').text(args.title);
});
```

In this manner it is not necessary change `index.html` to add javascript libraries and stylesheets. You can see a list of all available libraries in the [npm registry](https://www.npmjs.com/)

### Coding Style

The project has linting provided by [eslint](http://eslint.org/). Linters enforce code-style guidelines. They can be configured to appear in your text editor (most have built-in support or a plugin to add support for eslint), but they are also verified at build time. They generate linting errors, but if they happen they do not break the build. So if desired these linting errors can be ignored. In order to keep the coding style consistent across projects the eslint rules are not customizable on a project-by-project basis.

The most important part of the coding style rules is that the default indentation level is set to 3 spaces.

### Common Build Architecture

 Since all webpack build configuration of the widgets is shared and localized in the `kambi-widget-build-tools` dependency it is not possible to add more items to the build architecture. For example replacing SCSS with LESS is not possible. We might add some scape hatches in the future to support customizing the webpack configuration to allow modifying the build process.

### ES6 and JSX

The project has babel [transpilation](https://babeljs.io/) step process set up during the build so it supports the full [ES6 syntax](https://babeljs.io/docs/learn-es2015/) and JSX for React development in all browsers. These new syntaxes are completely optional and can be ignored completely if so desired.

Important: babel only transpiles ES6 syntax, but not ES6 features like [fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API). New ES6 features need to be polyfilled in to support old browsers (for example IE11 does not support fetch API), the `kambi-widget-core-library` polyfills ES6 `Promise`s so those can be safely used no matter the target browser.

Besides ES6 the build process also supports JSX for React development. The only caveat is that JSX syntax is only supported in `.jsx` files. Since the entry point of the project is `src/index.js` that file needs to `import` another `.jsx` file in order to enable JSX. See more about this in section 8 - Using React and widget-components.
