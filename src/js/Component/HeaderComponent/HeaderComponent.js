/**
 * header-component dom attribute
 * @module HeaderComponent
 * @type {{static: string[], template: (function()), initialize: (function(*, *))}}
 */
(() => {
   'use strict';

   /**
    * Header Controller
    * @param title
    * @param cssClasses
    * @param scope
    * @param collapsible
    * @param startCollapsed
    * @constructor
    */
   var HeaderController = ( title, cssClasses, scope, collapsible, startCollapsed ) => {
      var headerHeight = 36;
      this.title = title;
      this.cssClasses = cssClasses + ' KambiWidget-font kw-header l-flexbox l-align-center l-pl-16';

      if ( collapsible ) {
         scope.collapsed = startCollapsed;
         if ( scope.collapsed ) {
            CoreLibrary.widgetModule.enableWidgetTransition(false);
            CoreLibrary.widgetModule.setWidgetHeight(headerHeight);
            CoreLibrary.widgetModule.enableWidgetTransition(true);
         }

         this.cssClasses += ' KambiWidget-header';
         this.style = 'cursor: pointer;';

         this.click = ( ev, controller ) => {
            scope.collapsed = !scope.collapsed;
            if ( scope.collapsed ) {
               CoreLibrary.widgetModule.setWidgetHeight(headerHeight);
            } else {
               CoreLibrary.widgetModule.adaptWidgetHeight();
            }
         };
      }
   };

   /**
    * @mixin header-component
    * @example
    * <div header-component>
    * @type {{static: string[], template: (function(): string), initialize: (function(*, *): HeaderController)}}
    */
   rivets.components['header-component'] = {
      static: ['collapsable', 'collapsed', 'css-classes'],

      /**
       * Returns header template.
       * @memberOf module:HeaderComponent#
       * @returns {string}
       */
      template () {
         return `
            <header rv-class="cssClasses" rv-style="style" rv-on-click="click">{title | translate}</header>
         `;
      },

      /**
       * Initializes the rivets component.
       * @memberOf module:HeaderComponent#
       * @param {element} el DOM element to be binded
       * @param {object} attributes DOM attributes
       * @returns {HeaderController}
       */
      initialize ( el, attributes ) {
         var cssClasses = attributes['css-classes'];
         if ( cssClasses == null ) {
            cssClasses = '';
         }

         var collapsible = false;
         if ( attributes.collapsible === 'true' ) {
            collapsible = true;
         }

         var startCollapsed = false;
         if ( attributes.collapsed === 'true' ) {
            startCollapsed = true;
         }

         return new HeaderController(attributes.title, cssClasses, this.view.models, collapsible, startCollapsed);
      }
   };
})();
