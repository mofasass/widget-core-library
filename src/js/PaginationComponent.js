(function () {
'use strict';

CoreLibrary.PaginationComponent = CoreLibrary.Component.subclass({
   htmlTemplate:
   '<div class="kw-pagination l-flexbox l-pack-center l-align-center">' +
      '<span rv-on-click="previousPage" rv-class-disabled="firstPage"' +
         'class="kw-page-link kw-pagination-arrow">' +
         '<i class="icon-angle-left"></i>' +
      '</span>' +
      '<span rv-each-page="pages" rv-on-click="page.clickEvent" rv-class-kw-active-page="page.selected"' +
         'class="kw-page-link l-pack-center l-align-center" >' +
         '{page.text}' +
      '</span>' +
      '<span rv-on-click="nextPage" rv-class-disabled="lastPage"' +
         'class="kw-page-link kw-pagination-arrow">' +
         '<i class="icon-angle-right"></i>' +
      '</span>' +
   '</div>',

   constructor: function (htmlElement, mainComponentScope, scopeKey, pageSize, maxVisiblePages) {
      CoreLibrary.Component.apply(this, [{
         rootElement: htmlElement
      }]);
      this.scopeKey = scopeKey;
      this.pageSize = pageSize ? pageSize : 3;
      this.maxVisiblePages = maxVisiblePages ? maxVisiblePages : 5;
      this.scope.currentPage = 0;
      this.scope.firstPage = true;
      this.scope.lastPage = false;

      /*
      creates a new array with name _scopeKey
      the component should use this array when it wants only the data
      of the currentPage
      */
      mainComponentScope['_' + scopeKey] = [];
      this.originalArray = mainComponentScope[scopeKey];
      this.currentPageArray = mainComponentScope['_' + scopeKey];

      // watching for changes in the original array
      sightglass(mainComponentScope, scopeKey, function () {
         this.originalArray = mainComponentScope[scopeKey];
         this.setCurrentPage(0);
         this.currentPageArray.length = 0; // empties the array
         this.adaptArray();
      }.bind(this));

      this.scope.nextPage = this.nextPage.bind(this);
      this.scope.previousPage = this.previousPage.bind(this);

      this.adaptArray();
   },

   getCurrentPage: function () {
      return this.scope.currentPage;
   },

   setCurrentPage: function (pageNumber) {
      if (pageNumber === this.getCurrentPage()) {
         return;
      }
      if (pageNumber < 0 || pageNumber >= this.getNumberOfPages()) {
         throw new Error('Invalid page number');
      }
      this.scope.currentPage = pageNumber;
      this.adaptArray();
   },

   getNumberOfPages: function () {
      return Math.ceil(this.originalArray.length / this.pageSize);
   },

   nextPage: function () {
      if (this.getCurrentPage() < this.getNumberOfPages() - 1) {
         this.setCurrentPage(this.getCurrentPage() + 1);
      }
      return this.getCurrentPage();
   },

   previousPage: function () {
      if (this.getCurrentPage() > 0) {
         this.setCurrentPage(this.getCurrentPage() - 1);
      }
      return this.getCurrentPage();
   },

   /**
    * Changes the _scopeKey array to match the current page elements
    */
   adaptArray: function () {
      this.currentPageArray.length = 0; // empties the array
      var startItem = this.getCurrentPage() * this.pageSize;
      var endItem = startItem + this.pageSize;
      if (endItem >= this.originalArray.length) {
         endItem = this.originalArray.length;
      }
      for (var i = startItem; i < endItem; ++i) {
         this.currentPageArray.push(this.originalArray[i]);
      }

      this.scope.firstPage = this.getCurrentPage() === 0;
      this.scope.lastPage = this.getCurrentPage() === this.getNumberOfPages() - 1;

      this.render();
   },

   init: function () {
      this.render();
   },

   /**
    * Updates the scope.pages value which is used to render the page numbers and arrows
    */
   render: function (page) {
      this.scope.pages = [];
      var startPage = this.getCurrentPage() - 2;
      if (this.getCurrentPage() + 2 >= this.getNumberOfPages()) {
         var startPage = this.getNumberOfPages() - 5;
      }
      if (startPage < 0) {
         startPage = 0;
      }
      var i = startPage;
      var numberOfPagesVisible = 0;
      while (i < this.getNumberOfPages() && numberOfPagesVisible < 5) {
         this.scope.pages.push({
            text: (i + 1) + '',
            number: i,
            selected: i === this.getCurrentPage(),
            clickEvent: this.setCurrentPage.bind(this, i) // calls setCurrentPage with i as a parameter
         });
         ++i;
         ++numberOfPagesVisible;
      }
   }
});

})();
