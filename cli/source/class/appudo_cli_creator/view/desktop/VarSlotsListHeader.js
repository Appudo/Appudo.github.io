/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsListHeader",
{
  extend : qx.ui.form.List,

  members : {
    __parent : null,
    
    getParent : function() {
      return this.__parent;
    },

    update : function() {
        var decorator = this.__decorator = new qx.ui.decoration.Decorator().set({
            widthRight : 1,
            style : "solid",
            color : "#334866"
          });
        var list = this.__parent;
        var slots = list.getParent();
        var check = list.isLocal() ? slots.getData().local : slots.getData().global;
        this.removeAll();
        var num = 0;
        for(var i = 0; i < slots.getMax(); i++) {
          if(!check[i]) {
              var item = new qx.ui.form.ListItem('' + i);
              item.setHeight(10);
              item.setWidth(25);
              item.setPadding(0);
              item.setPaddingLeft(3);
              item.setPaddingRight(3);
              item.setDecorator(decorator);
              item.setCenter(true);
              this.add(item);
          }
        }
        var item = new qx.ui.form.ListItem('');
        item.setHeight(10);
        item.setWidth(25);
        item.setPadding(0);
        item.setPaddingLeft(3);
        item.setPaddingRight(3);
        item.setDecorator(decorator);
        this.add(item);

        var pane = this.getChildControl('pane');
        var child = pane.getChildren()[0];
        this.setWidth(child.getWidth());
    }
  },

  construct : function(parent)
  {
    this.base(arguments);

    this.__parent = parent;

    this.setPadding(0);
    this.setHeight(20);
    this.setOrientation('horizontal');
    this.setAllowGrowX(true);
    this.setAllowStretchX(true);
    this.setAllowShrinkX(false);

    var decorator = new qx.ui.decoration.Decorator();
    this.setDecorator(decorator.set({
      widthTop : 1,
      style : "solid",
      color : "#334866"
    }));
    
    this.update();

    this.addListener('mouseup', function(e) {
      this.resetSelection();
    }, this);
  }
});