/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlotsListObject",
{
  extend : qx.core.Object,

  construct : function(index, value)
  {
    this.base(arguments);

    if(value != null) {
      this.setValue(value);
    }

    this.setMarked(false);
    this.setIndex(!index ? 0 : index);
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
      check : "Array",
      event : "changeValue",
      nullable : true
    },

    marked : 
    {
      check : "Boolean",
      event : "changeMakred",
      nullable : false
    }
  }
});
