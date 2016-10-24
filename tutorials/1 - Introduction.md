# Introduction

Widgets are self-contained content that can be added to various places in the Kambi client. It provides the possibility for the operator to differentiate the client, to add unique features or content, and to tailor the client to a group of players, or even to individuals.

The widget is an html-page loaded inside an iframe. By configuration using JavaScript the operator controls what widgets to load, where to place them and when to display them.


### Pre-requisites

 - Install [Nodejs latest version](https://nodejs.org/en/)

 - By installing Nodejs you should have the `npm` command line tool installed. With it run:

 `npm install --global git+ssh://git@github.com/kambi-sportsbook-widgets/widget-build-tools.git#v2.1.3`

 - By running this command you will now have a new command line tool called `kambi-widgets-cli` which is used for creating new projects

### Creating a New Project

 - Run:

 `kambi-widgets-cli init project-name`

 A new project will be created inside the `project-name` folder. This project has a very simple demonstration on how to build a widget.

### Setup an Existing Project

 - Clone the project repository

 - Inside the project folder run:

 `npm install`

### Running the Project in Development Mode

  - Inside the project folder run:

  `npm run start`

  - If the build was successful the widget will be running under `https://localhost:8080` after a few seconds. The server that hosts the widgets code runs under port 8080 and under the HTTPS protocol with a self-signed certificate, which means you might get an HTTPS certificate error unless you trust the certificate.

See the section 2 - Development for more information.

### Building a Project for Production

- Inside the project folder run:

 `npm run build`

 - If the build was successful after a few seconds the widgets code will be bundled inside the `/dist/` folder. All files of this folder should be deployed to whatever hosting solution you use. The sportsbook needs to point to the `index.html` file from this folder.

See section 3 - Production Builds and Deployment for more information