(function () {
   'use strict';

   /**
    * Header Controller
    *
    * @param {String} leftText Left aligned text
    * @param {String} rightText Right aligned text
    * @param {String} leftTextCssClass CSS class(es) to add to left text
    * @param {String} rightTextCssClass CSS class(es) to add to right text
    * @constructor
    * @private
    */
   var HeaderController = function ( leftText, rightText, leftTextCssClass, rightTextCssClass ) {
      this.leftText = leftText;
      this.rightText = rightText;
      this.leftTextCssClass = 'kw-header-left-text' + (leftTextCssClass ? ` ${leftTextCssClass}` : '');
      this.rightTextCssClass = 'kw-header-right-text' + (rightTextCssClass ? ` ${rightTextCssClass}` : '');
   };

   /**
    * Component that creates a header with left and/or right aligned text.
    *
    * @memberof rivets
    * @mixin component "header-component"
    * @example
    * <header-component left-text="Left title" right-text="Right title" left-text-css-class="left-txt" right-text-css-class="right-txt">
    * @property {String} left-text Left aligned text
    * @property {String} right-text Right aligned text
    * @property {String} left-text-css-class CSS class(es) to add to left text
    * @property {String} right-text-css-class CSS class(es) to add to right text
    */
   rivets.components['header-component'] = {
      /**
       * Defines static properties.
       */
      static: ['leftTextCssClass', 'rightTextCssClass'],

      /**
       * Returns header template.
       * @returns {String}
       * @private
       */
      template: function () {
         return `
            <header class="kw-header l-pl-16 l-pr-16">
               <div rv-show="leftText" rv-class="leftTextCssClass" rv-text="leftText"></div>
               <div rv-show="rightText" rv-class="rightTextCssClass" rv-text="rightText"></div>
            </header>
         `;
      },

      /**
       * Initializes the rivets component.
       * @param {element} el DOM element to be binded
       * @param {object} attributes DOM attributes
       * @returns {HeaderController}
       * @private
       */
      initialize: function ( el, attributes ) {
         return new HeaderController(
            attributes.leftText,
            attributes.rightText,
            attributes.leftTextCssClass,
            attributes.rightTextCssClass
         );
      }
   };
})();
