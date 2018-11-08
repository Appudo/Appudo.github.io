/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.I18nValueList",
{
  extend : qx.ui.container.Composite,
  implement: [qx.ui.form.IForm, qx.ui.core.ISingleSelection],

  events :
  {
    changeValid : "qx.event.type.Data",
    changeInvalidMessage : "qx.event.type.Data",
    changeRequired : "qx.event.type.Data",
    changeSelection : "qx.event.type.Data"
  },

  members :
  {
    __controller : null,
    __currentData : null,
    __currentDataHolder : null,
    __list : null,
    __model : null,
    __parent : null,
    __currentDragIndex : -2,
    __dragIndicator : null,
    __currentDropPos : {index:-1, before:true},
    __selectedItem : null,
    __itemDecorator : null,
    __markedItemDecorator : null,
    __remBtn : null,
    
    setSelection : function(v) {
      this.__list.setSelection(v);
    },

    getSelection : function() {
        return this.__list.getSelection();
    },    

    resetSelection : function() {
      this.__list.resetSelection();
    },    

    isSelectionEmpty : function() {
      this.__list.isSelectionEmpty();
    },

    getSelectables : function(all) {
      this.__list.getSelectables(all);
    },

    isSelected : function(v) {
      this.__list.isSelected(v);
    },

    setRequired : function(v) {

    },

    getRequired : function() {
        return false;
    },    
    
    setValid : function(v) {

    },

    getValid : function() {
        return false;
    }, 

    isValid : function() {
        return true;
    }, 
    
    setInvalidMessage : function(v) {

    },

    getInvalidMessage : function() {
        return false;
    }, 
    
    setRequiredInvalidMessage : function(v) {

    },

    getRequiredInvalidMessage : function() {
        return false;
    }, 
    
    __getIndex : function(child) {
      return child.getIndex();
    },

    __isChild : function(child) {
      return child && "I18nValueListItem" == child.basename && child.getList() == this;
    },

    __getItem : function(child) {
      while(child) {
          if("I18nValueListItem" == child.basename)
              return child;
          child = child.getLayoutParent();
      }

      return null;
    },    
    
    getItemDecorator : function() {
      return this.__itemDecorator;
    },

    getMarkedItemDecorator : function() {
      return this.__markedItemDecorator;
    },

    selectItem : function(item) {
      if(this.__selectedItem) {
        this.__selectedItem.unselect();
        this.__selectedItem = null;
      }
      if(item) {
        this.__selectedItem = item;
        item.select();
        this.__remBtn.setEnabled(true);
      } else {
        this.__remBtn.setEnabled(false);
      }
    },

    getValue : function() {
      return this.__currentData;
    },

    getParent : function() {
      return this.__parent;
    },

    getList : function() {
      return this;
    },

    getData : function() {
      return this.__currentData;
    },

    setCurrentDataHolder : function(data) {
      this.__currentDataHolder = data;
      this.__currentData = data.v;
    },

    setCurrentData : function(data) {
      this.__currentData = data;
    },

    addListItem : function() {
      var data = this.__currentData;
      data.push(undefined);
      this.__parent.changedI18nData();
      this.refresh();
      return this.__model.getItem(this.__model.getLength() - 1);
    },

    getLastIndex : function() {
      return this.__model.getLength() - 1;
    },

    updateItem : function(index, v, c) {
      var cv = this.__currentData[index];

      if(!c) {
          v = parseInt(v);
      }

      if(cv !== v) {
        this.__currentData[index] = v;
        this.__parent.changedI18nData();
      }
    },

    refresh : function() {
      var _this = this;
      this.__model = new qx.data.Array();
      var data = this.__currentData;
      this.selectItem();

      if(Array.isArray(data)) {
        data.forEach(function(n, idx) {
          var rawValue = typeof n == 'string';
          _this.__model.push(new appudo_cli_creator.view.desktop.I18nValueListObject('' + n, rawValue, idx));
        });
      }
      this.__list.setModel(this.__model);
    },

    canDrop : function(target, before) {
      var index = this.__getIndex(target);
      var tindex = index - this.__currentDragIndex;
      this.__currentDropPos.index = index;
      this.__currentDropPos.before = before;
      return !(tindex == 0 || (tindex == -1 && !before) || (tindex == 1 && before));
    },

    onDrag : function(e) {
      var target = e.getOriginalTarget();

      var child = this.__getItem(target);

      if(child && this.__isChild(child)) {
        var origCoords = child.getContentLocation();
        var bounds = child.getBounds();
        var height = bounds.height;
        var top = e.getDocumentTop();
        var before = top - origCoords.top < (height / 2);
        var targetTop = before ? origCoords.top : origCoords.top + height;

        if(this.canDrop(child, before)) {
          e.setDropAllowed(true);
          this.__dragIndicator.setWidth(bounds.width);
          this.__dragIndicator.setDomPosition(origCoords.left, targetTop);
          return;
        }
      }

      this.__dragIndicator.setWidth(0);
      e.setDropAllowed(false);
    },

    onDragend : function(e) {
      this.__currentDropPos = {index:-1, before:true};
      this.__currentDragIndex = -2;
      this.__dragIndicator.setDomPosition(-1000, -1000);
    },    
    
    __move : function(from_index, to_index, before) {
      to_index += !before;
      var item_data = this.__currentData.splice(from_index, 1)[0];
      if(to_index >= from_index)
        to_index--;
      this.__currentData.splice(to_index, 0, item_data);
      this.__parent.changedI18nData();
      this.refresh();
    }
  },
  
  construct : function(controller, parent, data)
  {
    var _this = this;
    this.base(arguments);
    this.setPadding(0);
    this.setLayout(new qx.ui.layout.HBox(5));
    this.__controller = controller;
    this.__currentData = data;
    this.__parent = parent;
    this.__list = new qx.ui.list.List();

    var delegate = {
      configureItem : function(item) {
      },
      createItem : function() {
        return new appudo_cli_creator.view.desktop.I18nValueListItem(null, _this); 
      },
      bindItem : function(controller, item, id) {
        controller.bindProperty("index", "index", null, item, id);
        controller.bindProperty("value", "value", null, item, id);
        controller.bindPropertyReverse("value", "value", null, item, id);
        controller.bindProperty("rawValue", "rawValue", null, item, id);
      }
    };

    this.__list.setPadding(0);
    this.__list.setDelegate(delegate);
    this.__list.setLabelPath('label');
    this.__list.setIconPath('icon');
    this.__list.setItemHeight(28);
    this.__list.setDraggable(true);
    this.__list.setDroppable(true);
    this.add(this.__list, {flex:1});

    this.__dragIndicator = new qx.ui.core.Widget();
    var decorator = new qx.ui.decoration.Decorator();
    this.__dragIndicator.setDecorator(decorator.set({
        widthTop : 2,
        styleTop : "solid",
        colorTop : "black"
    }));
    this.__dragIndicator.setHeight(4);
    this.__dragIndicator.setWidth(0);
    this.__dragIndicator.setOpacity(0.5);
    this.__dragIndicator.setZIndex(9999);
    this.__dragIndicator.setLayoutProperties({
        left : -1000,
        top : -1000
    });
    qx.core.Init.getApplication().getRoot().add(this.__dragIndicator);

    this.__list.addListener("dragstart", function(e) {
      var item = this.__getItem(e.getOriginalTarget());

      if(!item) {
          e.preventDefault();
          return;
      }

      this.resetSelection();

      e.addType("I18nValueList");
      e.addData("I18nValueList", item);
      e.addAction("move");
      this.__currentDragIndex = this.__getIndex(item);
    }, this);

    this.__list.addListener("dragend", this.onDragend, this);
    this.__list.addListener("drag", this.onDrag, this);
    
    this.__list.addListener("dragover", function(e) {
      if(!e.supportsType('I18nValueList')) {
        e.preventDefault();
      }
    }, this);

    this.__list.addListener("drop", function(e) {
      var index = this.__currentDropPos.index;
      var before = this.__currentDropPos.before;
      if(index == -1) {
        var l = this.getChildren().length;
        index = l == 0 ? 0 : l - 1;
        before = l == 0;
      }
      if(e.supportsType('I18nValueList'))
      {
        this.__move(this.__currentDragIndex, index, before);
      }
    }, this);

    var holder0 = new qx.ui.container.Composite();
    holder0.setLayout(new qx.ui.layout.VBox(5).set({
      alignX : "right"
    }));
    this.add(holder0);
    var addBtn = new qx.ui.toolbar.Button(null, "icon/22/actions/list-add.png");
    this.__remBtn = new qx.ui.toolbar.Button(null, "icon/22/places/user-trash.png");
    addBtn.setToolTipText(this.tr('Add Value'));
    this.__remBtn.setToolTipText(this.tr('Remove Value'));
    holder0.add(addBtn);
    holder0.add(this.__remBtn);
    this.__remBtn.setEnabled(false);

    addBtn.addListener('execute', function(e) {
      if(!this.__currentData) {
        this.__currentData = this.__currentDataHolder.v = [];
      }
      this.addListItem();
      var idx = this.getLastIndex();
      this.updateItem(idx, undefined, false);
    }, this);
    this.__remBtn.addListener('execute', function(e) {
      if(this.__selectedItem) {
        var idx = this.__selectedItem.getIndex();
        this.__currentData.splice(idx, 1);
        if(this.__currentData.length == 0) {
          delete this.__currentDataHolder.v;
          this.__currentData = null;
        }
        this.__parent.changedI18nData();
        this.refresh();
      }
    }, this);

    var decorator = this.__decorator = new qx.ui.decoration.Decorator().set({
    });
    this.__itemDecorator = decorator;
    decorator = this.__decorator = new qx.ui.decoration.Decorator().set({
      backgroundColor : "background-selected"
    });
    this.__markedItemDecorator = decorator;

    this.refresh();
  }
});