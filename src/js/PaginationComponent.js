(function () {
'use strict';

CoreLibrary.PaginationComponent = CoreLibrary.Component.subclass({
   htmlTemplate: '<span>&lt;</span><div rv-each-page="pages">{page}</div><span>&gt;</span>',

   constructor: function (htmlElement, mainComponentScope, scopeKey, pageSize) {
      CoreLibrary.Component.apply(this, [{
         rootElement: htmlElement
      }]);
      this.scopeKey = scopeKey;
      this.pageSize = pageSize;
      this.scope.currentPage = 0;

      /* creates a new array with name _scopeKey
      the component should use this array when it wants only the data
      of the currentPage
      */
      mainComponentScope['_' + scopeKey] = [];
      this.originalArray = mainComponentScope[scopeKey];
      this.currentPageArray = mainComponentScope['_' + scopeKey];

      sightglass(mainComponentScope, scopeKey, function () {
         this.originalArray = mainComponentScope[scopeKey];
         this.scope.currentPage = 0;
         this.currentPageArray.length = 0; // empties the array
         this.adaptArray();
      }.bind(this));

      this.scope.nextPage = this.nextPage.bind(this);
      this.scope.previousPage = this.previousPage.bind(this);
      this.scope.setCurrentPage = this.setCurrentPage.bind(this);

      this.adaptArray();
   },

   nextPage: function () {
      var numberOfPages = Math.ceil(this.originalArray.length / this.pageSize);
      if (this.scope.currentPage < numberOfPages - 1) {
         this.scope.currentPage++;
         this.adaptArray();
      }
      return this.scope.currentPage;
   },

   previousPage: function () {
      if (this.scope.currentPage > 0) {
         this.scope.currentPage--;
         this.adaptArray();
      }
      return this.scope.currentPage;
   },

   adaptArray: function () {
      this.currentPageArray.length = 0; // empties the array
      var startItem = this.scope.currentPage * this.pageSize;
      var endItem = startItem + this.pageSize;
      if (endItem >= this.originalArray.length) {
         endItem = this.originalArray.length;
      }
      for (var i = startItem; i < endItem; ++i) {
         this.currentPageArray.push(this.originalArray[i]);
      }
      this.render();
   },

   setCurrentPage: function (pageNumber) {
      var numberOfPages = Math.ceil(this.originalArray.length / this.pageSize);
      if (pageNumber < 0 || pageNumber >= numberOfPages) {
         throw new Error('Invalid page number');
      }
      this.scope.currentPage = pageNumber;
      this.adaptArray();
   },

   init: function () {
      this.render();
   },

   render: function (page) {
      var numberOfPages = Math.ceil(this.originalArray.length / this.pageSize);
      this.scope.pages = [];
      for (var i = 0; i < numberOfPages; i++) {
         this.scope.pages.push((i + 1) + ''); // converts i to string
      }
   }
});

})();
