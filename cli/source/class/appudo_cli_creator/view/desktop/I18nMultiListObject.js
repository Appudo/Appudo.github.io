/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nMultiListObject",
{
  extend : qx.core.Object,

  construct : function(label)
  {
    this.base(arguments);

    if(label != null) {
      this.setValue(label);
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
