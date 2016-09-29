import es6Promise from 'es6-promise'; // ES6 Promise polyfill

es6Promise.polyfill();

// Object.assign polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
   (function () {
      Object.assign = function (target) {
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
