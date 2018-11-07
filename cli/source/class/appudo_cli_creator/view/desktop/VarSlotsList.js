/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsList",
{
  extend : qx.ui.container.Composite,

  members : {
    __controller : null,
    __list : null,
    __area : null,
    __label : null,
    __model : null,
    __header : null,
    __parent : null,
    __usedSlots : [],
    __decorator : null,
    __itemDecorator : null,
    __markedItemDecorator : null,
    __currentMarkedLine : -1,
    __local : false,

    selectItem : function(item) {
      this.__parent.selectIndex(item.getIndex());
    },

    getItemDecorator : function() {
      return this.__itemDecorator;
    },

    getMarkedItemDecorator : function() {
      return this.__markedItemDecorator;
    },

    isLocal : function() {
      return this.__local;
    },
    
    getUsedSlots : function() {
      return this.__usedSlots;
    },

    getParent : function() {
      return this.__parent;
    },

    updateDecorator : function() {
      this._disposeObjects("__decorator");
      var decorator = this.__decorator = new qx.ui.decoration.Decorator();
      var o = {
        width : 1,
        style : "solid",
        color : "#334866"
      };
      o.widthTop = 0;
      this.__label.setDecorator(decorator.set(o));
    },

    __getItem : function(index) {
      for(var i = 0; i < this.__model.getLength(); i++) {
        var item = this.__model.getItem(i);
        if(item.getIndex() == index) {
          return item;
        }
      }
      return null;
    },

    scrollToLine : function(idx) {
      if(idx === undefined)
        idx = -1;
      if(idx >= 0 && idx < this.__model.getLength()) {
        var sel = this.__list.getSelection();
        sel.removeAll();
        var it = this.__getItem(idx);
        if(it)
          sel.push(it);
      }
    },

    setLineValue : function(idx, v) {
      if(idx === undefined)
        idx = -1;
      if(idx >= 0 && idx < this.__model.getLength()) {
        this.__getItem(idx).setValue(v);
      }
    },

    markLine : function(idx, scrollTo) {
      if(idx === undefined)
        idx = -1;
      if(this.__currentMarkedLine != -1) {
        var it = this.__getItem(this.__currentMarkedLine);
        if(it)
          it.setMarked(false);
        this.__currentMarkedLine = -1;
      }
      if(idx >= 0 && idx < this.__model.getLength()) {
        var it = this.__getItem(idx);
        if(it) {
          it.setMarked(true);
          this.__currentMarkedLine = idx;
          if(scrollTo) {
            this.scrollToLine(idx);
          }
        }
      }
    },

    __getSlotValueFromKey : function(set, op, info, s, r) {
        var key = info.k[s];
        var it;
        if(key.a) {
          var arr = op[s] || [];
          for(var i = 0; i < arr.length; i++) {
            it = arr[i];
            if(typeof it == "number") {
              if(set)
                set[it] = true;
              r[it] = true;
            }
          }
        } else {
          it = op[s];
          if(typeof it == "number") {
            if(set)
              set[it] = true;
            r[it] = true;
          }
        }
    },

    __getSlotLenValue : function(o, op) {
      if(Array.isArray(o)) {
        var r = 0;
        for(var i = 0; i < o.length; i++) {
          r += this.__getSlotLenValue(o[i], op);
        }
        return r;
      } else 
      if(typeof o == 'string') {
        return (op[o] || []).length;
      }
      return 0;
    },

    __getSlotObjectValue : function(o, op, info) {
      var ty = typeof o;
      if(ty == 'number') {
        return o;
      } else
      if(ty == 'string') {
        return op[o];
      }
    },

    __getSlotValue : function(set, op, info, s, r) {
      var ty = typeof s;
      if(Array.isArray(s)) {
          for(var i = 0; i < s.length; i++) {
            this.__getSlotValue(set, op, info, s[i], r);
          }
      } else
      if(ty == 'object') {
        var min = 0;
        var max = 0;
        if(s.min) {
          min = this.__getSlotObjectValue(s.min, op, info);
        }
        if(s.ln) {
          max = min + this.__getSlotLenValue(s.ln, op);
        }
        for(var i = min; i < max; i++) {
          if(set)
            set[i] = true;
          r[i] = true;
        }
      } else 
      if(ty == 'string') {
        this.__getSlotValueFromKey(set, op, info, s, r);
      }
    },

    __getListValue : function(set, op, global, max) {
      var r = [];
      var info = this.__controller.getOperationInfo(op.o);
      if(info) {
        var s = info.s;
        var g;
        r.length = max;
        if(s) {
          if(s.i) {
            g = s.im && op[s.im] ? true : false;
            if(global == g) {
              this.__getSlotValue(set, op, info, s.i, r);
            }
          }
          if(s.o) {
            g = s.om && op[s.om] ? true : false;
            if(global == g) {
              this.__getSlotValue(set, op,info, s.o, r);
            }
          }
        }
      }
      return r;
    },

    update : function() {
      this.__header.update();
    },

    refresh : function(keepMark) {
      var mark = this.__currentMarkedLine;
      this.__currentMarkedLine = -1;
      var data = this.__parent.getData().ops;
      var chain = this.__parent.getOps();
      var model = this.__model = new qx.data.Array();
      this.__usedSlots = [];
      if(chain) {
        for(var i = 0; i < chain.length; i++) {
          if(!data[i]) {
            var v = this.__getListValue(this.__usedSlots, chain[i], !this.isLocal(), this.__parent.getMax());
            model.push(new appudo_cli_creator.view.desktop.VarSlotsListObject(i, v));
          }
        }
      }
      if(keepMark) {
        this.markLine(mark, true);
      }
      this.__list.setModel(model);
      var _this = this;
      setTimeout(function() {
        _this.fixScrollBar();
      })
    },

    fixScrollBar : function() {
      var sb = this.__list.getChildControl('scrollbar-y');
      if(sb) {
        var node = sb.getContentElement().getDomElement();
        var pnode = this.getContentElement().getDomElement();
        var bounds = this.getBounds();
        var bounds2 = sb.getBounds();
        if(node && pnode) {
          pnode.appendChild(node);
          sb.setHeight(bounds.height);
          sb.setDomPosition(bounds.width - bounds2.width, 20);
        }
      }
    }
  },

  construct : function(controller, parent, labelText, local)
  {
    var _this = this;
    this.base(arguments);
    this.setLayout(new qx.ui.layout.VBox());

    this.__controller = controller;
    this.__parent = parent;
    this.__local = local;

    this.__area = new qx.ui.container.Scroll;
    var holder = new qx.ui.container.Composite();
    holder.setLayout(new qx.ui.layout.VBox());

    var label = this.__label = new qx.ui.basic.Label(labelText);
    var header = this.__header = new appudo_cli_creator.view.desktop.VarSlotsListHeader(this);

    var decorator = this.__decorator = new qx.ui.decoration.Decorator();
    label.setDecorator(decorator.set({
      width : 1,
      widthTop : 0,
      style : "solid",
      color : "#334866"
    }));
    label.setAllowGrowX(true);
    label.setPaddingLeft(5);

    this.__list = new qx.ui.list.List();
    this.__area.add(holder);
    holder.add(header);
    holder.add(this.__list, {flex:1});
    this.add(this.__area, {flex:1});
    this.add(label);

    var sb = this.__list.getChildControl('scrollbar-y');
    this.addListener('resize', function() {
      setTimeout(function() {
        _this.fixScrollBar();
      })
    }, this);
    this.__list.addListener('createChildControl', function() {
      this.fixScrollBar();
    }, this);
    sb.addListener('appear', function() {
      this.fixScrollBar();
    }, this);

    decorator = new qx.ui.decoration.Decorator().set({
      width : 1,
      widthLeft:0,
      widthRight:0,
      style : "solid",
      color : "#334866"
    });
    this.__list.setDecorator(decorator);
    decorator = new qx.ui.decoration.Decorator().set({
      widthLeft:1,
      widthRight:1,
      style : "solid",
      color : "#334866"
    });
    this.__area.setDecorator(decorator);

    var delegate = {
      configureItem : function(item) {
      },
      createItem : function() {
        return new appudo_cli_creator.view.desktop.VarSlotsListItem(_this); 
      },
      bindItem : function(controller, item, id) {
        item.refresh();
        controller.bindProperty("marked", "marked", null, item, id);
        controller.bindProperty("value", "value", null, item, id);
        controller.bindProperty("index", "index", null, item, id);
      }
    };

    decorator = this.__decorator = new qx.ui.decoration.Decorator().set({
      widthRight : 1,
      widthBottom : 1,
      style : "solid",
      color : "#334866"
    });
    this.__itemDecorator = decorator;
    decorator = this.__decorator = new qx.ui.decoration.Decorator().set({
      widthRight : 1,
      widthBottom : 1,
      style : "solid",
      color : "#1971b7",
      backgroundColor : "background-selected"
    });
    this.__markedItemDecorator = decorator;

    this.__list.setDelegate(delegate);
    this.__list.setItemHeight(20);

    this.updateDecorator();
    this.setPadding(0);
    this.setMinHeight(100);
    
    this.refresh();
  }
});