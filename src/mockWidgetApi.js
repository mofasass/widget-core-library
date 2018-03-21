// this is a mock widget api that is used when opening the widget standalone

export default {
  requestSetup() {},
  request() {},
  set() {},
  remove() {},
  createUrl() {},
  navigateClient() {},
  BETSLIP_OUTCOMES_ARGS: {
    UPDATE_REPLACE: 'replace',
    UPDATE_APPEND: 'append',
    TYPE_SINGLE: 'single',
    TYPE_COMBINATION: 'combination',
    TYPE_SYSTEM: 'system',
    TYPE_PATENT: 'patent',
    TYPE_TRIXIE: 'trixie',
    TYPE_YANKEE: 'yankee',
    TYPE_CANADIAN: 'canadian',
    TYPE_HEINZ: 'heinz',
    TYPE_SUPERHEINZ: 'superheinz',
  },
  PLACE_BET_STATE_VALUE: {
    PLACING: 'placing',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed',
  },
  BET_TYPE: {
    SINGLE: 'RCT_SINGLE',
    COMBINATION: 'RCT_COMBINATION',
    SYSTEM: 'RCT_SYSTEM',
  },
  BETSLIP_STAKE_UPDATED_TYPES: {
    STAKE_UPDATE_TYPE_SINGLE: 'Single',
    STAKE_UPDATE_TYPE_COMBINATION: 'Combination',
    STAKE_UPDATE_TYPE_SYSTEM: 'System',
  },
  EVENT_INFO_TYPES: {
    BASIC: 'BASIC',
    BET_OFFERS: 'BET_OFFERS',
    SCORE: 'SCORE',
  },
  EVENT_INFO_CONTEXT: {
    LIVE: 'LIVE',
    PRE_MATCH: 'PRE-MATCH',
  },
  FETCH_COUPON_STATUS: {
    PENDING: 'SCF_PENDING',
    SETTLED: 'SCF_SETTLED',
    WON: 'SCF_WON',
    LOST: 'SCF_LOST',
    VOID: 'SCF_VOID',
    CASH_IN: 'SCF_CASHIN',
    ALL: '',
  },
  IFRAME_READY: 'iframeReady',
  REMOVE: 'remove',
  NAVIGATE: 'navigate',
  BET_HISTORY: 'BetHistory',
  BETSLIP_OUTCOMES_REMOVE: 'BetslipOutcomesRemove',
  BETSLIP_OUTCOMES: 'BetslipOutcomes',
  BETSLIP_MAXIMIZED: 'BetslipMaximize',
  BETSLIP_MAXIMIZED_CHANGE: 'BetslipMaximizedChange',
  BETSLIP_STAKE_UPDATED: 'BetslipStakeUpdated',
  BETSLIP_UPDATE_STAKE: 'BetslipUpdateStake',
  EVENT_INFO: 'EventInfo',
  EVENT_INFO_UNSUBSCRIBE: 'EventInfoUnSubscribe',
  PLACE_BET: 'BetslipPlaceBet',
  CLIENT_ODDS_FORMAT: 'ClientOddsFormat',
  PLACE_BET_STATE: 'PlaceBetState',
  PAGE_INFO: 'PageInfo',
  USER_LOGGED_IN: 'UserLoggedIn',
  CLIENT_CONFIG: 'ClientConfig',
  VERSIONS: 'Versions',
  ODDS_FRACTIONAL: 'OddsAsFractional',
  ODDS_AMERICAN: 'OddsAsAmerican',
  LIBS: 'Libs',
  WIDGET_ARGS: 'Args',
  WIDGET_HEIGHT: 'Height',
  WIDGET_ENABLE_TRANSITION: 'EnableTransition',
  WIDGET_DISABLE_TRANSITION: 'DisableTransition',
  WIDGET_SETUP: 'Setup',
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  CLIENT_HIDE: 'ClientHide',
  CLIENT_SHOW: 'ClientShow',
  TRACK_EXTERNAL_INTERACTION: 'TrackExternalInteraction',
  BETSLIP_HIDE: 'BetslipHide',
  BETSLIP_SHOW: 'BetslipShow',
}
