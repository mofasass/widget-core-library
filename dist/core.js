!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}([function(e,t,n){e.exports=n(7)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}function o(){var e=window.navigator.userAgent,t=function(t){var n=e.match(t);return n&&n.length>1&&n[1]||""},n=t(/version\/(\d+(\.\d+)?)/i);return/android/i.test(e)?{browser:"android",browserVersion:n}:/(ipod|iphone|ipad)/i.test(e)?{browser:"ios",browserVersion:t(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}:/msie|trident/i.test(e)?{browser:"internet-explorer",browserVersion:t(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:/chrome|crios|crmo/i.test(e)?{browser:"chrome",browserVersion:t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/safari|applewebkit/i.test(e)?{browser:"safari",browserVersion:n}:/chrome.+? edge/i.test(e)?{browser:"microsoft-edge",browserVersion:t(/edge\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel|fxios/i.test(e)?{browser:"firefox",browserVersion:t(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)}:void 0}function s(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open("GET",e,!0),r.onload=function(){var e={status:r.status,statusText:r.statusText,body:"response"in r?r.response:r.responseText};t(e)},r.onerror=function(){return n(new TypeError("Network request failed"))},r.ontimeout=function(){return n(new TypeError("Network request failed"))},r.send()})}Object.defineProperty(t,"__esModule",{value:!0});var a=n(4),u=(r(a),n(5)),c=(r(u),n(2)),l=r(c),f=n(3),d=r(f),h=n(6),p=r(h);t.default={browser:o().browser,browserVersion:o().browserVersion,expectedApiVersion:"1.0.0.14",_config:{apiBaseUrl:"",auth:!1,channelId:1,currency:"",customer:"",device:"desktop",locale:"en_GB",market:"GB",oddsFormat:"decimal",offering:"",routeRoot:"",streamingAllowedForPlayer:!0,client_id:2,version:"v2"},get config(){return this._config},set config(e){for(var t in e)e.hasOwnProperty(t)&&this._config.hasOwnProperty(t)&&(this._config[t]=e[t]);null==this._config.routeRoot?this._config.routeRoot="":this._config.routeRoot.length>0&&"/"!==this._config.routeRoot.slice(-1)&&(this._config.routeRoot+="/")},setOddsFormat:function(e){this._config.oddsFormat=e},_defaultArgs:{},get defaultArgs(){return this._defaultArgs},set defaultArgs(e){this._defaultArgs=e},_args:null,get args(){return this._args},set args(e){var t=this;if(null!=this._args)throw Error("Do not override coreLibrary.args");e=Object.assign({},this.defaultArgs,e),null!=e.conditionalArgs&&e.conditionalArgs.forEach(function(n){var r=!0;null!=n.clientConfig&&Object.keys(n.clientConfig).forEach(function(e){t.config[e]!==n.clientConfig[e]&&(r=!1)}),null!=n.pageInfo&&Object.keys(n.pageInfo).forEach(function(e){t.pageInfo[e]!==n.pageInfo[e]&&(r=!1)}),r&&(console.log("Applying conditional arguments:"),console.log(n.args),e=Object.assign(e,n.args))}),this._args=e},_pageInfo:{leaguePaths:[],pageParam:"",pageTrackingPath:"",pageType:""},get pageInfo(){return this._pageInfo},set pageInfo(e){"filter"===e.pageType&&"/"!==e.pageParam.substr(-1)&&(e.pageParam+="/"),this._pageInfo=e},_apiVersions:{client:"",libs:"",wapi:""},get apiVersions(){return this._apiVersions},set apiVersions(e){for(var t in e)e.hasOwnProperty(t)&&this._apiVersions.hasOwnProperty(t)&&(this._apiVersions[t]=e[t])},widgetTrackingName:null,cssLoadedPromise:null,init:function(e){var t=this;return this.defaultArgs=e,new Promise(function(e,n){return t.getFile("https://c3-static.kambi.com/sb-mobileclient/widget-api/"+t.expectedApiVersion+"/kambi-widget-api.js").then(function(e){var t=document.createElement("script");t.setAttribute("id","widget-api"),t.textContent=e;var n=document.getElementsByTagName("head")[0];return n.insertBefore(t,n.lastChild),"success"}).catch(function(e){console.error("Error loading widget api"),console.error(e),n()}).then(function(){var r=function(r){t.config=r.clientConfig,t.pageInfo=r.pageInfo,t.apiVersions=r.versions,t.args=r.arguments;var i=l.default.fetchTranslations(r.clientConfig.locale),o=t.injectOperatorCss(t.apiVersions.wapi,t.config.customer,t.config.offering),s=t.injectCustomCss(t.args.customCssUrl,t.args.customCssUrlFallback);t.cssLoadedPromise=Promise.all([o,s]),i.then(function(){e()}).catch(function(e){n()})};window.KambiWidget?window.self===window.top?(console.warn(window.location.host+window.location.pathname+" is being loaded as stand-alone"),t.getData("mockSetupData.json").then(function(e){console.debug("Loaded mock setup data"),console.debug(e),r(e)}).catch(function(e){console.debug("Failed to fetch mockSetupData"),console.trace(e),n()})):(window.KambiWidget.apiReady=function(e){p.default.api=e,p.default.requestSetup(function(e){p.default.requestBetslipOutcomes(),p.default.requestOddsFormat(),r(e)})},window.KambiWidget.receiveResponse=function(e){p.default.handleResponse(e)}):(console.warn("Kambi widget API not loaded"),n())})})},createStyleTag:function(e,t){var n=document.createElement("link");return n.setAttribute("id",e),n.setAttribute("rel","stylesheet"),n.setAttribute("type","text/css"),n.setAttribute("href",t),n},injectOperatorCss:function(e,t,n){var r=this;null!=e&&""!==e||(e=this.expectedApiVersion);var i="//c3-static.kambi.com/sb-mobileclient/widget-api/"+e+"/resources/css/"+t+"/"+n+"/widgets.css";return this.getFile(i).then(function(e){var t=r.createStyleTag("operator-css",i),n=document.getElementsByTagName("head")[0];n.insertBefore(t,n.firstChild)}).catch(function(e){console.warn("Could not inject Operator CSS")})},injectCustomCss:function(e,t){var n=this;if(null==e)return Promise.resolve("");null==t&&(t=""),e=d.default.replaceConfigParameters(e),t=d.default.replaceConfigParameters(t);var r=function(e){var t=n.createStyleTag("custom-css",e),r=document.getElementsByTagName("head")[0];r.insertBefore(t,null)};return this.getFile(e).then(function(t){return r(e),t}).catch(function(e){return""!==t?(console.debug("Error fetching custom css, trying fallback"),n.getFile(t).then(function(e){return r(t),e}).catch(function(e){return console.debug("Error fetching custom css fallback"),e})):(console.debug("Error fetching custom css, no fallback present"),e)})},getData:function(e){return s(e).then(i).then(function(e){return JSON.parse(e.body)}).catch(function(e){throw console.debug("Error fetching data"),console.trace(e),e})},getFile:function(e){return s(e).then(i).then(function(e){return e.body}).catch(function(e){throw console.debug("Error fetching file"),console.trace(e),e})},setWidgetTrackingName:function(e){this.widgetTrackingName=e}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=r(i);t.default={i18nStrings:{},fetchTranslations:function(e){var t=this;null==e&&(e="en_GB");var n=this,r="i18n/";return new Promise(function(i,s){o.default.getData(r+e+".json").then(function(e){t.i18nStrings=e,i()}).catch(function(t){"en_GB"!==e?(console.debug("Could not load translations for "+e+" falling back to en_GB"),n.fetchTranslations("en_GB").then(i)):(console.debug("Could not load translations for en_GB"),console.trace(t),i())})})},getTranslation:function(e){if(null!=this.i18nStrings[e]){for(var t=this.i18nStrings[e],n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];for(var o=0;o<r.length;o++){var s=r[o]||"";t=t.replace("{"+o+"}",s)}return t}return e}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),o=r(i),s=n(1),a=r(s);t.default={diffArray:function(e,t){for(var n={},r=[],i=t.length;i--;)n[t[i]]=null;for(var i=e.length;i--;)n.hasOwnProperty(e[i])||r.push(e[i]);return r},replaceConfigParameters:function(e){if(null==e)return e;var t=a.default.config;return Object.keys(t).forEach(function(n){var r=new RegExp("{"+n+"}","g"),i=t[n];e=e.replace(r,i)}),e},getOddsDecimalValue:function(e){return e<100?e.toFixed(2):e<1e3?e.toFixed(1):e.toFixed(0)},getOutcomeLabel:function(e,t){switch(e.type){case"OT_ONE":return t.homeLabelCustom&&""!==t.homeLabelCustom?t.homeLabelCustom:t.homeName;case"OT_CROSS":return o.default.getTranslation("draw");case"OT_TWO":return t.awayLabelCustom&&""!==t.awayLabelCustom?t.awayLabelCustom:t.awayName;case"OT_OVER":return e.label+" "+e.line/1e3;case"OT_UNDER":return e.label+" "+e.line/1e3;default:return console.warn("Unhandled outcome type: "+e.type,e),e.label}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=r(i);t.default={getGroupEvents:function(e){var t="/event/group/"+e+".json";return this.doRequest(t)},getGroup:function(e){var t="/group/"+e+".json";return this.doRequest(t)},getEventsByFilter:function(e,t){var n="/listView/"+e;return this.doRequest(n,t,"v3")},adaptV2BetOffer:function(e){e.suspended===!0&&(e.open=!1)},adaptV2LiveData:function(e){if(null!=e&&null!=e.statistics){var t=e.statistics;null!=t.sets&&(t.setBasedStats=t.sets,delete t.sets),null!=t.football&&(t.footballStats=t.football,delete t.football)}},adaptV2Event:function(e){},getLiveEventData:function(e){var t=this,n="/event/"+e+"/livedata.json";return this.doRequest(n,null,null,!0).then(function(e){return t.adaptV2LiveData(e),e})},getLiveEvents:function(){var e=this,t="/event/live/open.json";return this.doRequest(t,null,null,!0).then(function(t){if(null!=t.error)return t;var n=t.liveEvents;return t.events=n,t.events.forEach(e.adaptV2Event),delete t.liveEvents,delete t.group,n.forEach(function(t){t.betOffers=[],null!=t.mainBetOffer&&(e.adaptV2BetOffer(t.mainBetOffer),t.betOffers.push(t.mainBetOffer),delete t.mainBetOffer),e.adaptV2LiveData(t.liveData)}),t})},getLiveEvent:function(e){var t=this,n="/betoffer/live/event/"+e+".json";return this.doRequest(n,null,null,!0).then(function(e){return e.betOffers=e.betoffers,delete e.betoffers,e.betOffers.forEach(t.adaptV2BetOffer),e.event=e.events[0],t.adaptV2Event(e.event),delete e.events,e})},getLiveEventsByFilter:function(e){var t=this;e=e.replace(/\/$/,"");var n=e.split("/");n=n.slice(0,3);var r="/listView/all/all/all/all/in-play/";return new Promise(function(e,i){t.doRequest(r,null,"v3").then(function(t){for(var r={events:[]},i=0,o=t.events.length;i<o;++i){var s=0,a=t.events[i].event.path.length,u=!0;for(a>n.length&&(a=n.length);s<a;++s)"all"!==n[s]&&t.events[i].event.path[s].termKey!==n[s]&&(u=!1);u&&r.events.push(t.events[i])}e(r)})})},getEvent:function(e){var t=this;return this.doRequest("/betoffer/event/"+e+".json").then(function(e){return e.betOffers=e.betoffers,delete e.betoffers,e.betOffers.forEach(t.adaptV2BetOffer),e.event=e.events[0],t.adaptV2Event(e.event),delete e.events,e})},getHighlight:function(){return this.doRequest("/group/highlight.json")},getEventBetoffers:function(e){return console.warn("getEventBetoffers is deprecated, use getEvent instead"),this.getEvent.apply(this,arguments)},doRequest:function(e,t,n,r){var i=o.default.config;if(null!=i.offering){var s=i.apiBaseUrl.replace("{apiVersion}",null!=n?n:i.version),a=s+i.offering+e,u=t||{},c={lang:u.locale||i.locale,market:u.market||i.market,client_id:u.client_id||i.client_id,include:u.include||"",betOffers:u.betOffers||"COMBINED",categoryGroup:u.categoryGroup||"COMBINED",displayDefault:u.displayDefault||!0};return r===!0&&(c.nocache=Date.now()),a+="?"+Object.keys(c).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(c[e])}).join("&"),o.default.getData(a)}console.warn("The offering has not been set, is the right widget api version loaded?")}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=r(i);t.default={config:{baseApiUrl:"https://api.kambi.com/statistics/api/"},getStatistics:function(e,t){return t=t.match(/[^?]*/)[0],"/"===t[t.length-1]&&(t=t.slice(0,-1)),console.debug(this.config.baseApiUrl+o.default.config.offering+"/"+e+"/"+t+".json"),o.default.getData(this.config.baseApiUrl+o.default.config.offering+"/"+e+"/"+t+".json")}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=r(i),s=n(1),a=r(s);t.default={api:{requestSetup:function(){},request:function(){},set:function(){},remove:function(){},createUrl:function(){},createFilterUrl:function(e,t){t=t||"filter";var n=e.filter(function(e){return 0===e.indexOf("/")}).reduce(function(e,t){var n=[];return t.replace(/\/+$/,"").split("/").slice(1).forEach(function(t,r){r in e||(e[r]=[]);var i=e[r];return r>0&&n.forEach(function(e){for(var t=0;t<=e;t++)null==i[t]&&i.push(t===e?[]:"all");i=i[e]}),i.indexOf(t)===-1&&i.push(t),n[r]=i.length-1,n[r]}),e},[]),r="#"+t.replace(/.*?#/,"").replace(/^\//,"");r+=n.reduce(function(e,t){return e+"/"+JSON.stringify(t).slice(1,-1)},"").replace(/"/g,"").replace(/(,all)+(\/|\]|$)/g,"$2");for(var i=0;i<=n.length;i++)r=r.replace(/\[([^,\]]*)\]/g,"$1");var o=e.filter(function(e){return 0!==e.indexOf("/")}).join(",");if(o){for(var s=0;s<4-n.length;s++)r+="/all";r+="/"+o}return r.match(/filter$/)?r+"/all":r}},events:function(){var e={},t=function(t,n){e.hasOwnProperty(t)?e[t].push(n):e[t]=[n]},n=function(t,n){if(e.hasOwnProperty(t)){if(!n)return void(e[t]=[]);var r=e[t].indexOf(n);r>-1&&e[t].splice(r,1)}},r=function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];e.hasOwnProperty(t)&&e[t].forEach(function(e){return e.apply(void 0,r)})};return{subscribe:t,unsubscribe:n,publish:r}}(),betslipIds:[],handleResponse:function(e){switch(e.type){case this.api.WIDGET_HEIGHT:this.events.publish("WIDGET:HEIGHT",e.data);break;case this.api.BETSLIP_OUTCOMES:for(var t=0,n=e.data.outcomes.length,r=[];t<n;++t)r.push(e.data.outcomes[t].id);var i=o.default.diffArray(this.betslipIds,r),s=o.default.diffArray(r,this.betslipIds);for(this.betslipIds=r,t=0,n=i.length;t<n;++t)this.events.publish("OUTCOME:REMOVED:"+i[t]);for(t=0,n=s.length;t<n;++t)this.events.publish("OUTCOME:ADDED:"+s[t]);this.events.publish("OUTCOMES:UPDATE",e.data);break;case this.api.WIDGET_ARGS:a.default.args=e.data,this.events.publish("WIDGET:ARGS",e.data);break;case this.api.PAGE_INFO:a.default.setPageInfo(e.data),this.events.publish("PAGE:INFO",e.data);break;case this.api.CLIENT_ODDS_FORMAT:a.default.setOddsFormat(e.data),this.events.publish("ODDS:FORMAT",e.data);break;case this.api.CLIENT_CONFIG:a.default.setConfig(e.data),this.events.publish("CLIENT:CONFIG",e.data);break;case this.api.USER_LOGGED_IN:console.debug("User logged in",e.data),this.events.publish("USER:LOGGED_IN",e.data);break;case"Setup":this.events.publish("Setup response",e.data);break;default:console.info("Unhandled response type: "+e.type),console.info(e)}},createUrl:function(e,t){return this.api.createUrl(e,t)},createFilterUrl:function(e){return this.api.createFilterUrl(e,a.default.config.routeRoot)},getPageType:function(){if(!a.default.pageInfo.pageType)return"";var e=a.default.pageInfo.pageType;switch(e){case"event":return"";case"event-live":return"live/";default:console.info("Unknown page type: "+e)}},requestSetup:function(e){this.api.requestSetup(e)},requestWidgetHeight:function(){this.api.request(this.api.WIDGET_HEIGHT)},setWidgetHeight:function(e){this.api.set(this.api.WIDGET_HEIGHT,e)},adaptWidgetHeight:function(){var e=document.body,t=document.documentElement,n=Math.max(e.offsetHeight,t.scrollHeight,t.offsetHeight);this.api.set(this.api.WIDGET_HEIGHT,n)},enableWidgetTransition:function(e){e?this.api.set(this.api.WIDGET_ENABLE_TRANSITION):this.api.set(this.api.WIDGET_DISABLE_TRANSITION)},removeWidget:function(){this.api.remove()},navigateToLiveEvent:function(e){this.navigateClient("event/live/"+e)},navigateToEvent:function(e){this.navigateClient("event/"+e)},navigateToFilter:function(e){"string"==typeof e&&e.indexOf("filter/")===-1&&(e="filter/"+e),this.navigateClient(e)},navigateToLiveEvents:function(){this.navigateClient(["in-play"])},addOutcomeToBetslip:function(e,t,n,r){var i=[];Array.isArray(e)?i=e:i.push(e);var o={outcomes:i};null!=t&&(Array.isArray(t)?o.stakes=t:o.stakes=[t]),o.couponType=1===i.length?this.api.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE:this.api.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION,o.updateMode="replace"!==n?this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND:this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_REPLACE,null!=r&&(o.source=r),null!=a.default.widgetTrackingName&&(o.name=a.default.widgetTrackingName),this.api.set(this.api.BETSLIP_OUTCOMES,o)},removeOutcomeFromBetslip:function(e){var t=[];Array.isArray(e)?t=e:t.push(e);var n={outcomes:t};null!=a.default.widgetTrackingName&&(n.name=a.default.widgetTrackingName),this.api.set(this.api.BETSLIP_OUTCOMES_REMOVE,n)},requestBetslipOutcomes:function(){this.api.request(this.api.BETSLIP_OUTCOMES)},requestPageInfo:function(){this.api.request(this.api.PAGE_INFO)},requestWidgetArgs:function(){this.api.request(this.api.WIDGET_ARGS)},requestClientConfig:function(){this.api.request(this.api.CLIENT_CONFIG)},requestOddsFormat:function(){this.api.request(this.api.CLIENT_ODDS_FORMAT)},requestOddsAsAmerican:function(e){var t=this;return new Promise(function(n){t.api.requestOddsAsAmerican(e,function(e){n(e)})})},requestOddsAsFractional:function(e){var t=this;return new Promise(function(n){t.api.requestOddsAsFractional(e,function(e){n(e)})})},navigateClient:function(e){var t="";"string"==typeof e?t="#"+a.default.config.routeRoot+e:Array.isArray(e)&&(t=this.api.createFilterUrl(e,a.default.config.routeRoot)),null!=a.default.widgetTrackingName?this.api.navigateClient(t,a.default.widgetTrackingName):this.api.navigateClient(t)}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.widgetModule=t.utilModule=t.translationModule=t.statisticsModule=t.offeringModule=t.coreLibrary=void 0,n(8);var i=n(1),o=r(i),s=n(4),a=r(s),u=n(5),c=r(u),l=n(2),f=r(l),d=n(3),h=r(d),p=n(6),g=r(p);t.coreLibrary=o.default,t.offeringModule=a.default,t.statisticsModule=c.default,t.translationModule=f.default,t.utilModule=h.default,t.widgetModule=g.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=n(9),o=r(i);o.default.polyfill(),"function"!=typeof Object.assign&&!function(){Object.assign=function(e){if(void 0===e||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),n=1;n<arguments.length;n++){var r=arguments[n];if(void 0!==r&&null!==r)for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}return t}}(),Array.prototype.find||(Array.prototype.find=function(e){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var t,n=Object(this),r=n.length>>>0,i=arguments[1],o=0;o<r;o++)if(t=n[o],e.call(i,t,o,n))return t})},function(e,t,n){(function(t,r){!function(t,n){e.exports=n()}(this,function(){"use strict";function e(e){return"function"==typeof e||"object"==typeof e&&null!==e}function i(e){return"function"==typeof e}function o(e){J=e}function s(e){X=e}function a(){return function(){return t.nextTick(d)}}function u(){return function(){Y(d)}}function c(){var e=0,t=new Z(d),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function l(){var e=new MessageChannel;return e.port1.onmessage=d,function(){return e.port2.postMessage(0)}}function f(){var e=setTimeout;return function(){return e(d,1)}}function d(){for(var e=0;e<$;e+=2){var t=ne[e],n=ne[e+1];t(n),ne[e]=void 0,ne[e+1]=void 0}$=0}function h(){try{var e=n(11);return Y=e.runOnLoop||e.runOnContext,u()}catch(t){return f()}}function p(e,t){var n=arguments,r=this,i=new this.constructor(v);void 0===i[ie]&&L(i);var o=r._state;return o?!function(){var e=n[o-1];X(function(){return k(o,i,e,r._result)})}():j(r,i,e,t),i}function g(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(v);return T(n,e),n}function v(){}function b(){return new TypeError("You cannot resolve a promise with itself")}function m(){return new TypeError("A promises callback cannot return that same promise.")}function _(e){try{return e.then}catch(t){return ue.error=t,ue}}function y(e,t,n,r){try{e.call(t,n,r)}catch(i){return i}}function w(e,t,n){X(function(e){var r=!1,i=y(n,t,function(n){r||(r=!0,t!==n?T(e,n):C(e,n))},function(t){r||(r=!0,S(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&i&&(r=!0,S(e,i))},e)}function O(e,t){t._state===se?C(e,t._result):t._state===ae?S(e,t._result):j(t,void 0,function(t){return T(e,t)},function(t){return S(e,t)})}function E(e,t,n){t.constructor===e.constructor&&n===p&&t.constructor.resolve===g?O(e,t):n===ue?S(e,ue.error):void 0===n?C(e,t):i(n)?w(e,t,n):C(e,t)}function T(t,n){t===n?S(t,b()):e(n)?E(t,n,_(n)):C(t,n)}function A(e){e._onerror&&e._onerror(e._result),I(e)}function C(e,t){e._state===oe&&(e._result=t,e._state=se,0!==e._subscribers.length&&X(I,e))}function S(e,t){e._state===oe&&(e._state=ae,e._result=t,X(A,e))}function j(e,t,n,r){var i=e._subscribers,o=i.length;e._onerror=null,i[o]=t,i[o+se]=n,i[o+ae]=r,0===o&&e._state&&X(I,e)}function I(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r=void 0,i=void 0,o=e._result,s=0;s<t.length;s+=3)r=t[s],i=t[s+n],r?k(n,r,i,o):i(o);e._subscribers.length=0}}function P(){this.error=null}function M(e,t){try{return e(t)}catch(n){return ce.error=n,ce}}function k(e,t,n,r){var o=i(n),s=void 0,a=void 0,u=void 0,c=void 0;if(o){if(s=M(n,r),s===ce?(c=!0,a=s.error,s=null):u=!0,t===s)return void S(t,m())}else s=r,u=!0;t._state!==oe||(o&&u?T(t,s):c?S(t,a):e===se?C(t,s):e===ae&&S(t,s))}function D(e,t){try{t(function(t){T(e,t)},function(t){S(e,t)})}catch(n){S(e,n)}}function R(){return le++}function L(e){e[ie]=le++,e._state=void 0,e._result=void 0,e._subscribers=[]}function B(e,t){this._instanceConstructor=e,this.promise=new e(v),this.promise[ie]||L(this.promise),K(t)?(this._input=t,this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?C(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&C(this.promise,this._result))):S(this.promise,G())}function G(){return new Error("Array Methods must be provided an Array")}function N(e){return new B(this,e).promise}function x(e){var t=this;return new t(K(e)?function(n,r){for(var i=e.length,o=0;o<i;o++)t.resolve(e[o]).then(n,r)}:function(e,t){return t(new TypeError("You must pass an array to race."))})}function F(e){var t=this,n=new t(v);return S(n,e),n}function U(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function V(e){this[ie]=R(),this._result=this._state=void 0,this._subscribers=[],v!==e&&("function"!=typeof e&&U(),this instanceof V?D(this,e):q())}function W(){var e=void 0;if("undefined"!=typeof r)e=r;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;if(n){var i=null;try{i=Object.prototype.toString.call(n.resolve())}catch(t){}if("[object Promise]"===i&&!n.cast)return}e.Promise=V}var H=void 0;H=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var K=H,$=0,Y=void 0,J=void 0,X=function(e,t){ne[$]=e,ne[$+1]=t,$+=2,2===$&&(J?J(d):re())},z="undefined"!=typeof window?window:void 0,Q=z||{},Z=Q.MutationObserver||Q.WebKitMutationObserver,ee="undefined"==typeof self&&"undefined"!=typeof t&&"[object process]"==={}.toString.call(t),te="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ne=new Array(1e3),re=void 0;re=ee?a():Z?c():te?l():void 0===z?h():f();var ie=Math.random().toString(36).substring(16),oe=void 0,se=1,ae=2,ue=new P,ce=new P,le=0;return B.prototype._enumerate=function(){for(var e=this.length,t=this._input,n=0;this._state===oe&&n<e;n++)this._eachEntry(t[n],n)},B.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,r=n.resolve;if(r===g){var i=_(e);if(i===p&&e._state!==oe)this._settledAt(e._state,t,e._result);else if("function"!=typeof i)this._remaining--,this._result[t]=e;else if(n===V){var o=new n(v);E(o,e,i),this._willSettleAt(o,t)}else this._willSettleAt(new n(function(t){return t(e)}),t)}else this._willSettleAt(r(e),t)},B.prototype._settledAt=function(e,t,n){var r=this.promise;r._state===oe&&(this._remaining--,e===ae?S(r,n):this._result[t]=n),0===this._remaining&&C(r,this._result)},B.prototype._willSettleAt=function(e,t){var n=this;j(e,void 0,function(e){return n._settledAt(se,t,e)},function(e){return n._settledAt(ae,t,e)})},V.all=N,V.race=x,V.resolve=g,V.reject=F,V._setScheduler=o,V._setAsap=s,V._asap=X,V.prototype={constructor:V,then:p,catch:function(e){return this.then(null,e)}},W(),V.polyfill=W,V.Promise=V,V})}).call(t,n(10),function(){return this}())},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function o(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function s(){g&&h&&(g=!1,h.length?p=h.concat(p):v=-1,p.length&&a())}function a(){if(!g){var e=i(s);g=!0;for(var t=p.length;t;){for(h=p,p=[];++v<t;)h&&h[v].run();v=-1,t=p.length}h=null,g=!1,o(e)}}function u(e,t){this.fun=e,this.array=t}function c(){}var l,f,d=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var h,p=[],g=!1,v=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];p.push(new u(e,t)),1!==p.length||g||i(a)},u.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=c,d.addListener=c,d.once=c,d.off=c,d.removeListener=c,d.removeAllListeners=c,d.emit=c,d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t){}]));
//# sourceMappingURL=core.js.map