/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationListItem",
{
  extend : qx.core.Object,

  construct : function(label, icon, nodeData)
  {
    this.base(arguments);

    if(label != null) {
      this.setLabel(label);
    }

    if(icon != null) {
      this.setIcon(icon);
    }

    this.setNodeData(nodeData !== undefined ? nodeData : null);
  },

  properties :
  {
    nodeData :
    {
      event : "changeNodeData",
      nullable : true
    },

    label :
    {
      check : "String",
      event : "changeLabel",
      nullable : true
    },

    icon :
    {
      check : "String",
      event : "changeIcon",
      nullable : true
    }
  }
});
