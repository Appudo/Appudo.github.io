/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.EscapeTextField",
{
  extend : qx.ui.form.TextField,

  members : {
    __hasError : false,

    setValue : function(v) {
        var s = JSON.stringify({t:'' + v});
        s = s.substr(6, s.length - 8);
        this.base(arguments, s);
    },

    addListener : function(ty, func, context, bubble) {
        var _this = this;
        if(ty == 'changeValue') {
            return this.base(arguments, ty, function(e) {
                var data = e.getData();
                if(this.__hasError) {
                    _this.setTextColor('text-label');
                    this.__hasError = false;
                }
                try {
                    func.call(context, {getData : function() {
                        var r = JSON.parse('{"v":"' + data + '"}');
                        return r.v;
                    }});
                } catch(err) {
                    this.__hasError = true;
                    _this.setTextColor('#FF0000');
                }
            }, context, bubble);
        } else {
            return this.base(arguments, ty, func, context, bubble);
        }
    }
  },

  construct : function(label)
  {
    this.base(arguments);

    if(label) {
        this.setValue(label);
    }
  }
});