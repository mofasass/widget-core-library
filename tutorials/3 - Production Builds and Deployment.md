# Production Builds and Deployment

### Production Build

- Inside the project folder run:

 `npm run build`

 - If the build was successful after a few seconds the widgets code will be bundled inside the `/dist/` folder. All files of this folder should be deployed to whatever hosting solution you use. The sportsbook needs to point to the `index.html` file from this folder.

 - Code style errors (linting) do not break the build and can be ignored if so desired.

### Deployment

 Copy the files from the `/dist/` folder to whatever Content Delivery Network (CDN) you use. When configuring the sportsbook the url should point to the `index.html` inside this `/dist/` folder in your CDN of choice. Information about configuring the widgets inside the Sportsbook can be found inside the [Kambi Documentation](https://kambiservices.atlassian.net/wiki/display/Kambi/Widgets)
