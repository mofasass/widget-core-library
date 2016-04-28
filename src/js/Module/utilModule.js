window.CoreLibrary.utilModule = (function () {
   'use strict';

   var utilModule = {
      diffArray: function ( A, B ) {
         var map = {}, C = [];

         for ( var i = B.length; i--; ) {
            map[B[i]] = null;
         } // any other value would do

         for ( var i = A.length; i--; ) {
            if ( !map.hasOwnProperty(A[i]) ) {
               C.push(A[i]);
            }
         }

         return C;
      }
   };

   return utilModule;
})();
