/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsSettingListObject",
{
  extend : qx.core.Object,

  construct : function(label, icon, index, checked, local)
  {
    this.base(arguments);

    if(label != null) {
      this.setValue(label);
    }

    if(icon != null) {
      this.setIcon(icon);
    }

    this.setChecked(!checked ? false : true);
    this.setLocal(!local ? false : true);
    this.setIndex(!index ? 0 : index);
  },

  properties :
  {
    value :
    {
      check : "String",
      event : "changeValue",
      nullable : true
    },

    icon :
    {
      check : "String",
      event : "changeIcon",
      nullable : true
    },

    checked : 
    {
      check : "Boolean",
      event : "changeChecked",
      nullable : false
    },

    local : 
    {
      check : "Boolean",
      event : "changeLocal",
      nullable : false
    },

    index : 
    {
      check : "Integer",
      event : "changeIndex",
      nullable : false
    }
  }
});
