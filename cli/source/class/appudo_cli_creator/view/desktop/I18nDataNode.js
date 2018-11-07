/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nDataNode",
{
    extend : qx.core.Object,

    members : {
        __children : null,
        __multi : null,
        __data : null,
        __parent : null,
        __treeNode : null,
        __nMap : null,

        removeFromParent : function() {
            var c;
            if(this.__parent && (c =  this.__parent.getChildren())) {
                var idx = c.indexOf(this);
                if(idx != -1) {
                    c[idx] = null;
                }
            }
        },

        addChild : function(child) {
            var c = this.__children;
            if(!c) {
                this.__children = c = [];
            }
            c.push(child);
        },

        removeChild : function(child) {
            var c = this.__children;
            if(c) {
                var idx = c.indexOf(child);
                if(idx != -1)
                    c.splice(idx, 1);
            }
        },

        setChildren : function(c, nomulti) {
            if(Array.isArray(c) || c == null) {
                this.__children = c;
                var m = this.getMulti();
                if(!nomulti && m && m.length) {
                    for(var i = 0; i < m.length; i++) {
                        var item = m[i];
                        if(item != this) {
                            item.setChildren(c, true);
                        }
                    }
                }   
            }
        },

        getChildren : function() {
            return this.__children;
        },

        resetMultiPath : function() {
            this.__multi = null;
            if(this.__parent) {
                this.__parent.resetMultiPath();
            }
        },

        setMulti : function(m) {
            if(Array.isArray(m) || m == null) {
                this.__multi = m;
            }
        },

        getMulti : function() {
            return this.__multi;
        },

        setData : function(d) {
            this.__data = d;
        },

        getData : function() {
            return this.__data;
        },

        setTreeNode : function(d) {
            this.__treeNode = d;
        },

        getTreeNode : function() {
            return this.__treeNode;
        },

        setParent : function(p) {
            if(p == null || (p.classname && p.classname == 'appudo_cli_creator.view.desktop.I18nDataNode')) {
                this.__parent = p;
            }
        },

        getParent : function() {
            return this.__parent;
        },

        setNMap : function(d) {
            this.__nMap = d;
        },

        getNMap : function() {
            return this.__nMap;
        },

        getRoot : function() {
            var p = this.__parent;
            var c = this;
            while(p) {
                c = p;
                p = p.getParent();
            }
            return c;
        },

        onRemove : function() {
            if(this.__multi) {
                var index = this.__multi.indexOf(this);
                this.__multi.splice(index, 1);
            }
        },

        checkMulti : function() {
            if(this.__multi && this.__multi.length <= 1) {
                this.__multi = null;
            }
        },

        getMultiTreeNodes : function(_r) {
            var r = _r || [];
            if(this.__treeNode) {
                if(r.indexOf(this.__treeNode) == -1) {
                    r.push(this.__treeNode);
                }
            }
            if(this.__children) {
                this.__children.forEach(function(n){
                    n.getMultiTreeNode(r);
                });
            }
            return r;
        },

        getMultiTree : function(_r) {
            var r = _r || [];
            if(this.__multi) {
                this.__multi.forEach(function(n){
                    n.getMultiTreeNodes(r);
                });
            }
            if(this.__parent)
                this.__parent.getMultiTree(r);
            return r;
        }
    },
  
    construct : function()
    {
      this.base(arguments);

      this.setMulti(null);
      this.setParent(null);
      this.setChildren(null);
      this.setData(null);
    }
});