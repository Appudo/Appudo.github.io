/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nTreeFolder",
{
  extend : qx.ui.tree.TreeFolder,

  members : {
    __index : -1,

    getIndex : function() {
      return this.__index;
    },

    _createChildControlImpl : function(id, hash)
    {
      var control;
      switch(id)
      {
        case "check":
          control = new qx.ui.form.CheckBox();
          this._add(control);
          break;
      }
    
      return control || this.base(arguments, id, hash);
    },

    setChecked : function(v) {
      var checkbox = this.getChildControl('check');
      checkbox.setValue(v);
    },

    removeAll : function() {
      this.base(arguments);
      this.setChecked(false);
      this.setActiveChildren(0);
    }
  },

  construct : function(nodeKind, index, label, nodeData)
  {
    this.setAppearance('I18nTreeFolder');
    this.base(arguments);
    this._createChildControl("check");
    this.__index = index;

    if(label != null) {
        this.setLabel(label);
    }

    this.setNodeData(nodeData !== undefined ? nodeData : null);
    this.setNodeKind(nodeKind !== undefined ? nodeKind : null);

    this.setActiveChildren(0);

    var checkbox = this.getChildControl('check');
    checkbox.setEnabled(false);
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
    },

    activeChildren :
    {
      check : "Integer",
      event : "changeActiveChildren",
      nullable : false
    }
  }
});
