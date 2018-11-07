/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationChainItem",
{
  extend : qx.ui.form.ListItem,

  construct : function(label, icon, nodeData)
  {
    this.base(arguments, label, icon);

    this.setNodeData(nodeData !== undefined ? nodeData : null);
  },

  properties :
  {
    nodeData :
    {
      event : "changeNodeData",
      nullable : true
    }
  }
});
