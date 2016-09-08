(() => {
   'use strict';

   /**
    *
    * @param element
    * @param attributes
    * @param parentScope
    * @constructor
    */
   var PaginationComponent = function ( element, attributes, parentScope ) {
      this.data = attributes;
      this.scrollerParent = element;
      this.scrollerParent.className += 'kw-pagination l-flexbox';
      this.showLeftNav = false;
      this.showRightNav = false;
      this.scrollStart = 0;

      this.currentPage = this.data.currentPage || 0;
      this.maxItemsPerPage = this.data.maxItemsPerPage ? this.data.maxItemsPerPage : 1;
      this.maxVisibleTabs = this.data.maxVisibleTabs ? this.data.maxVisibleTabs : 5;
      this.paginationScrollable = this.data.type && this.data.type === 'scrollable';
      this.includeIcons = this.data.includeIcons != null ? this.data.includeIcons : false;
      this.tabTextKey = this.data.tabTextKey != null ? this.data.tabTextKey : false;
      this.minTabWidth = this.data.minTabWidth != null ? this.data.minTabWidth : '17.85%';
      this.pageItemClass = '.kw-page-link';

      parentScope['_' + this.data.scopeKey] = [];
      this.originalArray = parentScope[this.data.scopeKey] || [];
      this.currentPageArray = parentScope['_' + this.data.scopeKey];

      this.getScroller = () => {
         this.scroller = document.getElementById('kw-scroll-component');
         if ( this.scroller ) {
            this.scrollerParentWidth = this.scrollerParent.offsetWidth;
            this.scrollerItems = this.scroller.querySelectorAll(this.pageItemClass);
            this.scrollerItemWidth = this.scrollerItems.length ? this.scrollerItems[0].offsetWidth : 0;
            this.scrollerWidth = this.scrollerItemWidth * this.scrollerItems.length + 16 * 2;
            this.enabled = this.scrollerWidth > this.scrollerParentWidth;
         }
      };

      this.getCurrentPage = () => {
         return this.currentPage;
      };

      this.getNumberOfPages = () => {
         return Math.ceil(this.originalArray.length / this.maxItemsPerPage);
      };

      this.nextPage = () => {
         this.doScroll('right');
         return this.getCurrentPage();
      };

      this.previousPage = () => {
         this.doScroll('left');
         return this.getCurrentPage();
      };

      this.handleClass = ( dir, end ) => {
         this.showLeftNav = this.showRightNav = this.enabled;
         if ( this.enabled && dir === 'right' && end ) {
            this.showLeftNav = true;
            this.showRightNav = !this.showLeftNav;
         } else if ( this.enabled && dir === 'left' && end ) {
            this.showLeftNav = false;
            this.showRightNav = !this.showLeftNav;
         }
      };

      this.onClick = ( pageNumber ) => {
         this.adaptArray();
         this.setCurrentPage(pageNumber);
         this.doScroll(null, pageNumber);
      };

      this.doScroll = ( dir, index ) => {
         this.getScroller();
         this.handleClass();
         this.scroller.scrollLeft = ( this.scrollerWidth * ((index + 1) / this.scrollerItems.length) ) - this.scrollerItemWidth;
         if ( !this.enabled ) {
            return false;
         }
         if ( dir === 'left' ) {
            this.scrollStart += this.scrollerItemWidth * 2;
         } else if ( index >= 0 ) {
            this.scrollStart = index * -1 * this.scrollerItemWidth + (this.scrollerParentWidth / 2 - this.scrollerItemWidth / 2);
         } else {
            this.scrollStart -= this.scrollerItemWidth * 2;
         }

         if ( this.scrollStart >= 0 ) {
            this.scrollStart = 0;
            this.handleClass('left', true);
         } else if ( (this.scrollStart * -1) >= (this.scrollerWidth - this.scrollerParentWidth) ) {
            this.scrollStart = (this.scrollerWidth - this.scrollerParentWidth) * -1;
            this.handleClass('right', true);
         }

         this.doTranslate();
      };

      this.doTranslate = ( coordX ) => {
         this.scrollStart = (coordX >= 0 ? coordX : this.scrollStart);
         var translate = 'translate3d(' + this.scrollStart + 'px, 0, 0)';
         this.scroller.style.transform = translate;
         this.scroller.style.webkitTransform = translate;
         this.scroller.style.MozTransform = translate;
      };

      this.setCurrentPage = ( pageNumber ) => {
         if ( pageNumber === this.getCurrentPage() ) {
            return;
         }
         if ( pageNumber < 0 || pageNumber >= this.getNumberOfPages() ) {
            throw new Error('Invalid page number');
         }
         this.currentPage = pageNumber;
      };

      this.clearArray = () => {
         if ( this.currentPageArray ) {
            this.currentPageArray.splice(0, this.currentPageArray.length);
         }
      };

      this.adaptArray = () => {
         this.clearArray();
         var startItem = this.getCurrentPage() * this.maxItemsPerPage;
         var endItem = startItem + this.maxItemsPerPage;
         if ( endItem >= this.originalArray.length ) {
            endItem = this.originalArray.length;
         }
         for ( var i = startItem; i < endItem; ++i ) {
            this.currentPageArray.push(this.originalArray[i]);
         }
         this.render();
      };

      this.render = () => {
         this.pages = [];
         var maxVisibleTabs = this.maxVisibleTabs,
            currentPage = this.getCurrentPage(),
            pageCount = this.getNumberOfPages(),
            startPage = 0,
            endPage = pageCount;

         // if ( maxVisibleTabs < pageCount ) {
         //    // Keep active page in middle by adjusting start and end
         //    startPage = Math.max(currentPage - Math.ceil(maxVisibleTabs / 3), 0);
         //    endPage = startPage + maxVisibleTabs;
         //    // Shift the list start and end
         //    if ( endPage > pageCount ) {
         //       endPage = pageCount;
         //       startPage = endPage - maxVisibleTabs;
         //    }
         // }

         for ( var i = startPage; i <= endPage - 1; i++ ) {
            var page = {
               text: this.originalArray[i].event.sport,
               number: i,
               selected: i === this.getCurrentPage(),
               clickEvent: this.onClick.bind(this, i) // calls setCurrentPage with i as a parameter
            };
            if ( this.tabTextKey && this.originalArray[i].hasOwnProperty(this.tabTextKey) ) {
               page.text = this.originalArray[i][this.tabTextKey];
            }
            if ( this.includeIcons ) {
               page.iconClass = 'kw-custom-logo-' + this.composeObject(this.originalArray[i], this.includeIcons).toLowerCase();
            }
            this.pages.push(page);
         }
      };

      this.composeObject = ( object, path ) => {
         var i = 0, strPath = path.split('.'), len = strPath.length;
         for ( ; i < len; i++ ) {
            object = object[strPath[i]];
         }
         return object;
      };

      sightglass(this, 'currentPage', () => {
         this.setCurrentPage(this.currentPage);
         this.adaptArray();
         if ( this.paginationScrollable ) {
            this.onClick(this.currentPage);
         }
      });

      sightglass(parentScope, this.data.scopeKey, () => {
         this.originalArray = parentScope[this.data.scopeKey];
      });
   };

   rivets.components['pagination-component'] = {

      static: ['scopeKey', 'maxItemsPerPage', 'type', 'includeIcons', 'tabTextKey', 'minTabWidth', 'pageItemClass'],

      /**
       * Template pagination
       * @returns {string}
       * @private
       */
      template () {
         return `
            <div rv-show="showLeftNav" class="kw-scroll-left l-flexbox l-align-center" rv-on-click="previousPage">
               <i class="icon-angle-left"></i>
            </div>
            <div class="kw-scroll-container KambiWidget-font"
               rv-class-l-ml-16="paginationScrollable"
               rv-class-l-mr-16="paginationScrollable">
               <div id="kw-scroll-component" class="kw-scroll-inner l-flexbox l-pack-justify l-flex-1 l-align-stretch"
               rv-class-kw-pagination-scrollable="paginationScrollable">
                        <span rv-each-page="pages" rv-on-click="page.clickEvent" rv-class-kw-active-page="page.selected"
                           rv-style-min-width="minTabWidth"
                              class="KambiWidget-card-border-color kw-page-link l-flexbox l-vertical l-pack-center l-align-center l-flex-1">
                           <span rv-show="includeIcons" rv-class="'kw-sports-logo ' | + page.iconClass"></span>
                           <span rv-class-kw-sports-text="includeIcons" rv-text="page.text"></span>
                           <span class="KambiWidget-primary-background-color kw-custom-border"></span>
                        </span>
               </div>
            </div>
            <div rv-show="showRightNav" class="kw-scroll-right l-flexbox l-align-center l-pack-end" rv-on-click="nextPage">
               <i class="icon-angle-right"></i>
            </div>
         `;
      },

      /**
       * Initialize outcome-component-no-label.
       * @param el
       * @param attributes
       * @returns {PaginationComponent}
       * @private
       */
      initialize ( el, attributes ) {
         return new PaginationComponent(el, attributes, this.view.models);
      }
   };
})();
