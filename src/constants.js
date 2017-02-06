// The constants defined here are used by both the
// core-library and the build-tools

// don't use "export default" here because inside the build-tools there is no transpiling
module.exports = {
   /*
    although it seems like widgetCssVersion and
    widgetApiVersion are synced that is not really the
    case. Sometimes Kambi bumps the wapi version
    without creating a new stylesheet for all operators
    */

   // version of the widget API to use
   // https://c3-static.kambi.com/sb-mobileclient/widget-api/{widgetApiVersion}/kambi-widget-api.js
   widgetApiVersion: '1.0.0.21',

   // version of widgets.css to use
   // https://c3-static.kambi.com/sb-mobileclient/widget-api/{widgetCssVersion}/resources/css/kambi/kambi/widgets.css
   widgetCssVersion: '1.0.0.21'
};
