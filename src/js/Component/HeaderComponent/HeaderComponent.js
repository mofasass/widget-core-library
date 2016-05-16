(function () {
   var HeaderController = function (title, cssClasses, scope, collapsable, startCollapsed) {
      var headerHeight = 36;
      this.title = title;
      this.cssClasses = cssClasses + ' KambiWidget-font kw-header l-flexbox l-align-center l-pl-16';

      if (collapsable) {
         scope.collapsed = startCollapsed;
         if (scope.collapsed) {
            CoreLibrary.widgetModule.enableWidgetTransition(false);
            CoreLibrary.widgetModule.setWidgetHeight(headerHeight);
            CoreLibrary.widgetModule.enableWidgetTransition(true);
         }

         this.cssClasses += ' KambiWidget-header';
         this.style = 'cursor: pointer;';

         this.click = (ev, controller) => {
            scope.collapsed = !scope.collapsed;
            if (scope.collapsed) {
               CoreLibrary.widgetModule.setWidgetHeight(headerHeight);
            } else {
               CoreLibrary.widgetModule.adaptWidgetHeight();
            }
         };
      }
   };

   rivets.components['header-component'] = {
      static: ['collapsable', 'collapsed', 'css-classes'],

      template: function () {
         return `
<header rv-class="cssClasses" rv-style="style" rv-on-click="click">{title | translate}</header>
         `;
      },

      initialize ( el, attributes ) {
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
})();
