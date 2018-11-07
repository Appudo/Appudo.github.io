/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nLangNode",
{
    extend : qx.core.Object,

    members : {
        __map : null,

        addData : function(lang, path, returnExist) {
            if(path) {
                var l = this.getMap()[lang];
                if(l) {
                    var key = path.join("/");
                    if(l[key] === undefined) {
                        var d = new appudo_cli_creator.view.desktop.I18nDataNode();
                        l[key] = d
                        return d;
                    }

                    if(returnExist) {
                        return l[key];
                    }
                }
            }
            return null;
        },

        getData : function(lang, path) {
            if(path) {
                var l = this.getMap()[lang];
                if(l) {
                    var key = path.join("/");
                    return l[key];
                }
            }
            return null;
        },

        removePrefix : function(lang, path) {
            var r = [];
            var l = this.getMap()[lang];
            if(l) {
                var key = path.join("/");
                var pn = Object.getOwnPropertyNames(l);
                for(var i = 0; i < pn.length; i++) {
                    var n = pn[i];
                    if(n.startsWith(key)) {
                        r.push(l[n]);
                        delete l[n];
                    }
                }
            }
            return r;
        },

        removeData : function(lang, path) {
            var l = this.getMap()[lang];
            if(l) {
                var key = path.join("/");
                if(l[key] === undefined) {
                    return null;
                }
                var d = l[key];
                delete l[key];
                return d;
            }
            return null;
        },

        addLang : function(name) {
            if(!this.getMap()[name]) {
                this.getMap()[name] = {};
            }
        },

        removeLang : function(name) {
            delete this.getMap()[name];
        },

        setMap : function(m) {
            if(typeof m == 'object') {
                this.__map = m;
            }
        },

        getMap : function() {
            return this.__map;
        }
    },
  
    construct : function()
    {
      this.base(arguments);

      this.setMap({});
    }
});