/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationSetup",
{
  extend : qx.ui.container.Composite,
  members :
  {
    __controller : null,
    __currentLbl : null,
    __addBtn : null,
    __remBtn : null,
    __addDlg : null,
    __readOnly : false,
    __currentOp : null,
    __scroller : null,
    __theRows : null,

    getController : function() {
      return this.__controller;
    },

    update : function(op, text) {
      this.removeAll();
      var op_info;
      if(!op || !(op_info = this.__controller.getOperationInfo(op.o))) {
        this.clear();
        return;
      }

      this.__currentOp = op;
      this.__currentLbl.setToolTipText(op_info.d || "");
      this.__currentLbl.setValue(text);
      this.refresh();
    },

    updateMode : function(readOnly) {
      if(this.__readOnly != readOnly) {
        this.__readOnly = readOnly;
        this.refresh();
      }
    },
    
    refresh : function() {
      var _this = this;
      this.__theRows = null;
      this.removeAll();
      var readOnly = this.__readOnly;
      var op = this.__currentOp;
      var types = this.__controller.getOperationTypes();
      var op_info;
      if(!op || !types || !(op_info = this.__controller.getOperationInfo(op.o)))
        return;
      this.__scroller = new qx.ui.container.Scroll();
      var base = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      var keys = op_info.k || {};

      var add_items = function(sub, keys) {
        var items = sub ? [] : null;
        var pn = Object.getOwnPropertyNames(keys);
        for(var i = 0; i < pn.length; i++) {
          var row = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
          var name = pn[i];
          var item = new appudo_cli_creator.view.desktop.OperationSetupItem(_this, op, sub ? [sub, name] : name, keys, readOnly);
          row.add(item, item.isList() ? {flex:1} : null);
          base.add(row, {flex:1});
          if(sub) 
            items.push(item);
          if(!sub && keys[name].k) {
            var items = add_items(name, keys[name].k);
            item.setGroupItems(items);
          }
        }
        return items;
      }
      add_items(null, keys, op_info);


      base.setPadding(5);
      this.__scroller.add(base, {flex:1});
      this.add(this.__scroller, {flex:1});

      base.addListenerOnce('appear', this.__reflow, this);
    },

    clear : function() {
      this.removeAll();
      this.__theRows = null;
      this.__scroller = null;
      this.__currentOp = null;
      this.__currentLbl.resetToolTipText();
      this.__currentLbl.resetValue();
    },

    __calcReflow : function(rows, maxHeight, maxWidth) {
      var pos = 0;
      while(true) {
        if(rows.length <= 0 || pos >= rows.length)
          return;

        var width = 0;
        for(var i = 0; i < rows.length; i++) {
          if(!rows[i].isDeleted)
            width += rows[i].getWidth();
        }
        if(width <= maxWidth)
          return;
          
        var findRow = function(startIdx, prevHeight, second) {
          for(var i = startIdx; i < rows.length; i++) {
            if(rows[i].hasList) {
              if(second)
                return null;
              continue;
            }
            if(!rows[i].isDeleted) {
              if(prevHeight + rows[i].getHeight() > maxHeight)
                return null;
              return rows[i];
            }
          }
          return null;
        }
        var first = findRow(pos, 0);
        if(!first)
          return;
        var second = findRow(first.idx + 1, first.getHeight(), true);
        if(!second) {
          pos = first.idx + 1;
          continue;
        }
        first.children = first.children.concat(second.children);
        second.isDeleted = true;
        second.children = null;
        first.realHeight += second.realHeight;
        if(second.realWidth > first.realWidth)
          first.realWidth = second.realWidth;
      }
    },

    __reflow : function(noWidthCheck) {
      var _this = this;
      if(!this.__scroller)
        return;
      var base = this.__scroller.getChildren()[0];
      var sb = this.__scroller.getBounds();
      var bb = base.getBounds();
      var height = bb.height;
      var width = bb.width;
      if((sb.width != bb.width || sb.height != bb.height) || noWidthCheck) {
        var rows = this.__theRows;
        if(rows == null) {
          rows = this.__theRows = [];
          var c = base.getChildren();
          c.forEach(function(row, n) {
            var theRow = {idx:n, obj:row, children:[], getHeight:function() {
              return this.realHeight + ((this.children.length || 1) + 1) * 5;
            }, getWidth:function() {
              return this.realWidth + 5;
            }, realHeight:0, realWidth:0, hasList:false};
            rows.push(theRow);
            var items = row.getChildren();
            items.forEach(function(item) {
              var ib = item.getBox();
              if(ib.width > theRow.realWidth)
                theRow.realWidth = ib.width;
              theRow.realHeight += ib.height;
              if(item.isList())
                theRow.hasList = true;
              theRow.children.push({obj:item, width:ib.width, height:ib.height});
            });
          });
        } 
        rows = [];
        rows.length = this.__theRows.length;
        for(var i = 0; i < rows.length; i++) {
          rows[i] = Object.assign({}, this.__theRows[i]);
        }
        this.__calcReflow(rows, sb.height, sb.width);
        this.removeAll();
        this.__scroller = new qx.ui.container.Scroll();
        var base = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
        base.setPadding(5);
        this.__scroller.add(base, {flex:1});

        rows.forEach(function(it) {
          if(!it.isDeleted) {
            var row = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

            it.children.forEach(function(iit) {
              var itm = iit.obj;
              row.add(itm, itm.isList() ? {flex:1} : null);
            });
            base.add(row, {flex:1});
          }
        });

        this.add(this.__scroller, {flex:1});
      }
    },

    __getFoxusWidget : function() {
      var w = qx.ui.core.FocusHandler.getInstance().getFocusedWidget();
      var isTxt = w.classname == 'qx.ui.form.TextField' ? 1 : 0;
      var isListTxt = w.getLayoutParent().classname == 'appudo_cli_creator.view.desktop.OperationSetupListItem' ? 1 : 0;
      var isList = w.classname == 'appudo_cli_creator.view.desktop.OperationSetupList' ? 1 : 0;
      return {w:w, t:isListTxt | isTxt << 1 | isList << 2};
    },

    onAdd : function() {
      var fw = this.__getFoxusWidget();
      this.__addDlg.openAndCenter(fw.w, fw.t);
    },

    onDelete : function() {
      var fw = this.__getFoxusWidget();
      if((fw.t & 1) != 0) {
        var litem = fw.w.getLayoutParent();
        var d = litem.getData();
        var idx = litem.getIndex();
        var sitem = litem.getParent();
        d.splice(idx, 1);
        this.__controller.changedData(this);
        sitem.refresh();
      }
    },

    onListFocus : function(focusin) {
      if(focusin) {
        var fw = this.__getFoxusWidget();
        this.__addBtn.setEnabled((fw.t & 7) != 0);
        this.__remBtn.setEnabled((fw.t & 1) != 0);
      } else {
        this.__addBtn.setEnabled(false);
        this.__remBtn.setEnabled(false);
      }
    },

    __onResize : function() {
      this.__reflow(true);
    },
    
    __onDataChange : function(full) {
      this.clear();
      // TODO try to get command selection and redo
    }
  },
  construct : function(controller, label, addBtn, remBtn)
  {
    var _this = this;
    this.base(arguments);
    this.setLayout(new qx.ui.layout.HBox(5));
    this.setPadding(0);

    var decorator = new qx.ui.decoration.Decorator().set({
      width : 1,
      style : "solid",
      color: "#334866"
    });

    this.addListenerOnce('appear', function() {
      qx.event.Registration.addListener(this.getContentElement().getDomElement(), "focusin", function() {
        this.onListFocus(true);
      }, this);
  
      qx.event.Registration.addListener(this.getContentElement().getDomElement(), "focusout", function() {
        this.onListFocus();
      }, this);
    }, this);

    addBtn.addListener('execute', this.onAdd, this);
    remBtn.addListener('execute', this.onDelete, this);
    this.__addDlg = new appudo_cli_creator.view.desktop.OperationSetupAddDialog(controller);

    this.setDecorator(decorator);

    this.__controller = controller;
    this.__currentLbl = label;
    this.__addBtn = addBtn;
    this.__remBtn = remBtn;
    addBtn.setEnabled(false);
    remBtn.setEnabled(false);

    this.__controller.addReset(function() {
      _this.clear.call(_this);
    });

    this.__controller.addDataChanged(function(from, full) {
      if(from != _this) {
        _this.__onDataChange.call(_this, full);
      }
    });

    this.__controller.addCommandChanged(function(from, cmd, text) {
      _this.update.call(_this);
    });
    
    this.addListener('resize', this.__onResize, this);
  }
});