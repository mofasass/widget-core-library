### Introduction

To build and deploy a widget it is necessary to


### Pre-requisites

 - Install [Nodejs latest version](https://nodejs.org/en/)

 - Install Gulp:

 `npm install -g gulp`

### Building

 - Clone the widget repository you want to build. For example to clone the twitter widget:

 `git clone git@github.com:kambi-sportsbook-widgets/twitter-widget.git`

 - Move to the cloned repository folder (`cd twitter-widget`)

 - Run:

 `npm install`

 Note that the first time you do this (for each repository) it can take a few minutes

- Run:

`gulp default-bundle`

- The built version for the widget will be inside the `dist` folder

- Subsequent builds only need to run `gulp default-bundle` again. If a new version of the widget is downloaded from the repostiory then it is necessary to run `npm install again`


### Deploying

- Copy the contents of the `dist` folder to where you host your widgets

- Point the Kambi Sportsbook to the `index.html` file inside that folder

- See each widget README about arguments that need to be passed through the Sportsbook to the widget
