/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nTreeFile",
{
  extend : qx.ui.tree.TreeFile,

  members : {
    __index : -1,

    getIndex : function() {
      return this.__index;
    },

    _createChildControlImpl : function(id)
    {
      var control;
    
      switch(id)
      {
        case "check":
          control = new qx.ui.form.CheckBox();
          this._add(control);
          break;
      }
    
      return control || this.base(arguments, id);
    },   
    
    __getLabel: function(node) {
      var lbl = node.getLabel();
      if(typeof lbl != 'string') {
        lbl = lbl.getMessageId();
      }
      return lbl;
    }, 

    getPath : function() {
      var r = [];
      var p = this;
      while(p) {
        var l = this.__getLabel(p);
        r.push(l);

        p = p.getParent();
      }
      r.length--;
      return r.reverse();
    },

    setChecked : function(v) {
      var checkbox = this.getChildControl('check');
      checkbox.setValue(v);
    },

    __setActive : function(leaf, v) {
      leaf.setChecked(v);
      var p = leaf.getParent();
      var stop = false;
      while(p && !stop) {
        stop = true;
        var c = p.getActiveChildren();
        if(c == 0) {
          p.setChecked(true);
          stop = false;
        }
        c += (v ? 1 : -1);
        if(c == 0) {
          p.setChecked(false);
          stop = false;
        }
        p.setActiveChildren(c);
        p = p.getParent();
      }
    },

    addCheckListener : function(f, c) {
      var checkbox = this.getChildControl('check');
      return checkbox.addListener('changeValue', f, c);
    },

    removeCheckListener : function(v) {
      var checkbox = this.getChildControl('check');
      return checkbox.removeListenerById(v);
    }
  },

  construct : function(nodeKind, index, label, nodeData, kindData)
  {
    this.setAppearance('I18nTreeFile');
    this.base(arguments);
    this._createChildControl("check");

    this.__index = index !== undefined ? index : 0;

    if(label != null) {
      if(index !== undefined) {
        this.setLabel('[' + index + '] ' + label);
      } else {
        this.setLabel(label);
      }
    }

    if(nodeData != null) {
      nodeData.setTreeNode(this);
    }

    this.setNodeData(nodeData !== undefined ? nodeData : null);
    this.setNodeKind(nodeKind !== undefined ? nodeKind : null);
    this.setKindData(kindData !== undefined ? kindData : null);

    var checkbox = this.getChildControl('check');
    checkbox.setEnabled(true);

    checkbox.addListener('changeValue', function(e) {
      this.__setActive(this, e.getData());
    }, this);
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

    kindData :
    {
      event : "changeData",
      nullable : true
    }
  }
});
