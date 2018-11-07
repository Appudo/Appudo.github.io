/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationChain",
{
  extend : qx.ui.form.List,
  members :
  {
    __controller : null,
    __currentChain : null,
    __currentLabel : null,
    __operationSetup : null,
    __varSlots : null,
    __remDlg : null,
    __currentDragIndex : -2,
    __dragIndicator : null,
    __currentDropPos : {index:-1, before:true},

    __getIndex : function(child) {
      return (this.getChildren() || []).indexOf(child);
    },

    __isChild : function(child) {
      return child && "OperationChainItem" == child.basename;
    },

    __getItem : function(child) {
      while(child) {
          if("OperationChainItem" == child.basename)
              return child;
          child = child.getLayoutParent();
      }

      return null;
    },

    __render : function(chain) {
      this.__currentChain = chain;
      for(var i = 0; i < chain.length; i++) {
        var op = chain[i];
        var info = this.__controller.getOperationInfo(op.o) || {n:'undefined'};
        this.add(new appudo_cli_creator.view.desktop.OperationChainItem(info.n, "icon/22/apps/utilities-system-monitor.png", op));
      }
    },

    update : function(cmd, text) {
      this.clear();
      if(cmd) {
        if(cmd.o) {
          this.__currentLabel.setValue(text);
          this.__render(cmd.o);
        } else
        if(Array.isArray(cmd)) {
          this.__currentLabel.setValue(text);
          this.__render(cmd);
        }
      }
    },

    clear : function(after) {
      this.removeAll();
      this.__currentChain = null;
      this.__currentLabel.resetValue();
    },

    onSelect : function(e) {
      var selection = e.getData();
      var data;
      if(selection.length && (data = selection[0].getNodeData())) {
        var n = selection[0];
        var t = '[' + n.getLabel() + ' (' + data.o + ')' + ']';
       
        this.__operationSetup.update(data, t);
        this.__varSlots.onSelect(data, this.__getIndex(n));
      }
    },

    removeSelected : function() {
      this.__doRemove();
    },

    __doRemove : function() {
      var selection = this.getSelection();
      var item = selection[0];
      var data = item.getNodeData();
      var index = this.__currentChain.indexOf(data);
      this.remove(item);
      this.__currentChain.splice(index, 1);
      this.__controller.changedData(null, false, {index:index, t:'OperationChainRemove'});
    },

    onRemove : function() {
      var selection = this.getSelection();
      var item;
      if(selection.length) {
        item = selection[0];
      }
      this.__remDlg.openAndCenter(item.getLabel());
    },

    canDrop : function(target, before) {
      var index = this.__getIndex(target);
      var tindex = index - this.__currentDragIndex;
      this.__currentDropPos.index = index;
      this.__currentDropPos.before = before;
      return this.__currentChain != null && !(tindex == 0 || (tindex == -1 && !before) || (tindex == 1 && before));
    },

    onDrag : function(e) {
      var target = e.getOriginalTarget();

      if(target && this.__isChild(target)) {
        var origCoords = target.getContentLocation();
        var bounds = target.getBounds();
        var width = bounds.width;
        var left = e.getDocumentLeft();
        var before = left - origCoords.left < (width / 2);
        var targetLeft = before ? origCoords.left : origCoords.left + width;

        if(!this.canDrop(target, before)) {
          this.__dragIndicator.setHeight(0);
          return;
        }

        this.__dragIndicator.setHeight(bounds.height);
        this.__dragIndicator.setDomPosition(targetLeft, origCoords.top);
      }
    },

    onDragend : function(e) {
      this.__currentDropPos = {index:-1, before:true};
      this.__currentDragIndex = -2;
      this.__dragIndicator.setDomPosition(-1000, -1000);
    },

    selectIndex : function(index) {
      this.__doSelect(index);
    },

    __doSelect : function(index) {
      var children = this.getChildren();
      var child = children[index];
      if(child)
        this.setSelection([children[index]]);
    },

    __insert : function(data, index, before) {
      this.__controller.modifyData();
      index += !before;
      var rdata = {"o":data.i};
      if(data.k) {
        var keys = data.k;
        var pn = Object.getOwnPropertyNames(keys);
        for(var i = 0; i < pn.length; i++) {
          var n = pn[i];
          if(keys[n].m) {
            rdata[n] = keys[n].a ? [] : -1;
          }
        }
      }
      this.__currentChain.splice(index, 0, rdata);
      this.__controller.changedData(this, false, {index:index, t:'OperationChainAdd'});
      this.update(this.__currentChain, this.__currentLabel.getValue());
      this.__doSelect(index);
    },

    __move : function(from_index, to_index, before) {
      to_index += !before;
      var item_data = this.__currentChain.splice(from_index, 1)[0];
      if(to_index >= from_index)
        to_index--;
      this.__currentChain.splice(to_index, 0, item_data);
      this.__controller.changedData(this, false, {findex:from_index, tindex:to_index, t:'OperationChainMove'});
      this.update(this.__currentChain, this.__currentLabel.getValue());
      this.__doSelect(to_index);
    },  

    __onDataChange : function(full) {
      if(full) {
        this.clear();
      }
    }
  },

  construct : function(controller, label, setup, slots)
  {
    var _this = this;
    this.base(arguments);
    this.setPadding(0);
    this.setDraggable(true);
    this.setDroppable(true);
    this.setOrientation('horizontal');
    this.__controller = controller;
    this.__currentLabel = label;
    this.__operationSetup = setup;
    this.__varSlots = slots;
    slots.setChain(this);

    this.__remDlg = new appudo_cli_creator.view.desktop.OperationChainListRemDialog(controller, this);

    this.__dragIndicator = new qx.ui.core.Widget();
    var decorator = new qx.ui.decoration.Decorator();
    this.__dragIndicator.setDecorator(decorator.set({
        widthLeft : 1,
        styleLeft : "solid",
        colorLeft : "black"
    }));
    this.__dragIndicator.setHeight(0);
    this.__dragIndicator.setWidth(1);
    this.__dragIndicator.setOpacity(0.5);
    this.__dragIndicator.setZIndex(100);
    this.__dragIndicator.setLayoutProperties({
        left : -1000,
        top : -1000
    });
    qx.core.Init.getApplication().getRoot().add(this.__dragIndicator);

    this.addListener("dragstart", function(e) {
      var item = this.__getItem(e.getOriginalTarget());

      if(!item) {
          e.preventDefault();
          return;
      }

      this.resetSelection();

      e.addType("OperationChain");
      e.addData("OperationChain", item);
      e.addAction("move");
      this.__currentDragIndex = this.__getIndex(item);
    }, this);

    this.addListener("dragend", this.onDragend, this);
    this.addListener("drag", this.onDrag, this);
    
    this.addListener("dragover", function(e) {
      if(this.__currentChain == null || (!e.supportsType('OperationChain') && !e.supportsType('OperationList'))) {
        e.preventDefault();
      }
    }, this);

    this.addListener("drop", function(e) {
      var item;
      var index = this.__currentDropPos.index;
      var before = this.__currentDropPos.before;
      if(index == -1) {
        var l = this.getChildren().length;
        index = l == 0 ? 0 : l - 1;
        before = l == 0;
      }
      if(e.supportsType('OperationList'))
      {
        item = e.getData('OperationList');
        this.__insert(item.getNodeData(), index, before);
      }
      if(e.supportsType('OperationChain'))
      {
        item = e.getData('OperationChain');
        this.__move(this.__currentDragIndex, index, before);
      }
    }, this);

    this.addListener('changeSelection', this.onSelect, this);

    this.__controller.getOperationSelection = function() {
      var path = [];
      var sel = _this.getSelection();
      if(sel.length == 0)
        return null;
      sel = sel[0];
      return {index:_this.getChildren().indexOf(sel), label:sel.getLabel()};
    }

    this.__controller.setOperationSelection = function(v) {
      var children = _this.getChildren();
      var child;
      if(children.length > v.index && (child = children[v.index]).getLabel() == v.label) {
        _this.setSelection([child]);
      } else {
        for(var i = 0; i < children.length; i++) {
          child = children[i];
          if(child.getLabel() == v.label) {
            _this.setSelection([child]);
          }
        }
      }
    }

    this.__controller.addCommandChanged(function(from, cmd, text) {
      if(from != _this) {
        _this.update.call(_this, cmd, text);
      }
    });
    
    this.__controller.addReset(function() {
      _this.clear.call(_this);
    });

    this.__controller.addDataChanged(function(from, full) {
      if(from != _this) {
        _this.__onDataChange.call(_this, full);
      }
    });
  }
});