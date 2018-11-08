/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationSetupListObject",
{
  extend : qx.core.Object,

  construct : function(label, type, index)
  {
    this.base(arguments);

    if(label != null) {
      this.setValue(label);
    }

    this.setRawType(type !== undefined && type !== null ? type : 0);
    
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
    
    rawType :
    {
      check : "Integer",
      event : "changeRawType",
      nullable : false
    }
  }
});
