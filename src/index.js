import './polyfills'
import coreLibrary from './coreLibrary'
import offeringModule from './Module/offeringModule'
import statisticsModule from './Module/statisticsModule'
import translationModule from './Module/translationModule'
import utilModule from './Module/utilModule'
import widgetModule from './Module/widgetModule'
import eventsModule from './Module/EventsModule/index'
import updatesModule from './Module/updatesModule'

if (window != null) {
  window.WidgetCoreLibrary = {
    coreLibrary,
    offeringModule,
    statisticsModule,
    translationModule,
    utilModule,
    widgetModule,
    eventsModule,
    updatesModule,
  }
}

export {
  coreLibrary,
  offeringModule,
  statisticsModule,
  translationModule,
  utilModule,
  widgetModule,
  eventsModule,
  updatesModule,
}
