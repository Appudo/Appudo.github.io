/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nMultiListItem",
{
  extend : qx.ui.container.Composite,

  members : {
      __parent : null,
      __valueHolder : null,  

      getData : function() {
        return this.__parent.getData();
      },

      getList : function() {
        return this.__parent.getValueHolder();
      },
      
      getParent : function() {
        return this.__parent;
      }
  },

  construct : function(value, parent)
  {
    this.__parent = parent;
    this.base(arguments);
    this.setLayout(new qx.ui.layout.HBox().set({alignY:'bottom'}));
    this.__valueHolder = new qx.ui.basic.Label();
    this.add(this.__valueHolder, {flex:1});
    this.setPadding(0);
    this.__valueHolder.setHeight(26);
    this.__valueHolder.setPadding(4);

    this.bind("value", this.__valueHolder, "value");

    if(value != null) {
      this.setValue(value);
    }
  },

  properties :
  {
    value :
    {
      check : "String",
      event : "changeValue",
      nullable : true
    }
  }
});
