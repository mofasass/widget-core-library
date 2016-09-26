import rivets from 'rivets';

export default (() => {
   'use strict';

   /**
    * Icon Header Controller
    *
    * @param {String} title Title to be displayed on header
    * @param {String} subtitle Subtitle to be displayed on header
    * @param {String} iconCssClass Header icon CSS class
    * @constructor
    * @private
    */
   var IconHeaderController = function ( title, subtitle, iconCssClass ) {
      this.title = title;
      this.subtitle = subtitle;
      this.iconCssClass = iconCssClass ? `kw-icon-header-logo ${iconCssClass}` : null;
   };

   /**
    * Component that creates a header for the widget that can optionally have a subtitle and an icon.
    *
    * @memberof rivets
    * @mixin component "icon-header-component"
    * @example
    * <icon-header-component title='Title' subtitle='Subtitle' icon-css-class='icon-class'>
    * @property {String} title Title to be displayed on header
    * @property {String} subtitle Subtitle to be displayed on header
    * @property {String} icon-css-class Header icon CSS class
    */
   rivets.components['icon-header-component'] = {
      /**
       * Defines static properties.
       */
      static: ['iconCssClass'],

      /**
       * Returns header template.
       * @returns {String}
       * @private
       */
      template: function () {
         return `
            <header class="KambiWidget-card-border-color KambiWidget-font kw-icon-header l-flexbox l-align-center l-pl-16">
               <div rv-if="iconCssClass" rv-class="iconCssClass"></div>
               <div class="kw-icon-header-text-container">
                  <div class="kw-icon-header-title text-truncate" rv-text="title"></div>
                  <div rv-if="subtitle" class="kw-icon-header-subtitle text-truncate" rv-text="subtitle"></div>
               </div>
            </header>
         `;
      },

      /**
       * Initializes the rivets component.
       * @param {element} el DOM element to be binded
       * @param {object} attributes DOM attributes
       * @returns {IconHeaderController}
       * @private
       */
      initialize: function ( el, attributes ) {
         return new IconHeaderController(attributes.title, attributes.subtitle, attributes.iconCssClass);
      }
   };
})();
