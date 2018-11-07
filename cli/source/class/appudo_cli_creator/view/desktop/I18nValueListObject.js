/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nValueListObject",
{
  extend : qx.core.Object,

  construct : function(label, rawValue, index)
  {
    this.base(arguments);

    if(label != null) {
      this.setValue(label);
    }

    this.setRawValue(!rawValue ? false : true);
    this.setIndex(index);
  },

  properties :
  {
    index :
    {
      check : "Integer",
      event : "changeIndex",
      nullable : false
    },

    value :
    {
      check : "String",
      event : "changeValue",
      nullable : true
    },
    
    rawValue :
    {
      check : "Boolean",
      event : "changeRawValue",
      nullable : false
    }
  }
});
