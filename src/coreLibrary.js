import offeringModule from './Module/offeringModule'
import statisticsModule from './Module/statisticsModule'
import translationModule from './Module/translationModule'
import utilModule from './Module/utilModule'
import widgetModule from './Module/widgetModule'
import updatesModule from './Module/updatesModule'
import constants from './constants'
import mockWidgetApi from './mockWidgetApi'

/**
 * Main module that holds the other modules as well as widget
 * related configurations
 * @module coreLibrary
 */

// checks status of a HTTP response and throws error if appropriate
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// checks browser type and version
function checkBrowser() {
  var ua = window.navigator.userAgent

  var getFirstMatch = function(regex) {
    var match = ua.match(regex)
    return (match && match.length > 1 && match[1]) || ''
  }

  var versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)

  if (/android/i.test(ua)) {
    return {
      browser: 'android',
      browserVersion: versionIdentifier,
    }
  } else if (/(ipod|iphone|ipad)/i.test(ua)) {
    return {
      browser: 'ios',
      browserVersion: getFirstMatch(/(?:mxios)[\s/](\d+(?:\.\d+)+)/i),
    }
  } else if (/msie|trident/i.test(ua)) {
    return {
      browser: 'internet-explorer',
      browserVersion: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i),
    }
  } else if (/chrome|crios|crmo/i.test(ua)) {
    return {
      browser: 'chrome',
      browserVersion: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
    }
  } else if (/safari|applewebkit/i.test(ua)) {
    return {
      browser: 'safari',
      browserVersion: versionIdentifier,
    }
  } else if (/chrome.+? edge/i.test(ua)) {
    return {
      browser: 'microsoft-edge',
      browserVersion: getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
    }
  } else if (/firefox|iceweasel|fxios/i.test(ua)) {
    return {
      browser: 'firefox',
      browserVersion: getFirstMatch(
        /(?:firefox|iceweasel|fxios)[ /](\d+(\.\d+)?)/i
      ),
    }
  }
}

/*
 * Downloads a resource from given URL.
 * @param {string} url URL of resource
 * @returns {Promise.<{status: number, statusText: string, body: string}>}
 */
function download(url) {
  return new Promise((resolve, reject) => {
    // fetch API is not supported in IE11 so we use
    // old-school XMLHttpRequest
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)

    xhr.onload = function() {
      const response = {
        status: xhr.status,
        statusText: xhr.statusText,
        body: 'response' in xhr ? xhr.response : xhr.responseText,
      }

      resolve(response)
    }

    xhr.onerror = () => reject(new TypeError('Network request failed'))

    xhr.ontimeout = () => reject(new TypeError('Network request failed'))

    xhr.send()
  })
}

export default {
  /**
   * If true the coreLibrary has been initialized
   * @type {Boolean}
   */
  initialized: false,

  /** Throws error if the core has already been initialized
   * @private
   */
  checkInit() {
    if (this.initialized) {
      throw new Error(
        'Can not override property after initilization of the coreLibrary'
      )
    }
  },

  /**
   * Name of the browser that is running the widget
   * @type {String}
   */
  browser: checkBrowser().browser,

  /**
   * Browser version
   * @type {String}
   */
  browserVersion: checkBrowser().browserVersion,

  /**
   * An array with the default classes that should be added to HTML tag
   */
  kambiDefaultClasses: [
    'KambiWidget-card-text-color',
    'KambiWidget-card-background-color',
    'KambiWidget-font',
  ],

  /**
   * Config object. This data comes from the sportsbook and should not be manually changed. When in running the widget stand alone this values are retrieved from ./src/mockSetupData.json
   * @name config
   * @type {Object}
   * @property {String} apiBaseUrl url of the offering api to use
   * @property {Boolean} auth
   * @property {Number} channelId
   * @property {String} currency what currency to use
   * @property {String} customer the customer to use with the offering API
   * @property {String} device what kind of device does the user have. Possible values: 'desktop', 'mobile'
   * @property {String} locale locale of the user, example: 'en_GB', 'sv_SE'
   * @property {String} market market to use with the offering API.
   * @property {String} oddsFormat the odds format to show. Possible values: 'decimal', 'fractional', 'american'. To listen to changes to this value use eventsModule.subscribe('ODDS:FORMAT', eventHandlerFn);
   * @property {String} offering the offering to use with the offering API
   * @property {String} routeRoot
   * @property {Boolean} streamingAllowedForPlayer
   * @property {Number} client_id
   * @property {String} version
   */
  _config: {
    apiBaseUrl: '',
    apiBaseUrls: {},
    apiStatisticsBaseUrl: '',
    auth: false,
    channelId: 1,
    currency: 'EUR',
    customer: '',
    device: 'desktop',
    locale: 'en_GB',
    market: 'GB',
    oddsFormat: 'decimal',
    offering: '',
    routeRoot: '',
    streamingAllowedForPlayer: true,
    client_id: 2,
    version: 'v2',
  },

  get config() {
    return this._config
  },

  set config(config) {
    this.checkInit()
    for (var i in config) {
      if (config.hasOwnProperty(i) && this._config.hasOwnProperty(i)) {
        this._config[i] = config[i]
      }
    }
    // Make sure that the routeRoot is not null or undefined
    if (this._config.routeRoot == null) {
      this._config.routeRoot = ''
    } else if (
      this._config.routeRoot.length > 0 &&
      this._config.routeRoot.slice(-1) !== '/'
    ) {
      // If the routeRoot is not empty we need to make sure it has a trailing slash
      this._config.routeRoot += '/'
    }
  },

  /**
   * The odds format for the bets shown in the widget
   * @private
   */
  _oddsFormat: null,

  set oddsFormat(format) {
    this._oddsFormat = format
  },

  get oddsFormat() {
    return this._oddsFormat
  },

  /**
   * default args object
   * @private
   */
  _defaultArgs: {},

  get defaultArgs() {
    return this._defaultArgs
  },

  set defaultArgs(defaultArgs) {
    this.checkInit()
    this._defaultArgs = defaultArgs
  },

  /**
    * args object for the widget, merges the default args provided by coreLibrary.init() with the ones that come from the sportsbook. There are some pre-defined arguments that all widgets accept, but most of them are widget-defined.
    * @property {String} widgetTrackingName Sets widget tracking name for analytics purposes. This tracking name is used for calls to add bets to the betslip
    * @property {String} customCssUrl URL to a CSS file to add to the page, expressions like "{customer}" are replaced with their values in coreLibrary.config. This is useful to load different stylesheets based on operator name.
    Example:
    Say coreLibrary.config.customer is 'kambi', then if this argument was set:
    {
      customCssUrl: "https://someurl.com/customcss/{customer}/style.css"
    }
    It would load this CSS file and add it to the page:
    https://someurl.com/customcss/kambi/style.css

    * @property {String} customCssUrlFallback fallback if the fetching of customCssUrl fails
    * @property {Function} onHeightChange Callback called when an embedded widget height changes (by calling either widgetModule.setWidgetHeight or widgetModule.adaptWidgetHeight)
    * @property {Function} onWidgetRemoved Callback called when an embedded widget removes itself (by calling widgetModule.removeWidget)
    * @property {Array<Object>} conditionalArgs Optional, specify arguments to be applied based on some condition based in the values inside coreLibrary.config or coreLibrary.pageInfo
    example:

    conditionalArgs: [
      // if coreLibrary.config.currency is 'EUR' apply { euro: true, dollars: false } to the arguments
      {
         config: {
            currency: 'EUR'
         },
         args: {
            euro: true,
            dollars: false
         }
      },
      // if market is 'IT' AND offering is 'IT' apply { italian: true } to the arguments
      {
         config: {
            market: 'IT',
            offering: 'IT'
         },
         args: {
            italian: true
         }
      },
    ]

    * @name args
    */
  _args: null,

  get args() {
    return this._args
  },

  set args(args) {
    this.checkInit()
    args = Object.assign({}, this.defaultArgs, args)

    // Handling conditionalArgs
    if (args.conditionalArgs != null) {
      args.conditionalArgs.forEach(carg => {
        var apply = true
        if (carg.clientConfig != null) {
          Object.keys(carg.clientConfig).forEach(key => {
            if (this.config[key] !== carg.clientConfig[key]) {
              apply = false
            }
          })
        }

        if (carg.pageInfo != null) {
          Object.keys(carg.pageInfo).forEach(key => {
            if (this.pageInfo[key] !== carg.pageInfo[key]) {
              apply = false
            }
          })
        }

        if (apply) {
          console.log('Applying conditional arguments:')
          console.log(carg.args)
          args = Object.assign(args, carg.args)
        }
      })
    }

    this._args = args
  },

  /**
   * Information about the page that the widget is being loaded from
   * @name pageInfo
   * @type {Object}
   * @property {Array(String)} leaguePaths array with league paths. Example:['football/england/premier_league']
   * @property {String} pageParam parameter for this page. For a page of type 'filter' an example would be 'football/england/premier_league'
   * @property {String} pageTrackingPath the path in the url for this page. For example: '/filter/football/england/premier_league'
   * @property {String} pageType type of the page, examples: 'home', 'filter'
   */
  _pageInfo: {
    leaguePaths: [],
    pageParam: '',
    pageTrackingPath: '',
    pageType: '',
  },

  get pageInfo() {
    return this._pageInfo
  },

  set pageInfo(pageInfo) {
    this.checkInit()
    // Check if the last character in the pageParam property is a slash, if not add it so we can use this property in filter requests
    if (
      pageInfo.pageType === 'filter' &&
      pageInfo.pageParam.substr(-1) !== '/'
    ) {
      pageInfo.pageParam += '/'
    }
    this._pageInfo = pageInfo
  },

  /**
   * Element that should be used as root to render the widget from. Widgets should render only inside this element
   * @name rootElement
   * @type {HTMLElement}
   */
  rootElement: null,

  /**
   * Element that the widget will be placed inside of when running in embedded mode
   * @name rootElement
   * @type {HTMLElement}
   * @private
   */
  embeddedElement: null,

  /**
   * Versions of the API provided by the sportsbook
   * @name apiVersions
   * @type {Object}
   * @property {String} client
   * @property {String} libs
   * @property {String} wapi
   */
  _apiVersions: {
    client: '',
    libs: '',
    wapi: '',
  },

  get apiVersions() {
    return this._apiVersions
  },

  set apiVersions(versions) {
    this.checkInit()
    this._apiVersions = versions
  },

  /**
   * The name sent to Kambi API for analytics data collection
   */
  _widgetTrackingName: null,

  set widgetTrackingName(name) {
    if (name == null) {
      name = null // transforms undefined to null
    }
    this._widgetTrackingName = name
  },

  get widgetTrackingName() {
    return this._widgetTrackingName
  },

  /**
   * Promise that is resolved when all the CSS has finished loading
   * @type Promise
   */
  cssLoadedPromise: null,

  /**
   * @type Object
   * a direct reference to the Kambi's WidgetApi (wapi)
   */
  widgetApi: null,

  /**
   * Initializes the Kambi api
   * Uses ./src/mockSetupData.json as coreLibrary.configs if not loaded inside the sportsbook (ie opened the widget directly).
   * @param {Object} defaultArgs arguments to be used if they are not provided by the sportsbook
   * @returns {Promise} resolved when everything is ready. If an error happens during fetching the error can be catched in a .catch() function
   */
  init(defaultArgs) {
    this.defaultArgs = defaultArgs
    const EMBEDDED = process.env.EMBEDDED === 'true'

    return new Promise((resolve, reject) => {
      // applies the setup data and sets up the CSS and translations
      var applySetupData = setupData => {
        this.oddsFormat = setupData.clientConfig.oddsFormat
        this.config = setupData.clientConfig
        this.pageInfo = setupData.pageInfo
        this.apiVersions = setupData.versions
        this.args = setupData.arguments
        if (!EMBEDDED) {
          // if embedded the widget will assume that operator CSS is included by whoever is embedding it
          this.injectOperatorCss(this.config.customer, this.config.offering)

          const body = document.getElementsByTagName('body')[0]
          this.kambiDefaultClasses.map(cssClass => {
            body.classList.add(cssClass)
          })
        }
        this.injectCustomCss(
          this.args.customCssUrl,
          this.args.customCssUrlFallback
        )

        this.widgetTrackingName = this.args.widgetTrackingName

        this.initialized = true
        resolve()
      }

      if (EMBEDDED) {
        if (!window.gmWidgets) {
          window.gmWidgets = {}
        }
        window.gmWidgets[process.env.WIDGET_NAME] = (
          container,
          wapi,
          clientConfig,
          args
        ) => {
          this.widgetApi = wapi
          this.embeddedElement = container
          this.rootElement = document.createElement('div')
          this.rootElement.style.boxSizing = 'border-box'
          this.embeddedElement.style.boxSizing = 'border-box'
          this.embeddedElement.style.height = 0
          this.embeddedElement.style.overflowY = 'hidden'
          this.embeddedElement.appendChild(this.rootElement)
          if (window.KambiWidget.receiveResponse == null) {
            window.KambiWidget.receiveResponse = function() {}
          }
          const previousResponseHandler = window.KambiWidget.receiveResponse
          window.KambiWidget.receiveResponse = dataObject => {
            previousResponseHandler(dataObject) // calls any handlers from other widgets or the main page
            widgetModule.handleResponse(dataObject)
            updatesModule.handleResponse(dataObject)
          }
          widgetModule.requestBetslipOutcomes()
          // we intentionally do not call requestOddsFormat here, this method should be called exactly once per page so it should be called by whoever is calling this widget.
          //widgetModule.requestOddsFormat()
          applySetupData({
            clientConfig: Object.assign({}, clientConfig),
            arguments: Object.assign({}, args),
            pageInfo: {},
            versions: {},
          })
        }
      } else if (window.self === window.top) {
        // For development purposes we might want to load a widget on its own so we check if we are in an iframe, if not then load a mocked version of the setupData
        this.widgetApi = mockWidgetApi
        this.rootElement = document.getElementById('body')
        console.warn(
          window.location.host +
            window.location.pathname +
            ' is being loaded as stand-alone'
        )

        this.getData('mockSetupData.json')
          .then(mockSetupData => {
            console.debug('Loaded mock setup data')
            console.debug(mockSetupData)
            applySetupData(mockSetupData)
          })
          .catch(error => {
            console.debug('Failed to fetch mockSetupData')
            console.trace(error)
            reject()
          })
      } else {
        this.rootElement = document.getElementById('body')
        window.KambiWidget.apiReady = wapi => {
          this.widgetApi = wapi

          // Request the setupData from the widget api
          widgetModule.requestSetup(setupData => {
            // Request the outcomes from the betslip so we can update our widget, also sets up a subscription for future betslip updates
            widgetModule.requestBetslipOutcomes()
            // Request the odds format that is set in the sportsbook, this also sets up a subscription for future odds format changes
            widgetModule.requestOddsFormat()

            applySetupData(setupData)
          })
        }
        // Setup the response handler for the widget api
        window.KambiWidget.receiveResponse = dataObject => {
          widgetModule.handleResponse(dataObject)
          updatesModule.handleResponse(dataObject)
        }
      }
    })
  },

  /**
   * Dynamically creates a style tag and returns it
   * @param id {String} the id to add to the tag
   * @param content {String} text content of the tag (the styles)
   * @returns HTMLElement the tag created
   * @private
   */
  createStyleTag(id, url) {
    const tag = document.createElement('link')
    tag.setAttribute('id', id)
    tag.setAttribute('rel', 'stylesheet')
    tag.setAttribute('type', 'text/css')
    tag.setAttribute('href', url)
    return tag
  },

  /**
   * Injects operator specific CSS based on version defined in constans.js,
   * customer and offering
   * @param customer {String}
   * @param offering {String}
   * @private
   */
  injectOperatorCss(customer, offering) {
    const url =
      '//c3-static.kambi.com/sb-mobileclient/widget-api/' +
      constants.widgetCssVersion +
      '/resources/css/' +
      customer +
      '/' +
      offering +
      '/widgets.css'
    const tag = this.createStyleTag('operator-css', url)
    const head = document.getElementsByTagName('head')[0]
    // opereator CSS should be the FIRST CSS in the page
    head.insertBefore(tag, head.firstChild)
  },

  /**
   * Injects stylesheet based on configuration parameters (coreLibrary.config)
   * Replaces expressions like "{customer}" in the strings provided
   * @param customCssUrl {String}
   * @param customCssUrlFallback {String} Fallback if the first URL fetch fails
   * @returns {Promise} when resolved the stylesheet has been successfully added to the page
   * @private
   */
  injectCustomCss(customCssUrl, customCssUrlFallback) {
    if (customCssUrl == null) {
      return
    }
    if (customCssUrlFallback == null) {
      customCssUrlFallback = ''
    }

    customCssUrl = utilModule.replaceConfigParameters(customCssUrl)
    customCssUrlFallback = utilModule.replaceConfigParameters(
      customCssUrlFallback
    )

    const appendToHead = url => {
      const tag = this.createStyleTag('custom-css', url)
      const head = document.getElementsByTagName('head')[0]
      // custom CSS should be the LAST CSS in the page
      head.insertBefore(tag, null)
    }

    // TODO instead of doing an extra request maybe try to add an
    // event listener to the <link> tag to see if the file exists or not
    // see http://stackoverflow.com/questions/10537039/how-to-determine-if-css-has-been-loaded
    return this.getFile(customCssUrl)
      .then(response => {
        appendToHead(customCssUrl)
        return response
      })
      .catch(error => {
        if (customCssUrlFallback !== '') {
          console.debug('Error fetching custom css, using fallback')
          appendToHead(customCssUrlFallback)
        } else {
          console.debug('Error fetching custom css, no fallback present')
          return error
        }
      })
  },

  /**
   * Makes a AJAX request and parses its response as JSON
   * @param {String} url
   * @returns {Promise} resolved when the data fetching finishes. If an error happens during fetching the error can be catched in a .catch() function
   */
  getData(url) {
    return download(url)
      .then(checkStatus)
      .then(response => {
        return JSON.parse(response.body)
      })
      .catch(error => {
        console.debug('Error fetching data')
        console.trace(error)
        throw error
      })
  },

  /**
   * Makes a AJAX request and parses its response as text
   * @param {String} url
   * @returns {Promise} resolved when the data fetching finishes. If an error happens during fetching the error can be catched in a .catch() function
   */
  getFile(url) {
    return download(url)
      .then(checkStatus)
      .then(response => response.body)
      .catch(error => {
        console.debug('Error fetching file')
        console.trace(error)
        throw error
      })
  },
}
