/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.CommandTreeFilter",
{
  extend : qx.ui.form.TextField,

  members : 
  {
    __controller : null,
    __timeout: -1,

    __doFilter : function() {
        this.__controller.commandsFilter(this.getValue());
    },

    __tryFilter : function() {
        var _this = this;
        if(this.__timeout != -1) {
            clearTimeout(this.__timeout);
            this.__timeout = -1;
        }
        this.__timeout = setTimeout(function() {
            _this.__doFilter.call(_this);
        }, 800);
    },

    reset : function() {
        this.resetValue();
    }
  },
  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);
    this.setPlaceholder(this.tr('Filter Commands...'));
    this.__controller = controller;

    this.addListener('keyup', this.__tryFilter, this);

    this.__controller.addReset(function() {
        _this.reset.call(_this);
    });
  }
});