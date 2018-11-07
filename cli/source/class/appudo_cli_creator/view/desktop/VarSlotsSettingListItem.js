/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsSettingListItem",
{
  extend : qx.ui.container.Composite,

  members : {
    __parent : null,
    __checkBox : null,
    __label : null,
    __model : null,
    __local : false,
    __index : -1,

    setModel : function(v) {
      this.__model = v;
    },

    setLocal : function(v) {
      this.__local = v;
    },

    getLocal : function() {
      return this.__local;
    },

    setValue : function(v) {
      this.__label.setLabel(v);
    },

    setIcon : function(v) {
      this.__label.setIcon(v);
    },

    setIndex : function(v) {
      this.__index = v;
    },

    getIndex : function() {
      return this.__index;
    },

    setChecked : function(v) {
      this.__checkBox.setValue(v);
    },

    getChecked : function() {
      return this.__checkBox.getValue();
    }
  },

  construct : function(parent)
  {
    this.__parent = parent;
    this.base(arguments);
    this.setLayout(new qx.ui.layout.HBox().set({alignY:'middle'}));

    this.__checkBox = new qx.ui.form.CheckBox();
    this.__label = new qx.ui.form.ListItem();

    this.__checkBox.addListener('changeValue', function(e) {
      this.__parent.onChangeValue(this, e.getData());
    }, this);

    this.add(this.__label);
    this.add(this.__checkBox);
  }
});