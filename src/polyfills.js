import es6Promise from 'es6-promise'; // ES6 Promise polyfill

es6Promise.polyfill();

// Object.assign polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
   (function () {
      Object.assign = function (target) {
         'use strict';
         // We must check against these specific cases.
         if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
         }

         var output = Object(target);
         for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
               for (var nextKey in source) {
                  if (source.hasOwnProperty(nextKey)) {
                     output[nextKey] = source[nextKey];
                  }
               }
            }
         }
         return output;
      };
   })();
}

// Array.find polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
   // eslint-disable-next-line
   Array.prototype.find = function(predicate) {
      'use strict';
      if (this == null) {
         throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
         throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      // eslint-disable-next-line
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
         value = list[i];
         if (predicate.call(thisArg, value, i, list)) {
            return value;
         }
      }
      return undefined;
   };
}

// window.fetch polyfill
// NOTE: supports only basic invocation and return simple response object
if (typeof window.fetch !== 'function') {
   window.fetch = function(input, init) {
      if (!input.isPrototypeOf(String) && init) {
         throw new Error('Not implemented');
      }

      return new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();

         xhr.open('GET', input, true);

         xhr.onload = function() {
            const body = 'response' in xhr ? xhr.response : xhr.responseText;

            const response = {
               status: xhr.status,
               statusText: xhr.statusText,
               text: () => Promise.resolve(body),
               json: () => Promise.resolve(JSON.parse(body))
            };

            resolve(response);
         };

         xhr.onerror = () => reject(new TypeError('Network request failed'));

         xhr.ontimeout = () => reject(new TypeError('Network request failed'));

         xhr.send();
      });
   };
}
