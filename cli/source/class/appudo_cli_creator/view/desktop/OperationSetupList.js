/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.OperationSetupList",
{
  extend : qx.ui.list.List,
  
  members :
  {
    __controller : null,
    __currentData : null,
    __model : null,
    __typeKey : null,
    __readOnly : false,
    __parent : null,
    __currentDragIndex : -2,
    __dragIndicator : null,
    __currentDropPos : {index:-1, before:true},

    __getIndex : function(child) {
      return child.getIndex();
    },

    __isChild : function(child) {
      return child && "OperationSetupListItem" == child.basename && child.getList() == this;
    },

    __getItem : function(child) {
      while(child) {
          if("OperationSetupListItem" == child.basename)
              return child;
          child = child.getLayoutParent();
      }

      return null;
    },

    getValue : function() {
      return this.__currentData;
    },

    getParent : function() {
      return this.__parent;
    },

    setCurrentData : function(data) {
      this.__currentData = data;
    },

    getLastIndex : function() {
      return this.__model.getLength() - 1;
    },

    addListItem : function() {
      var data = this.__currentData;
      data.push(undefined);
      this.refresh();
      return this.__model.getItem(this.__model.getLength() - 1);
    },

    refresh : function() {
      var _this = this;
      this.__model = new qx.data.Array();
      var data = this.__currentData;

      if(Array.isArray(data)) {
        data.forEach(function(n, idx) {
          var rawtype = _this.__controller.getType(n);
          var txt = _this.__readOnly ? _this.__parent.getOpTextValue(n, _this.__typeKey, rawtype) : '' + n;
          _this.__model.push(new appudo_cli_creator.view.desktop.OperationSetupListObject(txt, rawtype, idx));
        });
      }
      this.setModel(this.__model);
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
      this.__controller.changedData(this.__parent.getParent(), false, {t:'OperationSetupItemMove'});
      this.refresh();
    }
  },
  
  construct : function(controller, parent, data, typeKey, readOnly)
  {
    var _this = this;
    this.base(arguments);
    this.setPadding(0);
    this.setLabelPath('label');
    this.setIconPath('icon');
    this.setItemHeight(28);
    this.setDraggable(true);
    this.setDroppable(true);
    this.__controller = controller;
    this.__currentData = data;
    this.__typeKey = typeKey;
    this.__readOnly = readOnly;
    this.__parent = parent;

    var delegate = {
      configureItem : function(item) {
      },
      createItem : function() {
        return new appudo_cli_creator.view.desktop.OperationSetupListItem(null, parent, 0, readOnly); 
      },
      bindItem : function(controller, item, id) {
        controller.bindProperty("index", "index", null, item, id);
        controller.bindProperty("value", "value", null, item, id);
        controller.bindPropertyReverse("value", "value", null, item, id);
        controller.bindProperty("rawType", "rawType", null, item, id);
        controller.bindPropertyReverse("rawType", "rawType", null, item, id);
      }
    };

    this.refresh();

    this.setDelegate(delegate);

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

    this.addListener("dragstart", function(e) {
      var item = this.__getItem(e.getOriginalTarget());

      if(!item) {
          e.preventDefault();
          return;
      }

      this.resetSelection();

      e.addType("OperationSetupList");
      e.addData("OperationSetupList", item);
      e.addAction("move");
      this.__currentDragIndex = this.__getIndex(item);
    }, this);

    this.addListener("dragend", this.onDragend, this);
    this.addListener("drag", this.onDrag, this);
    
    this.addListener("dragover", function(e) {
      if(!e.supportsType('OperationSetupList')) {
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
      if(e.supportsType('OperationSetupList'))
      {
        this.__move(this.__currentDragIndex, index, before);
      }
    }, this);
  }
});