/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.CommandTreeFolder",
{
  extend : qx.ui.tree.TreeFolder,

  construct : function(nodeKind, label, nodeData)
  {
    this.base(arguments);

    if(label != null) {
        this.setLabel(label);
    }

    this.setNodeData(nodeData !== undefined ? nodeData : null);
    this.setNodeKind(nodeKind !== undefined ? nodeKind : null);
  },

  properties :
  {
    nodeKind :
    {
      event : "changeKind"
    },

    nodeData :
    {
      event : "changeData",
      nullable : true
    }
  }
});
