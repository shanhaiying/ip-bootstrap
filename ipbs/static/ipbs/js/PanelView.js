// the immediately-called closure and 'use strict' helps ensure hygiene
;(function(define){
'use strict';
 /**
  * The browser-side counterpart to Panel
  *
  * @author Nicholas Bollweg
  * @copyright Nicholas Bollweg 2014
  * @version 0.1.0
  * @license BSD
  */
define([
  'widgets/js/manager',
  'widgets/js/widget',
  'jquery',
  'underscore',
  './mixins/Classy',
  './mixins/Regional'
],
function(manager, widget, $, _, Classy, Regional){
  var classy = Classy(
      widget.DOMWidgetView, [
        {prefix: "panel-"}
      ]),
    regional = Regional(classy, {
        "heading": {children: ["title"], hideEmpty: true},
        "title": {hideEmpty: true},
        "body": {},
        "footer": {hideEmpty: true}
      });
  
  var PanelView = regional.extend({
    className: 'ipbs PanelView',
    
    render: function(){
      this.$el.addClass("panel").append(
        this.$heading = $("<div/>").addClass("panel-heading")
          .append(this.$title = $("<div/>").addClass("panel-title")),
        this.$body = $("<div/>").addClass("panel-body"),
        this.$footer = $("<div/>").addClass("panel-footer")
      );
      
      return PanelView.__super__.render.apply(this, arguments);
    }
  }); // /extend

  // Register the PanelView with the widget manager.
  manager.WidgetManager.register_widget_view(
    'ipbs/PanelView',
    PanelView
  );
  
  
  // Eventually, requirejs will be used directly: be ready.
  return {
    'ipbs/PanelView': PanelView
  };
});
}).call(this, this.define);