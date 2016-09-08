import widgetModule from './../../Module/widgetModule';

/**
 * Header Controller
 * @param title
 * @param cssClasses
 * @param scope
 * @param collapsable
 * @param startCollapsed
 * @constructor
 * @private
 */
var HeaderController = (title, cssClasses, scope, collapsable, startCollapsed) => {
   var headerHeight = 36;
   this.title = title;
   this.cssClasses = cssClasses + ' KambiWidget-font kw-header l-flexbox l-align-center l-pl-16';

   if (collapsable) {
      scope.collapsed = startCollapsed;
      if (scope.collapsed) {
         widgetModule.enableWidgetTransition(false);
         widgetModule.setWidgetHeight(headerHeight);
         widgetModule.enableWidgetTransition(true);
      }

      this.cssClasses += ' KambiWidget-header';
      this.style = 'cursor: pointer;';

      this.click = (ev, controller) => {
         scope.collapsed = !scope.collapsed;
         if (scope.collapsed) {
            widgetModule.setWidgetHeight(headerHeight);
         } else {
            widgetModule.adaptWidgetHeight();
         }
      };
   }
};

/**
 * Component that creates a header for the widget that can optionally
 * collapse the widget by cliking on it
 * @memberof rivets
 * @mixin component "header-component"
 * @example
 * <header-component title='Title'>
 * @property {Boolean} collapsable if true clickin on header will collapse the widget
 * @property {Boolean} collapsed if true the widget starts collapsed
 * @property {String} css-classes classes to add to the header
 */
export default {
   static: ['collapsable', 'collapsed', 'css-classes'],

   /**
    * Returns header template.
    * @returns {string}
    * @private
    */
   template () {
      return `
            <header rv-class="cssClasses" rv-style="style" rv-on-click="click">{title | translate}</header>
         `;
   },

   /**
    * Initializes the rivets component.
    * @param {element} el DOM element to be binded
    * @param {object} attributes DOM attributes
    * @returns {HeaderController}
    * @private
    */
   initialize (el, attributes) {
      var cssClasses = attributes['css-classes'];
      if (cssClasses == null) {
         cssClasses = '';
      }

      var collapsable = false;
      if (attributes.collapsable === 'true') {
         collapsable = true;
      }

      var startCollapsed = false;
      if (attributes.collapsed === 'true') {
         startCollapsed = true;
      }

      return new HeaderController(attributes.title, cssClasses, this.view.models, collapsable, startCollapsed);
   }
};