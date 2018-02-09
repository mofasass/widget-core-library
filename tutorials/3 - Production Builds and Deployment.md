### Production Build

* Inside the project folder run:

`npm run build`

* If the build was successful after a few seconds the widgets code will be bundled inside the `/dist/` folder. All files of this folder should be deployed to whatever hosting solution you use. The sportsbook needs to point to the `index.html` file from this folder.

### Deployment

Copy the files from the `/dist/` folder to whatever Content Delivery Network (CDN) you use. When configuring the sportsbook the url should point to the `index.html` inside this `/dist/` folder in your CDN of choice. Information about configuring the widgets inside the Sportsbook can be found in the [Kambi Documentation](https://kambiservices.atlassian.net/wiki/display/Kambi/Widgets)

This `/dist/` folder contain all files that the widget requires to run and they should all be deployed to your CDN of choice. The core-library is bundled together with your widget's code into this folder.

### Performance

The build process also produces a `dist/report.html` which contains a visualization of the bundle size split by dependency. You can see what dependencies are consuming the most space in the final bundle and optmize your build by eliminating the biggest offenders.
