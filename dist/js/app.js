/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   3.2.1
 */

(function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){G=t}function r(t){Q=t}function o(){return function(){process.nextTick(a)}}function i(){return function(){B(a)}}function s(){var t=0,e=new X(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){t.port2.postMessage(0)}}function c(){return function(){setTimeout(a,1)}}function a(){for(var t=0;J>t;t+=2){var e=tt[t],n=tt[t+1];e(n),tt[t]=void 0,tt[t+1]=void 0}J=0}function f(){try{var t=require,e=t("vertx");return B=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[rt]&&k(r);var o=n._state;if(o){var i=arguments[o-1];Q(function(){x(o,r,i,n._result)})}else E(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function v(t){try{return t.then}catch(e){return ut.error=e,ut}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){Q(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===it?S(t,e._result):e._state===st?j(t,e._result):E(e,void 0,function(e){g(t,e)},function(e){j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===et&&constructor.resolve===nt?b(t,n):r===ut?j(t,ut.error):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,_()):t(n)?w(e,n,v(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===ot&&(t._result=e,t._state=it,0!==t._subscribers.length&&Q(T,t))}function j(t,e){t._state===ot&&(t._state=st,t._result=e,Q(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+it]=n,o[i+st]=r,0===i&&t._state&&Q(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r,o,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return ct.error=n,ct}}function x(t,n,r,o){var i,s,u,c,a=e(r);if(a){if(i=P(r,o),i===ct?(c=!0,s=i.error,i=null):u=!0,n===i)return void j(n,d())}else i=o,u=!0;n._state!==ot||(a&&u?g(n,i):c?j(n,s):t===it?S(n,i):t===st&&j(n,i))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return at++}function k(t){t[rt]=at++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t){return new _t(this,t).promise}function q(t){var e=this;return new e(I(t)?function(n,r){for(var o=t.length,i=0;o>i;i++)e.resolve(t[i]).then(n,r)}:function(t,e){e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return j(n,t),n}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function K(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function L(t){this[rt]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&D(),this instanceof L?C(this,t):K())}function N(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[rt]||k(this.promise),Array.isArray(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,U())}function U(){return new Error("Array Methods must be provided an Array")}function W(){var t;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(t.Promise=pt)}var z;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B,G,H,I=z,J=0,Q=function(t,e){tt[J]=t,tt[J+1]=e,J+=2,2===J&&(G?G(a):H())},R="undefined"!=typeof window?window:void 0,V=R||{},X=V.MutationObserver||V.WebKitMutationObserver,Z="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),$="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,tt=new Array(1e3);H=Z?o():X?s():$?u():void 0===R&&"function"==typeof require?f():c();var et=l,nt=h,rt=Math.random().toString(36).substring(16),ot=void 0,it=1,st=2,ut=new M,ct=new M,at=0,ft=Y,lt=q,ht=F,pt=L;L.all=ft,L.race=lt,L.resolve=nt,L.reject=ht,L._setScheduler=n,L._setAsap=r,L._asap=Q,L.prototype={constructor:L,then:et,"catch":function(t){return this.then(null,t)}};var _t=N;N.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===ot&&t>n;n++)this._eachEntry(e[n],n)},N.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===nt){var o=v(t);if(o===et&&t._state!==ot)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===pt){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){e(t)}),e)}else this._willSettleAt(r(t),e)},N.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===ot&&(this._remaining--,t===st?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},N.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){n._settledAt(it,e,t)},function(t){n._settledAt(st,e,t)})};var dt=W,vt={Promise:pt,polyfill:dt};"function"==typeof define&&define.amd?define(function(){return vt}):"undefined"!=typeof module&&module.exports?module.exports=vt:"undefined"!=typeof this&&(this.ES6Promise=vt),dt()}).call(this);
(function(self){"use strict";if(self.fetch){return}function normalizeName(name){if(typeof name!=="string"){name=String(name)}if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){throw new TypeError("Invalid character in header field name")}return name.toLowerCase()}function normalizeValue(value){if(typeof value!=="string"){value=String(value)}return value}function Headers(headers){this.map={};if(headers instanceof Headers){headers.forEach(function(value,name){this.append(name,value)},this)}else if(headers){Object.getOwnPropertyNames(headers).forEach(function(name){this.append(name,headers[name])},this)}}Headers.prototype.append=function(name,value){name=normalizeName(name);value=normalizeValue(value);var list=this.map[name];if(!list){list=[];this.map[name]=list}list.push(value)};Headers.prototype["delete"]=function(name){delete this.map[normalizeName(name)]};Headers.prototype.get=function(name){var values=this.map[normalizeName(name)];return values?values[0]:null};Headers.prototype.getAll=function(name){return this.map[normalizeName(name)]||[]};Headers.prototype.has=function(name){return this.map.hasOwnProperty(normalizeName(name))};Headers.prototype.set=function(name,value){this.map[normalizeName(name)]=[normalizeValue(value)]};Headers.prototype.forEach=function(callback,thisArg){Object.getOwnPropertyNames(this.map).forEach(function(name){this.map[name].forEach(function(value){callback.call(thisArg,value,name,this)},this)},this)};function consumed(body){if(body.bodyUsed){return Promise.reject(new TypeError("Already read"))}body.bodyUsed=true}function fileReaderReady(reader){return new Promise(function(resolve,reject){reader.onload=function(){resolve(reader.result)};reader.onerror=function(){reject(reader.error)}})}function readBlobAsArrayBuffer(blob){var reader=new FileReader;reader.readAsArrayBuffer(blob);return fileReaderReady(reader)}function readBlobAsText(blob){var reader=new FileReader;reader.readAsText(blob);return fileReaderReady(reader)}var support={blob:"FileReader"in self&&"Blob"in self&&function(){try{new Blob;return true}catch(e){return false}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};function Body(){this.bodyUsed=false;this._initBody=function(body){this._bodyInit=body;if(typeof body==="string"){this._bodyText=body}else if(support.blob&&Blob.prototype.isPrototypeOf(body)){this._bodyBlob=body}else if(support.formData&&FormData.prototype.isPrototypeOf(body)){this._bodyFormData=body}else if(!body){this._bodyText=""}else if(support.arrayBuffer&&ArrayBuffer.prototype.isPrototypeOf(body)){}else{throw new Error("unsupported BodyInit type")}if(!this.headers.get("content-type")){if(typeof body==="string"){this.headers.set("content-type","text/plain;charset=UTF-8")}else if(this._bodyBlob&&this._bodyBlob.type){this.headers.set("content-type",this._bodyBlob.type)}}};if(support.blob){this.blob=function(){var rejected=consumed(this);if(rejected){return rejected}if(this._bodyBlob){return Promise.resolve(this._bodyBlob)}else if(this._bodyFormData){throw new Error("could not read FormData body as blob")}else{return Promise.resolve(new Blob([this._bodyText]))}};this.arrayBuffer=function(){return this.blob().then(readBlobAsArrayBuffer)};this.text=function(){var rejected=consumed(this);if(rejected){return rejected}if(this._bodyBlob){return readBlobAsText(this._bodyBlob)}else if(this._bodyFormData){throw new Error("could not read FormData body as text")}else{return Promise.resolve(this._bodyText)}}}else{this.text=function(){var rejected=consumed(this);return rejected?rejected:Promise.resolve(this._bodyText)}}if(support.formData){this.formData=function(){return this.text().then(decode)}}this.json=function(){return this.text().then(JSON.parse)};return this}var methods=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function normalizeMethod(method){var upcased=method.toUpperCase();return methods.indexOf(upcased)>-1?upcased:method}function Request(input,options){options=options||{};var body=options.body;if(Request.prototype.isPrototypeOf(input)){if(input.bodyUsed){throw new TypeError("Already read")}this.url=input.url;this.credentials=input.credentials;if(!options.headers){this.headers=new Headers(input.headers)}this.method=input.method;this.mode=input.mode;if(!body){body=input._bodyInit;input.bodyUsed=true}}else{this.url=input}this.credentials=options.credentials||this.credentials||"omit";if(options.headers||!this.headers){this.headers=new Headers(options.headers)}this.method=normalizeMethod(options.method||this.method||"GET");this.mode=options.mode||this.mode||null;this.referrer=null;if((this.method==="GET"||this.method==="HEAD")&&body){throw new TypeError("Body not allowed for GET or HEAD requests")}this._initBody(body)}Request.prototype.clone=function(){return new Request(this)};function decode(body){var form=new FormData;body.trim().split("&").forEach(function(bytes){if(bytes){var split=bytes.split("=");var name=split.shift().replace(/\+/g," ");var value=split.join("=").replace(/\+/g," ");form.append(decodeURIComponent(name),decodeURIComponent(value))}});return form}function headers(xhr){var head=new Headers;var pairs=xhr.getAllResponseHeaders().trim().split("\n");pairs.forEach(function(header){var split=header.trim().split(":");var key=split.shift().trim();var value=split.join(":").trim();head.append(key,value)});return head}Body.call(Request.prototype);function Response(bodyInit,options){if(!options){options={}}this.type="default";this.status=options.status;this.ok=this.status>=200&&this.status<300;this.statusText=options.statusText;this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);this.url=options.url||"";this._initBody(bodyInit)}Body.call(Response.prototype);Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers(this.headers),url:this.url})};Response.error=function(){var response=new Response(null,{status:0,statusText:""});response.type="error";return response};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(url,status){if(redirectStatuses.indexOf(status)===-1){throw new RangeError("Invalid status code")}return new Response(null,{status:status,headers:{location:url}})};self.Headers=Headers;self.Request=Request;self.Response=Response;self.fetch=function(input,init){return new Promise(function(resolve,reject){var request;if(Request.prototype.isPrototypeOf(input)&&!init){request=input}else{request=new Request(input,init)}var xhr=new XMLHttpRequest;function responseURL(){if("responseURL"in xhr){return xhr.responseURL}if(/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())){return xhr.getResponseHeader("X-Request-URL")}return}xhr.onload=function(){var status=xhr.status===1223?204:xhr.status;if(status<100||status>599){reject(new TypeError("Network request failed"));return}var options={status:status,statusText:xhr.statusText,headers:headers(xhr),url:responseURL()};var body="response"in xhr?xhr.response:xhr.responseText;resolve(new Response(body,options))};xhr.onerror=function(){reject(new TypeError("Network request failed"))};xhr.open(request.method,request.url,true);if(request.credentials==="include"){xhr.withCredentials=true}if("responseType"in xhr&&support.blob){xhr.responseType="blob"}request.headers.forEach(function(value,name){xhr.setRequestHeader(name,value)});xhr.send(typeof request._bodyInit==="undefined"?null:request._bodyInit)})};self.fetch.polyfill=true})(typeof self!=="undefined"?self:this);

// Rivets.js + Sightglass.js
// version: 0.8.1
// author: Michael Richards
// license: MIT
(function(){function t(t,i,s,h){return new e(t,i,s,h)}function e(t,e,s,h){this.options=h||{},this.options.adapters=this.options.adapters||{},this.obj=t,this.keypath=e,this.callback=s,this.objectPath=[],this.parse(),i(this.target=this.realize())&&this.set(!0,this.key,this.target,this.callback)}function i(t){return"object"==typeof t&&null!==t}function s(t){throw new Error("[sightglass] "+t)}t.adapters={},e.tokenize=function(t,e,i){var s,h,a=[],o={i:i,path:""};for(s=0;s<t.length;s++)h=t.charAt(s),~e.indexOf(h)?(a.push(o),o={i:h,path:""}):o.path+=h;return a.push(o),a},e.prototype.parse=function(){var i,h,a=this.interfaces();a.length||s("Must define at least one adapter interface."),~a.indexOf(this.keypath[0])?(i=this.keypath[0],h=this.keypath.substr(1)):("undefined"==typeof(i=this.options.root||t.root)&&s("Must define a default root adapter."),h=this.keypath),this.tokens=e.tokenize(h,a,i),this.key=this.tokens.pop()},e.prototype.realize=function(){var t,e=this.obj,s=!1;return this.tokens.forEach(function(h,a){i(e)?("undefined"!=typeof this.objectPath[a]?e!==(t=this.objectPath[a])&&(this.set(!1,h,t,this.update.bind(this)),this.set(!0,h,e,this.update.bind(this)),this.objectPath[a]=e):(this.set(!0,h,e,this.update.bind(this)),this.objectPath[a]=e),e=this.get(h,e)):(s===!1&&(s=a),(t=this.objectPath[a])&&this.set(!1,h,t,this.update.bind(this)))},this),s!==!1&&this.objectPath.splice(s),e},e.prototype.update=function(){var t,e;(t=this.realize())!==this.target&&(i(this.target)&&this.set(!1,this.key,this.target,this.callback),i(t)&&this.set(!0,this.key,t,this.callback),e=this.value(),this.target=t,this.value()!==e&&this.callback())},e.prototype.value=function(){return i(this.target)?this.get(this.key,this.target):void 0},e.prototype.setValue=function(t){i(this.target)&&this.adapter(this.key).set(this.target,this.key.path,t)},e.prototype.get=function(t,e){return this.adapter(t).get(e,t.path)},e.prototype.set=function(t,e,i,s){var h=t?"observe":"unobserve";this.adapter(e)[h](i,e.path,s)},e.prototype.interfaces=function(){var e=Object.keys(this.options.adapters);return Object.keys(t.adapters).forEach(function(t){~e.indexOf(t)||e.push(t)}),e},e.prototype.adapter=function(e){return this.options.adapters[e.i]||t.adapters[e.i]},e.prototype.unobserve=function(){var t;this.tokens.forEach(function(e,i){(t=this.objectPath[i])&&this.set(!1,e,t,this.update.bind(this))},this),i(this.target)&&this.set(!1,this.key,this.target,this.callback)},"undefined"!=typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd?define([],function(){return this.sightglass=t}):this.sightglass=t}).call(this);
(function(){var t,e,i,n,r=function(t,e){return function(){return t.apply(e,arguments)}},s=[].slice,o={}.hasOwnProperty,u=function(t,e){function i(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},l=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};t={options:["prefix","templateDelimiters","rootInterface","preloadData","handler"],extensions:["binders","formatters","components","adapters"],"public":{binders:{},components:{},formatters:{},adapters:{},prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function(t,e,i){return this.call(t,e,i.view.models)},configure:function(e){var i,n,r,s;null==e&&(e={});for(r in e)if(s=e[r],"binders"===r||"components"===r||"formatters"===r||"adapters"===r)for(n in s)i=s[n],t[r][n]=i;else t["public"][r]=s},bind:function(e,i,n){var r;return null==i&&(i={}),null==n&&(n={}),r=new t.View(e,i,n),r.bind(),r},init:function(e,i,n){var r,s;return null==n&&(n={}),null==i&&(i=document.createElement("div")),e=t["public"].components[e],i.innerHTML=e.template.call(this,i),r=e.initialize.call(this,i,n),s=new t.View(i,r),s.bind(),s}}},window.jQuery||window.$?(n="on"in jQuery.prototype?["on","off"]:["bind","unbind"],e=n[0],i=n[1],t.Util={bindEvent:function(t,i,n){return jQuery(t)[e](i,n)},unbindEvent:function(t,e,n){return jQuery(t)[i](e,n)},getInputValue:function(t){var e;return e=jQuery(t),"checkbox"===e.attr("type")?e.is(":checked"):e.val()}}):t.Util={bindEvent:function(){return"addEventListener"in window?function(t,e,i){return t.addEventListener(e,i,!1)}:function(t,e,i){return t.attachEvent("on"+e,i)}}(),unbindEvent:function(){return"removeEventListener"in window?function(t,e,i){return t.removeEventListener(e,i,!1)}:function(t,e,i){return t.detachEvent("on"+e,i)}}(),getInputValue:function(t){var e,i,n,r;if("checkbox"===t.type)return t.checked;if("select-multiple"===t.type){for(r=[],i=0,n=t.length;n>i;i++)e=t[i],e.selected&&r.push(e.value);return r}return t.value}},t.TypeParser=function(){function t(){}return t.types={primitive:0,keypath:1},t.parse=function(t){return/^'.*'$|^".*"$/.test(t)?{type:this.types.primitive,value:t.slice(1,-1)}:"true"===t?{type:this.types.primitive,value:!0}:"false"===t?{type:this.types.primitive,value:!1}:"null"===t?{type:this.types.primitive,value:null}:"undefined"===t?{type:this.types.primitive,value:void 0}:isNaN(Number(t))===!1?{type:this.types.primitive,value:Number(t)}:{type:this.types.keypath,value:t}},t}(),t.TextTemplateParser=function(){function t(){}return t.types={text:0,binding:1},t.parse=function(t,e){var i,n,r,s,o,u,l;for(u=[],s=t.length,i=0,n=0;s>n;){if(i=t.indexOf(e[0],n),0>i){u.push({type:this.types.text,value:t.slice(n)});break}if(i>0&&i>n&&u.push({type:this.types.text,value:t.slice(n,i)}),n=i+e[0].length,i=t.indexOf(e[1],n),0>i){o=t.slice(n-e[1].length),r=u[u.length-1],(null!=r?r.type:void 0)===this.types.text?r.value+=o:u.push({type:this.types.text,value:o});break}l=t.slice(n,i).trim(),u.push({type:this.types.binding,value:l}),n=i+e[1].length}return u},t}(),t.View=function(){function e(e,i,n){var s,o,u,l,h,a,p,d,c,f,b,v,y;for(this.els=e,this.models=i,null==n&&(n={}),this.update=r(this.update,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.select=r(this.select,this),this.traverse=r(this.traverse,this),this.build=r(this.build,this),this.buildBinding=r(this.buildBinding,this),this.bindingRegExp=r(this.bindingRegExp,this),this.options=r(this.options,this),this.els.jquery||this.els instanceof Array||(this.els=[this.els]),c=t.extensions,h=0,p=c.length;p>h;h++){if(o=c[h],this[o]={},n[o]){f=n[o];for(s in f)u=f[s],this[o][s]=u}b=t["public"][o];for(s in b)u=b[s],null==(l=this[o])[s]&&(l[s]=u)}for(v=t.options,a=0,d=v.length;d>a;a++)o=v[a],this[o]=null!=(y=n[o])?y:t["public"][o];this.build()}return e.prototype.options=function(){var e,i,n,r,s;for(i={},s=t.extensions.concat(t.options),n=0,r=s.length;r>n;n++)e=s[n],i[e]=this[e];return i},e.prototype.bindingRegExp=function(){return new RegExp("^"+this.prefix+"-")},e.prototype.buildBinding=function(e,i,n,r){var s,o,u,l,h,a,p;return h={},p=function(){var t,e,i,n;for(i=r.split("|"),n=[],t=0,e=i.length;e>t;t++)a=i[t],n.push(a.trim());return n}(),s=function(){var t,e,i,n;for(i=p.shift().split("<"),n=[],t=0,e=i.length;e>t;t++)o=i[t],n.push(o.trim());return n}(),l=s.shift(),h.formatters=p,(u=s.shift())&&(h.dependencies=u.split(/\s+/)),this.bindings.push(new t[e](this,i,n,l,h))},e.prototype.build=function(){var e,i,n,r,s;for(this.bindings=[],i=function(e){return function(n){var r,s,o,u,l,h,a,p,d,c,f,b,v,y;if(3===n.nodeType){if(l=t.TextTemplateParser,(o=e.templateDelimiters)&&(p=l.parse(n.data,o)).length&&(1!==p.length||p[0].type!==l.types.text)){for(d=0,f=p.length;f>d;d++)a=p[d],h=document.createTextNode(a.value),n.parentNode.insertBefore(h,n),1===a.type&&e.buildBinding("TextBinding",h,null,a.value);n.parentNode.removeChild(n)}}else 1===n.nodeType&&(r=e.traverse(n));if(!r){for(v=function(){var t,e,i,r;for(i=n.childNodes,r=[],t=0,e=i.length;e>t;t++)u=i[t],r.push(u);return r}(),y=[],c=0,b=v.length;b>c;c++)s=v[c],y.push(i(s));return y}}}(this),s=this.els,n=0,r=s.length;r>n;n++)e=s[n],i(e);this.bindings.sort(function(t,e){var i,n;return((null!=(i=e.binder)?i.priority:void 0)||0)-((null!=(n=t.binder)?n.priority:void 0)||0)})},e.prototype.traverse=function(e){var i,n,r,s,o,u,l,h,a,p,d,c,f,b,v,y;for(s=this.bindingRegExp(),o="SCRIPT"===e.nodeName||"STYLE"===e.nodeName,b=e.attributes,p=0,c=b.length;c>p;p++)if(i=b[p],s.test(i.name)){if(h=i.name.replace(s,""),!(r=this.binders[h])){v=this.binders;for(u in v)a=v[u],"*"!==u&&-1!==u.indexOf("*")&&(l=new RegExp("^"+u.replace(/\*/g,".+")+"$"),l.test(h)&&(r=a))}r||(r=this.binders["*"]),r.block&&(o=!0,n=[i])}for(y=n||e.attributes,d=0,f=y.length;f>d;d++)i=y[d],s.test(i.name)&&(h=i.name.replace(s,""),this.buildBinding("Binding",e,h,i.value));return o||(h=e.nodeName.toLowerCase(),this.components[h]&&!e._bound&&(this.bindings.push(new t.ComponentBinding(this,e,h)),o=!0)),o},e.prototype.select=function(t){var e,i,n,r,s;for(r=this.bindings,s=[],i=0,n=r.length;n>i;i++)e=r[i],t(e)&&s.push(e);return s},e.prototype.bind=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.bind());return r},e.prototype.unbind=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.unbind());return r},e.prototype.sync=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push("function"==typeof t.sync?t.sync():void 0);return r},e.prototype.publish=function(){var t,e,i,n,r;for(n=this.select(function(t){var e;return null!=(e=t.binder)?e.publishes:void 0}),r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.publish());return r},e.prototype.update=function(t){var e,i,n,r,s,o,u;null==t&&(t={});for(i in t)n=t[i],this.models[i]=n;for(o=this.bindings,u=[],r=0,s=o.length;s>r;r++)e=o[r],u.push("function"==typeof e.update?e.update(t):void 0);return u},e}(),t.Binding=function(){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.getValue=r(this.getValue,this),this.update=r(this.update,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.set=r(this.set,this),this.eventHandler=r(this.eventHandler,this),this.formattedValue=r(this.formattedValue,this),this.parseTarget=r(this.parseTarget,this),this.observe=r(this.observe,this),this.setBinder=r(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={},this.model=void 0,this.setBinder()}return e.prototype.setBinder=function(){var t,e,i,n;if(!(this.binder=this.view.binders[this.type])){n=this.view.binders;for(t in n)i=n[t],"*"!==t&&-1!==t.indexOf("*")&&(e=new RegExp("^"+t.replace(/\*/g,".+")+"$"),e.test(this.type)&&(this.binder=i,this.args=new RegExp("^"+t.replace(/\*/g,"(.+)")+"$").exec(this.type),this.args.shift()))}return this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function?this.binder={routine:this.binder}:void 0},e.prototype.observe=function(e,i,n){return t.sightglass(e,i,n,{root:this.view.rootInterface,adapters:this.view.adapters})},e.prototype.parseTarget=function(){var e;return e=t.TypeParser.parse(this.keypath),0===e.type?this.value=e.value:(this.observer=this.observe(this.view.models,this.keypath,this.sync),this.model=this.observer.target)},e.prototype.formattedValue=function(e){var i,n,r,o,u,l,h,a,p,d,c,f,b,v;for(v=this.formatters,o=d=0,f=v.length;f>d;o=++d){for(u=v[o],r=u.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g),l=r.shift(),u=this.view.formatters[l],r=function(){var e,i,s;for(s=[],e=0,i=r.length;i>e;e++)n=r[e],s.push(t.TypeParser.parse(n));return s}(),a=[],i=c=0,b=r.length;b>c;i=++c)n=r[i],a.push(0===n.type?n.value:((p=this.formatterObservers)[o]||(p[o]={}),(h=this.formatterObservers[o][i])?void 0:(h=this.observe(this.view.models,n.value,this.sync),this.formatterObservers[o][i]=h),h.value()));(null!=u?u.read:void 0)instanceof Function?e=u.read.apply(u,[e].concat(s.call(a))):u instanceof Function&&(e=u.apply(null,[e].concat(s.call(a))))}return e},e.prototype.eventHandler=function(t){var e,i;return i=(e=this).view.handler,function(n){return i.call(t,this,n,e)}},e.prototype.set=function(t){var e;return t=t instanceof Function&&!this.binder["function"]?this.formattedValue(t.call(this.model)):this.formattedValue(t),null!=(e=this.binder.routine)?e.call(this,this.el,t):void 0},e.prototype.sync=function(){var t,e;return this.set(function(){var i,n,r,s,o,u,l;if(this.observer){if(this.model!==this.observer.target){for(o=this.dependencies,i=0,r=o.length;r>i;i++)e=o[i],e.unobserve();if(this.dependencies=[],null!=(this.model=this.observer.target)&&(null!=(u=this.options.dependencies)?u.length:void 0))for(l=this.options.dependencies,n=0,s=l.length;s>n;n++)t=l[n],e=this.observe(this.model,t,this.sync),this.dependencies.push(e)}return this.observer.value()}return this.value}.call(this))},e.prototype.publish=function(){var t,e,i,n,r,o,u,l,h;if(this.observer){for(n=this.getValue(this.el),u=this.formatters.slice(0).reverse(),r=0,o=u.length;o>r;r++)e=u[r],t=e.split(/\s+/),i=t.shift(),(null!=(l=this.view.formatters[i])?l.publish:void 0)&&(n=(h=this.view.formatters[i]).publish.apply(h,[n].concat(s.call(t))));return this.observer.setValue(n)}},e.prototype.bind=function(){var t,e,i,n,r,s,o;if(this.parseTarget(),null!=(r=this.binder.bind)&&r.call(this,this.el),null!=this.model&&(null!=(s=this.options.dependencies)?s.length:void 0))for(o=this.options.dependencies,i=0,n=o.length;n>i;i++)t=o[i],e=this.observe(this.model,t,this.sync),this.dependencies.push(e);return this.view.preloadData?this.sync():void 0},e.prototype.unbind=function(){var t,e,i,n,r,s,o,u,l,h;for(null!=(o=this.binder.unbind)&&o.call(this,this.el),null!=(u=this.observer)&&u.unobserve(),l=this.dependencies,r=0,s=l.length;s>r;r++)n=l[r],n.unobserve();this.dependencies=[],h=this.formatterObservers;for(i in h){e=h[i];for(t in e)n=e[t],n.unobserve()}return this.formatterObservers={}},e.prototype.update=function(t){var e,i;return null==t&&(t={}),this.model=null!=(e=this.observer)?e.target:void 0,null!=(i=this.binder.update)?i.call(this,t):void 0},e.prototype.getValue=function(e){return this.binder&&null!=this.binder.getValue?this.binder.getValue.call(this,e):t.Util.getInputValue(e)},e}(),t.ComponentBinding=function(e){function i(t,e,i){var n,s,o,u,h,a,p;for(this.view=t,this.el=e,this.type=i,this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.locals=r(this.locals,this),this.component=this.view.components[this.type],this["static"]={},this.observers={},this.upstreamObservers={},s=t.bindingRegExp(),a=this.el.attributes||[],u=0,h=a.length;h>u;u++)n=a[u],s.test(n.name)||(o=this.camelCase(n.name),l.call(null!=(p=this.component["static"])?p:[],o)>=0?this["static"][o]=n.value:this.observers[o]=n.value)}return u(i,e),i.prototype.sync=function(){},i.prototype.update=function(){},i.prototype.publish=function(){},i.prototype.locals=function(){var t,e,i,n,r,s;i={},r=this["static"];for(t in r)n=r[t],i[t]=n;s=this.observers;for(t in s)e=s[t],i[t]=e.value();return i},i.prototype.camelCase=function(t){return t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},i.prototype.bind=function(){var e,i,n,r,s,o,u,l,h,a,p,d,c,f,b,v,y,g,m,w,k;if(!this.bound){f=this.observers;for(i in f)n=f[i],this.observers[i]=this.observe(this.view.models,n,function(t){return function(e){return function(){return t.componentView.models[e]=t.observers[e].value()}}}(this).call(this,i));this.bound=!0}if(null!=this.componentView)return this.componentView.bind();for(this.el.innerHTML=this.component.template.call(this),u=this.component.initialize.call(this,this.el,this.locals()),this.el._bound=!0,o={},b=t.extensions,a=0,d=b.length;d>a;a++){if(s=b[a],o[s]={},this.component[s]){v=this.component[s];for(e in v)l=v[e],o[s][e]=l}y=this.view[s];for(e in y)l=y[e],null==(h=o[s])[e]&&(h[e]=l)}for(g=t.options,p=0,c=g.length;c>p;p++)s=g[p],o[s]=null!=(m=this.component[s])?m:this.view[s];this.componentView=new t.View(this.el,u,o),this.componentView.bind(),w=this.observers,k=[];for(i in w)r=w[i],k.push(this.upstreamObservers[i]=this.observe(this.componentView.models,i,function(t){return function(e,i){return function(){return i.setValue(t.componentView.models[e])}}}(this).call(this,i,r)));return k},i.prototype.unbind=function(){var t,e,i,n,r;i=this.upstreamObservers;for(t in i)e=i[t],e.unobserve();n=this.observers;for(t in n)e=n[t],e.unobserve();return null!=(r=this.componentView)?r.unbind.call(this):void 0},i}(t.Binding),t.TextBinding=function(t){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.sync=r(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={}}return u(e,t),e.prototype.binder={routine:function(t,e){return t.data=null!=e?e:""}},e.prototype.sync=function(){return e.__super__.sync.apply(this,arguments)},e}(t.Binding),t["public"].binders.text=function(t,e){return null!=t.textContent?t.textContent=null!=e?e:"":t.innerText=null!=e?e:""},t["public"].binders.html=function(t,e){return t.innerHTML=null!=e?e:""},t["public"].binders.show=function(t,e){return t.style.display=e?"":"none"},t["public"].binders.hide=function(t,e){return t.style.display=e?"none":""},t["public"].binders.enabled=function(t,e){return t.disabled=!e},t["public"].binders.disabled=function(t,e){return t.disabled=!!e},t["public"].binders.checked={publishes:!0,priority:2e3,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)===(null!=e?e.toString():void 0):!!e}},t["public"].binders.unchecked={publishes:!0,priority:2e3,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)!==(null!=e?e.toString():void 0):!e}},t["public"].binders.value={publishes:!0,priority:3e3,bind:function(e){return"INPUT"!==e.tagName||"radio"!==e.type?(this.event="SELECT"===e.tagName?"change":"input",t.Util.bindEvent(e,this.event,this.publish)):void 0},unbind:function(e){return"INPUT"!==e.tagName||"radio"!==e.type?t.Util.unbindEvent(e,this.event,this.publish):void 0},routine:function(t,e){var i,n,r,s,o,u,h;if("INPUT"===t.tagName&&"radio"===t.type)return t.setAttribute("value",e);if(null!=window.jQuery){if(t=jQuery(t),(null!=e?e.toString():void 0)!==(null!=(s=t.val())?s.toString():void 0))return t.val(null!=e?e:"")}else if("select-multiple"===t.type){if(null!=e){for(h=[],n=0,r=t.length;r>n;n++)i=t[n],h.push(i.selected=(o=i.value,l.call(e,o)>=0));return h}}else if((null!=e?e.toString():void 0)!==(null!=(u=t.value)?u.toString():void 0))return t.value=null!=e?e:""}},t["public"].binders["if"]={block:!0,priority:4e3,bind:function(t){var e,i;return null==this.marker?(e=[this.view.prefix,this.type].join("-").replace("--","-"),i=t.getAttribute(e),this.marker=document.createComment(" rivets: "+this.type+" "+i+" "),this.bound=!1,t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t)):void 0},unbind:function(){var t;return null!=(t=this.nested)?t.unbind():void 0},routine:function(e,i){var n,r,s,o;if(!!i==!this.bound){if(i){s={},o=this.view.models;for(n in o)r=o[n],s[n]=r;return(this.nested||(this.nested=new t.View(e,s,this.view.options()))).bind(),this.marker.parentNode.insertBefore(e,this.marker.nextSibling),this.bound=!0}return e.parentNode.removeChild(e),this.nested.unbind(),this.bound=!1}},update:function(t){var e;return null!=(e=this.nested)?e.update(t):void 0}},t["public"].binders.unless={block:!0,priority:4e3,bind:function(e){return t["public"].binders["if"].bind.call(this,e)},unbind:function(){return t["public"].binders["if"].unbind.call(this)},routine:function(e,i){return t["public"].binders["if"].routine.call(this,e,!i)},update:function(e){return t["public"].binders["if"].update.call(this,e)}},t["public"].binders["on-*"]={"function":!0,priority:1e3,unbind:function(e){return this.handler?t.Util.unbindEvent(e,this.args[0],this.handler):void 0},routine:function(e,i){return this.handler&&t.Util.unbindEvent(e,this.args[0],this.handler),t.Util.bindEvent(e,this.args[0],this.handler=this.eventHandler(i))}},t["public"].binders["each-*"]={block:!0,priority:4e3,bind:function(t){var e,i,n,r,s;if(null==this.marker)e=[this.view.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t);else for(s=this.iterated,n=0,r=s.length;r>n;n++)i=s[n],i.bind()},unbind:function(){var t,e,i,n,r;if(null!=this.iterated){for(n=this.iterated,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.unbind());return r}},routine:function(e,i){var n,r,s,o,u,l,h,a,p,d,c,f,b,v,y,g,m,w,k,x,N;if(h=this.args[0],i=i||[],this.iterated.length>i.length)for(w=Array(this.iterated.length-i.length),f=0,y=w.length;y>f;f++)s=w[f],c=this.iterated.pop(),c.unbind(),this.marker.parentNode.removeChild(c.els[0]);for(o=b=0,g=i.length;g>b;o=++b)if(l=i[o],r={index:o},r[h]=l,null==this.iterated[o]){k=this.view.models;for(u in k)l=k[u],null==r[u]&&(r[u]=l);p=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,a=this.view.options(),a.preloadData=!0,d=e.cloneNode(!0),c=new t.View(d,r,a),c.bind(),this.iterated.push(c),this.marker.parentNode.insertBefore(d,p.nextSibling)}else this.iterated[o].models[h]!==l&&this.iterated[o].update(r);if("OPTION"===e.nodeName){for(x=this.view.bindings,N=[],v=0,m=x.length;m>v;v++)n=x[v],n.el===this.marker.parentNode&&"value"===n.type?N.push(n.sync()):N.push(void 0);return N}},update:function(t){var e,i,n,r,s,o,u,l;e={};for(i in t)n=t[i],i!==this.args[0]&&(e[i]=n);for(u=this.iterated,l=[],s=0,o=u.length;o>s;s++)r=u[s],l.push(r.update(e));return l}},t["public"].binders["class-*"]=function(t,e){var i;return i=" "+t.className+" ",!e==(-1!==i.indexOf(" "+this.args[0]+" "))?t.className=e?""+t.className+" "+this.args[0]:i.replace(" "+this.args[0]+" "," ").trim():void 0},t["public"].binders["*"]=function(t,e){return null!=e?t.setAttribute(this.type,e):t.removeAttribute(this.type)},t["public"].adapters["."]={id:"_rv",counter:0,weakmap:{},weakReference:function(t){var e,i,n;return t.hasOwnProperty(this.id)||(e=this.counter++,Object.defineProperty(t,this.id,{value:e})),(i=this.weakmap)[n=t[this.id]]||(i[n]={callbacks:{}})},cleanupWeakReference:function(t,e){return Object.keys(t.callbacks).length||t.pointers&&Object.keys(t.pointers).length?void 0:delete this.weakmap[e]},stubFunction:function(t,e){var i,n,r;return n=t[e],i=this.weakReference(t),r=this.weakmap,t[e]=function(){var e,s,o,u,l,h,a,p,d,c;u=n.apply(t,arguments),a=i.pointers;for(o in a)for(s=a[o],c=null!=(p=null!=(d=r[o])?d.callbacks[s]:void 0)?p:[],l=0,h=c.length;h>l;l++)e=c[l],e();return u}},observeMutations:function(t,e,i){var n,r,s,o,u,h;if(Array.isArray(t)){if(s=this.weakReference(t),null==s.pointers)for(s.pointers={},r=["push","pop","shift","unshift","sort","reverse","splice"],u=0,h=r.length;h>u;u++)n=r[u],this.stubFunction(t,n);if(null==(o=s.pointers)[e]&&(o[e]=[]),l.call(s.pointers[e],i)<0)return s.pointers[e].push(i)}},unobserveMutations:function(t,e,i){var n,r,s;return Array.isArray(t)&&null!=t[this.id]&&(r=this.weakmap[t[this.id]])&&(s=r.pointers[e])?((n=s.indexOf(i))>=0&&s.splice(n,1),s.length||delete r.pointers[e],this.cleanupWeakReference(r,t[this.id])):void 0},observe:function(t,e,i){var n,r,s;return n=this.weakReference(t).callbacks,null==n[e]&&(n[e]=[],r=Object.getOwnPropertyDescriptor(t,e),(null!=r?r.get:void 0)||(null!=r?r.set:void 0)||(s=t[e],Object.defineProperty(t,e,{enumerable:!0,get:function(){return s},set:function(r){return function(o){var u,h,a,p;if(o!==s&&(r.unobserveMutations(s,t[r.id],e),s=o,u=r.weakmap[t[r.id]])){if(n=u.callbacks,n[e])for(p=n[e].slice(),h=0,a=p.length;a>h;h++)i=p[h],l.call(n[e],i)>=0&&i();return r.observeMutations(o,t[r.id],e)}}}(this)}))),l.call(n[e],i)<0&&n[e].push(i),this.observeMutations(t[e],t[this.id],e)},unobserve:function(t,e,i){var n,r,s;return(s=this.weakmap[t[this.id]])&&(n=s.callbacks[e])?((r=n.indexOf(i))>=0&&(n.splice(r,1),n.length||delete s.callbacks[e]),this.unobserveMutations(t[e],t[this.id],e),this.cleanupWeakReference(s,t[this.id])):void 0},get:function(t,e){return t[e]},set:function(t,e,i){return t[e]=i}},t.factory=function(e){return t.sightglass=e,t["public"]._=t,t["public"]},"object"==typeof("undefined"!=typeof module&&null!==module?module.exports:void 0)?module.exports=t.factory(require("sightglass")):"function"==typeof define&&define.amd?define(["sightglass"],function(e){return this.rivets=t.factory(e)}):this.rivets=t.factory(sightglass)}).call(this);
/*! Stapes.js v0.8.0 < http://hay.github.com/stapes > */
;(function(){"use strict";var a="0.8.1",b=1;if(!Object.create)var c=function(){};var d=Array.prototype.slice,e={attributes:{},eventHandlers:{"-1":{}},guid:-1,addEvent:function(a){e.eventHandlers[a.guid][a.type]||(e.eventHandlers[a.guid][a.type]=[]),e.eventHandlers[a.guid][a.type].push({guid:a.guid,handler:a.handler,scope:a.scope,type:a.type})},addEventHandler:function(a,b,c){var d={},f;typeof a=="string"?(f=c||!1,d[a]=b):(f=b||!1,d=a);for(var g in d){var h=d[g],i=g.split(" ");for(var j=0,k=i.length;j<k;j++){var l=i[j];e.addEvent.call(this,{guid:this._guid||this._.guid,handler:h,scope:f,type:l})}}},addGuid:function(a,c){if(!a._guid||!!c)a._guid=b++,e.attributes[a._guid]={},e.eventHandlers[a._guid]={}},attr:function(a){return e.attributes[a]},clone:function(a){var b=e.typeOf(a);if(b==="object")return e.extend({},a);if(b==="array")return a.slice(0)},create:function(a){if(Object.create)return Object.create(a);c.prototype=a;return new c},createSubclass:function(a,b){function g(){if(this instanceof g)this.on&&e.addGuid(this,!0),d.apply(this,arguments);else throw new Error("Please use 'new' when initializing Stapes classes")}a=a||{},b=b||!1;var c=a.superclass.prototype,d=a.hasOwnProperty("constructor")?a.constructor:function(){};b&&e.extend(c,f),g.prototype=e.create(c),g.prototype.constructor=g,e.extend(g,{extend:function(){return e.extendThis.apply(this,arguments)},parent:c,proto:function(){return e.extendThis.apply(this.prototype,arguments)},subclass:function(a){a=a||{},a.superclass=this;return e.createSubclass(a)}});for(var h in a)h!=="constructor"&&h!=="superclass"&&(g.prototype[h]=a[h]);return g},emitEvents:function(a,b,c,f){c=c||!1,f=f||this._guid;var g=d.call(e.eventHandlers[f][a]);for(var h=0,i=g.length;h<i;h++){var j=e.extend({},g[h]),k=j.scope?j.scope:this;c&&(j.type=c),j.scope=k,j.handler.call(j.scope,b,j)}},extend:function(){var a=d.call(arguments),b=a.shift();for(var c=0,e=a.length;c<e;c++){var f=a[c];for(var g in f)b[g]=f[g]}return b},extendThis:function(){var a=d.call(arguments);a.unshift(this);return e.extend.apply(this,a)},makeUuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=Math.random()*16|0,c=a=="x"?b:b&3|8;return c.toString(16)})},removeAttribute:function(a,b){b=b||!1;var c=e.trim(a).split(" "),d={};for(var f=0,g=c.length;f<g;f++){var h=e.trim(c[f]);h&&(d.key=h,d.oldValue=e.attr(this._guid)[h],delete e.attr(this._guid)[h],b||(this.emit("change",h),this.emit("change:"+h),this.emit("mutate",d),this.emit("mutate:"+h,d),this.emit("remove",h),this.emit("remove:"+h)),delete d.oldValue)}},removeEventHandler:function(a,b){var c=e.eventHandlers[this._guid];if(a&&b){c=c[a];if(!c)return;for(var d=0,f=c.length,g;d<f;d++)g=c[d].handler,g&&g===b&&(c.splice(d--,1),f--)}else a?delete c[a]:e.eventHandlers[this._guid]={}},setAttribute:function(a,b,c){c=c||!1;var d=this.has(a),f=e.attr(this._guid)[a];if(b!==f){e.attr(this._guid)[a]=b;if(c)return;this.emit("change",a),this.emit("change:"+a,b);var g={key:a,newValue:b,oldValue:f||null};this.emit("mutate",g),this.emit("mutate:"+a,g);var h=d?"update":"create";this.emit(h,a),this.emit(h+":"+a,b)}},trim:function(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},typeOf:function(a){return a===null||typeof a=="undefined"?String(a):Object.prototype.toString.call(a).replace(/\[object |\]/g,"").toLowerCase()},updateAttribute:function(a,b,c){var d=this.get(a),f=e.typeOf(d);if(f==="object"||f==="array")d=e.clone(d);var g=b.call(this,d,a);e.setAttribute.call(this,a,g,c||!1)}},f={emit:function(a,b){b=typeof b=="undefined"?null:b;var c=a.split(" ");for(var d=0,f=c.length;d<f;d++){var g=c[d];e.eventHandlers[-1].all&&e.emitEvents.call(this,"all",b,g,-1),e.eventHandlers[-1][g]&&e.emitEvents.call(this,g,b,g,-1),typeof this._guid=="number"&&(e.eventHandlers[this._guid].all&&e.emitEvents.call(this,"all",b,g),e.eventHandlers[this._guid][g]&&e.emitEvents.call(this,g,b))}},off:function(){e.removeEventHandler.apply(this,arguments)},on:function(){e.addEventHandler.apply(this,arguments)}};e.Module=function(){},e.Module.prototype={each:function(a,b){var c=e.attr(this._guid);for(var d in c){var f=c[d];a.call(b||this,f,d)}},extend:function(){return e.extendThis.apply(this,arguments)},filter:function(a){var b=[],c=e.attr(this._guid);for(var d in c)a.call(this,c[d],d)&&b.push(c[d]);return b},get:function(a){if(typeof a=="string"){if(arguments.length>1){var b={};for(var c=0,d=arguments.length;c<d;c++){var f=arguments[c];b[f]=this.get(f)}return b}return this.has(a)?e.attr(this._guid)[a]:null}if(typeof a=="function"){var g=this.filter(a);return g.length?g[0]:null}},getAll:function(){return e.clone(e.attr(this._guid))},getAllAsArray:function(){var a=[],b=e.attr(this._guid);for(var c in b){var d=b[c];e.typeOf(d)==="object"&&!d.id&&(d.id=c),a.push(d)}return a},has:function(a){return typeof e.attr(this._guid)[a]!="undefined"},map:function(a,b){var c=[];this.each(function(d,e){c.push(a.call(b||this,d,e))},b||this);return c},push:function(a,b){if(e.typeOf(a)==="array")for(var c=0,d=a.length;c<d;c++)e.setAttribute.call(this,e.makeUuid(),a[c],b||!1);else e.setAttribute.call(this,e.makeUuid(),a,b||!1);return this},remove:function(a,b){typeof a=="undefined"?(e.attributes[this._guid]={},this.emit("change remove")):typeof a=="function"?this.each(function(c,d){a(c)&&e.removeAttribute.call(this,d,b)}):e.removeAttribute.call(this,a,b||!1);return this},set:function(a,b,c){if(typeof a=="object")for(var d in a)e.setAttribute.call(this,d,a[d],b||!1);else e.setAttribute.call(this,a,b,c||!1);return this},size:function(){var a=0,b=e.attr(this._guid);for(var c in b)a++;return a},update:function(a,b,c){typeof a=="string"?e.updateAttribute.call(this,a,b,c||!1):typeof a=="function"&&this.each(function(b,c){e.updateAttribute.call(this,c,a)});return this}};var g={_:e,extend:function(){return e.extendThis.apply(e.Module.prototype,arguments)},mixinEvents:function(a){a=a||{},e.addGuid(a);return e.extend(a,f)},on:function(){e.addEventHandler.apply(this,arguments)},subclass:function(a,b){b=b||!1,a=a||{},a.superclass=b?function(){}:e.Module;return e.createSubclass(a,!b)},version:a};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=g),exports.Stapes=g):typeof define=="function"&&define.amd?define(function(){return g}):window.Stapes=g})()
window.CoreLibrary = (function () {

   'use strict';

   /** Rivets formatters **/
   rivets.formatters['==='] = function (v1, v2) {
      return v1 === v2;
   };
   rivets.formatters['=='] = function (v1, v2) {
      return v1 == v2; // jshint ignore:line
   };
   rivets.formatters['>='] = function (v1, v2) {
      return v1 >= v2;
   };
   rivets.formatters['>'] = function (v1, v2) {
      return v1 > v2;
   };
   rivets.formatters['<='] = function (v1, v2) {
      return v1 <= v2;
   };
   rivets.formatters['<'] = function (v1, v2) {
      return v1 < v2;
   };
   rivets.formatters['!='] = function (v1, v2) {
      return v1 != v2; // jshint ignore:line
   };
   rivets.formatters['!=='] = function (v1, v2) {
      return v1 !== v2;
   };
   rivets.formatters['and'] = function (v1, v2) {
      return v1 && v2;
   };
   rivets.formatters['or'] = function (v1, v2) {
      return v1 || v2;
   };
   rivets.formatters['not'] = function (v1) {
      return !v1;
   };
   rivets.formatters['-'] = function (v1, v2) {
      return v1 - v2;
   };
   rivets.formatters['+'] = function (v1, v2) {
      return v1 + v2;
   };
   rivets.formatters['*'] = function (v1, v2) {
      return v1 * v2;
   };
   rivets.formatters['/'] = function (v1, v2) {
      return v1 / v2;
   };
   rivets.binders['style-*'] = function (el, value) {
      el.style.setProperty(this.args[0], value);
   };

   /**
    * Checks the HTTP status of a response
    */
   function checkStatus ( response ) {
      if ( response.status >= 200 && response.status < 300 ) {
         return response;
      } else {
         var error = new Error(response.statusText);
         error.response = response;
         throw error;
      }
   }

   /**
    * Parses the response as json
    */
   function parseJSON ( response ) {
      return response.json();
   }

   sightglass.adapters = rivets.adapters;
   sightglass.root = '.';

   return {
      expectedApiVersion: '1.0.0.9', // this value is replaced with the API version number during the compilation step
      widgetModule: null,
      offeringModule: null,
      statisticsModule: null,
      config: {
         oddsFormat: 'decimal',
         apiVersion: 'v2',
         streamingAllowedForPlayer: false
      },
      height: 450,
      pageInfo: {},
      init: function ( setDefaultHeight ) {
         return new Promise(function ( resolve, reject ) {
            if ( window.KambiWidget ) {
               // For development purposes we might want to load a widget on it's own so we check if we are in an iframe, if not then load some fake data
               if ( window.self === window.top ) {
                  void 0;
                  // Load the mock config data
                  fetch('mockSetupData.json')
                     .then(checkStatus)
                     .then(parseJSON)
                     .then(function ( mockSetupData ) {
                        // Output some debug info that could be helpful
                        void 0;
                        void 0;
                        // Apply the mock config data to the core
                        this.applySetupData(mockSetupData, setDefaultHeight);
                        if (this.translationModule != null) {
                           this.translationModule.fetchTranslations(mockSetupData.clientConfig.locale).then(function () {
                              resolve(mockSetupData['arguments']);
                           }.bind(this));
                        } else {
                           resolve(mockSetupData['arguments']);
                        }
                     }.bind(this))
                     .catch(function ( error ) {
                        void 0;
                        void 0;
                        reject();
                     });
               } else {
                  window.KambiWidget.apiReady = function ( api ) {
                     this.widgetModule.api = api;
                     if (api.VERSION !== this.expectedApiVersion) {
                        void 0;
                     }

                     // Request the setup info from the widget api
                     this.requestSetup(function ( setupData ) {
                        // Apply the config data to the core
                        this.applySetupData(setupData, setDefaultHeight);

                        // TODO: Move this to widgets so we don't request them when not needed
                        // Request the outcomes from the betslip so we can update our widget, this will also sets up a subscription for future betslip updates
                        this.widgetModule.requestBetslipOutcomes();
                        // Request the odds format that is set in the sportsbook, this also sets up a subscription for future odds format changes
                        this.widgetModule.requestOddsFormat();

                        if (this.translationModule != null) {
                           this.translationModule.fetchTranslations(setupData.clientConfig.locale).then(function () {
                              resolve(setupData['arguments']);
                           }.bind(this));
                        } else {
                           resolve(setupData['arguments']);
                        }
                     }.bind(this));
                  }.bind(this);
                  // Setup the response handler for the widget api
                  window.KambiWidget.receiveResponse = function ( dataObject ) {
                     this.widgetModule.handleResponse(dataObject);
                  }.bind(this);
               }
            } else {
               void 0;
               reject();
            }
         }.bind(this));
      },

      applySetupData: function ( setupData, setDefaultHeight ) {
         // Set the odds format
         if ( setupData.clientConfig.oddsFormat != null ) {
            this.setOddsFormat(setupData.clientConfig.oddsFormat);
         }

         // Set the configuration in the offering module
         this.offeringModule.setConfig(setupData.clientConfig);

         // Set the configuration in the widget api module
         this.widgetModule.setConfig(setupData.clientConfig);

         // Set page info
         this.setPageInfo(setupData.pageInfo);

         // Set the offering in the API service
         if ( setupData['arguments'] != null && setupData['arguments'].hasOwnProperty('offering') ) {
            this.offeringModule.setOffering(setupData['arguments'].offering);
         } else {
            void 0;
         }

         if ( setDefaultHeight === true ) {
            this.setHeight(setupData.height);
         }

         this.config = setupData;
      },

      requestSetup: function ( callback ) {
         this.widgetModule.requestSetup(callback);
      },

      receiveRespone: function ( response ) {
         void 0;
      },

      setOddsFormat: function ( oddsFormat ) {
         this.config.oddsFormat = oddsFormat;
      },

      setHeight: function ( height ) {
         this.height = height;
         this.widgetModule.setHeight(height);
      },

      setPageInfo: function ( pageInfo ) {
         // Check if the last character in the pageParam property is a slash, if not add it so we can use this property in filter requests
         if ( pageInfo.pageType === 'filter' && pageInfo.pageParam.substr(-1) !== '/' ) {
            pageInfo.pageParam += '/';
         }
         this.pageInfo = pageInfo;
      },

      getData: function ( url ) {
         return fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch(function ( error ) {
               void 0;
               void 0;
               throw error;
            });
      }
   };

})();

CoreLibrary.offeringModule = (function () {
   'use strict';

   return {
      config: {
         apiBaseUrl: null,
         apiUrl: null,
         channelId: null,
         currency: null,
         locale: null,
         market: null,
         offering: null,
         clientId: null,
         version: null,
         routeRoot: '',
         auth: false,
         device: null
      },
      setConfig: function ( config ) {
         // Iterate over the passed object properties, if the exist in the predefined config object then we set them
         for ( var i in config ) {
            if ( config.hasOwnProperty(i) && this.config.hasOwnProperty(i) ) {
               this.config[i] = config[i];
               switch ( i ) {
                  case 'locale':
                     // TODO: deal with locale setting
                     break;
               }
            }
         }
      },
      setOffering: function ( offering ) {
         this.config.offering = offering;
      },
      getGroupEvents: function ( groupId ) {
         var requesPath = '/event/group/' + groupId + '.json';
         return this.doRequest(requesPath);
      },
      getEventsByFilter: function ( filter, params ) {
         // Todo: Update this method once documentation is available
         var requestPath = '/listView/' + filter;
         return this.doRequest(requestPath, params, 'v3');
      },
      getLiveEvents: function () {
         var requestPath = '/event/live/open.json';
         return this.doRequest(requestPath);
      },
      doRequest: function ( requestPath, params, version ) {
         if ( this.config.offering == null ) {
            void 0;
         } else {
            var apiUrl = this.config.apiBaseUrl.replace('{apiVersion}', (version != null ? version : this.config.version));
            var requestUrl = apiUrl + this.config.offering + requestPath;
            var overrideParams = params || {};
            var requestParams = {
               lang: overrideParams.locale || this.config.locale,
               market: overrideParams.market || this.config.market,
               client_id: overrideParams.clientId || this.config.clientId,
               include: overrideParams.include || null
            };
            requestUrl += '?' + Object.keys(requestParams).map(function ( k ) {
                  return encodeURIComponent(k) + '=' + encodeURIComponent(requestParams[k]);
               }).join('&');

            return CoreLibrary.getData(requestUrl);
         }
      }
   };
})();
CoreLibrary.statisticsModule = (function () {
   'use strict';

   return {
      getStatistics: function ( type, filter ) {
         // Remove url parameters from filter
         filter = filter.match(/[^?]*/)[0];

         // Remove trailing slash
         if (filter[filter.length - 1] === '/') {
            filter = filter.slice(0, -1);
         }

         var baseApiUrl = 'https://api.kambi.com/statistics/api/';
         void 0;
         return CoreLibrary.getData(baseApiUrl + CoreLibrary.config.offering + '/' + type + '/' + filter + '.json');
      }
   };
})();

window.CoreLibrary.translationModule = (function () {
   'use strict';

   var translationModule = {
      i18nStrings: {},

      fetchTranslations: function ( locale ) {
         if ( locale == null ) {
            locale = 'en_GB';
         }
         var self = this;
         return new Promise(function ( resolve, reject ) {
            window.CoreLibrary.getData('i18n/' + locale + '.json')
               .then(function ( response ) {
                  translationModule.i18nStrings = response;
                  resolve();
               })
               .catch(function ( error ) {
                  if ( locale !== 'en_GB' ) {
                     void 0;
                     self.fetchTranslations('en_GB').then(resolve);
                  } else {
                     void 0;
                     void 0;
                     resolve();
                  }
               });
         });
      }
   };

   rivets.formatters.translate = function ( value ) {
      if ( translationModule.i18nStrings[value] != null ) {
         return translationModule.i18nStrings[value];
      }
      return value;
   };

   return translationModule;
})();

CoreLibrary.widgetModule = (function () {
   'use strict';

   var Module = Stapes.subclass();

   return {
      api: { // placeholders for when not running inside iframe
         requestSetup: function () {},
         request: function () {},
         set: function () {},
         remove: function () {}
      },
      events: new Module(),
      config: {
         routeRoot: '',
         auth: false,
         device: null
      },
      setConfig: function ( config ) {
         for ( var i in config ) {
            if ( config.hasOwnProperty(i) && this.config.hasOwnProperty(i) ) {
               this.config[i] = config[i];
            }
         }
         // Make sure that the routeRoot is not null or undefined
         if ( this.config.routeRoot == null ) {
            this.config.routeRoot = '';
         } else if ( this.config.routeRoot.length > 0 && this.config.routeRoot.slice(-1) !== '/' ) {
            // If the routeRoot is not empty we need to make sure it has a trailing slash
            this.config.routeRoot += '/';
         }
      },
      handleResponse: function ( response ) {
         switch ( response.type ) {
            case this.api.WIDGET_HEIGHT:
               // We've received a height response
               this.events.emit('WIDGET:HEIGHT', response.data);
               break;
            case this.api.BETSLIP_OUTCOMES:
               // We've received a response with the outcomes currently in the betslip
               this.events.emit('OUTCOMES:UPDATE', response.data);
               break;
            case this.api.WIDGET_ARGS:
               // We've received a response with the arguments set in the
               this.events.emit('WIDGET:ARGS', response.data);
               break;
            case this.api.PAGE_INFO:
               // Received page info response
               this.events.emit('PAGE:INFO', response.data);
               break;
            case this.api.CLIENT_ODDS_FORMAT:
               // Received odds format response
               this.events.emit('ODDS:FORMAT', response.data);
               break;
            case this.api.CLIENT_CONFIG:
               this.events.emit('CLIENT:CONFIG', response.data);
               break;
            case this.api.USER_LOGGED_IN:
               void 0;
               this.events.emit('USER:LOGGED_IN', response.data);
               break;
            case 'Setup':
               this.events.emit('Setup response', response.data);
               break;
            default:
               // Unhandled response
               void 0;
               void 0;
               break;
         }
      },
      requestSetup: function ( callback ) {
         this.api.requestSetup(callback);
      },

      requestWidgetHeight: function () {
         this.api.request(this.api.WIDGET_HEIGHT);
      },

      setWidgetHeight: function ( height ) {
         this.api.set(this.api.WIDGET_HEIGHT, height);
      },

      enableWidgetTransition: function ( enableTransition ) {
         if ( enableTransition ) {
            this.api.set(this.api.WIDGET_ENABLE_TRANSITION);
         } else {
            this.api.set(this.api.WIDGET_DISABLE_TRANSITION);
         }
      },

      removeWidget: function () {
         this.api.remove();
      },

      navigateToLiveEvent: function ( eventId ) {
         this.navigateClient('event/live/' + eventId);
      },

      navigateToEvent: function ( eventId ) {
         this.navigateClient('event/' + eventId);
      },

      navigateToFilter: function ( filterParams ) {
         this.navigateClient(filterParams);
      },

      navigateToLiveEvents: function () {
         this.navigateClient(['in-play']);
      },

      addOutcomeToBetslip: function ( outcomes, stakes, updateMode, source ) {
         var arrOutcomes = [];
         // Check if the outcomes parameter is an array and add it, otherwise add the the single value as an array
         if ( outcomes.isArray() ) {
            arrOutcomes = outcomes;
         } else {
            arrOutcomes.push(outcomes);
         }

         // Setup the data object to be sent to the widget API
         var data = {
            outcomes: arrOutcomes
         };

         // Check if we got any stakes passed to use, add them to the data object if so
         if ( stakes != null ) {
            if ( stakes.isArray() ) {
               data.stakes = stakes;
            } else {
               data.stakes = [stakes];
            }
         }

         // Set the coupon type, defaults to TYPE_SINGLE
         data.couponType = arrOutcomes.length === 1 ? this.api.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE : this.api.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION;

         // Set the update mode, defaults to UPDATE_APPEND
         data.updateMode = updateMode !== 'replace' ? this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND : this.api.BETSLIP_OUTCOMES_ARGS.UPDATE_REPLACE;
         if ( source != null ) {
            data.source = source;
         }

         // Send the data to the widget this.api
         this.api.set(this.api.BETSLIP_OUTCOMES, data);
      },

      removeOutcomeFromBetslip: function ( outcomes ) {
         var arrOutcomes = [];
         if ( outcomes.isArray() ) {
            arrOutcomes = outcomes;
         } else {
            arrOutcomes.push(outcomes);
         }
         this.api.set(this.api.BETSLIP_OUTCOMES_REMOVE, { outcomes: arrOutcomes });
      },

      requestBetslipOutcomes: function () {
         this.api.request(this.api.BETSLIP_OUTCOMES);
      },

      requestPageInfo: function () {
         this.api.request(this.api.PAGE_INFO);
      },

      requestWidgetArgs: function () {
         this.api.request(this.api.WIDGET_ARGS);
      },

      requestClientConfig: function () {
         this.api.request(this.api.CLIENT_CONFIG);
      },

      requestOddsFormat: function () {
         this.api.request(this.api.CLIENT_ODDS_FORMAT);
      },

      requestOddsAsAmerican: function ( odds ) {
         return new Promise(function ( resolve, reject ) {
            this.api.requestOddsAsAmerican(odds, function ( americanOdds ) {
               resolve(americanOdds);
            });
         }.bind(this));
      },

      requestOddsAsFractional: function ( odds ) {
         return new Promise(function ( resolve, reject ) {
            this.api.requestOddsAsFractional(odds, function ( fractionalOdds ) {
               resolve(fractionalOdds);
            });
         });
      },

      navigateClient: function ( destination ) {
         if ( typeof destination === 'string' ) {
            this.api.navigateClient('#' + this.config.routeRoot + destination);
         } else if ( destination.isArray() ) {
            var filter = this.api.createFilterUrl(destination, this.config.routeRoot);
            this.api.navigateClient(filter);
         }
      }
   };
})();
