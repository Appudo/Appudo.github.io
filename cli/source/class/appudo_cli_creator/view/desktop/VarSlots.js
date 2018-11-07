/* ************************************************************************

   APPUDO CLI Creator

   https://www.appudo.com

   Copyright: 2018 Appudo UG (haftungsbeschränkt), https://www.appudo.com

   License: MIT License, https://opensource.org/licenses/MIT

   Authors: source@appudo.com

************************************************************************ */

qx.Class.define("appudo_cli_creator.view.desktop.VarSlots",
{
  extend : qx.ui.container.Composite,

  members : {
    __controller : null,
    __local : null,
    __global : null,
    __chain : null,
    __slotsList : null,
    __opsList : null,
    __data : {},
    __max : 64,
    __currentData : null,

    selectIndex : function(index) {
      this.__chain.selectIndex(index);
    },

    getCurrentData : function() {
      return this.__currentData;
    },

    getController : function() {
      return this.__controller;
    },

    setChain : function(chain) {
      this.__chain = chain;
    },

    setLists : function(slots, operations, chain) {
      this.__slotsList = slots;
      this.__opsList = operations;
    },

    update : function() {
      this.__local.update();
      this.__global.update();
    },

    refresh : function() {
      this.__local.refresh(true);
      this.__global.refresh(true);
    },

    getData : function() {
      return this.__data;
    },

    getMax : function() {
      return this.__max;
    },

    getOps : function() {
      var chain = this.__controller.getCommandOps(this.__currentData);
      return chain;
    },

    getSlotUsed : function(slotIdx, local) {
      var t = local ? this.__local : this.__global;
      return t.getUsedSlots()[slotIdx] || false;
    },

    setSlotActive : function(slotIdx, local, v, hasMore) {
      var t = local ? this.__data.local : this.__data.global;
      var o = t[slotIdx];
      t[slotIdx] = !v;
      if(!hasMore) {
        this.doChange();
      }
      return o != !v;
    },

    setOperationActive : function(idx, v, hasMore) {
      this.__data.ops[idx] = !v;
      if(!hasMore) {
        this.doChange();
      }
    },

    doChange : function() {
      this.update();
      this.refresh();
    },

    __onReset : function() {
      this.__currentData = null,
      this.update();
      this.refresh();
    },

    __onDataChange : function(full, info) {
      if(full || (info && info.t.indexOf('OperationChain') != -1)) {
        this.__onCommandChange(this.__currentData);
      } else
      if(info && info.t.indexOf('OperationSetup') != -1) {
        this.refresh();
      }
    },

    __onCommandChange : function(cmd) {
      this.__currentData = cmd;
      var ops = this.__data.ops = [];
      if(cmd) {
        var chain = this.__controller.getCommandOps(cmd);
        ops.length = chain.length;
      }
      this.__local.markLine();
      this.__global.markLine();
      this.refresh();
      this.__opsList.refresh();
    },

    onSelect : function(data, index) {
      if(!data) {
        index = -1;
      }
      this.__local.markLine(index, true);
      this.__global.markLine(index, true);
    }
  },

  construct : function(controller)
  {
    var _this = this;
    this.base(arguments);

    this.setLayout(new qx.ui.layout.HBox(5));
    this.setPadding(0);
    this.setHeight(100);

    this.__controller = controller;
    this.__data.ops = [];
    this.__data.local = [];
    this.__data.global = [];
    this.__data.local.length = this.__max;
    this.__data.global.length = this.__max;

    this.__local = new appudo_cli_creator.view.desktop.VarSlotsList(controller, this, this.tr('Local Slots'), true);
    this.__global = new appudo_cli_creator.view.desktop.VarSlotsList(controller, this, this.tr('Global Slots'), false);
    this.add(this.__local, {flex:1});
    this.add(this.__global, {flex:1});

    this.refresh();

    this.__controller.addReset(function() {
      _this.__onReset.call(_this);
    });    
    
    this.__controller.addCommandChanged(function(from, cmd) {
      if(from != _this) {
        _this.__onCommandChange.call(_this, cmd);
      }
    });

    this.__controller.addDataChanged(function(from, full, info) {
      if(from != _this) {
        _this.__onDataChange.call(_this, full, info);
      }
    });
  }
});