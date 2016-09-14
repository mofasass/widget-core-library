import * as sightglass from 'sightglass';
import Component from '../Component';

/**
 * Component used for creating number-based pagination
 * @example
 HTML:
 <body>
 <!-- note that we need an _ in _events, scope.events is the original array,
 _events is the array just with the elements of this page-->
 <div rv-each-event="_events">
 <span>{event.name}</span>
 </div>
 ...
 <!--Footer-->
 <footer class="kw-footer">
 <div id="pagination" class="kw-pagination l-flexbox l-pack-center l-align-center"></div>
 </footer>
 </body>

 init() {
   ...
   this.scope.events = [...];
   this.pagination = new CoreLibrary.PaginationComponent('#pagination', this.scope, 'events', 5);
}
 * @class PaginationComponent
 */

export default Component.subclass({
   htmlTemplate: `
      <div class="kw-pagination l-flexbox l-pack-center l-align-center">
         <span
               rv-on-click="previousPage"
               rv-class-disabled="firstPage"
               class="kw-page-link kw-pagination-arrow">
            <i class="icon-angle-left"></i>
         </span>
         <span
               rv-each-page="pages"
               rv-on-click="page.clickEvent"
               rv-class-kw-active-page="page.selected"
               class="kw-page-link l-pack-center l-align-center">
            {page.text}
         </span>
         <span
               rv-on-click="nextPage"
               rv-class-disabled="lastPage"
               class="kw-page-link kw-pagination-arrow">
               <i class="icon-angle-right"></i>
         </span>
      </div>
      `,

   /**
    * Constructor method.
    * @param {string} htmlElement HTML element to place the controller (pagination buttons) in
    * @param {object} mainComponentScope The scope object of the widget
    * @param {string} scopeKey scope key - they attribute name in the scope object to paginate on
    * @param {number} pageSize Number of elements per page
    * @param {number} maxVisiblePages Maximum visible pages in the controller
    * @memberof PaginationComponent
    */
   constructor (htmlElement, mainComponentScope, scopeKey, pageSize, maxVisiblePages) {
      Component.apply(this, [{
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
      sightglass(mainComponentScope, scopeKey, () => {
         this.originalArray = mainComponentScope[scopeKey];
         this.setCurrentPage(0);
         this.clearArray();
         this.adaptArray();
      });

      this.scope.nextPage = this.nextPage.bind(this);
      this.scope.previousPage = this.previousPage.bind(this);

      this.adaptArray();
   },

   /**
    * Empties the currentPageArray.
    * @memberof PaginationComponent
    * @private
    */
   clearArray () {
      this.currentPageArray.splice(0, this.currentPageArray.length);
   },

   /**
    * Get current page.
    * @returns {number}
    * @memberof PaginationComponent
    */
   getCurrentPage () {
      return this.scope.currentPage;
   },

   /**
    * Sets currentPage variable.
    * @param {number} pageNumber Set a certain page as current one
    * @memberof PaginationComponent
    */
   setCurrentPage (pageNumber) {
      if (pageNumber === this.getCurrentPage()) {
         return;
      }
      if (pageNumber < 0 || pageNumber >= this.getNumberOfPages()) {
         throw new Error('Invalid page number');
      }
      this.scope.currentPage = pageNumber;
      this.adaptArray();
   },

   /**
    * Returns the number of pages.
    * @returns {number}
    * @memberof PaginationComponent
    */
   getNumberOfPages () {
      return Math.ceil(this.originalArray.length / this.pageSize);
   },

   /**
    * Method for displaying next page.
    * @returns {Number}
    * @memberof PaginationComponent
    */
   nextPage () {
      if (this.getCurrentPage() < this.getNumberOfPages() - 1) {
         this.setCurrentPage(this.getCurrentPage() + 1);
      }
      return this.getCurrentPage();
   },

   /**
    * Method for displaying previous page.
    * @returns {Number}
    * @memberof PaginationComponent
    */
   previousPage () {
      if (this.getCurrentPage() > 0) {
         this.setCurrentPage(this.getCurrentPage() - 1);
      }
      return this.getCurrentPage();
   },

   /**
    * Changes the _scopeKey array to match the current page elements.
    * @memberof PaginationComponent
    * @private
    */
   adaptArray () {
      this.clearArray();
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

   /**
    * Renders the component.
    * @memberof PaginationComponent
    * @private
    */
   init () {
      this.render();
   },

   /**
    * Updates the scope.pages value which is used to render the page numbers and arrows.
    * @memberof PaginationComponent
    * @private
    */
   render () {
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
