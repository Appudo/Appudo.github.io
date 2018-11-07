/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsListItem",
{
  extend : qx.ui.container.Composite,

  members : {
    __parent : null,
    __numItems : -1,
    __index : -1,
    __map : [],

    setIndex : function(v) {
      this.__index = v;
    },

    getIndex : function() {
      return this.__index;
    },

    refresh : function() {
      this.__render();
    },

    __render : function() {
      var list = this.__parent;
      var slots = list.getParent();
      var max = slots.getMax();
      var data = list.isLocal() ? slots.getData().local : slots.getData().global;
      var num = 0;
      this.__map = [];
      for(var i = 0; i < max; i++) {
        if(!data[i]) {
          this.__map[i] = num;
          num++;
        } else {
          this.__map[i] = -1;
        }
      }
      if(this.__numItems != num) {
        this.__numItems = num;
        this.removeAll();
        for(var i = 0; i < max; i++) {
          if(!data[i]) {
            var item = new qx.ui.basic.Label();
            item.setHeight(20);
            item.setWidth(25);
            item.setPadding(0);
            item.setPaddingLeft(3);
            item.setPaddingRight(3);
            item.setDecorator(this.__parent.getItemDecorator());
            item.setTextAlign('center');
            this.add(item);
          }
        }
        this.setWidth(25*max);
        this.setMinWidth(25*max);
      }
    },

    setMarked : function(v) {
      var c = this.getChildren();
      for(var i = 0; i < c.length; i++) {
        c[i].setDecorator(v ? this.__parent.getMarkedItemDecorator() : this.__parent.getItemDecorator());
        c[i].setTextColor(v ? "text-selected" : "text-label");
      }
    },

    setValue : function(v) {
      var list = this.__parent;
      var slots = list.getParent();
      var max = slots.getMax();
      var c = this.getChildren();
      for(var i = 0; i < max; i++) {
        var ridx = this.__map[i];
        if(ridx != -1) {
          if(v && v[i]) {
            c[ridx].setValue('x');
          } else {
            c[ridx].resetValue();
          }
        }
      }
    }
  },

  construct : function(parent)
  {
    this.__parent = parent;
    this.base(arguments);
    this.setLayout(new qx.ui.layout.HBox().set({alignY:'middle'}));

    this.setHeight(20);

    this.addListener('click', function() {
      this.__parent.selectItem(this);
    }, this);
  }
});